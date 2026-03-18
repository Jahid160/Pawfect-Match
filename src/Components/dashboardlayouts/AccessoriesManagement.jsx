"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  FaPlus, 
  FaSearch, 
  FaTrashAlt, 
  FaEdit, 
  FaBoxOpen, 
  FaShoppingCart, 
  FaCheckCircle, 
  FaExclamationTriangle 
} from "react-icons/fa";

const AccessoriesManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // স্ট্যাটাস কার্ড ডাটা (এগুলো পরে ডাইনামিক করবেন)
  const stats = [
    { label: "Total Items", value: "48", icon: <FaBoxOpen />, color: "bg-blue-500" },
    { label: "In Stock", value: "42", icon: <FaCheckCircle />, color: "bg-green-500" },
    { label: "Low Stock", value: "6", icon: <FaExclamationTriangle />, color: "bg-orange-500" },
    { label: "Total Sales", value: "$1,240", icon: <FaShoppingCart />, color: "bg-purple-500" },
  ];

  return (
    <div className="p-6 min-h-screen">
      {/* Header Section */}
      <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="font-black text-gray-800 text-3xl tracking-tight">Accessories Management</h1>
          <p className="text-gray-500">Manage your pet gear, inventory, and pricing.</p>
        </div>
        <button className="flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-200 px-6 py-3 rounded-2xl font-bold text-white active:scale-95 transition-all">
          <FaPlus /> Add New Accessory
        </button>
      </div>

      {/* Stats Grid */}
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-4 bg-white shadow-sm p-6 border border-gray-100 rounded-3xl">
            <div className={`${stat.color} p-4 rounded-2xl text-white text-xl shadow-lg`}>
              {stat.icon}
            </div>
            <div>
              <p className="font-bold text-gray-400 text-sm uppercase tracking-wider">{stat.label}</p>
              <h3 className="font-black text-gray-800 text-2xl">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white shadow-sm mb-6 p-4 border border-gray-100 rounded-2xl">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-50 py-3 pr-4 pl-12 border border-transparent focus:border-orange-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/5 w-full text-sm transition-all"
          />
          <FaSearch className="top-1/2 left-4 absolute text-gray-400 -translate-y-1/2" />
        </div>
      </div>

      {/* Accessories Table */}
      <div className="bg-white shadow-sm border border-gray-100 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-gray-100 border-b">
                <th className="px-6 py-5 font-bold text-gray-400 text-xs uppercase tracking-widest">Product</th>
                <th className="px-6 py-5 font-bold text-gray-400 text-xs uppercase tracking-widest">Category</th>
                <th className="px-6 py-5 font-bold text-gray-400 text-xs uppercase tracking-widest">Price</th>
                <th className="px-6 py-5 font-bold text-gray-400 text-xs uppercase tracking-widest">Stock</th>
                <th className="px-6 py-5 font-bold text-gray-400 text-xs text-center uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {/* Sample Row 1 */}
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative bg-gray-100 rounded-xl w-12 h-12 overflow-hidden">
                      <Image 
                        src="https://placehold.co/100x100?text=Gear" 
                        alt="Product" 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Premium Leather Leash</p>
                      <p className="text-gray-400 text-xs italic">Brand: PawCare</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-600 text-sm italic">Walking Gear</td>
                <td className="px-6 py-4 font-black text-gray-800">$24.99</td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 px-3 py-1 rounded-full font-bold text-[10px] text-green-600 uppercase">
                    12 Units
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center items-center gap-2">
                    <button className="bg-blue-50 hover:bg-blue-500 p-2.5 rounded-xl text-blue-500 hover:text-white transition-all">
                      <FaEdit size={14} />
                    </button>
                    <button className="bg-red-50 hover:bg-red-500 p-2.5 rounded-xl text-red-500 hover:text-white transition-all">
                      <FaTrashAlt size={14} />
                    </button>
                  </div>
                </td>
              </tr>

              {/* Sample Row 2 (Low Stock) */}
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative bg-gray-100 rounded-xl w-12 h-12 overflow-hidden">
                      <Image 
                        src="https://placehold.co/100x100?text=Toy" 
                        alt="Product" 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Squeaky Chew Toy</p>
                      <p className="text-gray-400 text-xs italic">Brand: FunPet</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-600 text-sm italic">Toys</td>
                <td className="px-6 py-4 font-black text-gray-800">$9.50</td>
                <td className="px-6 py-4">
                  <span className="bg-orange-100 px-3 py-1 rounded-full font-bold text-[10px] text-orange-600 uppercase">
                    2 Units (Low)
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center items-center gap-2">
                    <button className="bg-blue-50 hover:bg-blue-500 p-2.5 rounded-xl text-blue-500 hover:text-white transition-all">
                      <FaEdit size={14} />
                    </button>
                    <button className="bg-red-50 hover:bg-red-500 p-2.5 rounded-xl text-red-500 hover:text-white transition-all">
                      <FaTrashAlt size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="flex justify-between items-center bg-gray-50/50 px-6 py-4 border-gray-100 border-t">
          <p className="text-gray-400 text-sm italic">Showing 2 of 48 accessories</p>
          <div className="flex gap-2">
            <button className="bg-white hover:bg-gray-100 px-4 py-2 border border-gray-200 rounded-xl font-bold text-gray-500 text-xs transition-all">Previous</button>
            <button className="bg-white hover:bg-gray-100 px-4 py-2 border border-gray-200 rounded-xl font-bold text-gray-500 text-xs transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessoriesManagement;