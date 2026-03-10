"use server";

import { collections, dbConnect } from "@/lib/db";
import { ObjectId } from "mongodb";

const foodCollectionPromise = dbConnect(collections.FOODS);

export const createFood = async (data) => {
  try {
    const foodsCollection = await foodCollectionPromise;

    const result = await foodsCollection.insertOne({
      ...data,
      createdAt: new Date(),
    });

    return { success: true, id: result.insertedId.toString() };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getPetFoods = async () => {
  try {
    const foodsCollection = await foodCollectionPromise;
    const foods = await foodsCollection.find().toArray();

    return foods.map((food) => ({
      ...food,
      _id: food._id.toString(),
      createdAt: food.createdAt?.toISOString?.() || food.createdAt,
    }));
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const getSingleFood = async (id) => {
  try {
    if (!ObjectId.isValid(id)) {
      return {};
    }

    const foodsCollection = await foodCollectionPromise;

    const food = await foodsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!food) return {};

    return {
      ...food,
      _id: food._id.toString(),
      createdAt: food.createdAt?.toISOString?.() || food.createdAt,
    };
  } catch (error) {
    console.error("getSingleFood error:", error);
    return {};
  }
};
