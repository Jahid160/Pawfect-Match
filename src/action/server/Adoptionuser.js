'use server'

const { dbConnect, collections } = require("@/lib/db");

const petCollectionPromise = dbConnect(collections.ADOPTIONS);

export const createAdoptionUser = async (data) => {
     try {
          const petCollection = await petCollectionPromise;
          const result = await petCollection.insertOne(data);
          return { success: true, id: result.insertedId.toString() };
     } catch (error) {
          return { success: false, error: error.message };
     }
}
