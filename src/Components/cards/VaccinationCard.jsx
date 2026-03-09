"use client";

import React from "react";
import Link from "next/link";
import { 
  FaSyringe, 
  FaTag, 
  FaBoxes, 
  FaPaw, 
  FaChevronRight 
} from "react-icons/fa";

export const VaccinationCard = ({ vaccine }) => {
  const isLowStock = vaccine.stock > 0 && vaccine.stock <= 10;
  const isOutOfStock = vaccine.stock === 0;
  
  const vaccineId = vaccine._id || vaccine.id;

  return (
    <div className="group bg-base-100 border border-base-300 rounded-[2rem] p-6 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-5">
      
      {/* Icon & Status Area */}
      <div className="flex justify-between items-center">
        <div className={`p-4 rounded-2xl transition-colors duration-300 ${
          isOutOfStock 
            ? 'bg-base-200 text-neutral/40' 
            : 'bg-secondary text-primary group-hover:bg-primary group-hover:text-white'
        }`}>
          <FaSyringe size={22} />
        </div>
        
        {/* Badge using DaisyUI logic and your feedback colors */}
        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm ${
          isOutOfStock 
            ? "bg-error/10 text-error border-error/20" 
            : isLowStock 
              ? "bg-warning/10 text-warning border-warning/20" // DaisyUI typically has warning, or use oklch manual
              : "bg-success/10 text-success border-success/20"
        }`}>
          {isOutOfStock ? "Sold Out" : isLowStock ? "Limited" : "In Stock"}
        </div>
      </div>

      {/* Title and Pet Category */}
      <div className="space-y-2">
        <h3 className="text-2xl font-black text-neutral group-hover:text-primary transition-colors leading-tight">
          {vaccine.vaccineName}
        </h3>
        <div className="flex items-center gap-2 text-neutral/60">
          <div className="p-1 bg-secondary rounded-md">
            <FaPaw size={10} className="text-primary" />
          </div>
          <span className="font-bold uppercase tracking-widest text-[10px]">
            Target: {vaccine.forPet || "All Pets"}
          </span>
        </div>
      </div>

      {/* Pricing & Inventory - Using Base 200/300 for Warmth */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-base-200/50 p-4 rounded-2xl border border-base-300/50 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-neutral/40">
            <FaTag size={10} />
            <span className="text-[9px] font-black uppercase tracking-tighter">Price</span>
          </div>
          <p className="text-xl font-black text-neutral">
            ${vaccine.price}
          </p>
        </div>

        <div className="bg-base-200/50 p-4 rounded-2xl border border-base-300/50 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-neutral/40">
            <FaBoxes size={10} />
            <span className="text-[9px] font-black uppercase tracking-tighter">Stock</span>
          </div>
          <p className={`text-xl font-black ${isOutOfStock ? 'text-error' : 'text-neutral'}`}>
            {vaccine.stock} <span className="text-[10px] opacity-50 font-bold uppercase">Units</span>
          </p>
        </div>
      </div>

      {/* Action Button - Primary Brand Color */}
      {isOutOfStock ? (
        <button 
          disabled
          className="mt-2 w-full flex justify-center items-center gap-2 py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-base-300 text-neutral/30 cursor-not-allowed border border-base-300"
        >
          Check Back Later
        </button>
      ) : (
        <Link 
          href={`/vaccination/${vaccineId}`}
          className="mt-2 w-full flex justify-center items-center gap-2 py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-neutral text-white hover:bg-primary shadow-lg shadow-neutral/10 hover:shadow-primary/30 active:scale-[0.98] transition-all"
        >
          View Product
          <FaChevronRight size={10} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
};