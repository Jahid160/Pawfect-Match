"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Tag, Info, CheckCircle, Clock, Award } from "lucide-react";
import Image from 'next/image';

const PetProfileModal = ({ isOpen, onClose, pet }) => {
  if (!pet) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all shadow-lg"
            >
              <X size={20} />
            </button>

            {/* Pet Image Header */}
            <div className="relative h-64 w-full">
              <Image
                src={pet.image || "https://via.placeholder.com/400"}
                alt={pet.name}
                fill
                className="object-cover"
                priority 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-8">
                <span className="px-3 py-1 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-2 inline-block">
                  {pet.type}
                </span>
                <h2 className="text-3xl font-black text-white tracking-tight leading-none">
                  {pet.name}
                </h2>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {/* Breed Info */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-1 text-orange-500">
                    <Award size={16} />
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Breed</p>
                  </div>
                  <p className="text-sm font-bold text-slate-800">{pet.breed}</p>
                </div>

                {/* Status Info */}
                <div className={`p-4 rounded-2xl border ${
                  pet.status === "Available" 
                    ? "bg-emerald-50 border-emerald-100" 
                    : "bg-amber-50 border-amber-100"
                }`}>
                  <div className={`flex items-center gap-2 mb-1 ${
                    pet.status === "Available" ? "text-emerald-600" : "text-amber-600"
                  }`}>
                    {pet.status === "Available" ? <CheckCircle size={16} /> : <Clock size={16} />}
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Status</p>
                  </div>
                  <p className={`text-sm font-bold ${
                    pet.status === "Available" ? "text-emerald-700" : "text-amber-700"
                  }`}>
                    {pet.status}
                  </p>
                </div>
              </div>

              {/* Unique ID & Meta */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-center gap-3 text-slate-500">
                  <Tag size={16} className="text-slate-300" />
                  <p className="text-xs font-medium">
                    Internal ID: <span className="font-bold text-slate-800 uppercase tracking-tighter">{pet._id}</span>
                  </p>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <Info size={16} className="text-slate-300" />
                  <p className="text-xs font-medium leading-relaxed">
                    This {pet.type?.toLowerCase()} is looking for a forever home. Make sure to verify all adoption documents.
                  </p>
                </div>
              </div>

              {/* Footer Button */}
              <button
                onClick={onClose}
                className="w-full py-4 bg-slate-900 hover:bg-orange-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-lg hover:shadow-orange-200"
              >
                Close Profile
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PetProfileModal;