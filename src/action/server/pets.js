"use server";
import { unstable_cache } from "next/cache";
import { verifyAdmin } from "@/lib/adminAuth";
import { authOptions } from "@/lib/authOptions";
import { collections, dbConnect } from "@/lib/db";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { verifyAuth } from "@/lib/verifyAuth";
import { adminShelterAuth } from "@/lib/adminShelterAuth";
import { createNotification } from "@/action/server/notifications";

const petCollectionPromise = dbConnect(collections.PETS);
const EntryReqCollectionPromise = dbConnect(collections.ENTRYREQ);
const adoptionCollectionPromise = dbConnect(collections.ADOPTIONS);

export const getPets = async () => {
  try {
    const Petcollection = await petCollectionPromise;
    const pets = await Petcollection.find().sort({ createdAt: -1 }).toArray();
    return pets.map((pet) => ({
      ...pet,
      _id: pet._id.toString(),
    }));
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const get8Pets = unstable_cache(
  async (limitCount = 0) => {
    try {
      const Petcollection = await petCollectionPromise;

      let query = Petcollection.find().sort({ createdAt: -1 });

      if (limitCount > 0) {
        query = query.limit(limitCount);
      }

      const pets = await query.toArray();

      return pets.map((pet) => ({
        ...pet,
        _id: pet._id.toString(),
      }));
    } catch (error) {
      console.error("Error fetching pets:", error);
      return [];
    }
  },
  ["pets-data-cache"],
  {
    tags: ["pets"],
    revalidate: 86400,
  },
);

// Helper function to escape regex
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export const getEntriesPets = async ({ search, species, page, email }) => {
  const Petcollection = await petCollectionPromise;
  try {
    const query = {};
    if (email) query.email = email;
    if (search) {
      const safeSearch = escapeRegex(search);
      query.petName = { $regex: safeSearch, $options: "i" };
    }
    if (species && species !== "All") query.species = species;

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
        gender: 1,
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

export const updatePets = async (petId, updatedData, userEmail) => {
  try {
    const Petcollection = await petCollectionPromise;
    const existingPet = await Petcollection.findOne({
      _id: new ObjectId(petId),
    });
    if (!existingPet) return { success: false, message: "Pet not found" };
    if (existingPet.email !== userEmail)
      return { success: false, message: "Unauthorized!" };

    const { _id, ...dataToUpdate } = updatedData;
    const result = await Petcollection.updateOne(
      { _id: new ObjectId(petId) },
      { $set: dataToUpdate },
    );
    if (result.modifiedCount > 0) {
      revalidatePath("/");
      return { success: true, message: "Pet updated successfully" };
    }
    return { success: false, message: "No changes made" };
  } catch (error) {
    return { success: false, message: "Server error" };
  }
};

export const deletePet = async (petId, userEmail) => {
  try {
    const Petcollection = await petCollectionPromise;
    const result = await Petcollection.deleteOne({
      _id: new ObjectId(petId),
      email: userEmail,
    });
    if (result.deletedCount > 0) {
      revalidatePath("/");
      return { success: true, message: "Pet deleted successfully" };
    }
    return { success: false, message: "Unauthorized or Pet not found" };
  } catch (error) {
    return { success: false, message: "Server error" };
  }
};

export const getAllPetsAction = async () => {
  try {
    const Petcollection = await petCollectionPromise;
    const pets = await Petcollection.find({}).toArray();
    const formattedPets = pets.map((pet) => ({
      _id: pet._id.toString(),
      name: pet.petName,
      breed: pet.breed,
      age: pet.age,
      type: pet.species,
      image: pet.images[0],
      status: pet.status || "Available",
      adoptionCode: pet.adoptionCode,
      adoptedUserEmail: pet.adoptedUserEmail,
    }));
    return { success: true, data: formattedPets };
  } catch (error) {
    return { success: false, message: "Failed to fetch pets data.", data: [] };
  }
};

export const getSinglePets = async (id) => {
  if (id?.length !== 24) return {};
  try {
    const Petcollection = await petCollectionPromise;
    const pet = await Petcollection.findOne({ _id: new ObjectId(id) });
    if (!pet) return {};

    let userId = null;
    try {
      const user = await verifyAuth();
      userId = user._id.toString();
    } catch {}

    const savedBy = pet.savedBy || [];
    return {
      ...pet, // 🔥 return everything
      _id: pet._id.toString(),

      // keep save logic
      saveCount: savedBy.length,
      isSaved: userId ? savedBy.includes(userId) : false,
    };
  } catch (error) {
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
    if (result.insertedId) {
      await createNotification({
        title: "New Pet Entry Request",
        message: `${session.user.name} has submitted a new pet (${petdata.petName}) for approval.`,
        type: "petAdd_req",
        receiverRole: "admin",
        receiverEmail: null,
      });
    }
    return { success: Boolean(result.insertedId) };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const DeletePets = async (id) => {
  verifyAdmin();
  if (!id || id.length !== 24) return { success: false, message: "Invalid ID" };
  try {
    const PetCollection = await petCollectionPromise;
    const result = await PetCollection.deleteOne({ _id: new ObjectId(id) });
    revalidatePath("/dashboard/manage-pets");
    return { success: true, message: "Pet deleted successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updatePet = async (id, updatedData) => {
  try {
    await verifyAdmin();
  } catch (error) {
    return { success: false, message: "Unauthorized!" };
  }
  try {
    const Petcollection = await petCollectionPromise;
    const { _id, createdAt, ...dataToUpdate } = updatedData;
    await Petcollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...dataToUpdate, updatedAt: new Date() } },
    );
    revalidatePath("/dashboard/manage-pets");
    return { success: true, message: "Updated successfully!" };
  } catch (error) {
    return { success: false, message: "Error updating" };
  }
};

export const UpdatePetStatus = async (id, petName) => {
  let admin;
  try {
    admin = await verifyAdmin();
  } catch (error) {
    return { success: false, message: error.message };
  }

  try {
    const PetCollection = await petCollectionPromise;
    const adoptionCollection = await adoptionCollectionPromise;

    const petData = await PetCollection.findOne({ _id: new ObjectId(id) });
    if (!petData) return { success: false, message: "Pet not found" };

    const userEmail = petData.adoptedUserEmail;

    await adoptionCollection.updateOne(
      { petId: id },
      { $set: { status: "approved", updatedTime: new Date() } },
    );

    const result = await PetCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "adopted", updatedBy: admin.email } },
    );

    if (result.modifiedCount > 0 && userEmail) {
      await createNotification({
        title: "Adoption Approved! 🎉",
        message: `Congratulations! Your request to adopt ${petName || petData.petName} has been approved.`,
        type: "adoption",
        receiverEmail: userEmail,
      });
    }

    revalidatePath("/dashboard/manage-pets");
    return { success: true, message: "Pet adopted successfully" };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const UpdatePetStatusReject = async (id, adoptionCode, petName) => {
  try {
    await verifyAdmin();
  } catch (error) {
    return { success: false, message: error.message };
  }

  try {
    const PetCollection = await petCollectionPromise;
    const adoptionCollection = await adoptionCollectionPromise;
    const petData = await PetCollection.findOne({ _id: new ObjectId(id) });
    const userEmail = petData?.adoptedUserEmail;

    const result = await PetCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { status: "available" },
        $unset: { adoptedUserEmail: "", adoptionCode: "", updatedBy: "" },
      },
    );

    if (result.modifiedCount > 0 && userEmail) {
      await createNotification({
        title: "Adoption Update",
        message: `Your request for ${petName || petData.petName} was not approved at this time.`,
        type: "system",
        receiverEmail: userEmail,
      });
    }

    await adoptionCollection.deleteOne({ adoptionCode });
    revalidatePath("/dashboard/manage-pets");
    return { success: true, message: "Rejected successfully" };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const ApprovePet = async (petId) => {
  const session = await getServerSession(authOptions);
  await verifyAdmin();

  try {
    const entryCollection = await EntryReqCollectionPromise;
    const petCollection = await petCollectionPromise;
    const petData = await entryCollection.findOne({ _id: new ObjectId(petId) });
    if (!petData) throw new Error("Pet not found");
    const { _id, ...rest } = petData;
    const result = await petCollection.insertOne({
      ...rest,
      status: "available",
      approvedBy: session.user.email,
      approvedAt: new Date(),
    });
    if (result.insertedId) {
      await createNotification({
        title: "Pet Approved! 🐾",
        message: `Great news! Your pet entry "${petData.petName}" has been approved and is now live.`,
        type: "Pet_approved",
        receiverRole: "shelter",
        receiverEmail: petData.email,
      });
    }
    await entryCollection.deleteOne({ _id: new ObjectId(petId) });
    revalidatePath("/dashboard/manage-pets");
    return { success: true };
  } catch (error) {
    console.error("Approve Pet Error:", error);
    return { success: false, error: error.message };
  }
};

export const getPetRequests = async () => {
  try {
    await verifyAdmin();
    const entryCollection = await EntryReqCollectionPromise;
    const pets = await entryCollection.find({ status: "preview" }).toArray();
    return {
      success: true,
      data: pets.map((p) => ({ ...p, _id: p._id.toString() })),
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const RejectPet = async (petId) => {
  try {
    await verifyAdmin();
    const entryCollection = await EntryReqCollectionPromise;
    await entryCollection.deleteOne({ _id: new ObjectId(petId) });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const myEntryPets = async (email) => {
  try {
    const petCollection = await petCollectionPromise;
    const pets = await petCollection.find({ email: email }).toArray();
    return {
      success: true,
      pets: pets.map((p) => ({ ...p, _id: p._id.toString() })),
    };
  } catch (error) {
    return { success: false, message: "Error" };
  }
};

export const totalAdopted = async () => {
  try {
    const petCollection = await dbConnect(collections.PETS);

    const adoptedCount = await petCollection.countDocuments({
      status: "adopted",
    });

    return {
      success: true,
      data: {
        adopted: adoptedCount,
      },
    };
  } catch (error) {
    console.error("stats error:", error);

    return {
      success: false,
      data: {
        adopted: 0,
      },
    };
  }
};
