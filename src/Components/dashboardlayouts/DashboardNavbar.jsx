"use client";

import Link from "next/link";
import { Bell, User } from "lucide-react";

const DashboardNavbar = () => {
  return (
    <nav className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-3 sticky top-0 z-50">
      
      {/* LEFT SIDE: Logo */}
      <div className="">
        <h1 className="text-xl font-bold lg:ml-1 ml-9 text-orange-500 hover:opacity-80 transition-opacity">
          Dashboard Overview
        </h1>
      </div>

      {/* RIGHT SIDE: Notifications & Profile */}
      <div className="flex items-center gap-5">
        
        {/* Notification Icon */}
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={22} />
          {/* Red Dot Indicator */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Profile Avatar */}
        <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
          <button className="flex items-center justify-center w-10 h-10 bg-orange-100 text-orange-600 rounded-full hover:ring-2 hover:ring-orange-300 transition-all">
            <User size={24} />
          </button>
          
          {/* Optional: User Info (Hidden on mobile) */}
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-700 leading-none">John Doe</p>
            <p className="text-xs text-gray-500 mt-1">Admin</p>
          </div>
        </div>
        
      </div>
    </nav>
  );
};

export default DashboardNavbar;