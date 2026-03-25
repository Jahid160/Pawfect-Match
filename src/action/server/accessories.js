"use server";

import { collections, dbConnect } from "@/lib/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export const createAccessory = async (data) => {
  try {
    const accessoriesCollection = await dbConnect(collections.ACCESSORIES);

    const newAccessory = {
      title: data.title,
      category: data.category,
      sku: data.sku,
      tags: data.tags,
      brand: data.brand,
      targetPet: data.targetPet,
      stock: Number(data.stock) || 0,
      inStock: Number(data.stock) > 0,
      price: Number(data.price) || 0,
      discountPrice: data.discountPrice ? Number(data.discountPrice) : 0,
      weight: data.weight,
      size: data.size,
      image: data.image,
      description: data.description,
      material: data.material,
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

// (Get All Accessories)
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

// (Get Single Accessory)
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
    };
  } catch (error) {
    console.error("getSingleAccessory error:", error);
    return null;
  }
};

// (Delete Accessory)
export const deleteAccessory = async (id) => {
  try {
    if (!ObjectId.isValid(id)) return { success: false, error: "Invalid ID" };

    const accessoriesCollection = await dbConnect(collections.ACCESSORIES);
    const result = await accessoriesCollection.deleteOne({ _id: new ObjectId(id) });

    revalidatePath("/dashboard/accessories-management");
    return { success: result.deletedCount === 1 };
  } catch (error) {
    console.error("deleteAccessory error:", error);
    return { success: false, error: error.message };
  }
};

// (Reduce Accessory Stock - For Cart/Buy)
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
          stock: { $gte: quantity },
        },
        {
          $inc: { stock: -quantity },
          $set: { updatedAt: new Date() },
        }
      );
    }

    
    await accessoriesCollection.updateMany(
      { stock: { $lte: 0 } },
      { $set: { inStock: false } }
    );

    return { success: true };
  } catch (error) {
    console.error("reduceAccessoryStock error:", error);
    return { success: false };
  }
};