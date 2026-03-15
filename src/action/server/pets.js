"use server";

import { authOptions } from "@/lib/authOptions";
import { collections, dbConnect } from "@/lib/db";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

const petCollectionPromise = dbConnect(collections.PETS);

export const getPets = async () => {
  try {
    const Petcollection = await petCollectionPromise;
    const pets = await Petcollection.find().toArray();

    return pets.map((pet) => ({
      ...pet,
      _id: pet._id.toString(),
    }));
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

//admin dashboard manage pets api
export async function getAllPetsAction() {
  try {
    const Petcollection = await petCollectionPromise;

    // Fetch all pets and convert Mongoose documents to plain JS objects
    const pets = await Petcollection.find({}).lean();

    // Map through pets to ensure uniform data structure
    const formattedPets = pets.map((pet) => {
      return {
        _id: pet._id.toString(),
        name: pet.name,
        breed: pet.breed,
        age: pet.age,
        type: pet.type,
        image: pet.image,
        // The logic you requested: Default to "Available" if status is missing
        status: pet.status || "Available", 
      };
    });

    return {
      success: true,
      data: formattedPets,
    };
  } catch (error) {
    console.error("Error fetching pets:", error);
    return {
      success: false,
      message: "Failed to fetch pets data.",
      data: [],
    };
  }
}

export const getSinglePets = async (id) => {
  if (id?.length !== 24) return {};

  try {
    const Petcollection = await petCollectionPromise;
    const pet = await Petcollection.findOne({
      _id: new ObjectId(id),
    });

    if (!pet) return {};

    // Serialization Fix
    return JSON.parse(JSON.stringify(pet));
  } catch (error) {
    console.error("Error fetching single pet:", error);
    return {};
  }
};

export const AddPets = async (petdata) => {
  try {
    const Petcollection = await petCollectionPromise;
    const result = await Petcollection.insertOne({
      ...petdata,
      status: "available"
    });
    return { success: Boolean(result.insertedId) };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const DeletePets = async (id) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, message: "Unauthorized" };

  if (id?.length !== 24) return { success: false, message: "Invalid ID" };

  try {
    const Petcollection = await petCollectionPromise;
    const query = { _id: new ObjectId(id), email: session.user.email };
    const result = await Petcollection.deleteOne(query);

    return { success: Boolean(result.deletedCount) };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const UpdatePets = async (id, petdata = {}) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, message: "Unauthorized" };

  if (id?.length !== 24) return { success: false, message: "Invalid ID" };

  try {
    const Petcollection = await petCollectionPromise;
    const query = { _id: new ObjectId(id), email: session.user.email };

    const updatedData = {
      $set: petdata,
    };

    const result = await Petcollection.updateOne(query, updatedData);
    return { success: Boolean(result.modifiedCount) };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

