"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Package,
  ShoppingCart,
  AlertTriangle,
  Trash2,
  Loader2,
  DollarSign,
  BarChart3,
  ChevronRight,
  Eye,
  Pencil,
  X,
} from "lucide-react";
import { getPetFoods, deleteFood, updateFood } from "@/action/server/foods";
import { getAllOrders } from "@/action/server/order";
import Link from "next/link";
import Swal from "sweetalert2";
// import ViewFoodModal from "../Modal/ViewFoodModal";
import EditFoodModal from "../Modal/EditFoodModal";
import ViewFoodModal from "../Modal/ViewFoodModal";

const FoodManagement = () => {
  const [activeTab, setActiveTab] = useState("inventory");
  const [foodItems, setFoodItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedFood, setSelectedFood] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [editForm, setEditForm] = useState({
    productName: "",
    brand: "",
    category: "",
    foodType: "",
    image: "",
    description: "",
    price: "",
    discountPrice: "",
    stock: "",
    weight: "",
  });

  const tabs = [
    { id: "inventory", label: "Inventory", icon: <Package size={18} /> },
    { id: "sales", label: "Sell Details", icon: <ShoppingCart size={18} /> },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const [foodData, orderData] = await Promise.all([
        getPetFoods(),
        getAllOrders(),
      ]);
      setFoodItems(foodData || []);
      setOrders(orderData || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (Number(order.totalAmount) || 0),
    0,
  );
  const paidOrders = orders.filter((o) => o.paymentStatus === "paid").length;
  const pendingOrders = orders.filter(
    (o) => o.orderStatus === "pending",
  ).length;

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Deleting "${name}" is permanent.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes, delete it!",
      customClass: { popup: "rounded-3xl" },
    });

    if (result.isConfirmed) {
      const res = await deleteFood(id);
      if (res.success) {
        setFoodItems((prev) => prev.filter((item) => item._id !== id));
        Swal.fire({
          title: "Deleted!",
          icon: "success",
          toast: true,
          position: "top-end",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }
  };

  const openViewModal = (food) => {
    setSelectedFood(food);
    setShowViewModal(true);
  };

  const openEditModal = (food) => {
    setSelectedFood(food);
    setEditForm({
      productName: food.productName || "",
      brand: food.brand || "",
      category: food.category || "",
      foodType: food.foodType || "",
      image: food.image || "",
      description: food.description || "",
      price: food.price || "",
      discountPrice: food.discountPrice || "",
      stock: food.stock || "",
      weight: food.weight || "",
    });
    setShowEditModal(true);
  };

  const closeModals = () => {
    setShowViewModal(false);
    setShowEditModal(false);
    setSelectedFood(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateFood = async (e) => {
    e.preventDefault();

    if (!selectedFood?._id) return;

    try {
      setUpdating(true);

      const res = await updateFood(selectedFood._id, editForm);

      if (res.success) {
        setFoodItems((prev) =>
          prev.map((item) =>
            item._id === selectedFood._id
              ? {
                  ...item,
                  ...editForm,
                  price: Number(editForm.price) || 0,
                  discountPrice: Number(editForm.discountPrice) || 0,
                  stock: Number(editForm.stock) || 0,
                  weight: Number(editForm.weight) || 0,
                  inStock: Number(editForm.stock) > 0,
                  updatedAt: new Date().toISOString(),
                }
              : item,
          ),
        );

        Swal.fire({
          title: "Updated successfully",
          icon: "success",
          toast: true,
          position: "top-end",
          timer: 1500,
          showConfirmButton: false,
        });

        closeModals();
      } else {
        Swal.fire({
          title: "Update failed",
          text: res.error || "Something went wrong",
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong while updating food.",
        icon: "error",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-base-200">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="bg-base-200 min-h-screen p-6 lg:p-10 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-neutral tracking-tight">
            Food <span className="text-primary">Management</span>
          </h1>
          <p className="text-slate-500 font-medium tracking-tight">
            Manage products and track real-time order data.
          </p>
        </div>
        <Link
          href={"/addFoodForms"}
          className="btn btn-primary rounded-2xl font-black gap-2 shadow-lg shadow-primary/20 normal-case"
        >
          <Plus size={20} />
          Add Product
        </Link>
      </div>

      <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-base-300 w-fit mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all z-10 ${
              activeTab === tab.id
                ? "text-white"
                : "text-slate-500 hover:bg-base-200"
            }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary rounded-xl -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "inventory" ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="stats shadow-sm bg-base-100 border border-base-300 rounded-3xl">
                  <div className="stat">
                    <div className="stat-title font-bold text-slate-500 uppercase text-xs">
                      Total Stock
                    </div>
                    <div className="stat-value text-primary text-3xl font-black">
                      {foodItems.reduce(
                        (acc, item) => acc + (Number(item.stock) || 0),
                        0,
                      )}
                    </div>
                  </div>
                </div>

                <div className="stats shadow-sm bg-base-100 border border-base-300 rounded-3xl">
                  <div className="stat">
                    <div className="stat-title font-bold text-slate-500 uppercase text-xs">
                      Low Stock
                    </div>
                    <div className="stat-value text-error text-3xl font-black">
                      {
                        foodItems.filter((item) => Number(item.stock) < 15)
                          .length
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] shadow-xl border border-base-300 overflow-hidden">
                <div className="p-6 border-b border-base-200 flex items-center gap-3">
                  <Search className="text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search inventory..."
                    className="w-full outline-none font-bold text-slate-700 bg-transparent"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="overflow-x-auto p-4">
                  <table className="table w-full">
                    <thead>
                      <tr className="text-slate-400 uppercase text-[11px] font-black border-none">
                        <th>Product</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foodItems
                        .filter((item) =>
                          item.productName
                            ?.toLowerCase()
                            .includes(searchTerm.toLowerCase()),
                        )
                        .map((item) => (
                          <tr
                            key={item._id}
                            className="hover:bg-base-200/50 transition-colors border-b border-base-200 last:border-none"
                          >
                            <td>
                              <div className="flex items-center gap-4">
                                <div className="mask mask-squircle w-12 h-12 bg-base-200 relative">
                                  <Image
                                    src={item.image || "/placeholder.png"}
                                    alt="Food"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-black text-slate-800 italic">
                                    {item.productName}
                                  </p>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                                    {item.brand}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td>
                              <p
                                className={`font-black ${
                                  Number(item.stock) < 15
                                    ? "text-error"
                                    : "text-slate-700"
                                }`}
                              >
                                {item.stock} Units
                              </p>
                            </td>

                            <td>
                              <div className="flex flex-col">
                                <p className="font-black text-neutral text-lg">
                                  ${item.discountPrice || item.price}
                                </p>

                                {item.discountPrice &&
                                  Number(item.discountPrice) <
                                    Number(item.price) && (
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-bold text-slate-400 line-through">
                                        ${item.price}
                                      </span>
                                      <span className="text-[10px] font-black text-success uppercase tracking-tighter">
                                        {Math.round(
                                          ((item.price - item.discountPrice) /
                                            item.price) *
                                            100,
                                        )}
                                        % OFF
                                      </span>
                                    </div>
                                  )}
                              </div>
                            </td>

                            <td className="text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => openViewModal(item)}
                                  className="btn btn-circle btn-ghost btn-sm text-info"
                                  title="View Details"
                                >
                                  <Eye size={18} />
                                </button>

                                <button
                                  onClick={() => openEditModal(item)}
                                  className="btn btn-circle btn-ghost btn-sm text-primary"
                                  title="Edit"
                                >
                                  <Pencil size={18} />
                                </button>

                                <button
                                  onClick={() =>
                                    handleDelete(item._id, item.productName)
                                  }
                                  className="btn btn-circle btn-ghost btn-sm text-error"
                                  title="Delete"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
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

              <div className="bg-white rounded-[2.5rem] p-8 border border-base-300 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black italic text-neutral">
                    Recent Transactions
                  </h2>
                  <span className="badge badge-outline font-bold text-slate-400 uppercase text-[10px] tracking-widest px-4 py-3">
                    Live Data
                  </span>
                </div>

                <div className="space-y-4">
                  {orders.length > 0 ? (
                    orders.map((order) => (
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
                              <span className="text-slate-300 text-[10px]">
                                •
                              </span>
                              <span className="text-[10px] font-bold text-slate-400">
                                {new Date(
                                  order.createdAt?.$date || order.createdAt,
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
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* VIEW MODAL */}
      {showViewModal && (
        <ViewFoodModal
          isOpen={showViewModal} // ADD THIS LINE
          food={selectedFood}
          onClose={closeModals}
        />
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <EditFoodModal
          formData={editForm}
          updating={updating}
          onClose={closeModals}
          onChange={handleEditChange}
          onUpdate={handleUpdateFood}
        />
      )}
    </div>
  );
};

export default FoodManagement;
