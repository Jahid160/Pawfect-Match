"use client";
import Link from "next/link";
import React from "react";
import { User, Settings, PawPrint } from "lucide-react"; // Nice icons for dashboard

const DashboardSidebar = () => {
  return (
    <aside className="w-[240px] bg-white border-r border-gray-100 text-black h-screen pt-20 pb-4 px-4 fixed top-0 left-0 z-[90]">
      {/* Note: pt-20 (padding-top) ensures content starts below the 
         Navbar which is h-20 (or h-16 when scrolled). 
      */}
      
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
          Menu
        </p>
        
        <Link 
          href={"/dashboard/profile"}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors font-medium"
        >
          <User className="w-5 h-5" />
          Profile
        </Link>

        <Link 
          href={"/dashboard/manage-pets"}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors font-medium"
        >
          <PawPrint className="w-5 h-5" />
          Manage Pets
        </Link>
        
        <Link 
          href={"/dashboard/settings"}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors font-medium"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;