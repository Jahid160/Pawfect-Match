"use client"
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Mail, ShieldCheck, Activity, Award } from 'lucide-react';

const AppointmentModal = ({ isOpen, onClose, data }) => {
  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop using Base Neutral or Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral/40 backdrop-blur-sm"
          />

          {/* Modal Content using Base-100 (White in your theme) */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-base-100 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-base-300"
          >
            {/* Header with Primary Color (oklch 70% 0.19 45) */}
            <div className="relative h-32 bg-primary flex items-end p-8">
              <div className="absolute top-4 right-4">
                <button 
                  onClick={onClose}
                  className="p-2 bg-base-100/20 hover:bg-base-100/40 rounded-full text-base-100 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="translate-y-10 flex items-center gap-4">
                 <img 
                  src={data.userImage} 
                  className="w-20 h-20 rounded-[1.5rem] border-4 border-base-100 shadow-lg object-cover bg-base-200" 
                  alt="" 
                />
                <div className="mb-2">
                  <h2 className="text-xl font-black text-base-100 leading-none mb-1">{data.userName}</h2>
                  <div className="badge badge-secondary border-none font-black text-[9px] uppercase">
                    {data.status}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="pt-14 pb-8 px-8 space-y-5">
              
              <div className="grid grid-cols-1 gap-3">
                <InfoRow icon={<Mail size={14}/>} label="User Email" value={data.userEmail} />
                <InfoRow icon={<MapPin size={14}/>} label="Location" value={data.location} />
                
                {/* Vaccine Card using Base-200 */}
                <div className="mt-2 p-5 bg-base-200 rounded-[2rem] border border-base-300">
                  <p className="text-[10px] font-black text-neutral/50 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Activity size={14} className="text-primary"/> Vaccine Overview
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-lg font-black text-neutral leading-none">{data.vaccineName}</h4>
                      <p className="text-[10px] font-bold text-neutral/40 mt-1">ID: {data.vaccineId?.slice(-8)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black text-neutral/40 uppercase">Deadline</p>
                      <p className="text-xs font-black text-primary">
                        {new Date(data.deadlineDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Badges using Success Color */}
                <div className="flex gap-2 pt-2">
                   <StatusBadge active={data.adminAccepted} text="Verified" />
                   <StatusBadge active={data.doctorAssigned} text="Assigned" />
                   <StatusBadge active={data.isCompleted} text="Finished" />
                </div>
              </div>

              {/* Primary Action Button */}
              <button 
                onClick={onClose}
                className="btn btn-primary w-full rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20"
              >
                Done Reading
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="p-2 bg-base-200 rounded-xl text-primary">{icon}</div>
    <div>
      <p className="text-[8px] font-black text-neutral/40 uppercase tracking-tighter leading-none">{label}</p>
      <p className="text-xs font-bold text-neutral mt-0.5">{value}</p>
    </div>
  </div>
);

const StatusBadge = ({ active, text }) => (
  <div className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase tracking-tighter text-center border-2 ${
    active 
    ? 'bg-success/10 border-success text-success' 
    : 'bg-base-200 border-base-300 text-neutral/30'
  }`}>
    {text}
  </div>
);

export default AppointmentModal;