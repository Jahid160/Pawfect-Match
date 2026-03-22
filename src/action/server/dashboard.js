"use server";

import { collections, dbConnect } from "@/lib/db";

export const getDashboardStats = async (range = "6months") => {
  try {
    const usersCollection = await dbConnect(collections.USERS);
    const petsCollection = await dbConnect(collections.PETS);
    const sheltersCollection = await dbConnect(collections.SHELTER);
    const accessoriesCollection = await dbConnect(collections.ACCESSORIES);
    const foodCollection = await dbConnect(collections.FOODS);
    const vaccinesCollection = await dbConnect(collections.VACCINES);
    const adoptionsCollection = await dbConnect(collections.ADOPTIONS); 
    const ordersCollection = await dbConnect(collections.ORDERS); 

    // ১. বেসিক কাউন্টগুলো
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

    // ২. ফিল্টার রেঞ্জ অনুযায়ী ডেট সেট করা
    let startDate = new Date();
    let groupBy = {};
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (range === "7days") {
      startDate.setDate(startDate.getDate() - 7);
      groupBy = { day: { $dayOfMonth: "$createdAt" }, month: { $month: "$createdAt" }, year: { $year: "$createdAt" } };
    } else if (range === "30days") {
      startDate.setDate(startDate.getDate() - 30);
      groupBy = { day: { $dayOfMonth: "$createdAt" }, month: { $month: "$createdAt" }, year: { $year: "$createdAt" } };
    } else if (range === "year") {
      startDate = new Date(new Date().getFullYear(), 0, 1);
      groupBy = { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } };
    } else {
      // ডিফল্ট ৬ মাস
      startDate.setMonth(startDate.getMonth() - 5);
      startDate.setDate(1);
      groupBy = { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } };
    }

    // Aggregation Function
    const aggregateData = async (collection) => {
      return await collection.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        { $group: { _id: groupBy, count: { $sum: 1 } } },
        { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
      ]).toArray();
    };

    const [monthlyAdoptions, monthlyOrders] = await Promise.all([
      aggregateData(adoptionsCollection),
      aggregateData(ordersCollection)
    ]);

    // ৩. চার্ট ডাটা ফরম্যাটিং
    let chartData = [];

    if (range === "7days" || range === "30days") {
      // দিন ভিত্তিক ডাটা সাজানো
      const limit = range === "7days" ? 7 : 30;
      for (let i = limit - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const day = d.getDate();
        const month = d.getMonth() + 1;

        const aMatch = monthlyAdoptions.find(x => x._id.day === day && x._id.month === month);
        const oMatch = monthlyOrders.find(x => x._id.day === day && x._id.month === month);

        chartData.push({
          name: `${day}/${month}`,
          adoptions: aMatch?.count || 0,
          sales: oMatch?.count || 0
        });
      }
    } else {
      // মাস ভিত্তিক ডাটা (৬ মাস বা ১ বছর)
      const monthsToLookBack = range === "year" ? 11 : 5;
      for (let i = monthsToLookBack; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        const m = d.getMonth() + 1;
        const y = d.getFullYear();

        const aMatch = monthlyAdoptions.find(x => x._id.month === m && x._id.year === y);
        const oMatch = monthlyOrders.find(x => x._id.month === m && x._id.year === y);

        chartData.push({
          name: monthNames[m - 1],
          adoptions: aMatch?.count || 0,
          sales: oMatch?.count || 0
        });
      }
    }

    // ৪. ডাইভারসিটি এবং ইনভেন্টরি ক্যালকুলেশন
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
        chartData,
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
    console.error("Dashboard Stats Error:", error);
    return { success: false };
  }
};