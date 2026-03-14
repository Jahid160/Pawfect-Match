"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Menu,
  ChevronDown,
  X,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingCart,
  ChevronRight,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import AuthButtons from "../button/AuthButtons";
import Logo from "./Logo";
import Image from "next/image";
import { useAuthModal } from "@/provider/AuthModalProvider";

// NavLinks Configuration
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
      {
        name: "Adoption Form",
        href: "/adoptionfrom",
        roles: ["user", "shelter", "admin"],
      },
      {
        name: "Shelter Form",
        href: "/shelterForm",
        roles: ["user", "shelter", "admin"],
      },
      {
        name: "Pet Entry Form",
        href: "/petdetailsform",
        roles: ["shelter", "admin"],
      },
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

  const searchParams = useSearchParams();
  const { openLoginModal } = useAuthModal();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoggedIn = status === "authenticated";

  // ১. URL Trigger for Login Modal
  useEffect(() => {
    const loginTrigger = searchParams.get("loginTrigger");
    if (loginTrigger === "true") {
      openLoginModal();
      const params = new URLSearchParams(searchParams.toString());
      params.delete("loginTrigger");
      const newPath =
        pathname + (params.toString() ? `?${params.toString()}` : "");
      router.replace(newPath);
    }
  }, [searchParams, openLoginModal, router, pathname]);

  // ২. Scroll Event and Body Lock
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);

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
    return navLinks.filter((link) => !link.requiresAuth || isLoggedIn);
  }, [isLoggedIn]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setActiveMobileSub(null);
  };

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <>
      {/* ডেস্কটপ ও মেইন নেভবার */}
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-md h-16"
            : "bg-white h-20"
        }`}
      >
        <div className="flex justify-between items-center mx-auto px-6 max-w-7xl h-full">
          <div className="shrink-0 scale-90 sm:scale-100">
            <Logo />
          </div>

          {/* ডেস্কটপ মেনু আইটেম */}
          <div className="hidden lg:flex items-center gap-1 h-full">
            {filteredNavLinks.map((link) => {
              const isActive = pathname === link.href;
              const visibleSubLinks = link.subLinks?.filter(
                (sub) =>
                  !sub.roles || (user?.role && sub.roles.includes(user.role)),
              );

              return (
                <div
                  key={link.name}
                  className="group relative flex items-center px-3 h-full"
                >
                  {link.subLinks ? (
                    <div className="dropdown dropdown-bottom dropdown-hover">
                      <div
                        tabIndex={0}
                        role="button"
                        className={`flex items-center gap-1 text-sm font-bold hover:text-orange-500 transition-colors ${isActive ? "text-orange-500" : "text-slate-700"}`}
                      >
                        {link.name}{" "}
                        <ChevronDown
                          size={14}
                          className="group-hover:rotate-180 transition-transform"
                        />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-3 shadow-2xl bg-white border border-slate-50 rounded-2xl w-52 z-[110]"
                      >
                        {visibleSubLinks?.map((sub) => (
                          <li key={sub.name}>
                            <Link
                              href={sub.href}
                              className="hover:bg-orange-50 py-2 rounded-xl font-medium hover:text-orange-600"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`relative text-sm font-bold hover:text-orange-500 ${isActive ? "text-orange-500" : "text-slate-700"}`}
                    >
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="activeNav"
                          className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500 rounded-full"
                        />
                      )}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* ইউজার অ্যাকশন বাটনসমূহ */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/cart"
              className="relative flex items-center justify-center bg-slate-50 hover:bg-orange-50 border border-slate-100 rounded-full w-10 h-10 sm:w-11 sm:h-11 text-slate-700 transition-all"
            >
              <ShoppingCart size={18} />
            </Link>

            {isLoggedIn ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="group flex items-center gap-2 bg-slate-50 p-1 pr-2 sm:pr-3 border border-slate-100 rounded-full hover:border-orange-200 transition-all"
                >
                  <div className="bg-orange-500 rounded-full ring-2 ring-white w-8 h-8 overflow-hidden flex items-center justify-center text-white text-[10px] font-bold">
                    {user?.image ? (
                      <Image
                        width={40}
                        height={40}
                        src={user.image}
                        alt="user"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user?.name?.charAt(0)
                    )}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="font-black text-[10px] text-slate-800 leading-none">
                      {user?.name?.split(" ")[0]}
                    </p>
                    <p className="font-bold text-[8px] text-green-500 uppercase tracking-tighter">
                      Online
                    </p>
                  </div>
                  <ChevronDown
                    size={12}
                    className="text-slate-400 group-hover:text-orange-500"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow-2xl bg-white border border-slate-50 rounded-2xl w-52 mt-4 z-[110]"
                >
                  <li className="px-4 py-2 border-b border-slate-50 mb-1">
                    <p className="text-[10px] font-bold text-slate-400 truncate">
                      {user?.email}
                    </p>
                  </li>
                  <li>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 font-bold text-sm text-slate-600 hover:bg-orange-50 rounded-xl py-3"
                    >
                      <LayoutDashboard size={18} className="text-orange-500" />{" "}
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-3 font-bold text-sm text-slate-600 hover:bg-orange-50 rounded-xl py-3"
                    >
                      <Settings size={18} className="text-blue-500" /> Settings
                    </Link>
                  </li>
                  <div className="h-px bg-slate-100 my-1 mx-2" />
                  <li>
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-3 font-bold text-sm text-rose-500 hover:bg-rose-50 rounded-xl py-3 w-full"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="hidden sm:block">
                <AuthButtons />
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden bg-slate-900 text-white p-2.5 rounded-xl hover:bg-orange-500 transition-all shadow-lg"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* --- মোবাইল সাইডবার ড্রয়ার --- */}
        {/* --- মোবাইল সাইডবার ড্রয়ার --- */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* ১. ব্যাকড্রপ - একদম ফিক্সড এবং পুরো স্ক্রিন জুড়ে */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9998] lg:hidden"
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              />

              {/* ২. ড্রয়ার বডি - z-index অনেক বাড়িয়ে দেওয়া হয়েছে */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 w-[85%] max-w-[300px] h-screen bg-white z-[9999] lg:hidden flex flex-col shadow-2xl"
                style={{ position: "fixed", height: "100vh" }}
              >
                {/* মেনুর ভেতরের কন্টেন্ট */}
                <div className="p-6 flex flex-col h-full overflow-hidden">
                  <div className="flex items-center justify-between mb-8">
                    <Logo />
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 bg-slate-100 rounded-full text-slate-600"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* স্ক্রলযোগ্য লিঙ্ক এরিয়া */}
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="space-y-1">
                      {filteredNavLinks.map((link) => {
                        const hasSub = !!link.subLinks;
                        const isOpen = activeMobileSub === link.name;
                        const visibleSubLinks = link.subLinks?.filter(
                          (sub) =>
                            !sub.roles ||
                            (user?.role && sub.roles.includes(user.role)),
                        );

                        return (
                          <div
                            key={link.name}
                            className="border-b border-slate-50 last:border-0"
                          >
                            <div className="flex items-center justify-between py-4">
                              <Link
                                href={link.href}
                                onClick={handleLinkClick}
                                className="font-bold text-slate-700 text-lg hover:text-orange-500 flex-1"
                              >
                                {link.name}
                              </Link>
                              {hasSub && (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setActiveMobileSub(
                                      isOpen ? null : link.name,
                                    );
                                  }}
                                  className={`p-2 rounded-lg transition-all ${isOpen ? "bg-orange-500 text-white rotate-90" : "bg-slate-50 text-slate-400"}`}
                                >
                                  <ChevronRight size={18} />
                                </button>
                              )}
                            </div>

                            <AnimatePresence>
                              {hasSub && isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden bg-slate-50 rounded-2xl mb-4"
                                >
                                  <div className="p-2 space-y-1">
                                    {visibleSubLinks?.map((sub) => (
                                      <Link
                                        key={sub.name}
                                        href={sub.href}
                                        onClick={handleLinkClick}
                                        className="block px-4 py-3 text-sm font-bold text-slate-500 hover:text-orange-600 hover:bg-white rounded-xl"
                                      >
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

                  {/* নিচের ড্যাশবোর্ড বাটন - এটিকে একদম নিচে ফিক্সড করে দেওয়া হয়েছে */}
                  <div className="mt-auto pt-6 border-t border-slate-100">
                    {isLoggedIn ? (
                      <Link
                        href="/dashboard"
                        onClick={handleLinkClick}
                        className="flex items-center justify-center gap-2 bg-orange-500 text-white w-full py-4 rounded-2xl font-black shadow-lg"
                      >
                        <LayoutDashboard size={18} /> Dashboard
                      </Link>
                    ) : (
                      <div
                        className="grid grid-cols-1 gap-3"
                        onClick={handleLinkClick}
                      >
                        <AuthButtons />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* নেভবার স্পেসার */}
      <div
        className={`${isScrolled ? "h-16" : "h-20"} transition-all duration-500 lg:block hidden`}
      />
    </>
  );
};

export default Navbar;
