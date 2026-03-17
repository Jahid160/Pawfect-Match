"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Bone, Plus, Search, Package, ShoppingCart, 
  AlertTriangle, Edit, Trash2, Loader2, Weight 
} from "lucide-react";
import { getPetFoods, deleteFood } from "@/action/server/foods";
import Link from "next/link";
import Swal from "sweetalert2"; 

const FoodManagement = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const data = await getPetFoods();
      setFoodItems(data);
    } catch (error) {
      console.error("Failed to fetch foods:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // --- SWEET ALERT DELETE LOGIC ---
  const handleDelete = async (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${name}". This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316", // Matches your orange-500
      cancelButtonColor: "#6b7280",  // Matches gray-500
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: 'rounded-2xl',
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteFood(id);
          if (res.success) {
            // Optimistic UI Update
            setFoodItems((prev) => prev.filter((item) => item._id !== id));
            
            // Success Toast
            Swal.fire({
              title: "Deleted!",
              text: "The product has been removed.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
              toast: true,
              position: 'top-end'
            });
          } else {
            Swal.fire("Error!", "Failed to delete the item.", "error");
          }
        } catch (err) {
          console.error("Delete Error:", err);
          Swal.fire("Error!", "Something went wrong on the server.", "error");
        }
      }
    });
  };

  // Dynamic Calculations
  const totalStock = foodItems.reduce((acc, item) => acc + (Number(item.stock) || 0), 0);
  const lowStockItems = foodItems.filter(item => item.stock < 15).length;

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="animate-spin text-orange-500" size={40} />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* ... Header and Stats (No changes needed here) ... */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pet Food Inventory</h1>
          <p className="text-gray-500 text-sm">Managing {foodItems.length} products in stock.</p>
        </div>
        <Link href={"/addFoodForms"} className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg transition-all shadow-md active:scale-95">
          <Plus size={18} />
          <span className="font-semibold">Add New Product</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Package size={24} /></div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total Stock</p>
            <h3 className="text-2xl font-bold text-gray-800">{totalStock.toLocaleString()}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl"><Weight size={24} /></div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Active Products</p>
            <h3 className="text-2xl font-bold text-gray-800">{foodItems.length}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl"><AlertTriangle size={24} /></div>
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Low Stock</p>
            <h3 className="text-2xl font-bold text-gray-800">{lowStockItems} <span className="text-sm font-normal text-gray-400">Items</span></h3>
          </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex items-center gap-3 bg-white">
          <Search className="text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by product name, brand or category..." 
            className="w-full outline-none text-sm text-gray-700 bg-transparent"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-[11px] uppercase font-bold tracking-widest border-b border-gray-100">
                <th className="px-6 py-4">Product & Brand</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Stock Level</th>
                <th className="px-6 py-4">Price </th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {foodItems
                .filter(item => 
                  item.productName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  item.brand?.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item) => (
                <tr key={item._id} className="hover:bg-orange-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 overflow-hidden rounded-xl border border-gray-100 shadow-sm bg-gray-50">
                        <Image
                          src={item.image || "https://via.placeholder.com/150"}
                          alt={item.productName || "Pet Food"}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm leading-tight">{item.productName}</p>
                        <p className="text-[11px] text-gray-400 font-medium uppercase mt-0.5">{item.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                    <span className="bg-gray-100 px-2 py-1 rounded-md text-[10px] uppercase font-bold text-gray-500">
                      {item.category} • {item.foodType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${item.stock < 20 ? "text-red-500" : "text-gray-700"}`}>
                          {item.stock} {item.weightUnit === 'g' ? 'Units' : item.weightUnit}
                        </span>
                        {item.stock < 15 && <AlertTriangle size={12} className="text-red-500" />}
                      </div>
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${item.stock < 20 ? "bg-red-400" : "bg-green-400"}`} 
                          style={{ width: `${Math.min(item.stock, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-gray-800">${item.discountPrice || item.price}</span>
                      {item.discountPrice && (
                        <span className="text-[10px] text-gray-400 line-through">${item.price}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      {/* TRASH BUTTON */}
                      <button 
                        onClick={() => handleDelete(item._id, item.productName)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {foodItems.length === 0 && (
            <div className="p-10 text-center text-gray-400">
              No food items found in the inventory.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodManagement;