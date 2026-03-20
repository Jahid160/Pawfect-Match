"use server";

import { dbConnect, collections } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

/* ADD VACCINE */
export const addVaccine = async (data) => {
  try {
    const col = await dbConnect(collections.VACCINES);

    await col.insertOne({
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
      createdAt: new Date(),
    });

    revalidatePath("/vaccination");
    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
};

/* GET ALL (SORTED: NEW FIRST) */
export const getVaccines = async (id) => {
  try {
    const col = await dbConnect(collections.VACCINES);

    const data = await col
      .find({})
      .sort({ createdAt: -1 }) // 🔥 newest first
      .toArray();

    return data.map((v) => ({
      ...v,
      _id: v._id.toString(),
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
};

/* GET SINGLE BY ID */
export const getVaccineById = async (id) => {
  try {
    const col = await dbConnect(collections.VACCINES);

    const vaccine = await col.findOne({
      _id: new ObjectId(id),
    });

    if (!vaccine) return null;

    return {
      ...vaccine,
      _id: vaccine._id.toString(),
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};