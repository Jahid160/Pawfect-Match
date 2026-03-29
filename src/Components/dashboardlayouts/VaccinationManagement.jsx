"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Plus, AlertCircle, Calendar, 
  CheckCircle2, Clock, FileText,
  UserCheck, Stethoscope
} from 'lucide-react';
import { adminAcceptOrder, doctorScheduleOrder } from "@/action/server/orders";
import { toast } from "react-hot-toast";

const VaccinationManagement = ({ initialOrders = [] }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState(initialOrders);

  useEffect(() => {
    setOrders(initialOrders);
  }, [initialOrders]);

  // --- হ্যান্ডলার: অ্যাডমিন একসেপ্ট ---
  const handleAdminAccept = async (id) => {
    console.log(id);
    const previousOrders = [...orders];
    try {
      // Optimistic Update
      setOrders(prev => prev.map(order => 
        order._id === id ? { ...order, status: "AdminAccepted", adminAccepted: true } : order
      ));

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

  // --- হ্যান্ডলার: ডক্টর শিডিউল ---
  const handleDoctorSchedule = async (id, days) => {
    const previousOrders = [...orders];
    const optimisticDeadline = new Date();
    optimisticDeadline.setDate(optimisticDeadline.getDate() + parseInt(days));

    try {
      setOrders(prev => prev.map(order => 
        order._id === id ? { 
          ...order, 
          status: "DoctorAccepted", 
          doctorAssigned: true, 
          deadlineDate: optimisticDeadline.toISOString() 
        } : order
      ));

      const res = await doctorScheduleOrder(id, days);
      if (res.success) {
        toast.success(`Scheduled for ${days} days`);
        router.refresh(); 
      } else {
        setOrders(previousOrders);
        toast.error("Failed to update server");
      }
    } catch (error) {
      setOrders(previousOrders);
      toast.error("An error occurred");
    }
  };

  const getStatusInfo = (order) => {
    if (order.isCompleted || order.status === "Completed") {
      return { label: "Completed", color: "bg-emerald-50 text-emerald-600", icon: <CheckCircle2 size={12}/> };
    }
    if (order.deadlineDate) {
      const isOverdue = new Date() > new Date(order.deadlineDate);
      return isOverdue 
        ? { label: "Overdue", color: "bg-rose-50 text-rose-600 animate-pulse", icon: <AlertCircle size={12}/> }
        : { label: "Upcoming", color: "bg-blue-50 text-blue-600", icon: <Clock size={12}/> };
    }
    return { label: order.status || "Pending", color: "bg-slate-100 text-slate-500", icon: <Clock size={12}/> };
  };

  const filteredOrders = orders.filter(order => 
    order.vaccineName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#F8FAFC] p-6 lg:p-10 min-h-screen font-sans text-slate-900 pt-28">
      {/* HEADER */}
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-6 mb-10">
        <h1 className="font-black text-slate-900 text-4xl tracking-tight">
          Vaccination <span className="text-blue-600 underline decoration-8 decoration-blue-100 underline-offset-[-2px]">Registry</span>
        </h1>
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
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode='popLayout'>
                {filteredOrders.map((order) => {
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
                          <div className="bg-slate-100 rounded-xl p-2.5 text-blue-600 font-bold">
                            <FileText size={20} />
                          </div>
                          <div>
                            <p className="font-black text-slate-800 text-sm">{order.vaccineName}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">ID: {order._id.slice(-6)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <p className={`text-xs font-black ${status.label === 'Overdue' ? 'text-rose-500' : 'text-slate-700'}`}>
                          {order.deadlineDate 
                            ? new Date(order.deadlineDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) 
                            : "Waiting..."}
                        </p>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase inline-flex items-center gap-2 ${status.color}`}>
                          {status.icon} {status.label}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          
                          {/* ১. Accept Button: যদি স্ট্যাটাস Pending থাকে */}
                          {(order.status === "Pending" || !order.status) && (
                            <button 
                              onClick={() => handleAdminAccept(order._id)}
                              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black px-4 py-2 rounded-xl transition-all shadow-lg shadow-blue-100"
                            >
                              <UserCheck size={14}/> Accept Order
                            </button>
                          )}

                          {/* ২. Schedule Buttons: যদি অ্যাডমিন একসেপ্ট করে থাকে */}
                          {order.status === "AdminAccepted" && (
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleDoctorSchedule(order._id, 2)}
                                className="bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-lg"
                              >
                                2 Days
                              </button>
                              <button 
                                onClick={() => handleDoctorSchedule(order._id, 7)}
                                className="bg-slate-800 hover:bg-black text-white text-[10px] font-black px-4 py-2 rounded-xl"
                              >
                                7 Days
                              </button>
                            </div>
                          )}

                          {/* ৩. Completed/Doctor Assigned Icon */}
                          {(order.status === "DoctorAccepted" || order.status === "Completed") && (
                             <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg flex items-center gap-2 font-black text-[10px] uppercase">
                               <CheckCircle2 size={16} /> Assigned
                             </div>
                          )}

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
    </div>
  );
};

export default VaccinationManagement;