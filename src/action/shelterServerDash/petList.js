"use server";

import { collections, dbConnect } from "@/lib/db";
import { shelterVerifyAuth } from "@/lib/shelterVerifyAuth";

export const getShelterDashboardStats = async () => {
  try {
    const user = await shelterVerifyAuth();

    const petCollection = await dbConnect(collections.PETS);
    const pendingCollection = await dbConnect(collections.ENTRYREQ);

    const totalPetCollection = await petCollection.find({ email: user.email }).toArray();


    const entries = await pendingCollection
      .find({ email: user.email })
      .toArray();


    const approvedCount = totalPetCollection.filter(
      (a) => a.status === "adopted",
    ).length;
    const pendingCount = totalPetCollection.filter(
      (a) => a.status === "pending",
    ).length;

    const previewCount = entries.filter((a) => a.status === "preview").length;


    const favoriteCount = totalPetCollection.reduce((total, pet) => {
      return total + (pet.savedBy?.length || 0);
    }, 0);
    const availablePetsCount = await petCollection.countDocuments({
      email: user.email,
      status: "available",
    });
    console.log(availablePetsCount);
    return {
      success: true,
      data: {
        adopted: approvedCount,
        pending: pendingCount,
        preview: previewCount,
        favorites: favoriteCount,
        available: availablePetsCount,
      },
    };
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return {
      success: false,
      data: { approved: 0, pending: 0, favorites: 0, messages: 0 },
    };
  }
};
