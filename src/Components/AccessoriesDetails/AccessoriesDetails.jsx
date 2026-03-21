"use client";

import React, { useTransition } from "react";
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
  FaTruck,
  FaTools,
  FaRulerCombined,
  FaBolt
} from "react-icons/fa";
import { addToCart } from "@/action/server/cart";
import { useAuthModal } from "@/provider/AuthModalProvider";
import toast from "react-hot-toast";
import { useCartStore } from "@/lib/useCartStore";

const AccessoriesDetails = ({ item }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { openLoginModal } = useAuthModal();
  const [isPending, startTransition] = useTransition();
  
  const incrementCart = useCartStore((state) => state.incrementCart);

  if (!item?._id) {
    return (
      <div className="flex flex-col justify-center items-center bg-gray-50 min-h-screen font-sans">
        <FaTimesCircle className="mb-4 text-red-400 text-6xl animate-pulse" />
        <h2 className="font-black text-gray-900 text-3xl tracking-tight">Accessory not found</h2>
        <Link href="/pet-accessories" className="bg-orange-500 hover:bg-orange-600 shadow-lg mt-8 px-8 py-3 rounded-2xl font-bold text-white transition-all">
          Back to Collection
        </Link>
      </div>
    );
  }

  const hasDiscount = item.discountPrice && Number(item.discountPrice) < Number(item.price);
  const isOutOfStock = Number(item.stock || 0) <= 0;
  const finalPrice = hasDiscount ? item.discountPrice : item.price;
  const safeImageSrc = (Array.isArray(item?.images) ? item.images[0] : item?.image) || 
                       "https://placehold.co/700x700?text=No+Image";

  // --- Add to Cart Logic ---
  const handleAddToCart = () => {
    if (!session?.user?.email) {
      openLoginModal();
      return;
    }

    startTransition(async () => {
      const result = await addToCart({
        userEmail: session.user.email,
        productId: item._id.toString(),
        productName: item.title,
        image: safeImageSrc,
        price: finalPrice,
        stock: Number(item.stock),
        brand: item.brand,
        category: item.category,
        productType: "accessory",
        inStock: !isOutOfStock,
      });

      if (result?.success || result?.acknowledged) {
        toast.success(`${item.title} added to cart! 🛒`);
        incrementCart(1); 
      } else {
        toast.error(result?.message || "Failed to add to cart");
      }
    });
  };

  // --- FIXED & FINAL: Buy Now Logic ---
  const handleBuyNow = () => {
    if (!session?.user?.email) {
      openLoginModal();
      return;
    }

    if (isOutOfStock) {
        toast.error("Sorry, this item is out of stock!");
        return;
    }

    
    const checkoutQuery = new URLSearchParams({
      productId: item._id.toString(),
      productType: "accessory",
      quantity: "1",
      mode: "buy-now"
    }).toString();

    router.push(`/checkout?${checkoutQuery}`);
  };

  return (
    <div className="bg-gradient-to-b from-orange-50/40 to-white px-4 sm:px-6 lg:px-8 py-12 min-h-screen font-sans">
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
            
            {/* LEFT SIDE: Image Section */}
            <div className="group relative flex justify-center items-center bg-[#F9FAFB] shadow-inner border border-gray-100/50 rounded-[2.5rem] h-[400px] md:h-[550px] overflow-hidden">
              {hasDiscount && (
                <div className="top-6 left-6 z-10 absolute flex items-center gap-2 bg-red-500 shadow-xl px-4 py-2 rounded-full font-black text-[10px] text-white uppercase tracking-widest">
                  <FaBolt /> Hot Deal
                </div>
              )}
              
              <div className="relative w-full h-full transition-all duration-700">
                <Image
                  src={safeImageSrc}
                  alt={item.title}
                  fill
                  className="p-12 object-contain group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  priority
                />
              </div>
            </div>

            {/* RIGHT SIDE: Content Section */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-orange-100 px-4 py-1.5 rounded-full font-black text-[10px] text-orange-600 uppercase tracking-[0.2em]">
                  {item.category || "Premium Gear"}
                </span>
                <div className="flex items-center gap-1 text-amber-400">
                  <FaStar size={14}/><FaStar size={14}/><FaStar size={14}/><FaStar size={14}/><FaStar size={14}/>
                  <span className="ml-2 font-bold text-[10px] text-gray-400">(4.9/5.0)</span>
                </div>
              </div>

              <h1 className="mb-4 font-black text-gray-900 text-4xl md:text-5xl leading-[1.1] tracking-tight">
                {item.title}
              </h1>

              <div className="flex items-center gap-2 mb-6 font-bold text-gray-400 text-xs uppercase tracking-wider">
                Brand: <span className="text-gray-900">{item.brand || "Authentic Pet Gear"}</span>
              </div>

              <p className="mb-8 text-gray-600 text-base leading-relaxed">
                {item.description || "Designed with premium materials to ensure comfort and durability for your beloved pets."}
              </p>

              {/* Specs Grid */}
              <div className="flex flex-wrap gap-4 mb-8">
                 {item.material && (
                   <div className="group flex items-center gap-3 bg-gray-50/80 hover:bg-white hover:shadow-sm px-5 py-3 border border-gray-100 rounded-2xl transition-colors">
                     <FaTools className="text-orange-400 group-hover:rotate-12 transition-transform"/> 
                     <span className="font-bold text-gray-700 text-sm">{item.material}</span>
                   </div>
                 )}
                 {item.size && (
                   <div className="group flex items-center gap-3 bg-gray-50/80 hover:bg-white hover:shadow-sm px-5 py-3 border border-gray-100 rounded-2xl transition-colors">
                     <FaRulerCombined className="text-orange-400 group-hover:scale-110 transition-transform"/> 
                     <span className="font-bold text-gray-700 text-sm">Size: {item.size}</span>
                   </div>
                 )}
              </div>

              {/* Price & Stock */}
              <div className="flex items-center gap-8 mb-10 pb-8 border-gray-100 border-b">
                <div className="flex flex-col">
                  {hasDiscount && (
                    <span className="font-bold text-gray-400 text-sm decoration-2 decoration-red-400 line-through">
                      ${item.price}
                    </span>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="font-black text-gray-900 text-5xl tracking-tighter">${finalPrice}</span>
                    <span className="font-bold text-gray-400 text-sm">USD</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-1">
                  <div className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full ${isOutOfStock ? "bg-red-50 text-red-500" : "bg-green-50 text-green-600"}`}>
                    {isOutOfStock ? "Sold Out" : "Ready to Ship"}
                  </div>
                  <div className="flex items-center gap-2 pl-1 font-bold text-[10px] text-gray-400 uppercase tracking-widest">
                    <FaBoxOpen className="text-orange-300"/> {item.stock || 0} left
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex sm:flex-row flex-col gap-4 mb-8">
                <button 
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || isPending}
                  className="group flex flex-[1.5] justify-center items-center gap-3 bg-orange-500 hover:bg-gray-900 disabled:bg-gray-200 shadow-orange-100 shadow-xl py-5 rounded-[1.5rem] font-black text-white active:scale-95 transition-all duration-300"
                >
                  {isPending ? <span className="loading loading-spinner loading-sm"></span> : <FaShoppingCart className="transition-transform group-hover:-translate-y-1" />} 
                  {isPending ? "Adding..." : "Add to Cart"}
                </button>
                <button 
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className="flex-1 hover:bg-orange-500 py-5 border-2 border-gray-900 rounded-[1.5rem] font-black text-gray-900 hover:text-white active:scale-95 transition-all duration-300"
                >
                  Buy Now
                </button>
              </div>

              {/* Trust Badges */}
              <div className="gap-6 grid grid-cols-2 pt-8 border-gray-50 border-t">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-50 p-3 rounded-2xl text-orange-500"><FaTruck size={18}/></div>
                  <span className="font-black text-[10px] text-gray-500 uppercase leading-tight">Fast Free<br/>Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-orange-50 p-3 rounded-2xl text-orange-500"><FaShieldAlt size={18}/></div>
                  <span className="font-black text-[10px] text-gray-500 uppercase leading-tight">100% Secure<br/>Checkout</span>
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