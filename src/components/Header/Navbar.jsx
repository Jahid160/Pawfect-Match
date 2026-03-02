"use client";

import React, { useState, useEffect } from "react";
import NavLink from "../button/NavLink";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react"; // Added X for closing
import AuthButtons from '../button/AuthButtons';
import Logo from "./Logo";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { 
      name: "About", 
      href: "/about",
      subLinks: [
        { name: "Our Mission", href: "/about/mission" },
        { name: "Team", href: "/about/team" },
      ]
    },
    { name: "FAQ", href: "/faq" },
    { 
      name: "Forms", 
      href: "/forms",
      subLinks: [
        { name: "Adoption Form", href: "/adoptionfrom" },
        { name: "Shelter Application", href: "/shelterForm" },
      ]
    },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md h-16" : "bg-white/95 backdrop-blur-md h-20"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Links (Hidden on mobile) */}
          <div className="hidden lg:flex items-center h-full">
            <ul className="flex flex-row items-center gap-8 list-none">
              {navLinks.map((link) => {
                const isParentActive = link.subLinks?.some(sub => pathname.startsWith(sub.href)) || pathname === link.href;

                return (
                  <li key={link.name} className="relative flex items-center h-full">
                    {link.subLinks ? (
                      <div className="dropdown dropdown-hover dropdown-bottom">
                        <div 
                          tabIndex={0} 
                          role="button" 
                          className={`flex items-center gap-1 text-[15px] font-bold py-2 cursor-pointer transition-colors ${
                            isParentActive ? "text-primary" : "text-neutral hover:text-primary"
                          }`}
                        >
                          {link.name}
                          <ChevronDown className="w-4 h-4" />
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-white border border-base-200 rounded-xl w-48">
                          {link.subLinks.map((sub) => (
                            <li key={sub.name}>
                              <Link 
                                href={sub.href} 
                                className={`${pathname === sub.href ? "text-primary bg-primary/10" : "text-neutral"}`}
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <NavLink href={link.href}>{link.name}</NavLink>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right side (Auth + Mobile Toggle) */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:block">
              <AuthButtons />
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-neutral hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div className={`fixed inset-0 z-[110] lg:hidden transition-opacity duration-300 ${
        isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        
        {/* Sidebar Content */}
        <aside className={`absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <Logo />
              <button onClick={() => setIsMenuOpen(false)}><X className="w-6 h-6" /></button>
            </div>

            <nav className="flex-1 overflow-y-auto">
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    {link.subLinks ? (
                      <div className="space-y-2">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{link.name}</p>
                        <div className="pl-4 space-y-3 border-l-2 border-gray-100">
                          {link.subLinks.map((sub) => (
                            <Link 
                              key={sub.name} 
                              href={sub.href} 
                              className={`block text-lg font-medium ${pathname === sub.href ? "text-primary" : "text-neutral"}`}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link 
                        href={link.href}
                        className={`block text-xl font-bold ${pathname === link.href ? "text-primary" : "text-neutral"}`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="pt-6 mt-6 border-t border-gray-100">
              <AuthButtons />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Navbar;