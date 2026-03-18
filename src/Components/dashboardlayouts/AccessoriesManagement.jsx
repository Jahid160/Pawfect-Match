"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Package,
  AlertOctagon,
  BadgeDollarSign,
  Eye,
  Trash2,
  Edit3,
  Search,
  Plus
} from 'lucide-react';

const AccessoriesManagement = () => {
  const [activeTab, setActiveTab] = useState("inventory");

  const tabs = [
    { id: "inventory", label: "Total Items", icon: <Package size={18} /> },
    { id: "low-stock", label: "Low Stock", icon: <AlertOctagon size={18} /> },
    { id: "sales", label: "Total Sales", icon: <BadgeDollarSign size={18} /> },
  ];

  return (
    <div className="bg-base-200 p-6 lg:p-10 min-h-screen font-sans">
      {/* --- HEADER --- */}
      <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="font-black text-neutral text-3xl tracking-tight">
            Accessories <span className="text-primary">Management</span>
          </h1>
          <p className="font-medium text-slate-500">Control your inventory, track sales, and manage pet gear levels.</p>
        </div>
        <button className="shadow-lg shadow-primary/20 px-6 rounded-2xl font-black btn btn-primary">
          <Plus size={20} /> Add Product
        </button>
      </div>

      {/* --- TABBING SYSTEM (DaisyUI + Framer Motion) --- */}
      <div className="flex bg-white shadow-sm mb-8 p-1.5 border border-base-300 rounded-2xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all z-10 ${
              activeTab === tab.id ? "text-white" : "text-slate-500 hover:bg-base-200"
            }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabAcc"
                className="-z-10 absolute inset-0 bg-primary rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* --- TAB CONTENT --- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {/* 1. TOTAL ITEMS / INVENTORY TAB */}
          {activeTab === "inventory" && (
            <div className="bg-base-100 shadow-xl border border-base-300 rounded-4xl overflow-hidden">
              <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 p-8 border-base-200 border-b">
                <h2 className="font-black text-xl italic">Inventory <span className="text-primary">List</span></h2>
                <div className="relative">
                  <Search className="top-1/2 left-3 absolute text-slate-400 -translate-y-1/2" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search product..." 
                    className="bg-base-200/50 pl-10 border-none rounded-xl w-full md:w-72 font-medium input input-bordered"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="table w-full border-collapse">
                  <thead className="bg-base-200/50">
                    <tr className="border-none text-[11px] text-slate-400 uppercase tracking-widest">
                      <th className="px-8 py-5">Product Details</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock Status</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-base-200/20 border-base-200 border-b transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="w-12 h-12 mask mask-squircle">
                              <Image src="https://i.ibb.co/placeholder-accessory.png" alt="Product" width={48} height={48} />
                            </div>
                          </div>
                          <div>
                            <p className="font-black text-slate-800 italic">Premium Leather Collar</p>
                            <p className="font-bold text-slate-400 text-xs">ID: #ACC-9021</p>
                          </div>
                        </div>
                      </td>
                      <td className="font-bold text-slate-500 text-sm italic">Walking Gear</td>
                      <td className="font-black text-neutral">$24.99</td>
                      <td>
                        <div className="px-3 py-3 badge-outline font-black text-[10px] badge badge-success">In Stock (12)</div>
                      </td>
                      <td>
                        <div className="flex justify-center gap-2">
                          <button className="text-info btn btn-square btn-ghost btn-sm"><Edit3 size={18} /></button>
                          <button className="text-error btn btn-square btn-ghost btn-sm"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 2. LOW STOCK TAB */}
          {activeTab === "low-stock" && (
             <div className="bg-base-100 shadow-xl p-8 border border-warning/20 rounded-4xl">
               <div className="flex items-center gap-3 mb-6">
                 <div className="bg-warning/10 p-3 rounded-2xl text-warning"><AlertOctagon /></div>
                 <h2 className="font-black text-xl italic">Stock Alerts</h2>
               </div>
               <div className="bg-warning/5 mb-6 border-warning/20 rounded-2xl alert alert-warning">
                 <p className="font-bold text-sm">Below items are running low. Please restock soon.</p>
               </div>
               <div className="opacity-50 py-10 font-black text-center italic">No Critical Stock Alerts Found.</div>
             </div>
          )}

          {/* 3. SALES & ANALYTICS TAB */}
          {activeTab === "sales" && (
            <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2 bg-base-100 shadow-xl p-8 border border-base-300 rounded-4xl">
                <h2 className="mb-6 font-black text-xl italic">Sales Performance</h2>
                <div className="flex justify-between items-center bg-primary mb-4 p-6 rounded-3xl text-white">
                   <div>
                     <p className="opacity-80 font-black text-xs uppercase">Total Revenue</p>
                     <h3 className="font-black text-4xl">$4,520.00</h3>
                   </div>
                   <div className="text-right">
                     <p className="opacity-80 font-black text-xs uppercase">Items Sold</p>
                     <h3 className="font-black text-2xl">184 Units</h3>
                   </div>
                </div>
              </div>

              <div className="bg-neutral shadow-xl p-8 rounded-4xl text-white">
                <h3 className="mb-4 font-black text-primary text-xl italic">Top Seller</h3>
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 border border-white/10 rounded-2xl">
                    <p className="font-black text-sm">Organic Dog Food</p>
                    <div className="flex justify-between mt-2">
                       <span className="opacity-60 font-bold text-xs">Revenue</span>
                       <span className="font-black text-primary text-xs">$1,200</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AccessoriesManagement;J