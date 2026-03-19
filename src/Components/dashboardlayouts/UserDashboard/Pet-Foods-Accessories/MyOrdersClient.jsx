"use client";

import Link from "next/link";
import { ShoppingBag, PackageSearch, CalendarDays, CreditCard } from "lucide-react";

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

const MyOrdersClient = ({ orders = [] }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Pet Food & Accessories
            </h1>
            <p className="text-sm text-gray-500">
              Track and manage your food and accessories orders.
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Orders</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-800">
            {orders.length}
          </h2>
        </div>

        <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Pending Orders</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-800">
            {orders.filter((order) => order.orderStatus === "pending").length}
          </h2>
        </div>

        <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Delivered Orders</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-800">
            {orders.filter((order) => order.orderStatus === "delivered").length}
          </h2>
        </div>
      </div>

      {/* Orders */}
      <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">My Orders</h2>
          <span className="text-sm text-gray-500">
            {orders.length} total
          </span>
        </div>

        {!orders.length ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-orange-200 py-16 text-center">
            <div className="rounded-full bg-orange-50 p-4 text-orange-500">
              <PackageSearch className="h-10 w-10" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              No orders found
            </h3>
            <p className="mt-2 max-w-md text-sm text-gray-500">
              You have not placed any pet food or accessories order yet.
            </p>
            <Link
              href="/pet-food"
              className="mt-6 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-orange-600"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-3xl border border-gray-100 p-5 transition hover:border-orange-200 hover:shadow-sm"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Order ID
                      </p>
                      <h3 className="text-lg font-semibold text-gray-800">
                        #{order._id?.slice(-6).toUpperCase()}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        <span>{formatDate(order.createdAt)}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4" />
                        <span>{order.totalItems || 0} item(s)</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>{order.paymentMethod || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 lg:items-end">
                    <h4 className="text-xl font-bold text-gray-800">
                      ৳{Number(order.totalAmount || 0)}
                    </h4>

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

                    <Link
                      href={`/dashboard/pet-food&accessories/${order._id}`}
                      className="inline-flex items-center rounded-2xl border border-orange-200 px-4 py-2 text-sm font-medium text-orange-600 transition hover:bg-orange-50"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersClient;
