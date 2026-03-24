"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Package,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import { getPetFoods, deleteFood, updateFood } from "@/action/server/foods";
import { getAllOrders } from "@/action/server/order";
import Link from "next/link";
import Swal from "sweetalert2";
// import EditFoodModal from "../Modal/EditFoodModal";
// import ViewFoodModal from "../Modal/ViewFoodModal";
import InventoryTab from "./InventoryTab";
import SalesTab from "./SalesTab";
import ViewFoodModal from "@/Components/Modal/ViewFoodModal";
import EditFoodModal from "@/Components/Modal/EditFoodModal";


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

  const [inventoryPage, setInventoryPage] = useState(1);
  const [salesPage, setSalesPage] = useState(1);

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

  useEffect(() => {
    setInventoryPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (activeTab === "inventory") {
      setInventoryPage(1);
    } else {
      setSalesPage(1);
    }
  }, [activeTab]);

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
      } else {
        Swal.fire({
          title: "Delete failed",
          text: res.error || "Something went wrong",
          icon: "error",
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
              : item
          )
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
            <InventoryTab
              foodItems={foodItems}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              inventoryPage={inventoryPage}
              setInventoryPage={setInventoryPage}
              itemsPerPage={6}
              onView={openViewModal}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ) : (
            <SalesTab
              orders={orders}
              salesPage={salesPage}
              setSalesPage={setSalesPage}
              itemsPerPage={5}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {showViewModal && (
        <ViewFoodModal
          isOpen={showViewModal}
          food={selectedFood}
          onClose={closeModals}
        />
      )}

      {showEditModal && (
        <EditFoodModal
          isOpen={showEditModal}
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
