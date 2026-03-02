"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, X } from "lucide-react";
import AuthButtons from "../button/AuthButtons";
import Logo from "./Logo";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        { name: "FAQ", href: "/faq" },
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
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md h-16"
          : "bg-white/95 backdrop-blur-md h-20"
      }`}
    >
      <div className="flex justify-between items-center mx-auto px-6 max-w-7xl h-full">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Center Links (Desktop) */}
        <div className="hidden lg:flex items-center h-full">
          <ul className="flex flex-row items-center gap-8 mb-0 h-full list-none">
            {navLinks.map((link) => {
              const isParentActive =
                link.subLinks?.some((sub) => pathname.startsWith(sub.href)) ||
                pathname === link.href;

              return (
                <li key={link.name} className="relative flex items-center h-full">
                  {link.subLinks ? (
                    <div className="dropdown-bottom dropdown dropdown-hover">
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
                      <ul
                        tabIndex={0}
                        className="z-[1] bg-white shadow-xl p-2 border border-base-200 rounded-xl w-48 dropdown-content menu"
                      >
                        {link.subLinks.map((sub) => (
                          <li key={sub.name}>
                            <Link
                              href={sub.href}
                              className={`${
                                pathname === sub.href ? "text-primary bg-primary/10" : "text-neutral"
                              }`}
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
                      className={`text-[15px] font-bold transition-colors ${
                        pathname === link.href ? "text-primary" : "text-neutral hover:text-primary"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden lg:block">
          <AuthButtons />
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-neutral hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Sidebar/Drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-[110] ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 h-full">
          <div className="mb-8">
            <Logo />
          </div>
          <ul className="flex flex-col flex-grow gap-4 p-0 list-none">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`text-lg font-bold block py-2 ${
                    pathname === link.href ? "text-primary" : "text-neutral"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-6 border-gray-100 border-t">
            <AuthButtons />
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          className="lg:hidden z-[105] fixed inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;