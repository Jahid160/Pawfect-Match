import { dbConnect, collections } from "@/lib/db";
import { verifyAuth } from "@/lib/verifyAuth";
import { ObjectId } from "mongodb";

const petCollectionPromise = dbConnect(collections.PETS);
// @/action/server/savePetsAction.js

export async function getMySavedPets() {
  try {
    const user = await verifyAuth();
    if (!user) return { success: false, message: "Unauthorized" };

    const userId = user._id.toString();
    const petsCollection = await dbConnect(collections.PETS);

    const mySavedPets = await petsCollection
      .find({ savedBy: { $in: [userId] } })
      .sort({ createdAt: -1 })
      .toArray();

    return { success: true, data: JSON.parse(JSON.stringify(mySavedPets)) };
  } catch (error) {
    console.error("Error fetching saved pets:", error);
    return { success: false, data: [] };
  }
}


export async function removeFavoriteAction(petId) {
  try {
    const user = await verifyAuth();
    if (!user) return { success: false };

    const userId = user._id.toString();
    const petsCollection = await dbConnect(collections.PETS);


    await petsCollection.updateOne(
      { _id: new ObjectId(petId) },
      { $pull: { savedBy: userId } }
    );

    return { success: true };
  } catch (error) {
    console.error("Remove favorite error:", error);
    return { success: false };
  }
}
