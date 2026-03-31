"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaSyringe,
  FaPaw,
  FaDollarSign,
  FaBoxes,
  FaCalendarAlt,
  FaBuilding,
  FaTag,
  FaArrowLeft,
} from "react-icons/fa";
import { getVaccineById } from "@/action/server/vaccines";
import { checkUserOrder, placeVaccineOrder } from "@/action/server/orders";
import { toast } from "react-hot-toast";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function VaccineDetails({ params }) {
  const [vaccine, setVaccine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);
  const [alreadyOrdered, setAlreadyOrdered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { id } = await params; // Next.js 15 Compatibility
      const data = await getVaccineById(id);
      if (!data) return notFound();
      setVaccine(data);

      setLoading(false);
    };
    fetchData();
  }, [params]);

  const { data: session } = useSession();

  const handleRequest = async () => {
    setIsRequesting(true);

    const orderData = {
      vaccineId: vaccine._id,
      vaccineName: vaccine.vaccineName,
    };

    const res = await placeVaccineOrder(orderData);

    if (res.success) {
      toast.success("Request sent successfully!", {
        style: { borderRadius: "15px", background: "#1e293b", color: "#fff" },
      });
      setAlreadyOrdered(true);
    } else {
      if (res.message === "Already ordered") {
        setAlreadyOrdered(true);
        toast.error("You already ordered this vaccine");
      } else {
        toast.error("Failed to send request");
      }
    }
    setIsRequesting(false);
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#FDF8F4]">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Loading...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FDF8F4] pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/vaccination"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-500 font-bold text-xs mb-8 transition-all uppercase tracking-widest"
        >
          <FaArrowLeft /> Back to Registry
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-orange-200/30 rounded-[4rem] blur-3xl"></div>
            <div className="relative h-[500px] rounded-[3.5rem] overflow-hidden border-[10px] border-white shadow-2xl">
              <img
                src={
                  vaccine.image ||
                  "https://images.unsplash.com/photo-1584107662774-8d575e8f3550"
                }
                alt={vaccine.vaccineName}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-sm border border-orange-50">
                <p className="flex items-center gap-2 text-[10px] font-black text-orange-600 uppercase tracking-widest">
                  <FaPaw /> {vaccine.forPet}
                </p>
              </div>
            </div>
          </motion.div>

          {/* CONTENT SECTION */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-5xl font-black text-slate-900 leading-tight mb-4">
                {vaccine.vaccineName}
              </h1>
              <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg">
                {vaccine.description ||
                  "Providing the ultimate defense for your pets against infectious diseases with our certified vaccination formula."}
              </p>
            </div>

            {/* INFO GRID */}
            <div className="grid grid-cols-2 gap-4">
              <InfoBox
                icon={<FaDollarSign />}
                label="Retail Price"
                value={`$${vaccine.price}`}
                color="text-emerald-500"
              />
              <InfoBox
                icon={<FaBoxes />}
                label="Available Stock"
                value={`${vaccine.stock} Units`}
                color="text-blue-500"
              />
              <InfoBox
                icon={<FaBuilding />}
                label="Manufacturer"
                value={vaccine.manufacturer || "HealthVet"}
                color="text-purple-500"
              />
              <InfoBox
                icon={<FaTag />}
                label="Batch Code"
                value={vaccine.batchNumber || "V-098"}
                color="text-orange-500"
              />
            </div>

            {/* EXPIRY SECTION */}
            <div className="p-7 bg-white rounded-[2.5rem] border border-slate-100 flex items-center gap-6 shadow-sm">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 text-xl shadow-inner">
                <FaCalendarAlt />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Expiration Date
                </p>
                <p className="text-xl font-black text-slate-800">
                  {vaccine.expiryDate || "Aug 2026"}
                </p>
              </div>
            </div>

            {/* ACTION BUTTON */}
            <button
              disabled={isRequesting || vaccine.stock <= 0 || alreadyOrdered}
              onClick={handleRequest}
              className={`w-full py-6 rounded-[2.2rem] font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl transition-all flex items-center justify-center gap-4 ${
                vaccine.stock <= 0
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-slate-900 text-white hover:bg-orange-600 hover:-translate-y-1 active:scale-95 shadow-orange-100"
              }`}
            >
              {isRequesting
                ? "Processing Request..."
                : alreadyOrdered
                  ? "You Already Ordered"
                  : "Confirm Vaccine Request"}
            </button>

            <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              * By requesting, you agree to our veterinary consultation terms.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const InfoBox = ({ icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-[2.2rem] border border-slate-100 shadow-sm hover:border-orange-200 transition-all">
    <div className={`${color} text-xl mb-3`}>{icon}</div>
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
      {label}
    </p>
    <p className="text-lg font-black text-slate-800">{value}</p>
  </div>
);
