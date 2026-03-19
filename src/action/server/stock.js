"use server";

import { dbConnect, collections } from "@/lib/db";
import { ObjectId } from "mongodb";

export const reduceProductStock = async (items) => {
  try {
    for (const item of items) {
      // ১. সঠিক কালেকশন সিলেক্ট করা
      const collectionName = 
        item.productType === "accessory" 
          ? collections.ACCESSORIES 
          : collections.FOODS;
          
      const collection = await dbConnect(collectionName);
      
      // ২. স্টক চেক এবং আপডেট একসাথে (Atomic Operation)
      const result = await collection.updateOne(
        { 
          _id: new ObjectId(item.productId), 
          stock: { $gte: Number(item.quantity) } // শুধু তখনই আপডেট হবে যদি স্টক পর্যাপ্ত থাকে
        },
        { 
          $inc: { stock: -Number(item.quantity) } 
        }
      );

      // ৩. যদি কোনো আইটেমের স্টক কম থাকে তবে এরর থ্রো করবে
      if (result.matchedCount === 0) {
        throw new Error(`Not enough stock for ${item.productName || 'one of the items'}`);
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error("reduceProductStock error:", error);
    return { success: false, message: error.message };
  }
};