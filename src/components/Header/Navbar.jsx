"use client"

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, ChevronDown, X, LayoutDashboard, LogOut, Settings, ShoppingCart, ChevronRight
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import AuthButtons from "../button/AuthButtons";
import Logo from "./Logo";
import Image from "next/image";

// ১. NavLinks (Optimized Performance)
const navLinks = [
  { name: "Home", href: "/" },
  { name: "All Pets", href: "/all-pets" },
  { name: "Foods", href: "/pet-food" },
  { name: "Vaccination", href: "/vaccination" },
  {
    name: "About",
    href: "/about",
    subLinks: [
      { name: "Experts", href: "/experts" },
      { name: "FAQ", href: "/faq" },
      { name: "Our Mission", href: "/about/mission" },
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
  const [activeMobileSub, setActiveMobileSub] = useState(null);

  const pathname = usePathname();
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoggedIn = status === "authenticated";

  // ২. স্ক্রল এবং বডি লক হ্যান্ডলার
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    
    // মোবাইল মেনু ওপেন হলে পেছনের স্ক্রল বন্ধ রাখা
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const filteredNavLinks = useMemo(() => {
    return navLinks.filter(link => !link.requiresAuth || isLoggedIn);
  }, [isLoggedIn]);

  // ড্যাশবোর্ড পেজে নেভবার হাইড করা
  if (pathname.startsWith("/dashboard")) return null;

  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <>
      {/* মেইন নেভবার - Z-index বাড়িয়ে ৯৯৯ করা হয়েছে */}
      <nav className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md h-16" : "bg-white h-20"
      }`}>
        <div className="flex justify-between items-center mx-auto px-6 max-w-7xl h-full">
          {/* Logo */}
          <div className="shrink-0 scale-90 sm:scale-100">
            <Logo />
          </div>

          {/* ডেস্কটপ মেনু */}
          <div className="hidden lg:flex items-center gap-1 h-full">
            {filteredNavLinks.map((link) => {
              const isActive = pathname === link.href;
              let visibleSubLinks = link.subLinks;
              if (link.name === "Forms" && user?.role) {
                visibleSubLinks = link.subLinks.filter(sub => sub.roles.includes(user.role));
              }

              return (
                <div key={link.name} className="group relative flex items-center px-3 h-full">
                  {link.subLinks ? (
                    <div className="dropdown dropdown-bottom dropdown-hover">
                      <div tabIndex={0} role="button" className={`flex items-center gap-1 text-sm font-bold hover:text-orange-500 transition-colors ${isActive ? "text-orange-500" : "text-slate-700"}`}>
                        {link.name} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                      </div>
                      <ul tabIndex={0} className="dropdown-content menu p-3 shadow-2xl bg-white border border-slate-50 rounded-2xl w-52 z-[1000]">
                        {visibleSubLinks?.map((sub) => (
                          <li key={sub.name}>
                            <Link href={sub.href} className="hover:bg-orange-50 py-2 rounded-xl font-medium hover:text-orange-600 transition-all">
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link href={link.href} className={`relative text-sm font-bold hover:text-orange-500 ${isActive ? "text-orange-500" : "text-slate-700"}`}>
                      {link.name}
                      {isActive && <motion.span layoutId="activeNav" className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500 rounded-full" />}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* রাইট সাইড (Cart & User) */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/cart" className="relative flex items-center justify-center bg-slate-50 hover:bg-orange-50 border border-slate-100 rounded-full w-10 h-10 sm:w-11 sm:h-11 text-slate-700 transition-all">
              <ShoppingCart size={18} />
            </Link>

            {isLoggedIn ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="group flex items-center gap-2 bg-slate-50 p-1 pr-2 sm:pr-3 border border-slate-100 rounded-full hover:border-orange-200 transition-all">
                  <div className="bg-orange-500 rounded-full ring-2 ring-white w-8 h-8 overflow-hidden flex items-center justify-center text-white text-[10px] font-bold">
                    {user?.image ? <Image width={40} height={40} src={user.image} alt="user" className="w-full h-full object-cover" /> : user?.name?.charAt(0)}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="font-black text-[10px] text-slate-800 leading-none">{user?.name?.split(' ')[0]}</p>
                    <p className="font-bold text-[8px] text-green-500 uppercase tracking-tighter">Online</p>
                  </div>
                  <ChevronDown size={12} className="text-slate-400 group-hover:text-orange-500" />
                </div>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl bg-white border border-slate-50 rounded-2xl w-52 mt-4 z-[1000]">
                  <li className="px-4 py-2 border-b border-slate-50 mb-1">
                    <p className="text-[10px] font-bold text-slate-400 truncate">{user?.email}</p>
                  </li>
                  <li><Link href="/dashboard" className="flex items-center gap-3 font-bold text-sm text-slate-600 hover:bg-orange-50 rounded-xl py-3"><LayoutDashboard size={18} className="text-orange-500"/> Dashboard</Link></li>
                  <li><Link href="/dashboard/profile" className="flex items-center gap-3 font-bold text-sm text-slate-600 hover:bg-orange-50 rounded-xl py-3"><Settings size={18} className="text-blue-500"/> Settings</Link></li>
                  <div className="h-px bg-slate-100 my-1 mx-2" />
                  <li><button onClick={() => signOut()} className="flex items-center gap-3 font-bold text-sm text-rose-500 hover:bg-rose-50 rounded-xl py-3 w-full"><LogOut size={18}/> Logout</button></li>
                </ul>
              </div>
            ) : (
              <div className="hidden sm:block"><AuthButtons /></div>
            )}

            {/* মোবাইল মেনু টগল বাটন */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden bg-slate-900 text-white p-2.5 rounded-xl hover:bg-orange-500 transition-all active:scale-95 shadow-lg">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* --- মোবাইল সাইডবার ড্রয়ার --- */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* ব্যাকড্রপ - Z-index ১০০০ */}
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setIsMenuOpen(false)} 
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] lg:hidden" 
              />
              
              {/* ড্রয়ার বডি - Z-index ১০০১ */}
              <motion.div 
                initial={{ x: "-100%" }} 
                animate={{ x: 0 }} 
                exit={{ x: "-100%" }} 
                transition={{ type: "spring", damping: 25, stiffness: 200 }} 
                className="fixed top-0 left-0 w-[85%] max-w-[300px] h-full bg-white z-[1001] lg:hidden flex flex-col shadow-2xl"
              >
                <div className="p-6 flex flex-col h-full">
                  <Logo />
                  
                  <div className="mt-10 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="space-y-1">
                      {filteredNavLinks.map((link) => {
                        const hasSub = !!link.subLinks;
                        const isOpen = activeMobileSub === link.name;

                        return (
                          <div key={link.name} className="border-b border-slate-50 last:border-0">
                            <div className="flex items-center justify-between py-4">
                              <Link href={link.href} onClick={handleLinkClick} className="font-bold text-slate-700 text-lg hover:text-orange-500 transition-colors">
                                {link.name}
                              </Link>
                              {hasSub && (
                                <button 
                                  onClick={() => setActiveMobileSub(isOpen ? null : link.name)} 
                                  className={`p-2 rounded-lg transition-all ${isOpen ? "bg-orange-500 text-white rotate-90" : "bg-slate-50 text-slate-400"}`}
                                >
                                  <ChevronRight size={18} />
                                </button>
                              )}
                            </div>
                            
                            {/* কলাপসিবল সাব-লিঙ্ক এনিমেশন */}
                            <AnimatePresence>
                              {hasSub && isOpen && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }} 
                                  animate={{ height: "auto", opacity: 1 }} 
                                  exit={{ height: 0, opacity: 0 }} 
                                  className="overflow-hidden bg-slate-50 rounded-2xl mb-4 shadow-inner"
                                >
                                  <div className="p-2 space-y-1">
                                    {link.subLinks.filter(sub => !sub.roles || sub.roles.includes(user?.role)).map(sub => (
                                      <Link key={sub.name} href={sub.href} onClick={handleLinkClick} className="block px-4 py-3 text-sm font-bold text-slate-500 hover:text-orange-600 hover:bg-white rounded-xl transition-all">
                                        {sub.name}
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* মোবাইল নিচের বাটন */}
                  <div className="mt-auto pt-6 border-t border-slate-100 space-y-4">
                    {isLoggedIn ? (
                      <Link href="/dashboard" onClick={handleLinkClick} className="btn btn-primary w-full rounded-2xl font-black gap-2 shadow-lg shadow-orange-500/20">
                        <LayoutDashboard size={18} /> Dashboard
                      </Link>
                    ) : (
                      <div className="grid grid-cols-1 gap-3"><AuthButtons /></div>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* স্পেসার - যাতে নেভবার কন্টেন্ট ঢেকে না দেয় */}
      <div className={`${isScrolled ? "h-16" : "h-20"} transition-all duration-500 lg:block hidden`} />
    </>
  );
};

export default Navbar;