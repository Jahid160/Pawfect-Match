"use server";

import { collections, dbConnect } from "@/lib/db";
import { ObjectId } from "mongodb";
import { verifyAuth } from "@/lib/verifyAuth";
import { revalidatePath } from "next/cache";

const petCollectionPromise = dbConnect(collections.PETS);

export async function syncSavedPetsAction(savedPets) {
  try {
    const user = await verifyAuth();
    if (!user) return { success: false, message: "Unauthorized" };
    
    const userId = user._id.toString();
    const PetCollection = await petCollectionPromise;


    await PetCollection.updateMany(
      { savedBy: userId },
      { $pull: { savedBy: userId } }
    );


    if (savedPets.length > 0) {
      const objectIds = savedPets.map(id => new ObjectId(id));
      await PetCollection.updateMany(
        { _id: { $in: objectIds } },
        { $addToSet: { savedBy: userId } }
      );
    }

    revalidatePath("/all-pets");
    return { success: true };
  } catch (error) {
    console.error("Sync error:", error);
    return { success: false, error: error.message };
  }
}
