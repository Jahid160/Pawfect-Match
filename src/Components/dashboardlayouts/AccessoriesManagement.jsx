"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  getPetAccessories,
  deleteAccessory,
  getSalesStats,
  updateAccessory 
} from "@/action/server/accessories";
import Swal from "sweetalert2";
import {
  Package,
  AlertOctagon,
  BadgeDollarSign,
  Trash2,
  Edit3,
  Search,
  Plus,
  Loader2,
  User,
  Calendar,
  X
} from 'lucide-react';

// --- EDIT MODAL COMPONENT ---
const EditAccessoryModal = ({ isOpen, onClose, accessory, onUpdate }) => {
  const [formData, setFormData] = useState(accessory);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setFormData(accessory);
  }, [accessory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const res = await updateAccessory(accessory._id, formData);
    setUpdating(false);
    if (res.success) {
      Swal.fire({
        title: "Success!",
        text: "Product updated successfully",
        icon: "success",
        customClass: { popup: 'rounded-3xl font-sans' }
      });
      onUpdate();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="z-[100] fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-base-100 shadow-2xl p-8 lg:p-12 rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <button onClick={onClose} className="top-6 right-6 absolute text-slate-400 hover:text-primary transition-colors">
          <X size={24} />
        </button>

        <h3 className="mb-8 font-black text-2xl italic uppercase tracking-tighter">
          Edit <span className="text-primary">Product Info</span>
        </h3>
        
        <form onSubmit={handleSubmit} className="gap-6 grid grid-cols-1 md:grid-cols-2">
          <div className="md:col-span-2 form-control">
            <label className="opacity-50 font-black text-[10px] uppercase tracking-widest label">Product Name</label>
            <input name="title" value={formData.title} onChange={handleChange} className="bg-base-200 border-none rounded-2xl ring-primary/20 focus:ring-2 font-bold input" required />
          </div>

          <div className="form-control">
            <label className="opacity-50 font-black text-[10px] uppercase tracking-widest label">Price ($)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="bg-base-200 border-none rounded-2xl ring-primary/20 focus:ring-2 font-bold input" required />
          </div>

          <div className="form-control">
            <label className="opacity-50 font-black text-[10px] uppercase tracking-widest label">Stock Level</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="bg-base-200 border-none rounded-2xl ring-primary/20 focus:ring-2 font-bold input" required />
          </div>

          <div className="md:col-span-2 form-control">
            <label className="opacity-50 font-black text-[10px] uppercase tracking-widest label">Category</label>
            <input name="category" value={formData.category} onChange={handleChange} className="bg-base-200 border-none rounded-2xl ring-primary/20 focus:ring-2 font-bold input" />
          </div>

          <div className="flex gap-4 md:col-span-2 mt-6">
            <button type="button" onClick={onClose} className="flex-1 rounded-2xl font-black uppercase tracking-widest btn btn-ghost">Cancel</button>
            <button type="submit" disabled={updating} className="flex-1 shadow-lg shadow-primary/20 rounded-2xl font-black uppercase tracking-widest btn btn-primary">
              {updating ? <Loader2 className="animate-spin" /> : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// --- MAIN MANAGEMENT COMPONENT ---
const AccessoriesManagement = () => {
  const [activeTab, setActiveTab] = useState("inventory");
  const [accessories, setAccessories] = useState([]);
  const [salesData, setSalesData] = useState({ totalRevenue: 0, totalUnits: 0, recentOrders: [] });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAccessory, setSelectedAccessory] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const [accData, stats] = await Promise.all([
      getPetAccessories(),
      getSalesStats()
    ]);
    setAccessories(accData);
    if (stats.success) setSalesData(stats);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEditClick = (item) => {
    setSelectedAccessory(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f87171",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      customClass: { popup: 'rounded-3xl font-sans' }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteAccessory(id);
        if (res.success) {
          Swal.fire("Deleted!", "Accessory has been removed.", "success");
          loadData();
        }
      }
    });
  };

  const filteredItems = accessories.filter(item =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockItems = accessories.filter(item => item.stock < 5);

  const tabs = [
    { id: "inventory", label: "Total Items", icon: <Package size={18} />, count: accessories.length },
    { id: "low-stock", label: "Low Stock", icon: <AlertOctagon size={18} />, count: lowStockItems.length },
    { id: "sales", label: "Total Sales", icon: <BadgeDollarSign size={18} /> },
  ];

  return (
    <div className="bg-base-200 p-6 lg:p-10 min-h-screen font-sans">
      {/* --- HEADER --- */}
      <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="font-black text-neutral text-3xl uppercase tracking-tight">
            Accessories <span className="text-primary">Management</span>
          </h1>
          <p className="font-medium text-slate-500 italic">Control your inventory, track sales, and manage pet gear levels.</p>
        </div>
        <Link href="/addAccessoryForm">
          <button className="shadow-lg shadow-primary/20 px-8 rounded-2xl font-black uppercase tracking-widest btn btn-primary">
            <Plus size={20} /> Add Product
          </button>
        </Link>
      </div>

      {/* --- TABBING SYSTEM --- */}
      <div className="flex bg-white shadow-sm mb-8 p-1.5 border border-base-300 rounded-2xl w-fit overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase transition-all z-10 whitespace-nowrap ${activeTab === tab.id ? "text-white" : "text-slate-500 hover:bg-base-200"
              }`}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span className={`ml-1 px-2 py-0.5 rounded-lg text-[10px] ${activeTab === tab.id ? 'bg-white/20' : 'bg-base-200'}`}>
                {tab.count}
              </span>
            )}
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
          {/* 1. TOTAL ITEMS TAB */}
          {activeTab === "inventory" && (
            <div className="bg-base-100 shadow-xl border border-base-300 rounded-[2.5rem] overflow-hidden">
              <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 p-8 border-base-200 border-b">
                <h2 className="font-black text-xl italic uppercase tracking-tighter">
                  Inventory <span className="text-primary">List</span>
                </h2>
                <div className="relative">
                  <Search className="top-1/2 left-3 absolute text-slate-400 -translate-y-1/2" size={16} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name or SKU..."
                    className="bg-base-200/50 pl-10 border-none rounded-xl ring-primary/20 focus:ring-2 w-full md:w-72 font-medium input"
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
                    {loading ? (
                      <tr><td colSpan="5" className="py-20 text-center"><Loader2 className="inline-block text-primary animate-spin" size={40} /></td></tr>
                    ) : filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                        <tr key={item._id} className="group hover:bg-base-200/20 border-base-200 border-b transition-colors">
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              <div className="avatar">
                                <div className="relative bg-base-200 shadow-inner w-14 h-14 mask mask-squircle">
                                  <Image src={item.image || "https://i.ibb.co/placeholder-accessory.png"} alt={item.title} fill className="object-cover" />
                                </div>
                              </div>
                              <div>
                                <p className="mb-1 font-black text-slate-800 italic uppercase leading-none">{item.title}</p>
                                <p className="font-mono font-bold text-[10px] text-slate-400 tracking-widest">ID: {item.sku || `#${item._id.slice(-6).toUpperCase()}`}</p>
                              </div>
                            </div>
                          </td>
                          <td className="font-bold text-slate-500 text-xs italic uppercase">{item.category}</td>
                          <td className="font-black text-neutral">${item.price}</td>
                          <td>
                            <div className={`px-4 py-3 font-black text-[10px] uppercase badge badge-outline ${item.stock > 10 ? 'badge-success' : item.stock > 0 ? 'badge-warning' : 'badge-error'
                              }`}>
                              {item.stock > 0 ? `In Stock (${item.stock})` : 'Out of Stock'}
                            </div>
                          </td>
                          <td>
                            <div className="flex justify-center gap-2">
                              <button onClick={() => handleEditClick(item)} className="group-hover:bg-info/10 text-info btn btn-square btn-ghost btn-sm"><Edit3 size={18} /></button>
                              <button onClick={() => handleDelete(item._id)} className="group-hover:bg-error/10 text-error btn btn-square btn-ghost btn-sm"><Trash2 size={18} /></button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="5" className="opacity-30 py-20 font-black text-center italic uppercase">No Products Found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 2. LOW STOCK TAB */}
          {activeTab === "low-stock" && (
            <div className="bg-base-100 shadow-xl p-8 border border-warning/20 rounded-[2.5rem]">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-warning/10 shadow-inner p-4 rounded-2xl text-warning"><AlertOctagon /></div>
                <h2 className="font-black text-xl italic uppercase tracking-tighter">Stock <span className="text-warning">Alerts</span></h2>
              </div>
              {lowStockItems.length > 0 ? (
                <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3">
                  {lowStockItems.map(item => (
                    <div key={item._id} className="flex justify-between items-center bg-base-200/50 p-5 border border-base-300 rounded-3xl">
                      <div className="flex items-center gap-3">
                        <div className="relative bg-white w-12 h-12 mask mask-squircle">
                          <Image src={item.image} fill alt={item.title} className="object-cover" />
                        </div>
                        <div>
                          <p className="font-black text-xs italic uppercase">{item.title}</p>
                          <p className="font-black text-[10px] text-error">{item.stock} LEFT</p>
                        </div>
                      </div>
                      <button onClick={() => handleEditClick(item)} className="btn btn-warning btn-sm btn-circle"><Plus size={16} /></button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-success/5 border-success/20 rounded-2xl alert alert-success">
                  <p className="font-black text-success text-sm italic uppercase">All products are well stocked! ✨</p>
                </div>
              )}
            </div>
          )}

          {/* 3. SALES & ANALYTICS TAB */}
          {activeTab === "sales" && (
            <div className="flex flex-col gap-8">
              <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-2 bg-base-100 shadow-xl p-8 border border-base-300 rounded-[2.5rem]">
                  <h2 className="mb-6 font-black text-xl italic uppercase">Sales Performance</h2>
                  <div className="flex justify-between items-center bg-primary shadow-primary/20 shadow-xl mb-4 p-8 rounded-[2rem] text-white">
                    <div>
                      <p className="opacity-70 font-black text-[10px] uppercase tracking-widest">Global Revenue</p>
                      <h3 className="font-black text-5xl italic tracking-tighter">${salesData.totalRevenue.toLocaleString()}</h3>
                    </div>
                    <div className="text-right">
                      <p className="opacity-70 font-black text-[10px] uppercase tracking-widest">Total Sales</p>
                      <h3 className="font-black text-3xl italic">{salesData.totalUnits} Units</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral shadow-2xl p-8 rounded-[2.5rem] text-white">
                  <h3 className="mb-4 font-black text-primary text-xl italic uppercase">Recent Activity</h3>
                  <div className="space-y-4">
                    {salesData.recentOrders.slice(0, 3).map((order) => (
                      <div key={order._id} className="flex justify-between items-center bg-white/5 p-4 border border-white/10 rounded-2xl">
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-primary" />
                          <p className="w-24 font-black text-[10px] truncate uppercase">{order.customerName}</p>
                        </div>
                        <span className="font-black text-primary text-xs">+${order.totalAmount}</span>
                      </div>
                    ))}
                    {salesData.recentOrders.length === 0 && <p className="opacity-30 text-xs italic">No recent sales</p>}
                  </div>
                </div>
              </div>

              {/* Recent Purchases Table */}
              <div className="bg-base-100 shadow-xl border border-base-300 rounded-[2.5rem] overflow-hidden">
                <div className="p-8 border-base-200 border-b">
                  <h2 className="font-black text-xl italic uppercase tracking-tighter">Recent <span className="text-primary">Purchases</span></h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead className="bg-base-200/50">
                      <tr className="border-none text-[10px] text-slate-400 uppercase tracking-widest">
                        <th className="px-8 py-5">Customer</th>
                        <th>Order ID</th>
                        <th>Items</th>
                        <th>Amount</th>
                        <th className="text-center">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salesData.recentOrders.map((order) => (
                        <tr key={order._id} className="hover:bg-base-200/20 border-base-200 border-b transition-colors">
                          <td className="px-8 py-5">
                            <p className="font-black text-slate-800 text-xs italic uppercase">{order.customerName || "Guest User"}</p>
                            <p className="font-bold text-[10px] text-slate-400">{order.customerEmail}</p>
                          </td>
                          <td className="opacity-60 font-mono text-[10px]">#{order._id.slice(-8).toUpperCase()}</td>
                          <td><span className="font-black text-[9px] uppercase badge badge-neutral badge-sm">Gear Purchased</span></td>
                          <td className="font-black text-neutral">${order.totalAmount}</td>
                          <td className="text-center">
                            <div className="flex flex-col items-center opacity-60 font-bold text-[10px]">
                              <Calendar size={12} />
                              {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                        </tr>
                      ))}
                      {salesData.recentOrders.length === 0 && (
                        <tr><td colSpan="5" className="opacity-20 py-20 font-black text-center italic uppercase">No customer data available</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* --- EDIT MODAL RENDERING --- */}
      {isEditModalOpen && selectedAccessory && (
        <EditAccessoryModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          accessory={selectedAccessory} 
          onUpdate={loadData} 
        />
      )}
    </div>
  );
};

export default AccessoriesManagement;