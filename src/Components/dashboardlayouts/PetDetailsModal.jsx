"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Phone,
  Mail,
  Home,
  Clock,
  Briefcase,
  DollarSign,
  ShieldAlert,
  Hash,
  PawPrint
} from "lucide-react";

const PetDetailsModal = ({ isOpen, onClose, petData }) => {
  if (!petData) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >

            {/* Header */}
            <div className="bg-orange-500 p-8 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <h2 className="text-3xl font-black tracking-tight">
                Adoption Request
              </h2>

              <p className="opacity-90 font-medium">
                Detailed information of the applicant
              </p>
            </div>

            {/* Body */}
            <div className="p-8 max-h-[70vh] overflow-y-auto">

              {/* Adoption Code Highlight */}
              <div className="mb-6 bg-orange-50 border border-orange-100 rounded-2xl p-5">
                <p className="text-xs font-black uppercase tracking-widest text-orange-400 mb-1">
                  Adoption Code
                </p>

                <p className="text-xl font-black text-orange-600 tracking-widest">
                  {petData.adoptionCode || "N/A"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Personal Info */}
                <DetailItem
                  icon={<User size={18} />}
                  label="Full Name"
                  value={petData.fullName}
                />

                <DetailItem
                  icon={<Mail size={18} />}
                  label="Email Address"
                  value={petData.email}
                />

                <DetailItem
                  icon={<Phone size={18} />}
                  label="Phone"
                  value={petData.phone}
                />

                <DetailItem
                  icon={<Home size={18} />}
                  label="Residence"
                  value={petData.residence}
                />

                <DetailItem
                  icon={<PawPrint size={18} />}
                  label="Pet ID"
                  value={petData.petId}
                />

                <DetailItem
                  icon={<DollarSign size={18} />}
                  label="Annual Income"
                  value={petData.income}
                />

                <div className="md:col-span-2 border-t border-slate-100 my-2"></div>

                {/* Lifestyle Info */}
                <DetailItem
                  icon={<Clock size={18} />}
                  label="Daily Time for Pet"
                  value={petData.dailyTime}
                />

                <DetailItem
                  icon={<Briefcase size={18} />}
                  label="Experience"
                  value={petData.experience}
                />

                <DetailItem
                  icon={<ShieldAlert size={18} />}
                  label="Emergency Fund"
                  value={petData.emergencyFund}
                />

                {/* Other Details */}
                <div className="md:col-span-2 space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">

                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Other Details
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <p className="text-sm font-bold text-slate-600">
                      Yard Available:
                      <span className="text-orange-500 uppercase ml-1">
                        {petData.yard || "N/A"}
                      </span>
                    </p>

                    <p className="text-sm font-bold text-slate-600">
                      Vacation Plan:
                      <span className="text-orange-500 ml-1">
                        {petData.vacationPlan || "N/A"}
                      </span>
                    </p>

                    <p className="text-sm font-bold text-slate-600">
                      Commitment:
                      <span className="text-orange-500 ml-1">
                        {petData.commitment || "N/A"}
                      </span>
                    </p>

                    <p className="text-sm font-bold text-slate-600">
                      Address:
                      <span className="text-slate-800 font-medium ml-1">
                        {petData.address || "N/A"}
                      </span>
                    </p>

                  </div>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-orange-500 transition-colors shadow-lg"
              >
                Close Details
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* Reusable Detail Item */

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="p-2.5 bg-orange-50 text-orange-500 rounded-xl">
      {icon}
    </div>

    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
        {label}
      </p>

      <p className="text-sm font-bold text-slate-800">
        {value || "N/A"}
      </p>
    </div>
  </div>
);

export default PetDetailsModal;