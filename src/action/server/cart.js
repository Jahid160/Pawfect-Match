"use server";

import { collections, dbConnect } from "@/lib/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

const cartCollectionPromise = dbConnect(collections.CART);

export const addToCart = async (payload) => {
  try {
    const { 
      userEmail, 
      foodId, 
      productName, 
      image, 
      price, 
      stock = 0, 
      brand, 
      weight, 
      weightUnit, 
      inStock = true 
    } = payload;

    if (!userEmail || !foodId) {
      return { success: false, message: "Please login first" };
    }

    const cartCollection = await cartCollectionPromise;

    // ১. চেক করুন আইটেমটি আগে থেকে আছে কিনা
    const existingItem = await cartCollection.findOne({
      userEmail,
      foodId: foodId, // এখানে productId বা foodId যেকোনো একটি কনসিস্টেন্টলি ব্যবহার করুন
    });

    if (existingItem) {
      // ২. আইটেম থাকলে শুধু quantity আপডেট করুন
      const newQuantity = Math.min(
        Number(existingItem.quantity || 1) + 1,
        Number(stock || 999)
      );

      await cartCollection.updateOne(
        { _id: existingItem._id },
        {
          $set: {
            quantity: newQuantity,
            stock: Number(stock),
            inStock,
            updatedAt: new Date(),
          },
        }
      );
      
      revalidatePath("/", "layout");
      return { success: true, message: "Cart updated" };
    } 

    // ৩. আইটেম না থাকলে নতুন ডকুমেন্ট তৈরি করুন (একবারই)
    const doc = {
      userEmail,
      foodId,
      productName,
      image,
      price: Number(price) || 0,
      stock: Number(stock) || 0,
      brand,
      weight,
      weightUnit,
      inStock,
      quantity: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await cartCollection.insertOne(doc);
    revalidatePath("/", "layout");

    return {
      success: true,
      insertedId: result.insertedId.toString(),
      message: "Added to cart",
    };
  } catch (error) {
    console.error("addToCart error:", error);
    return { success: false, message: error.message };
  }
};

export const getCartItems = async (userEmail) => {
  try {
    if (!userEmail) return [];

    const cartCollection = await cartCollectionPromise;
    const items = await cartCollection
      .find({ userEmail })
      .sort({ createdAt: -1 })
      .toArray();

    return items.map((item) => ({
      ...item,
      _id: item._id.toString(),
      createdAt: item.createdAt?.toISOString?.() || item.createdAt,
      updatedAt: item.updatedAt?.toISOString?.() || item.updatedAt,
    }));
  } catch (error) {
    console.error("getCartItems error:", error);
    return [];
  }
};

export const updateCartQuantity = async ({ cartId, userEmail, quantity }) => {
  try {
    if (!cartId || !userEmail) return { success: false, message: "Authentication failed" };

    const cartCollection = await cartCollectionPromise;
    const itemObjectId = new ObjectId(cartId);

    if (quantity <= 0) {
      await cartCollection.deleteOne({ _id: itemObjectId, userEmail });
    } else {
      // ৪. আপডেট করার আগে স্টক চেক করা ভালো (অপশনাল কিন্তু রিকমেন্ডেড)
      await cartCollection.updateOne(
        { _id: itemObjectId, userEmail },
        { $set: { quantity: Number(quantity), updatedAt: new Date() } }
      );
    }

    revalidatePath("/", "layout");
    revalidatePath("/cart");
    return { success: true, message: "Quantity updated" };
  } catch (error) {
    console.error("updateCartQuantity error:", error);
    return { success: false, message: error.message };
  }
};

export const removeCartItem = async ({ cartId, userEmail }) => {
  try {
    if (!cartId || !userEmail) return { success: false, message: "Authentication failed" };

    const cartCollection = await cartCollectionPromise;
    await cartCollection.deleteOne({ _id: new ObjectId(cartId), userEmail });

    revalidatePath("/", "layout");
    revalidatePath("/cart");
    return { success: true, message: "Item removed" };
  } catch (error) {
    console.error("removeCartItem error:", error);
    return { success: false, message: error.message };
  }
};

export const clearCart = async (userEmail) => {
  try {
    if (!userEmail) return { success: false, message: "Authentication failed" };

    const cartCollection = await cartCollectionPromise;
    await cartCollection.deleteMany({ userEmail });

    revalidatePath("/", "layout");
    revalidatePath("/cart");
    return { success: true, message: "Cart cleared" };
  } catch (error) {
    console.error("clearCart error:", error);
    return { success: false, message: error.message };
  }
};