"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { 
  User, 
  Settings, 
  PawPrint, 
  Stethoscope, 
  Syringe, 
  FileText, 
  BarChart3, 
  ClipboardCheck,
  LayoutDashboard
} from "lucide-react"; 
import { FaUserGroup } from "react-icons/fa6";
import { BsHouseAddFill } from "react-icons/bs";

const DashboardSidebar = () => {
  const pathname = usePathname();

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

  // Helper to apply active styles
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
    <aside className="w-[240px]  border-r border-gray-100 text-black h-screen pt-20 pb-6 px-4 fixed top-0 left-0 z-[90] flex flex-col">
      
      {/* 1. TOP SECTION */}
      <div className="flex flex-col gap-1 flex-grow">
        
        {/* Clickable Dashboard Link - Styled like the others */}
        <Link href="/dashboard" className={`${getLinkStyle("/dashboard")} mb-4`}>
          <LayoutDashboard className={getIconStyle("/dashboard")} />
          <span className="text-sm uppercase tracking-wider font-semibold">Dashboard</span>
        </Link>

        <nav className="flex flex-col gap-1">
          {mainNavItems.map((item) => (
            <Link key={item.href} href={item.href} className={getLinkStyle(item.href)}>
              <item.icon className={getIconStyle(item.href)} />
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* 2. BOTTOM SECTION */}
      <div className="flex flex-col gap-1 border-t border-orange-300 pt-4">
        {bottomNavItems.map((item) => (
          <Link key={item.href} href={item.href} className={getLinkStyle(item.href)}>
            <item.icon className={getIconStyle(item.href)} />
            <span className="text-sm">{item.name}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default DashboardSidebar;