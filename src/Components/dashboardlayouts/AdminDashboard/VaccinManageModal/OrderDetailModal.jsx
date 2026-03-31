"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, MapPin, Calendar, Hash, ShieldCheck, CheckCircle2 } from "lucide-react";

const OrderDetailModal = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
            >
              <X size={20} className="text-slate-500" />
            </button>

            {/* Header / Profile Section */}
            <div className="bg-slate-50 p-8 pt-10 flex flex-col items-center text-center border-b border-slate-100">
              <div className="relative mb-4">
                <img
                  src={order.userImage}
                  alt={order.userName}
                  className="w-24 h-24 rounded-3xl object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-primary text-white p-1.5 rounded-xl shadow-md">
                   <ShieldCheck size={16} />
                </div>
              </div>
              <h2 className="text-2xl font-black text-slate-800">{order.userName}</h2>
              <p className="text-slate-500 font-bold text-sm flex items-center gap-1 mt-1">
                <Mail size={14} /> {order.userEmail}
              </p>
            </div>

            {/* Data Grid */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem icon={<Hash size={16}/>} label="Order ID" value={order._id} isId />
              <DetailItem icon={<ShieldCheck size={16}/>} label="Vaccine" value={order.vaccineName} />
              <DetailItem icon={<MapPin size={16}/>} label="Location" value={order.location} />
              <DetailItem icon={<Calendar size={16}/>} label="Deadline" value={new Date(order.deadlineDate).toLocaleDateString()} />
              <DetailItem icon={<CheckCircle2 size={16}/>} label="Status" value={order.status} isStatus />
              <DetailItem icon={<Calendar size={16}/>} label="Created At" value={new Date(order.createdAt).toLocaleDateString()} />
            </div>

            {/* Footer Badges */}
            <div className="px-8 pb-8 flex flex-wrap gap-3">
               <Badge active={order.adminAccepted} label="Admin Accepted" />
               <Badge active={order.doctorAssigned} label="Doctor Assigned" />
               <Badge active={order.isCompleted} label="Completed" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Helper Components
const DetailItem = ({ icon, label, value, isId, isStatus }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest flex items-center gap-1">
      {icon} {label}
    </span>
    <span className={`font-bold text-slate-700 ${isId ? 'text-[11px] break-all' : 'text-sm'} ${isStatus ? 'text-primary' : ''}`}>
      {value?.toString()}
    </span>
  </div>
);

const Badge = ({ active, label }) => (
  <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 border ${active ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
     {active ? <CheckCircle2 size={12}/> : <X size={12}/>} {label}
  </div>
);

export default OrderDetailModal;