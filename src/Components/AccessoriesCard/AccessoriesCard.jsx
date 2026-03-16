"use client";

import Link from "next/link";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaChevronRight,
  FaBan,
  FaTag,
} from "react-icons/fa";
import { Sparkle, Sparkles } from "lucide-react";

// --- AccessoriesCard Component ---
// এই কম্পোনেন্টটি এখন ১০০% নিরাপদ, item undefined হলেও এরর দেবে না
export const AccessoriesCard = ({ item }) => {
  // Guard Clause: যদি item নাল বা আনডিফাইনড হয়
  if (!item || typeof item !== 'object') return null;

  // Optional Chaining (item?.prop) ব্যবহার করা হয়েছে যাতে "Cannot read properties of undefined" এরর না আসে
  const itemId = item?._id?.toString() || item?.id || Math.random().toString();
  const hasDiscount = item?.discountPrice && Number(item?.discountPrice) < Number(item?.price);
  const isOutOfStock = Number(item?.stock || 0) <= 0;

  return (
    <div className="group relative flex flex-col bg-white shadow-md hover:shadow-2xl border border-gray-100 rounded-3xl overflow-hidden transition-all hover:-translate-y-2 duration-500">
      
      {/* Image Section */}
      <div className="relative bg-gray-50 w-full h-64 overflow-hidden">
        <Image
          src={item?.image || "https://placehold.co/600x400?text=Pet+Gear"}
          alt={item?.title || "Accessory"}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out ${isOutOfStock ? 'grayscale opacity-60' : ''}`}
        />

        <div className="top-4 left-4 absolute flex flex-col gap-2">
          {hasDiscount && (
            <span className="bg-red-500 shadow-md px-3 py-1.5 rounded-full font-black text-[9px] text-white uppercase tracking-widest">
              <FaTag className="inline mr-1" /> Sale
            </span>
          )}
          {item?.featured && (
            <span className="bg-orange-500 shadow-md px-3 py-1.5 rounded-full font-black text-[9px] text-white uppercase tracking-widest">
              <Sparkle className="inline mr-1" /> New
            </span>
          )}
        </div>

        {isOutOfStock && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-900/10 backdrop-blur-[2px]">
             <span className="flex items-center gap-2 bg-gray-900/80 px-4 py-2 rounded-xl font-black text-[10px] text-white uppercase tracking-widest">
               <FaBan /> Out of Stock
             </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 text-xl truncate leading-tight">
              {item?.title || "Unnamed Product"}
            </h3>
            <p className="mt-1 font-medium text-orange-600 text-xs uppercase tracking-widest">
              {item?.brand || "Premium Quality"}
            </p>
          </div>
          <span className="font-bold text-[10px] text-gray-400 uppercase tracking-wider">
            {item?.category || "Accessory"}
          </span>
        </div>

        <div className="flex justify-between items-center mt-auto pt-4 border-gray-100 border-t">
          <div className="flex flex-col">
            {hasDiscount ? (
              <div className="flex flex-col">
                <span className="font-bold text-gray-400 text-xs line-through">${item?.price}</span>
                <span className="font-black text-red-600 text-2xl tracking-tighter">${item?.discountPrice}</span>
              </div>
            ) : (
              <span className="font-black text-gray-900 text-2xl tracking-tighter">
                ${item?.price || 0}
              </span>
            )}
          </div>
          
          {!isOutOfStock && (
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-slate-900 hover:bg-orange-500 px-5 py-3 rounded-xl font-bold text-white text-xs transition-colors"
            >
              Add to Cart <FaChevronRight size={10} />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const AllPetAccessoriesList = ({ accessories = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");

  // Filtering Logic
  const filteredAccessories = useMemo(() => {
    // নিশ্চিত করা হচ্ছে accessories একটি ভ্যালিড অ্যারে
    let result = Array.isArray(accessories) ? [...accessories] : [];
    
    // ম্যাপ করার আগে নাল ভ্যালুগুলো ফিল্টার করে বাদ দেওয়া হচ্ছে (অতিরিক্ত নিরাপত্তা)
    result = result.filter(item => item !== null && item !== undefined);

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

    // Sorting Logic
    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => (Number(a?.discountPrice) || Number(a?.price)) - (Number(b?.discountPrice) || Number(b?.price)));
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => (Number(b?.discountPrice) || Number(b?.price)) - (Number(a?.discountPrice) || Number(a?.price)));
    } else if (sortBy === "Featured") {
        result.sort((a, b) => (b?.featured ? 1 : -1));
    }
    
    return result;
  }, [accessories, searchQuery, selectedCategory, sortBy]);

  const categories = ["All", "Dog Gear", "Cat Comfort", "Fish Care", "Bird Gear", "Essentials"];

  return (
    <div className="bg-gray-50 px-4 sm:px-8 py-24 min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col items-center mx-auto mb-16 max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 bg-orange-100 mb-6 px-5 py-2 rounded-full font-black text-orange-600 text-xs uppercase tracking-widest">
          <Sparkles size={16} /> New Lifestyle Collection
        </div>
        <h2 className="font-black text-gray-900 text-5xl md:text-7xl leading-none tracking-tighter">
          Complete <span className="text-orange-500">Gear</span> Pantry
        </h2>
      </div>

      {/* Filter Bar */}
      <div className="bg-white shadow-sm hover:shadow-md mx-auto mb-16 p-5 border border-gray-100 rounded-[2.5rem] max-w-7xl transition-all duration-300">
        <div className="flex lg:flex-row flex-col items-center gap-6">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-50 py-4 pr-4 pl-14 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-orange-500/20 w-full font-bold text-gray-900 transition-all"
            />
            <FaSearch className="top-1/2 left-6 absolute text-gray-300 -translate-y-1/2" size={20} />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                    : "bg-gray-50 text-gray-500 hover:text-orange-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-50 px-6 py-4 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 w-full lg:w-48 font-bold text-gray-600 text-sm appearance-none cursor-pointer"
          >
            <option value="Recommended">Recommended</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
            <option value="Featured">Featured First</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-7xl">
        {filteredAccessories.length > 0 ? (
          filteredAccessories.map((item, index) => (
            <AccessoriesCard 
              key={item?._id?.toString() || `fallback-id-${index}`} 
              item={item} 
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
             <p className="font-bold text-gray-400 text-xl">No accessories found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPetAccessoriesList;