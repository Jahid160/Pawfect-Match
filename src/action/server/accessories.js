"use server";

import { collections, dbConnect } from "@/lib/db";

export const createAccessory = async (data) => {
     try {
          const accessoriesCollection = await (await dbConnect(collections.ACCESSORIES));

          // Data cleanup (e.g., converting string to number)
          const newAccessory = {
               title: data.title,
               category: data.category,
               sku: data.sku,
               tags: data.tags,
               brand: data.brand,
               targetPet: data.targetPet,
               stock: Number(data.stock), // Convert string to number
               price: Number(data.price), // Convert string to number
               discountPrice: data.discountPrice ? Number(data.discountPrice) : 0,
               weight: data.weight,
               size: data.size,
               image: data.image, // This must be a URL string
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

export const getPetAccessories = async () => {
     try {
          const accessoriesCollection = await accessoriesCollectionPromise;
          const items = await accessoriesCollection.find().toArray();

          return items.map((item) => ({
               ...item,
               _id: item._id.toString(),
               createdAt: item.createdAt?.toISOString?.() || item.createdAt,
          }));
     } catch (error) {
          console.error("getPetAccessories error:", error);
          return [];
     }
};

export const getSingleAccessory = async (id) => {
     try {
          if (!ObjectId.isValid(id)) {
               return {};
          }

          const accessoriesCollection = await accessoriesCollectionPromise;

          const item = await accessoriesCollection.findOne({
               _id: new ObjectId(id),
          });

          if (!item) return {};

          return {
               ...item,
               _id: item._id.toString(),
               createdAt: item.createdAt?.toISOString?.() || item.createdAt,
          };
     } catch (error) {
          console.error("getSingleAccessory error:", error);
          return {};
     }
};