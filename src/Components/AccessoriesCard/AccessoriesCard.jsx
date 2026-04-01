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
    <div className="group relative flex flex-col bg-white shadow-sm hover:shadow-2xl border border-gray-100 rounded-2xl md:rounded-[2rem] overflow-hidden transition-all hover:-translate-y-2 duration-500">
      
      {/* Image Section - Adjusted height for mobile/desktop */}
      <div className="relative bg-gradient-to-br from-orange-50/50 via-white to-yellow-50/50 w-full h-52 md:h-72 overflow-hidden">
        <Image
          src={safeImageSrc}
          alt={item?.title || "Accessory"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-contain p-4 md:p-8 transition-transform duration-700 group-hover:scale-110 ${isOutOfStock ? "grayscale opacity-60" : ""}`}
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/600x400?text=Image+Not+Found";
          }}
        />

        {/* Badges - Smaller on mobile */}
        <div className="top-3 md:top-5 left-3 md:left-5 z-10 absolute flex flex-col gap-1.5">
          {hasDiscount && (
            <span className="flex items-center gap-1 bg-red-500 shadow-xl px-2.5 py-1 rounded-full font-black text-[8px] text-white md:text-[10px] uppercase tracking-wider">
              <FaTag size={8} className="md:size-2" /> Sale
            </span>
          )}
          {item?.featured && (
            <span className="flex items-center gap-1 bg-slate-900 shadow-xl px-2.5 py-1 rounded-full font-black text-[8px] text-white md:text-[10px] uppercase tracking-wider">
              <Sparkle size={10} className="md:size-3" /> Featured
            </span>
          )}
        </div>

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="z-20 absolute inset-0 flex justify-center items-center bg-white/40 backdrop-blur-[1px]">
            <span className="flex items-center gap-2 bg-white/90 shadow-sm px-4 py-2 border border-gray-100 rounded-full font-black text-[10px] text-slate-900 uppercase tracking-widest">
              <FaBan className="text-red-500" /> Out of Stock
            </span>
          </div>
        )}

        {/* Quick cart button - Visible on mobile for better UX, Hover on Desktop */}
        {!isOutOfStock && (
          <button
            onClick={handleAddToCart}
            disabled={isPending}
            className="right-3 md:right-5 bottom-3 md:bottom-5 z-30 absolute flex justify-center items-center bg-orange-600 hover:bg-slate-900 md:group-hover:opacity-100 md:opacity-0 shadow-xl rounded-2xl w-10 md:w-14 h-10 md:h-14 text-white transition-all md:group-hover:translate-y-0 md:translate-y-4 duration-300"
          >
            {isPending ? <span className="loading loading-spinner loading-xs"></span> : <FaShoppingCart size={16} className="md:size-5" />}
          </button>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-4 md:p-7">
        <div className="flex justify-between items-center mb-3">
          <span className="opacity-80 font-black text-[9px] text-orange-600 md:text-[11px] uppercase tracking-[0.25em]">
            {item?.brand || "Premium Gear"}
          </span>
          <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-0.5 rounded-full text-[10px] text-amber-600 md:text-xs">
            <FaStar /> <span className="font-black">4.9</span>
          </div>
        </div>

        <Link href={`/pet-accessories/${itemId}`}>
          <h3 className="mb-4 min-h-[44px] md:min-h-[56px] font-black text-slate-900 hover:text-orange-600 text-base md:text-xl italic uppercase line-clamp-2 leading-[1.2] tracking-tight transition-colors cursor-pointer">
            {item?.title}
          </h3>
        </Link>

        {/* Price + CTA */}
        <div className="flex justify-between items-center gap-3 mt-auto pt-5 border-gray-100 border-t">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <span className="opacity-70 font-bold text-[10px] text-slate-400 md:text-xs line-through">${item.price}</span>
                <span className="font-black text-red-500 text-lg md:text-2xl leading-none tracking-tighter">${item.discountPrice}</span>
              </>
            ) : (
              <span className="font-black text-slate-900 text-lg md:text-2xl leading-none tracking-tighter">${item.price || 0}</span>
            )}
          </div>

          <Link
            href={`/pet-accessories/${itemId}`}
            className="inline-flex items-center gap-2 bg-slate-50 hover:bg-orange-600 shadow-sm px-3 md:px-5 py-2 md:py-3.5 rounded-xl md:rounded-2xl font-black text-[9px] text-slate-600 md:text-[11px] hover:text-white uppercase tracking-widest transition-all"
          >
            Details <FaChevronRight size={8} />
          </Link>
        </div>
      </div>
    </div>
  );
};