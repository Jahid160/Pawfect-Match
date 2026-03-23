"use client";

import React, { useState } from "react";
import Link from "next/navigation";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import NextLink from "next/link";

import {
  User,
  Settings,
  PawPrint,
  Stethoscope,
  Syringe,
  FileText,
  BarChart3,
  ClipboardCheck,
  LayoutDashboard,
  Menu,
  X,
  Bone,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  HeartPlus,
  BoneIcon,
  ShoppingBagIcon,
} from "lucide-react";

import { FaUserGroup } from "react-icons/fa6";
import { BsHouseAddFill } from "react-icons/bs";

import Logo from "../Header/Logo";

const DashboardSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role;

  const [isOpen, setIsOpen] = useState(false);

  /* ---------------- NAV ITEMS ---------------- */
  const adminNavItem = [
    { name: "User Management", href: "/dashboard/users", icon: FaUserGroup },
    {
      name: "Shelter Management",
      href: "/dashboard/shelters",
      icon: BsHouseAddFill,
    },
    { name: "Doctors Management", href: "/dashboard/doctors", icon: Stethoscope },
    {
      name: "Vaccination Management",
      href: "/dashboard/vaccinations",
      icon: Syringe,
    },
    { name: "Food Management", href: "/dashboard/food", icon: Bone },
    {
      name: "Accessories Management",
      href: "/dashboard/accessories-management",
      icon: ShoppingBag,
    },
    { name: "Manage Pets", href: "/dashboard/manage-pets", icon: PawPrint },
    {
      name: "Pet Request", href: "/dashboard/pet-request", icon: PawPrint
    }
  ];

  const userNavItem = [
    {
      name: "Adoption Requests",
      href: "/dashboard/adoption-requests",
      icon: PawPrint,
    },
    { name: "Favorite Pets", href: "/dashboard/favorites", icon: HeartPlus },
    { name: "My Pets", href: "/dashboard/my-pets", icon: PawPrint },
    { name: "Pet Foods & Accessories", href: "/dashboard/pet-food&accessories", icon: ShoppingBagIcon },
    // { name: "Accessories", href: "/dashboard/accessories", icon: ShoppingBagIcon },
  ];

  const doctorNavItem = [
    {
      name: "Appointments",
      href: "/dashboard/appointments",
      icon: ClipboardCheck,
    },
    { name: "Vaccinations", href: "/dashboard/vaccinations", icon: Syringe },
    {
      name: "Pet Medical Records",
      href: "/dashboard/pet-records",
      icon: FileText,
    },
  ];

  const shelterNavItem = [
    {
      name: "Entry Requests",
      href: "/dashboard/shelter-petsreq",
      icon: ClipboardCheck,
    },
    {
      name: "Entry List",
      href: "/dashboard/shelter-pets",
      icon: BarChart3
    },
  ];

  let navItems =
    role === "admin"
      ? adminNavItem
      : role === "doctor"
        ? doctorNavItem
        : role === "shelter"
          ? shelterNavItem
          : userNavItem;

  const bottomNavItems = [
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  /* ---------------- STYLE HELPERS ---------------- */
  const getLinkStyle = (path) => {
    const isActive = pathname === path;
    return `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold group mb-1 ${isActive
      ? "bg-orange-500 text-white shadow-md shadow-orange-200"
      : "hover:bg-orange-100 text-slate-600"
      } ${isCollapsed ? "justify-center px-2" : ""}`;
  };

  return (
    <>
      {/* MOBILE HAMBURGER */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden top-4 left-4 z-[100] fixed bg-orange-500 shadow-lg p-2 rounded-lg text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="lg:hidden z-[80] fixed inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed left-0 top-0 z-[90] flex h-screen flex-col border-r border-orange-100 bg-orange-50 pb-6 text-black transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isCollapsed ? "lg:w-[80px]" : "lg:w-[240px]"}
          w-[260px]
        `}
      >
        {/* COLLAPSE TOGGLE BUTTON */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden top-10 -right-3 z-[100] absolute lg:flex bg-white hover:bg-orange-500 shadow-sm p-1 border border-orange-200 rounded-full text-orange-600 hover:text-white transition-all"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* LOGO AREA */}
        <div
          className={`mb-4 flex items-center border-b border-orange-200 py-8 ${isCollapsed ? "justify-center" : "px-4"}`}
        >
          {isCollapsed ? (
            <PawPrint className="text-orange-500" size={32} />
          ) : (
            <Logo />
          )}
        </div>

        {/* NAV CONTENT */}
        <div className="flex flex-col flex-grow gap-1 pt-4 overflow-y-auto no-scrollbar scrollbar-hide">
          <NextLink href="/dashboard" className={getLinkStyle("/dashboard")}>
            <LayoutDashboard
              size={20}
              className={
                pathname === "/dashboard" ? "text-white" : "text-orange-500"
              }
            />
            {!isCollapsed && (
              <span className="text-sm uppercase tracking-wider">
                Dashboard
              </span>
            )}
          </NextLink>

          <div className="my-4 px-2">
            {!isCollapsed && (
              <p className="mb-4 px-2 font-black text-[10px] text-slate-400 uppercase tracking-[0.2em]">
                Main Menu
              </p>
            )}
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <NextLink
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={getLinkStyle(item.href)}
                  title={isCollapsed ? item.name : ""}
                >
                  <item.icon
                    size={20}
                    className={
                      pathname === item.href ? "text-white" : "text-orange-500"
                    }
                  />
                  {!isCollapsed && <span className="text-sm">{item.name}</span>}
                </NextLink>
              ))}
            </nav>
          </div>
        </div>

        {/* BOTTOM NAV */}
        <div className="flex flex-col gap-1 mt-auto pt-4 border-orange-200 border-t">
          {bottomNavItems.map((item) => (
            <NextLink
              key={item.href}
              href={item.href}
              className={getLinkStyle(item.href)}
              title={isCollapsed ? item.name : ""}
            >
              <item.icon
                size={20}
                className={
                  pathname === item.href ? "text-white" : "text-orange-500"
                }
              />
              {!isCollapsed && <span className="text-sm">{item.name}</span>}
            </NextLink>
          ))}
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
