
import DashboardNavbar from "@/components/dashboardlayouts/DashboardNavbar";
import DashboardSidebar from "@/components/dashboardlayouts/dashboardSidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. The Top Navbar */}
      {/* - Added lg:pl-[240px] to match your Sidebar width.
          - On mobile (default), it is 100% width (pl-0).
      */}
      <div className="top-0 right-0 left-0 z-40 fixed bg-white lg:pl-[240px] border-gray-200 border-b">
        <DashboardNavbar />
      </div>

      <div className="flex">
        {/* 2. The Sidebar */}
        <DashboardSidebar />

        {/* 3. Main Content Area */}
        {/* - lg:ml-[240px]: Push content right only on desktop.
            - pt-[80px]: Space for the fixed navbar (adjust based on navbar height).
            - w-full: Ensure it takes full width on mobile.
        */}
        <main className="flex-1 lg:ml-[160px] p-4 md:p-6 pt-[20px] w-full transition-all duration-300">
          <div className="mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default layout;