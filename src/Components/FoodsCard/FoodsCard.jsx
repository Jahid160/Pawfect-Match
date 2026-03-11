"use client";

import Link from "next/link";
import React, { useState, useMemo, useTransition } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  FaLeaf,
  FaShoppingCart,
  FaSearch,
  FaWeightHanging,
  FaChevronRight,
  FaBan,
  FaStar,
  FaFilter,
} from "react-icons/fa";
import { addToCart } from "@/action/server/cart";
import { useAuthModal } from "@/provider/AuthModalProvider";
import toast from "react-hot-toast";

// --- FoodCard Component ---
export const FoodCard = ({ food }) => {
  const foodId = food._id?.toString() || food.id;
  const { data: session } = useSession();
  const router = useRouter();
  const { openLoginModal } = useAuthModal();

  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  const hasDiscount =
    food.discountPrice && Number(food.discountPrice) < Number(food.price);

  const isOutOfStock = food.inStock === false || food.stock <= 0;

  const displayPrice = hasDiscount ? food.discountPrice : food.price;

  const discountPercent = hasDiscount
    ? Math.round(((food.price - food.discountPrice) / food.price) * 100)
    : 0;

  const handleAddToCart = () => {
  if (!session?.user?.email) {
    openLoginModal();
    return;
  }

  startTransition(async () => {
    const result = await addToCart({
      userEmail: session.user.email,
      foodId: food._id?.toString() || food.id,
      productName: food.productName,
      image: food.image,
      price: displayPrice,
      stock: food.stock,
      brand: food.brand,
      weight: food.weight,
      weightUnit: food.weightUnit,
      inStock: food.inStock,
    });

    if (result?.acknowledged || result?.insertedId || result?.success) {
      toast.success("Added to cart successfully 🛒");
    } else {
      toast.error(result?.message || "Failed to add to cart");
    }
  });
};

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        <Image
          src={food.image || "https://placehold.co/600x400?text=Pet+Food"}
          alt={food.productName || "Product"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className={`object-contain p-6 transition-transform duration-500 group-hover:scale-105 ${
            isOutOfStock ? "grayscale opacity-70" : ""
          }`}
        />

        {/* Top badges */}
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {hasDiscount && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
              {discountPercent}% Off
            </span>
          )}
          {food.featured && (
            <span className="rounded-full bg-orange-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
              Featured
            </span>
          )}
        </div>

        {/* Category badge */}
        <div className="absolute right-4 top-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-gray-700 shadow-sm backdrop-blur">
            {food.foodType || "Food"}
          </span>
        </div>

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/15 backdrop-blur-[2px]">
            <span className="flex items-center gap-2 rounded-xl bg-black/80 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
              <FaBan />
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick cart button */}
        {!isOutOfStock && (
          <button
            onClick={handleAddToCart}
            disabled={isPending}
            className="absolute bottom-4 right-4 flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-70"
            aria-label="Add to cart"
          >
            <FaShoppingCart size={18} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Brand and rating */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
            {food.brand || "Brand"}
          </span>

          <div className="flex items-center gap-1 text-sm text-amber-500">
            <FaStar />
            <span className="font-semibold text-gray-700">4.8</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 min-h-[56px] text-lg font-extrabold leading-snug text-gray-900">
          {food.productName}
        </h3>

        {/* Info row */}
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <FaWeightHanging className="text-orange-400" />
            <span className="font-medium">
              {food.weight}
              {food.weightUnit}
            </span>
          </div>

          <span className="h-1 w-1 rounded-full bg-gray-300"></span>

          <div className="flex items-center gap-1.5">
            <FaLeaf className="text-green-500" />
            <span className="font-medium">{food.category || "Pet Food"}</span>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-gray-100 pt-4">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <span className="text-sm font-medium text-gray-400 line-through">
                  ${food.price}
                </span>
                <span className="text-2xl font-extrabold tracking-tight text-red-500">
                  ${displayPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl font-extrabold tracking-tight text-gray-900">
                ${displayPrice}
              </span>
            )}
          </div>

          <Link
            href={`/pet-food/${foodId}`}
            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-500"
          >
            View Details <FaChevronRight size={10} />
          </Link>
        </div>

        {message && (
          <p className="mt-3 text-xs font-medium text-green-600">{message}</p>
        )}
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
        (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)
      );
    } else if (sortBy === "Price: High to Low") {
      result.sort(
        (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)
      );
    } else if (sortBy === "Newest") {
      result.reverse();
    }

    return result;
  }, [foods, searchQuery, selectedCategory, sortBy]);

  const categories = ["All", "Dry Food", "Wet Food", "Treats", "Supplements"];

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white px-4 py-14 sm:px-8">
      {/* Header */}
      <div className="mx-auto mb-12 max-w-7xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
          <FaLeaf />
          Premium Pet Nutrition
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Shop Healthy Food <br />
              for Your Pets
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-gray-600">
              Explore quality dry food, wet food, treats, and supplements made
              to support your pet’s daily health and nutrition.
            </p>
          </div>

          <div className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-bold text-gray-900">
              {filteredFoods.length}
            </span>{" "}
            products
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mx-auto mb-12 max-w-7xl rounded-3xl border border-orange-100 bg-white p-5 shadow-lg shadow-orange-100/40">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          {/* Search */}
          <div className="relative w-full xl:max-w-md">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search pet food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-4 text-sm font-medium text-gray-700 outline-none transition focus:border-orange-400 focus:bg-white"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-5 py-3 text-xs font-bold uppercase tracking-wider transition ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
              <FaFilter className="text-orange-500" />
              Sort by
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 outline-none focus:border-orange-400 focus:bg-white"
            >
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food, index) => (
            <FoodCard
              key={food._id?.toString() || food.id || `food-${index}`}
              food={food}
            />
          ))
        ) : (
          <div className="col-span-full rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center">
            <h3 className="text-xl font-bold text-gray-800">
              No products found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Try changing your search or category filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PetFoods;
