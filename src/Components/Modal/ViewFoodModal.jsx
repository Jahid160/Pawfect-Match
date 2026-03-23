"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Tag,
  Layers,
  Weight,
  Database,
  Info,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const ViewFoodModal = ({ isOpen, food, onClose }) => {
  if (!food) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
          {/* Backdrop Overlay */}
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
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            
            {/* Header */}
            <div className="bg-slate-900 p-4 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-[10px] font-black uppercase tracking-widest rounded-full text-white">
                  {food.category || "General"}
                </span>
              </div>
              
              <h2 className="text-3xl font-black tracking-tight uppercase">
                {food.productName || "Product Details"}
              </h2>
              <p className="opacity-60 font-medium text-sm flex items-center gap-2">
                <Info size={14} /> View inventory and pricing specifications
              </p>
            </div>

            {/* Body */}
            <div className="p-5 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Image Section */}
                <div className="space-y-4">
                  <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden bg-slate-100 border-4 border-slate-50 shadow-inner">
                    <Image
                      src={food.image || "/placeholder.png"}
                      alt={food.productName}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Stock Badge */}
                  <div
                    className={`flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm ${
                      food.inStock
                        ? "bg-orange-50 text-orange-600"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {food.inStock ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <AlertCircle size={18} />
                    )}
                    {food.inStock ? "Currently in Stock" : "Out of Stock"}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <DetailItem icon={<Tag size={18} />} label="Brand Name" value={food.brand} />
                    <DetailItem icon={<Layers size={18} />} label="Food Type" value={food.foodType} />
                    <DetailItem icon={<Weight size={18} />} label="Unit Weight" value={`${food.weight || 0} kg`} />
                    <DetailItem icon={<Database size={18} />} label="Current Stock" value={`${food.stock || 0} units`} />
                  </div>

                  {/* Pricing */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                      Pricing Details
                    </p>
                    <div className="flex items-end gap-4">
                      <div>
                        <p className="text-xs text-slate-500 font-bold mb-1">Regular Price</p>
                        <p className="text-2xl font-black text-slate-900">
                          ${food.price || 0}
                        </p>
                      </div>
                      <ChevronRight className="text-slate-300 mb-1" size={20} />
                      <div>
                        <p className="text-xs text-orange-600 font-bold mb-1">Discounted</p>
                        <p className="text-2xl font-black text-orange-500">
                          ${food.discountPrice || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={onClose}
                className="px-8 py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-orange-500 transition-all active:scale-95 shadow-lg flex items-center gap-2"
              >
                Close View
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* Detail Item */
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors group">
    <div className="p-2.5 bg-slate-100 text-slate-500 rounded-xl group-hover:bg-white group-hover:text-orange-500 shadow-sm transition-colors">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <p className="text-sm font-bold text-slate-800">
        {value || "Not Specified"}
      </p>
    </div>
  </div>
);

export default ViewFoodModal;