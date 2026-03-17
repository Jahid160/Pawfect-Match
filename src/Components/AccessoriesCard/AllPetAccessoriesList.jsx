"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { Sparkles, ChevronDown } from "lucide-react";
import { FaSearch, FaSortAmountDown } from "react-icons/fa";
import { AccessoriesCard } from "./AccessoriesCard";

const AllPetAccessoriesList = ({ accessories = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = ["All", "Accessories", "Dog Gear", "Cat Comfort", "Fish Care"];
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
      result = result.filter(item => 
        item?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item?.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory !== "All") {
      result = result.filter(item => 
        item?.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => (Number(a?.discountPrice) || Number(a?.price)) - (Number(b?.discountPrice) || Number(b?.price)));
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => (Number(b?.discountPrice) || Number(b?.price)) - (Number(a?.discountPrice) || Number(a?.price)));
    }
    
    return result;
  }, [accessories, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="bg-gradient-to-b from-orange-50 via-white to-white px-4 sm:px-8 py-14 min-h-screen font-sans">
      <div className="mx-auto mb-12 max-w-7xl">
        <div className="inline-flex items-center gap-2 bg-orange-100 mb-6 px-4 py-2 rounded-full font-bold text-[10px] text-orange-600 uppercase tracking-[0.2em]">
          <Sparkles size={14} /> New Lifestyle Collection
        </div>

        <div className="flex lg:flex-row flex-col lg:justify-between lg:items-end gap-4">
          <div className="max-w-2xl">
            <h2 className="font-black text-gray-900 text-4xl sm:text-5xl md:text-6xl leading-none tracking-tight">
              Complete <span className="text-orange-500">Gear</span> Pantry
            </h2>
            <p className="mt-4 max-w-xl text-gray-600 text-base leading-7">
              Find everything your pet needs for a happy and active life.
            </p>
          </div>
          <div className="font-medium text-gray-500 text-sm italic">
            Found <span className="font-bold text-gray-900">{filteredAccessories.length}</span> items
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white shadow-orange-100/40 shadow-xl mx-auto mb-12 p-5 border border-orange-100 rounded-[2.5rem] max-w-7xl">
        <div className="flex xl:flex-row flex-col xl:items-center gap-6">
          
          {/* Search */}
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

            {/* --- Animated Custom Sort Dropdown --- */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-3 bg-gray-900 hover:bg-orange-600 shadow-gray-200 shadow-lg px-5 py-3 rounded-2xl font-bold text-[10px] text-white uppercase tracking-widest active:scale-95 transition-all"
              >
                <FaSortAmountDown className={isSortOpen ? "animate-pulse" : ""} />
                <span>Sort By: {sortBy}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu with Animation */}
              <div className={`absolute right-0 mt-3 w-56 bg-white border border-orange-50 rounded-2xl shadow-2xl z-50 overflow-hidden transition-all duration-300 origin-top-right ${
                isSortOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}>
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-7xl">
        {filteredAccessories.length > 0 ? (
          filteredAccessories.map((item, index) => (
            <AccessoriesCard key={item?._id?.toString() || `acc-${index}`} item={item} />
          ))
        ) : (
          <div className="col-span-full py-24 text-center">
             <div className="opacity-10 mb-4 text-6xl">🐾</div>
             <p className="font-bold text-gray-400 italic">No accessories found. Try another search!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPetAccessoriesList;