"use client";

import Link from "next/link";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  FaLeaf,
  FaShoppingCart,
  FaSearch,
  FaWeightHanging,
  FaChevronRight,
  FaBan,
} from "react-icons/fa";

// --- FoodCard Component ---
export const FoodCard = ({ food }) => {
  const foodId = food._id?.toString() || food.id;
  // logic based on your new JSON: discountPrice is 111 while price is 934
  const hasDiscount = food.discountPrice && food.discountPrice < food.price;
  const isOutOfStock = food.inStock === false || food.stock <= 0;

  return (
    <div className="group relative flex flex-col bg-base-100 border border-base-300 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-2">
      
      {/* Image & Overlay Section */}
      <div className="relative bg-secondary/30 w-full h-64 overflow-hidden group-hover:bg-secondary/50 transition-colors duration-500">
        <Image
          src={food.image || "https://placehold.co/600x400?text=Pet+Food"}
          alt={food.productName || "Product"}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className={`p-8 w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out ${isOutOfStock ? 'grayscale opacity-60' : ''}`}
        />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {hasDiscount && (
            <span className="bg-error px-3 py-1 rounded-full font-black text-[10px] text-white uppercase tracking-tighter shadow-lg">
              Sale
            </span>
          )}
          {food.featured && (
            <span className="bg-primary px-3 py-1 rounded-full font-black text-[10px] text-white uppercase tracking-tighter shadow-lg">
              Featured
            </span>
          )}
        </div>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral/10 backdrop-blur-[2px]">
             <span className="bg-neutral/80 px-4 py-2 rounded-xl font-black text-white text-[10px] uppercase tracking-widest flex items-center gap-2">
               <FaBan /> Out of Stock
             </span>
          </div>
        )}

        {/* Quick Add To Cart */}
        {!isOutOfStock && (
          <button className="right-4 bottom-4 absolute flex justify-center items-center bg-primary shadow-xl opacity-0 group-hover:opacity-100 rounded-2xl w-12 h-12 text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 active:scale-95">
            <FaShoppingCart size={20} />
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-6">
        <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-primary text-[10px] uppercase tracking-widest">{food.brand}</span>
                <span className="text-[10px] font-bold text-neutral/40 uppercase">{food.foodType}</span>
            </div>
            <h3 className="line-clamp-1 font-black text-neutral text-xl tracking-tight leading-tight">
                {food.productName}
            </h3>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-1.5 text-neutral/60 text-xs">
            <FaWeightHanging className="text-primary/60" />
            <span className="font-bold">{food.weight}{food.weightUnit}</span>
          </div>
          <div className="bg-base-300 w-1 h-1 rounded-full"></div>
          <div className="flex items-center gap-1.5 text-neutral/60 text-xs">
            <FaLeaf className="text-success" />
            <span className="font-bold">{food.category}</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex flex-col">
            {hasDiscount ? (
              <div className="flex flex-col">
                <span className="text-neutral/30 text-xs line-through font-bold">${food.price}</span>
                <span className="font-black text-error text-2xl tracking-tighter">${food.discountPrice}</span>
              </div>
            ) : (
              <span className="font-black text-neutral text-2xl tracking-tighter">${food.price}</span>
            )}
          </div>
          
          <Link
            href={`/pet-food/${foodId}`}
            className="flex items-center gap-2 bg-neutral hover:bg-primary px-5 py-3 rounded-2xl font-bold text-white text-xs transition-all active:scale-95"
          >
            Details <FaChevronRight size={10} />
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- Main PetFoods Component ---
const PetFoods = ({ foods = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");

  const filteredFoods = useMemo(() => {
    let result = Array.isArray(foods) ? [...foods] : [];
    
    if (searchQuery) {
      result = result.filter(item => 
        item.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory !== "All") {
      result = result.filter(item => 
        item.foodType?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    }
    
    return result;
  }, [foods, searchQuery, selectedCategory, sortBy]);

  const categories = ["All", "Dry Food", "Wet Food", "Treats", "Supplements"];

  return (
    <div className="bg-base-200 px-4 sm:px-8 py-20 min-h-screen font-sans">
      <div className="flex flex-col items-center mx-auto mb-16 max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 bg-secondary mb-6 px-4 py-2 rounded-full font-black text-primary text-xs uppercase tracking-[0.2em]">
          <FaLeaf className="animate-bounce" /> Nutrition First
        </div>
        <h2 className="font-black text-neutral text-5xl md:text-7xl tracking-tighter leading-none">
          The <span className="text-primary italic">Healthy</span> Pantry
        </h2>
      </div>

      <div className="bg-white/80 backdrop-blur-xl shadow-2xl shadow-neutral/5 mx-auto mb-16 p-4 border border-white rounded-[2.5rem] max-w-6xl">
        <div className="flex lg:flex-row flex-col items-center gap-4">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-base-200/50 py-4 pr-4 pl-14 border-none rounded-[1.8rem] focus:ring-2 focus:ring-primary/20 w-full font-bold text-neutral transition-all"
            />
            <FaSearch className="top-1/2 left-6 absolute text-neutral/30 -translate-y-1/2" size={20} />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-4 rounded-[1.8rem] font-black text-xs uppercase tracking-widest transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-white text-neutral/40 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-7xl">
        {filteredFoods.map((food, index) => (
          <FoodCard key={food._id?.toString() || `food-${index}`} food={food} />
        ))}
      </div>
    </div>
  );
};

export default PetFoods;