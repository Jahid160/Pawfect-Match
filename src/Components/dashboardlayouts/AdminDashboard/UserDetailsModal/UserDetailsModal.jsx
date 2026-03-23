"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Mail, Calendar, ShieldCheck, MapPin, 
  Clock, Link2, LogIn
} from "lucide-react";
import Image from "next/image";

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral/30 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            className="bg-base-100 w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden border border-base-300"
          >
            {/* Minimal Header */}
            <div className="px-6 py-4 flex justify-between items-center border-b border-base-200">
              <span className="text-[10px] font-black text-neutral/40 uppercase tracking-[0.2em]">Profile Info</span>
              <button 
                onClick={onClose} 
                className="p-1.5 hover:bg-error/10 hover:text-error rounded-xl transition-all text-neutral/30"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Compact Identity Section */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-base-200 shadow-lg relative">
                    <Image
                      src={user.image || "https://i.ibb.co/L6S9Dkz/user-placeholder.png"}
                      alt={user.name || "Not Found"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-lg shadow border-2 border-base-100">
                    {user.provider === "google" ? <Link2 size={12} /> : <LogIn size={12} />}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-black text-neutral truncate tracking-tight">
                    {user.name}
                  </h3>
                  <div className="flex gap-1.5 mt-1">
                    <span className="px-2 py-0.5 bg-neutral text-white text-[9px] font-black uppercase rounded-md">
                      {user.role}
                    </span>
                    <span className={`px-2 py-0.5 border text-[9px] font-black uppercase rounded-md ${
                      user.status === 'active' ? 'bg-success/10 text-success border-success/20' : 'bg-error/10 text-error border-error/20'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Compact Info List */}
              <div className="space-y-3 bg-base-200/50 p-4 rounded-2xl border border-base-300">
                <MiniRow icon={Mail} label="Email" value={user.email} />
                <MiniRow icon={MapPin} label="Location" value={user.location || "Not Set"} />
                <MiniRow 
                  icon={Clock} 
                  label="Last Login" 
                  value={new Date(user.lastLoginAt).toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })} 
                />
                <MiniRow 
                  icon={Calendar} 
                  label="Created" 
                  value={new Date(user.createdAt).toLocaleDateString('en-GB')} 
                />
              </div>

              {/* Footer Button */}
              <button 
                onClick={onClose} 
                className="w-full py-3 bg-neutral text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-md active:scale-95"
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

// Compact Row Component
const MiniRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 overflow-hidden">
    <div className="text-primary/50 shrink-0">
      <Icon size={14} />
    </div>
    <div className="min-w-0">
      <p className="text-[8px] font-black text-neutral/30 uppercase tracking-tighter leading-none mb-0.5">{label}</p>
      <p className="text-xs font-bold text-neutral truncate">{value}</p>
    </div>
  </div>
);

export default UserDetailsModal;