"use client";

import React from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export const VaccinationCard = ({ vaccine }) => {
  const isOutOfStock = vaccine.stock <= 0;

  return (
    <div className="group bg-white border border-slate-100 rounded-2xl p-4 shadow hover:shadow-xl transition flex flex-col">

      {/* IMAGE */}
      <div className="h-40 bg-gray-100 rounded-xl overflow-hidden mb-3">
        {vaccine.image ? (
          <img
            src={vaccine.image}
            alt={vaccine.vaccineName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="flex-1">
        <h2 className="font-bold text-lg text-slate-800">
          {vaccine.vaccineName}
        </h2>

        <p className="text-xs text-slate-400 mb-2">
          {vaccine.forPet}
        </p>

        <div className="flex justify-between mt-2">
          <p className="font-semibold">${vaccine.price}</p>
          <p className={isOutOfStock ? "text-red-500" : "text-green-600"}>
            {isOutOfStock ? "Out" : "In Stock"}
          </p>
        </div>
      </div>

      {/* DETAILS BUTTON */}
      <Link
        href={`/vaccination/${vaccine._id}`}
        className="mt-4 w-full py-3 rounded-xl bg-slate-900 text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-orange-500 transition"
      >
        View Details <FaChevronRight size={12} />
      </Link>
    </div>
  );
};