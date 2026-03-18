"use client";

import DashboardNavbar from "@/Components/dashboardlayouts/DashboardNavbar";
import DashboardSidebar from "@/Components/dashboardlayouts/dashboardSidebar";
import React, { useState } from "react";

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarWidth = isCollapsed ? "lg:pl-[80px]" : "lg:pl-[240px]";
  const contentMargin = isCollapsed ? "lg:ml-[80px]" : "lg:ml-[240px]";

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      {/* 1. The Top Navbar */}
      <div 
        className={`fixed top-0 right-0 left-0 z-40 bg-white border-b border-gray-200 transition-all duration-300 ${sidebarWidth}`}
      >
        <DashboardNavbar isCollapsed={isCollapsed} />
      </div>

      <div className="flex">
        {/* 2. The Sidebar */}
        <DashboardSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        
        {/* 3. Main Content Area */}
        <main 
          className={`flex-1 ${contentMargin} p-4 md:p-6 pt-[80px] w-full transition-all duration-300 ease-in-out`}
        >
          <div className="mx-auto max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;