"use client";

import { VaccinationCard } from "@/Components/cards/VaccinationCard";
import React from "react";
// Import the VaccineCard component we created earlier
// Ensure the path matches where you saved the VaccineCard file

function Vaccination() {
  // 1. Define your mock data (usually this comes from an API/Database later)
  const vaccines = [
    {
      id: 1,
      vaccineName: "Rabies",
      price: 45.00,
      stock: 25,
      forPet: "Dogs & Cats",
    },
    {
      id: 2,
      vaccineName: "Distemper",
      price: 35.50,
      stock: 8, // This will trigger the "Low Stock" badge
      forPet: "Dogs",
    },
    {
      id: 3,
      vaccineName: "Feline Viral",
      price: 50.00,
      stock: 0, // This will trigger the "Out of Stock" state
      forPet: "Cats",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header section to match your Pawfect Match theme */}
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Vaccination <span className="text-orange-500">Center</span>
          </h2>
          <p className="text-gray-500 mt-2 italic">
            Ensuring your friends stay healthy and protected.
          </p>
        </div>

        {/* 2. The Grid - Mapping through the props */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {vaccines.map((item) => (
            <VaccinationCard key={item.id} vaccine={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Vaccination;