'use server'

import { authOptions } from "@/lib/authOptions";
import { collections, dbConnect } from "@/lib/db";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";


const petCollectionPromise = dbConnect(collections.PETS);

export const getPets = async () => {
     const Petcollection = await petCollectionPromise;
     const pets = await Petcollection.find().toArray();
     return pets;
};

export const getSinglePets = async (id) => {
     if (id.length !== 24) return {};
     const Petcollection = await petCollectionPromise;
     const pet = await Petcollection.findOne({
          _id: new ObjectId(id),
     });

     if (!pet) return {};

     return {
          ...pet,
          _id: pet._id.toString(),
     };
};

export const DeletePets = async (id) => {
     const { user } = (await getServerSession(authOptions)) || {};
     if (!user) return { success: false };

     if (id?.length != 24) {
          return { success: false };
     }
     const Petcollection = await petCollectionPromise;
     const query = { _id: new ObjectId(id), email: user?.email };
     const result = await Petcollection.deleteOne(query)

     return { success: Boolean(result.deletedCount) }
}

export const UpdatePets = async (id, petdata = {}) => {
     const { user } = (await getServerSession(authOptions)) || {};
     if (!user) return { success: false };
     if (id?.length != 24) {
          return { success: false };
     }

     const Petcollection = await petCollectionPromise;
     const query = { _id: new ObjectId(id), email: user?.email }

     const updatedData = {
          $set: petdata,
     };

     const result = await Petcollection.updateOne(query, updatedData)
     return { success: Boolean(result.modifiedCount) }
}