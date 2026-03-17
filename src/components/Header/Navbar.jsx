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

// Navigation Links Configuration
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
      { name: "Our Mission", href: "/ourmission" },
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
            if (sub.roles) {
              return sub.roles.includes(userRole);
            }
            return true;
          });
          return {
            ...link,
            subLinks: filteredSubs.length > 0 ? filteredSubs : null,
          };
        }
        return link;
      })
      .filter((link) => {
        if (link.subLinks === null && link.name === "Forms") return false;
        return true;
      });
  }, [isLoggedIn, userRole]);
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

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle scroll and body scroll lock
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

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    setActiveMobileSub(null);
  };

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-md h-16" : "bg-white h-20"}`}
      >
        <div className="flex justify-between items-center mx-auto px-6 max-w-7xl h-full">
          <div className="shrink-0 scale-90 sm:scale-100">
            <Logo />
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1 h-full">
            {filteredNavLinks.map((link) => {
              const isActive = pathname === link.href;
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
                        {link.subLinks.map((sub) => (
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

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/cart"
              className="relative flex items-center justify-center bg-slate-50 hover:bg-orange-50 border border-slate-100 rounded-full w-10 h-10 text-slate-700 transition-all"
            >
              <ShoppingCart size={18} />
            </Link>

            {isLoggedIn ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`group flex items-center gap-2 p-1 pr-2 border rounded-full transition-all duration-300 ${isProfileOpen ? "bg-white border-orange-500 shadow-lg ring-4 ring-orange-50" : "bg-slate-50 border-slate-100"}`}
                >
                  <div className="relative">
                    <div className="bg-orange-500 rounded-full ring-2 ring-white w-8 h-8 overflow-hidden flex items-center justify-center text-white text-xs font-bold shadow-sm">
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
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div className="hidden md:block text-left leading-none">
                    <p className="font-black text-xs text-slate-800 mb-0.5">
                      {user?.name?.split(" ")[0]}
                    </p>
                    <p className="font-bold text-[9px] text-green-500 uppercase tracking-tighter">
                      Active
                    </p>
                  </div>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 15,
                        scale: 0.95,
                        filter: "blur(8px)",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        y: 15,
                        scale: 0.95,
                        filter: "blur(8px)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                      className="absolute right-0 mt-4 w-64 bg-white border border-slate-100 shadow-2xl rounded-[2rem] p-4 z-[120]"
                    >
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-[1.2rem] mb-3">
                        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-sm">
                          {user?.name?.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-bold text-sm text-slate-800 truncate">
                            {user?.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium truncate">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-1">
                        <li>
                          <Link
                            href="/dashboard"
                            onClick={handleLinkClick}
                            className="flex items-center gap-3 font-bold text-sm text-slate-600 hover:bg-orange-50 rounded-xl px-4 py-3 transition-all"
                          >
                            <LayoutDashboard
                              size={18}
                              className="text-orange-500"
                            />{" "}
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/dashboard/profile"
                            onClick={handleLinkClick}
                            className="flex items-center gap-3 font-bold text-sm text-slate-600 hover:bg-blue-50 rounded-xl px-4 py-3 transition-all"
                          >
                            <User size={18} className="text-blue-500" /> My
                            Profile
                          </Link>
                        </li>
                        <div className="h-px bg-slate-100 my-2 mx-2" />
                        <li>
                          <button
                            onClick={() => {
                              signOut();
                              handleLinkClick();
                            }}
                            className="flex items-center gap-3 font-bold text-sm text-rose-500 hover:bg-rose-50 rounded-xl px-4 py-3 w-full text-left transition-all"
                          >
                            <LogOut size={18} /> Logout
                          </button>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <AuthButtons />
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden bg-slate-900 text-white p-2.5 rounded-xl transition-all active:scale-95"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* --- Mobile Sidebar Section --- */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Sidebar Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9998] lg:hidden"
              />

              {/* Sidebar Drawer */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 w-[85%] max-w-[300px] h-screen bg-white z-[9999] lg:hidden flex flex-col shadow-2xl p-6"
              >
                <div className="flex items-center justify-between mb-8">
                  <Logo />
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 bg-slate-100 rounded-full text-slate-600"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  {filteredNavLinks.map((link) => (
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
                        {link.subLinks && (
                          <button
                            onClick={() =>
                              setActiveMobileSub(
                                activeMobileSub === link.name
                                  ? null
                                  : link.name,
                              )
                            }
                            className={`p-2 rounded-lg transition-all ${activeMobileSub === link.name ? "bg-orange-500 text-white rotate-90" : "bg-slate-50 text-slate-400"}`}
                          >
                            <ChevronRight size={18} />
                          </button>
                        )}
                      </div>
                      <AnimatePresence>
                        {link.subLinks && activeMobileSub === link.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-slate-50 rounded-2xl mb-4"
                          >
                            <div className="p-2 space-y-1">
                              {link.subLinks.map((sub) => (
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
                  ))}
                </div>

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
                    <div onClick={handleLinkClick}>
                      <AuthButtons />
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      <div
        className={`${isScrolled ? "h-16" : "h-20"} transition-all duration-500 lg:block hidden`}
      />
    </>
  );
};

export default Navbar;
