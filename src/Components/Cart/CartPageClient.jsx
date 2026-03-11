"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useSession, signIn } from "next-auth/react";
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

    setLoading(true);
    const items = await getCartItems(session.user.email);
    setCartItems(items || []);
    setLoading(false);
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
    startTransition(async () => {
      await clearCart(session.user.email);
      await loadCart();
    });
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="font-bold text-lg">Loading cart...</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex flex-col justify-center items-center px-4 min-h-screen text-center">
        <div className="bg-base-200 mb-6 p-8 rounded-full">
          <FaShoppingCart className="text-primary text-5xl" />
        </div>
        <h2 className="font-black text-3xl">Please login first</h2>
        <p className="mt-3 text-gray-500">
          You need an account to view and use the cart.
        </p>

        <AuthButtons/>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center px-4 min-h-screen text-center">
        <div className="bg-base-200 mb-6 p-8 rounded-full">
          <FaShoppingCart className="text-primary text-5xl" />
        </div>
        <h2 className="font-black text-3xl">Your cart is empty</h2>
        <p className="mt-3 text-gray-500">
          Add some pet food and it will appear here.
        </p>

        <Link
          href="/pet-food"
          className="inline-flex items-center gap-2 bg-primary mt-6 px-6 py-3 rounded-xl font-bold text-white"
        >
          <FaArrowLeft />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-base-200 min-h-screen px-4 md:px-8 py-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/pet-food"
          className="inline-flex items-center gap-2 mb-8 font-bold text-primary"
        >
          <FaArrowLeft />
          Continue Shopping
        </Link>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 bg-base-100 shadow p-6 rounded-3xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="font-black text-3xl">Shopping Cart</h1>

              <button
                onClick={handleClearCart}
                disabled={isPending}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-bold text-white"
              >
                Clear Cart
              </button>
            </div>

            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex md:flex-row flex-col gap-5 bg-base-200 p-4 rounded-2xl"
                >
                  <div className="relative bg-white rounded-2xl w-full md:w-36 h-36 overflow-hidden">
                    <Image
                      src={item.image || "https://placehold.co/300x300"}
                      alt={item.productName}
                      fill
                      className="object-contain p-4"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-black text-xl">{item.productName}</h3>
                    <p className="mt-1 text-gray-500 text-sm">{item.brand}</p>
                    <p className="mt-1 text-gray-500 text-sm">
                      {item.weight} {item.weightUnit}
                    </p>
                    <p className="mt-2 font-bold text-primary text-lg">
                      ${item.price}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-4">
                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity - 1)
                        }
                        className="flex justify-center items-center bg-white rounded-lg w-10 h-10"
                      >
                        <FaMinus />
                      </button>

                      <span className="min-w-[30px] font-bold text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.stock}
                        className="flex justify-center items-center bg-white disabled:opacity-50 rounded-lg w-10 h-10"
                      >
                        <FaPlus />
                      </button>

                      <button
                        onClick={() => handleRemove(item._id)}
                        className="inline-flex items-center gap-2 bg-red-100 hover:bg-red-200 ml-2 px-4 py-2 rounded-xl font-bold text-red-600"
                      >
                        <FaTrash />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex md:justify-end items-end">
                    <p className="font-black text-xl">
                      ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-base-100 shadow p-6 rounded-3xl h-fit">
            <h2 className="mb-6 font-black text-2xl">Order Summary</h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span className="font-bold">{totalItems}</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold">Free</span>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between font-black text-lg">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Link href='/checkout'>

            <button className="bg-primary hover:bg-primary/90 mt-6 py-4 rounded-xl w-full font-black text-white">
              Checkout
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPageClient;

