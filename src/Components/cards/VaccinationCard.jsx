"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaChevronRight, FaBan, FaSyringe, FaShieldAlt } from "react-icons/fa";

export const VaccinationCard = ({ vaccine }) => {
  const vaccineId = vaccine._id?.toString();
  const isOutOfStock = Number(vaccine.stock || 0) <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex flex-col bg-base-100 shadow-sm hover:shadow-2xl border border-base-300 rounded-3xl overflow-hidden transition-all hover:-translate-y-1 duration-300"
    >
      {/* Image Section - Using base-200 for background consistency */}
      <div className="relative bg-base-200 w-full h-64 overflow-hidden">
        {vaccine.image ? (
          <img
            src={vaccine.image}
            alt={vaccine.vaccineName}
            className={`w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110 ${
              isOutOfStock ? "grayscale opacity-70" : ""
            }`}
          />
        ) : (
          <div className="flex justify-center items-center h-full text-base-300">
            <FaSyringe size={48} />
          </div>
        )}

        {/* Badges - Primary Color from your theme */}
        <div className="top-4 left-4 z-10 absolute flex flex-col gap-2">
          <span className="flex items-center gap-1 bg-primary shadow-lg px-3 py-1 rounded-full font-bold text-[10px] text-white uppercase tracking-wide">
            <FaShieldAlt size={8} /> Highly Protected
          </span>
        </div>

        {/* Out of stock overlay - Using Error color from theme */}
        {isOutOfStock && (
          <div className="z-10 absolute inset-0 flex justify-center items-center bg-black/15 backdrop-blur-[2px]">
            <span className="flex items-center gap-2 bg-error px-4 py-2 rounded-xl font-bold text-[10px] text-white uppercase tracking-wider">
              <FaBan /> Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-[10px] text-primary uppercase tracking-[0.2em]">
            {vaccine.forPet || "All Pets"}
          </span>
          <div className={`flex items-center gap-1 text-[10px] font-bold uppercase ${isOutOfStock ? "text-error" : "text-success"}`}>
             {isOutOfStock ? "Unavailable" : "Available Now"}
          </div>
        </div>

        <Link href={`/vaccination/${vaccineId}`}>
          <h3 className="mb-2 min-h-[48px] font-extrabold text-neutral hover:text-primary text-lg line-clamp-2 leading-tight transition-colors cursor-pointer">
            {vaccine.vaccineName}
          </h3>
        </Link>

        {/* Meta info */}
        <div className="flex items-center gap-3 mb-4 font-bold text-[11px] text-neutral/40 uppercase tracking-wider">
           <span className="flex items-center gap-1">
             <FaSyringe className="text-primary/60" /> Professional Grade
           </span>
           <span className="bg-base-300 rounded-full w-1 h-1"></span>
           <span className="flex items-center gap-1 uppercase">
             {vaccine.category || "Vaccine"}
           </span>
        </div>

        {/* Price + CTA */}
        <div className="flex justify-between items-end gap-3 mt-auto pt-4 border-base-200 border-t">
          <div className="flex flex-col">
            <span className="font-medium text-[10px] text-neutral/30">Total Cost</span>
            <span className="font-black text-neutral text-xl leading-none tracking-tight">
              ${vaccine.price || 0}
            </span>
          </div>

          <Link
            href={`/vaccination/${vaccineId}`}
            className="inline-flex items-center gap-2 bg-base-200 hover:bg-primary px-4 py-2.5 rounded-xl font-bold text-[10px] text-neutral/60 hover:text-white uppercase tracking-wider transition-all"
          >
            Details <FaChevronRight size={8} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};