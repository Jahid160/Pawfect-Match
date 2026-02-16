"use client"

import React, { useState } from 'react';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(true);

    return (
        <nav className="bg-[#020d1a] text-white font-sans">
            {/* Top Navbar Container */}
            <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-4">

                {/* Logo Section */}
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="bg-[#4cc9f0] p-1.5 rounded-full">
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6 text-[#020d1a]"
                        >
                            <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM5 9c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm12 11c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM7 20c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
                        </svg>
                    </div>
                    <span className="text-2xl font-bold tracking-wide text-[#4cc9f0]">PawFect</span>
                </div>

                {/* Navigation Links */}
                <div className="hidden lg:flex items-center gap-6 text-[15px] font-medium text-gray-300">
                    <a href="#" className="text-[#4cc9f0] border-b-2 border-[#4cc9f0] pb-1">Home</a>
                    <a href="#" className="hover:text-white transition">Pets & Supplies</a>
                    <a href="#" className="hover:text-white transition">About Us</a>
                    <a href="#" className="hover:text-white transition">FAQ</a>
                    <a href="#" className="hover:text-white transition">Adoption Guidelines</a>
                    <a href="#" className="hover:text-white transition">Add Listing</a>
                    <a href="#" className="hover:text-white transition">My Listing</a>
                    <a href="#" className="hover:text-white transition">My Orders</a>
                </div>

                {/* Profile Avatar */}
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-12 h-12 rounded-full border-2 border-[#4cc9f0] overflow-hidden p-0.5 focus:outline-none"
                    >
                        <img
                            src="https://via.placeholder.com/150"
                            alt="User"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </button>

                    {/* User Profile Dropdown Menu */}
                    {!isDropdownOpen && (
                        <div className="absolute right-0 mt-3 w-56 bg-[#0a192f] border border-sky-900/50 rounded-2xl p-5 shadow-2xl z-50 text-center">
                            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-2">
                                MD SHAKIL
                            </p>

                            <button className="text-2xl font-bold text-gray-200 hover:text-white transition block w-full mb-5">
                                Logout
                            </button>

                            {/* Dark Mode Toggle Area */}
                            <div className="flex items-center justify-between px-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-5 bg-[#1e293b] rounded-full relative cursor-pointer border border-gray-600">
                                        <div className="absolute left-1 top-1 w-3 h-3 bg-gray-400 rounded-full"></div>
                                    </div>
                                    <span className="text-xs text-gray-400 font-medium">Dark Mode</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;