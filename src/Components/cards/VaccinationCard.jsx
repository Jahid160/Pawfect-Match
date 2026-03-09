"use client";

import React from "react";
import { 
  FaSyringe, 
  FaTag, 
  FaBoxes, 
  FaPaw, 
  FaChevronRight 
} from "react-icons/fa";

export const VaccinationCard = ({ vaccine }) => {
  // Stock status logic
  const isLowStock = vaccine.stock > 0 && vaccine.stock <= 10;
  const isOutOfStock = vaccine.stock === 0;

  return (
    <div className="group bg-white border border-slate-200 rounded-3xl p-5 hover:shadow-xl transition-all duration-300 flex flex-col gap-4">
      {/* Icon & Status */}
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-2xl ${isOutOfStock ? 'bg-slate-100 text-slate-400' : 'bg-orange-100 text-orange-600'}`}>
          <FaSyringe size={24} />
        </div>
        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
          isOutOfStock 
            ? "bg-red-50 text-red-500 border-red-100" 
            : isLowStock 
              ? "bg-amber-50 text-amber-600 border-amber-200" 
              : "bg-emerald-50 text-emerald-600 border-emerald-100"
        }`}>
          {isOutOfStock ? "Out of Stock" : isLowStock ? "Low Stock" : "In Stock"}
        </div>
      </div>

      {/* Vaccine Details */}
      <div className="space-y-1">
        <h3 className="text-xl font-black text-slate-800 group-hover:text-orange-600 transition-colors">
          {vaccine.vaccineName}
        </h3>
        <div className="flex items-center gap-1.5 text-slate-400 text-sm">
          <FaPaw size={12} className="text-orange-400" />
          <span className="font-semibold uppercase tracking-wider text-[11px]">
            For: {vaccine.forPet || "All Pets"}
          </span>
        </div>
      </div>

      {/* Pricing and Inventory Grid */}
      <div className="grid grid-cols-2 gap-3 mt-2">
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <FaTag size={10} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Price</span>
          </div>
          <p className="text-lg font-black text-slate-700">
            ${vaccine.price}
          </p>
        </div>

        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <FaBoxes size={10} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Stock</span>
          </div>
          <p className={`text-lg font-black ${isOutOfStock ? 'text-red-500' : 'text-slate-700'}`}>
            {vaccine.stock} <span className="text-[10px] text-slate-400 font-medium">units</span>
          </p>
        </div>
      </div>

      {/* Action Button */}
      <button 
        disabled={isOutOfStock}
        className={`mt-2 w-full flex justify-center items-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all ${
          isOutOfStock 
          ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
          : "bg-slate-900 text-white hover:bg-orange-600 shadow-lg shadow-slate-200 hover:shadow-orange-200 active:scale-95"
        }`}
      >
        {isOutOfStock ? "Restocking Soon" : "View Details"}
        {!isOutOfStock && <FaChevronRight size={12} />}
      </button>
    </div>
  );
};