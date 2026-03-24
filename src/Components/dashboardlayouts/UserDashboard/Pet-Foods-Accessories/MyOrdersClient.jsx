"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  PackageSearch,
  CalendarDays,
  CreditCard,
  Package,
} from "lucide-react";

const getStatusClass = (status) => {
  switch (status) {
    case "delivered":
      return "badge badge-success badge-outline font-bold";
    case "cancelled":
      return "badge badge-error badge-outline font-bold";
    case "processing":
      return "badge badge-secondary badge-outline font-bold";
    case "shipped":
      return "badge badge-info badge-outline font-bold";
    default:
      return "badge badge-warning badge-outline font-bold";
  }
};

const getPaymentClass = (status) => {
  switch (status) {
    case "paid":
      return "badge badge-success badge-outline font-bold";
    case "failed":
      return "badge badge-error badge-outline font-bold";
    default:
      return "badge badge-warning badge-outline font-bold";
  }
};

const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString();
};

const getOrderImage = (order) => {
  if (order?.items?.length > 0) {
    return (
      order.items[0]?.image ||
      order.items[0]?.productImage ||
      order.items[0]?.foodImage ||
      "/placeholder.png"
    );
  }

  return order?.image || "/placeholder.png";
};

const getOrderTitle = (order) => {
  if (order?.items?.length > 0) {
    return order.items[0]?.productName || order.items[0]?.name || "Product";
  }
  return "Order Item";
};

const MyOrdersClient = ({ orders = [] }) => {
  return (
    <div className="bg-base-200 min-h-screen p-6 lg:p-10 font-sans">
      {/* Header */}
      <div className="mb-8 rounded-[2rem] bg-base-100 border border-base-300 shadow-sm p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-primary/10 p-4 text-primary">
            <ShoppingBag className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-neutral tracking-tight">
              My <span className="text-primary">Orders</span>
            </h1>
            <p className="text-slate-500 font-medium tracking-tight">
              Track and manage your pet food and accessories orders.
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stats shadow-sm bg-base-100 border border-base-300 rounded-3xl">
          <div className="stat">
            <div className="stat-title font-bold text-slate-500 uppercase text-xs">
              Total Orders
            </div>
            <div className="stat-value text-primary text-3xl font-black">
              {orders.length}
            </div>
          </div>
        </div>

        <div className="stats shadow-sm bg-base-100 border border-base-300 rounded-3xl">
          <div className="stat">
            <div className="stat-title font-bold text-slate-500 uppercase text-xs">
              Pending Orders
            </div>
            <div className="stat-value text-warning text-3xl font-black">
              {orders.filter((order) => order.orderStatus === "pending").length}
            </div>
          </div>
        </div>

        <div className="stats shadow-sm bg-base-100 border border-base-300 rounded-3xl">
          <div className="stat">
            <div className="stat-title font-bold text-slate-500 uppercase text-xs">
              Delivered Orders
            </div>
            <div className="stat-value text-success text-3xl font-black">
              {
                orders.filter((order) => order.orderStatus === "delivered")
                  .length
              }
            </div>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="bg-base-100 rounded-[2.5rem] shadow-xl border border-base-300 overflow-hidden">
        <div className="p-6 border-b border-base-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-neutral tracking-tight">
              Order History
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              {orders.length} total order{orders.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {!orders.length ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="rounded-full bg-primary/10 p-5 text-primary">
              <PackageSearch className="h-10 w-10" />
            </div>
            <h3 className="mt-5 text-xl font-black text-neutral">
              No orders found
            </h3>
            <p className="mt-2 max-w-md text-sm font-medium text-slate-500">
              You have not placed any pet food or accessories order yet.
            </p>
            <Link
              href="/pet-food"
              className="btn btn-primary rounded-2xl font-black mt-6 normal-case shadow-lg shadow-primary/20"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="p-4 lg:p-6 space-y-5">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-[2rem] border border-base-300 bg-base-100 p-5 hover:bg-base-200/40 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                  {/* Left */}
                  <div className="flex items-start gap-4">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-base-200 border border-base-300 shrink-0">
                      <Image
                        src={getOrderImage(order)}
                        alt={getOrderTitle(order)}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                          Order ID
                        </p>
                        <h3 className="text-lg font-black text-neutral">
                          #{order._id?.slice(-6).toUpperCase()}
                        </h3>
                      </div>

                      <div>
                        <p className="font-bold text-slate-800">
                          {getOrderTitle(order)}
                        </p>
                        <p className="text-xs font-bold text-slate-400 uppercase">
                          {order.totalItems || order.items?.length || 0} item(s)
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          <span>{formatDate(order.createdAt)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          <span>{order.paymentMethod || "N/A"}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span>{order.paymentStatus || "unpaid"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col lg:items-end gap-3">
                    <h4 className="text-2xl font-black text-neutral">
                      ৳{Number(order.totalAmount || 0)}
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      <span className={getPaymentClass(order.paymentStatus)}>
                        Payment: {order.paymentStatus || "unpaid"}
                      </span>

                      <span className={getStatusClass(order.orderStatus)}>
                        {order.orderStatus || "pending"}
                      </span>
                    </div>

                    <Link
                      href={`/dashboard/pet-food&accessories/${order._id}`}
                      className="btn btn-outline btn-primary rounded-2xl font-bold normal-case"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Optional preview of more ordered products */}
                {order?.items?.length > 1 && (
                  <div className="mt-4 border-t border-base-200 pt-4">
                    <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                      More items
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {order.items.slice(1, 4).map((item, index) => (
                        <span
                          key={index}
                          className="badge badge-ghost border border-base-300 px-3 py-3 font-semibold"
                        >
                          {item.productName || item.name}
                        </span>
                      ))}
                      {order.items.length > 4 && (
                        <span className="badge badge-ghost border border-base-300 px-3 py-3 font-semibold">
                          +{order.items.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersClient;
