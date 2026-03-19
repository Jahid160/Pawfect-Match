'use server'

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

const { dbConnect, collections } = require("@/lib/db");
const shelterRequestsCollectionPromise = dbConnect(collections.SHELTER);

export const createShelterUser = async (data) => {
     const session = await getServerSession(authOptions)

     if (!session || !session.user) {
          return { success: false, message: "Unauthorized" };
     }

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
               id: result.insertedId.toString()
          };
     } catch (error) {
          console.error("Database Error:", error);
          return { success: false, message: "Something went wrong while saving." };
     }
}


export const getShelterRequests = async (page = 1, limit = 10, search = "") => {
     try {
          const shelterRequestsCollection = await shelterRequestsCollectionPromise;

          const pageNum = parseInt(page);
          const limitNum = parseInt(limit);
          const skipAmount = (pageNum - 1) * limitNum;
          const totalItems = await shelterRequestsCollection.countDocuments({});

          const query = search
               ? {
                    $or: [
                         { shelterName: { $regex: search, $options: "i" } },
                         { fullName: { $regex: search, $options: "i" } }
                    ]
               }
               : {};

          // Aggregation Pipeline
          const requests = await shelterRequestsCollection.aggregate([
               { $match: query },
               { $sort: { submittedAt: -1 } },
               { $skip: skipAmount },
               { $limit: limitNum },
               {
                    $lookup: {
                         from: "pets",
                         localField: "email",
                         foreignField: "email",
                         as: "ownedPets"
                    }
               },
               {
                    $addFields: {
                         petCount: { $size: "$ownedPets" }
                    }
               },
               { $project: { ownedPets: 0 } }
          ]).toArray();


          const plainRequests = requests.map(doc => ({
               ...doc,
               _id: doc._id.toString(),
          }));

          return {
               success: true,
               data: plainRequests,
               totalItems,
               totalPages: Math.ceil(totalItems / limitNum)
          };
     } catch (error) {
          console.error("Database Error:", error);
          return { success: false, error: error.message };
     }
}



export const updateShelterStatus = async (id, newStatus) => {
     try {
          const shelterRequestsCollection = await shelterRequestsCollectionPromise;


          const result = await shelterRequestsCollection.updateOne(
               { _id: new ObjectId(id) },
               {
                    $set: {
                         status: newStatus,
                         updatedAt: new Date()
                    }
               }
          );

          if (result.matchedCount === 0) {
               return { success: false, message: "Request not found." };
          }

          return { success: true, message: "Status updated successfully." };
     } catch (error) {
          console.error("Database Error:", error);
          return { success: false, message: "Something went wrong while updating status." };
     }
};
