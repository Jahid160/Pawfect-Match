"use client";

import React from "react";
import { 
  FaSyringe, 
  FaArrowLeft, 
  FaCheckCircle, 
  FaShieldAlt, 
  FaExclamationTriangle,
  FaPaw,
  FaMoneyBillWave,
  FaWarehouse
} from "react-icons/fa";
import Link from "next/link";

function VaccineDetails({ params }) {
  // In a real app, you would fetch the data using params.id
  // For now, here is a mock object representing the detailed data
  const vaccine = {
    id: params?.id || "1",
    vaccineName: "Rabies Multi-Strain",
    price: 45.00,
    stock: 25,
    forPet: "Dogs & Cats",
    description: "A high-potency vaccine designed to provide long-lasting immunity against the Rabies virus. Essential for all domestic pets to ensure public safety and pet health.",
    dosage: "1.0 mL subcutaneous injection",
    manufacturer: "PawHealth Pharma",
    validity: "1 Year / 3 Years (Booster dependent)"
  };

  const isOutOfStock = vaccine.stock === 0;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation */}
        <Link 
          href="/vaccination" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold text-sm transition-colors mb-8 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Inventory
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-slate-900 p-8 md:p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-orange-500 p-2 rounded-lg">
                  <FaSyringe size={20} />
                </span>
                <span className="text-orange-400 font-black tracking-widest text-xs uppercase">Vaccine Profile</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                {vaccine.vaccineName}
              </h1>
              <div className="flex items-center gap-4 text-slate-400 text-sm">
                <div className="flex items-center gap-1.5">
                  <FaPaw className="text-orange-500" />
                  <span>Targets: {vaccine.forPet}</span>
                </div>
                <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                <span>ID: VAX-{vaccine.id.toString().padStart(4, '0')}</span>
              </div>
            </div>
            {/* Background Decoration */}
            <FaShieldAlt className="absolute -bottom-10 -right-10 text-white/5 text-[15rem]" />
          </div>

          {/* Content Grid */}
          <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Left Column: Key Stats */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <FaMoneyBillWave size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Market Price</span>
                </div>
                <p className="text-3xl font-black text-slate-800">${vaccine.price.toFixed(2)}</p>
              </div>

              <div className={`p-6 rounded-3xl border ${isOutOfStock ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'}`}>
                <div className={`flex items-center gap-2 mb-2 ${isOutOfStock ? 'text-red-400' : 'text-emerald-500'}`}>
                  <FaWarehouse size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Inventory Status</span>
                </div>
                <p className={`text-3xl font-black ${isOutOfStock ? 'text-red-600' : 'text-emerald-700'}`}>
                  {vaccine.stock} <span className="text-xs font-bold opacity-70">Units</span>
                </p>
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="md:col-span-2 space-y-8">
              <section>
                <h3 className="text-slate-900 font-black text-lg mb-3 flex items-center gap-2">
                  <FaCheckCircle className="text-orange-500" /> Clinical Overview
                </h3>
                <p className="text-slate-600 leading-relaxed italic">
                  {vaccine.description}
                </p>
              </section>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Dosage Guide</h4>
                  <p className="text-slate-700 font-bold">{vaccine.dosage}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Validity Period</h4>
                  <p className="text-slate-700 font-bold">{vaccine.validity}</p>
                </div>
                <div className="col-span-2">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Manufacturer</h4>
                  <p className="text-slate-700 font-bold">{vaccine.manufacturer}</p>
                </div>
              </div>

              {/* Warnings */}
              {isOutOfStock && (
                <div className="flex items-start gap-3 bg-amber-50 p-4 rounded-2xl border border-amber-100 text-amber-700 text-sm">
                  <FaExclamationTriangle className="shrink-0 mt-0.5" />
                  <p>This item is currently out of stock. New shipment expected in 3-5 business days.</p>
                </div>
              )}

              {/* Action */}
              <button 
                disabled={isOutOfStock}
                className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                  isOutOfStock 
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                  : "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-200"
                }`}
              >
                Place Order
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default VaccineDetails;