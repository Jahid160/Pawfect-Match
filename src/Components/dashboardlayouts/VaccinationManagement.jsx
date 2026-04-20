"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search as SearchIcon,
  CheckCircle2,
  Clock,
  FileText,
  UserCheck,
  CircleCheckBig,
  ClipboardClock,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Eye,
  Trash2,
} from "lucide-react";
import { adminAcceptOrder, deleteVaccine, doctorScheduleOrder } from "@/action/server/orders";
import { toast } from "react-hot-toast";
import OrderDetailModal from "./AdminDashboard/VaccinManageModal/OrderDetailModal";
import Swal from "sweetalert2";

const VaccinationManagement = ({ initialOrders = [] }) => {
  const router = useRouter();
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setOrders(initialOrders);
  }, [initialOrders]);

  // 1. Debounce Logic (2 Seconds Delay as requested)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // 2. Search & Filter Logic
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.vaccineName
          ?.toLowerCase()
          .includes(debouncedSearch.toLowerCase()) ||
        order._id.toLowerCase().includes(debouncedSearch.toLowerCase());

      let matchesFilter = false;
      if (statusFilter === "All") {
        matchesFilter = true;
      } else if (statusFilter === "Overdue") {
        matchesFilter =
          order.deadlineDate &&
          new Date() > new Date(order.deadlineDate) &&
          order.status !== "Completed";
      } else {
        matchesFilter = order.status === statusFilter;
      }

      return matchesSearch && matchesFilter;
    });
  }, [orders, debouncedSearch, statusFilter]);

  // 3. Pagination Logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Handlers
  const handleAdminAccept = async (id) => {
    const previousOrders = [...orders];
    try {
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: "AdminAccepted" } : order,
        ),
      );
      const res = await adminAcceptOrder(id);
      if (res.success) {
        toast.success("Order accepted by Admin");
        router.refresh();
      } else {
        setOrders(previousOrders);
        toast.error("Failed to accept order");
      }
    } catch (error) {
      setOrders(previousOrders);
      toast.error("An error occurred");
    }
  };

  const handleDoctorSchedule = async (id, days) => {
    const previousOrders = [...orders];
    try {
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: "Processing" } : order,
        ),
      );

      const res = await doctorScheduleOrder(id, days);
      if (res.success) {
        toast.success(`Scheduled for ${days} days`);
        router.refresh();
      } else {
        setOrders(previousOrders);
        toast.error("Failed to update");
      }
    } catch (error) {
      setOrders(previousOrders);
      toast.error("An error occurred");
    }
  };

  const getStatusInfo = (order) => {
    if (order.status === "Completed")
      return {
        label: "Completed",
        color: "bg-emerald-50 text-emerald-600",
        icon: <CircleCheckBig size={12} />,
      };
    if (order.status === "Processing")
      return {
        label: "Processing",
        color: "bg-amber-50 text-amber-600",
        icon: <ClipboardClock size={12} />,
      };
    if (order.status === "Completing")
      return {
        label: "Completing",
        color: "bg-blue-50 text-blue-600",
        icon: <Clock size={12} />,
      };
    if (order.deadlineDate && new Date() > new Date(order.deadlineDate)) {
      return {
        label: "Overdue",
        color: "bg-rose-50 text-rose-600 animate-pulse",
        icon: <AlertCircle size={12} />,
      };
    }
    return {
      label: order.status || "Pending",
      color: "bg-slate-100 text-slate-500",
      icon: <Clock size={12} />,
    };
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This order will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", // Red-500
      cancelButtonColor: "#64748b", // Slate-500
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#ffffff",
      customClass: {
        popup: "rounded-[2rem]",
        confirmButton: "rounded-xl font-bold px-6 py-3",
        cancelButton: "rounded-xl font-bold px-6 py-3",
      },
    });

    if (!result.isConfirmed) return;

    setLoadingId(id);

    try {
      const response = await deleteVaccine(id);

      if (response.success) {
        Swal.fire({
          title: "Deleted!",
          text: "The order has been removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: "#ffffff",
          customClass: { popup: "rounded-[2rem]" },
        });

        router.refresh();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      Swal.fire({
        title: "Failed!",
        text: error.message || "Could not delete the order.",
        icon: "error",
        confirmButtonColor: "#ef4444",
        customClass: { popup: "rounded-[2rem]" },
      });
    } finally {
      setLoadingId(null);
    }
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#F8FAFC] p-6 lg:p-10 min-h-screen font-sans text-slate-900 pt-28">
      {/* HEADER & SEARCH SECTION */}
      <div className="flex flex-col gap-8 mb-10">
        <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-6">
          <h1 className="font-black text-slate-900 text-4xl tracking-tight">
            Vaccination{" "}
            <span className="text-primary underline decoration-8 decoration-blue-100 underline-offset-[-2px]">
              Registry
            </span>
          </h1>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <SearchIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-white border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold outline-none shadow-sm cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="AdminAccepted">Admin Accepted</option>
              <option value="Processing">Processing</option>
              <option value="Completing">Completing</option>
              <option value="Completed">Completed</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-xl border border-slate-100 rounded-[3rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b font-black text-[10px] text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-6">Vaccine Info</th>
                <th className="px-6 py-6 text-center">Deadline</th>
                <th className="px-6 py-6 text-center">Status</th>
                <th className="px-6 py-6 text-center">Status Actions</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode="popLayout">
                {currentItems.map((order) => {
                  const status = getStatusInfo(order);
                  return (
                    <motion.tr
                      key={order._id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group hover:bg-slate-50/50 transition-all"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-100 rounded-xl p-2.5 text-primary font-bold">
                            <FileText size={20} />
                          </div>
                          <div>
                            <p className="font-black text-slate-800 text-sm">
                              {order.vaccineName}
                            </p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                              ID: {order._id.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <p
                          className={`text-xs font-black ${status.label === "Overdue" ? "text-rose-500" : "text-slate-700"}`}
                        >
                          {order.deadlineDate
                            ? new Date(order.deadlineDate).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                },
                              )
                            : "Waiting..."}
                        </p>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span
                          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase inline-flex items-center gap-2 ${status.color}`}
                        >
                          {status.icon} {status.label}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end items-center gap-3">
                          {/* Logic Actions */}
                          <div className="flex gap-2 items-center">
                            {(!order.status || order.status === "Pending") && (
                              <button
                                onClick={() => handleAdminAccept(order._id)}
                                className="flex items-center gap-2 bg-primary hover:bg-orange-700 text-white text-[10px] font-black px-4 py-2 rounded-xl transition-all"
                              >
                                <UserCheck size={14} /> Accept
                              </button>
                            )}
                            {order.status === "AdminAccepted" && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() =>
                                    handleDoctorSchedule(order._id, 2)
                                  }
                                  className="bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-black px-3 py-2 rounded-xl"
                                >
                                  2D
                                </button>
                                <button
                                  onClick={() =>
                                    handleDoctorSchedule(order._id, 7)
                                  }
                                  className="bg-slate-800 hover:bg-black text-white text-[10px] font-black px-3 py-2 rounded-xl"
                                >
                                  7D
                                </button>
                              </div>
                            )}
                            {order.status === "Processing" && (
                              <div className="text-amber-600 flex items-center gap-2 font-black text-[10px] uppercase border border-amber-100 bg-amber-50 px-3 py-2 rounded-xl">
                                <ClipboardClock
                                  size={14}
                                  className="animate-spin"
                                />{" "}
                                Processing
                              </div>
                            )}
                            {(order.status === "Completed" ||
                              order.status === "Completing") && (
                              <div
                                className={`px-3 py-2 rounded-xl font-black text-[10px] uppercase flex items-center gap-2 ${order.status === "Completed" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"}`}
                              >
                                {order.status === "Completed" ? (
                                  <CircleCheckBig size={14} />
                                ) : (
                                  <Clock size={14} />
                                )}{" "}
                                {order.status}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        {/* Action Icons (Eye & Delete) */}
                        <div className="flex items-center gap-1 ml-2 border-l pl-3 border-slate-100">
                          <button
                            onClick={() => handleView(order)}
                            className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-blue-50 rounded-lg"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            disabled={loadingId === order._id}
                            onClick={() => handleDelete(order._id)}
                            className={`p-2 transition-colors rounded-lg ${
                              loadingId === order._id
                                ? "text-slate-200 animate-pulse"
                                : "text-slate-400 hover:text-rose-500 hover:bg-rose-50"
                            }`}
                            title="Delete Order"
                          >
                            {loadingId === order._id ? (
                              <div className="w-5 h-5 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
      <OrderDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
      />
      {/* PAGINATION UI */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-between items-center px-8">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Showing {startIndex + 1} -{" "}
            {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of{" "}
            {filteredOrders.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-white border border-slate-200 disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-white border border-slate-200 disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VaccinationManagement;
