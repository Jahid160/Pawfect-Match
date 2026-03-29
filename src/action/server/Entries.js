'use server'
import { collections, dbConnect } from "@/lib/db";
import { shelterVerifyAuth } from "@/lib/shelterVerifyAuth";
import { ObjectId } from "mongodb";
const EntryReqCollectionPromise = dbConnect(collections.ENTRYREQ);

export const getPending = async (email) => {
     await shelterVerifyAuth();
     try {
          const entryCollection = await EntryReqCollectionPromise;
          const query = { email: email };
          const result = await entryCollection
               .find(query)
               .project({
                    petName: 1,
                    species: 1,
                    _id: 1,
                    images: 1,
                    breed: 1,
                    status: 1,
                    gender: 1,
                    weight: 1,
                    ageYears: 1
               })
               .toArray();

          return result.map((pet) => ({
               ...pet,
               _id: pet._id.toString(),
          }));
     } catch (err) {
          console.error("Error:", err);
          return [];
     }
};

export const updateEntry = async (id, updatedData) => {
     await shelterVerifyAuth()
     try {
          const entryCollection = await EntryReqCollectionPromise;
          const filter = { _id: new ObjectId(id) };

          const updateDoc = {
               $set: updatedData,
          };

          const result = await entryCollection.updateOne(filter, updateDoc);


          return { success: result.modifiedCount > 0 };
     } catch (err) {
          console.error("Error updating entry:", err);
          return { success: false, error: err.message };
     }
}

export const deleteEntry = async (id) => {
     await shelterVerifyAuth()
     try {
          const entryCollection = await EntryReqCollectionPromise;
          const query = { _id: new ObjectId(id) };

          const result = await entryCollection.deleteOne(query);
          return { success: result.deletedCount > 0 };
     } catch (err) {
          console.error("Error deleting entry:", err);
          return { success: false, error: err.message };
     }
}