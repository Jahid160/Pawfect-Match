"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { Sparkles, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { FaSearch, FaSortAmountDown, FaSyringe } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { VaccinationCard } from "../cards/VaccinationCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const VaccinationList = ({ vaccines = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Recommended");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dropdownRef = useRef(null);

  const itemsPerPage = 12;
  const sortOptions = ["Recommended", "Price: Low to High", "Price: High to Low"];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter & Sort Logic
  const filteredVaccines = useMemo(() => {
    let result = Array.isArray(vaccines) ? [...vaccines] : [];

    // Search Logic
    if (searchQuery) {
      result = result.filter((item) =>
        item?.vaccineName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting Logic
    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => (Number(a?.price) || 0) - (Number(b?.price) || 0));
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => (Number(b?.price) || 0) - (Number(a?.price) || 0));
    }

    return result;
  }, [vaccines, searchQuery, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredVaccines.length / itemsPerPage);
  const currentData = filteredVaccines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1); // Reset page on search or sort
  }, [searchQuery, sortBy]);

  return (
    <div className="bg-gradient-to-b from-base-200 via-base-100 to-base-100 px-4 sm:px-8 py-14 min-h-screen">
      
      {/* Header Section */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mb-12 max-w-7xl">
        <div className="inline-flex items-center gap-2 bg-primary/10 mb-6 px-4 py-2 rounded-full font-bold text-[10px] text-primary uppercase tracking-[0.2em]">
          <Sparkles size={14} /> New Vaccination Collection
        </div>

        <div className="flex lg:flex-row flex-col lg:justify-between lg:items-end gap-4">
          <div className="max-w-2xl">
            <h2 className="font-black text-neutral text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight">
              Complete <span className="text-primary">Vaccine</span> Pantry
            </h2>
            <p className="mt-4 max-w-xl text-neutral/60 text-base leading-7">
              Protect your pets with our premium range of vaccines. Verified safety for every furry friend.
            </p>
          </div>
          <div className="font-medium text-neutral/40 text-sm italic">
            Found <span className="font-bold text-neutral">{filteredVaccines.length}</span> premium items
          </div>
        </div>
      </motion.div>

      {/* Filter Bar - Simplified (No Categories) */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-base-100 shadow-sm mx-auto mb-12 p-5 border border-base-100 rounded-[2.5rem] max-w-7xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <FaSearch className="top-1/2 left-6 absolute text-neutral/30 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search vaccines by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-base-200 focus:bg-base-100 py-4 pr-4 pl-14 border border-base-300 focus:border-primary rounded-2xl outline-none w-full font-medium text-neutral text-sm transition-all"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full md:w-auto" ref={dropdownRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex justify-center items-center gap-3 bg-neutral hover:bg-primary shadow-lg w-full md:w-64 px-5 py-4 rounded-2xl font-bold text-[10px] text-white uppercase tracking-widest transition-all"
            >
              <FaSortAmountDown />
              <span>Sort: {sortBy}</span>
              <ChevronDown size={14} className={`${isSortOpen ? "rotate-180" : ""} transition-transform`} />
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }} 
                  className="right-0 z-50 absolute bg-base-100 shadow-2xl mt-3 border border-base-300 rounded-2xl w-full md:w-64 overflow-hidden"
                >
                  <div className="p-2">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setSortBy(opt); setIsSortOpen(false); }}
                        className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                          sortBy === opt ? "bg-primary/10 text-primary" : "text-neutral/60 hover:bg-base-200"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-7xl">
        <AnimatePresence mode="popLayout">
          {currentData.length > 0 ? (
            currentData.map((vaccine) => (
              <motion.div
                layout
                key={vaccine._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <VaccinationCard vaccine={vaccine} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center opacity-40">
              <FaSyringe className="mx-auto mb-4 text-6xl" />
              <p className="font-bold italic">No vaccines found matching "{searchQuery}"</p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-16">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="p-4 bg-base-100 border border-base-300 rounded-2xl disabled:opacity-30 hover:text-primary transition-all shadow-sm group"
          >
            <ChevronLeft size={20} className="group-active:-translate-x-1 transition-transform" />
          </button>
          
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-12 h-12 rounded-2xl font-bold text-sm transition-all ${
                  currentPage === i + 1 
                    ? "bg-primary text-white shadow-lg scale-110" 
                    : "bg-base-100 border border-base-300 hover:border-primary text-neutral"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="p-4 bg-base-100 border border-base-300 rounded-2xl disabled:opacity-30 hover:text-primary transition-all shadow-sm group"
          >
            <ChevronRight size={20} className="group-active:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};

export default VaccinationList;