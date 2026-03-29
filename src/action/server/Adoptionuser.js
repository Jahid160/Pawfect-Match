"use server";

import { userVerifyAuth } from "@/lib/userVerifyAuth";
import { ObjectId } from "mongodb";
import { createNotification } from "@/action/server/notifications";

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
    const userId = user.id || user._id;
    const userName = user.name || "A User";

    const adoptionCollection = await adoptionCollectionPromise;
    const petCollection = await petCollectionPromise;

    const adoptionId = generateId();

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

    const result = await adoptionCollection.insertOne({
      ...data,
      userId: userId,
      adoptionCode: adoptionId,
      status: "pending",
      adoptedUserTime: new Date(),
    });

    if (result.insertedId) {
      await createNotification({
        title: "New Adoption Request",
        message: `${userName} sent a request for adoption (Code: ${adoptionId}).`,
        type: "adoption",
        receiverRole: "admin",
      });

      await createNotification({
        title: "Adoption Request Pending",
        message: `Your request for adoption (Code: ${adoptionId}) has been received. Please wait for approval.`,
        type: "adoption",
        receiverId: userId,
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