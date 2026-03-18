import { getSinglePets } from "@/action/server/pets";
import PetEdit from "@/Components/dashboardlayouts/AdminDashboard/PetMangeMent/PetEdit";
import React from "react";

const petEditPage = async ({ params }) => {
  const { id } =await params;

  const pet = await getSinglePets(id);

  if (!pet || Object.keys(pet).length === 0) {
    return (
      <div className="p-10 text-center font-bold text-red-500">
        Pet data not found for ID: {id}
      </div>
    );
  }

  return (
    <>
      <PetEdit petData={pet} />
    </>
  );
};

export default petEditPage;
