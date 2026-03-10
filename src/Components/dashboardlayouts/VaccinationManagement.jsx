"use client";

import React, { useState, useEffect } from 'react'; // useEffect যোগ করা হয়েছে
import { motion } from "framer-motion";
import { 
  Search, Plus, AlertCircle, Calendar, 
  CheckCircle2, Clock, Filter, FileText,
  UserCheck, Stethoscope
} from 'lucide-react';
import { adminAcceptOrder, doctorScheduleOrder } from "@/action/server/orders";
import { toast } from "react-hot-toast";

const VaccinationManagement = ({ initialOrders = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState(initialOrders);

  // ১. সার্ভার থেকে আসা নতুন ডাটা স্টেটে সেট করা
  useEffect(() => {
    setOrders(initialOrders);
  }, [initialOrders]);

  // --- হ্যান্ডলার ফাংশনস (Real-time UI Update সহ) ---
  
  const handleAdminAccept = async (id) => {
    try {
      const res = await adminAcceptOrder(id);
      if (res.success) {
        toast.success("Order accepted by Admin");
        // ২. ডাটাবেজ আপডেট হওয়ার পর তৎক্ষণাৎ UI আপডেট
        setOrders(prev => prev.map(order => 
          order._id === id ? { ...order, status: "AdminAccepted", adminAccepted: true } : order
        ));
      }
    } catch (error) {
      toast.error("Failed to accept order");
    }
  };

  const handleDoctorSchedule = async (id, days) => {
    try {
      const res = await doctorScheduleOrder(id, days);
      if (res.success) {
        toast.success(`Scheduled for ${days} days`);
        
        // ৩. নতুন ডেডলাইন ক্যালকুলেট করে UI আপডেট
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + days);

        setOrders(prev => prev.map(order => 
          order._id === id ? { 
            ...order, 
            status: "DoctorAccepted", 
            doctorAssigned: true, 
            deadlineDate: deadline.toISOString() 
          } : order
        ));
      }
    } catch (error) {
      toast.error("Failed to set schedule");
    }
  };

  // স্ট্যাটাস লজিক
  const getStatusInfo = (order) => {
    if (order.isCompleted) return { label: "Completed", color: "bg-emerald-50 text-emerald-600", icon: <CheckCircle2 size={12}/> };
    
    if (order.deadlineDate) {
      const isOverdue = new Date() > new Date(order.deadlineDate);
      return isOverdue 
        ? { label: "Overdue", color: "bg-rose-50 text-rose-600 animate-pulse", icon: <AlertCircle size={12}/> }
        : { label: "Upcoming", color: "bg-blue-50 text-blue-600", icon: <Clock size={12}/> };
    }
    
    return { label: order.status || "Pending", color: "bg-slate-100 text-slate-500", icon: <Clock size={12}/> };
  };

  // ফিল্টার লজিক
  const filteredOrders = orders.filter(order => 
    order.vaccineName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#F8FAFC] p-6 lg:p-10 min-h-screen font-sans text-slate-900 pt-28">
      
      {/* --- HEADER --- */}
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="flex items-center gap-3 font-black text-slate-900 text-4xl tracking-tight">
            Vaccination <span className="text-blue-600 decoration-8 decoration-blue-100 underline underline-offset-[-2px]">Registry</span>
          </h1>
          <p className="mt-2 font-medium text-slate-500">Manage real-time vaccine orders and professional scheduling.</p>
        </div>
        
        <button className="group flex justify-center items-center gap-2 bg-slate-900 shadow-xl px-8 py-4 rounded-2xl w-full md:w-auto font-black text-white transition-all">
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Log New Entry
        </button>
      </div>

      {/* --- STATS --- */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mb-10">
         <div className="flex items-center gap-5 bg-white p-6 border border-slate-100 rounded-[2.5rem] shadow-sm">
            <div className="bg-orange-500 shadow-lg shadow-orange-100 p-3 rounded-2xl text-white">
               <AlertCircle size={24} />
            </div>
            <div>
               <h4 className="font-black text-slate-900 text-xl leading-tight">
                 {orders.filter(o => o.status === "Pending").length} New Requests
               </h4>
               <p className="font-medium text-slate-400 text-sm">Awaiting Admin approval.</p>
            </div>
         </div>
         <div className="flex items-center gap-5 bg-white p-6 border border-slate-100 rounded-[2.5rem] shadow-sm">
            <div className="bg-blue-500 shadow-blue-100 shadow-lg p-3 rounded-2xl text-white">
               <Calendar size={24} />
            </div>
            <div>
               <h4 className="font-black text-slate-900 text-xl leading-tight">
                 {orders.filter(o => o.deadlineDate).length} Scheduled
               </h4>
               <p className="font-medium text-slate-400 text-sm">Active immunization tracks.</p>
            </div>
         </div>
      </div>

      {/* --- SEARCH --- */}
      <div className="flex lg:flex-row flex-col gap-4 mb-8">
        <div className="relative flex-1 max-w-xl">
          <Search className="top-1/2 left-4 absolute text-slate-400 -translate-y-1/2" size={18} />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Vaccine Name..." 
            className="bg-white shadow-sm py-4 pr-4 pl-12 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 w-full font-bold text-sm transition-all" 
          />
        </div>
      </div>

      {/* --- TABLE --- */}
      <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-100 rounded-[3rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-slate-50 border-b font-black text-[10px] text-slate-400 uppercase tracking-[0.2em]">
                <th className="px-8 py-6">Vaccine Info</th>
                <th className="px-6 py-6">Request Date</th>
                <th className="px-6 py-6">Deadline</th>
                <th className="px-6 py-6 text-center">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, i) => {
                  const status = getStatusInfo(order);
                  return (
                    <motion.tr 
                      key={order._id}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="group hover:bg-slate-50/50 transition-all"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-100 rounded-xl p-2.5 text-blue-600 font-bold">
                            <FileText size={20} />
                          </div>
                          <div>
                            <p className="font-black text-slate-800 text-sm">{order.vaccineName}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">ID: {order._id.slice(-6)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-slate-500 text-xs font-bold">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-5">
                        <p className={`text-xs font-black ${status.label === 'Overdue' ? 'text-rose-500' : 'text-slate-700'}`}>
                          {order.deadlineDate ? new Date(order.deadlineDate).toLocaleDateString() : "Pending Schedule"}
                        </p>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase inline-flex items-center gap-2 ${status.color}`}>
                          {status.icon} {status.label}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          {order.status === "Pending" && (
                            <button 
                              onClick={() => handleAdminAccept(order._id)}
                              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black px-4 py-2 rounded-xl transition-all shadow-lg shadow-blue-100"
                            >
                              <UserCheck size={14}/> Accept
                            </button>
                          )}

                          {order.status === "AdminAccepted" && (
                            <div className="flex gap-1">
                              <button 
                                onClick={() => handleDoctorSchedule(order._id, 2)}
                                className="bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-black px-3 py-2 rounded-xl shadow-lg shadow-orange-100"
                              >
                                2 Days
                              </button>
                              <button 
                                onClick={() => handleDoctorSchedule(order._id, 7)}
                                className="bg-slate-800 hover:bg-black text-white text-[10px] font-black px-3 py-2 rounded-xl"
                              >
                                7 Days
                              </button>
                            </div>
                          )}

                          {order.status === "DoctorAccepted" && (
                            <button className="bg-slate-100 text-slate-400 p-2.5 rounded-xl cursor-not-allowed">
                              <Stethoscope size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center font-bold text-slate-400">
                    No vaccination requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VaccinationManagement;