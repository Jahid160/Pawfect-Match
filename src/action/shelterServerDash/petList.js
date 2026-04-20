"use server";

import { collections, dbConnect } from "@/lib/db";
import { shelterVerifyAuth } from "@/lib/shelterVerifyAuth";

export const getShelterDashboardStats = async () => {
  try {
    const user = await shelterVerifyAuth();
    if (!user) throw new Error("Unauthorized");

    const petCollection = await dbConnect(collections.PETS);
    const entryReqCollection = await dbConnect(collections.ENTRYREQ);

    const petStats = await petCollection
      .aggregate([
        { $match: { email: user.email } },
        {
          $group: {
            _id: null,
            adopted: {
              $sum: { $cond: [{ $eq: ["$status", "adopted"] }, 1, 0] },
            },
            pending: {
              $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
            },
            available: {
              $sum: { $cond: [{ $eq: ["$status", "available"] }, 1, 0] },
            },
            favorites: { $sum: { $size: { $ifNull: ["$savedBy", []] } } },
          },
        },
      ])
      .toArray();

    const statsResult = petStats[0] || {
      adopted: 0,
      pending: 0,
      available: 0,
      favorites: 0,
    };

    //  Preview Requests Count
    const previewCount = await entryReqCollection.countDocuments({
      email: user.email,
      status: "preview",
    });

    //  Dynamic Monthly Adoption/Entry Data (Area Chart
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);

    const monthlyStats = await entryReqCollection
      .aggregate([
        {
          $match: {
            email: user.email,
            createdAt: { $gte: sixMonthsAgo },
          },
        },
        {
          $group: {
            _id: {
              month: { $month: "$createdAt" },
              year: { $year: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ])
      .toArray();

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedMonthlyData = monthlyStats.map((item) => ({
      name: monthNames[item._id.month - 1],
      count: item.count,
    }));
    return {
      success: true,
      data: {
        currentStats: {
          adopted: statsResult.adopted,
          pending: statsResult.pending,
          preview: previewCount,
          favorites: statsResult.favorites,
          available: statsResult.available,
        },
        monthlyData:
          formattedMonthlyData.length > 0
            ? formattedMonthlyData
            : [{ name: "No Data", count: 0 }],
      },
    };
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
};
