"use server";

import { verifyAdmin } from "@/lib/adminAuth";
import { authOptions } from "@/lib/authOptions";
import { collections, dbConnect } from "@/lib/db";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { verifyAuth } from "@/lib/verifyAuth";
import { adminShelterAuth } from "@/lib/adminShelterAuth";
// import { petCollectionPromise } from "@/lib/mongodb";


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




// Helper function to escape special characters for MongoDB Regex search
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}


export const getEntriesPets = async ({ search, species, page, email }) => {
  const Petcollection = await petCollectionPromise;

  try {
    const query = {};

    // Filter by owner email
    if (email) {
      query.email = email;
    }

    // Search by Pet Name
    if (search) {
      const safeSearch = escapeRegex(search);
      query.petName = { $regex: safeSearch, $options: "i" };
    }

    // Filter by Species
    if (species && species !== "All") {
      query.species = species;
    }

    const limit = 10;
    const skip = (parseInt(page) - 1) * limit;

    const totalCount = await Petcollection.countDocuments(query);

    const pets = await Petcollection.find(query)
      .project({
        images: 1,
        petName: 1,
        species: 1,
        status: 1,
        _id: 1,
        weight: 1,
        gender: 1
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return {
      pets: JSON.parse(JSON.stringify(pets)),
      totalPages: Math.ceil(totalCount / limit) || 1,
    };
  } catch (error) {
    console.error("Error fetching pets:", error);
    return { pets: [], totalPages: 0 };
  }
};

/**
 * 2. Update Pet Entry (With Security Check)
 */
export const updatePets = async (petId, updatedData, userEmail) => {
  try {
    const Petcollection = await petCollectionPromise;


    const existingPet = await Petcollection.findOne({ _id: new ObjectId(petId) });

    if (!existingPet) {
      return { success: false, message: "Pet not found" };
    }


    if (existingPet.email !== userEmail) {
      return { success: false, message: "You are not authorized to update this entry!" };
    }

    const { _id, ...dataToUpdate } = updatedData;

    const result = await Petcollection.updateOne(
      { _id: new ObjectId(petId) },
      { $set: dataToUpdate }
    );

    if (result.modifiedCount > 0) {
      revalidatePath("/");
      return { success: true, message: "Pet updated successfully" };
    }

    return { success: false, message: "No changes made" };
  } catch (error) {
    console.error("Error updating pet:", error);
    return { success: false, message: "Server error occurred" };
  }
};

export const deletePet = async (petId, userEmail) => {
  try {
    const Petcollection = await petCollectionPromise;

    // ডিলিট করার আগেও ইমেইল চেক করা হচ্ছে
    const result = await Petcollection.deleteOne({
      _id: new ObjectId(petId),
      email: userEmail
    });

    if (result.deletedCount > 0) {
      revalidatePath("/");
      return { success: true, message: "Pet deleted successfully" };
    }

    return { success: false, message: "Unauthorized or Pet not found" };
  } catch (error) {
    console.error("Error deleting pet:", error);
    return { success: false, message: "Server error" };
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
  adminShelterAuth();
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
      },
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

// for admin pet transfer preview to available
export const ApprovePet = async (petId) => {
  const session = await getServerSession(authOptions);
  await verifyAdmin();

  try {
    const entryCollection = await EntryReqCollectionPromise;
    const petCollection = await petCollectionPromise;

    const objectId = new ObjectId(petId);

    const petData = await entryCollection.findOne({ _id: objectId });

    if (!petData) {
      throw new Error("Pet not found in Entry Requests");
    }

    const approvedPetData = {
      ...petData,
      status: "available",
      approvedBy: session.user.email,
      approvedAt: new Date(),
    };

    await petCollection.insertOne(approvedPetData);

    await entryCollection.deleteOne({ _id: objectId });

    return { success: true };
  } catch (error) {
    console.error("Approve Pet Error:", error);
    return { success: false, error: error.message };
  }
};

// getPetRequest for admin
export const getPetRequests = async () => {
  try {
    // ✅ protect route (await must)
    await verifyAdmin();

    const entryCollection = await EntryReqCollectionPromise;

    const pets = await entryCollection.find({ status: "preview" }).toArray();

    // ✅ serialize _id (IMPORTANT for client)
    const formattedPets = pets.map((pet) => ({
      ...pet,
      _id: pet._id.toString(),
    }));

    return { success: true, data: formattedPets };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to fetch pet requests",
    };
  }
};

export const RejectPet = async (petId) => {
  try {
    await verifyAdmin();

    const entryCollection = await EntryReqCollectionPromise;

    await entryCollection.deleteOne({
      _id: new ObjectId(petId),
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// shelter entry
export const myEntryPets = async (email) => {
  try {
    const petCollection = await petCollectionPromise;
    const pets = await petCollection
      .find({ email: email })
      .project({
        images: { $slice: 1 },
        ageYears: 1,
        petName: 1,
        _id: 1,
      })
      .toArray();
    const serializedPets = pets.map((pet) => ({
      ...pet,
      _id: pet._id.toString(),
    }));
    return { success: true, pets: serializedPets };
  } catch (error) {
    return { success: false, message: "Error fetching entry pets" };
  }
};
