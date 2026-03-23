"use server";
import { verifyAdmin } from "@/lib/adminAuth";
import { collections, dbConnect } from "@/lib/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"

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

export const getSingleUser = async (email) => {
  try {
    const UserCollection = await userCollectionPromise;
    const result = await UserCollection.findOne(
      { email: email },
      {
        projection: {
          image: 1,
          _id: 0
        }
      }
    );
    if (!result) {
      return { success: false, message: "User not found" };
    }
    return { success: true, user: result };

  } catch (error) {
    console.error("Error fetching user:", error);
    return { success: false, message: "Internal Server Error" };
  }
}




export const updateUserProfileImage = async (email, imageUrl) => {
  try {
    const UserCollection = await userCollectionPromise;
    const result = await UserCollection.updateOne(
      { email: email },
      { $set: { image: imageUrl } }
    );

    if (result.modifiedCount > 0) {
      revalidatePath('/dashboard/profile')
      return { success: true };
    }
    return { success: false, message: "No changes made" };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
