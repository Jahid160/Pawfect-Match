"use server";
import { authOptions } from "@/lib/authOptions";
import { collections, dbConnect } from "@/lib/db";
import { doctorAuth } from "@/lib/doctorAuth";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const getCompletedOrdersHistory = async () => {
  await doctorAuth();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { success: false, message: "Doctor not authenticated" };
  }
  try {
    const orderCollection = await dbConnect(collections.VACCINES_ORDERS);
    const orders = await orderCollection
      .find({ doctorEmail: session.user.email, status: "Completed" })
      .sort({ createdAt: -1 })
      .toArray();
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    return [];
  }
};

export const getAppointmentsOrders = async () => {
  await doctorAuth();
  try {
    const orderCollection = await dbConnect(collections.VACCINES_ORDERS);
    const orders = await orderCollection
      .find({ status: "Completing" })
      .sort({ createdAt: -1 })
      .toArray();
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    return [];
  }
};

export const completedOrder = async (orderId) => {
  await doctorAuth();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { success: false, message: "Doctor not authenticated" };
  }

  try {
    const orderCollection = await dbConnect(collections.VACCINES_ORDERS);

    const result = await orderCollection.updateOne(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          status: "Completed",
          doctorName: session.user.name,
          doctorEmail: session.user.email,
          CompletedAtByDoctor: new Date(),
        },
      },
    );

    if (result.modifiedCount > 0) {
      revalidatePath("/dashboard/appointments");
      revalidatePath("/dashboard/doctor");
      return { success: true };
    }

    return { success: false, message: "Update failed" };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false };
  }
};

export const deleteOrder = async (id) => {
  await doctorAuth();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { success: false, message: "Doctor not authenticated" };
  }

  try {
    const orderCollection = await dbConnect(collections.VACCINES_ORDERS);

    // Fixed: Use 'id' which is passed as parameter
    const result = await orderCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount > 0) {
      // Revalidate to update the UI instantly
      revalidatePath("/dashboard/appointments");
      revalidatePath("/dashboard/doctor");
      return { success: true, message: "Appointment rejected successfully" };
    }

    return { success: false, message: "Order not found" };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, message: "Failed to delete from database" };
  }
};

export const getDoctorDashboardStats = async () => {
  await doctorAuth();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { success: false, message: "Doctor not authenticated" };
  }
  try {
    const user = await doctorAuth();

    const requestCollection = await dbConnect(collections.VACCINES_ORDERS);
    const completing = await requestCollection
      .find({ status: "Completing", doctorEmail: user.email })
      .sort({ createdAt: -1 })
      .toArray();
    const completed = await requestCollection
      .find({ status: "Completed" })
      .sort({ createdAt: -1 })
      .toArray();

    const pendingOrders = completing.filter(
      (o) => o.status === "Completing",
    ).length;
    const completedOrders = completed.filter(
      (o) => o.status === "Completed",
    ).length;

    return {
      success: true,
      data: {
        pendingOrders: pendingOrders,
        completedOrders: completedOrders,
      },
    };
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return {
      success: false,
      data: { pendingOrders: 0, completedOrders: 0 },
    };
  }
};
