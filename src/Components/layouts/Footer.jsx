"use client";

import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-[#020d1a] text-gray-300 mt-20">
            <div className="max-w-[1400px] mx-auto px-6 py-14">

                {/* ===== TOP GRID ===== */}
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-[#4cc9f0] p-2 rounded-full">
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
                        </div>

                        <p className="text-sm leading-relaxed text-gray-400">
                            PawFect is a modern pet adoption & marketplace platform where
                            loving homes meet their perfect companions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="hover:text-[#4cc9f0] transition">Home</Link></li>
                            <li><Link href="/pets" className="hover:text-[#4cc9f0] transition">Pets & Supplies</Link></li>
                            <li><Link href="/about" className="hover:text-[#4cc9f0] transition">About Us</Link></li>
                            <li><Link href="/faq" className="hover:text-[#4cc9f0] transition">FAQ</Link></li>
                            <li><Link href="/guidelines" className="hover:text-[#4cc9f0] transition">Adoption Guidelines</Link></li>
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">My Account</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/add-listing" className="hover:text-[#4cc9f0] transition">Add Listing</Link></li>
                            <li><Link href="/my-listing" className="hover:text-[#4cc9f0] transition">My Listings</Link></li>
                            <li><Link href="/orders" className="hover:text-[#4cc9f0] transition">My Orders</Link></li>
                            <li><Link href="/login" className="hover:text-[#4cc9f0] transition">Login</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter + Social */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Stay Connected</h3>

                        {/* Newsletter */}
                        <form className="flex mb-5">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-4 py-2 rounded-l-lg bg-[#0b1e35] border border-gray-700 text-sm focus:outline-none focus:border-[#4cc9f0]"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[#4cc9f0] text-[#020d1a] font-semibold rounded-r-lg hover:opacity-90 transition"
                            >
                                Join
                            </button>
                        </form>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            {["facebook", "twitter", "instagram"].map((icon) => (
                                <a
                                    key={icon}
                                    href="#"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0b1e35] hover:bg-[#4cc9f0] hover:text-[#020d1a] transition"
                                >
                                    <span className="sr-only">{icon}</span>
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ===== BOTTOM BAR ===== */}
                <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} PawFect. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
