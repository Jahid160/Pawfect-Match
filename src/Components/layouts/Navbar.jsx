"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🔹 Dummy user (replace later with auth data)
  const user = {
    name: "MD SHAKIL",
    avatar: "https://via.placeholder.com/150",
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "PetsCard", href: "/Petcarts" },
    { name: "Pets & Supplies", href: "/pets" },
    { name: "About Us", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "Adoption Guidelines", href: "/guidelines" },
    { name: "Add Listing", href: "/add-listing" },
    { name: "My Listing", href: "/my-listing" },
    { name: "My Orders", href: "/orders" },
  ];

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    router.push("/profile");
  };

  return (
    <nav className="top-0 z-50 sticky bg-white/80 backdrop-blur-lg border-gray-200 border-b">
      <div className="mx-auto px-4 sm:px-6 py-3 max-w-[1400px]">

        {/* ================= TOP BAR ================= */}
        <div className="items-center grid grid-cols-3 lg:grid-cols-[1fr_auto_1fr]">

          {/* LEFT — Logo (desktop) | Profile (mobile) */}
          <div className="flex justify-start items-center gap-3">

            {/* Mobile Profile */}
            <div className="lg:hidden relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="border-[#4cc9f0] border-2 rounded-full w-10 h-10 overflow-hidden"
              >
                <img
                  src={user.avatar}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </button>

              {isDropdownOpen && (
                <div className="left-0 z-50 absolute bg-white shadow-xl mt-4 p-4 border rounded-2xl w-56 text-center">
                  <button
                    onClick={handleProfileClick}
                    className="block mb-4 w-full font-semibold text-gray-800 hover:text-[#4cc9f0] text-sm transition"
                  >
                    {user.name}
                  </button>

                  <button className="bg-red-500 hover:bg-red-600 py-2 rounded-lg w-full font-semibold text-white transition">
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Desktop Logo */}
            <Link href="/" className="group hidden lg:flex items-center gap-3">
              <div className="bg-[#4cc9f0] p-2 rounded-full group-hover:scale-105 transition">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-[#020d1a]"
                >
                  <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
                </svg>
              </div>
              <span className="font-bold text-[#4cc9f0] text-2xl">
                PawFect
              </span>
            </Link>
          </div>

          {/* CENTER — Logo (mobile) | Routes (desktop centered) */}
          <div className="flex justify-center">

            {/* Mobile Logo */}
            <Link href="/" className="lg:hidden flex items-center gap-2">
              <div className="bg-[#4cc9f0] p-2 rounded-full">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-[#020d1a]"
                >
                  <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
                </svg>
              </div>
              <span className="font-bold text-[#4cc9f0] text-lg">
                PawFect
              </span>
            </Link>

            {/* Desktop Routes */}
            <div className="hidden lg:flex items-center gap-6 font-medium text-sm">
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
                      <span className="-bottom-2 left-0 absolute bg-[#4cc9f0] rounded-full w-full h-[2px]" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Profile (desktop) | Menu (mobile) */}
          <div className="flex justify-end items-center gap-3">

            {/* Desktop Profile */}
            <div className="hidden lg:block relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="border-[#4cc9f0] border-2 rounded-full w-11 h-11 overflow-hidden hover:scale-105 transition"
              >
                <img
                  src={user.avatar}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </button>

              {isDropdownOpen && (
                <div className="right-0 z-50 absolute bg-white shadow-xl mt-4 p-4 border rounded-2xl w-56 text-center">
                  <button
                    onClick={handleProfileClick}
                    className="block mb-4 w-full font-semibold text-gray-800 hover:text-[#4cc9f0] text-sm transition"
                  >
                    {user.name}
                  </button>

                  <button className="bg-red-500 hover:bg-red-600 py-2 rounded-lg w-full font-semibold text-white transition">
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex justify-center items-center hover:bg-gray-100 border rounded-lg w-10 h-10 transition"
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
          <div className="lg:hidden space-y-2 mt-4 pt-4 border-t">
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
