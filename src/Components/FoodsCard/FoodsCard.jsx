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
  FaFilter,
  FaChevronLeft,
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
      className="group relative flex flex-col bg-white shadow-sm hover:shadow-2xl border border-gray-200 rounded-3xl overflow-hidden transition-all hover:-translate-y-1 duration-300"
    >
      <div className="relative bg-gradient-to-br from-orange-50 via-white to-yellow-50 w-full h-64 overflow-hidden">
        <Image
          src={food.image || "https://placehold.co/600x400?text=Pet+Food"}
          alt={food.productName || "Product"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-contain p-6 transition-transform duration-500 group-hover:scale-110 ${
            isOutOfStock ? "grayscale opacity-70" : ""
          }`}
        />

        <div className="top-4 left-4 z-10 absolute flex flex-col gap-2">
          {hasDiscount && (
            <span className="flex items-center gap-1 bg-red-500 shadow-lg px-3 py-1 rounded-full font-bold text-[10px] text-white uppercase tracking-wide">
              <FaTag size={8} /> {discountPercent}% Off
            </span>
          )}
        </div>

        {isOutOfStock && (
          <div className="z-10 absolute inset-0 flex justify-center items-center bg-black/15 backdrop-blur-[2px]">
            <span className="flex items-center gap-2 bg-black/80 px-4 py-2 rounded-xl font-bold text-[10px] text-white uppercase tracking-wider">
              <FaBan /> Out of Stock
            </span>
          </div>
        )}

        {!isOutOfStock && (
          <button
            onClick={handleAddToCart}
            disabled={isPending}
            className="right-4 bottom-4 z-20 absolute flex justify-center items-center bg-orange-500 hover:bg-gray-900 opacity-0 disabled:opacity-50 group-hover:opacity-100 shadow-lg rounded-full w-12 h-12 text-white hover:scale-110 transition-all translate-y-3 group-hover:translate-y-0 duration-300"
          >
            {isPending ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <FaShoppingCart size={18} />
            )}
          </button>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-[10px] text-orange-500 uppercase tracking-[0.2em]">
            {food.brand || "Premium Food"}
          </span>
          <div className="flex items-center gap-1 text-amber-500 text-xs">
            <FaStar />
            <span className="font-semibold text-gray-700">4.8</span>
          </div>
        </div>

        <Link href={`/pet-food/${foodId}`}>
          <h3 className="mb-2 min-h-[48px] font-extrabold text-gray-900 hover:text-orange-500 text-lg line-clamp-2 leading-tight transition-colors cursor-pointer">
            {food.productName}
          </h3>
        </Link>

        <div className="flex items-center gap-3 mb-4 font-bold text-[11px] text-gray-500 uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <FaWeightHanging className="text-orange-400" />
            {food.weight}
            {food.weightUnit}
          </span>
          <span className="bg-gray-300 rounded-full w-1 h-1"></span>
          <span className="flex items-center gap-1 uppercase">
            {food.foodType || "Dry Food"}
          </span>
        </div>

        <div className="flex justify-between items-end gap-3 mt-auto pt-4 border-gray-100 border-t">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <span className="font-medium text-[10px] text-gray-400 line-through">
                  ${food.price}
                </span>
                <span className="font-black text-red-500 text-xl leading-none tracking-tight">
                  ${food.discountPrice}
                </span>
              </>
            ) : (
              <span className="font-black text-gray-900 text-xl leading-none tracking-tight">
                ${food.price || 0}
              </span>
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
  const sortOptions = [
    "Recommended",
    "Price: Low to High",
    "Price: High to Low",
    "Newest",
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
        (item) =>
          item.foodType?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (sortBy === "Price: Low to High") {
      result.sort(
        (a, b) =>
          Number(a.discountPrice || a.price || 0) -
          Number(b.discountPrice || b.price || 0)
      );
    } else if (sortBy === "Price: High to Low") {
      result.sort(
        (a, b) =>
          Number(b.discountPrice || b.price || 0) -
          Number(a.discountPrice || a.price || 0)
      );
    } else if (sortBy === "Newest") {
      result.reverse();
    }

    return result;
  }, [foods, searchQuery, selectedCategory, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredFoods.length / FOODS_PER_PAGE);

  const paginatedFoods = useMemo(() => {
    const startIndex = (currentPage - 1) * FOODS_PER_PAGE;
    const endIndex = startIndex + FOODS_PER_PAGE;
    return filteredFoods.slice(startIndex, endIndex);
  }, [filteredFoods, currentPage]);

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
              Shop <span className="text-orange-500">Healthy Food</span>  <br />
              for Your Pets
            </h2>
            <p className="mt-4 max-w-xl text-gray-600 text-base leading-7">
              Explore quality nutrition made to support your pet’s daily health.
            </p>
          </div>

          {/* <div className="font-medium text-gray-500 text-sm">
            Showing{" "}
            <span className="font-bold text-gray-900">{filteredFoods.length}</span>{" "}
            healthy options
          </div> */}
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

          {/* Custom Sort Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-3 bg-gray-900 hover:bg-orange-600 shadow-gray-200 shadow-lg px-5 py-3 rounded-2xl font-bold text-[10px] text-white uppercase tracking-widest active:scale-95 transition-all"
            >
              <FaFilter className={isSortOpen ? "animate-pulse" : ""} />
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
      </motion.div>

      <div className="flex justify-between items-center mx-auto mb-8 max-w-7xl">
        <p className="font-semibold text-gray-500 text-sm">
          Showing <span className="text-orange-500">{paginatedFoods.length}</span>{" "}
          of <span className="text-gray-800">{filteredFoods.length}</span> food
          items
        </p>
        {totalPages > 1 && (
          <p className="font-semibold text-gray-500 text-sm">
            Page <span className="text-gray-800">{currentPage}</span> of{" "}
            <span className="text-gray-800">{totalPages}</span>
          </p>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-7xl"
      >
        <AnimatePresence mode="popLayout">
          {paginatedFoods.length > 0 ? (
            paginatedFoods.map((food, index) => (
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
              <h3 className="font-bold text-gray-800 text-xl">
                No food items found
              </h3>
              <p className="mt-2 text-gray-500 text-sm">
                Try adjusting your filters.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {filteredFoods.length > FOODS_PER_PAGE && (
        <div className="flex flex-wrap justify-center items-center gap-3 mx-auto mt-14 max-w-7xl">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 bg-white disabled:opacity-50 shadow-sm px-5 py-3 border border-gray-200 hover:border-orange-200 rounded-2xl font-bold text-gray-600 hover:text-orange-500 text-sm transition disabled:cursor-not-allowed"
          >
            <FaChevronLeft size={12} />
            Prev
          </button>

          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span
                key={`dots-${index}`}
                className="px-2 font-bold text-gray-400 text-sm"
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
            className="flex items-center gap-2 bg-white disabled:opacity-50 shadow-sm px-5 py-3 border border-gray-200 hover:border-orange-200 rounded-2xl font-bold text-gray-600 hover:text-orange-500 text-sm transition disabled:cursor-not-allowed"
          >
            Next
            <FaChevronRight size={12} />
          </button>
        </div>
      )}
    </section>
  );
};

export default PetFoods;
