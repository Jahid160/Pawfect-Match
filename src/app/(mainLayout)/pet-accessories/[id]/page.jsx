import { getSingleAccessory } from "@/action/server/accessories";
import AccessoriesDetails from "@/Components/AccessoriesDetails/AccessoriesDetails";
import React from "react";

const PetAccessoryDetailsPage = async ({ params }) => {
  const { id } = await params;

  let accessory = null;

  try {
    accessory = await getSingleAccessory(id);
  } catch (error) {
    console.error("Error fetching accessory:", error);
  }

  if (!accessory) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[70vh] text-gray-400">
        <h2 className="font-bold text-2xl">Product Not Found</h2>
        <p>The accessory you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  return (
    <main>
      <AccessoriesDetails item={accessory} />
    </main>
  );
};

export default PetAccessoryDetailsPage;