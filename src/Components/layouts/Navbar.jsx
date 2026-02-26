"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add a smooth shadow and background blur when scrolling down
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 py-1"
          : "bg-transparent py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Paw<span className="text-orange-500">fect</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <Link 
              href="#" 
              className="px-4 py-2 text-sm font-medium text-gray-600 rounded-full hover:text-orange-600 hover:bg-orange-50 transition-all duration-200"
            >
              Services
            </Link>

            {/* Dropdown Menu */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 rounded-full hover:text-orange-600 hover:bg-orange-50 transition-all duration-200">
                Products
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-orange-500 group-hover:rotate-180 transition-transform duration-300" />
              </button>

              {/* Dropdown Panel with Slide-up Animation */}
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 p-2">
                <Link href="#" className="block px-4 py-2.5 text-sm text-gray-600 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors">
                  Dog Food
                </Link>
                <Link href="#" className="block px-4 py-2.5 text-sm text-gray-600 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors">
                  Cat Toys
                </Link>
              </div>
            </div>

            <Link 
              href="#" 
              className="px-4 py-2 text-sm font-medium text-gray-600 rounded-full hover:text-orange-600 hover:bg-orange-50 transition-all duration-200"
            >
              About Us
            </Link>

            {/* CTA Button */}
            <div className="ml-4">
              <button className="bg-orange-500 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all duration-200">
                Book Now
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Animated slide down) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white px-6 py-4 shadow-xl border-t border-gray-100 flex flex-col gap-2">
          <Link href="#" className="px-4 py-3 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors">
            Services
          </Link>
          <Link href="#" className="px-4 py-3 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors">
            Products
          </Link>
          <Link href="#" className="px-4 py-3 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors">
            About Us
          </Link>
          <button className="mt-2 w-full bg-orange-500 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-orange-600 transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </nav>
  );
}