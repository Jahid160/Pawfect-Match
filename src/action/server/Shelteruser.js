"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { shelterVerifyAuth } from "@/lib/shelterVerifyAuth";
import { verifyAdmin } from "@/lib/adminAuth";
import { adminShelterAuth } from "@/lib/adminShelterAuth";


const { dbConnect, collections } = require("@/lib/db");
const shelterRequestsCollectionPromise = dbConnect(collections.SHELTER);
const userCollectionPromise = dbConnect(collections.USERS);

export const createShelterUser = async (data) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { success: false, message: "Unauthorized" };
  }

  await shelterVerifyAuth()
  try {
    const shelterRequestsCollection = await shelterRequestsCollectionPromise;


    const finalDataToSave = {
      ...data,
      email: session.user.email,
    };

    const result = await shelterRequestsCollection.insertOne(finalDataToSave);

    return {
      success: true,
      message: "Application saved successfully",
      id: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, message: "Something went wrong while saving." };
  }
};

export const getShelterRequests = async (
  page = 1,
  limit = 10,
  search = "",
  status = "All",
) => {
  await verifyAdmin()
  try {
    const shelterRequestsCollection = await shelterRequestsCollectionPromise;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skipAmount = (pageNum - 1) * limitNum;

    let query = {};
    if (status !== "All") {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { shelterName: { $regex: search, $options: "i" } },
        { fullName: { $regex: search, $options: "i" } },
      ];
    }

    const totalItems = await shelterRequestsCollection.countDocuments(query);

    const mvpResult = await shelterRequestsCollection
      .aggregate([
        {
          $lookup: {
            from: "pets",
            localField: "email",
            foreignField: "email",
            as: "ownedPets",
          },
        },
        {
          $addFields: {
            petCount: { $size: "$ownedPets" },
          },
        },
        { $sort: { petCount: -1, submittedAt: -1 } },
        { $limit: 1 },
      ])
      .toArray();
    let topShelterData = null;
    if (mvpResult.length > 0) {
      topShelterData = JSON.parse(JSON.stringify(mvpResult[0]));
    }

    const requests = await shelterRequestsCollection
      .aggregate([
        { $match: query },
        { $sort: { submittedAt: -1 } },
        { $skip: skipAmount },
        { $limit: limitNum },
        {
          $lookup: {
            from: "pets",
            localField: "email",
            foreignField: "email",
            as: "ownedPets",
          },
        },
        {
          $addFields: {
            petCount: { $size: "$ownedPets" },
          },
        },
        { $project: { ownedPets: 0 } },
      ])
      .toArray();

    const plainRequests = JSON.parse(JSON.stringify(requests));

    return {
      success: true,
      data: plainRequests,
      totalItems,
      topShelter: topShelterData,
      totalPages: Math.ceil(totalItems / limitNum),
    };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: error.message };
  }
};

export const updateShelterStatus = async (id, email, newStatus) => {
  await shelterVerifyAuth()
  try {
    const shelterRequestsCollection = await shelterRequestsCollectionPromise;
    const userCollection = await userCollectionPromise;

    const result = await shelterRequestsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: newStatus,
          updatedAt: new Date(),
        },
      },
    );

    const shelterrole = await userCollection.updateOne(
      { email: email },
      {
        $set: {
          role: "shelter",
          updatedAt: new Date(),
        },
      },
    );

    if (result.matchedCount === 0 && shelterrole.matchedCount === 0) {
      return { success: false, message: "Request not found." };
    }

    return { success: true, message: "Status updated successfully." };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      success: false,
      message: "Something went wrong while updating status.",
    };
  }
};

export const deleteShelterRequest = async (id) => {
  await shelterVerifyAuth()
  try {
    const shelterRequestsCollection = await shelterRequestsCollectionPromise;
    const result = await shelterRequestsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 1) {
      return { success: true, message: "Deleted successfully" };
    }
    return { success: false, message: "Request not found" };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateShelterData = async (id, updatedFields) => {
  await shelterVerifyAuth()
  try {
    const shelterRequestsCollection = await shelterRequestsCollectionPromise;
    const result = await shelterRequestsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updatedFields, updatedAt: new Date() } },
    );

    if (result.matchedCount === 1) {
      return { success: true, message: "Updated successfully" };
    }
    return { success: false, message: "Update failed" };
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false, error: error.message };
  }
};

export const getSingleShelter = async (email) => {
  await shelterVerifyAuth()
  try {
    const shelterRequestsCollection = await shelterRequestsCollectionPromise;

    const query = {
      email: email,
    };

    const result = await shelterRequestsCollection
      .aggregate([
        { $match: query },
        {
          $lookup: {
            from: "pets",
            localField: "email",
            foreignField: "email",
            as: "ownedPets",
          },
        },
        {
          $addFields: {
            petCount: { $size: "$ownedPets" },
          },
        },
        { $project: { ownedPets: 0 } },
      ])
      .toArray();

    if (!result || result.length === 0) {
      return {
        success: false,
        error: "Shelter not found with this ID and Email",
      };
    }

    const shelterData = JSON.parse(JSON.stringify(result[0]));

    return {
      success: true,
      data: shelterData,
    };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: error.message };
  }
};

export const updateShelterCover = async (email, imageUrl) => {
  await shelterVerifyAuth()
  try {
    const shelterCollection = await shelterRequestsCollectionPromise;
    const result = await shelterCollection.updateOne(
      { email: email },
      { $set: { shelterPhoto: imageUrl } }
    );

    if (result.modifiedCount > 0) {
      revalidatePath('/dashboard/profile')
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export const SheltergetStatus = async (email) => {
  const shelterCollection = await shelterRequestsCollectionPromise;
  await adminShelterAuth()
  const result = await shelterCollection.findOne(
    { email: email },
    {
      projection: {
        status: 1, _id: 0
      }
    }
  );
  return result ? result.status : null;
}
