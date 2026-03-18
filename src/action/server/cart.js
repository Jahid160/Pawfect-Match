"use server";

import { collections, dbConnect } from "@/lib/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

const cartCollectionPromise = dbConnect(collections.CART);

// ১. কার্টে প্রোডাক্ট যোগ করা
export const addToCart = async (payload) => {
  try {
    const { userEmail, foodId, stock = 0 } = payload;

    if (!userEmail || !foodId) {
      return { success: false, message: "Please login first" };
    }

    const cartCollection = await cartCollectionPromise;
    const existingItem = await cartCollection.findOne({ userEmail, foodId });

    if (existingItem) {
      const newQuantity = Math.min((existingItem.quantity || 1) + 1, stock || 999);
      await cartCollection.updateOne(
        { _id: existingItem._id },
        { $set: { quantity: newQuantity, updatedAt: new Date() } }
      );
    } else {
      const doc = { ...payload, quantity: 1, createdAt: new Date(), updatedAt: new Date() };
      await cartCollection.insertOne(doc);
    }

    // নেভবার এবং কার্ট পেজকে ফ্রেশ ডেটা দেখাতে বাধ্য করবে
    revalidatePath("/", "layout"); 
    revalidatePath("/cart");

    return { success: true, message: existingItem ? "Cart updated" : "Added to cart" };
  } catch (error) {
    console.error("addToCart error:", error);
    return { success: false, message: error.message };
  }
};

// ২. কার্টের সব আইটেম নিয়ে আসা
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

// ৩. পরিমাণ আপডেট করা (প্লাস/মাইনাস বাটন)
export const updateCartQuantity = async ({ cartId, userEmail, quantity }) => {
  try {
    if (!cartId || !userEmail) return { success: false, message: "Authentication failed" };

    const cartCollection = await cartCollectionPromise;

    if (quantity <= 0) {
      await cartCollection.deleteOne({ _id: new ObjectId(cartId), userEmail });
    } else {
      await cartCollection.updateOne(
        { _id: new ObjectId(cartId), userEmail },
        { $set: { quantity, updatedAt: new Date() } }
      );
    }

    revalidatePath("/", "layout");
    revalidatePath("/cart");
    return { success: true, message: "Cart updated" };
  } catch (error) {
    console.error("updateCartQuantity error:", error);
    return { success: false, message: error.message };
  }
};

// ৪. নির্দিষ্ট আইটেম মুছে ফেলা
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

// ৫. পুরো কার্ট খালি করা (অর্ডার সাকসেস হলে বা ম্যানুয়ালি)
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