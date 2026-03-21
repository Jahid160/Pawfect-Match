"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  MapPin,
  Package,
  Phone,
  User,
} from "lucide-react";

const getStatusClass = (status) => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    case "processing":
      return "bg-purple-100 text-purple-700";
    case "shipped":
      return "bg-indigo-100 text-indigo-700";
    default:
      return "bg-blue-100 text-blue-700";
  }
};

const getPaymentClass = (status) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-700";
    case "failed":
      return "bg-red-100 text-red-700";
    default:
      return "bg-yellow-100 text-yellow-700";
  }
};

const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString();
};

const SingleOrderClient = ({ order }) => {
  if (!order) {
    return (
      <div className="rounded-3xl border border-red-100 bg-white p-10 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800">Order not found</h2>
        <Link
          href="/dashboard/pet-food&accessories"
          className="mt-5 inline-flex rounded-2xl bg-orange-500 px-5 py-3 text-sm font-medium text-white hover:bg-orange-600"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* top */}
      <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              href="/dashboard/pet-food&accessories"
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-orange-600 hover:text-orange-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Orders
            </Link>

            <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
            <p className="mt-1 text-sm text-gray-500">
              Order ID: #{order._id?.slice(-6).toUpperCase()}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${getPaymentClass(
                order.paymentStatus
              )}`}
            >
              Payment: {order.paymentStatus}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                order.orderStatus
              )}`}
            >
              {order.orderStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* left */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
            <h2 className="mb-5 text-lg font-semibold text-gray-800">
              Ordered Items
            </h2>

            <div className="space-y-4">
              {order.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 rounded-3xl border border-gray-100 p-4 sm:flex-row"
                >
                  <div className="relative h-24 w-24 overflow-hidden rounded-2xl border bg-gray-50">
                    <Image
                      src={item.image || "/placeholder.png"}
                      alt={item.productName || "Product"}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-800">
                      {item.productName || "Unnamed Product"}
                    </h3>

                    <div className="mt-2 space-y-1 text-sm text-gray-500">
                      <p>Brand: {item.brand || "N/A"}</p>
                      <p>
                        Weight: {item.weight || "N/A"} {item.weightUnit || ""}
                      </p>
                      <p>Quantity: {item.quantity || 0}</p>
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-sm text-gray-500">
                      Price: ${Number(item.price || 0)}
                    </p>
                    <p className="mt-2 text-base font-bold text-gray-800">
                      ${Number(item.lineTotal || 0)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* {order.note ? (
            <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
              <h2 className="mb-2 text-lg font-semibold text-gray-800">
                Customer Note
              </h2>
              <p className="text-sm leading-6 text-gray-600">{order.note}</p>
            </div>
          ) : null} */}
        </div>

        {/* right */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-orange-500" />
                <span>{formatDate(order.createdAt)}</span>
              </div>

              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-orange-500" />
                <span>{order.paymentMethod || "N/A"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-orange-500" />
                <span>{order.totalItems || 0} item(s)</span>
              </div>
            </div>

            <div className="mt-5 border-t pt-4 text-sm">
              <div className="flex items-center justify-between py-2 text-gray-600">
                <span>Subtotal</span>
                <span>${Number(order.subtotal || 0)}</span>
              </div>
              <div className="flex items-center justify-between py-2 text-gray-600">
                <span>Shipping</span>
                <span>${Number(order.shippingCost || 0)}</span>
              </div>
              <div className="flex items-center justify-between py-2 text-base font-bold text-gray-800">
                <span>Total</span>
                <span>${Number(order.totalAmount || 0)}</span>
              </div>
            </div>
          </div>

          {/* <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Customer Info
            </h2>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-orange-500" />
                <span>{order.customerName || "N/A"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-orange-500" />
                <span>{order.phone || "N/A"}</span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-orange-500" />
                <span>
                  {order.shippingAddress?.address || "N/A"},{" "}
                  {order.shippingAddress?.area || ""},{" "}
                  {order.shippingAddress?.city || ""}
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SingleOrderClient;
