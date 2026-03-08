'use server'

const { dbConnect, collections } = require("@/lib/db");
const petCollectionPromise = dbConnect(collections.SHELTER);

export const createShelterUser = async (data) => {
     try {
          const petCollection = await petCollectionPromise;


          const result = await petCollection.insertOne(data);

          return {
               success: true,
               message: "Application saved successfully",
               id: result.insertedId.toString()
          };
     } catch (error) {
          console.error("Database Error:", error);
          return { success: false, error: error.message };
     }
}

