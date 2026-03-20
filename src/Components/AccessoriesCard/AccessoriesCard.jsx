"use client";

import Link from "next/link";
import React, { useTransition } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { FaShoppingCart, FaChevronRight, FaBan, FaStar, FaTag } from "react-icons/fa";
import { Sparkle } from "lucide-react";
import { addToCart } from "@/action/server/cart";
import { useAuthModal } from "@/provider/AuthModalProvider";
import toast from "react-hot-toast";

export const AccessoriesCard = ({ item }) => {
  const { data: session } = useSession();
  const { openLoginModal } = useAuthModal();
  const [isPending, startTransition] = useTransition();

  const rawId = item?._id || item?.id;
  const itemId = typeof rawId === 'object' ? rawId.toString() : rawId;
  
  const hasDiscount = item?.discountPrice && Number(item?.discountPrice) < Number(item?.price);
  const isOutOfStock = Number(item?.stock || 0) <= 0;
  const displayPrice = hasDiscount ? item.discountPrice : item.price;

  const safeImageSrc = 
    (Array.isArray(item?.images) ? item.images[0] : item?.image) || 
    "https://placehold.co/600x400?text=No+Image";

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!session?.user?.email) {
      openLoginModal();
      return;
    }

    startTransition(async () => {
      const result = await addToCart({
        userEmail: session.user.email,
        productId: itemId,
        productName: item.title, 
        image: safeImageSrc,
        price: displayPrice,
        stock: Number(item.stock),
        brand: item.brand || "Premium Gear",
        category: item.category,
        productType: "accessory", 
        weight: item.weight || "", 
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
    <div className="group relative flex flex-col bg-white shadow-sm hover:shadow-2xl border border-gray-200 rounded-3xl overflow-hidden transition-all hover:-translate-y-1 duration-300">
      
      {/* Image Section */}
      <div className="relative bg-gradient-to-br from-orange-50 via-white to-yellow-50 w-full h-64 overflow-hidden">
        <Image
          src={safeImageSrc}
          alt={item?.title || "Accessory"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-contain p-6 transition-transform duration-500 group-hover:scale-110 ${isOutOfStock ? "grayscale opacity-70" : ""}`}
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/600x400?text=Image+Not+Found";
          }}
        />

        {/* Badges */}
        <div className="top-4 left-4 z-10 absolute flex flex-col gap-2">
          {hasDiscount && (
            <span className="flex items-center gap-1 bg-red-500 shadow-lg px-3 py-1 rounded-full font-bold text-[10px] text-white uppercase tracking-wide">
              <FaTag size={8} /> Sale
            </span>
          )}
          {item?.featured && (
            <span className="flex items-center gap-1 bg-orange-500 shadow-lg px-3 py-1 rounded-full font-bold text-[10px] text-white uppercase tracking-wide">
              <Sparkle size={10} /> New
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
            {item?.brand || "Premium Gear"}
          </span>
          <div className="flex items-center gap-1 text-amber-500 text-xs">
            <FaStar /> <span className="font-semibold text-gray-700">4.9</span>
          </div>
        </div>

        <Link href={`/pet-accessories/${itemId}`}>
          <h3 className="mb-2 min-h-[48px] font-extrabold text-gray-900 hover:text-orange-500 text-lg line-clamp-2 leading-tight transition-colors cursor-pointer">
            {item?.title}
          </h3>
        </Link>

        {/* Price + CTA */}
        <div className="flex justify-between items-end gap-3 mt-auto pt-4 border-gray-100 border-t">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <span className="font-medium text-[10px] text-gray-400 line-through">${item.price}</span>
                <span className="font-black text-red-500 text-xl leading-none tracking-tight">${item.discountPrice}</span>
              </>
            ) : (
              <span className="font-black text-gray-900 text-xl leading-none tracking-tight">${item.price || 0}</span>
            )}
          </div>

          <Link
            href={`/pet-accessories/${itemId}`}
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-orange-500 px-4 py-2.5 rounded-xl font-bold text-[10px] text-gray-600 hover:text-white uppercase tracking-wider transition-all"
          >
            Details <FaChevronRight size={8} />
          </Link>
        </div>
      </div>
    </div>
  );
};