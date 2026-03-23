"use server";

import { collections, dbConnect } from "@/lib/db";
import { userVerifyAuth } from "@/lib/userVerifyAuth";
import { verifyAuth } from "@/lib/verifyAuth";
import { ObjectId } from "mongodb";

export const getUserApprovedPets = async () => {
  try {
    const user = await verifyAuth();

    const adoptionCollection = await dbConnect(collections.ADOPTIONS);
    const petCollection = await dbConnect(collections.PETS);

    // find approved adoption requests for this user
    const approvedAdoptions = await adoptionCollection
      .find({
        email: user.email,
        status: "approved",
      })
      .toArray();

    if (!approvedAdoptions.length) {
      return {
        success: true,
        data: [],
      };
    }

    const petIds = approvedAdoptions
      .map((item) => item.petId)
      .filter(Boolean)
      .map((id) => new ObjectId(id));

    const pets = await petCollection
      .find({
        _id: { $in: petIds },
      })
      .toArray();

    const formattedPets = pets.map((pet) => {
      const matchedAdoption = approvedAdoptions.find(
        (adoption) => adoption.petId === pet._id.toString(),
      );

      return {
        _id: pet._id.toString(),
        petName: pet.petName,
        breed: pet.breed,
        age: pet.age,
        species: pet.species,
        status: pet.status,
        image: pet.images?.[0] || "",
        adoptionCode: matchedAdoption?.adoptionCode || "",
        approvedAt: matchedAdoption?.updatedTime || null,
      };
    });

    return {
      success: true,
      data: formattedPets,
    };
  } catch (error) {
    console.error("Error fetching approved pets:", error);
    return {
      success: false,
      message: "Failed to fetch approved pets.",
      data: [],
    };
  }
};

export const getUserDashboardStats = async () => {
  try {
    const user = await userVerifyAuth();
    const userId = user._id.toString();
    const adoptionCollection = await dbConnect(collections.ADOPTIONS);
    const petCollection = await dbConnect(collections.PETS);

    // 1. Fetch Approved and Pending counts from ADOPTIONS collection simultaneously
    const adoptions = await adoptionCollection
      .find({ email: user.email })
      .toArray();

    const approvedCount = adoptions.filter(
      (a) => a.status === "adopted",
    ).length;
    const pendingCount = adoptions.filter((a) => a.status === "pending").length;

    // 2. Fetch Favorite Pets count from PETS collection
    // Assuming 'savedBy' array in PETS collection contains user IDs
    const favoriteCount = await petCollection.countDocuments({
      savedBy: userId, // or user.email, depending on your schema
    });
    const availablePetsCount = await petCollection.countDocuments({
      status: "available",
    });
    return {
      success: true,
      data: {
        adopted: approvedCount,
        pending: pendingCount,
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
