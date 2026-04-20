"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import {
  getCartItems,
  updateCartQuantity,
  removeCartItem,
  clearCart,
} from "@/action/server/cart";
import {
  FaMinus,
  FaPlus,
  FaTrash,
  FaShoppingCart,
  FaArrowLeft,
  FaShoppingBag,
} from "react-icons/fa";
import AuthButtons from "../button/AuthButtons";
import toast from "react-hot-toast";
import { useCartStore } from "@/lib/useCartStore";
import { motion, AnimatePresence } from "framer-motion";

const CartPageClient = () => {
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  
  const setCartCount = useCartStore((state) => state.setCartCount);

  const loadCart = async () => {
    if (!session?.user?.email) {
      setCartItems([]);
      setCartCount(0);
      setLoading(false);
      return;
    }
    try {
      const items = await getCartItems(session.user.email);
      const safeItems = Array.isArray(items) ? items : [];
      setCartItems(safeItems);
      setCartCount(safeItems.length);
    } catch (error) {
      console.error("Cart loading failed:", error);
      toast.error("Failed to sync cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status !== "loading") {
      loadCart();
    }
  }, [status, session?.user?.email]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      return sum + Number(item.price || 0) * Number(item.quantity || 1);
    }, 0);
  }, [cartItems]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + Number(item.quantity || 1), 0);
  }, [cartItems]);

  const handleQuantityChange = (cartId, quantity, stock) => {
    if (quantity < 1) return;
    if (quantity > stock) {
      toast.error(`Only ${stock} items available in stock!`);
      return;
    }
    
    startTransition(async () => {
      const result = await updateCartQuantity({
        cartId,
        userEmail: session.user.email,
        quantity,
      });
      if (result?.success) {
        // Optimistic UI update instead of full reload if possible, 
        // but loadCart() is safer for data consistency.
        await loadCart();
      }
    });
  };

  const handleRemove = (cartId) => {
    startTransition(async () => {
      const result = await removeCartItem({
        cartId,
        userEmail: session.user.email,
      });
      if (result?.success) {
        toast.success("Item removed from cart");
        await loadCart();
      }
    });
  };

  const handleClearCart = () => {
    toast((t) => (
      <span className="flex items-center gap-3 font-sans">
        Clear all items?
        <button 
          className="bg-red-500 px-3 py-1 rounded-lg font-bold text-white text-xs"
          onClick={async () => {
            toast.dismiss(t.id);
            startTransition(async () => {
              const result = await clearCart(session.user.email);
              if (result?.success) {
                toast.success("Cart cleared!");
                await loadCart();
              }
            });
          }}
        >
          Yes
        </button>
      </span>
    ));
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex flex-col justify-center items-center bg-orange-50/30 min-h-screen">
        <span className="loading-ring text-orange-500 loading loading-lg"></span>
        <p className="mt-4 font-black text-gray-400 text-xs uppercase tracking-[0.3em]">Preparing your cart...</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex flex-col justify-center items-center bg-gray-50 px-4 min-h-screen font-sans text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white shadow-2xl mb-8 p-12 border border-orange-100 rounded-[3rem]">
          <FaShoppingCart className="mx-auto mb-6 text-orange-500 text-7xl" />
          <h2 className="font-black text-gray-900 text-3xl uppercase tracking-tight">Login Required</h2>
          <p className="mt-4 max-w-sm font-medium text-gray-500 leading-relaxed">
            Your pet is waiting! Login to see the items you&apos;ve added to your cart.
          </p>
          <div className="mt-10">
            <AuthButtons />
          </div>
        </motion.div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center bg-gray-50 px-4 min-h-screen font-sans text-center">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col items-center">
          <div className="bg-white shadow-xl mb-8 p-12 border border-orange-50 rounded-full">
            <FaShoppingBag className="text-gray-200 text-7xl" />
          </div>
          <h2 className="font-black text-gray-900 text-4xl tracking-tight">Your cart is empty</h2>
          <p className="mt-4 font-medium text-gray-500">
            Looks like you haven&apos;t added anything for your pets yet!
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link href="/pet-food" className="bg-orange-500 hover:bg-orange-600 shadow-orange-100 shadow-xl px-10 py-5 rounded-2xl font-black text-white active:scale-95 transition-all">
              Browse Food
            </Link>
            <Link href="/pet-accessories" className="bg-gray-900 hover:bg-black shadow-xl px-10 py-5 rounded-2xl font-black text-white active:scale-95 transition-all">
              Browse Gear
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-orange-50/30 to-white px-4 md:px-8 py-14 min-h-screen font-sans">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/petfoods"
          className="group inline-flex items-center gap-2 mb-10 font-black text-gray-400 hover:text-orange-500 text-xs uppercase tracking-widest transition-all"
        >
          <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
          Continue Shopping
        </Link>

        <div className="gap-10 grid grid-cols-1 lg:grid-cols-3">
          {/* Cart List Section */}
          <div className="lg:col-span-2 bg-white shadow-2xl shadow-orange-100/50 p-6 md:p-10 border border-orange-50 rounded-[3rem]">
            <div className="flex justify-between items-center mb-10 pb-6 border-gray-100 border-b">
              <h1 className="font-black text-gray-900 text-3xl tracking-tight">Shopping Cart ({totalItems})</h1>
              <button
                onClick={handleClearCart}
                disabled={isPending}
                className="hover:bg-red-50 disabled:opacity-50 px-4 py-2 border border-red-100 rounded-xl font-bold text-red-500 text-xs uppercase tracking-widest transition-all"
              >
                Clear Cart
              </button>
            </div>

            <div className="space-y-8">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="group relative flex md:flex-row flex-col gap-6 bg-gray-50/50 hover:bg-white p-6 border border-transparent hover:border-orange-100 rounded-[2.5rem] transition-all duration-300"
                  >
                    {/* Image Container */}
                    <div className="relative bg-white shadow-sm border border-gray-100 rounded-[1.5rem] w-full md:w-40 h-40 overflow-hidden shrink-0">
                      <Image
                        src={item.image || "https://placehold.co/300x300?text=Pet+Gear"}
                        alt={item.productName || "Product"}
                        fill
                        className="p-5 object-contain group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    {/* Info Section */}
                    <div className="flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="font-black text-gray-900 group-hover:text-orange-500 text-xl leading-tight transition-colors">
                            {item.productName}
                          </h3>
                          <button
                            onClick={() => handleRemove(item._id)}
                            disabled={isPending}
                            className="bg-white hover:bg-red-500 shadow-sm p-3 rounded-xl text-gray-300 hover:text-white active:scale-90 transition-all"
                            title="Remove item"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="bg-white px-3 py-1 border border-gray-100 rounded-lg font-bold text-[9px] text-gray-400 uppercase tracking-widest">
                            {item.brand || "Authentic"}
                          </span>
                          {item.weight && (
                            <span className="bg-white px-3 py-1 border border-gray-100 rounded-lg font-bold text-[9px] text-gray-400 uppercase">
                              {item.weight} {item.weightUnit}
                            </span>
                          )}
                          <span className="bg-orange-100 px-3 py-1 rounded-lg font-black text-[9px] text-orange-600 uppercase tracking-widest">
                            {item.productType || "Premium"}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-6">
                        {/* Quantity Controls */}
                        <div className="flex items-center bg-white shadow-sm p-1.5 border border-gray-100 rounded-2xl">
                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity - 1, item.stock)}
                            disabled={isPending || item.quantity <= 1}
                            className="flex justify-center items-center hover:bg-orange-50 disabled:opacity-20 rounded-xl w-10 h-10 text-gray-400 hover:text-orange-500 transition-all"
                          >
                            <FaMinus size={10} />
                          </button>
                          <span className="min-w-[40px] font-black text-gray-900 text-lg text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1, item.stock)}
                            disabled={isPending || item.quantity >= item.stock}
                            className="flex justify-center items-center hover:bg-orange-50 disabled:opacity-20 rounded-xl w-10 h-10 text-gray-400 hover:text-orange-500 transition-all"
                          >
                            <FaPlus size={10} />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="mb-1 font-bold text-[10px] text-gray-300 uppercase tracking-[0.2em]">Subtotal</p>
                          <p className="font-black text-gray-900 text-2xl tracking-tighter">
                            ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Sticky Summary Card */}
          <div className="top-24 sticky h-fit">
            <div className="relative bg-gray-900 shadow-2xl shadow-gray-200 p-10 border border-gray-800 rounded-[3rem] overflow-hidden text-white">
              <div className="top-0 right-0 absolute bg-orange-500 opacity-10 rounded-full w-40 h-40 -translate-y-1/2 translate-x-1/2"></div>
              
              <h2 className="relative mb-10 pb-4 border-gray-800 border-b font-black text-2xl italic uppercase tracking-tight">Order Summary</h2>

              <div className="relative space-y-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-400 text-xs uppercase tracking-[0.2em]">Total Items</span>
                  <span className="bg-gray-800 px-4 py-1.5 rounded-xl font-black text-orange-500">{totalItems}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-400 text-xs uppercase tracking-[0.2em]">Subtotal</span>
                  <span className="font-black text-xl">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-400 text-xs uppercase tracking-[0.2em]">Shipping</span>
                  <span className="font-black text-green-400 text-xs uppercase tracking-widest">Free</span>
                </div>

                <div className="mt-10 pt-8 border-gray-800 border-t-2 border-dashed">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-[10px] text-gray-400 uppercase tracking-[0.3em]">Estimated Total</span>
                    <span className="font-black text-orange-500 text-5xl tracking-tighter">${subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link href='/checkout' className="block mt-12">
                <button className="group bg-orange-500 hover:bg-white shadow-orange-500/20 shadow-xl py-6 rounded-2xl w-full font-black text-white hover:text-orange-500 text-lg active:scale-95 transition-all duration-500">
                  Checkout Now
                  <span className="block opacity-60 font-bold text-[10px] uppercase tracking-[0.2em]">Stripe Secure Payment</span>
                </button>
              </Link>
              
              <div className="flex justify-center gap-4 opacity-30 grayscale hover:grayscale-0 mt-8 transition-all duration-500">
                <div className="bg-white p-1 rounded-md w-10 h-6"></div>
                <div className="bg-white p-1 rounded-md w-10 h-6"></div>
                <div className="bg-white p-1 rounded-md w-10 h-6"></div>
              </div>
            </div>
            
            <p className="mt-6 font-bold text-[10px] text-gray-300 text-center uppercase tracking-[0.2em]">
              Trusted by 10k+ Pet Parents
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPageClient;