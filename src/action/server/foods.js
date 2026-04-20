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
      price: Number(data.price) || 0,
      discountPrice: Number(data.discountPrice) || 0,
      stock: Number(data.stock) || 0,
      weight: Number(data.weight) || 0,
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

    const foods = await foodsCollection.find().sort({ createdAt: -1 }).toArray();

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
// UPDATE FOOD
// =============================
export const updateFood = async (id, data) => {
  try {
    if (!ObjectId.isValid(id)) {
      return { success: false, error: "Invalid food ID" };
    }

    const foodsCollection = await foodCollectionPromise;

    const updatedDoc = {
      productName: data.productName || "",
      brand: data.brand || "",
      category: data.category || "",
      foodType: data.foodType || "",
      image: data.image || "",
      description: data.description || "",
      price: Number(data.price) || 0,
      discountPrice: Number(data.discountPrice) || 0,
      stock: Number(data.stock) || 0,
      weight: Number(data.weight) || 0,
      inStock: Number(data.stock) > 0,
      updatedAt: new Date(),
    };

    const result = await foodsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedDoc }
    );

    if (result.modifiedCount === 0 && result.matchedCount === 0) {
      return { success: false, error: "Food not found" };
    }

    return { success: true };
  } catch (error) {
    console.error("updateFood error:", error);
    return { success: false, error: error.message };
  }
};

// =============================
// DELETE FOOD
// =============================
export const deleteFood = async (id) => {
  try {
    if (!ObjectId.isValid(id)) {
      return { success: false, error: "Invalid ID" };
    }

    const foodsCollection = await foodCollectionPromise;
    const result = await foodsCollection.deleteOne({ _id: new ObjectId(id) });

    return { success: result.deletedCount === 1 };
  } catch (error) {
    console.error("deleteFood error:", error);
    return { success: false, error: error.message };
  }
};

// =============================
// REDUCE FOOD STOCK
// =============================
export const reduceFoodStock = async (items = []) => {
  try {
    if (!items.length) {
      return { success: false, message: "No items provided." };
    }

    const foodsCollection = await dbConnect(collections.FOODS);

    for (const item of items) {
      const idStr = item.productId || item.foodId || item.product_id;
      const quantity = Number(item.quantity) || 1;

      if (!idStr || !ObjectId.isValid(idStr)) {
        return { success: false, message: "Invalid product ID found." };
      }

      const existingFood = await foodsCollection.findOne({
        _id: new ObjectId(idStr),
      });

      if (!existingFood) {
        return { success: false, message: `Food not found: ${idStr}` };
      }

      if (Number(existingFood.stock || 0) < quantity) {
        return {
          success: false,
          message: `Not enough stock for ${existingFood.productName || idStr}`,
        };
      }

      const result = await foodsCollection.updateOne(
        {
          _id: new ObjectId(idStr),
          stock: { $gte: quantity },
        },
        {
          $inc: { stock: -quantity },
          $set: { updatedAt: new Date() },
        }
      );

      if (result.modifiedCount !== 1) {
        return {
          success: false,
          message: `Stock update failed for ${idStr}`,
        };
      }
    }

    await foodsCollection.updateMany(
      { stock: { $lte: 0 } },
      {
        $set: {
          inStock: false,
          updatedAt: new Date(),
        },
      }
    );

    await foodsCollection.updateMany(
      { stock: { $gt: 0 } },
      {
        $set: {
          inStock: true,
          updatedAt: new Date(),
        },
      }
    );

    return { success: true };
  } catch (error) {
    console.error("reduceFoodStock error:", error);
    return { success: false, message: error.message };
  }
};

// =============================
// INCREASE FOOD STOCK
// =============================
export const increaseFoodStock = async (items = []) => {
  try {
    if (!items.length) {
      return { success: false, message: "No items provided." };
    }

    const foodsCollection = await foodCollectionPromise;

    for (const item of items) {
      const idStr = item.productId || item.foodId || item.product_id;

      if (!idStr || !ObjectId.isValid(idStr)) continue;

      const quantity = Number(item.quantity) || 1;

      await foodsCollection.updateOne(
        { _id: new ObjectId(idStr) },
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
    return { success: false, message: error.message };
  }
};
