"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { Sparkles, ChevronDown } from "lucide-react";
import {
  FaSearch,
  FaSortAmountDown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { AccessoriesCard } from "./AccessoriesCard";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const AllPetAccessoriesList = ({ accessories = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const dropdownRef = useRef(null);
  const ACCESSORIES_PER_PAGE = 12;

  const categories = ["All", "Accessories", "Dog", "Cat", "Bird", "Fish"];
  const sortOptions = ["Recommended", "Price: Low to High", "Price: High to Low"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredAccessories = useMemo(() => {
    let result = Array.isArray(accessories) ? [...accessories] : [];
    if (searchQuery) {
      result = result.filter(
        (item) =>
          item?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory !== "All") {
      result = result.filter(
        (item) =>
          item?.category?.toLowerCase() === selectedCategory.toLowerCase() ||
          item?.targetPet?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => (Number(a?.discountPrice) || Number(a?.price)) - (Number(b?.discountPrice) || Number(b?.price)));
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => (Number(b?.discountPrice) || Number(b?.price)) - (Number(a?.discountPrice) || Number(a?.price)));
    }
    return result;
  }, [accessories, searchQuery, selectedCategory, sortBy]);

  useEffect(() => setCurrentPage(1), [searchQuery, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredAccessories.length / ACCESSORIES_PER_PAGE);
  const paginatedAccessories = useMemo(() => {
    const startIndex = (currentPage - 1) * ACCESSORIES_PER_PAGE;
    return filteredAccessories.slice(startIndex, startIndex + ACCESSORIES_PER_PAGE);
  }, [filteredAccessories, currentPage]);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) for (let i = 1; i <= totalPages; i++) pages.push(i);
    else {
      if (currentPage <= 3) pages.push(1, 2, 3, 4, "...", totalPages);
      else if (currentPage >= totalPages - 2) pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      else pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
    return pages;
  };

  return (
    <div className="bg-gradient-to-b from-orange-50 via-white to-white px-4 sm:px-6 lg:px-12 py-10 md:py-20 min-h-screen font-sans">
      
      {/* Header Section */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mb-10 md:mb-16 max-w-7xl">
        <div className="inline-flex items-center gap-2 bg-orange-100 mb-4 md:mb-6 px-4 py-2 rounded-full font-black text-[9px] text-orange-600 md:text-[10px] uppercase tracking-[0.2em]">
          <Sparkles size={14} /> New Lifestyle Collection
        </div>

        <div className="flex lg:flex-row flex-col lg:justify-between lg:items-end gap-6">
          <div className="max-w-3xl">
            <h2 className="font-black text-slate-900 text-3xl sm:text-5xl md:text-7xl italic uppercase leading-[1.1] tracking-tighter">
              Complete <span className="text-orange-600">Gear</span> Pantry
            </h2>
            <p className="mt-4 max-w-xl text-slate-500 text-sm md:text-lg leading-relaxed">
              Find everything your pet needs for a happy, safe, and active life. Quality accessories for every paw.
            </p>
          </div>
          <div className="hidden md:block font-black text-slate-400 text-xs md:text-sm uppercase tracking-widest">
            Found <span className="text-orange-600">{filteredAccessories.length}</span> Premium Items
          </div>
        </div>
      </motion.div>

      {/* Filter Bar - Responsive Fixes */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white shadow-2xl shadow-orange-100/50 mx-auto mb-12 p-4 md:p-6 border border-orange-50 rounded-3xl md:rounded-[3rem] max-w-7xl">
        <div className="flex xl:flex-row flex-col gap-4 md:gap-6">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <FaSearch className="top-1/2 left-5 md:left-7 absolute text-slate-400 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50 focus:bg-white py-3 md:py-5 pr-4 pl-12 md:pl-16 border border-slate-100 focus:border-orange-500 rounded-2xl md:rounded-3xl outline-none w-full font-bold text-slate-700 text-xs md:text-sm transition-all"
            />
          </div>

          <div className="flex sm:flex-row flex-col items-center gap-4">
            {/* Categories - Scrollable on very small screens */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl md:rounded-2xl px-4 md:px-6 py-2.5 md:py-4 text-[9px] md:text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                      : "bg-slate-50 text-slate-500 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-auto" ref={dropdownRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex justify-between sm:justify-start items-center gap-3 bg-slate-900 hover:bg-orange-600 px-5 py-3 md:py-4 rounded-xl md:rounded-2xl w-full font-black text-[9px] text-white md:text-[11px] uppercase tracking-widest transition-all"
              >
                <div className="flex items-center gap-2">
                  <FaSortAmountDown size={12} />
                  <span>{sortBy}</span>
                </div>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="right-0 sm:left-0 z-50 absolute bg-white shadow-2xl mt-2 border border-slate-50 rounded-2xl w-full sm:w-56 overflow-hidden">
                    <div className="p-2">
                      {sortOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => { setSortBy(opt); setIsSortOpen(false); }}
                          className={`w-full rounded-xl px-4 py-3 text-left text-[10px] md:text-xs font-black uppercase transition-all ${
                            sortBy === opt ? "bg-orange-50 text-orange-600" : "text-slate-600 hover:bg-slate-50"
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
        </div>
      </motion.div>

      {/* Grid - Adjusted for smooth mobile layout */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="gap-5 md:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-7xl">
        <AnimatePresence mode="popLayout">
          {paginatedAccessories.length > 0 ? (
            paginatedAccessories.map((item, index) => (
              <motion.div key={item?._id?.toString() || index} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AccessoriesCard item={item} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center italic uppercase">
              <p className="font-black text-slate-300 text-2xl">No items found</p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Pagination - Full responsive with wrap */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 mx-auto mt-12 md:mt-20 max-w-7xl">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 bg-white disabled:opacity-30 shadow-sm px-4 md:px-6 py-3 rounded-xl md:rounded-2xl font-black text-[10px] text-slate-600 md:text-xs uppercase transition"
          >
            <FaChevronLeft size={10} /> <span className="hidden sm:inline">Prev</span>
          </button>

          <div className="flex items-center gap-1 md:gap-2">
            {getPageNumbers().map((page, i) => (
              <button
                key={i}
                onClick={() => typeof page === "number" && setCurrentPage(page)}
                className={`h-10 md:h-12 min-w-[40px] md:min-w-[48px] rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black transition ${
                  currentPage === page ? "bg-orange-600 text-white shadow-lg" : "bg-white text-slate-600 border border-slate-100 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 bg-white disabled:opacity-30 shadow-sm px-4 md:px-6 py-3 rounded-xl md:rounded-2xl font-black text-[10px] text-slate-600 md:text-xs uppercase transition"
          >
            <span className="hidden sm:inline">Next</span> <FaChevronRight size={10} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AllPetAccessoriesList;