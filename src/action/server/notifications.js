"use server";
import { collections, dbConnect } from "@/lib/db";

export const getAdminNotifications = async () => {
  try {
    const notificationCollection = await dbConnect(collections.NOTIFICATIONS);
    
    const notifications = await notificationCollection
      .find({ receiverRole: "admin" })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    const unreadCount = await notificationCollection.countDocuments({ 
      receiverRole: "admin", 
      isRead: false 
    });

    return { success: true, notifications, unreadCount };
  } catch (error) {
    return { success: false, message: error.message };
  }
};