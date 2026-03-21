"use server";

import { collections, dbConnect } from "@/lib/db";

export const getDashboardStats = async () => {
  try {
    const usersCollection = await dbConnect(collections.USERS);
    const petsCollection = await dbConnect(collections.PETS);
    const sheltersCollection = await dbConnect(collections.SHELTER);
    const accessoriesCollection = await dbConnect(collections.ACCESSORIES);
    const foodCollection = await dbConnect(collections.FOODS);
    const vaccinesCollection = await dbConnect(collections.VACCINES);
    const adoptionsCollection = await dbConnect(collections.ADOPTIONS); // adoptionsInfo
    const ordersCollection = await dbConnect(collections.ORDERS); // orders

    // ১. বেসিক কাউন্টগুলো (আগের মতোই)
    const [
      totalUsers, totalPets, totalShelters, totalAccessories, 
      totalFoodItems, totalVaccines, dogCount, catCount, rabbitCount, fishCount
    ] = await Promise.all([
      usersCollection.countDocuments(),
      petsCollection.countDocuments(),
      sheltersCollection.countDocuments(),
      accessoriesCollection.countDocuments(),
      foodCollection.countDocuments(),
      vaccinesCollection.countDocuments(),
      petsCollection.countDocuments({ species: "Dog" }),
      petsCollection.countDocuments({ species: "Cat" }),
      petsCollection.countDocuments({ species: "Rabbit" }),
      petsCollection.countDocuments({ species: "Fish" })
    ]);

    // ২. গ্রাফের জন্য গত ৬ মাসের ডাটা ক্যালকুলেশন (Aggregation)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1); // মাসের শুরু থেকে

    const aggregateMonthlyData = async (collection) => {
      return await collection.aggregate([
        { $match: { createdAt: { $gte: sixMonthsAgo } } },
        {
          $group: {
            _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
            count: { $sum: 1 }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
      ]).toArray();
    };

    const [monthlyAdoptions, monthlyOrders] = await Promise.all([
      aggregateMonthlyData(adoptionsCollection),
      aggregateMonthlyData(ordersCollection)
    ]);

    // গ্রাফের ফরম্যাটে ডাটা সাজানো (Jan, Feb...)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const chartData = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const m = d.getMonth() + 1;
      const y = d.getFullYear();

      const adoptionMatch = monthlyAdoptions.find(item => item._id.month === m && item._id.year === y);
      const orderMatch = monthlyOrders.find(item => item._id.month === m && item._id.year === y);

      chartData.push({
        name: monthNames[m - 1],
        adoptions: adoptionMatch ? adoptionMatch.count : 0,
        sales: orderMatch ? orderMatch.count : 0
      });
    }

    // ৩. অন্যান্য ক্যালকুলেশন
    const otherCount = Math.max(0, totalPets - (dogCount + catCount + rabbitCount + fishCount));
    const calculateStockPercent = (currentCount, target = 100) => Math.min(Math.max(Math.round((currentCount / target) * 100), 5), 100);
    const calculateDiversityPercent = (count) => totalPets > 0 ? Math.round((count / totalPets) * 100) : 0;

    return {
      success: true,
      stats: {
        users: totalUsers,
        pets: totalPets,
        shelters: totalShelters,
        accessories: totalAccessories,
        food: totalFoodItems,
        vaccines: totalVaccines,
        chartData, // নতুন ডাইনামিক গ্রাফ ডাটা
        inventory: {
          foodPercent: calculateStockPercent(totalFoodItems, 100),
          accPercent: calculateStockPercent(totalAccessories, 150),
          vaccinePercent: calculateStockPercent(totalVaccines, 50),
          litterPercent: 65 
        },
        categories: [
          { name: 'Dogs', value: calculateDiversityPercent(dogCount), color: '#f97316' },
          { name: 'Cats', value: calculateDiversityPercent(catCount), color: '#0ea5e9' },
          { name: 'Rabbits', value: calculateDiversityPercent(rabbitCount), color: '#6366f1' },
          { name: 'Fish', value: calculateDiversityPercent(fishCount), color: '#22c55e' },
          { name: 'Others', value: calculateDiversityPercent(otherCount), color: '#94a3b8' },
        ]
      }
    };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};