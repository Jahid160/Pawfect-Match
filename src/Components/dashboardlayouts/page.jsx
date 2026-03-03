import Navbar from "../Header/Navbar";
import DashboardSidebar from "./dashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        {/* The Sidebar is fixed, so this div provides the "space" it would have taken */}
        <DashboardSidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 ml-[240px] pt-24 p-8 bg-gray-50 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}