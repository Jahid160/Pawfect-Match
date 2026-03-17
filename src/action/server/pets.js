"use server";

import { verifyAdmin } from "@/lib/adminAuth";
import { authOptions } from "@/lib/authOptions";
import { collections, dbConnect } from "@/lib/db";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

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
    const pets = await Petcollection.find({}).toArray();

    // Map through pets to ensure uniform data structure
    const formattedPets = pets.map((pet) => {
      return {
        _id: pet._id.toString(),
        name: pet.petName,
        breed: pet.breed,
        age: pet.age,
        type: pet.species,
        image: pet.images[0],
        status: pet.status || "Available",
        adoptionCode: pet.adoptionCode
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
      status: "available",
    });
    return { success: Boolean(result.insertedId) };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// admin action
export const DeletePets = async (id) => {
  verifyAdmin();

  if (!id || id.length !== 24) return { success: false, message: "Invalid ID" };

  try {
    const PetCollection = await petCollectionPromise;

    const result = await PetCollection.deleteOne({ _id: new ObjectId(id) });

    // Revalidate the page route (optional if using server component)
    revalidatePath("/dashboard/manage-pets");

    return {
      success: result.deletedCount > 0,
      message:
        result.deletedCount > 0 ? "Pet deleted successfully" : "Pet not found",
    };
  } catch (error) {
    return { success: false, message: error.message };
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

export const UpdatePetStatus = async (id) => {
  let admin;
  try {
    admin = await verifyAdmin();
  } catch (error) {
    return { success: false, message: error.message };
  }

  const adminEmail = admin.email;
  console.log("Action performed by:", adminEmail);

  if (id?.length !== 24) return { success: false, message: "Invalid ID" };

  try {
    const PetCollection = await petCollectionPromise;
    const query = { _id: new ObjectId(id) };

    const updateStatus = {
      $set: {
        status: "adopted",
        updatedBy: adminEmail,
      },
    };

    const result = await PetCollection.updateOne(query, updateStatus);
    revalidatePath("/dashboard/manage-pets");

    return {
      success: result.modifiedCount > 0,
      message:
        result.modifiedCount > 0
          ? "Pet adopted successfully"
          : "Status was already updated or not found",
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const UpdatePetStatusReject = async (id) => {
  verifyAdmin();

  if (id?.length !== 24) return { success: false, message: "Invalid ID" };

  try {
    const PetCollection = await petCollectionPromise;
    const query = { _id: new ObjectId(id) };
    const updateStatus = {
      $set: {
        status: "available",
      },
    };
    const result = await PetCollection.updateOne(query, updateStatus);
    revalidatePath("/dashboard/manage-pets");

    return {
      success: result.modifiedCount > 0,
      message:
        result.modifiedCount > 0
          ? "Pet adopted successfully"
          : "Pet status was not pending",
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
