"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCartItems } from "@/action/server/cart";
import { FaArrowLeft, FaShoppingBag, FaTruck, FaCreditCard, FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import AuthButtons from "../button/AuthButtons";
import { useCartStore } from "@/lib/useCartStore";

import {
  createOrderFromCart,
  createSingleOrder, 
} from "@/action/server/order";
import { getSingleFood } from "@/action/server/foods";
import { getSingleAccessory } from "@/action/server/accessories";
import {
  createStripeCheckoutFromCart,
  createStripeCheckoutForSingleProduct,
} from "@/action/server/stripe";

const CheckoutPageClient = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const setCartCount = useCartStore((state) => state.setCartCount);
  const searchParams = useSearchParams();

  // URL Parameters
  const mode = searchParams.get("mode");
  const productId = searchParams.get("productId") || searchParams.get("foodId"); 
  const productType = searchParams.get("productType") || "food"; 
  const isBuyNow = mode === "buy-now" && !!productId;

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
        let item = null;
        
        if (productType === "accessory") {
            item = await getSingleAccessory(productId);
        } else {
            item = await getSingleFood(productId);
        }
        
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
  }, [status, session?.user?.email, isBuyNow, productId, productType]);

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
          productName: buyNowItem.title || buyNowItem.productName,
          image: (Array.isArray(buyNowItem.images) ? buyNowItem.images[0] : buyNowItem.image),
          price: finalBuyNowPrice,
          quantity: 1,
          brand: buyNowItem.brand,
          productType: productType,
        },
      ];
    }
    return cartItems;
  }, [isBuyNow, buyNowItem, cartItems, finalBuyNowPrice, productType]);

  const subtotal = useMemo(() => {
    return checkoutItems.reduce((sum, item) => {
      return sum + Number(item.price || 0) * Number(item.quantity || 1);
    }, 0);
  }, [checkoutItems]);

  const totalItems = useMemo(() => {
    return checkoutItems.reduce((sum, item) => sum + Number(item.quantity || 1), 0);
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
          ? await createStripeCheckoutForSingleProduct({ 
              userEmail: session.user.email,
              ...formData,
              productId: productId, 
              productType: productType,
              quantity: 1,
            })
          : await createStripeCheckoutFromCart({
              userEmail: session.user.email,
              ...formData,
            });

        if (!result?.success) {
          Swal.fire("Error", result?.message || "Payment session failed", "error");
          return;
        }

        window.location.href = result.url;
        return;
      }

      const result = isBuyNow
        ? await createSingleOrder({
            userEmail: session.user.email,
            ...formData,
            productId: productId,
            productType: productType,
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

      if (!isBuyNow) {
        setCartCount(0);
      }

      Swal.fire({
        title: "Order Placed!",
        text: "Thank you for shopping with Pawfect Match.",
        icon: "success",
        confirmButtonColor: "#f97316",
      });

      router.push(`/checkout/success?orderId=${result.insertedId || result.orderId}`);
      router.refresh();
    });
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex flex-col justify-center items-center bg-gray-50 min-h-screen">
        <span className="text-primary loading loading-dots loading-lg"></span>
        <p className="mt-4 font-bold text-gray-500 text-xs uppercase tracking-widest animate-pulse">Preparing Checkout...</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex flex-col justify-center items-center bg-gray-50 px-4 min-h-screen font-sans text-center">
        <div className="bg-white shadow-xl mb-6 p-10 rounded-full">
          <FaShoppingBag className="text-primary text-6xl" />
        </div>
        <h2 className="font-black text-gray-900 text-3xl">Please login first</h2>
        <p className="mt-3 max-w-sm text-gray-500">You need to be logged in to complete your purchase.</p>
        <div className="mt-8"><AuthButtons /></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 px-4 md:px-8 py-10 min-h-screen font-sans">
      <div className="mx-auto max-w-7xl">
        <Link
          href={isBuyNow ? (productType === "accessory" ? `/pet-accessories/${productId}` : `/petfoods/${productId}`) : "/cart"}
          className="inline-flex items-center gap-2 hover:gap-3 mb-8 font-bold text-primary transition-all"
        >
          <FaArrowLeft />
          {isBuyNow ? "Back to Product" : "Back to Cart"}
        </Link>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
          {/* Form and Summary Sections (Keep your original JSX here) */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-2 bg-white shadow-sm p-8 border border-gray-100 rounded-[2rem]">
            <h1 className="mb-2 font-black text-gray-900 text-3xl tracking-tight">
              {isBuyNow ? "Quick Checkout" : "Shipping Details"}
            </h1>
            <p className="mb-10 text-gray-500 text-sm italic">Complete your pet's happiness journey below.</p>

            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
              <div className="md:col-span-2"><h3 className="font-bold text-gray-400 text-xs uppercase tracking-[0.2em]">Contact Information</h3></div>
              
              <div className="md:col-span-1">
                <label className="block mb-2 font-bold text-gray-700 text-sm">Full Name</label>
                <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} className="bg-gray-50 focus:bg-white px-5 py-4 border border-gray-100 focus:border-primary rounded-2xl outline-none w-full transition-all" placeholder="John Doe" required />
              </div>

              <div className="md:col-span-1">
                <label className="block mb-2 font-bold text-gray-700 text-sm">Phone Number</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="bg-gray-50 focus:bg-white px-5 py-4 border border-gray-100 focus:border-primary rounded-2xl outline-none w-full transition-all" placeholder="01XXXXXXXXX" required />
              </div>

              <div className="md:col-span-2 mt-4"><h3 className="font-bold text-gray-400 text-xs uppercase tracking-[0.2em]">Delivery Address</h3></div>

              <div className="md:col-span-2">
                <label className="block mb-2 font-bold text-gray-700 text-sm">Street Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className="bg-gray-50 focus:bg-white px-5 py-4 border border-gray-100 focus:border-primary rounded-2xl outline-none w-full transition-all" placeholder="House, Road, Apartment details" required />
              </div>

              <div>
                <label className="block mb-2 font-bold text-gray-700 text-sm">City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} className="bg-gray-50 focus:bg-white px-5 py-4 border border-gray-100 focus:border-primary rounded-2xl outline-none w-full transition-all" placeholder="Dhaka" required />
              </div>

              <div>
                <label className="block mb-2 font-bold text-gray-700 text-sm">Area</label>
                <input type="text" name="area" value={formData.area} onChange={handleChange} className="bg-gray-50 focus:bg-white px-5 py-4 border border-gray-100 focus:border-primary rounded-2xl outline-none w-full transition-all" placeholder="e.g. Uttara" required />
              </div>

              <div className="md:col-span-2 mt-6">
                <h3 className="mb-4 font-bold text-gray-400 text-xs uppercase tracking-[0.2em]">Choose Payment Method</h3>
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                  <label className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${formData.paymentMethod === 'Cash on Delivery' ? 'border-primary bg-orange-50/50' : 'border-gray-100 bg-gray-50'}`}>
                    <input type="radio" name="paymentMethod" value="Cash on Delivery" checked={formData.paymentMethod === 'Cash on Delivery'} onChange={handleChange} className="radio radio-primary radio-sm" />
                    <div className="flex flex-col">
                      <span className="font-black text-gray-900">Cash on Delivery</span>
                      <span className="text-[10px] text-gray-400">Pay when items arrive</span>
                    </div>
                    <FaTruck className={`ml-auto text-xl ${formData.paymentMethod === 'Cash on Delivery' ? 'text-primary' : 'text-gray-300'}`} />
                  </label>

                  <label className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${formData.paymentMethod === 'Online Payment' ? 'border-primary bg-orange-50/50' : 'border-gray-100 bg-gray-50'}`}>
                    <input type="radio" name="paymentMethod" value="Online Payment" checked={formData.paymentMethod === 'Online Payment'} onChange={handleChange} className="radio radio-primary radio-sm" />
                    <div className="flex flex-col">
                      <span className="font-black text-gray-900">Online Payment</span>
                      <span className="text-[10px] text-gray-400">Stripe, Cards, Mobile Bank</span>
                    </div>
                    <FaCreditCard className={`ml-auto text-xl ${formData.paymentMethod === 'Online Payment' ? 'text-primary' : 'text-gray-300'}`} />
                  </label>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 font-bold text-gray-700 text-sm">Order Note (Optional)</label>
                <textarea name="note" value={formData.note} onChange={handleChange} rows={3} className="bg-gray-50 focus:bg-white px-5 py-4 border border-gray-100 focus:border-primary rounded-2xl outline-none w-full transition-all" placeholder="Any specific instruction for us..." />
              </div>
            </div>

            <button type="submit" disabled={isPending} className="bg-gray-900 hover:bg-primary shadow-2xl shadow-gray-200 mt-10 py-5 rounded-2xl w-full font-black text-white text-lg active:scale-95 transition-all duration-300">
              {isPending ? <span className="loading loading-spinner loading-sm"></span> : formData.paymentMethod === "Online Payment" ? "Proceed to Stripe" : "Place Order Now"}
            </button>
          </form>

          {/* Right Summary */}
          <div className="top-24 sticky h-fit">
            <div className="bg-white shadow-2xl shadow-gray-200/50 p-8 border border-gray-100 rounded-[2.5rem]">
              <h2 className="mb-8 pb-4 border-gray-50 border-b font-black text-gray-900 text-2xl tracking-tight">Your Order</h2>

              <div className="space-y-5 mb-8 pr-2 max-h-[350px] overflow-y-auto custom-scrollbar">
                {checkoutItems.map((item) => (
                  <div key={item._id || item.productId} className="flex items-center gap-4">
                    <div className="relative bg-gray-50 border border-gray-100 rounded-xl w-16 h-16 overflow-hidden shrink-0">
                      <Image src={item.image || "https://placehold.co/200x200"} alt={item.productName || "Product"} fill className="p-2 object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-sm truncate">{item.productName}</h3>
                      <p className="font-bold text-[10px] text-gray-400 uppercase tracking-tighter">Qty: {item.quantity} × ${item.price}</p>
                    </div>
                    <p className="font-black text-gray-900 text-sm">${(Number(item.price) * Number(item.quantity)).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-gray-50 border-t">
                <div className="flex justify-between font-bold text-gray-400 text-xs uppercase tracking-widest">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-black text-gray-900 text-sm">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-4 font-black text-gray-900 text-2xl tracking-tighter">
                  <span>Total Amount</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-green-50/50 mt-8 p-4 border border-green-100 rounded-2xl">
                <FaCheckCircle className="mt-1 text-green-500" size={14} />
                <p className="font-bold text-[9px] text-green-700 uppercase leading-relaxed tracking-wider">
                  Guaranteed safe & secure checkout with Pawfect Match.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPageClient;