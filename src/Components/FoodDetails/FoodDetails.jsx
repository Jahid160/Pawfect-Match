"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaWeightHanging,
  FaBoxOpen,
  FaTag,
  FaShoppingCart,
  FaTimesCircle,
  FaCheckCircle,
  FaLeaf,
} from "react-icons/fa";
import { addToCart } from "@/action/server/cart";
import { useAuthModal } from "@/provider/AuthModalProvider";
import { useCartStore } from "@/lib/useCartStore";
import toast from "react-hot-toast";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const slideIn = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const FoodDetails = ({ food }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { openLoginModal } = useAuthModal();
  const [isPending, startTransition] = useTransition();
  const incrementCart = useCartStore((state) => state.incrementCart);

  if (!food?._id) {
    return (
      <div className="flex flex-col justify-center items-center bg-gray-50 min-h-screen">
        <FaTimesCircle className="mb-4 text-red-500 text-6xl animate-bounce" />
        <h2 className="font-black text-gray-900 text-3xl tracking-tight">Food not found</h2>
        <Link href="/petfoods" className="bg-orange-500 hover:bg-orange-600 shadow-lg mt-8 px-8 py-3 rounded-2xl font-bold text-white transition-all">
          Back to Foods
        </Link>
      </div>
    );
  }

  const hasDiscount = food.discountPrice && Number(food.discountPrice) < Number(food.price);
  const isOutOfStock = food.inStock === false || food.stock <= 0;
  const finalPrice = hasDiscount ? food.discountPrice : food.price;

  // --- UPDATED Add to Cart Logic ---
  const handleAddToCart = () => {
    if (!session?.user?.email) {
      openLoginModal();
      return;
    }

    startTransition(async () => {
      const result = await addToCart({
        userEmail: session.user.email,
        productId: food._id.toString(), // Unified key
        productName: food.productName,
        image: food.image,
        price: finalPrice,
        stock: Number(food.stock),
        brand: food.brand,
        weight: food.weight,
        weightUnit: food.weightUnit,
        productType: "food", // Identified as food
        inStock: !isOutOfStock,
      });

      if (result?.success || result?.acknowledged) {
        toast.success(`${food.productName} added to cart! 🛒`);
        incrementCart(1);
      } else {
        toast.error(result?.message || "Something went wrong");
      }
    });
  };

  const handleBuyNow = () => {
    if (!session?.user?.email) {
      openLoginModal();
      return;
    }
    // Redirecting to checkout with common logic
    router.push(`/checkout?mode=buy-now&productId=${food._id}&type=food`);
  };

  return (
    <div className="bg-gradient-to-b from-orange-50/50 to-white px-4 sm:px-8 py-12 min-h-screen overflow-hidden font-sans">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            href="/petfoods"
            className="group flex items-center gap-2 mb-8 font-bold text-gray-500 hover:text-orange-500 transition-all"
          >
            <FaArrowLeft className="transition-transform group-hover:-translate-x-1" /> Back to foods
          </Link>
        </motion.div>

        <div className="gap-12 grid md:grid-cols-2 bg-white shadow-2xl shadow-orange-100/50 p-6 md:p-12 border border-orange-50 rounded-[3rem]">
          {/* Left: Image Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideIn}
            className="relative flex justify-center items-center bg-gray-50 rounded-[2.5rem] min-h-[400px] md:min-h-[500px] overflow-hidden"
          >
            {hasDiscount && (
              <span className="top-6 left-6 z-10 absolute bg-red-500 shadow-lg px-5 py-2 rounded-full font-black text-[10px] text-white uppercase tracking-widest">
                SALE ACTIVE
              </span>
            )}

            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex justify-center items-center p-8 w-full h-full"
            >
              <Image
                src={food.image || "https://placehold.co/700x700"}
                alt={food.productName}
                width={550}
                height={550}
                className="max-h-[450px] object-contain"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Right: Content Section */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex flex-col justify-center">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="bg-orange-100 px-4 py-1.5 rounded-full font-black text-[10px] text-orange-600 uppercase tracking-widest">
                {food.brand}
              </span>
              <span className="bg-gray-100 px-4 py-1.5 rounded-full font-black text-[10px] text-gray-500 uppercase tracking-widest">
                {food.foodType || "Pet Food"}
              </span>
            </div>

            <h1 className="mb-4 font-black text-gray-900 text-4xl md:text-5xl leading-tight tracking-tight">
              {food.productName}
            </h1>

            <div className="mb-8">
              {hasDiscount ? (
                <div className="flex items-center gap-4">
                  <span className="font-black text-gray-900 text-5xl tracking-tighter">${food.discountPrice}</span>
                  <span className="font-bold text-gray-400 text-xl line-through">${food.price}</span>
                </div>
              ) : (
                <span className="font-black text-gray-900 text-5xl tracking-tighter">${food.price}</span>
              )}
            </div>

            {/* Info Grid */}
            <div className="gap-4 grid grid-cols-2 mb-8">
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
                <div className="bg-white shadow-sm p-2 rounded-lg text-orange-500"><FaWeightHanging /></div>
                <div className="flex flex-col">
                  <span className="font-bold text-[10px] text-gray-400 uppercase">Weight</span>
                  <span className="font-bold text-gray-800">{food.weight} {food.weightUnit}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
                <div className="bg-white shadow-sm p-2 rounded-lg text-orange-500"><FaBoxOpen /></div>
                <div className="flex flex-col">
                  <span className="font-bold text-[10px] text-gray-400 uppercase">Stock</span>
                  <span className="font-bold text-gray-800">{food.stock} units</span>
                </div>
              </div>
            </div>

            <div className={`flex items-center gap-2 mb-8 font-bold text-sm ${isOutOfStock ? "text-red-500" : "text-green-600"}`}>
              {isOutOfStock ? <FaTimesCircle /> : <FaCheckCircle />}
              {isOutOfStock ? "Out of stock" : "In Stock & Freshly Packed"}
            </div>

            {/* Description & Ingredients */}
            <div className="space-y-6 mb-10">
              {food.description && (
                <div>
                  <h3 className="flex items-center gap-2 mb-3 font-black text-gray-900 text-orange-500 text-xs uppercase tracking-[0.2em]">
                    Description
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {food.description}
                  </p>
                </div>
              )}

              {food.ingredients && (
                <div>
                  <h3 className="flex items-center gap-2 mb-3 font-black text-gray-900 text-orange-500 text-xs uppercase tracking-[0.2em]">
                    <FaLeaf /> Main Ingredients
                  </h3>
                  <p className="text-gray-500 text-sm italic leading-relaxed">
                    {food.ingredients}
                  </p>
                </div>
              )}
            </div>

            {/* Tags */}
            {food.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {food.tags.map((tag, i) => (
                  <span key={i} className="flex items-center gap-1.5 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg font-bold text-[11px] text-orange-600 uppercase tracking-wider transition-colors">
                    <FaTag className="text-[9px]" /> {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Buttons */}
            <div className="flex sm:flex-row flex-col gap-4">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isPending}
                className="flex flex-[1.5] justify-center items-center gap-3 bg-orange-500 hover:bg-gray-900 disabled:bg-gray-200 shadow-orange-100 shadow-xl py-5 rounded-2xl font-black text-white active:scale-95 transition-all"
              >
                {isPending ? <span className="loading loading-spinner loading-sm"></span> : <FaShoppingCart />}
                {isPending ? "Adding..." : "Add to Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="flex-1 hover:bg-orange-500 py-5 border-2 border-gray-900 hover:border-orange-500 rounded-2xl font-black text-gray-900 hover:text-white active:scale-95 transition-all"
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;