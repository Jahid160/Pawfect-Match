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

// --- Animation Variants (Matching PetFoods Style) ---
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
  const sortOptions = [
    "Recommended",
    "Price: Low to High",
    "Price: High to Low",
  ];

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

    // Search logic
    if (searchQuery) {
      result = result.filter(
        (item) =>
          item?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item?.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category and TargetPet filter
    if (selectedCategory !== "All") {
      result = result.filter(
        (item) =>
          item?.category?.toLowerCase() === selectedCategory.toLowerCase() ||
          item?.targetPet?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Sorting
    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => {
        const priceA = Number(a?.discountPrice) || Number(a?.price) || 0;
        const priceB = Number(b?.discountPrice) || Number(b?.price) || 0;
        return priceA - priceB;
      });
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => {
        const priceA = Number(a?.discountPrice) || Number(a?.price) || 0;
        const priceB = Number(b?.discountPrice) || Number(b?.price) || 0;
        return priceB - priceA;
      });
    }

    return result;
  }, [accessories, searchQuery, selectedCategory, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  const totalPages = Math.ceil(
    filteredAccessories.length / ACCESSORIES_PER_PAGE
  );

  const paginatedAccessories = useMemo(() => {
    const startIndex = (currentPage - 1) * ACCESSORIES_PER_PAGE;
    const endIndex = startIndex + ACCESSORIES_PER_PAGE;
    return filteredAccessories.slice(startIndex, endIndex);
  }, [filteredAccessories, currentPage]);

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white px-4 py-14 font-sans sm:px-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto mb-12 max-w-7xl"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">
          <Sparkles size={14} /> New Lifestyle Collection
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black leading-[1.1] tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Complete <span className="text-orange-500">Gear</span> Pantry
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-gray-600">
              Find everything your pet needs for a happy, safe, and active life.
              Quality accessories for every paw.
            </p>
          </div>

          <div className="text-sm font-medium italic text-gray-500">
            Found{" "}
            <span className="font-bold text-gray-900">
              {filteredAccessories.length}
            </span>{" "}
            premium items
          </div>
        </div>
      </motion.div>

      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto mb-12 max-w-7xl rounded-[2.5rem] border border-orange-100 bg-white p-5 shadow-xl shadow-orange-100/40"
      >
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search premium accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-gray-100 bg-gray-50 py-4 pl-14 pr-4 text-sm font-medium text-gray-700 outline-none transition-all focus:border-orange-400 focus:bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-5 py-3 text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                    selectedCategory === cat
                      ? "scale-105 bg-orange-500 text-white shadow-lg shadow-orange-200"
                      : "bg-gray-50 text-gray-500 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Custom Sort Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-3 rounded-2xl bg-gray-900 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg shadow-gray-200 transition-all active:scale-95 hover:bg-orange-600"
              >
                <FaSortAmountDown className={isSortOpen ? "animate-pulse" : ""} />
                <span>Sort: {sortBy}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    isSortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 z-50 mt-3 w-56 origin-top-right overflow-hidden rounded-2xl border border-orange-50 bg-white shadow-2xl"
                  >
                    <div className="p-2">
                      {sortOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setSortBy(opt);
                            setIsSortOpen(false);
                          }}
                          className={`w-full rounded-xl px-4 py-3 text-left text-xs font-bold transition-all ${
                            sortBy === opt
                              ? "bg-orange-50 text-orange-600"
                              : "text-gray-600 hover:bg-orange-50/50 hover:text-orange-500"
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

      {/* Result Count */}
      {/* <div className="mx-auto mb-8 flex max-w-7xl items-center justify-between">
        <p className="text-sm font-semibold text-gray-500">
          Showing{" "}
          <span className="text-orange-500">{paginatedAccessories.length}</span>{" "}
          of{" "}
          <span className="text-gray-800">{filteredAccessories.length}</span>{" "}
          accessories
        </p>

        {totalPages > 1 && (
          <p className="text-sm font-semibold text-gray-500">
            Page <span className="text-gray-800">{currentPage}</span> of{" "}
            <span className="text-gray-800">{totalPages}</span>
          </p>
        )}
      </div> */}

      {/* Product Grid with Animations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {paginatedAccessories.length > 0 ? (
            paginatedAccessories.map((item, index) => (
              <motion.div
                key={item?._id?.toString() || `acc-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <AccessoriesCard item={item} />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-24 text-center"
            >
              <div className="mb-4 text-7xl opacity-20">🐾</div>
              <p className="text-lg font-bold italic text-gray-400">
                No accessories found. Try another search or category!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Pagination */}
      {filteredAccessories.length > ACCESSORIES_PER_PAGE && (
        <div className="mx-auto mt-14 flex max-w-7xl flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-600 shadow-sm transition hover:border-orange-200 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaChevronLeft size={12} />
            Prev
          </button>

          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span
                key={`dots-${index}`}
                className="px-2 text-sm font-bold text-gray-400"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-11 min-w-[44px] rounded-2xl px-4 text-sm font-bold transition ${
                  currentPage === page
                    ? "bg-orange-500 text-white shadow-lg"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-orange-200 hover:text-orange-500"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-600 shadow-sm transition hover:border-orange-200 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
            <FaChevronRight size={12} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AllPetAccessoriesList;
