"use server";

import { dbConnect, collections } from "@/lib/db";
import { ObjectId } from "mongodb";

/**
 * অর্ডারের আইটেম অনুযায়ী ডাটাবেজ থেকে স্টক কমানো (Food/Accessory)
 */
export const reduceProductStock = async (items) => {
  try {
    if (!items || items.length === 0) return { success: true };

    for (const item of items) {
      // ১. প্রোডাক্ট আইডি ভ্যালিডেশন
      const productId = item.productId || item.foodId || item._id;
      if (!productId || !ObjectId.isValid(productId)) {
        throw new Error(`Invalid Product ID for ${item.productName || 'unknown product'}`);
      }

      // ২. সঠিক কালেকশন সিলেক্ট করা (খাবার নাকি এক্সেসরিজ)
      const collectionName = 
        item.productType === "accessory" 
          ? collections.ACCESSORIES 
          : collections.FOODS;
          
      const collection = await dbConnect(collectionName);
      const qtyToReduce = Number(item.quantity || 1);
      
      // ৩. স্টক চেক এবং আপডেট একসাথে (Atomic Operation)
      // এটি নিশ্চিত করে যে যদি একাধিক ইউজার একসাথে শেষ আইটেমটি কিনতে চায়, তবে স্টক নেগেটিভ হবে না।
      const result = await collection.updateOne(
        { 
          _id: new ObjectId(productId), 
          stock: { $gte: qtyToReduce } // পর্যাপ্ত স্টক থাকলেই কেবল আপডেট হবে
        },
        { 
          $inc: { stock: -qtyToReduce },
          $set: { updatedAt: new Date() }
        }
      );

      // ৪. যদি পর্যাপ্ত স্টক না থাকে
      if (result.matchedCount === 0) {
        throw new Error(`Sorry, ${item.productName || 'the item'} is out of stock or doesn't have enough quantity.`);
      }

      // ৫. অপশনাল: স্টক যদি ০ হয়ে যায়, তবে inStock স্ট্যাটাস false করে দেওয়া
      const updatedProduct = await collection.findOne({ _id: new ObjectId(productId) });
      if (updatedProduct && updatedProduct.stock <= 0) {
        await collection.updateOne(
          { _id: new ObjectId(productId) },
          { $set: { inStock: false } }
        );
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error("reduceProductStock error:", error.message);
    return { success: false, message: error.message };
  }
};