"use client";
import React from "react";
import Link from "next/link";
import { FaSyringe, FaPaw, FaChevronRight } from "react-icons/fa";

export const VaccinationCard = ({ vaccine }) => {
  // ডাটাবেজের 'vaccineName' এর সাথে ম্যাচ করা হয়েছে
  const name = vaccine?.vaccineName || "Unnamed Vaccine"; 
  const price = Number(vaccine?.price || 0);
  const stock = Number(vaccine?.stock || 0);
  const isOutOfStock = stock <= 0;

  return (
    <div className="group bg-white border border-slate-100 rounded-[2.5rem] p-5 hover:shadow-2xl transition-all duration-500 flex flex-col gap-4">
      <div className="relative h-48 bg-slate-50 rounded-[2rem] overflow-hidden">
        {vaccine?.image ? (
          <img src={vaccine.image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-orange-200"><FaSyringe size={40}/></div>
        )}
        <div className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${
          isOutOfStock ? 'bg-red-50 text-red-500 border-red-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
        }`}>
          {isOutOfStock ? "Sold Out" : "In Stock"}
        </div>
      </div>

      <div className="px-1 space-y-1">
        <h3 className="text-xl font-black text-slate-800 line-clamp-1">{name}</h3>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <FaPaw className="text-orange-500"/> {vaccine?.forPet || "General"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 p-4 rounded-[1.5rem] border border-slate-100">
            <span className="text-[8px] font-black text-slate-300 uppercase block mb-1">Price</span>
            <p className="text-lg font-black text-slate-800">${price.toFixed(2)}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-[1.5rem] border border-slate-100">
            <span className="text-[8px] font-black text-slate-300 uppercase block mb-1">Stock</span>
            <p className={`text-lg font-black ${isOutOfStock ? 'text-red-500' : 'text-slate-800'}`}>{stock}</p>
        </div>
      </div>

      <Link href={`/vaccination/${vaccine._id}`} className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest text-center hover:bg-orange-500 transition-all flex items-center justify-center gap-2">
        View Details <FaChevronRight size={10}/>
      </Link>
    </div>
  );
};