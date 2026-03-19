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
} from "react-icons/fa";
import AuthButtons from "../button/AuthButtons";
import toast from "react-hot-toast";
import { useCartStore } from "@/lib/useCartStore"; // স্টোরটি ইমপোর্ট করুন

const CartPageClient = () => {
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  
  // Zustand স্টোর থেকে সরাসরি setCount ফাংশন নিয়ে আসা
  const setCartCount = useCartStore((state) => state.setCartCount);

  const loadCart = async () => {
    if (!session?.user?.email) {
      setCartItems([]);
      setCartCount(0); // স্টোর রিসেট
      setLoading(false);
      return;
    }
    try {
      const items = await getCartItems(session.user.email);
      const safeItems = items || [];
      setCartItems(safeItems);
      // Navbar-এর কার্ট সংখ্যা আপডেট করা
      setCartCount(safeItems.length);
    } catch (error) {
      console.error("Cart loading failed:", error);
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
        await loadCart(); // এটি কল করলেই Zustand স্টোর আপডেট হবে
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
    if (window.confirm("Are you sure you want to clear your cart?")) {
      startTransition(async () => {
        const result = await clearCart(session.user.email);
        if (result?.success) {
          toast.success("Cart cleared!");
          await loadCart();
        }
      });
    }
  };

  // --- UI Logic (অন্যান্য মেম্বারদের ডিজাইন ঠিক রেখে) ---
  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center bg-base-200 min-h-screen">
        <span className="text-primary loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex flex-col justify-center items-center bg-base-200 px-4 min-h-screen text-center">
        <div className="bg-base-100 shadow-lg mb-6 p-10 rounded-full">
          <FaShoppingCart className="text-primary text-6xl" />
        </div>
        <h2 className="font-black text-neutral text-3xl uppercase tracking-tighter">Login Required</h2>
        <p className="mt-3 max-w-sm font-medium text-neutral/60">
          You need to be logged in to manage your shopping cart.
        </p>
        <div className="mt-8">
          <AuthButtons />
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center bg-base-200 px-4 min-h-screen text-center">
        <div className="bg-base-100 shadow-lg mb-6 p-10 border border-base-300 rounded-full">
          <FaShoppingCart className="text-primary/20 text-6xl" />
        </div>
        <h2 className="font-black text-neutral text-3xl">Your cart is empty</h2>
        <p className="mt-3 font-medium text-neutral/60">
          Looks like you haven&apos;t added anything for your pets yet!
        </p>
        <div className="flex gap-4 mt-8">
          <Link href="/pet-food" className="shadow-xl px-8 py-4 rounded-2xl h-auto font-black text-white hover:scale-105 transition-all btn btn-primary">
            Browse Food
          </Link>
          <Link href="/pet-accessories" className="px-8 py-4 border-2 rounded-2xl btn-outline h-auto font-black hover:scale-105 transition-all btn">
            Browse Gear
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-200 px-4 md:px-8 py-10 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/pet-food"
          className="inline-flex items-center gap-2 hover:gap-3 mb-8 font-black text-primary text-sm uppercase tracking-widest transition-all"
        >
          <FaArrowLeft />
          Continue Shopping
        </Link>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
          {/* Cart List Section */}
          <div className="lg:col-span-2 bg-base-100 shadow-2xl p-6 md:p-8 border border-base-300 rounded-[2.5rem]">
            <div className="flex justify-between items-center mb-10 pb-4 border-base-200 border-b">
              <h1 className="font-black text-neutral text-3xl">Cart Details ({totalItems})</h1>
              <button
                onClick={handleClearCart}
                disabled={isPending}
                className="shadow-error/20 shadow-lg border-none rounded-xl font-bold text-white capitalize btn btn-error btn-sm"
              >
                Clear Cart
              </button>
            </div>

            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="group flex md:flex-row flex-col gap-6 bg-base-200 p-5 border-2 border-transparent hover:border-primary/20 rounded-[2rem] transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative bg-white shadow-inner border border-base-300 rounded-2xl w-full md:w-36 h-36 overflow-hidden shrink-0">
                    <Image
                      src={item.image || "https://placehold.co/300x300"}
                      alt={item.productName || "Product"}
                      fill
                      className="p-4 object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Info Section */}
                  <div className="flex flex-col flex-1 justify-between py-1">
                    <div>
                      <h3 className="font-black text-neutral group-hover:text-primary text-xl leading-tight transition-colors">
                        {item.productName}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="bg-white px-3 py-1 border border-base-300 rounded-lg font-bold text-[10px] text-neutral/40 uppercase">
                          {item.brand}
                        </span>
                        {item.weight && (
                          <span className="bg-white px-3 py-1 border border-base-300 rounded-lg font-bold text-[10px] text-neutral/40 uppercase">
                            {item.weight} {item.weightUnit}
                          </span>
                        )}
                        {item.category && (
                          <span className="bg-primary/10 px-3 py-1 rounded-lg font-black text-[10px] text-primary uppercase">
                            {item.category}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-6">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-white shadow-sm p-1 border border-base-300 rounded-xl">
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity - 1, item.stock)}
                          disabled={isPending || item.quantity <= 1}
                          className="flex justify-center items-center hover:bg-primary/10 disabled:opacity-20 rounded-lg w-9 h-9 hover:text-primary transition-all"
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="min-w-[45px] font-black text-lg text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity + 1, item.stock)}
                          disabled={isPending || item.quantity >= item.stock}
                          className="flex justify-center items-center hover:bg-primary/10 disabled:opacity-20 rounded-lg w-9 h-9 hover:text-primary transition-all"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemove(item._id)}
                        disabled={isPending}
                        className="group/btn hover:bg-error/10 border-none rounded-xl text-error/60 hover:text-error btn btn-ghost btn-sm"
                      >
                        <FaTrash className="group-hover/btn:rotate-12 transition-transform" />
                        <span className="font-bold">Remove</span>
                      </button>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="flex md:flex-col justify-between items-end md:min-w-[120px] md:text-right">
                    <p className="font-bold text-[10px] text-neutral/30 uppercase tracking-widest">Line Total</p>
                    <p className="font-black text-primary text-2xl">
                      ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Summary Card */}
          <div className="top-24 sticky bg-base-100 shadow-2xl p-8 border border-base-300 rounded-[2.5rem] h-fit overflow-hidden">
             {/* Decorative element from other team members if any */}
            <div className="-top-10 -right-10 absolute bg-primary/5 rounded-full w-32 h-32"></div>

            <h2 className="relative mb-8 pb-4 border-base-200 border-b font-black text-neutral text-2xl tracking-tighter">Order Summary</h2>

            <div className="space-y-4 font-bold text-neutral/70">
              <div className="flex justify-between items-center">
                <span className="opacity-60 text-sm uppercase tracking-wider">Total Items</span>
                <span className="bg-base-200 px-3 py-1 rounded-lg text-neutral">{totalItems}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-60 text-sm uppercase tracking-wider">Subtotal</span>
                <span className="text-neutral">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-60 text-sm uppercase tracking-wider">Shipping</span>
                <span className="bg-success/10 px-3 py-1 rounded-lg font-black text-[10px] text-success uppercase tracking-widest">Free</span>
              </div>

              <div className="mt-8 pt-6 border-base-200 border-t-2 border-dashed">
                <div className="flex justify-between items-end font-black text-neutral">
                  <span className="opacity-60 text-sm uppercase tracking-widest">Grand Total</span>
                  <span className="text-primary text-3xl tracking-tighter">${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Link href='/checkout' className="block mt-10">
              <button className="group bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 py-5 rounded-[1.5rem] w-full font-black text-white text-lg active:scale-95 transition-all hover:-translate-y-1">
                Proceed to Checkout
                <span className="block opacity-60 font-bold text-[10px] uppercase tracking-[0.2em]">Secure Stripe Payment</span>
              </button>
            </Link>
            
            <p className="mt-6 font-bold text-[10px] text-neutral/30 text-center uppercase tracking-widest">
              Satisfaction Guaranteed • Pawfect Match
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPageClient;