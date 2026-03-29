"use server";

import { userVerifyAuth } from "@/lib/userVerifyAuth";
import { ObjectId } from "mongodb";
import { createNotification } from "@/action/server/notifications"; // notification action-ta import korlam

const { dbConnect, collections } = require("@/lib/db");

const adoptionCollectionPromise = dbConnect(collections.ADOPTIONS);
const petCollectionPromise = dbConnect(collections.PETS);

const generateId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 10; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

export const createAdoptionUser = async (data) => {
  try {
    let user; 
    try {
      user = await userVerifyAuth();
    } catch (error) {
      return { success: false, message: error.message };
    }

    const userEmail = user.email;
    const userName = user.name || "A User"; // User-er naam nichi notification-e dekhate

    const adoptionCollection = await adoptionCollectionPromise;
    const petCollection = await petCollectionPromise;

    // ✅ generate 10 character id
    const adoptionId = generateId();

    // 1. Pet-er status update kora
    await petCollection.updateOne(
      { _id: new ObjectId(data.petId) },
      {
        $set: {
          status: "pending",
          adoptedUserEmail: userEmail,
          adoptionCode: adoptionId,
          adoptedUserTime: new Date(),
        },
      },
    );

    // 2. Adoption Request save kora
    const result = await adoptionCollection.insertOne({
      ...data,
      adoptionCode: adoptionId,
      status: "pending",
      adoptedUserTime: new Date(),
    });

    // ✅ 3. Admin Notification Create Kora (THIS WAS MISSING)
    if (result.insertedId) {
      await createNotification({
        title: "New Adoption Request",
        message: `${userName} sent a request to adopt a pet (Code: ${adoptionId}). Check it out!`,
        type: "adoption", // Navbar-er icon logic match korbe
        receiverRole: "admin",
      });
    }

    return {
      success: true,
      id: result.insertedId.toString(),
      adoptionCode: adoptionId,
    };
  } catch (error) {
    console.error("Adoption Creation Error:", error);
    return { success: false, error: error.message };
  }
};

export const getAdoptionUserByCode = async (adoptionCode) => {
  try {
    const adoptionCollection = await adoptionCollectionPromise;

    const userData = await adoptionCollection.findOne({
      adoptionCode: adoptionCode,
    });

    if (!userData) {
      return { success: false, message: "Adoption user not found" };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(userData)),
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};