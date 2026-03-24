"use client";

import React, { useMemo } from "react";
import {
  ShoppingCart,
  AlertTriangle,
  DollarSign,
  BarChart3,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";

const SalesTab = ({
  orders,
  salesPage,
  setSalesPage,
  itemsPerPage = 5,
}) => {
  const totalRevenue = orders.reduce(
    (sum, order) => sum + (Number(order.totalAmount) || 0),
    0
  );

  const paidOrders = orders.filter((o) => o.paymentStatus === "paid").length;
  const pendingOrders = orders.filter(
    (o) => o.orderStatus === "pending"
  ).length;

  const totalPages = Math.max(1, Math.ceil(orders.length / itemsPerPage));

  const paginatedOrders = useMemo(() => {
    const start = (salesPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return orders.slice(start, end);
  }, [orders, salesPage, itemsPerPage]);

  const renderPagination = () => {
    if (orders.length <= itemsPerPage) return null;

    const startItem = (salesPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(salesPage * itemsPerPage, orders.length);

    const getVisiblePages = () => {
      const pages = [];
      const maxVisible = 5;

      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        let start = Math.max(1, salesPage - 2);
        let end = Math.min(totalPages, salesPage + 2);

        if (salesPage <= 3) {
          start = 1;
          end = 5;
        }

        if (salesPage >= totalPages - 2) {
          start = totalPages - 4;
          end = totalPages;
        }

        for (let i = start; i <= end; i++) pages.push(i);
      }

      return pages;
    };

    return (
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
        <p className="text-sm font-semibold text-slate-500">
          Showing {startItem} to {endItem} of {orders.length} items
        </p>

        <div className="flex items-center gap-2 flex-wrap justify-center">
          <button
            className="btn btn-sm btn-ghost rounded-xl"
            onClick={() => setSalesPage(1)}
            disabled={salesPage === 1}
          >
            <ChevronsLeft size={16} />
          </button>

          <button
            className="btn btn-sm btn-ghost rounded-xl"
            onClick={() => setSalesPage((prev) => prev - 1)}
            disabled={salesPage === 1}
          >
            <ChevronLeft size={16} />
          </button>

          {getVisiblePages().map((page) => (
            <button
              key={page}
              className={`btn btn-sm rounded-xl min-w-[40px] ${
                salesPage === page
                  ? "btn-primary text-white"
                  : "btn-ghost text-slate-600"
              }`}
              onClick={() => setSalesPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="btn btn-sm btn-ghost rounded-xl"
            onClick={() => setSalesPage((prev) => prev + 1)}
            disabled={salesPage === totalPages}
          >
            <ChevronRightIcon size={16} />
          </button>

          <button
            className="btn btn-sm btn-ghost rounded-xl"
            onClick={() => setSalesPage(totalPages)}
            disabled={salesPage === totalPages}
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stats shadow-sm bg-base-100 border border-base-300 rounded-3xl">
          <div className="stat">
            <div className="stat-figure text-success">
              <DollarSign />
            </div>
            <div className="stat-title font-bold text-slate-500 uppercase text-xs">
              Total Revenue
            </div>
            <div className="stat-value text-success font-black">
              ${totalRevenue.toLocaleString()}
            </div>
            <div className="stat-desc font-bold text-slate-400">
              From {orders.length} orders
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-primary text-white rounded-3xl p-8 flex items-center justify-between shadow-xl shadow-primary/20">
          <div>
            <p className="font-black opacity-60 text-xs uppercase tracking-widest mb-1">
              Order Summary
            </p>
            <h3 className="text-3xl font-black">
              {paidOrders} Successful Sales
            </h3>
            <p className="flex items-center gap-2 font-bold text-sm mt-2 opacity-90">
              <AlertTriangle size={16} /> {pendingOrders} orders require
              processing.
            </p>
          </div>
          <BarChart3 size={48} className="opacity-20 hidden lg:block" />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 border border-base-300 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black italic text-neutral">
            Recent Transactions
          </h2>
          <span className="badge badge-outline font-bold text-slate-400 uppercase text-[10px] tracking-widest px-4 py-3">
            Live Data
          </span>
        </div>

        <div className="space-y-4">
          {paginatedOrders.length > 0 ? (
            paginatedOrders.map((order) => (
              <div
                key={order._id}
                className="flex flex-col lg:flex-row lg:items-center justify-between p-5 bg-base-200/50 rounded-2xl border border-base-300 group hover:border-primary transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl shadow-sm transition-colors ${
                      order.paymentStatus === "paid"
                        ? "bg-success/10 text-success group-hover:bg-success group-hover:text-white"
                        : "bg-warning/10 text-warning group-hover:bg-warning group-hover:text-white"
                    }`}
                  >
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <p className="font-black text-slate-800 italic text-lg tracking-tight">
                      {order.customerName}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                        {order.paymentMethod}
                      </span>
                      <span className="text-slate-300 text-[10px]">•</span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {new Date(
                          order.createdAt?.$date || order.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-10 mt-6 lg:mt-0">
                  <div className="text-left lg:text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">
                      Payment
                    </p>
                    <div
                      className={`badge font-black uppercase text-[10px] px-3 py-2 border-none shadow-sm ${
                        order.paymentStatus === "paid"
                          ? "bg-success/20 text-success"
                          : "bg-error/20 text-error animate-pulse"
                      }`}
                    >
                      {order.paymentStatus || "unpaid"}
                    </div>
                  </div>

                  <div className="text-left lg:text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">
                      Delivery
                    </p>
                    <p className="font-black text-primary text-xs uppercase tracking-tighter">
                      {order.orderStatus}
                    </p>
                  </div>

                  <div className="text-right min-w-[80px]">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">
                      Total
                    </p>
                    <p className="font-black text-neutral text-xl">
                      ${order.totalAmount}
                    </p>
                  </div>

                  <button className="btn btn-circle btn-ghost btn-sm text-slate-300 hover:text-primary transition-colors">
                    <ChevronRight size={22} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-base-100 rounded-3xl border-2 border-dashed border-base-300">
              <ShoppingCart
                size={48}
                className="mx-auto text-slate-200 mb-4"
              />
              <p className="text-slate-400 font-black italic">
                Your sales floor is currently empty.
              </p>
            </div>
          )}
        </div>

        {renderPagination()}
      </div>
    </div>
  );
};

export default SalesTab;
