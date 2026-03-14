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

const CartPageClient = () => {
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const loadCart = async () => {
    if (!session?.user?.email) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      const items = await getCartItems(session.user.email);
      setCartItems(items || []);
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

  const handleQuantityChange = (cartId, quantity) => {
    if (quantity < 1) return;
    startTransition(async () => {
      await updateCartQuantity({
        cartId,
        userEmail: session.user.email,
        quantity,
      });
      await loadCart();
    });
  };

  const handleRemove = (cartId) => {
    startTransition(async () => {
      await removeCartItem({
        cartId,
        userEmail: session.user.email,
      });
      await loadCart();
    });
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      startTransition(async () => {
        await clearCart(session.user.email);
        await loadCart();
      });
    }
  };

  if (status === "loading" || loading) {
    return (
       <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex flex-col justify-center items-center px-4 min-h-screen text-center bg-base-200">
        <div className="bg-base-100 mb-6 p-10 rounded-full shadow-lg">
          <FaShoppingCart className="text-primary text-6xl" />
        </div>
        <h2 className="font-black text-3xl text-neutral">Login Required</h2>
        <p className="mt-3 text-neutral/60 max-w-sm">
          You need to be logged in to manage your shopping cart.
        </p>
        <div className="mt-8">
            <AuthButtons/>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center px-4 min-h-screen text-center bg-base-200">
        <div className="bg-base-100 mb-6 p-10 rounded-full shadow-lg">
          <FaShoppingCart className="text-primary/20 text-6xl" />
        </div>
        <h2 className="font-black text-3xl text-neutral">Your cart is empty</h2>
        <p className="mt-3 text-neutral/60">
          Looks like you haven&apos;t added any treats for your furry friends yet!
        </p>
        <Link
          href="/pet-food"
          className="inline-flex items-center gap-2 bg-primary mt-8 px-8 py-4 rounded-2xl font-black text-white shadow-xl hover:scale-105 transition-transform"
        >
          <FaArrowLeft />
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-base-200 min-h-screen px-4 md:px-8 py-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/pet-food"
          className="inline-flex items-center gap-2 mb-8 font-bold text-primary hover:underline"
        >
          <FaArrowLeft />
          Continue Shopping
        </Link>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 bg-base-100 shadow-xl p-8 rounded-[2.5rem] border border-base-300">
            <div className="flex justify-between items-center mb-8">
              <h1 className="font-black text-3xl text-neutral">Cart Details</h1>
              <button
                onClick={handleClearCart}
                disabled={isPending}
                className="btn btn-error btn-sm rounded-xl font-bold text-white capitalize"
              >
                Clear Cart
              </button>
            </div>

            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex md:flex-row flex-col gap-6 bg-base-200 p-5 rounded-3xl border border-transparent hover:border-primary/10 transition-all group"
                >
                  {/* Image Container */}
                  <div className="relative bg-white rounded-2xl w-full md:w-32 h-32 overflow-hidden shadow-inner shrink-0">
                    <Image
                      src={item.image || "https://placehold.co/300x300"}
                      alt={item.productName}
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                        <h3 className="font-black text-xl text-neutral leading-tight">{item.productName}</h3>
                        <div className="flex gap-3 mt-1 text-xs font-bold text-neutral/40 uppercase">
                           <span>{item.brand}</span>
                           <span>•</span>
                           <span>{item.weight} {item.weightUnit}</span>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 mt-4">
                      <div className="flex items-center bg-white rounded-xl p-1 shadow-sm border border-base-300">
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                          className="flex justify-center items-center w-8 h-8 hover:text-primary transition-colors"
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="min-w-[40px] font-black text-center text-lg">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className="flex justify-center items-center w-8 h-8 hover:text-primary disabled:opacity-30 transition-colors"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemove(item._id)}
                        className="btn btn-ghost btn-sm text-error/60 hover:text-error hover:bg-error/10 rounded-xl"
                      >
                        <FaTrash />
                        <span className="font-bold">Remove</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex md:flex-col justify-between items-end md:text-right">
                    <p className="text-sm font-bold text-neutral/30">Price</p>
                    <p className="font-black text-2xl text-primary">
                      ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="bg-base-100 shadow-xl p-8 rounded-[2.5rem] border border-base-300 h-fit sticky top-24">
            <h2 className="mb-8 font-black text-2xl text-neutral border-b border-base-200 pb-4">Order Summary</h2>

            <div className="space-y-4 font-bold text-neutral/70">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span className="text-neutral">{totalItems}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-neutral">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-success">FREE</span>
              </div>

              <div className="pt-6 mt-6 border-t-2 border-dashed border-base-200">
                <div className="flex justify-between font-black text-2xl text-neutral">
                  <span>Total</span>
                  <span className="text-primary">${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Link href='/checkout' className="block mt-10">
              <button className="bg-primary hover:bg-primary/90 py-5 rounded-2xl w-full font-black text-white text-lg shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95">
                Proceed to Checkout
              </button>
            </Link>
            
            <p className="mt-4 text-[10px] text-center font-bold text-neutral/30 uppercase tracking-widest">
              Secure Checkout • Powered by Pawfect Match
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPageClient;