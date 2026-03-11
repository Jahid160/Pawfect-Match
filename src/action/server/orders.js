"use server";
import { collections, dbConnect } from "@/lib/db"; 
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

// ১. নতুন অর্ডার সেভ করার ফাংশন (User-side)
export const placeVaccineOrder = async (data) => {
  try {
    const orderCollection = await dbConnect(collections.ORDERS);
    const newOrder = {
      vaccineId: data.vaccineId,
      vaccineName: data.vaccineName,
      status: "Pending",
      adminAccepted: false,
      doctorAssigned: false,
      isCompleted: false,
      deadlineDate: null, 
      createdAt: new Date(),
    };
    await orderCollection.insertOne(newOrder);
    revalidatePath("/dashboard/vaccinations");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ২. অ্যাডমিন একসেপ্ট করার ফাংশন (Admin-side)
export const adminAcceptOrder = async (orderId) => {
  try {
    const orderCollection = await dbConnect(collections.ORDERS);
    await orderCollection.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { status: "AdminAccepted", adminAccepted: true } }
    );
    revalidatePath("/dashboard/vaccinations");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// ৩. ডক্টর শিডিউল দেওয়ার ফাংশন (Doctor-side)
export const doctorScheduleOrder = async (orderId, days) => {
  try {
    const orderCollection = await dbConnect(collections.ORDERS);
    const deadline = new Date();
    // ১ দিন বা তার বেশি দিনের ডেডলাইন সেট করা
    deadline.setDate(deadline.getDate() + parseInt(days)); 

    await orderCollection.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { 
          status: "DoctorAccepted", 
          doctorAssigned: true, 
          deadlineDate: deadline 
        } 
      }
    );
    revalidatePath("/dashboard/vaccinations");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// ৪. ভ্যাকসিনেশন কমপ্লিট করার ফাংশন (New)
export const completeVaccination = async (orderId) => {
  try {
    const orderCollection = await dbConnect(collections.ORDERS);
    await orderCollection.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { 
          status: "Completed", 
          isCompleted: true 
        } 
      }
    );
    revalidatePath("/dashboard/vaccinations");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// ৫. সব অর্ডার নিয়ে আসার ফাংশন
export const getAllOrders = async () => {
  try {
    const orderCollection = await dbConnect(collections.ORDERS);
    const orders = await orderCollection.find({}).sort({ createdAt: -1 }).toArray();
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    return [];
  }
};