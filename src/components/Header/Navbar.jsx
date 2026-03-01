"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Menu, LogIn, Search, PawPrint } from "lucide-react";
import Logo from './Logo'; // Assuming you have a separate Logo component
import NavLink from '../button/NavLink'; // Reusing your existing NavLink logic

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Adopt", href: "/adopt" },
    { name: "Volunteer", href: "/volunteer" },
    { name: "Stories", href: "/stories" },
    { name: "About Us", href: "/about" },
  ];

  const navItems = navLinks.map((link) => (
    <li key={link.name} className="relative group">
      <NavLink href={link.href}>
        <span className="relative py-2 text-[15px] font-bold tracking-wide transition-colors group-hover:text-primary text-neutral">
          {link.name}
          {/* Modern dot indicator from your previous design */}
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bottom-0"></span>
        </span>
      </NavLink>
    </li>
  ));

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-4 md:px-12 ${isScrolled ? "pt-2" : "pt-6"}`}>
      <div className={`navbar max-w-7xl mx-auto rounded-[2rem] transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] border border-white/20 px-6 h-16"
            : "bg-transparent px-2 h-20"
        }`}>
        
        {/* Navbar Start: Logo & Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden mr-2 hover:bg-primary/10 rounded-full text-neutral">
              <Menu className="h-6 w-6" />
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100/95 backdrop-blur-md rounded-2xl z-[1] mt-4 w-64 p-4 shadow-2xl border border-base-200 gap-2">
              {navItems}
              <div className="divider my-1"></div>
              <li>
                <Link href="/login" className="btn btn-primary btn-sm text-white rounded-xl flex gap-2">
                  <LogIn className="w-4 h-4" /> Login
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer transition-transform hover:scale-105 active:scale-95">
            <div className="bg-primary p-2 rounded-xl text-white shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
              <PawPrint className="w-6 h-6 fill-current" />
            </div>
            <span className="text-2xl font-black text-neutral tracking-tight hidden sm:block">
              Pet<span className="text-primary underline decoration-secondary/50 decoration-4 underline-offset-4">Rescue</span>
            </span>
          </Link>
        </div>

        {/* Navbar Center: Desktop Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-8">
            {navItems}
          </ul>
        </div>

        {/* Navbar End: Search & CTA */}
        <div className="navbar-end gap-3">
          <button className="btn btn-ghost btn-circle text-neutral hidden md:flex hover:bg-primary/10">
            <Search className="h-5 w-5" />
          </button>
          
          <Link
            href="/donate"
            className="group relative flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 border-none min-h-0 h-11"
          >
            <span>Donate Now</span>
            <div className="bg-white/20 p-1 rounded-full group-hover:bg-white/30 transition-colors">
               <PawPrint className="w-3.5 h-3.5" strokeWidth={3} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;