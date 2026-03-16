"use server";
import { verifyAdmin } from "@/lib/adminAuth";
import { collections, dbConnect } from "@/lib/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import {cookies} from "next/headers"

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

export async function blockUser(id) {
  await verifyAdmin();
      const UserCollection = await userCollectionPromise;

  await UserCollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: { status: "block" },
    }
  );
    revalidatePath("/dashboard/users");
}
export async function activeUser(id) {
  await verifyAdmin();
      const UserCollection = await userCollectionPromise;

  await UserCollection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: { status: "active" },
    }
  );
    revalidatePath("/dashboard/users");
}
