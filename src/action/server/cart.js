"use server";

import { collections, dbConnect } from "@/lib/db";
import { ObjectId } from "mongodb";

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
      inStock = true,
    } = payload;

    if (!userEmail || !foodId) {
      return { success: false, message: "Please login first" };
    }

    const cartCollection = await cartCollectionPromise;

    const existingItem = await cartCollection.findOne({
      userEmail,
      foodId,
    });

    if (existingItem) {
      const newQuantity = Math.min(
        (existingItem.quantity || 1) + 1,
        stock || 999
      );

      await cartCollection.updateOne(
        { _id: existingItem._id },
        {
          $set: {
            quantity: newQuantity,
            updatedAt: new Date(),
          },
        }
      );

      return { success: true, message: "Cart updated" };
    }

    const doc = {
      userEmail,
      foodId,
      productName,
      image,
      price,
      stock,
      brand,
      weight,
      weightUnit,
      inStock,
      quantity: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await cartCollection.insertOne(doc);

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
    if (!cartId || !userEmail) {
      return { success: false, message: "Please login first" };
    }

    const cartCollection = await cartCollectionPromise;

    const item = await cartCollection.findOne({
      _id: new ObjectId(cartId),
      userEmail,
    });

    if (!item) {
      return { success: false, message: "Cart item not found" };
    }

    if (quantity <= 0) {
      await cartCollection.deleteOne({
        _id: new ObjectId(cartId),
        userEmail,
      });

      return { success: true, message: "Item removed" };
    }

    const safeQuantity = Math.min(quantity, item.stock || 999);

    await cartCollection.updateOne(
      {
        _id: new ObjectId(cartId),
        userEmail,
      },
      {
        $set: {
          quantity: safeQuantity,
          updatedAt: new Date(),
        },
      }
    );

    return { success: true, message: "Quantity updated" };
  } catch (error) {
    console.error("updateCartQuantity error:", error);
    return { success: false, message: error.message };
  }
};

export const removeCartItem = async ({ cartId, userEmail }) => {
  try {
    if (!cartId || !userEmail) {
      return { success: false, message: "Please login first" };
    }

    const cartCollection = await cartCollectionPromise;

    await cartCollection.deleteOne({
      _id: new ObjectId(cartId),
      userEmail,
    });

    return { success: true, message: "Item removed" };
  } catch (error) {
    console.error("removeCartItem error:", error);
    return { success: false, message: error.message };
  }
};

export const clearCart = async (userEmail) => {
  try {
    if (!userEmail) {
      return { success: false, message: "Please login first" };
    }

    const cartCollection = await cartCollectionPromise;

    await cartCollection.deleteMany({ userEmail });

    return { success: true, message: "Cart cleared" };
  } catch (error) {
    console.error("clearCart error:", error);
    return { success: false, message: error.message };
  }
};
