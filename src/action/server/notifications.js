"use server";
import { collections, dbConnect } from "@/lib/db";
import { ObjectId } from "mongodb";

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

export const getUserNotifications = async (userId) => {
  try {
    if (!userId) return { success: false, message: "User ID is required" };
    
    const notificationCollection = await dbConnect(collections.NOTIFICATIONS);
    
    const notifications = await notificationCollection
      .find({ receiverId: userId }) 
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    const unreadCount = await notificationCollection.countDocuments({ 
      receiverId: userId, 
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

export const createNotification = async ({ title, message, type, receiverRole, receiverId }) => {
  try {
    const notificationCollection = await dbConnect(collections.NOTIFICATIONS);
    
    const newNotification = {
      title,
      message,
      type,
      receiverRole: receiverRole || null, 
      receiverId: receiverId || null,
      isRead: false,
      createdAt: new Date(),
    };
    
    const result = await notificationCollection.insertOne(newNotification);
    return { success: true, id: result.insertedId.toString() };
  } catch (error) {
    console.error("Notification Creation Error:", error);
    return { success: false };
  }
};

export const markNotificationsAsRead = async (role = null, userId = null) => {
  try {
    const notificationCollection = await dbConnect(collections.NOTIFICATIONS);
    
    let query = {};
    if (role) query = { receiverRole: role, isRead: false };
    else if (userId) query = { receiverId: userId, isRead: false };

    await notificationCollection.updateMany(
      query,
      { $set: { isRead: true } }
    );
    
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
  return new Date(date).toLocaleDateString();
};