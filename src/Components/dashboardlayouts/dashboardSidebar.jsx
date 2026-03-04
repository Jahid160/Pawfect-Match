"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  User, Settings, PawPrint, Stethoscope, Syringe, 
  FileText, BarChart3, ClipboardCheck, LayoutDashboard,
  Menu, X 
} from "lucide-react"; 
import { FaUserGroup } from "react-icons/fa6";
import { BsHouseAddFill } from "react-icons/bs";
import Logo from "../Header/Logo";
// Import your Logo component
// import Logo from "./Logo"; 

const DashboardSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const mainNavItems = [
    { name: "User Management", href: "/dashboard/users", icon: FaUserGroup },
    { name: "Shelter Management", href: "/dashboard/shelters", icon: BsHouseAddFill },
    { name: "Doctors Profiles", href: "/dashboard/doctors", icon: Stethoscope },
    { name: "Vaccination Management", href: "/dashboard/vaccinations", icon: Syringe },
    { name: "Pet Records", href: "/dashboard/pet-records", icon: FileText },
    { name: "Service Request", href: "/dashboard/requests", icon: ClipboardCheck },
    { name: "Report & Analysis", href: "/dashboard/reports", icon: BarChart3 },
    { name: "Manage Pets", href: "/dashboard/manage-pets", icon: PawPrint },
  ];

  const bottomNavItems = [
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const getLinkStyle = (path) => {
    const isActive = pathname === path;
    return `flex items-center gap-3 px-3 py-2 rounded-lg transition-all font-medium group ${
      isActive 
        ? "bg-orange-50 text-orange-600 shadow-sm" 
        : "hover:bg-orange-50 hover:text-orange-600 text-gray-700"
    }`;
  };

  const getIconStyle = (path) => {
    const isActive = pathname === path;
    return `w-5 h-5 ${isActive ? "text-orange-600" : "text-gray-600 group-hover:text-orange-600"}`;
  };

  return (
    <>
      {/* --- MOBILE HAMBURGER BUTTON --- */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden top-4 left-4 z-[100] fixed bg-orange-400 shadow-lg p-2 rounded-md text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* --- MOBILE OVERLAY --- */}
      {isOpen && (
        <div 
          className="lg:hidden z-[80] fixed inset-0 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed top-0 left-0 h-screen bg-orange-200 border-r border-gray-100 text-black 
        pb-6 px-4 z-[90] flex flex-col transition-transform duration-300 ease-in-out
        w-[240px]
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        
        {/* --- LOGO SECTION --- */}
        <div className="mb-2 py-6 border-orange-300/50 border-b">
        <Logo />
          
        </div>

        {/* TOP SECTION / NAV ITEMS */}
        <div className="flex flex-col flex-grow gap-1 pt-4 overflow-y-auto scrollbar-hide">
          <Link 
            href="/dashboard" 
            onClick={() => setIsOpen(false)}
            className={`${getLinkStyle("/dashboard")} mb-4`}
          >
            <LayoutDashboard className={getIconStyle("/dashboard")} />
            <span className="font-bold text-sm uppercase tracking-wider">Dashboard</span>
          </Link>

          <nav className="flex flex-col gap-1">
            {mainNavItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className={getLinkStyle(item.href)}
              >
                <item.icon className={getIconStyle(item.href)} />
                <span className="text-sm">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col gap-1 mt-4 pt-4 border-orange-300 border-t">
          {bottomNavItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              onClick={() => setIsOpen(false)}
              className={getLinkStyle(item.href)}
            >
              <item.icon className={getIconStyle(item.href)} />
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;