"use server";

import { dbConnect, collections } from "@/lib/db";
import { ObjectId } from "mongodb";


export const reduceProductStock = async (items) => {
  try {
    if (!items || items.length === 0) return { success: true };

    for (const item of items) {

      const productId = item.productId || item.foodId || item._id;
      if (!productId || !ObjectId.isValid(productId)) {
        throw new Error(`Invalid Product ID for ${item.productName || 'unknown product'}`);
      }


      const collectionName =
        item.productType === "accessory"
          ? collections.ACCESSORIES
          : collections.FOODS;

      const collection = await dbConnect(collectionName);
      const qtyToReduce = Number(item.quantity || 1);


      const result = await collection.updateOne(
        {
          _id: new ObjectId(productId),
          stock: { $gte: qtyToReduce }
        },
        {
          $inc: { stock: -qtyToReduce },
          $set: { updatedAt: new Date() }
        }
      );

      if (result.matchedCount === 0) {
        throw new Error(`Sorry, ${item.productName || 'the item'} is out of stock or doesn't have enough quantity.`);
      }


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