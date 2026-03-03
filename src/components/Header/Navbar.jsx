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
        { name: "Help Center", href: "/help-center" },
      ],
    },
    {
      name: "Adoption",
      href: "/adoption",
      subLinks: [
        { name: "Adoption Form", href: "/adoptionfrom" },
        { name: "Shelter Application", href: "/shelterForm" },
      ],
    },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled
        ? "bg-white shadow-md h-16"
        : "bg-white/95 backdrop-blur-md h-20"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center h-full">
          <ul className="flex flex-row items-center gap-8 list-none h-full">
            {navLinks.map((link) => {
              const isParentActive =
                link.subLinks?.some((sub) => pathname.startsWith(sub.href)) ||
                pathname === link.href;

              return (
                <li key={link.name} className="relative flex items-center h-full">
                  {link.subLinks ? (
                    <div className="dropdown dropdown-hover dropdown-bottom">
                      <div
                        tabIndex={0}
                        role="button"
                        className={`flex items-center gap-1 text-[15px] font-bold py-2 cursor-pointer transition-colors ${isParentActive
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
                              className={`${pathname === sub.href
                                ? "text-primary bg-primary/10"
                                : "text-neutral"
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
                      className={`text-[15px] font-bold transition-colors ${pathname === link.href
                        ? "text-primary"
                        : "text-neutral hover:text-primary"
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

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:block">
          <AuthButtons />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-neutral"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[110]" onClick={() => setIsMenuOpen(false)}>
          <aside
            className="fixed top-0 right-0 w-64 h-full bg-white shadow-2xl p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <Logo />
              <button onClick={() => setIsMenuOpen(false)}><X className="w-6 h-6" /></button>
            </div>

            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-lg font-bold ${pathname === link.href ? "text-primary" : "text-neutral"}`}
                  >
                    {link.name}
                  </Link>
                  {link.subLinks && (
                    <ul className="pl-4 mt-2 gap-2 flex flex-col border-l-2 border-base-200">
                      {link.subLinks.map(sub => (
                        <li key={sub.name}>
                          <Link href={sub.href} className="text-sm text-neutral-500">{sub.name}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6 border-t border-gray-100">
              <AuthButtons />
            </div>
          </aside>
        </div>
      )}
    </nav>
  );
};

export default Navbar;