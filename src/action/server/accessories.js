"use server";

import { collections, dbConnect } from "@/lib/db";
import { ObjectId } from "mongodb";

const accessoriesCollectionPromise = dbConnect(collections.ACCESSORIES);

export const createAccessory = async (data) => {
     try {
          const accessoriesCollection = await accessoriesCollectionPromise;

          const result = await accessoriesCollection.insertOne({
               ...data,
               createdAt: new Date(),
          });

          return { success: true, id: result.insertedId.toString() };
     } catch (error) {
          console.error("createAccessory error:", error);
          return { success: false, error: error.message };
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