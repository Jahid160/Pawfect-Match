"use server";
import { collections, dbConnect } from "@/lib/db"; 
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";

// ১. ভ্যাকসিন অর্ডার প্লেস করা
export const placeVaccineOrder = async (data) => {
  try {
    const orderCollection = await dbConnect(collections.ORDERS);
    const newOrder = {
      vaccineId: data.vaccineId,
      vaccineName: data.vaccineName,
      userName: data.userName || "MD SHAKIL", // ডিফল্ট নাম
      userEmail: data.userEmail || "shakil@example.com",
      status: "Pending",
      adminAccepted: false,
      doctorAssigned: false,
      isCompleted: false,
      deadlineDate: null, 
      createdAt: new Date(),
    };
    await orderCollection.insertOne(newOrder);
    
    // সব রিলেটেড পাথ রিভ্যালিডেট করুন
    revalidatePath("/dashboard/vaccinations");
    revalidatePath("/dashboard/doctor"); 
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ২. অ্যাডমিন একসেপ্ট
export const adminAcceptOrder = async (orderId) => {
  try {
    const orderCollection = await dbConnect(collections.ORDERS);
    await orderCollection.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { status: "AdminAccepted", adminAccepted: true } }
    );
    
    revalidatePath("/dashboard/vaccinations");
    revalidatePath("/dashboard/doctor"); 
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// ৩. ডক্টর শিডিউল (এটিই আপনার ডক্টর পেজে ডাটা পাঠাবে)
export const doctorScheduleOrder = async (orderId, days) => {
  try {
    const orderCollection = await dbConnect(collections.ORDERS);
    const deadline = new Date();
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
    
    // এই পাথটি নিশ্চিত করুন আপনার ডক্টর পেজের সাথে মিল আছে কি না
    revalidatePath("/dashboard/vaccinations");
    revalidatePath("/dashboard/doctor"); 
    
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// ৪. কমপ্লিট করা
export const completeVaccination = async (orderId) => {
  try {
    const orderCollection = await dbConnect(collections.ORDERS);
    await orderCollection.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { status: "Completed", isCompleted: true } }
    );
    
    revalidatePath("/dashboard/vaccinations");
    revalidatePath("/dashboard/doctor"); 
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// ৫. সব অর্ডার গেট করা
export const getAllOrders = async () => {
  try {
    const orderCollection = await dbConnect(collections.ORDERS);
    const orders = await orderCollection.find({}).sort({ createdAt: -1 }).toArray();
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    return [];
  }
};