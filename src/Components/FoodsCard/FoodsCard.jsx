"use client";

import Link from "next/link";
import React, { useTransition } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShoppingCart,
  FaChevronRight,
  FaBan,
  FaStar,
  FaTag,
  FaWeightHanging,
  FaLeaf,
  FaSearch,
  FaFilter
} from "react-icons/fa";
import { Sparkle } from "lucide-react";
import { addToCart } from "@/action/server/cart";
import { useAuthModal } from "@/provider/AuthModalProvider";
import toast from "react-hot-toast";
import { useState, useMemo } from "react";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

// --- FoodCard Component (Updated to match AccessoriesCard Design) ---
export const FoodCard = ({ food }) => {
  const { data: session } = useSession();
  const { openLoginModal } = useAuthModal();
  const [isPending, startTransition] = useTransition();

  const foodId = food._id?.toString() || food.id;
  const hasDiscount = food.discountPrice && Number(food.discountPrice) < Number(food.price);
  const isOutOfStock = Number(food.stock || 0) <= 0;
  const displayPrice = hasDiscount ? food.discountPrice : food.price;
  const discountPercent = hasDiscount ? Math.round(((food.price - food.discountPrice) / food.price) * 100) : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!session?.user?.email) {
      openLoginModal();
      return;
    }

    startTransition(async () => {
      const result = await addToCart({
        userEmail: session.user.email,
        productId: foodId,
        productName: food.productName,
        image: food.image,
        price: displayPrice,
        stock: Number(food.stock),
        brand: food.brand,
        category: food.category,
        productType: "food",
        weight: `${food.weight || ""}${food.weightUnit || ""}`, // e.g., "87g"
        inStock: !isOutOfStock,
      });

      if (result?.success || result?.acknowledged) {
        toast.success("Added to cart! 🛒");
      } else {
        toast.error(result?.message || "Failed to add to cart");
      }
    });
  };

  return (
    <motion.div
      variants={cardVariants}
      layout
      className="group relative flex flex-col bg-white shadow-sm hover:shadow-2xl border border-gray-200 rounded-3xl overflow-hidden transition-all hover:-translate-y-1 duration-300"
    >
      {/* Image Section - Matching Accessories Style */}
      <div className="relative bg-gradient-to-br from-orange-50 via-white to-yellow-50 w-full h-64 overflow-hidden">
        <Image
          src={food.image || "https://placehold.co/600x400?text=Pet+Food"}
          alt={food.productName || "Product"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-contain p-6 transition-transform duration-500 group-hover:scale-110 ${isOutOfStock ? "grayscale opacity-70" : ""}`}
        />

        {/* Badges */}
        <div className="top-4 left-4 z-10 absolute flex flex-col gap-2">
          {hasDiscount && (
            <span className="flex items-center gap-1 bg-red-500 shadow-lg px-3 py-1 rounded-full font-bold text-[10px] text-white uppercase tracking-wide">
              <FaTag size={8} /> {discountPercent}% Off
            </span>
          )}
          {food.featured && (
            <span className="flex items-center gap-1 bg-orange-500 shadow-lg px-3 py-1 rounded-full font-bold text-[10px] text-white uppercase tracking-wide">
              <Sparkle size={10} /> Featured
            </span>
          )}
        </div>

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="z-10 absolute inset-0 flex justify-center items-center bg-black/15 backdrop-blur-[2px]">
            <span className="flex items-center gap-2 bg-black/80 px-4 py-2 rounded-xl font-bold text-[10px] text-white uppercase tracking-wider">
              <FaBan /> Out of Stock
            </span>
          </div>
        )}

        {/* Quick cart button */}
        {!isOutOfStock && (
          <button
            onClick={handleAddToCart}
            disabled={isPending}
            className="right-4 bottom-4 z-20 absolute flex justify-center items-center bg-orange-500 hover:bg-gray-900 opacity-0 disabled:opacity-50 group-hover:opacity-100 shadow-lg rounded-full w-12 h-12 text-white hover:scale-110 transition-all translate-y-3 group-hover:translate-y-0 duration-300"
          >
            {isPending ? <span className="loading loading-spinner loading-xs"></span> : <FaShoppingCart size={18} />}
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-[10px] text-orange-500 uppercase tracking-[0.2em]">
            {food.brand || "Premium Food"}
          </span>
          <div className="flex items-center gap-1 text-amber-500 text-xs">
            <FaStar /> <span className="font-semibold text-gray-700">4.8</span>
          </div>
        </div>

        <Link href={`/pet-food/${foodId}`}>
          <h3 className="mb-2 min-h-[48px] font-extrabold text-gray-900 hover:text-orange-500 text-lg line-clamp-2 leading-tight transition-colors cursor-pointer">
            {food.productName}
          </h3>
        </Link>

        {/* Meta info like weight */}
        <div className="flex items-center gap-3 mb-4 font-bold text-[11px] text-gray-500 uppercase tracking-wider">
           <span className="flex items-center gap-1">
             <FaWeightHanging className="text-orange-400" /> {food.weight}{food.weightUnit}
           </span>
           <span className="bg-gray-300 rounded-full w-1 h-1"></span>
           <span className="flex items-center gap-1 uppercase">
             {food.foodType || "Dry Food"}
           </span>
        </div>

        {/* Price + CTA */}
        <div className="flex justify-between items-end gap-3 mt-auto pt-4 border-gray-100 border-t">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <span className="font-medium text-[10px] text-gray-400 line-through">${food.price}</span>
                <span className="font-black text-red-500 text-xl leading-none tracking-tight">${food.discountPrice}</span>
              </>
            ) : (
              <span className="font-black text-gray-900 text-xl leading-none tracking-tight">${food.price || 0}</span>
            )}
          </div>

          <Link
            href={`/pet-food/${foodId}`}
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-orange-500 px-4 py-2.5 rounded-xl font-bold text-[10px] text-gray-600 hover:text-white uppercase tracking-wider transition-all"
          >
            Details <FaChevronRight size={8} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main PetFoods Component (Filters & Grid) ---
const PetFoods = ({ foods = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");

  const filteredFoods = useMemo(() => {
    let result = Array.isArray(foods) ? [...foods] : [];

    if (searchQuery) {
      result = result.filter(
        (item) =>
          item.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter(
        (item) => item.foodType?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (sortBy === "Newest") {
      result.reverse();
    }

    return result;
  }, [foods, searchQuery, selectedCategory, sortBy]);

  const categories = ["All", "Dry Food", "Wet Food", "Treats", "Supplements"];

  return (
    <section className="bg-gradient-to-b from-orange-50 via-white to-white px-4 sm:px-8 py-14 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto mb-12 max-w-7xl"
      >
        <div className="inline-flex items-center gap-2 bg-orange-100 mb-6 px-4 py-2 rounded-full font-bold text-orange-600 text-xs uppercase tracking-[0.2em]">
          <FaLeaf />
          Premium Pet Nutrition
        </div>

        <div className="flex lg:flex-row flex-col lg:justify-between lg:items-end gap-4">
          <div className="max-w-2xl">
            <h2 className="font-black text-gray-900 text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight">
              Shop Healthy Food <br />
              for Your Pets
            </h2>
            <p className="mt-4 max-w-xl text-gray-600 text-base leading-7">
              Explore quality nutrition made to support your pet’s daily health.
            </p>
          </div>

          <div className="font-medium text-gray-500 text-sm">
            Showing <span className="font-bold text-gray-900">{filteredFoods.length}</span> healthy options
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white shadow-lg shadow-orange-100/40 mx-auto mb-12 p-5 border border-orange-100 rounded-3xl max-w-7xl"
      >
        <div className="flex xl:flex-row flex-col xl:justify-between xl:items-center gap-4">
          <div className="relative w-full xl:max-w-md">
            <FaSearch className="top-1/2 left-5 absolute text-gray-400 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search pet food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-50 focus:bg-white py-4 pr-4 pl-12 border border-gray-100 focus:border-orange-400 rounded-2xl outline-none w-full font-medium text-gray-700 text-sm transition"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-5 py-3 text-[10px] font-bold uppercase tracking-wider transition ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 font-bold text-gray-500 text-xs uppercase tracking-widest">
              <FaFilter className="text-orange-500" /> Sort
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-50 px-4 py-3 border border-gray-100 focus:border-orange-400 rounded-2xl outline-none font-bold text-gray-700 text-xs"
            >
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-7xl"
      >
        <AnimatePresence mode="popLayout">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food, index) => (
              <FoodCard
                key={food._id?.toString() || food.id || `food-${index}`}
                food={food}
              />
            ))
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full bg-white py-20 border border-gray-300 border-dashed rounded-3xl text-center"
            >
              <h3 className="font-bold text-gray-800 text-xl">No food items found</h3>
              <p className="mt-2 text-gray-500 text-sm">Try adjusting your filters.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default PetFoods;