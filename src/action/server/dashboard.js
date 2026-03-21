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

    // ১. সব কালেকশনের কাউন্ট একবারে নিয়ে আসা
    const [
      totalUsers,
      totalPets,
      totalShelters,
      totalAccessories,
      totalFoodItems,
      totalVaccines
    ] = await Promise.all([
      usersCollection.countDocuments(),
      petsCollection.countDocuments(),
      sheltersCollection.countDocuments(),
      accessoriesCollection.countDocuments(),
      foodCollection.countDocuments(),
      vaccinesCollection.countDocuments()
    ]);

    /**
     * ২. ইনভেন্টরি পার্সেন্টেজ ক্যালকুলেশন লজিক:
     * ড্যাশবোর্ডের প্রোগ্রেস বার দেখাতে হলে আমাদের একটা পার্সেন্টেজ (%) লাগে।
     * এখানে আমরা ধরে নিচ্ছি একটি আইডিয়াল টার্গেট (যেমন: ১০০ বা ২০০ আইটেম)। 
     * আপনার ডাটাবেজে আইটেম বাড়লে বারটি বাড়বে।
     */
    const calculateStockPercent = (currentCount, target = 100) => {
      const percent = (currentCount / target) * 100;
      // পার্সেন্টেজ ৫% এর নিচে নামবে না আর ১০০% এর উপরে যাবে না (ভিজ্যুয়াল ব্যালেন্সের জন্য)
      return Math.min(Math.max(Math.round(percent), 5), 100);
    };

    return {
      success: true,
      stats: {
        users: totalUsers,
        pets: totalPets,
        shelters: totalShelters,
        accessories: totalAccessories,
        food: totalFoodItems,
        vaccines: totalVaccines,
        // ইনভেন্টরি ডেটা (যা প্রোগ্রেস বারে বসবে)
        inventory: {
          foodPercent: calculateStockPercent(totalFoodItems, 100),   // টার্গেট ১০০ আইটেম
          accPercent: calculateStockPercent(totalAccessories, 150), // টার্গেট ১৫০ আইটেম
          vaccinePercent: calculateStockPercent(totalVaccines, 50),  // টার্গেট ৫০ আইটেম
          litterPercent: 65 // লিটার কালেকশন আলাদা না থাকলে স্ট্যাটিক থাকলো
        }
      }
    };
  } catch (error) {
    console.error("getDashboardStats error:", error);
    return { success: false, error: "Failed to fetch dashboard stats" };
  }
};