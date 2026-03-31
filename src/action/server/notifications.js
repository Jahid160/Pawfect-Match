"use server";

import { collections, dbConnect } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getAdminNotifications = async () => {
  try {
    const notificationCollection = await dbConnect(collections.NOTIFICATIONS);

    const notifications = await notificationCollection
      .find({ receiverRole: "admin" })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    const unreadCount = await notificationCollection.countDocuments({
      receiverRole: "admin",
      isRead: false
    });

    const formattedNotifications = notifications.map(notif => ({
      ...notif,
      _id: notif._id.toString(),
      time: formatNotificationTime(notif.createdAt)
    }));

    return { success: true, notifications: formattedNotifications, unreadCount };
  } catch (error) {
    console.error("Fetch Admin Notifications Error:", error);
    return { success: false, message: error.message };
  }
};


export const getUserNotifications = async (userEmail) => {
  try {
    if (!userEmail) return { success: false, message: "User Email is required" };

    const notificationCollection = await dbConnect(collections.NOTIFICATIONS);

    const notifications = await notificationCollection
      .find({ receiverEmail: userEmail })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    const unreadCount = await notificationCollection.countDocuments({
      receiverEmail: userEmail,
      isRead: false
    });

    const formattedNotifications = notifications.map(notif => ({
      ...notif,
      _id: notif._id.toString(),
      time: formatNotificationTime(notif.createdAt)
    }));

    return { success: true, notifications: formattedNotifications, unreadCount };
  } catch (error) {
    console.error("Fetch User Notifications Error:", error);
    return { success: false, message: error.message };
  }
};

export const getDoctorNotifications = async () => {
  try {
    const notificationCollection = await dbConnect(collections.NOTIFICATIONS);

    const notifications = await notificationCollection
      .find({ receiverRole: "doctor" })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    const unreadCount = await notificationCollection.countDocuments({
      receiverRole: "doctor",
      isRead: false
    });

    return { 
      success: true, 
      notifications: notifications.map(n => ({ ...n, _id: n._id.toString(), time: formatNotificationTime(n.createdAt) })), 
      unreadCount 
    };
  } catch (error) {
    return { success: false };
  }
};

export const createNotification = async ({ title, message, type, receiverRole, receiverEmail,userEmail }) => {
  try {
    const notificationCollection = await dbConnect(collections.NOTIFICATIONS);

    const newNotification = {
      title,
      message,
      type,
      receiverRole: receiverRole || null,
      receiverEmail: receiverEmail || null,
      userEmail: userEmail || null ,
      isRead: false,
      createdAt: new Date(),
    };

    const result = await notificationCollection.insertOne(newNotification);

    revalidatePath("/dashboard");

    return { success: true, id: result.insertedId.toString() };
  } catch (error) {
    console.error("Notification Creation Error:", error);
    return { success: false };
  }
};


export const markNotificationsAsRead = async (role = null, userEmail = null) => {
  try {
    const notificationCollection = await dbConnect(collections.NOTIFICATIONS);

    let query = {};
    if (role) {
      query = { receiverRole: role, isRead: false };
    } else if (userEmail) {
      query = { receiverEmail: userEmail, isRead: false };
    }

    if (Object.keys(query).length === 0) return { success: false };

    await notificationCollection.updateMany(
      query,
      { $set: { isRead: true } }
    );

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Mark as Read Error:", error);
    return { success: false, message: error.message };
  }
};

const formatNotificationTime = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;

  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
};