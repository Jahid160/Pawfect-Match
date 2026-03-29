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
      { $pull: { savedBy: userId } },
    );

    if (savedPets.length > 0) {
      const objectIds = savedPets.map((id) => new ObjectId(id));
      await PetCollection.updateMany(
        { _id: { $in: objectIds } },
        { $addToSet: { savedBy: userId } },
      );
    }

    revalidatePath("/all-pets");
    return { success: true };
  } catch (error) {
    console.error("Sync error:", error);
    return { success: false, error: error.message };
  }
}

export async function toggleSaveAction(petId) {
  try {
    const user = await verifyAuth();
    if (!user) return { success: false, message: "Unauthorized" };

    const userId = user._id.toString();
    const PetCollection = await dbConnect(collections.PETS);


    const pet = await PetCollection.findOne({ _id: new ObjectId(petId) });
    if (!pet) return { success: false, message: "Pet not found" };

    const isAlreadySaved = pet.savedBy?.includes(userId);

    if (isAlreadySaved) {

      await PetCollection.updateOne(
        { _id: new ObjectId(petId) },
        {
          $pull: { savedBy: userId },
          $inc: { saveCount: -1 },
        },
      );
    } else {

      await PetCollection.updateOne(
        { _id: new ObjectId(petId) },
        {
          $addToSet: { savedBy: userId },
          $inc: { saveCount: 1 },
        },
      );
    }


    revalidatePath(`/pet-profile/${petId}`);
    revalidatePath("/all-pets");
    revalidatePath("/dashboard/saved-pets");

    return { success: true, isSaved: !isAlreadySaved };
  } catch (error) {
    console.error("Toggle error:", error);
    return { success: false, error: error.message };
  }
}
