'use server'

import { authOptions } from "@/lib/authOptions";
import { collections, dbConnect } from "@/lib/db";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

const foodCollectionPromise = dbConnect(collections.FOODS);


export const getPetFoods = async () => {
    try {
        const FoodCollection = await foodCollectionPromise;
        const foods = await FoodCollection.find().toArray();
        
        return foods.map(food => ({
            ...food,
            _id: food._id.toString(),
            // ADD THIS: Convert the Date object to an ISO string
            createdAt: food.createdAt instanceof Date 
                ? food.createdAt.toISOString() 
                : food.createdAt, 
        }));
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};