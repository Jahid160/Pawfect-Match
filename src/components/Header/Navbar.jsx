"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  ChevronDown,
  X,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import AuthButtons from "../button/AuthButtons";
import Logo from "./Logo";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();
  const { data: session, status } = useSession();

  const user = session?.user; // ✅ this is your real user
  const isLoggedIn = status === "authenticated";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Hide navbar inside dashboard pages (your logic)
  if (pathname.startsWith("/dashboard")) return null;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Pets", href: "/all-pets" },
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
      subLinks: [
        { name: "Adoption Form", href: "/adoptionfrom" },
        { name: "Shelter Application", href: "/shelterForm" },
        { name: "Pet Details", href: "/petdetailsform" },
      ],
    },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm h-16"
          : "bg-white h-20"
      }`}
    >
      <div className="flex justify-between items-center mx-auto px-6 max-w-7xl h-full">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Center Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-1 h-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <div
                key={link.name}
                className="group relative flex items-center px-3 h-full"
              >
                {link.subLinks ? (
                  <div className="dropdown-bottom dropdown dropdown-hover">
                    <div
                      tabIndex={0}
                      role="button"
                      className={`flex items-center gap-1 text-sm font-bold transition-all duration-300 hover:text-orange-500 ${
                        isActive ? "text-orange-500" : "text-slate-700"
                      }`}
                    >
                      {link.name}
                      <ChevronDown
                        size={14}
                        className="group-hover:rotate-180 transition-transform duration-300"
                      />
                    </div>

                    <ul
                      tabIndex={0}
                      className="z-[1] bg-white slide-in-from-top-2 shadow-xl p-3 border border-slate-50 rounded-2xl w-52 animate-in dropdown-content menu fade-in"
                    >
                      {link.subLinks.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            href={sub.href}
                            className="hover:bg-orange-50 py-2 rounded-xl font-medium hover:text-orange-600 transition-colors"
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
                    className={`relative text-sm font-bold transition-all duration-300 hover:text-orange-500 ${
                      isActive ? "text-orange-500" : "text-slate-700"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="-bottom-1 left-0 absolute bg-orange-500 rounded-full w-full h-[2px]" />
                    )}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="group flex items-center gap-2 bg-slate-50 hover:bg-orange-50 p-1.5 pr-3 border border-slate-100 rounded-full transition-all duration-300"
              >
                <div className="flex justify-center items-center bg-orange-500 shadow-sm rounded-full ring-2 ring-white w-8 h-8 overflow-hidden font-bold text-white text-xs">
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt="user"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{user?.name?.charAt(0) || "U"}</span>
                  )}
                </div>

                <div className="hidden sm:block text-left">
                  <p className="font-black text-[11px] text-slate-800 leading-none">
                    {user?.name || "User"}
                  </p>
                  <p className="font-bold text-[9px] text-slate-400 uppercase tracking-tighter">
                    Logged In
                  </p>
                </div>

                <ChevronDown
                  size={14}
                  className="text-slate-400 group-hover:text-orange-500 transition-transform"
                />
              </div>

              <ul
                tabIndex={0}
                className="z-[1] bg-white shadow-2xl mt-4 p-2 border border-slate-50 rounded-[1.5rem] w-56 animate-in dropdown-content menu fade-in zoom-in-95"
              >
                <div className="mb-1 px-4 py-3 border-slate-50 border-b">
                  <p className="font-black text-slate-800 text-xs">Account</p>
                  <p className="text-[10px] text-slate-400">{user?.email}</p>
                </div>

                {/* ✅ Dashboard shows only when logged in */}
                <li>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 hover:bg-orange-50 py-3 rounded-xl font-bold text-slate-600 text-sm"
                  >
                    <LayoutDashboard size={18} className="text-orange-500" />{" "}
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-3 hover:bg-orange-50 py-3 rounded-xl font-bold text-slate-600 text-sm"
                  >
                    <Settings size={18} className="text-blue-500" /> Settings
                  </Link>
                </li>

                <div className="bg-slate-50 mx-2 my-1 h-[1px]"></div>

                <li>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left flex items-center gap-3 hover:bg-rose-50 py-3 rounded-xl font-bold text-rose-500 text-sm transition-colors"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <AuthButtons />
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden bg-slate-50 hover:bg-orange-500 shadow-sm p-2 rounded-xl text-slate-700 hover:text-white transition-all"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[110] lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 w-[80%] max-w-sm h-full bg-white z-[120] lg:hidden transition-transform duration-500 ease-out shadow-2xl ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <Logo />
          <div className="space-y-4 mt-10">
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  href={link.href}
                  className="block py-2 font-black text-slate-800 hover:text-orange-500 text-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>

          {/* ✅ Mobile dashboard link when logged in */}
          {isLoggedIn && (
            <div className="mt-6 pt-6 border-slate-100 border-t">
              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="btn btn-primary w-full"
              >
                Dashboard
              </Link>
            </div>
          )}

          {!isLoggedIn && (
            <div className="mt-10 pt-6 border-slate-100 border-t">
              <AuthButtons />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
