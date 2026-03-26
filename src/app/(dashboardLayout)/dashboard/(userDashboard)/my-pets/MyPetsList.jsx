"use client";

import Image from "next/image";
import React from "react";

const MyPetsList = ({ pets }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {pets.map((pet) => (
        <div
          key={pet._id}
          className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm"
        >
          <div className="relative h-64 w-full bg-slate-100">
            {pet.image ? (
              <Image
                src={pet.image}
                alt={pet.petName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold">
                No Image
              </div>
            )}
          </div>

          <div className="p-6">
            <h2 className="text-xl font-black text-slate-800 mb-2">
              {pet.petName}
            </h2>

            <div className="space-y-1 text-sm text-slate-500 font-medium">
              <p>Breed: {pet.breed}</p>
              <p>Age: {pet.age}</p>
              <p>Type: {pet.species}</p>
              <p>Adoption Code: {pet.adoptionCode}</p>
              <p>Status: {pet.status}</p>
              <p>
                Approved On:{" "}
                {pet.approvedAt
                  ? new Date(pet.approvedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  : "Not Available"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPetsList;
