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
  FaSearch,
  FaFilter,
  FaChevronLeft,
  FaLeaf,
} from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import { addToCart } from "@/action/server/cart";
import { useAuthModal } from "@/provider/AuthModalProvider";
import toast from "react-hot-toast";
import { useState, useMemo, useEffect, useRef } from "react";

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

// --- FoodCard Component ---
export const FoodCard = ({ food }) => {
  const { data: session } = useSession();
  const { openLoginModal } = useAuthModal();
  const [isPending, startTransition] = useTransition();

  const foodId = food._id?.toString() || food.id;
  const hasDiscount =
    food.discountPrice && Number(food.discountPrice) < Number(food.price);
  const isOutOfStock = Number(food.stock || 0) <= 0;
  const displayPrice = hasDiscount ? food.discountPrice : food.price;
  const discountPercent = hasDiscount
    ? Math.round(((food.price - food.discountPrice) / food.price) * 100)
    : 0;

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
        weight: `${food.weight || ""}${food.weightUnit || ""}`,
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
      className="group relative flex flex-col bg-white shadow-sm hover:shadow-2xl border border-gray-100 rounded-3xl overflow-hidden transition-all duration-300"
    >
      <div className="relative bg-gradient-to-br from-orange-50 via-white to-yellow-50 w-full h-56 sm:h-64 overflow-hidden">
        <Image
          src={food.image || "https://placehold.co/600x400?text=Pet+Food"}
          alt={food.productName || "Product"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-contain p-6 transition-transform duration-500 group-hover:scale-110 ${
            isOutOfStock ? "grayscale opacity-70" : ""
          }`}
        />

        <div className="top-3 sm:top-4 left-3 sm:left-4 z-10 absolute flex flex-col gap-2">
          {hasDiscount && (
            <span className="flex items-center gap-1 bg-red-500 shadow-lg px-2 sm:px-3 py-1 rounded-full font-bold text-[9px] text-white sm:text-[10px] uppercase tracking-wide">
              <FaTag size={8} /> {discountPercent}% Off
            </span>
          )}
        </div>

        {isOutOfStock && (
          <div className="z-10 absolute inset-0 flex justify-center items-center bg-black/10 backdrop-blur-[1px]">
            <span className="flex items-center gap-2 bg-black/80 px-4 py-2 rounded-xl font-bold text-[10px] text-white uppercase tracking-wider">
              <FaBan /> Out of Stock
            </span>
          </div>
        )}

        {!isOutOfStock && (
          <button
            onClick={handleAddToCart}
            disabled={isPending}
            className="right-4 bottom-4 z-20 absolute flex justify-center items-center bg-orange-500 hover:bg-gray-900 md:group-hover:opacity-100 md:opacity-0 disabled:opacity-50 shadow-lg rounded-full w-10 sm:w-12 h-10 sm:h-12 text-white hover:scale-110 transition-all md:group-hover:translate-y-0 md:translate-y-3 duration-300"
          >
            {isPending ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <FaShoppingCart size={16} />
            )}
          </button>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <div className="flex justify-between items-center mb-1.5">
          <span className="font-bold text-[9px] text-orange-500 sm:text-[10px] uppercase tracking-[0.15em]">
            {food.brand || "Premium Food"}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-amber-500 sm:text-xs">
            <FaStar />
            <span className="font-semibold text-gray-700">4.8</span>
          </div>
        </div>

        <Link href={`/pet-food/${foodId}`}>
          <h3 className="mb-2 min-h-[40px] sm:min-h-[48px] font-extrabold text-gray-900 hover:text-orange-500 text-base sm:text-lg line-clamp-2 leading-tight transition-colors">
            {food.productName}
          </h3>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 mb-4 font-bold text-[10px] text-gray-500 sm:text-[11px] uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <FaWeightHanging className="text-orange-400" />
            {food.weight}{food.weightUnit}
          </span>
          <span className="bg-gray-300 rounded-full w-1 h-1"></span>
          <span className="flex items-center gap-1 uppercase">
            {food.foodType || "Dry Food"}
          </span>
        </div>

        <div className="flex justify-between items-end gap-2 mt-auto pt-4 border-gray-100 border-t">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <span className="font-medium text-[9px] text-gray-400 sm:text-[10px] line-through">
                  ${food.price}
                </span>
                <span className="font-black text-red-500 text-lg sm:text-xl leading-none">
                  ${food.discountPrice}
                </span>
              </>
            ) : (
              <span className="font-black text-gray-900 text-lg sm:text-xl leading-none">
                ${food.price || 0}
              </span>
            )}
          </div>

          <Link
            href={`/pet-food/${foodId}`}
            className="inline-flex items-center gap-1 sm:gap-2 bg-gray-100 hover:bg-orange-500 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-[9px] text-gray-600 sm:text-[10px] hover:text-white uppercase tracking-wider transition-all"
          >
            Details <FaChevronRight size={8} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main PetFoods Component ---
const PetFoods = ({ foods = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const dropdownRef = useRef(null);
  const FOODS_PER_PAGE = 12;
  const categories = ["All", "Dry Food", "Wet Food", "Treats", "Supplements"];
  const sortOptions = ["Recommended", "Price: Low to High", "Price: High to Low", "Newest"];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsSortOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredFoods = useMemo(() => {
    let result = Array.isArray(foods) ? [...foods] : [];
    if (searchQuery) {
      result = result.filter(f => 
        f.productName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        f.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory !== "All") {
      result = result.filter(f => f.foodType?.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (sortBy === "Price: Low to High") result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    else if (sortBy === "Price: High to Low") result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    else if (sortBy === "Newest") result.reverse();
    return result;
  }, [foods, searchQuery, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredFoods.length / FOODS_PER_PAGE);
  const paginatedFoods = filteredFoods.slice((currentPage - 1) * FOODS_PER_PAGE, currentPage * FOODS_PER_PAGE);

  return (
    <section className="bg-gradient-to-b from-orange-50 via-white to-white px-4 sm:px-6 lg:px-12 py-10 sm:py-20 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 mb-4 sm:mb-6 px-4 py-2 rounded-full font-bold text-[10px] text-orange-600 sm:text-xs uppercase tracking-widest">
            <FaLeaf /> Premium Pet Nutrition
          </div>
          <h2 className="font-black text-gray-900 text-3xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight">
            Shop <span className="text-orange-500">Healthy Food</span> <br className="hidden sm:block" /> for Your Pets
          </h2>
          <p className="mt-4 max-w-xl text-gray-600 text-sm sm:text-base leading-relaxed">
            Explore quality nutrition made to support your pet’s daily health and vitality.
          </p>
        </motion.div>

        {/* Filters Wrapper */}
        <div className="bg-white shadow-orange-100/30 shadow-xl mb-10 p-4 sm:p-6 border border-orange-50 rounded-3xl">
          <div className="flex lg:flex-row flex-col gap-4">
            <div className="relative flex-1">
              <FaSearch className="top-1/2 left-4 absolute text-gray-400 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-50 focus:bg-white py-3 sm:py-4 pr-4 pl-11 border border-gray-100 focus:border-orange-300 rounded-2xl outline-none w-full font-medium text-gray-700 text-xs sm:text-sm transition"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl sm:rounded-full px-4 sm:px-5 py-2.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition ${
                    selectedCategory === cat ? "bg-orange-500 text-white shadow-lg" : "bg-gray-100 text-gray-500 hover:bg-orange-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex justify-between items-center gap-3 bg-gray-900 px-5 py-3 rounded-2xl w-full lg:w-auto font-bold text-[10px] text-white uppercase tracking-widest transition-all"
              >
                <div className="flex items-center gap-2"><FaFilter size={10} /> {sortBy}</div>
                <ChevronDown size={14} className={isSortOpen ? "rotate-180" : ""} />
              </button>
              <AnimatePresence>
                {isSortOpen && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="right-0 z-50 absolute bg-white shadow-2xl mt-2 border border-gray-100 rounded-2xl w-full sm:w-52 overflow-hidden">
                    {sortOptions.map(opt => (
                      <button key={opt} onClick={() => { setSortBy(opt); setIsSortOpen(false); }} className="block hover:bg-orange-50 p-4 w-full font-bold text-gray-600 text-xs text-left uppercase transition-colors">{opt}</button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
           <p className="font-bold text-[10px] text-gray-400 sm:text-xs uppercase tracking-widest">
             Results: <span className="text-gray-900">{filteredFoods.length} items</span>
           </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="gap-4 sm:gap-6 lg:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {paginatedFoods.length > 0 ? (
              paginatedFoods.map((food) => <FoodCard key={food._id} food={food} />)
            ) : (
              <motion.div className="col-span-full py-20 text-center">
                <h3 className="font-bold text-gray-400 text-xl italic tracking-tighter">No items found matching your search.</h3>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="bg-white disabled:opacity-30 shadow-sm p-3 border border-gray-200 rounded-xl"
            >
              <FaChevronLeft size={12} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`h-10 w-10 rounded-xl font-bold text-xs transition ${currentPage === i + 1 ? "bg-orange-500 text-white" : "bg-white text-gray-500 border border-gray-200"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="bg-white disabled:opacity-30 shadow-sm p-3 border border-gray-200 rounded-xl"
            >
              <FaChevronRight size={12} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PetFoods;