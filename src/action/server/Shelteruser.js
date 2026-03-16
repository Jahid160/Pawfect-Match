'use server'

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const { dbConnect, collections } = require("@/lib/db");
const petCollectionPromise = dbConnect(collections.SHELTER);

export const createShelterUser = async (data) => {
     const session = await getServerSession(authOptions)

     if (!session || !session.user) {
          return { success: false, message: "Unauthorized" };
     }

     try {
          const petCollection = await petCollectionPromise;


          const finalDataToSave = {
               ...data,
               email: session.user.email,
               updatedAt: new Date()
          };

          const result = await petCollection.insertOne(finalDataToSave);

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
export const getShelterUsers = async () => {
     try {
          const petCollection = await petCollectionPromise;
          const users = await petCollection.find({}).toArray();

          return { success: true, data: users };
     } catch (error) {
          console.error("Database Error:", error);
          return { success: false, error: error.message };
     }
}
