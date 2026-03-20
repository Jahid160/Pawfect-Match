"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Menu,
  ChevronDown,
  X,
  LayoutDashboard,
  LogOut,
  User,
  ShoppingCart,
  ChevronRight,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import AuthButtons from "../button/AuthButtons";
import Logo from "./Logo";
import Image from "next/image";
import { useAuthModal } from "@/provider/AuthModalProvider";
import { useCartStore } from "@/lib/useCartStore";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Pets", href: "/all-pets" },
  { name: "Foods", href: "/pet-food" },
  { name: "Accessories", href: "/pet-accessories" },
  { name: "Vaccination", href: "/vaccination" },
  {
    name: "About",
    href: "/about",
    subLinks: [
      { name: "Experts", href: "/experts" },
      { name: "FAQ", href: "/faq" },
      { name: "Our Mission", href: "/ourmission" },
      { name: "Team", href: "/about/team" },
    ],
  },
  {
    name: "Forms",
    href: "/forms",
    requiresAuth: true,
    subLinks: [
      { name: "Adoption Form", href: "/adoptionfrom", roles: ["user", "shelter", "admin"] },
      { name: "Shelter Form", href: "/shelterForm", roles: ["user", "shelter", "admin"] },
      { name: "Pet Entry Form", href: "/petdetailsform", roles: ["shelter", "admin"] },
      { name: "Foods Form", href: "/addFoodForms", roles: ["admin"] },
      { name: "Accessories Form", href: "/addAccessoryForm", roles: ["admin"] },
      { name: "Vaccination Form", href: "/vaccination/add", roles: ["admin"] },
    ],
  },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeMobileSub, setActiveMobileSub] = useState(null);
  const profileRef = useRef(null);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoggedIn = status === "authenticated";
  const searchParams = useSearchParams();
  const router = useRouter();
  const { openLoginModal } = useAuthModal();
  const userRole = user?.role;

  // Zustand থেকে কার্ট কাউন্ট নিয়ে আসা
  const cartCount = useCartStore((state) => state.cartCount);

  // Filter Nav Links
  const filteredNavLinks = useMemo(() => {
    return navLinks
      .filter((link) => {
        if (!link.requiresAuth) return true;
        if (!isLoggedIn) return false;
        if (link.roles && !link.roles.includes(userRole)) return false;
        return true;
      })
      .map((link) => {
        if (link.subLinks) {
          const filteredSubs = link.subLinks.filter((sub) => {
            if (sub.roles) return sub.roles.includes(userRole);
            return true;
          });
          return {
            ...link,
            subLinks: filteredSubs.length > 0 ? filteredSubs : null,
          };
        }
        return link;
      })
      .filter((link) => !(link.subLinks === null && link.name === "Forms"));
  }, [isLoggedIn, userRole]);

  // Effects
  useEffect(() => {
    const loginTrigger = searchParams.get("loginTrigger");
    if (loginTrigger === "true") {
      openLoginModal();
      const params = new URLSearchParams(searchParams.toString());
      params.delete("loginTrigger");
      router.replace(pathname + (params.toString() ? `?${params.toString()}` : ""));
    }
  }, [searchParams, openLoginModal, router, pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    setActiveMobileSub(null);
  };

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-md h-16" : "bg-white h-20"}`}>
        <div className="flex justify-between items-center mx-auto px-6 max-w-7xl h-full">
          <div className="scale-90 sm:scale-100 shrink-0">
            <Logo />
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1 h-full">
            {filteredNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div key={link.name} className="group relative flex items-center px-3 h-full">
                  {link.subLinks ? (
                    <div className="dropdown-bottom dropdown dropdown-hover">
                      <div tabIndex={0} role="button" className={`flex items-center gap-1 text-sm font-bold hover:text-orange-500 transition-colors ${isActive ? "text-orange-500" : "text-slate-700"}`}>
                        {link.name} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                      </div>
                      <ul tabIndex={0} className="z-[110] bg-white shadow-2xl p-3 border border-slate-50 rounded-2xl w-52 dropdown-content menu">
                        {link.subLinks.map((sub) => (
                          <li key={sub.name}>
                            <Link href={sub.href} className="hover:bg-orange-50 py-2 rounded-xl font-medium hover:text-orange-600">{sub.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link href={link.href} className={`relative text-sm font-bold hover:text-orange-500 ${isActive ? "text-orange-500" : "text-slate-700"}`}>
                      {link.name}
                      {isActive && <motion.span layoutId="activeNav" className="-bottom-1 left-0 absolute bg-orange-500 rounded-full w-full h-0.5" />}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* --- Cart Icon with Animated Badge --- */}
            <Link href="/cart" className="relative flex justify-center items-center bg-slate-50 hover:bg-orange-50 border border-slate-100 rounded-full w-10 h-10 text-slate-700 transition-all">
              <ShoppingCart size={18} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount} // সংখ্যা বদলালে এনিমেশন ট্রিগার হবে
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="top-0 -right-1 absolute flex justify-center items-center bg-orange-500 px-1 border-2 border-white rounded-full min-w-[18px] h-[18px] font-black text-[10px] text-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {isLoggedIn ? (
              <div className="relative" ref={profileRef}>
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className={`group flex items-center gap-2 p-1 pr-2 border rounded-full transition-all duration-300 ${isProfileOpen ? "bg-white border-orange-500 shadow-lg ring-4 ring-orange-50" : "bg-slate-50 border-slate-100"}`}>
                  <div className="relative">
                    <div className="flex justify-center items-center bg-orange-500 shadow-sm rounded-full ring-2 ring-white w-8 h-8 overflow-hidden font-bold text-white text-xs">
                      {user?.image ? <Image width={40} height={40} src={user.image} alt="user" className="w-full h-full object-cover" /> : user?.name?.charAt(0)}
                    </div>
                    <span className="right-0 bottom-0 absolute bg-green-500 border-2 border-white rounded-full w-2.5 h-2.5"></span>
                  </div>
                  <div className="hidden md:block text-left leading-none">
                    <p className="mb-0.5 font-black text-slate-800 text-xs">{user?.name?.split(" ")[0]}</p>
                    <p className="font-bold text-[9px] text-green-500 uppercase tracking-tighter">Active</p>
                  </div>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div initial={{ opacity: 0, y: 15, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.95 }} className="right-0 z-[120] absolute bg-white shadow-2xl mt-4 p-4 border border-slate-100 rounded-[2rem] w-64">
                      <div className="flex items-center gap-3 bg-slate-50 mb-3 p-3 rounded-[1.2rem]">
                        <div className="flex justify-center items-center bg-orange-500 shadow-sm border-2 border-white rounded-full w-10 h-10 font-bold text-white text-sm">
                           {user?.name?.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-bold text-slate-800 text-sm truncate">{user?.name}</p>
                          <p className="font-medium text-[10px] text-slate-400 truncate">{user?.email}</p>
                        </div>
                      </div>
                      <ul className="space-y-1">
                        <li><Link href="/dashboard" onClick={handleLinkClick} className="flex items-center gap-3 hover:bg-orange-50 px-4 py-3 rounded-xl font-bold text-slate-600 text-sm transition-all"><LayoutDashboard size={18} className="text-orange-500" /> Dashboard</Link></li>
                        <li><Link href="/dashboard/profile" onClick={handleLinkClick} className="flex items-center gap-3 hover:bg-blue-50 px-4 py-3 rounded-xl font-bold text-slate-600 text-sm transition-all"><User size={18} className="text-blue-500" /> My Profile</Link></li>
                        <div className="bg-slate-100 mx-2 my-2 h-px" />
                        <li><button onClick={() => { signOut(); handleLinkClick(); }} className="flex items-center gap-3 hover:bg-rose-50 px-4 py-3 rounded-xl w-full font-bold text-rose-500 text-sm text-left transition-all"><LogOut size={18} /> Logout</button></li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <AuthButtons />
            )}

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden bg-slate-900 p-2.5 rounded-xl text-white active:scale-95 transition-all">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* --- Mobile Sidebar --- */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="lg:hidden z-[9998] fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
              <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="lg:hidden top-0 left-0 z-[9999] fixed flex flex-col bg-white shadow-2xl p-6 w-[85%] max-w-[300px] h-screen">
                <div className="flex justify-between items-center mb-8">
                  <Logo />
                  <button onClick={() => setIsMenuOpen(false)} className="bg-slate-100 p-2 rounded-full text-slate-600"><X size={20} /></button>
                </div>
                
                <div className="flex-1 pr-2 overflow-y-auto custom-scrollbar">
                  {filteredNavLinks.map((link) => (
                    <div key={link.name} className="border-slate-50 last:border-0 border-b">
                      <div className="flex justify-between items-center py-4">
                        <Link href={link.href} onClick={handleLinkClick} className={`flex-1 font-bold text-lg ${pathname === link.href ? "text-orange-500" : "text-slate-700"}`}>{link.name}</Link>
                        {link.subLinks && (
                          <button onClick={() => setActiveMobileSub(activeMobileSub === link.name ? null : link.name)} className={`p-2 rounded-lg transition-all ${activeMobileSub === link.name ? "bg-orange-500 text-white rotate-90" : "bg-slate-50 text-slate-400"}`}>
                            <ChevronRight size={18} />
                          </button>
                        )}
                      </div>
                      <AnimatePresence>
                        {link.subLinks && activeMobileSub === link.name && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-slate-50 mb-4 rounded-2xl overflow-hidden">
                            <div className="space-y-1 p-2">
                              {link.subLinks.map((sub) => (
                                <Link key={sub.name} href={sub.href} onClick={handleLinkClick} className="block hover:bg-white px-4 py-3 rounded-xl font-bold text-slate-500 hover:text-orange-600 text-sm">{sub.name}</Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mt-auto pt-6 border-slate-100 border-t">
                   {/* Mobile Cart Option */}
                   <Link href="/cart" onClick={handleLinkClick} className="flex justify-between items-center bg-slate-50 px-5 py-4 rounded-2xl font-bold text-slate-700">
                      <div className="flex items-center gap-3">
                        <ShoppingCart size={20} className="text-orange-500" />
                        <span>My Cart</span>
                      </div>
                      {cartCount > 0 && <span className="bg-orange-500 px-2.5 py-0.5 rounded-full text-white text-xs">{cartCount}</span>}
                   </Link>

                  {isLoggedIn ? (
                    <Link href="/dashboard" onClick={handleLinkClick} className="flex justify-center items-center gap-2 bg-orange-500 shadow-lg py-4 rounded-2xl w-full font-black text-white">
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                  ) : (
                    <div onClick={handleLinkClick} className="w-full"><AuthButtons /></div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      <div className={`${isScrolled ? "h-16" : "h-20"} transition-all duration-500 lg:block hidden`} />
    </>
  );
};

export default Navbar;