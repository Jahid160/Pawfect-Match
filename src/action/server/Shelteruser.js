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


export const getShelterRequests = async (page = 1, limit = 10, search = "", status = "All") => {
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
                    { fullName: { $regex: search, $options: "i" } }
               ];
          }

          const totalItems = await shelterRequestsCollection.countDocuments(query);


          const mvpResult = await shelterRequestsCollection.aggregate([
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
               { $sort: { petCount: -1, submittedAt: -1 } },
               { $limit: 1 }
          ]).toArray();
          let topShelterData = null;
          if (mvpResult.length > 0) {

               topShelterData = JSON.parse(JSON.stringify(mvpResult[0]));
          }


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

          const plainRequests = JSON.parse(JSON.stringify(requests));

          return {
               success: true,
               data: plainRequests,
               totalItems,
               topShelter: topShelterData,
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
