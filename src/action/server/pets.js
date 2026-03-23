"use server";

import { verifyAdmin } from "@/lib/adminAuth";
import { authOptions } from "@/lib/authOptions";
import { collections, dbConnect } from "@/lib/db";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { verifyAuth } from "@/lib/verifyAuth";
import { adminShelterAuth } from "@/lib/adminShelterAuth";

const petCollectionPromise = dbConnect(collections.PETS);
const EntryReqCollectionPromise = dbConnect(collections.ENTRYREQ);
const adoptionCollectionPromise = dbConnect(collections.ADOPTIONS);

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
        adoptionCode: pet.adoptionCode,
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

    // ✅ try to get current user (optional)
    let userId = null;
    try {
      const user = await verifyAuth();
      userId = user._id.toString();
    } catch (error) {
      // user not logged in → ignore
    }

    const savedBy = pet.savedBy || [];

    return {
      _id: pet._id.toString(),
      petName: pet.petName,
      breed: pet.breed,
      age: pet.age,
      species: pet.species,
      images: pet.images,
      status: pet.status,

      // 🔥 IMPORTANT
      saveCount: savedBy.length,
      isSaved: userId ? savedBy.includes(userId) : false,
    };
  } catch (error) {
    console.error("Error fetching single pet:", error);
    return {};
  }
};

export const AddPets = async (petdata) => {
  const session = await getServerSession(authOptions);
  console.log(session.user)
  adminShelterAuth()
  try {
    const EntryReqcollection = await EntryReqCollectionPromise;
    const result = await EntryReqcollection.insertOne({
      ...petdata,
      status: "preview",
      email: session.user.email,
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

export const updatePet = async (id, updatedData) => {
  try {
    await verifyAdmin();
  } catch (error) {
    return { success: false, message: "Unauthorized access! Admin only." };
  }
  if (!id || id.length !== 24) {
    return { success: false, message: "Invalid Pet ID format." };
  }

  try {
    const Petcollection = await petCollectionPromise;

    const { _id, createdAt, ...dataToUpdate } = updatedData;

    const result = await Petcollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...dataToUpdate,
          updatedAt: new Date(),
        },
      },
    );

    if (result.matchedCount === 0) {
      return { success: false, message: "No pet found with this ID." };
    }

    if (result.modifiedCount > 0 || result.matchedCount > 0) {
      revalidatePath("/dashboard/manage-pets");
      revalidatePath(`/dashboard/manage-pets/petEdit/${id}`);

      return {
        success: true,
        message: "Pet information updated successfully!",
      };
    }

    return { success: true, message: "No changes were made." };
  } catch (error) {
    console.error("Error updating pet:", error);
    return {
      success: false,
      message: "Internal Server Error. Please try again.",
    };
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

  if (id?.length !== 24) {
    return { success: false, message: "Invalid ID" };
  }

  try {
    const PetCollection = await petCollectionPromise;
    const adoptionCollection = await adoptionCollectionPromise;

    const petQuery = { _id: new ObjectId(id) };

    const petUpdate = {
      $set: {
        status: "adopted",
        updatedBy: adminEmail,
      },
    };

    await adoptionCollection.updateOne(
      { petId: id },
      {
        $set: {
          status: "approved",
          updatedTime: new Date(),
        },
      }
    );

    const result = await PetCollection.updateOne(petQuery, petUpdate);

    revalidatePath("/dashboard/manage-pets");
    revalidatePath("/dashboard/my-adoptions");
    revalidatePath("/dashboard/my-pets");

    return {
      success: result.modifiedCount > 0,
      message:
        result.modifiedCount > 0
          ? "Pet adopted successfully"
          : "Status was already updated or pet not found",
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};


export const UpdatePetStatusReject = async (id, adoptionCode) => {
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
    const adoptionCollection = await adoptionCollectionPromise;
    const query = { _id: new ObjectId(id) };

    const updateStatus = {
      $set: {
        status: "available",
      },
      $unset: {
        adoptedUserEmail: "",
        adoptionCode: "",
        updatedBy: "",
        adoptedUserTime: "",
      },
    };

    const result = await PetCollection.updateOne(query, updateStatus);
    await adoptionCollection.deleteOne({ adoptionCode });
    revalidatePath("/dashboard/manage-pets");

    return {
      success: result.modifiedCount > 0,
      message:
        result.modifiedCount > 0
          ? "Pet rejection successful, status reset"
          : "Pet not found or already updated",
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const myEntryPets = async (email) => {
  try {
    const petCollection = await petCollectionPromise
    const pets = await petCollection.find({ email: email }).project({
      images: { $slice: 1 },
      ageYears: 1,
      petName: 1,
      _id: 1
    }).toArray()
    const serializedPets = pets.map(pet => ({
      ...pet,
      _id: pet._id.toString(),
    }));
    return { success: true, pets: serializedPets };
  } catch (error) {
    return { success: false, message: "Error fetching entry pets" };
  }
}
