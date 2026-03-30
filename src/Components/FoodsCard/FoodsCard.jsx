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
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        <Image
          src={food.image || "https://placehold.co/600x400?text=Pet+Food"}
          alt={food.productName || "Product"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-contain p-6 transition-transform duration-500 group-hover:scale-110 ${
            isOutOfStock ? "grayscale opacity-70" : ""
          }`}
        />

        <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
          {hasDiscount && (
            <span className="flex items-center gap-1 rounded-full bg-red-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg">
              <FaTag size={8} /> {discountPercent}% Off
            </span>
          )}
        </div>

        {isOutOfStock && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/15 backdrop-blur-[2px]">
            <span className="flex items-center gap-2 rounded-xl bg-black/80 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white">
              <FaBan /> Out of Stock
            </span>
          </div>
        )}

        {!isOutOfStock && (
          <button
            onClick={handleAddToCart}
            disabled={isPending}
            className="absolute bottom-4 right-4 z-20 flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-orange-500 text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-110 hover:bg-gray-900 disabled:opacity-50"
          >
            {isPending ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <FaShoppingCart size={18} />
            )}
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">
            {food.brand || "Premium Food"}
          </span>
          <div className="flex items-center gap-1 text-xs text-amber-500">
            <FaStar />
            <span className="font-semibold text-gray-700">4.8</span>
          </div>
        </div>

        <Link href={`/pet-food/${foodId}`}>
          <h3 className="mb-2 min-h-[48px] cursor-pointer text-lg font-extrabold leading-tight text-gray-900 transition-colors line-clamp-2 hover:text-orange-500">
            {food.productName}
          </h3>
        </Link>

        <div className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-wider text-gray-500">
          <span className="flex items-center gap-1">
            <FaWeightHanging className="text-orange-400" />
            {food.weight}
            {food.weightUnit}
          </span>
          <span className="h-1 w-1 rounded-full bg-gray-300"></span>
          <span className="flex items-center gap-1 uppercase">
            {food.foodType || "Dry Food"}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-gray-100 pt-4">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <span className="text-[10px] font-medium text-gray-400 line-through">
                  ${food.price}
                </span>
                <span className="text-xl font-black leading-none tracking-tight text-red-500">
                  ${food.discountPrice}
                </span>
              </>
            ) : (
              <span className="text-xl font-black leading-none tracking-tight text-gray-900">
                ${food.price || 0}
              </span>
            )}
          </div>

          <Link
            href={`/pet-food/${foodId}`}
            className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-gray-600 transition-all hover:bg-orange-500 hover:text-white"
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
    <section className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white px-4 py-14 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto mb-12 max-w-7xl"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
          <FaLeaf />
          Premium Pet Nutrition
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black leading-[1.1] tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Shop Healthy Food <br />
              for Your Pets
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-gray-600">
              Explore quality nutrition made to support your pet’s daily health.
            </p>
          </div>

          {/* <div className="text-sm font-medium text-gray-500">
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
        className="mx-auto mb-12 max-w-7xl rounded-3xl border border-orange-100 bg-white p-5 shadow-lg shadow-orange-100/40"
      >
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full xl:max-w-md">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search pet food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-gray-100 bg-gray-50 py-4 pl-12 pr-4 text-sm font-medium text-gray-700 outline-none transition focus:border-orange-400 focus:bg-white"
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
              className="flex items-center gap-3 rounded-2xl bg-gray-900 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg shadow-gray-200 transition-all active:scale-95 hover:bg-orange-600"
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
      </motion.div>

      <div className="mx-auto mb-8 flex max-w-7xl items-center justify-between">
        <p className="text-sm font-semibold text-gray-500">
          Showing <span className="text-orange-500">{paginatedFoods.length}</span>{" "}
          of <span className="text-gray-800">{filteredFoods.length}</span> food
          items
        </p>
        {totalPages > 1 && (
          <p className="text-sm font-semibold text-gray-500">
            Page <span className="text-gray-800">{currentPage}</span> of{" "}
            <span className="text-gray-800">{totalPages}</span>
          </p>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
              className="col-span-full rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center"
            >
              <h3 className="text-xl font-bold text-gray-800">
                No food items found
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Try adjusting your filters.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {filteredFoods.length > FOODS_PER_PAGE && (
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
    </section>
  );
};

export default PetFoods;
