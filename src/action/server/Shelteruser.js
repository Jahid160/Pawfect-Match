'use server'

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

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


export const getShelterRequests = async () => {
     try {

          const shelterRequestsCollection = await shelterRequestsCollectionPromise;


          const requests = await shelterRequestsCollection.find({}).sort({ submittedAt: -1 }).toArray();
          const plainRequests = requests.map(doc => ({
               ...doc,
               _id: doc._id.toString(),

          }))

          return { success: true, data: plainRequests };
     } catch (error) {
          console.error("Database Error:", error);
          return { success: false, error: error.message };
     }
}
