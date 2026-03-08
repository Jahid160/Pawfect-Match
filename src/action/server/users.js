"use server";
import { collections, dbConnect } from "@/lib/db";

const userCollectionPromise = dbConnect(collections.USERS);

export const getUsers = async () => {
  try {
    const UserCollection = await userCollectionPromise;
    const users = await UserCollection.find().toArray();

    return users.map((user) => ({
      ...user,
      _id: user._id.toString(),
    }));
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
