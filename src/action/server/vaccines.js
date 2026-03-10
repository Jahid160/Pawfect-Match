"use server";

import { collections, dbConnect } from "@/lib/db"; //
import { ObjectId } from "mongodb"; // ID হ্যান্ডেল করার জন্য এটি প্রয়োজন
import { revalidatePath } from "next/cache"; //

// ১. নতুন ভ্যাক্সিন যোগ করার জন্য (Form Submission)
export const addVaccine = async (vaccineData) => {
  try {
    const vaccineCollection = await dbConnect(collections.VACCINES);
    
    const result = await vaccineCollection.insertOne({
      ...vaccineData,
      createdAt: new Date(),
    });

    // ইনভেন্টরি পেজের ডাটা আপডেট করার জন্য
    revalidatePath("/vaccination");
    
    return { success: true, id: result.insertedId.toString() };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Failed to add vaccine" };
  }
};

// ২. সব ভ্যাক্সিন লিস্ট নিয়ে আসার জন্য (Inventory List)
export const getVaccines = async () => {
  try {
    const vaccineCollection = await dbConnect(collections.VACCINES);
    const vaccines = await vaccineCollection.find({}).toArray();
    
    return vaccines.map(v => ({
      ...v,
      _id: v._id.toString() // ক্লায়েন্ট কম্পোনেন্টে ব্যবহারের জন্য String এ কনভার্ট করা হয়েছে
    }));
  } catch (error) {
    console.error("Fetch All Error:", error);
    return [];
  }
};

// ৩. একটি নির্দিষ্ট ভ্যাক্সিনের ডিটেইলস দেখার জন্য (Details Page)
export const getVaccineById = async (id) => {
  try {
    // আইডি ভ্যালিড কি না চেক করা
    if (!id || id.length !== 24) return null;

    const vaccineCollection = await dbConnect(collections.VACCINES);
    const vaccine = await vaccineCollection.findOne({ _id: new ObjectId(id) });
    
    if (!vaccine) return null;

    return {
      ...vaccine,
      _id: vaccine._id.toString()
    };
  } catch (error) {
    console.error("Fetch By ID Error:", error);
    return null;
  }
};