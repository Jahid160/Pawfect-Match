"use server";

import { collections, dbConnect } from "@/lib/db";
import { verifyAuth } from "@/lib/verifyAuth";
import { ObjectId } from "mongodb";

export const getUserApprovedPets = async () => {
  try {
    const user = await verifyAuth();

    const adoptionCollection = await dbConnect(collections.ADOPTIONS);
    const petCollection = await dbConnect(collections.PETS);

    // find approved adoption requests for this user
    const approvedAdoptions = await adoptionCollection
      .find({
        email: user.email,
        status: "approved",
      })
      .toArray();

    if (!approvedAdoptions.length) {
      return {
        success: true,
        data: [],
      };
    }

    const petIds = approvedAdoptions
      .map((item) => item.petId)
      .filter(Boolean)
      .map((id) => new ObjectId(id));

    const pets = await petCollection
      .find({
        _id: { $in: petIds },
      })
      .toArray();

    const formattedPets = pets.map((pet) => {
      const matchedAdoption = approvedAdoptions.find(
        (adoption) => adoption.petId === pet._id.toString()
      );

      return {
        _id: pet._id.toString(),
        petName: pet.petName,
        breed: pet.breed,
        age: pet.age,
        species: pet.species,
        status: pet.status,
        image: pet.images?.[0] || "",
        adoptionCode: matchedAdoption?.adoptionCode || "",
        approvedAt: matchedAdoption?.updatedTime || null,
      };
    });

    return {
      success: true,
      data: formattedPets,
    };
  } catch (error) {
    console.error("Error fetching approved pets:", error);
    return {
      success: false,
      message: "Failed to fetch approved pets.",
      data: [],
    };
  }
};
