"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  Check,
  Heart,
  AlertCircle,
  ArrowRight,
  User,
  Package,
  UserPlus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { getAdminNotifications, markNotificationsAsRead } from "@/action/server/notifications";

const DashboardNavbar = ({ isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false); // Hydration fix এর জন্য
  const dropdownRef = useRef(null);
  const { data: session } = useSession();

  // ১. মাউন্ট চেক এবং নোটিফিকেশন ফেচ করা
  useEffect(() => {
    setIsMounted(true); // কম্পোনেন্ট লোড হলে true হবে
    
    const fetchNotifications = async () => {
      const res = await getAdminNotifications();
      if (res.success) {
        setNotifications(res.notifications);
        setUnreadCount(res.unreadCount);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 120000); // ২ মিনিট পর পর চেক
    return () => clearInterval(interval);
  }, []);

  // ২. নোটিফিকেশন ক্লিক এবং মার্ক এজ রিড হ্যান্ডলার
  const handleNotificationClick = async () => {
    setIsOpen(!isOpen);
    if (!isOpen && unreadCount > 0) {
      const res = await markNotificationsAsRead("admin");
      if (res.success) {
        setUnreadCount(0);
      }
    }
  };

  const getIconDetails = (type) => {
    switch (type) {
      case 'adoption':
        return { icon: <Heart size={16} className="text-rose-500" />, bg: "bg-rose-50" };
      case 'order':
        return { icon: <Package size={16} className="text-orange-500" />, bg: "bg-orange-50" };
      case 'user_reg':
        return { icon: <UserPlus size={16} className="text-blue-500" />, bg: "bg-blue-50" };
      case 'alert':
        return { icon: <AlertCircle size={16} className="text-amber-500" />, bg: "bg-amber-50" };
      default:
        return { icon: <Check size={16} className="text-emerald-500" />, bg: "bg-emerald-50" };
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hydration Error প্রতিরোধ করার জন্য
  if (!isMounted) {
    return (
        <nav className="top-0 z-50 sticky flex justify-between items-center bg-white shadow-sm px-6 border-gray-100 border-b w-full h-[70px]">
            <div className="flex items-center gap-4">
                <h1 className="font-black text-slate-800 lg:text-xl italic uppercase tracking-tight">
                    Dashboard <span className="text-orange-500">Overview</span>
                </h1>
            </div>
            <div className="flex items-center gap-5">
                <div className="p-2.5 text-slate-300"><Bell size={22} /></div>
                <div className="bg-slate-100 rounded-2xl w-10 h-10 animate-pulse"></div>
            </div>
        </nav>
    );
  }

  return (
    <nav className="top-0 z-50 sticky flex justify-between items-center bg-white shadow-sm px-6 border-gray-100 border-b w-full h-[70px] transition-all duration-300">
      
      {/* LEFT SIDE: Title */}
      <div className="flex items-center gap-4">
        <h1 className="hover:opacity-80 ml-10 lg:ml-0 font-black text-slate-800 lg:text-xl italic uppercase tracking-tight transition-opacity">
          Dashboard <span className="text-orange-500">Overview</span>
        </h1>
      </div>

      {/* RIGHT SIDE: Notifications & Profile */}
      <div className="flex items-center gap-5">
        
        {/* Notification Container */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={handleNotificationClick}
            className={`relative rounded-2xl p-2.5 transition-all duration-300 ${
              isOpen
                ? "bg-orange-50 text-orange-600 shadow-inner"
                : "hover:bg-slate-50 text-slate-500 shadow-sm border border-slate-100"
            }`}
          >
            <Bell size={22} strokeWidth={2.5} />
            {unreadCount > 0 && (
              <span className="top-2.5 right-2.5 absolute flex justify-center items-center bg-rose-500 border-2 border-white rounded-full w-3.5 h-3.5 font-bold text-[8px] text-white">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="right-0 absolute bg-white shadow-2xl shadow-slate-200 mt-4 border border-slate-100 rounded-[2.5rem] w-80 md:w-96 overflow-hidden origin-top-right"
              >
                <div className="flex justify-between items-center bg-slate-50/50 p-6 border-slate-50 border-b">
                  <h3 className="font-black text-slate-800 text-sm italic uppercase tracking-widest">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <span className="bg-orange-500 px-3 py-1 rounded-full font-black text-[10px] text-white animate-pulse">
                      {unreadCount} NEW
                    </span>
                  )}
                </div>

                <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => {
                      const { icon, bg } = getIconDetails(notif.type);
                      return (
                        <div
                          key={notif._id}
                          className={`relative flex cursor-pointer gap-4 border-b border-slate-50 p-5 transition-colors hover:bg-slate-50 last:border-0 ${!notif.isRead ? "bg-orange-50/20" : ""}`}
                        >
                          <div className={`${bg} flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-sm`}>
                            {icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-black text-slate-800 text-xs uppercase leading-tight tracking-tight">
                                {notif.title || "Update"}
                              </h4>
                              <span className="font-bold text-[9px] text-slate-400 italic uppercase">
                                {notif.time || "Just now"}
                              </span>
                            </div>
                            <p className="font-medium text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                              {notif.message}
                            </p>
                          </div>
                          {!notif.isRead && (
                            <div className="top-1/2 right-3 absolute bg-orange-500 rounded-full w-1.5 h-1.5 -translate-y-1/2"></div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-12 text-center">
                       <p className="font-bold text-[10px] text-slate-400 italic uppercase tracking-[0.2em]">All caught up!</p>
                    </div>
                  )}
                </div>

                <Link
                  href="/admin/notifications"
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center items-center gap-2 bg-slate-50 hover:bg-orange-500 p-5 border-slate-100 border-t font-black text-[10px] text-slate-500 hover:text-white text-center uppercase tracking-[0.2em] transition-all"
                >
                  See all activities <ArrowRight size={14} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Avatar */}
        <div className="flex items-center gap-3 pl-3 border-slate-100 border-l">
          <button className="flex justify-center items-center bg-orange-100 shadow-sm border border-orange-200 rounded-2xl hover:ring-4 hover:ring-orange-50 w-10 h-10 overflow-hidden transition-all">
            {session?.user?.image ? (
              <img src={session.user.image} alt="User Avatar" className="w-full h-full object-cover" />
            ) : (
              <User size={22} strokeWidth={2.5} className="text-orange-600" />
            )}
          </button>

          <div className="hidden md:block">
            <p className="font-black text-slate-800 text-xs uppercase leading-none tracking-tight">
              {session?.user?.name || "Admin"}
            </p>
            <p className="mt-1 font-bold text-[9px] text-slate-400 italic uppercase tracking-tighter">
              {session?.user?.role || "Administrator"}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;