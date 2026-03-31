"use server";
import { collections, dbConnect } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { verifyAdmin } from "@/lib/adminAuth";
import { verifyAuth } from "@/lib/verifyAuth";

// start of vaccine

export const placeVaccineOrder = async (data) => {
  await verifyAuth();
  const session = await getServerSession(authOptions);
  try {
    const ordersCollection = await dbConnect(collections.VACCINES_ORDERS);

    const existingOrder = await ordersCollection.findOne({
      vaccineId: data.vaccineId,
      userEmail: session.user.email,
    });

    if (existingOrder) {
      return { success: false, message: "Already ordered" };
    }

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
    await ordersCollection.insertOne(newOrder);

    revalidatePath("/dashboard/vaccinations");
    revalidatePath("/dashboard/doctor");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

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

    revalidatePath("/dashboard/vaccinations");
    revalidatePath("/dashboard/doctor");

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// admin only in vaccine management
export const deleteVaccine = async (id) => {
  await verifyAdmin();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { success: false, message: "Doctor not authenticated" };
  }

  try {
    const orderCollection = await dbConnect(collections.VACCINES_ORDERS);

    const result = await orderCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount > 0) {
      // Revalidate to update the UI instantly
      revalidatePath("/dashboard/vaccinations");
      return { success: true, message: "Vaccine deleted successfully" };
    }

    return { success: false, message: "Order not found" };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, message: "Failed to delete from database" };
  }
};

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
