"use server";

import { auth } from "@/auth";
import { dbConnect,collections } from "@/lib/db";
const adoptionCollectionPromise = dbConnect(collections.ADOPTIONS);

export const getUserAdoptions = async () => {
  const session = await auth();
  if (!session?.user?.email) return { success: false, data: [] };

  try {
    const collection = await adoptionCollectionPromise;
    const requests = await collection
      .find({ requesterEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(requests)),
    };
  } catch (error) {
    console.error("Fetch Error:", error);
    return { success: false, data: [] };
  }
};
