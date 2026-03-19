"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCartItems } from "@/action/server/cart";
import {
  FaArrowLeft,
  FaShoppingBag,
  FaTruck,
  FaCreditCard,
  FaCheckCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useCartStore } from "@/lib/useCartStore";
import {
  createOrderFromCart,
  createSingleFoodOrder,
} from "@/action/server/order";
import { getSingleFood } from "@/action/server/foods";
import AuthButtons from "../button/AuthButtons";
import {
  createStripeCheckoutFromCart,
  createStripeCheckoutForSingleFood,
} from "@/action/server/stripe";

const CheckoutPageClient = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const setCartCount = useCartStore((state) => state.setCartCount);
  const searchParams = useSearchParams();

  const mode = searchParams.get("mode");
  const foodId = searchParams.get("foodId");
  const isBuyNow = mode === "buy-now" && !!foodId;

  const [cartItems, setCartItems] = useState([]);
  const [buyNowItem, setBuyNowItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    address: "",
    city: "",
    area: "",
    paymentMethod: "Cash on Delivery",
    note: "",
  });

  const loadCheckoutData = async () => {
    if (!session?.user?.email) {
      setCartItems([]);
      setBuyNowItem(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      if (isBuyNow) {
        const item = await getSingleFood(foodId);
        setBuyNowItem(item?._id ? item : null);
        setCartItems([]);
      } else {
        const items = await getCartItems(session.user.email);
        setCartItems(items || []);
        setBuyNowItem(null);
      }
    } catch (error) {
      console.error("Checkout load error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status !== "loading") {
      loadCheckoutData();
    }
  }, [status, session?.user?.email, isBuyNow, foodId]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      customerName: session?.user?.name || "",
    }));
  }, [session?.user?.name]);

  const finalBuyNowPrice = useMemo(() => {
    if (!buyNowItem) return 0;
    const hasDiscount =
      buyNowItem.discountPrice &&
      Number(buyNowItem.discountPrice) < Number(buyNowItem.price);
    return Number(hasDiscount ? buyNowItem.discountPrice : buyNowItem.price);
  }, [buyNowItem]);

  const checkoutItems = useMemo(() => {
    if (isBuyNow && buyNowItem) {
      return [
        {
          _id: buyNowItem._id,
          productId: buyNowItem._id,
          productName: buyNowItem.productName,
          image: buyNowItem.image,
          price: finalBuyNowPrice,
          quantity: 1,
          brand: buyNowItem.brand,
          weight: buyNowItem.weight,
          weightUnit: buyNowItem.weightUnit,
          stock: buyNowItem.stock,
        },
      ];
    }

    return cartItems;
  }, [isBuyNow, buyNowItem, cartItems, finalBuyNowPrice]);

  const subtotal = useMemo(() => {
    return checkoutItems.reduce((sum, item) => {
      return sum + Number(item.price || 0) * Number(item.quantity || 1);
    }, 0);
  }, [checkoutItems]);

  const totalItems = useMemo(() => {
    return checkoutItems.reduce((sum, item) => {
      return sum + Number(item.quantity || 1);
    }, 0);
  }, [checkoutItems]);

  const shipping = 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!session?.user?.email) {
      Swal.fire("Login Required", "Please login first.", "warning");
      return;
    }

    if (!checkoutItems.length) {
      Swal.fire("No Product", "No product found for checkout.", "warning");
      return;
    }

    startTransition(async () => {
      if (formData.paymentMethod === "Online Payment") {
        const result = isBuyNow
          ? await createStripeCheckoutForSingleFood({
              userEmail: session.user.email,
              ...formData,
              foodId,
              quantity: 1,
            })
          : await createStripeCheckoutFromCart({
              userEmail: session.user.email,
              ...formData,
            });

        if (!result?.success) {
          Swal.fire(
            "Error",
            result?.message || "Payment session failed",
            "error",
          );
          return;
        }

        window.location.href = result.url;
        return;
      }

      const result = isBuyNow
        ? await createSingleFoodOrder({
            userEmail: session.user.email,
            ...formData,
            foodId,
            quantity: 1,
          })
        : await createOrderFromCart({
            userEmail: session.user.email,
            ...formData,
          });

      if (!result?.success) {
        Swal.fire("Error", result?.message || "Order failed.", "error");
        return;
      }

      setCartCount(0);

      Swal.fire({
        title: "Order Placed!",
        text: "Thank you for shopping with Pawfect Match.",
        icon: "success",
        confirmButtonColor: "#f97316",
      });

      router.push(`/checkout/success?orderId=${result.insertedId}`);
      router.refresh();
    });
  };

  // --- States: Loading, Login Required, Empty Cart ---
  if (status === "loading" || loading) {
    return (
      <div className="flex flex-col justify-center items-center bg-gray-50 min-h-screen">
        <span className="text-primary loading loading-dots loading-lg"></span>
        <p className="mt-4 font-bold text-gray-500 text-xs uppercase tracking-widest animate-pulse">
          Preparing Checkout...
        </p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex flex-col justify-center items-center bg-gray-50 px-4 min-h-screen text-center">
        <div className="bg-white shadow-xl mb-6 p-10 rounded-full">
          <FaShoppingBag className="text-primary text-6xl" />
        </div>
        <h2 className="font-black text-gray-900 text-3xl">
          Please login first
        </h2>
        <p className="mt-3 max-w-sm text-gray-500">
          You need to be logged in to complete your purchase and track orders.
        </p>
        <div className="mt-8">
          <AuthButtons />
        </div>
      </div>
    );
  }

  if (!checkoutItems.length) {
    return (
      <div className="flex flex-col justify-center items-center bg-gray-50 px-4 min-h-screen text-center">
        <div className="bg-white shadow-xl mb-6 p-10 rounded-full">
          <FaShoppingBag className="text-gray-200 text-6xl" />
        </div>
        <h2 className="font-black text-3xl">
          {isBuyNow ? "Product not found" : "Your cart is empty"}
        </h2>
        <p className="mt-3 text-gray-500">
          {isBuyNow
            ? "This product is unavailable for checkout."
            : "Add some products before going to checkout."}
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
    <div className="bg-gray-50/50 px-4 md:px-8 py-10 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <Link
          href={isBuyNow ? `/petfoods/${foodId}` : "/cart"}
          className="inline-flex items-center gap-2 mb-8 font-bold text-primary"
        >
          <FaArrowLeft />
          {isBuyNow ? "Back to Product" : "Back to Cart"}
        </Link>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
          <form
            onSubmit={handlePlaceOrder}
            className="lg:col-span-2 bg-base-100 shadow p-6 rounded-3xl"
          >
            <h1 className="mb-2 font-black text-3xl">
              {isBuyNow ? "Buy Now Checkout" : "Checkout"}
            </h1>
            <p className="mb-6 text-gray-500">
              {isBuyNow
                ? "Complete your order for this item."
                : "Complete your order details below."}
            </p>

            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
              <div className="md:col-span-2">
                <h3 className="mb-4 font-bold text-gray-400 text-xs uppercase tracking-widest">
                  Shipping Information
                </h3>
              </div>

              <div className="md:col-span-1">
                <label className="block mb-2 font-bold text-gray-700 text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="bg-gray-50 focus:bg-white px-5 py-4 border border-gray-100 focus:border-primary rounded-2xl outline-none w-full transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="md:col-span-1">
                <label className="block mb-2 font-bold text-gray-700 text-sm">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-gray-50 focus:bg-white px-5 py-4 border border-gray-100 focus:border-primary rounded-2xl outline-none w-full transition-all"
                  placeholder="01XXXXXXXXX"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 font-bold text-gray-700 text-sm">
                  Delivery Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="bg-gray-50 focus:bg-white px-5 py-4 border border-gray-100 focus:border-primary rounded-2xl outline-none w-full transition-all"
                  placeholder="House no, Flat, Street details"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-bold text-gray-700 text-sm">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="bg-gray-50 focus:bg-white px-5 py-4 border border-gray-100 focus:border-primary rounded-2xl outline-none w-full transition-all"
                  placeholder="Dhaka"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-bold text-gray-700 text-sm">
                  Area / Zone
                </label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="bg-gray-50 focus:bg-white px-5 py-4 border border-gray-100 focus:border-primary rounded-2xl outline-none w-full transition-all"
                  placeholder="Uttara"
                  required
                />
              </div>

              <div className="md:col-span-2 mt-4">
                <h3 className="mb-4 font-bold text-gray-400 text-xs uppercase tracking-widest">
                  Payment Strategy
                </h3>
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                  <label
                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${formData.paymentMethod === "Cash on Delivery" ? "border-primary bg-orange-50/50" : "border-gray-100 bg-gray-50"}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={formData.paymentMethod === "Cash on Delivery"}
                      onChange={handleChange}
                      className="radio radio-primary"
                    />
                    <div>
                      <p className="font-black text-gray-900">
                        Cash on Delivery
                      </p>
                      <p className="text-[10px] text-gray-500">
                        Pay when you receive
                      </p>
                    </div>
                    <FaTruck
                      className={`ml-auto text-xl ${formData.paymentMethod === "Cash on Delivery" ? "text-primary" : "text-gray-300"}`}
                    />
                  </label>

                  <label
                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${formData.paymentMethod === "Online Payment" ? "border-primary bg-orange-50/50" : "border-gray-100 bg-gray-50"}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Online Payment"
                      checked={formData.paymentMethod === "Online Payment"}
                      onChange={handleChange}
                      className="radio radio-primary"
                    />
                    <div>
                      <p className="font-black text-gray-900">Online Payment</p>
                      <p className="text-[10px] text-gray-500">
                        Visa, Mastercard, BKash
                      </p>
                    </div>
                    <FaCreditCard
                      className={`ml-auto text-xl ${formData.paymentMethod === "Online Payment" ? "text-primary" : "text-gray-300"}`}
                    />
                  </label>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 font-bold text-gray-700 text-sm">
                  Special Instructions (Optional)
                </label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  rows={3}
                  className="bg-gray-50 focus:bg-white px-5 py-4 border border-gray-100 focus:border-primary rounded-2xl outline-none w-full transition-all"
                  placeholder="Any specific note for the delivery person..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="bg-gray-900 hover:bg-primary disabled:opacity-50 shadow-xl mt-10 py-5 rounded-[1.5rem] w-full font-black text-white text-lg active:scale-95 transition-all"
            >
              {isPending
                ? "Processing..."
                : formData.paymentMethod === "Online Payment"
                  ? "Proceed to Payment"
                  : "Confirm Order"}
            </button>
          </form>

          {/* RIGHT: Order Summary */}
          <div className="top-24 sticky bg-white shadow-2xl shadow-gray-200/50 p-8 border border-gray-100 rounded-[2.5rem] h-fit">
            <h2 className="mb-8 pb-4 border-gray-50 border-b font-black text-gray-900 text-2xl">
              Summary
            </h2>

            <div className="space-y-4 mb-8 pr-2 max-h-[400px] overflow-y-auto custom-scrollbar">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4">
                  <div className="relative bg-gray-50 border border-gray-100 rounded-xl w-16 h-16 overflow-hidden shrink-0">
                    <Image
                      src={item.image || "https://placehold.co/200x200"}
                      alt={item.productName}
                      fill
                      className="p-2 object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm truncate">
                      {item.productName}
                    </h3>
                    <p className="font-bold text-[10px] text-gray-400 uppercase tracking-tighter">
                      Qty: {item.quantity} × ${item.price}
                    </p>
                  </div>
                  <p className="font-black text-gray-900 text-sm">
                    ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-gray-50 border-t">
              <div className="flex justify-between font-bold text-gray-500 text-sm">
                <span>Items Subtotal</span>
                <span className="text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-500 text-sm">
                <span>Shipping Fee</span>
                <span className="text-[10px] text-green-500 uppercase tracking-widest">
                  {shipping === 0 ? "Free Delivery" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 font-black text-gray-900 text-2xl">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-gray-50 mt-8 p-4 border border-gray-100 rounded-2xl">
              <FaCheckCircle className="mt-1 text-green-500" />
              <p className="font-bold text-[10px] text-gray-400 uppercase leading-relaxed">
                Secure transaction guaranteed with Pawfect Match protection
                policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPageClient;
