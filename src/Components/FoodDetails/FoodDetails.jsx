"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { motion } from "framer-motion"; // Added
import {
  FaArrowLeft,
  FaWeightHanging,
  FaBoxOpen,
  FaTag,
  FaShoppingCart,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { addToCart } from "@/action/server/cart";
import { useAuthModal } from "@/provider/AuthModalProvider";
import { createStripeCheckoutFromCart } from "@/action/server/stripe";

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
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  if (!food?._id) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col justify-center items-center min-h-screen"
      >
        <FaTimesCircle className="mb-4 text-red-500 text-4xl" />
        <h2 className="font-bold text-2xl">Food not found</h2>

        <Link
          href="/petfoods"
          className="bg-primary mt-6 px-6 py-3 rounded-xl text-white"
        >
          Back to Foods
        </Link>
      </motion.div>
    );
  }

  const hasDiscount =
    food.discountPrice && Number(food.discountPrice) < Number(food.price);
  const isOutOfStock = food.inStock === false || food.stock <= 0;
  const finalPrice = hasDiscount ? food.discountPrice : food.price;

  const handleAddToCart = () => {
    if (!session?.user?.email) {
      openLoginModal();
      return;
    }
    setMessage("");
    startTransition(async () => {
      const result = await addToCart({
        userEmail: session.user.email,
        foodId: food._id,
        productName: food.productName,
        image: food.image,
        price: finalPrice,
        stock: food.stock,
        brand: food.brand,
        weight: food.weight,
        weightUnit: food.weightUnit,
        inStock: food.inStock,
      });
      setMessage(result?.message || "Something went wrong");
    });
  };

  const handleBuyNow = () => {
    if (!session?.user?.email) {
      openLoginModal();
      return;
    }

    router.push(`/checkout?mode=buy-now&foodId=${food._id}`);
  };

  return (
    <div className="bg-base-200 min-h-screen px-6 py-10 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            href="/petfoods"
            className="flex items-center gap-2 mb-8 font-bold text-primary hover:gap-3 transition-all"
          >
            <FaArrowLeft /> Back to foods
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 bg-base-100 shadow p-8 rounded-3xl">
          {/* Left: Image Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideIn}
            className="relative flex justify-center items-center bg-base-200 rounded-2xl min-h-[450px]"
          >
            {hasDiscount && (
              <span className="top-5 left-5 absolute z-10 bg-red-500 px-4 py-1 rounded-full font-bold text-xs text-white">
                SALE
              </span>
            )}

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-full h-full flex items-center justify-center p-4"
            >
              <Image
                src={food.image || "https://placehold.co/700x700"}
                alt={food.productName || "Pet Food"}
                width={600}
                height={600}
                className="object-contain max-h-[420px]"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Right: Content Section */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="flex gap-3 mb-3">
              <span className="bg-primary/10 px-4 py-1 rounded-full font-bold text-primary text-xs">
                {food.brand}
              </span>
              <span className="bg-base-200 px-4 py-1 rounded-full font-bold text-xs">
                {food.foodType}
              </span>
            </div>

            <h1 className="mb-4 font-black text-4xl">{food.productName}</h1>

            <div className="mb-6">
              {hasDiscount ? (
                <div className="flex items-center gap-4">
                  <span className="font-black text-4xl text-error">
                    ${food.discountPrice}
                  </span>
                  <span className="text-gray-400 text-lg line-through">
                    ${food.price}
                  </span>
                </div>
              ) : (
                <span className="font-black text-4xl">${food.price}</span>
              )}
            </div>

            <div className="space-y-3 text-sm mb-6">
              <p className="flex items-center gap-2">
                <FaWeightHanging className="text-primary" /> {food.weight}{" "}
                {food.weightUnit}
              </p>
              <p className="flex items-center gap-2">
                <FaBoxOpen className="text-primary" /> Stock: {food.stock}
              </p>
              <p className="flex items-center gap-2">
                {isOutOfStock ? (
                  <>
                    <FaTimesCircle className="text-red-500" /> Out of stock
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="text-green-500" /> Available
                  </>
                )}
              </p>
            </div>

            {food.description && (
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2 border-b border-base-200 pb-1">
                  Description
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {food.description}
                </p>
              </div>
            )}

            {food.ingredients && (
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2 border-b border-base-200 pb-1">
                  Ingredients
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {food.ingredients}
                </p>
              </div>
            )}

            {food.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {food.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 bg-base-200 px-3 py-1 rounded-full text-sm hover:bg-base-300 transition-colors"
                  >
                    <FaTag className="text-xs" /> {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-4 mt-10">
              <motion.button
                whileHover={!isOutOfStock && !isPending ? { scale: 1.02 } : {}}
                whileTap={!isOutOfStock && !isPending ? { scale: 0.98 } : {}}
                onClick={handleAddToCart}
                disabled={isOutOfStock || isPending}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition shadow-lg shadow-primary/20 ${
                  isOutOfStock || isPending
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90 text-white"
                }`}
              >
                <FaShoppingCart />
                {isPending ? "Adding..." : "Add to Cart"}
              </motion.button>

              <motion.button
                whileHover={!isOutOfStock ? { scale: 1.02 } : {}}
                whileTap={!isOutOfStock ? { scale: 0.98 } : {}}
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`px-8 py-4 rounded-xl font-bold transition shadow-lg ${
                  isOutOfStock
                    ? "bg-gray-300 cursor-not-allowed text-gray-500"
                    : "bg-gray-900 hover:bg-black text-white"
                }`}
              >
                Buy Now
              </motion.button>
            </div>

            {message && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 font-medium text-sm text-primary"
              >
                {message}
              </motion.p>
            )}

            <div className="flex gap-6 mt-8 text-gray-500 text-sm">
              <span className="flex items-center gap-1">✔ Secure Payment</span>
              <span className="flex items-center gap-1">✔ Fast Delivery</span>
              <span className="flex items-center gap-1">
                ✔ Quality Guarantee
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
