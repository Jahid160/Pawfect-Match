"use server";

import { collections, dbConnect } from "@/lib/db";
import { ObjectId } from "mongodb"; // ObjectId ইম্পোর্ট করা জরুরি

// ১. নতুন অ্যাক্সেসরিজ তৈরি করার ফাংশন
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
               price: Number(data.price) || 0, 
               discountPrice: data.discountPrice ? Number(data.discountPrice) : 0,
               weight: data.weight,
               size: data.size,
               image: data.image, 
               description: data.description,
               material: data.material,
               warranty: data.warranty,
               createdAt: new Date(),
          };

          const result = await accessoriesCollection.insertOne(newAccessory);

          return {
               success: true,
               id: result.insertedId.toString(),
               message: "Accessory added successfully"
          };
     } catch (error) {
          console.error("createAccessory error:", error);
          return { success: false, error: "Failed to save data to database." };
     }
};

// ২. সব অ্যাক্সেসরিজ পাওয়ার ফাংশন
export const getPetAccessories = async () => {
     try {
          const accessoriesCollection = await dbConnect(collections.ACCESSORIES);
          const items = await accessoriesCollection.find().toArray();

          return items.map((item) => ({
               ...item,
               _id: item._id.toString(),
               createdAt: item.createdAt?.toISOString?.() || item.createdAt || null,
          }));
     } catch (error) {
          console.error("getPetAccessories error:", error);
          return [];
     }
};

// ৩. একটি নির্দিষ্ট অ্যাক্সেসরিজ পাওয়ার ফাংশন
export const getSingleAccessory = async (id) => {
     try {
          // ID ভ্যালিডেশন
          if (!id || !ObjectId.isValid(id)) {
               return null;
          }

          const accessoriesCollection = await dbConnect(collections.ACCESSORIES);

          const item = await accessoriesCollection.findOne({
               _id: new ObjectId(id),
          });

          if (!item) return null;

          return {
               ...item,
               _id: item._id.toString(),
               createdAt: item.createdAt?.toISOString?.() || item.createdAt || null,
          };
     } catch (error) {
          console.error("getSingleAccessory error:", error);
          return null;
     }
};