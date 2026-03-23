"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, CheckCircle2, AlertCircle, MapPin, Calendar, 
  Heart, ShieldCheck, Phone, Mail, User, Info, Activity 
} from "lucide-react";
import Image from "next/image";

const RequestPetDetailsModal = ({ isOpen, onClose, pet }) => {
  if (!pet) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-neutral/40 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="bg-base-100 w-full max-w-5xl max-h-[92vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-base-300"
          >
            {/* Header section with Primary Color background */}
            <div className="px-8 py-6 bg-primary/10 flex justify-between items-center border-b border-primary/20">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary rounded-2xl text-white shadow-lg shadow-primary/30">
                  <Heart size={24} fill="currentColor" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-neutral uppercase tracking-tight leading-none">
                    {pet.petName} <span className="text-primary text-sm ml-2 opacity-70">#{pet._id.slice(-6)}</span>
                  </h2>
                  <p className="text-xs font-bold text-neutral/50 mt-1 uppercase tracking-widest">Adoption Request Preview</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-3 hover:bg-error/10 hover:text-error rounded-2xl transition-all duration-300 text-neutral/40"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Left Side: Image & Fast Stats (4 Columns) */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="relative aspect-square rounded-[2.5rem] overflow-hidden ring-8 ring-base-200 shadow-inner">
                    <Image
                      src={pet.images?.[0] || "https://images.unsplash.com/photo-1543466835-00a7907e9de1"}
                      alt={pet.petName}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-4 left-4">
                        <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-primary font-black text-xs rounded-full shadow-sm">
                            {pet.species} • {pet.breed}
                        </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-base-200 p-4 rounded-3xl text-center border border-base-300">
                        <p className="text-[10px] font-black text-neutral/40 uppercase tracking-widest mb-1">Gender</p>
                        <p className="font-bold text-neutral">{pet.gender}</p>
                    </div>
                    <div className="bg-base-200 p-4 rounded-3xl text-center border border-base-300">
                        <p className="text-[10px] font-black text-neutral/40 uppercase tracking-widest mb-1">Weight</p>
                        <p className="font-bold text-neutral">{pet.weight} KG</p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Detailed Info (7 Columns) */}
                <div className="lg:col-span-7 space-y-8">
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                      { label: "Age", value: `${pet.ageYears}y ${pet.ageMonths}m`, icon: Calendar },
                      { label: "Activity", value: pet.activityLevel, icon: Activity },
                      { label: "Location", value: pet.location, icon: MapPin },
                    ].map((stat, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-base-100 border border-base-300 rounded-3xl">
                        <stat.icon size={18} className="text-primary mt-1" />
                        <div>
                          <p className="text-[10px] font-black text-neutral/30 uppercase tracking-tighter">{stat.label}</p>
                          <p className="font-bold text-sm text-neutral">{stat.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Health Status - Using Success Color */}
                  <div className="bg-success/5 border border-success/20 p-6 rounded-[2.5rem]">
                    <h3 className="text-xs font-black text-success uppercase tracking-widest mb-4 flex items-center gap-2">
                      <ShieldCheck size={18} /> Medical & Health Verification
                    </h3>
                    <div className="grid grid-cols-2 gap-y-4">
                      {[
                        { label: "Vaccinated", val: pet.vaccinated },
                        { label: "Neutered", val: pet.neutered },
                        { label: "Microchipped", val: pet.microchipped },
                        { label: "House Trained", val: pet.houseTrained },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          {item.val === "Yes" ? (
                            <div className="bg-success text-white p-1 rounded-full"><CheckCircle2 size={12} /></div>
                          ) : (
                            <div className="bg-base-300 text-neutral/20 p-1 rounded-full"><X size={12} /></div>
                          )}
                          <span className={`text-sm font-bold ${item.val === "Yes" ? "text-neutral" : "text-neutral/30 line-through"}`}>
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reason & History */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                        <h3 className="flex items-center gap-2 text-xs font-black text-neutral/40 uppercase tracking-widest">
                            <Info size={14} /> Reason for Adoption
                        </h3>
                        <div className="p-6 bg-secondary/20 border border-secondary/30 rounded-[2rem] text-neutral/80 text-sm leading-relaxed italic">
                            "{pet.reasonForAdoption}"
                        </div>
                    </div>
                  </div>

                  {/* Owner Card */}
                  <div className="p-6 bg-neutral text-neutral-content rounded-[2.5rem] flex items-center justify-between shadow-xl">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                            <User size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-white/50 uppercase">Applicant Info</p>
                            <p className="font-black text-lg">{pet.ownerName}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-2 text-xs font-bold text-white/70">
                            <Phone size={12} /> {pet.phone}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-white/70">
                            <Mail size={12} /> {pet.email}
                        </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="px-8 py-6 bg-base-200 border-t border-base-300 flex justify-end gap-3">
              <button 
                onClick={onClose} 
                className="px-8 py-4 bg-white border border-base-300 text-neutral font-black rounded-2xl hover:bg-base-300 transition-all uppercase text-xs tracking-widest"
              >
                Close
              </button>
              <button className="px-10 py-4 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-all uppercase text-xs tracking-widest">
                Action Required
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RequestPetDetailsModal;