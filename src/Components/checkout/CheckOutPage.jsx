"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getCartItems } from "@/action/server/cart";
import { createOrderFromCart } from "@/action/server/order";
import { FaArrowLeft, FaShoppingBag } from "react-icons/fa";
import Swal from "sweetalert2";
import AuthButtons from "../button/AuthButtons";

const CheckoutPageClient = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    customerName: session?.user?.name || "",
    phone: "",
    address: "",
    city: "",
    area: "",
    paymentMethod: "Cash on Delivery",
    note: "",
  });

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

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      customerName: session?.user?.name || "",
    }));
  }, [session?.user?.name]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      return sum + Number(item.price || 0) * Number(item.quantity || 1);
    }, 0);
  }, [cartItems]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      return sum + Number(item.quantity || 1);
    }, 0);
  }, [cartItems]);

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

    if (!cartItems.length) {
      Swal.fire("Cart Empty", "Please add products before checkout.", "warning");
      return;
    }

    startTransition(async () => {
      const result = await createOrderFromCart({
        userEmail: session.user.email,
        ...formData,
      });

      if (!result?.success) {
        Swal.fire("Error", result?.message || "Order failed.", "error");
        return;
      }

      Swal.fire("Success", "Your order has been placed successfully.", "success");
      router.push(`/checkout/success?orderId=${result.insertedId}`);
      router.refresh();
    });
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="font-bold text-lg">Loading checkout...</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex flex-col justify-center items-center px-4 min-h-screen text-center">
        <div className="bg-base-200 mb-6 p-8 rounded-full">
          <FaShoppingBag className="text-primary text-5xl" />
        </div>
        <h2 className="font-black text-3xl">Please login first</h2>
        <p className="mt-3 text-gray-500">
          You need an account to continue checkout.
        </p>
        <AuthButtons />
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <div className="flex flex-col justify-center items-center px-4 min-h-screen text-center">
        <div className="bg-base-200 mb-6 p-8 rounded-full">
          <FaShoppingBag className="text-primary text-5xl" />
        </div>
        <h2 className="font-black text-3xl">Your cart is empty</h2>
        <p className="mt-3 text-gray-500">
          Add some products before going to checkout.
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
          href="/cart"
          className="inline-flex items-center gap-2 mb-8 font-bold text-primary"
        >
          <FaArrowLeft />
          Back to Cart
        </Link>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
          <form
            onSubmit={handlePlaceOrder}
            className="lg:col-span-2 bg-base-100 shadow p-6 rounded-3xl"
          >
            <h1 className="mb-6 font-black text-3xl">Checkout</h1>

            <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
              <div>
                <label className="block mb-2 font-bold">Full Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="bg-base-200 px-4 py-3 rounded-xl w-full outline-none"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-bold">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-base-200 px-4 py-3 rounded-xl w-full outline-none"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 font-bold">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="bg-base-200 px-4 py-3 rounded-xl w-full outline-none"
                  placeholder="House, road, area details"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-bold">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="bg-base-200 px-4 py-3 rounded-xl w-full outline-none"
                  placeholder="Enter city"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-bold">Area / Zone</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="bg-base-200 px-4 py-3 rounded-xl w-full outline-none"
                  placeholder="Enter area"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 font-bold">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="bg-base-200 px-4 py-3 rounded-xl w-full outline-none"
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Online Payment">Online Payment</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 font-bold">Order Note</label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  rows={4}
                  className="bg-base-200 px-4 py-3 rounded-xl w-full outline-none"
                  placeholder="Optional note for delivery"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="bg-primary hover:bg-primary/90 mt-8 py-4 rounded-xl w-full font-black text-white disabled:opacity-70"
            >
              {isPending ? "Placing Order..." : "Place Order"}
            </button>
          </form>

          <div className="bg-base-100 shadow p-6 rounded-3xl h-fit">
            <h2 className="mb-6 font-black text-2xl">Order Summary</h2>

            <div className="space-y-4 mb-6 max-h-[350px] overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-3 bg-base-200 p-3 rounded-2xl"
                >
                  <div className="relative bg-white rounded-xl w-20 h-20 overflow-hidden">
                    <Image
                      src={item.image || "https://placehold.co/200x200"}
                      alt={item.productName}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold line-clamp-2">{item.productName}</h3>
                    <p className="text-gray-500 text-sm">
                      Qty: {item.quantity}
                    </p>
                    <p className="font-bold text-primary text-sm">
                      ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

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
                <span className="font-bold">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between font-black text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPageClient;
