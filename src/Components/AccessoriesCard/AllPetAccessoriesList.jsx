"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { Sparkles, ChevronDown } from "lucide-react";
import { FaSearch, FaSortAmountDown } from "react-icons/fa";
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
  const dropdownRef = useRef(null);

  // তোমার JSON ডাটা অনুযায়ী ক্যাটাগরিগুলো আপডেট করা হয়েছে
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
    
    // Search logic (Title and Brand)
    if (searchQuery) {
      result = result.filter(item => 
        item?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item?.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Category & TargetPet filter
    if (selectedCategory !== "All") {
      result = result.filter(item => 
        item?.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        item?.targetPet?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Sorting Logic with price safety
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

  return (
    <div className="bg-gradient-to-b from-orange-50 via-white to-white px-4 sm:px-8 py-14 min-h-screen font-sans">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto mb-12 max-w-7xl"
      >
        <div className="inline-flex items-center gap-2 bg-orange-100 mb-6 px-4 py-2 rounded-full font-bold text-[10px] text-orange-600 uppercase tracking-[0.2em]">
          <Sparkles size={14} /> New Lifestyle Collection
        </div>

        <div className="flex lg:flex-row flex-col lg:justify-between lg:items-end gap-4">
          <div className="max-w-2xl">
            <h2 className="font-black text-gray-900 text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight">
              Complete <span className="text-orange-500">Gear</span> Pantry
            </h2>
            <p className="mt-4 max-w-xl text-gray-600 text-base leading-7">
              Find everything your pet needs for a happy, safe, and active life. 
              Quality accessories for every paw.
            </p>
          </div>
          <div className="font-medium text-gray-500 text-sm italic">
            Found <span className="font-bold text-gray-900">{filteredAccessories.length}</span> premium items
          </div>
        </div>
      </motion.div>

      {/* Filter Bar */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white shadow-orange-100/40 shadow-xl mx-auto mb-12 p-5 border border-orange-100 rounded-[2.5rem] max-w-7xl"
      >
        <div className="flex xl:flex-row flex-col xl:items-center gap-6">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <FaSearch className="top-1/2 left-6 absolute text-gray-400 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search premium accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-50 focus:bg-white py-4 pr-4 pl-14 border border-gray-100 focus:border-orange-400 rounded-2xl outline-none w-full font-medium text-gray-700 text-sm transition-all"
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
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-200 scale-105" 
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
                className="flex items-center gap-3 bg-gray-900 hover:bg-orange-600 shadow-gray-200 shadow-lg px-5 py-3 rounded-2xl font-bold text-[10px] text-white uppercase tracking-widest active:scale-95 transition-all"
              >
                <FaSortAmountDown className={isSortOpen ? "animate-pulse" : ""} />
                <span>Sort: {sortBy}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="right-0 z-50 absolute bg-white shadow-2xl mt-3 border border-orange-50 rounded-2xl w-56 overflow-hidden origin-top-right"
                  >
                    <div className="p-2">
                      {sortOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setSortBy(opt);
                            setIsSortOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all ${
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

      {/* Product Grid with Animations */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-7xl"
      >
        <AnimatePresence mode="popLayout">
          {filteredAccessories.length > 0 ? (
            filteredAccessories.map((item, index) => (
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
               <div className="opacity-20 mb-4 text-7xl">🐾</div>
               <p className="font-bold text-gray-400 text-lg italic">No accessories found. Try another search or category!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AllPetAccessoriesList;