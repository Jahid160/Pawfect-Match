"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  FaChevronLeft, 
  FaShoppingCart, 
  FaStar, 
  FaBoxOpen, 
  FaCheckCircle, 
  FaTimesCircle,
  FaShieldAlt,
  FaTruck
} from "react-icons/fa";
import { addToCart } from "@/action/server/cart";
import { useAuthModal } from "@/provider/AuthModalProvider";
import { createStripeCheckoutFromCart } from "@/action/server/stripe";
import toast from "react-hot-toast";

const AccessoriesDetails = ({ item }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { openLoginModal } = useAuthModal();
  const [isPending, startTransition] = useTransition();

  if (!item?._id) {
    return (
      <div className="flex flex-col justify-center items-center bg-gray-50 min-h-screen">
        <FaTimesCircle className="mb-4 text-red-400 text-6xl animate-pulse" />
        <h2 className="font-black text-gray-900 text-3xl tracking-tight">Accessory not found</h2>
        <Link href="/pet-accessories" className="bg-orange-500 hover:bg-orange-600 shadow-lg mt-8 px-8 py-3 rounded-2xl font-bold text-white transition-all">
          Back to Collection
        </Link>
      </div>
    );
  }

  // --- Logic Helpers ---
  const hasDiscount = item.discountPrice && Number(item.discountPrice) < Number(item.price);
  const isOutOfStock = Number(item.stock || 0) <= 0;
  const finalPrice = hasDiscount ? item.discountPrice : item.price;

  // --- Safe Image Logic ---
  const safeImageSrc = (Array.isArray(item?.images) ? item.images[0] : item?.image) || 
                       "https://placehold.co/700x700?text=No+Image";

  const handleAddToCart = () => {
    if (!session?.user?.email) {
      openLoginModal();
      return;
    }

    startTransition(async () => {
      const result = await addToCart({
        userEmail: session.user.email,
        accessoryId: item._id,
        productName: item.title,
        image: safeImageSrc,
        price: finalPrice,
        stock: item.stock,
        brand: item.brand,
        category: item.category,
        inStock: !isOutOfStock,
      });

      if (result?.success || result?.acknowledged) {
        toast.success("Added to cart! 🛒");
      } else {
        toast.error("Failed to add to cart");
      }
    });
  };

  const handleBuyNow = () => {
    if (!session?.user?.email) {
      openLoginModal();
      return;
    }

    startTransition(async () => {
      const result = await createStripeCheckoutFromCart(item, session.user.email);
      if (result?.url) {
        window.location.href = result.url;
      }
    });
  };

  return (
    <div className="bg-gradient-to-b from-orange-50/50 to-white px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Navigation */}
        <Link 
          href="/pet-accessories" 
          className="group inline-flex items-center mb-8 font-bold text-gray-500 hover:text-orange-500 transition-all"
        >
          <FaChevronLeft className="mr-2 transition-transform group-hover:-translate-x-1" /> Back to Gear Collection
        </Link>

        <div className="bg-white shadow-2xl shadow-orange-100/50 border border-orange-50 rounded-[3rem] overflow-hidden">
          <div className="gap-12 grid grid-cols-1 lg:grid-cols-2 p-8 md:p-14">
            
            {/* Image Section */}
            <div className="group relative bg-gray-50 border border-gray-100 rounded-[2.5rem] h-[400px] md:h-[550px] overflow-hidden">
              {hasDiscount && (
                <span className="top-6 left-6 z-10 absolute bg-red-500 shadow-lg px-5 py-2 rounded-full font-black text-white text-xs uppercase tracking-widest">
                  Sale Active
                </span>
              )}
              <Image
                src={safeImageSrc}
                alt={item.title}
                fill
                className="p-8 object-contain group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-orange-100 px-4 py-1.5 rounded-full font-black text-[10px] text-orange-600 uppercase tracking-[0.2em]">
                  {item.category || "Premium Gear"}
                </span>
                <div className="flex items-center gap-1 text-amber-400">
                  <FaStar size={14}/><FaStar size={14}/><FaStar size={14}/><FaStar size={14}/><FaStar size={14}/>
                  <span className="ml-2 font-bold text-gray-400 text-xs">(4.9/5.0)</span>
                </div>
              </div>

              <h1 className="mb-4 font-black text-gray-900 text-4xl md:text-5xl leading-[1.1] tracking-tight">
                {item.title}
              </h1>

              <div className="flex items-center gap-2 mb-6 font-bold text-gray-400 text-sm uppercase">
                Brand: <span className="text-gray-900">{item.brand || "Authentic Pet Gear"}</span>
              </div>

              <p className="mb-8 text-gray-500 text-lg leading-relaxed">
                {item.description || "Designed with premium materials to ensure the highest level of comfort and durability for your beloved pets."}
              </p>

              {/* Price & Stock info */}
              <div className="flex items-center gap-8 mb-10 pb-8 border-gray-100 border-b">
                <div className="flex flex-col">
                  {hasDiscount && (
                    <span className="font-bold text-gray-400 text-sm decoration-red-400/50 line-through">
                      ${item.price}
                    </span>
                  )}
                  <span className="font-black text-gray-900 text-5xl tracking-tighter">
                    ${finalPrice}
                  </span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className={`flex items-center gap-2 font-bold text-sm ${isOutOfStock ? "text-red-500" : "text-green-600"}`}>
                    {isOutOfStock ? <FaTimesCircle /> : <FaCheckCircle />}
                    {isOutOfStock ? "Out of Stock" : "In Stock & Ready"}
                  </div>
                  <div className="flex items-center gap-2 font-medium text-gray-400 text-xs">
                    <FaBoxOpen /> {item.stock || 0} units remaining
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex sm:flex-row flex-col gap-4 mb-8">
                <button 
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || isPending}
                  className="flex flex-[1.5] justify-center items-center gap-3 bg-gray-900 hover:bg-orange-600 disabled:bg-gray-200 shadow-gray-200 shadow-xl py-5 rounded-[1.5rem] font-black text-white active:scale-95 transition-all"
                >
                  <FaShoppingCart /> {isPending ? "Processing..." : "Add to Cart"}
                </button>
                <button 
                  onClick={handleBuyNow}
                  disabled={isOutOfStock || isPending}
                  className="flex-1 hover:bg-gray-900 py-5 border-2 border-gray-900 rounded-[1.5rem] font-black text-gray-900 hover:text-white active:scale-95 transition-all"
                >
                  Buy Now
                </button>
              </div>

              {/* Trust Badges */}
              <div className="gap-6 grid grid-cols-2">
                <div className="flex items-center gap-3 text-gray-500 text-xs">
                  <div className="bg-gray-100 p-2 rounded-lg text-orange-500"><FaTruck /></div>
                  <span className="font-bold">Fast & Safe<br/>Delivery</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500 text-xs">
                  <div className="bg-gray-100 p-2 rounded-lg text-orange-500"><FaShieldAlt /></div>
                  <span className="font-bold">Premium Quality<br/>Guaranteed</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessoriesDetails;