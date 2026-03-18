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

  const handleQuantityChange = (cartId, quantity, stock) => {
    if (quantity < 1) return;
    if (quantity > stock) {
      toast.error("Sorry, not enough stock available!");
      return;
    }
    
    startTransition(async () => {
      const result = await updateCartQuantity({
        cartId,
        userEmail: session.user.email,
        quantity,
      });
      if (result?.success) {
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
    if (window.confirm("Are you sure you want to clear your cart?")) {
      startTransition(async () => {
        await clearCart(session.user.email);
        toast.success("Cart cleared!");
        await loadCart();
      });
    }
  };

  // Loading & Empty States (No changes needed, they look good)
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
        <h2 className="font-black text-neutral text-3xl">Login Required</h2>
        <p className="mt-3 max-w-sm text-neutral/60">
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
      <div className="flex flex-col justify-center items-center bg-base-200 px-4 min-h-screen text-center">
        <div className="bg-base-100 shadow-lg mb-6 p-10 rounded-full">
          <FaShoppingCart className="text-primary/20 text-6xl" />
        </div>
        <h2 className="font-black text-neutral text-3xl">Your cart is empty</h2>
        <p className="mt-3 text-neutral/60">
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
          className="inline-flex items-center gap-2 mb-8 font-bold text-primary hover:underline"
        >
          <FaArrowLeft />
          Continue Shopping
        </Link>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 bg-base-100 shadow-xl p-8 border border-base-300 rounded-[2.5rem]">
            <div className="flex justify-between items-center mb-8">
              <h1 className="font-black text-neutral text-3xl">Cart Details ({totalItems})</h1>
              <button
                onClick={handleClearCart}
                disabled={isPending}
                className="rounded-xl font-bold text-white capitalize btn btn-error btn-sm"
              >
                Clear Cart
              </button>
            </div>

            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="group flex md:flex-row flex-col gap-6 bg-base-200 p-5 border border-transparent hover:border-primary/10 rounded-3xl transition-all"
                >
                  <div className="relative bg-white shadow-inner rounded-2xl w-full md:w-32 h-32 overflow-hidden shrink-0">
                    <Image
                      src={item.image || "https://placehold.co/300x300"}
                      alt={item.productName || "Product"}
                      fill
                      className="p-4 object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex flex-col flex-1 justify-between py-1">
                    <div>
                        <h3 className="font-black text-neutral text-xl leading-tight">{item.productName}</h3>
                        <div className="flex gap-3 mt-1 font-bold text-neutral/40 text-xs uppercase">
                           <span>{item.brand}</span>
                           {item.weight && (
                               <>
                                <span>•</span>
                                <span>{item.weight} {item.weightUnit}</span>
                               </>
                           )}
                           {item.category && (
                               <>
                                <span>•</span>
                                <span className="text-primary">{item.category}</span>
                               </>
                           )}
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 mt-4">
                      <div className="flex items-center bg-white shadow-sm p-1 border border-base-300 rounded-xl">
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity - 1, item.stock)}
                          disabled={isPending}
                          className="flex justify-center items-center disabled:opacity-30 w-8 h-8 hover:text-primary transition-colors"
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="min-w-[40px] font-black text-lg text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity + 1, item.stock)}
                          disabled={item.quantity >= item.stock || isPending}
                          className="flex justify-center items-center disabled:opacity-30 w-8 h-8 hover:text-primary transition-colors"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemove(item._id)}
                        disabled={isPending}
                        className="hover:bg-error/10 rounded-xl text-error/60 hover:text-error btn btn-ghost btn-sm"
                      >
                        <FaTrash />
                        <span className="font-bold">Remove</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex md:flex-col justify-between items-end md:text-right">
                    <p className="font-bold text-neutral/30 text-sm">Total Price</p>
                    <p className="font-black text-primary text-2xl">
                      ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="top-24 sticky bg-base-100 shadow-xl p-8 border border-base-300 rounded-[2.5rem] h-fit">
            <h2 className="mb-8 pb-4 border-base-200 border-b font-black text-neutral text-2xl">Order Summary</h2>

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
                <span className="text-success text-sm uppercase tracking-widest">Free</span>
              </div>

              <div className="mt-6 pt-6 border-base-200 border-t-2 border-dashed">
                <div className="flex justify-between font-black text-neutral text-2xl">
                  <span>Grand Total</span>
                  <span className="text-primary">${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Link href='/checkout' className="block mt-10">
              <button className="bg-primary hover:bg-primary/90 shadow-primary/20 shadow-xl py-5 rounded-2xl w-full font-black text-white text-lg active:scale-95 transition-all hover:-translate-y-1">
                Proceed to Checkout
              </button>
            </Link>
            
            <p className="mt-4 font-bold text-[10px] text-neutral/30 text-center uppercase tracking-widest">
              Secure Checkout • Powered by Pawfect Match
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPageClient;