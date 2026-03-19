"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  X, Phone, Mail, MapPin, Home, Shield, 
  DollarSign, Clock, Briefcase, AlertCircle, Heart 
} from "lucide-react";

const AdoptionDetailModal = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl relative"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-rose-100 hover:text-rose-500 rounded-full transition-all text-slate-400 z-10"
        >
          <X size={20} />
        </button>

        {/* Header Section */}
        <div className="p-8 pb-6 border-b border-slate-100 bg-orange-50/50">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg">
              {data.fullName?.[0]}
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">{data.fullName}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] bg-white border border-orange-200 text-orange-600 px-2 py-0.5 rounded-md font-black uppercase tracking-widest">
                  Code: {data.adoptionCode}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  data.status === 'approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                } uppercase`}>
                  {data.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-8">
          
          {/* Contact Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoBox icon={<Phone size={16}/>} label="Phone Number" value={data.phone} />
            <InfoBox icon={<Mail size={16}/>} label="Email Address" value={data.email} />
            <InfoBox icon={<MapPin size={16}/>} label="Full Address" value={data.address} className="md:col-span-2" />
          </div>

          <div className="h-px bg-slate-100 w-full" />

          {/* Lifestyle & Financials */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <InfoBox icon={<Home size={16}/>} label="Residence" value={data.residence} />
            <InfoBox icon={<Shield size={16}/>} label="Yard Access" value={data.yard === "yes" ? "Available" : "No Yard"} />
            <InfoBox icon={<DollarSign size={16}/>} label="Annual Income" value={data.income} />
            <InfoBox icon={<Clock size={16}/>} label="Daily Time" value={data.dailyTime} />
            <InfoBox icon={<Briefcase size={16}/>} label="Experience" value={data.experience} />
            <InfoBox icon={<AlertCircle size={16}/>} label="Emergency Fund" value={data.emergencyFund} />
          </div>

          <div className="h-px bg-slate-100 w-full" />

          {/* Plans & Commitment */}
          <div className="space-y-4">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Vacation Plan for Pet</p>
              <p className="text-sm font-bold text-slate-700 leading-relaxed">{data.vacationPlan}</p>
            </div>
            
            <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-1">Lifelong Commitment</p>
                <p className="text-sm font-black text-orange-700">{data.commitment}</p>
              </div>
              <Heart className="text-orange-500 fill-orange-500/20" size={32} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 pt-0 flex gap-4">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-orange-500 transition-all uppercase tracking-widest text-xs shadow-xl shadow-slate-200"
          >
            Close Profile View
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Helper Item Component
const InfoBox = ({ icon, label, value, className = "" }) => (
  <div className={`flex items-start gap-3 ${className}`}>
    <div className="p-2.5 bg-orange-50 rounded-xl text-orange-500 mt-1">
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] mb-0.5">{label}</p>
      <p className="text-[13px] font-bold text-slate-800">{value || "Not Provided"}</p>
    </div>
  </div>
);

export default AdoptionDetailModal;