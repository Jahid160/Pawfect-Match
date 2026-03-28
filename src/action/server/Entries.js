import { collections, dbConnect } from "@/lib/db";
const EntryReqCollectionPromise = dbConnect(collections.ENTRYREQ);

export const getPending = async (email) => {
     try {
          const entryCollection = await EntryReqCollectionPromise;
          const query = { email: email };
          const result = await entryCollection.find(query).toArray();

          return result.map((pet) => ({
               ...pet,
               _id: pet._id.toString(),
          }));
     } catch (err) {
          console.error("Error:", err);
          return [];
     }
}

export const updateEntry = async (id, updatedData) => {
     try {
          const entryCollection = await EntryReqCollectionPromise;
          const filter = { _id: new ObjectId(id) };

          // We use $set to only update the fields provided
          const updateDoc = {
               $set: updatedData,
          };

          const result = await entryCollection.updateOne(filter, updateDoc);
          return result;
     } catch (err) {
          console.error("Error updating entry:", err);
          throw err;
     }
}


export const deleteEntry = async (id) => {
     try {
          const entryCollection = await EntryReqCollectionPromise;
          const query = { _id: new ObjectId(id) };

          const result = await entryCollection.deleteOne(query);
          return result;
     } catch (err) {
          console.error("Error deleting entry:", err);
          throw err;
     }
}