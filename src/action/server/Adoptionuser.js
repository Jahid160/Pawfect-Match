"use server";

import { userVerifyAuth } from "@/lib/userVerifyAuth";
import { ObjectId } from "mongodb";

const { dbConnect, collections } = require("@/lib/db");

const adoptionCollectionPromise = dbConnect(collections.ADOPTIONS);

const petCollectionPromise = dbConnect(collections.PETS);

const generateId = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";

  for (let i = 0; i < 10; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return id;
};

export const createAdoptionUser = async (data) => {
  try {
    console.log(data);
    let user;
    try {
      user = await userVerifyAuth();
    } catch (error) {
      return { success: false, message: error.message };
    }

    const userEmail = user.email;
    console.log("Action performed by:", userEmail);

    const adoptionCollection = await adoptionCollectionPromise;
    const petCollection = await petCollectionPromise;

    // ✅ generate 10 character id
    const adoptionId = generateId();

    await petCollection.updateOne(
      { _id: new ObjectId(data.petId) },
      {
        $set: {
          status: "pending",
          adoptedUserEmail: userEmail,
          adoptionCode: adoptionId,
        },
      },
    );

    const result = await adoptionCollection.insertOne({
      ...data,
      adoptionCode: adoptionId,
      status: "pending"
    });

    return {
      success: true,
      id: result.insertedId.toString(),
      adoptionCode: adoptionId,
    };
  } catch (error) {
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