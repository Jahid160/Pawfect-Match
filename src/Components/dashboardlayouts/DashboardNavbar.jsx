"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bell, User, Check, MessageSquare, Heart, AlertCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fake Notification Data
  const notifications = [
    {
      id: 1,
      title: "New Adoption Request",
      desc: "Anisur Rahman wants to adopt Buddy.",
      time: "2 mins ago",
      icon: <Heart size={16} className="text-rose-500" />,
      bg: "bg-rose-50",
      isUnread: true,
    },
    {
      id: 2,
      title: "Medical Alert",
      desc: "Luna's vaccination is overdue.",
      time: "1 hour ago",
      icon: <AlertCircle size={16} className="text-amber-500" />,
      bg: "bg-amber-50",
      isUnread: true,
    },
    {
      id: 3,
      title: "System Update",
      desc: "Records synced with cloud storage.",
      time: "5 hours ago",
      icon: <Check size={16} className="text-emerald-500" />,
      bg: "bg-emerald-50",
      isUnread: false,
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="top-0 z-50 sticky flex justify-between items-center bg-white shadow-sm px-6 py-3 border-gray-100 border-b">
      
      {/* LEFT SIDE: Logo */}
      <div>
        <h1 className="hover:opacity-80 ml-9 lg:ml-1 font-black text-slate-800 text-xl tracking-tight transition-opacity">
          Dashboard <span className="text-orange-500 italic">Overview</span>
        </h1>
      </div>

      {/* RIGHT SIDE: Notifications & Profile */}
      <div className="flex items-center gap-5">
        
        {/* Notification Container */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`relative p-2.5 rounded-2xl transition-all duration-300 ${
              isOpen ? 'bg-orange-50 text-orange-600' : 'hover:bg-slate-50 text-slate-500'
            }`}
          >
            <Bell size={22} strokeWidth={2.5} />
            {/* Red Dot Indicator */}
            <span className="top-2.5 right-2.5 absolute bg-rose-500 border-2 border-white rounded-full w-2.5 h-2.5"></span>
          </button>

          {/* DROPDOWN MENU */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="right-0 absolute bg-white shadow-2xl shadow-slate-200 mt-4 border border-slate-100 rounded-[2rem] w-80 md:w-96 overflow-hidden origin-top-right"
              >
                {/* Dropdown Header */}
                <div className="flex justify-between items-center bg-slate-50/50 p-5 border-slate-50 border-b">
                  <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest">Notifications</h3>
                  <span className="bg-orange-500 px-2 py-0.5 rounded-full font-black text-[10px] text-white">2 NEW</span>
                </div>

                {/* Notification List */}
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      className={`p-4 flex gap-4 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0 relative ${notif.isUnread ? 'bg-blue-50/20' : ''}`}
                    >
                      <div className={`${notif.bg} w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}>
                        {notif.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-slate-800 text-sm leading-tight">{notif.title}</h4>
                          <span className="font-medium text-[10px] text-slate-400">{notif.time}</span>
                        </div>
                        <p className="mt-1 font-medium text-slate-500 text-xs line-clamp-2 leading-relaxed">{notif.desc}</p>
                      </div>
                      {notif.isUnread && (
                        <div className="top-1/2 right-2 absolute bg-blue-500 rounded-full w-1.5 h-1.5 -translate-y-1/2"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* View All Button */}
                <Link 
                  href="/notifications" 
                  onClick={() => setIsOpen(false)}
                  className="block flex justify-center items-center gap-2 bg-slate-50 hover:bg-orange-500 p-4 font-black text-orange-500 hover:text-white text-xs text-center uppercase tracking-widest transition-all"
                >
                  See all activities <ArrowRight size={14} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Avatar */}
        <div className="flex items-center gap-3 pl-2 border-slate-100 border-l">
          <button className="flex justify-center items-center bg-orange-100 border border-orange-200 rounded-2xl hover:ring-4 hover:ring-orange-50 w-10 h-10 text-orange-600 transition-all">
            <User size={22} strokeWidth={2.5} />
          </button>
          
          <div className="hidden md:block">
            <p className="font-black text-slate-800 text-sm leading-none">Opu Nath</p>
            <p className="mt-1 font-bold text-[10px] text-slate-400 italic uppercase tracking-tighter">Super Admin</p>
          </div>
        </div>
        
      </div>
    </nav>
  );
};

export default DashboardNavbar;