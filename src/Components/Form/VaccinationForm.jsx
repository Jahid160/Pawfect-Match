"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaSyringe,
  FaMoneyBillWave,
  FaBoxes,
  FaPaw,
  FaArrowLeft,
  FaPlusCircle
} from "react-icons/fa";
import Link from "next/link";
// আপনার সার্ভার অ্যাকশনটি ইমপোর্ট করুন
import { addVaccine } from "@/action/server/vaccines";

export default function VaccinationForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const vaccineData = {
      vaccineName: formData.get("vaccineName"),
      price: parseFloat(formData.get("price")),
      stock: parseInt(formData.get("stock")),
      forPet: formData.get("forPet"),
      manufacturer: formData.get("manufacturer"), 
      batchNumber: formData.get("batchNumber"),  
      expiryDate: formData.get("expiryDate"),     
      description: formData.get("description"),  
    };

    try {
      const result = await addVaccine(vaccineData);
      if (result.success) {
        toast.success("Vaccine added successfully!");
        router.push("/vaccination");
      } else {
        toast.error(result.error || "Failed to add vaccine");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 pt-28">
      <div className="max-w-xl mx-auto">

        {/* Back Button - সঠিক পাথ সেট করা হয়েছে */}
        <Link
          href="/vaccination"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold text-sm mb-6 transition-colors group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Inventory
        </Link>

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          <div className="bg-slate-900 p-8 text-white relative">
            <div className="flex items-center gap-3 mb-2">
              <FaPlusCircle className="text-orange-500" />
              <span className="text-orange-400 font-black text-[10px] uppercase tracking-[3px]">New Medical Entry</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight">Register Vaccine</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">

            {/* Vaccine Name */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <FaSyringe className="text-orange-500" /> Vaccine Name
              </label>
              <input
                name="vaccineName"
                type="text"
                placeholder="e.g. Rabies Multi-Dose"
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-700"
              />
            </div>

            {/* Row 2: Manufacturer & Batch Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <FaIndustry className="text-orange-500" /> Manufacturer
                </label>
                <input
                  name="manufacturer"
                  type="text"
                  placeholder="e.g. Zoetis / Merck"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-700"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <FaHashtag className="text-orange-500" /> Batch Number
                </label>
                <input
                  name="batchNumber"
                  type="text"
                  placeholder="e.g. BATCH-2024-001"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-700"
                />
              </div>
            </div>

            {/* Row 3: Price, Stock & Expiry */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <FaMoneyBillWave className="text-orange-500" /> Price ($)
                </label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="25.00"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-700"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <FaBoxes className="text-orange-500" /> Stock
                </label>
                <input
                  name="stock"
                  type="number"
                  placeholder="50"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-700"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <FaCalendarTimes className="text-orange-500" /> Expiry Date
                </label>
                <input
                  name="expiryDate"
                  type="date"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-700"
                />
              </div>
            </div>

            {/* Row 4: Targeted Pet */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <FaPaw className="text-orange-500" /> Targeted Pet Species
              </label>
              <select
                name="forPet"
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-700 appearance-none cursor-pointer"
              >
                <option value="Dogs">Dogs</option>
                <option value="Cats">Cats</option>
                <option value="Dogs & Cats">Dogs & Cats</option>
                <option value="Birds">Birds</option>
                <option value="Rabbits">Rabbits</option>
              </select>
            </div>

            {/* Row 5: Description */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <FaFileAlt className="text-orange-500" /> Vaccine Description
              </label>
              <textarea
                name="description"
                rows="3"
                placeholder="Describe dosage instructions, storage conditions or side effects..."
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-bold text-slate-700 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-3xl font-black text-sm uppercase tracking-[2px] transition-all shadow-lg ${loading
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600 shadow-orange-200 active:scale-95"
                }`}
            >
              {loading ? "Registering..." : "Add to Medical Inventory"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}