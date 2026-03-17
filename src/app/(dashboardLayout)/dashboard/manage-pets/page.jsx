import { getAllPetsAction } from "@/action/server/pets";
import ManagePets from "@/Components/dashboardlayouts/ManagePets";
import React from "react";

const managePetsPage = async () => {
  const result = await getAllPetsAction();
  const pets = result.success ? result.data : [];
  return (
    <div>
      <ManagePets initialPets={pets}></ManagePets>
    </div>
  );
};

export default managePetsPage;
