"use client";

import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import NavLink from '../button/NavLink';
import Link from "next/link";
import { Menu, LogIn } from "lucide-react";
import AuthButtons from '../button/AuthButtons';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  const navItems = navLinks.map((link) => (
    <li key={link.name} className="relative group">
      <NavLink href={link.href}>
        <span className="relative py-2 text-[15px] font-semibold tracking-wide transition-colors group-hover:text-primary">
          {link.name}
          {/* Modern dot indicator on hover */}
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
        </span>
      </NavLink>
    </li>
  ));

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 ${isScrolled ? "pt-2" : "pt-6"}`}>
      <div className={`navbar max-w-7xl mx-auto rounded-3xl transition-all duration-300 ${isScrolled
          ? "bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] border border-white/20 px-8 h-16"
          : "bg-transparent px-4 h-20"
        }`}>

        {/* Navbar Start: Logo & Mobile Trigger */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden mr-2 hover:bg-primary/10">
              <Menu className="h-6 w-6" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100/90 backdrop-blur-md rounded-2xl z-[1] mt-4 w-64 p-4 shadow-2xl border border-base-200 gap-2"
            >
              {navItems}
              <div className="divider my-1"></div>
              <li><Link href="/login" className="btn btn-primary btn-sm text-white">Login</Link></li>
            </ul>
          </div>
          <div className="hover:scale-105 transition-transform duration-300 flex items-center">
            <Logo />
          </div>
        </div>

        {/* Navbar Center: Links with spacing */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-8">
            {navItems}
          </ul>
        </div>

        {/* Navbar End: Styled Login only */}
        <div className="navbar-end">
          <AuthButtons/>
          {/* <Link
            href="/login"
            className="group relative flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>Login</span>
            <LogIn className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;