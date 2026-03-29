"use server";
import { collections, dbConnect } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { userVerifyAuth } from "@/lib/userVerifyAuth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { verifyAdmin } from "@/lib/adminAuth";
import { verifyAuth } from "@/lib/verifyAuth";

// start of vaccine
// ১. ভ্যাকসিন অর্ডার প্লেস করা
export const placeVaccineOrder = async (data) => {
  await verifyAuth();
  const session = await getServerSession(authOptions);
  try {
    console.log(session.user);
    const orderCollection = await dbConnect(collections.VACCINES_ORDERS);
    const newOrder = {
      vaccineId: data.vaccineId,
      vaccineName: data.vaccineName,
      userName: session.user.name,
      userEmail: session.user.email,
      status: "Pending",
      adminAccepted: false,
      doctorAssigned: false,
      isCompleted: false,
      deadlineDate: null,
      userImage: session.user.image,
      location: session.user.location,
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
  await verifyAdmin();
  try {
    const orderCollection = await dbConnect(collections.VACCINES_ORDERS);
    await orderCollection.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { status: "AdminAccepted", adminAccepted: true } },
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
  await verifyAdmin();
  try {
    const orderCollection = await dbConnect(collections.VACCINES_ORDERS);
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + parseInt(days));

    await orderCollection.updateOne(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          status: "Processing",
          doctorAssigned: true,
          deadlineDate: deadline,
        },
      },
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
    const orderCollection = await dbConnect(collections.VACCINES_ORDERS);
    await orderCollection.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { status: "Completing", isCompleted: true } },
    );

    revalidatePath("/dashboard/vaccinations");
    revalidatePath("/dashboard/doctor");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// end of vaccine

// ৫. সব অর্ডার গেট করা
export const getDoctorOrders = async () => {
  await verifyAdmin();
  try {
    const orderCollection = await dbConnect(collections.VACCINES_ORDERS);
    const orders = await orderCollection
      .find({ status: { $in: ["Processing", "Completed", "Pending"] } })
      .sort({ createdAt: -1 })
      .toArray();
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    return [];
  }
};

export const getVaccineOrders = async () => {
  await verifyAdmin();
  try {
    const orderCollection = await dbConnect(collections.VACCINES_ORDERS);
    const orders = await orderCollection
      .find(
        {},
        {
          projection: { 
            vaccineId: 0, 
          },
        },
      )
      .sort({ createdAt: -1 })
      .toArray();
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    return [];
  }
};
