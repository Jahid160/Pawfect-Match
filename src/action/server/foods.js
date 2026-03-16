"use server";

import { collections, dbConnect } from "@/lib/db";
import { ObjectId } from "mongodb";

const foodCollectionPromise = dbConnect(collections.FOODS);


// =============================
// CREATE FOOD
// =============================
export const createFood = async (data) => {
  try {
    const foodsCollection = await foodCollectionPromise;

    const result = await foodsCollection.insertOne({
      ...data,
      stock: Number(data.stock) || 0,
      inStock: Number(data.stock) > 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      success: true,
      id: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("createFood error:", error);
    return { success: false, error: error.message };
  }
};


// =============================
// GET ALL FOODS
// =============================
export const getPetFoods = async () => {
  try {
    const foodsCollection = await foodCollectionPromise;

    const foods = await foodsCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    return foods.map((food) => ({
      ...food,
      _id: food._id.toString(),
      createdAt: food.createdAt?.toISOString?.() || food.createdAt,
      updatedAt: food.updatedAt?.toISOString?.() || food.updatedAt,
    }));
  } catch (error) {
    console.error("getPetFoods error:", error);
    return [];
  }
};


// =============================
// GET SINGLE FOOD
// =============================
export const getSingleFood = async (id) => {
  try {
    if (!ObjectId.isValid(id)) return {};

    const foodsCollection = await foodCollectionPromise;

    const food = await foodsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!food) return {};

    return {
      ...food,
      _id: food._id.toString(),
      createdAt: food.createdAt?.toISOString?.() || food.createdAt,
      updatedAt: food.updatedAt?.toISOString?.() || food.updatedAt,
    };
  } catch (error) {
    console.error("getSingleFood error:", error);
    return {};
  }
};

// =============================
// DELETE FOOD
// =============================
export const deleteFood = async (id) => {
  try {
    if (!ObjectId.isValid(id)) return { success: false, error: "Invalid ID" };
    const foodsCollection = await foodCollectionPromise;
    const result = await foodsCollection.deleteOne({ _id: new ObjectId(id) });
    
    return { success: result.deletedCount === 1 };
  } catch (error) {
    console.error("deleteFood error:", error);
    return { success: false, error: error.message };
  }
};
// =============================
// REDUCE FOOD STOCK (MULTIPLE ITEMS)
// =============================
export const reduceFoodStock = async (items = []) => {
  try {
    if (!items.length) return { success: false };

    const foodsCollection = await dbConnect(collections.FOODS);

    for (const item of items) {
      // 1. Identify the ID (check both productId and product_id)
      const idStr = item.productId || item.product_id;
      
      if (!idStr || !ObjectId.isValid(idStr)) {
        console.error("Invalid ID found in reduction list:", idStr);
        continue;
      }

      const quantity = Number(item.quantity) || 1;

      // 2. Perform the update
      const result = await foodsCollection.updateOne(
        { 
          _id: new ObjectId(idStr), // Ensure this matches the _id in your JSON
          stock: { $gte: quantity } 
        },
        { 
          $inc: { stock: -quantity },
          $set: { updatedAt: new Date() }
        }
      );

      console.log(`Product ${idStr} updated: ${result.modifiedCount} documents modified.`);
    }

    // 3. Cleanup: Set inStock to false if stock hit 0
    await foodsCollection.updateMany(
      { stock: { $lte: 0 } },
      { $set: { inStock: false } }
    );

    return { success: true };
  } catch (error) {
    console.error("reduceFoodStock error:", error);
    return { success: false };
  }
};


// =============================
// INCREASE STOCK (OPTIONAL)
// =============================
export const increaseFoodStock = async (items = []) => {
  try {
    const foodsCollection = await foodCollectionPromise;

    for (const item of items) {

      if (!ObjectId.isValid(item.productId)) continue;

      const quantity = Number(item.quantity) || 1;

      await foodsCollection.updateOne(
        { _id: new ObjectId(item.productId) },
        {
          $inc: { stock: quantity },
          $set: {
            inStock: true,
            updatedAt: new Date(),
          },
        }
      );
    }

    return { success: true };
  } catch (error) {
    console.error("increaseFoodStock error:", error);
    return { success: false };
  }
};
