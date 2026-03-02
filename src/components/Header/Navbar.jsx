"use client";

import React, { useState, useEffect } from "react";
import NavLink from "../button/NavLink";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Added this
import { Menu, ChevronDown } from "lucide-react";
import AuthButtons from "../button/AuthButtons";
import Logo from "./Logo";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname(); // Hook to check current path

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "About",
      href: "/about",
      subLinks: [
        { name: "Our Mission", href: "/about/mission" },
        { name: "Team", href: "/about/team" },
      ],
    },
    { name: "FAQ", href: "/faq" },
    {
      name: "Forms",
      href: "/forms", // Ensure this matches your route prefix
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
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo></Logo>
        </div>

        {/* Center Links */}
        <div className="hidden lg:flex items-center h-full">
          <ul className="flex flex-row items-center gap-8 list-none">
            {navLinks.map((link) => {
              // Check if any sub-link is active to highlight the parent dropdown
              const isParentActive =
                link.subLinks?.some((sub) => pathname.startsWith(sub.href)) ||
                pathname === link.href;

              return (
                <li
                  key={link.name}
                  className="relative flex items-center h-full"
                >
                  {link.subLinks ? (
                    <div className="dropdown dropdown-hover dropdown-bottom">
                      <div
                        tabIndex={0}
                        role="button"
                        className={`flex items-center gap-1 text-[15px] font-bold py-2 cursor-pointer transition-colors ${
                          isParentActive
                            ? "text-primary"
                            : "text-neutral hover:text-primary"
                        }`}
                      >
                        {link.name}
                        <ChevronDown className="w-4 h-4" />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow-xl bg-white border border-base-200 rounded-xl w-48"
                      >
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

        {/* Right side Auth */}
        <div className="flex items-center gap-4">
          <AuthButtons />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
