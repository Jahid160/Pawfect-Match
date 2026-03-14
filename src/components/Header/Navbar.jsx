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
  ShoppingCart,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import AuthButtons from "../button/AuthButtons";
import Logo from "./Logo";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();
  const { data: session, status } = useSession();

  const user = session?.user;
  const isLoggedIn = status === "authenticated";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Hide navbar inside dashboard pages (your logic)
  if (pathname.startsWith("/dashboard")) return null;

  // NavLinks definition
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
      requiresAuth: true, // Login required to see this link
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
        {
          name: "Accessories Form",
          href: "/addAccessoryForm",
          roles: ["admin"],
        },
        {
          name: "Vaccination Form",
          href: "/vaccination/add",
          roles: ["admin"],
        },
      ],
    },
    { name: "Contact", href: "/contact" },
  ];

  // Logic to filter links based on user session and roles
  const filteredNavLinks = navLinks.filter((link) => {
    // 1. Jodi login na thake ebong link-ti auth dorkar hoy, tobe dekhabe na
    if (link.requiresAuth && !isLoggedIn) return false;
    return true;
  });

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-100 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm h-16"
          : "bg-white h-20"
      }`}
    >
      <div className="flex justify-between items-center mx-auto px-6 max-w-7xl h-full">
        {/* Logo */}
        <div className="shrink-0">
          <Logo />
        </div>

        {/* Center Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-1 h-full">
          {navLinks.map((link) => {
            // 1. Logic: Login chara 'Forms' dropdown hide kora
            if (link.requiresAuth && !isLoggedIn) return null;

            const isActive = pathname === link.href;

            // 2. Logic: Role onujayi sub-links filter kora
            let visibleSubLinks = link.subLinks;
            if (link.name === "Forms" && user?.role) {
              visibleSubLinks = link.subLinks.filter((sub) =>
                sub.roles.includes(user.role),
              );
            }

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
                      className="z-1 bg-white slide-in-from-top-2 shadow-xl p-3 border border-slate-50 rounded-2xl w-52 animate-in dropdown-content menu fade-in"
                    >
                      {/* visibleSubLinks map kora hoyeche */}
                      {visibleSubLinks?.map((sub) => (
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
                      <span className="-bottom-1 left-0 absolute bg-orange-500 rounded-full w-full h-0.5" />
                    )}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative flex items-center justify-center bg-slate-50 hover:bg-orange-50 border border-slate-100 rounded-full w-11 h-11 text-slate-700 hover:text-orange-500 transition-all duration-300"
          >
            <ShoppingCart size={20} />
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
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-110 lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 w-[80%] max-w-sm h-full bg-white z-120 lg:hidden transition-transform duration-500 ease-out shadow-2xl ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <Logo />
          <div className="space-y-4 mt-10">
            {navLinks.map((link) => {
              // 1. Logic: Login chara 'Forms' link hide kora
              if (link.requiresAuth && !isLoggedIn) return null;

              // 2. Logic: Jodi kono link-er subLinks thake (jemon Forms),
              // kintu user role onujayi kono sublink-er permission na thake, tobe main link-o dekhabo na.
              // (Forms-er khetre role 'user' holeo at least 2ta link thakbe, tai eti true hobe)
              const hasAccess =
                !link.subLinks ||
                link.subLinks.some(
                  (sub) => !sub.roles || sub.roles.includes(user?.role),
                );

              if (!hasAccess) return null;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block font-semibold text-slate-700 hover:text-orange-500 text-lg transition-colors"
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile dashboard link when logged in */}
          {isLoggedIn && (
            <div className="mt-6 pt-6 border-slate-100 border-t">
              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="w-full btn btn-primary"
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
