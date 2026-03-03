import DashboardNavbar from "@/Components/dashboardlayouts/DashboardNavbar";
import DashboardSidebar from "@/components/dashboardlayouts/dashboardSidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. The Top Navbar */}
      {/* - Added lg:pl-[240px] to match your Sidebar width.
          - On mobile (default), it is 100% width (pl-0).
      */}
      <div className="fixed top-0 right-0 left-0 z-40 lg:pl-[240px] bg-white border-b border-gray-200">
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
        <main className="flex-1 w-full lg:ml-[160px] pt-[20px] p-4 md:p-6 transition-all duration-300">
          <div className=" mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default layout;