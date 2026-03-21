"use server";

import { collections, dbConnect } from "@/lib/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

// ১. Create Accessory
export const createAccessory = async (data) => {
  try {
    const accessoriesCollection = await dbConnect(collections.ACCESSORIES);
    const stockCount = Number(data.stock) || 0;

    const newAccessory = {
      title: data.title?.trim(),
      category: data.category,
      sku: data.sku?.toUpperCase()?.trim(),
      tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
      brand: data.brand?.trim(),
      targetPet: data.targetPet || "All Pets",
      stock: stockCount,
      inStock: stockCount > 0,
      price: Number(data.price) || 0,
      discountPrice: data.discountPrice ? Number(data.discountPrice) : 0,
      weight: data.weight?.trim(),
      size: data.size?.trim(),
      image: data.image,
      description: data.description?.trim(),
      material: data.material?.trim(),
      warranty: data.warranty,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await accessoriesCollection.insertOne(newAccessory);
    
    revalidatePath("/pet-accessories");
    revalidatePath("/dashboard/accessories-management");

    return {
      success: true,
      id: result.insertedId.toString(),
      message: "Accessory added successfully",
    };
  } catch (error) {
    console.error("createAccessory error:", error);
    return { success: false, error: "Failed to save data to database." };
  }
};

// ২. Get All Accessories
export const getPetAccessories = async () => {
  try {
    const accessoriesCollection = await dbConnect(collections.ACCESSORIES);
    const items = await accessoriesCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return items.map((item) => ({
      ...item,
      _id: item._id.toString(),
      createdAt: item.createdAt?.toISOString?.() || item.createdAt,
      updatedAt: item.updatedAt?.toISOString?.() || item.updatedAt,
    }));
  } catch (error) {
    console.error("getPetAccessories error:", error);
    return [];
  }
};

// ৩. Get Single Accessory
export const getSingleAccessory = async (id) => {
  try {
    if (!id || !ObjectId.isValid(id)) return null;

    const accessoriesCollection = await dbConnect(collections.ACCESSORIES);
    const item = await accessoriesCollection.findOne({ _id: new ObjectId(id) });

    if (!item) return null;

    return {
      ...item,
      _id: item._id.toString(),
      createdAt: item.createdAt?.toISOString?.() || item.createdAt,
      updatedAt: item.updatedAt?.toISOString?.() || item.updatedAt,
    };
  } catch (error) {
    console.error("getSingleAccessory error:", error);
    return null;
  }
};

// ৪. Get Sales Statistics
export const getSalesStats = async () => {
  try {
    const ordersCollection = await dbConnect(collections.ORDERS || "orders");
    
    const orders = await ordersCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.totalAmount) || 0), 0);
    const totalUnits = orders.length;

    return {
      success: true,
      totalRevenue,
      totalUnits,
      recentOrders: orders.map(order => ({
        ...order,
        _id: order._id.toString(),
        createdAt: order.createdAt?.toISOString?.() || order.createdAt
      }))
    };
  } catch (error) {
    console.error("getSalesStats error:", error);
    return { success: false, totalRevenue: 0, totalUnits: 0, recentOrders: [] };
  }
};

export const updateAccessory = async (id, data) => {
  try {
    if (!id || !ObjectId.isValid(id)) return { success: false, error: "Invalid ID" };

    const accessoriesCollection = await dbConnect(collections.ACCESSORIES);
    const stockCount = Number(data.stock) || 0;

    const updatedData = {
      title: data.title?.trim(),
      category: data.category,
      price: Number(data.price) || 0,
      stock: stockCount,
      inStock: stockCount > 0,
      description: data.description?.trim(),
      updatedAt: new Date(),
    };

    if (data.image) updatedData.image = data.image;

    const result = await accessoriesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    revalidatePath("/pet-accessories");
    revalidatePath("/dashboard/accessories-management");

    return { 
      success: result.modifiedCount > 0 || result.matchedCount > 0, 
      message: "Updated successfully" 
    };
  } catch (error) {
    console.error("updateAccessory error:", error);
    return { success: false, error: error.message };
  }
};

// ৬. Delete Accessory
export const deleteAccessory = async (id) => {
  try {
    if (!id || !ObjectId.isValid(id)) return { success: false, error: "Invalid ID" };

    const accessoriesCollection = await dbConnect(collections.ACCESSORIES);
    const result = await accessoriesCollection.deleteOne({ _id: new ObjectId(id) });

    revalidatePath("/pet-accessories");
    revalidatePath("/dashboard/accessories-management");

    return { success: result.deletedCount === 1 };
  } catch (error) {
    console.error("deleteAccessory error:", error);
    return { success: false, error: error.message };
  }
};

// ৭. Reduce Stock on Purchase
export const reduceAccessoryStock = async (items = []) => {
  try {
    if (!items.length) return { success: false };

    const accessoriesCollection = await dbConnect(collections.ACCESSORIES);

    for (const item of items) {
      const idStr = item.productId || item.product_id || item._id;
      if (!idStr || !ObjectId.isValid(idStr)) continue;

      const quantity = Number(item.quantity) || 1;

      await accessoriesCollection.updateOne(
        { 
          _id: new ObjectId(idStr), 
          stock: { $gte: quantity } 
        },
        [
          {
            $set: {
              stock: { $subtract: ["$stock", quantity] },
              updatedAt: new Date()
            }
          },
          {
            $set: {
              inStock: { $gt: ["$stock", 0] }
            }
          }
        ]
      );
    }

    revalidatePath("/pet-accessories");
    return { success: true };
  } catch (error) {
    console.error("reduceAccessoryStock error:", error);
    return { success: false };
  }
};