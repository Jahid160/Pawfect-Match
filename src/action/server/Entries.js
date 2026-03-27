import { collections, dbConnect } from "@/lib/db";
const EntryReqCollectionPromise = dbConnect(collections.ENTRYREQ);

export const getPending = async (email) => {
     try {
          const entryCollection = await EntryReqCollectionPromise();
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