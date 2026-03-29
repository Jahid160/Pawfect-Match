"use server";

import { collections, dbConnect } from "@/lib/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";


const cartCollectionPromise = dbConnect(collections.CART);


export const addToCart = async (payload) => {
  try {
    const {
      userEmail,
      productId,
      productName,
      image,
      price,
      stock = 0,
      brand,
      weight,
      weightUnit,
      productType = "food",
      inStock = true
    } = payload;

    if (!userEmail || !productId) {
      return { success: false, message: "Please login first" };
    }

    const cartCollection = await cartCollectionPromise;


    const existingItem = await cartCollection.findOne({
      userEmail,
      productId: productId,
      productType: productType
    });

    if (existingItem) {

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


    const doc = {
      userEmail,
      productId,
      productName,
      image,
      price: Number(price) || 0,
      stock: Number(stock) || 0,
      brand: brand || "",
      weight: weight || "",
      weightUnit: weightUnit || "",
      productType,
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
      productId: (item.productId || item.foodId || item._id).toString(),
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

    if (Number(quantity) <= 0) {
      await cartCollection.deleteOne({ _id: itemObjectId, userEmail });
    } else {
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