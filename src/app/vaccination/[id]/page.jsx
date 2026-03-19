import React from "react";
import {
  FaSyringe, FaArrowLeft, FaCheckCircle, FaShieldAlt,
  FaExclamationTriangle, FaPaw, FaMoneyBillWave,
  FaWarehouse, FaCalendarAlt, FaHistory, FaClinicMedical
} from "react-icons/fa";
import Link from "next/link";
import { notFound } from "next/navigation";
import OrderButton from "./OrderButton";

async function VaccineDetails({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const vaccine = await getVaccineById(id);

  if (!vaccine) {
    notFound();
  }

  const isOutOfStock = vaccine.stock === 0;
  const isLowStock = vaccine.stock > 0 && vaccine.stock < 10;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 pt-28">
      <div className="max-w-5xl mx-auto">

        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/vaccination"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-600 font-bold text-sm transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Inventory
          </Link>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
            Last Updated: {vaccine.createdAt ? new Date(vaccine.createdAt).toLocaleDateString() : 'N/A'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Profile & Stats */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              {/* Header Banner */}
              <div className="bg-slate-900 p-8 md:p-10 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-orange-500 p-2 rounded-xl">
                      <FaSyringe size={22} />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-orange-400 font-black tracking-widest text-[10px] uppercase">Vaccine Profile</span>
                      <span className="text-slate-400 text-[10px]">ID: {vaccine._id}</span>
                    </div>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                    {vaccine.vaccineName}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      <FaPaw className="text-orange-500" />
                      <span className="font-bold">{vaccine.forPet}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      <FaClinicMedical className="text-emerald-400" />
                      <span className="font-bold">Medical Grade</span>
                    </div>
                  </div>
                </div>
                <FaShieldAlt className="absolute -bottom-10 -right-10 text-white/5 text-[18rem]" />
              </div>

              {/* Description Section */}
              <div className="p-8 md:p-10">
                <h3 className="text-slate-900 font-black text-xl mb-4 flex items-center gap-3">
                  <FaCheckCircle className="text-orange-500" /> Clinical Overview
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg italic mb-8">
                  {vaccine.description || `This ${vaccine.vaccineName} provides essential immunization.`}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-t border-slate-100">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
                      <FaCalendarAlt className="text-slate-400" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Dosage Schedule</h4>
                      <p className="text-slate-700 font-bold italic">Standard 1.0ml dosage.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
                      <FaHistory className="text-slate-400" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Validity Period</h4>
                      <p className="text-slate-700 font-bold italic">Effective for 12-36 months.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inventory & Actions */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-lg shadow-slate-200/40 border border-slate-100">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Unit Price</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">${vaccine.price}</span>
                <span className="text-slate-400 font-bold text-sm">/per dose</span>
              </div>
            </div>

            <div className={`p-8 rounded-[2rem] border-2 shadow-lg ${isOutOfStock ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'
              }`}>
              <span className="text-[10px] font-black uppercase tracking-widest block mb-2">Stock Level</span>
              <div className="flex items-center justify-between">
                <span className="text-5xl font-black">{vaccine.stock}</span>
                <FaWarehouse size={30} className="opacity-20" />
              </div>
            </div>

            {/* Action Buttons Section */}
            <div className="space-y-3 pt-4">
              {/* ইমপ্লিমেন্ট করা বাটন */}
              {!isOutOfStock ? (
                <OrderButton
                  vaccineId={id}
                  vaccineName={vaccine.vaccineName}
                />
              ) : (
                <button
                  disabled
                  className="w-full py-5 rounded-2xl font-black text-sm uppercase bg-slate-200 text-slate-400 cursor-not-allowed"
                >
                  Out of Stock
                </button>
              )}

              <button className="w-full py-4 rounded-2xl font-black text-sm uppercase text-slate-600 border-2 border-slate-100 hover:bg-slate-50 transition-colors">
                Print Report
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default VaccineDetails;