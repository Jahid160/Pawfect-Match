"use server";

import { collections, dbConnect } from "@/lib/db"; 
import { ObjectId } from "mongodb"; 
import { revalidatePath } from "next/cache"; 

export const addVaccine = async (vaccineData) => {
  try {
    const vaccineCollection = await dbConnect(collections.VACCINES);
    const formattedData = {
      vaccineName: vaccineData.vaccineName, // ডাটাবেজে এই নামে সেভ হবে
      price: Number(vaccineData.price) || 0,
      stock: Number(vaccineData.stock) || 0,
      forPet: vaccineData.forPet || "All Pets",
      description: vaccineData.description,
      image: vaccineData.image,
      createdAt: new Date(),
    };
    await vaccineCollection.insertOne(formattedData);
    revalidatePath("/vaccination");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export const getVaccines = async () => {
  try {
    const vaccineCollection = await dbConnect(collections.VACCINES);
    const vaccines = await vaccineCollection.find({}).sort({ createdAt: -1 }).toArray();
    return vaccines.map(v => ({
      ...v,
      _id: v._id.toString(),
      vaccineName: v.vaccineName || "Unnamed Vaccine", // প্রপার্টি নেম চেক
      price: Number(v.price || 0),
      stock: Number(v.stock || 0)
    }));
  } catch (error) {
    return [];
  }
};