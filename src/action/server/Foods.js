'use server'
const { dbConnect, collections } = require("@/lib/db");

const FoodsCollectionPromise = dbConnect(collections.FOODS);

export const createFood = async (data) => {
     try {
          const foodsCollection = await FoodsCollectionPromise;
          const result = await foodsCollection.insertOne(data);
          return { success: true, id: result.insertedId.toString() };
     } catch (error) {
          return { success: false, error: error.message };
     }
}