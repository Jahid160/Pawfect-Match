"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Pets & Supplies", href: "/pets" },
    { name: "About Us", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "Adoption Guidelines", href: "/guidelines" },
    { name: "Add Listing", href: "/add-listing" },
    { name: "My Listing", href: "/my-listing" },
    { name: "My Orders", href: "/orders" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3">

        {/* ================= TOP BAR ================= */}
        <div className="grid grid-cols-3 items-center lg:grid-cols-[1fr_auto_1fr]">

          {/* LEFT — Logo (desktop) | Profile (mobile) */}
          <div className="flex items-center justify-start gap-3">

            {/* Mobile Profile */}
            <div className="lg:hidden relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 rounded-full border-2 border-[#4cc9f0] overflow-hidden"
              >
                <img
                  src="https://via.placeholder.com/150"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-4 w-56 bg-white rounded-2xl shadow-xl border p-4 text-center z-50">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-3">
                    MD SHAKIL
                  </p>
                  <button className="w-full py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition">
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Desktop Logo */}
            <Link href="/" className="hidden lg:flex items-center gap-3 group">
              <div className="bg-[#4cc9f0] p-2 rounded-full group-hover:scale-105 transition">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-[#020d1a]"
                >
                  <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-[#4cc9f0]">
                PawFect
              </span>
            </Link>
          </div>

          {/* CENTER — Logo (mobile) | Routes (desktop centered) */}
          <div className="flex justify-center">

            {/* Mobile Logo */}
            <Link href="/" className="flex items-center gap-2 lg:hidden">
              <div className="bg-[#4cc9f0] p-2 rounded-full">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-[#020d1a]"
                >
                  <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-[#4cc9f0]">
                PawFect
              </span>
            </Link>

            {/* Desktop Routes (perfect center) */}
            <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative transition ${
                      isActive
                        ? "text-[#4cc9f0]"
                        : "text-gray-700 hover:text-[#4cc9f0]"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#4cc9f0] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Profile (desktop) | Menu (mobile) */}
          <div className="flex items-center justify-end gap-3">

            {/* Desktop Profile */}
            <div className="hidden lg:block relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-11 h-11 rounded-full border-2 border-[#4cc9f0] overflow-hidden hover:scale-105 transition"
              >
                <img
                  src="https://via.placeholder.com/150"
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-xl border p-4 text-center z-50">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-3">
                    MD SHAKIL
                  </p>
                  <button className="w-full py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition">
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border hover:bg-gray-100 transition"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 space-y-2 border-t pt-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg font-medium transition ${
                    isActive
                      ? "bg-[#4cc9f0]/10 text-[#4cc9f0]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
