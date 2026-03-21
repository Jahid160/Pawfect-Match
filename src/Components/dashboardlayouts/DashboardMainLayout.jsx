"use client";

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { 
  PawPrint, 
  Calendar,
  TrendingUp,
  Users,
  ShieldCheck,
  Package,
  Soup,
  Activity,
  LayoutDashboard
} from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';

// সার্ভার অ্যাকশন ইম্পোর্ট
import { getDashboardStats } from '@/action/server/dashboard';

const DashboardMainLayout = () => {
  // ১. ডাইনামিক স্ট্যাটাস হোল্ড করার জন্য স্টেট
  const [stats, setStats] = useState({
    users: 0,
    pets: 0,
    shelters: 0,
    accessories: 0,
    food: 0,
    vaccines: 0,
    inventory: {
        foodPercent: 0,
        accPercent: 0,
        vaccinePercent: 0,
        litterPercent: 65
    },
    // ৫টি প্রধান প্রাণীর জন্য ক্যাটাগরি ডাটা
    categories: [
      { name: 'Dogs', value: 0, color: '#f97316' },
      { name: 'Cats', value: 0, color: '#0ea5e9' },
      { name: 'Rabbits', value: 0, color: '#6366f1' },
      { name: 'Fish', value: 0, color: '#22c55e' },
      { name: 'Others', value: 0, color: '#94a3b8' },
    ],
    // নতুন: ডাইনামিক চার্ট ডাটা স্টেট
    chartData: [], 
    isLoading: true
  });

  // ২. ডাটাবেজ থেকে ডাটা ফেচ করা
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getDashboardStats();
        if (response.success) {
          setStats({
            ...response.stats,
            isLoading: false
          });
        }
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
        setStats(prev => ({ ...prev, isLoading: false }));
      }
    };
    fetchDashboardData();
  }, []);

  // ৩. ডাইনামিক ৬টি মডিউল কার্ড সামারি
  const modulesSummary = [
    { title: "Users", count: stats.users.toLocaleString(), icon: <Users size={18} />, color: "bg-blue-500", shadow: "shadow-blue-100" },
    { title: "Shelters", count: stats.shelters, icon: <ShieldCheck size={18} />, color: "bg-orange-500", shadow: "shadow-orange-100" },
    { title: "Vaccination", count: stats.vaccines, icon: <Activity size={18} />, color: "bg-rose-500", shadow: "shadow-rose-100" },
    { title: "Food Items", count: stats.food, icon: <Soup size={18} />, color: "bg-emerald-500", shadow: "shadow-emerald-100" },
    { title: "Accessories", count: stats.accessories, icon: <Package size={18} />, color: "bg-purple-500", shadow: "shadow-purple-100" },
    { title: "Total Pets", count: stats.pets, icon: <PawPrint size={18} />, color: "bg-slate-800", shadow: "shadow-slate-200" },
  ];

  return (
    <div className="bg-[#F8FAFC] p-6 lg:p-10 min-h-screen font-sans text-slate-900">
      
      {/* --- HEADER --- */}
      <div className="flex lg:flex-row flex-col justify-between items-start lg:items-center gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="bg-orange-500 shadow-lg shadow-orange-200 p-3 rounded-2xl text-white">
            <LayoutDashboard size={28} />
          </div>
          <div>
            <h1 className="font-black text-slate-900 text-3xl tracking-tight">
              Control <span className="text-orange-500">Panel</span>
            </h1>
            <p className="font-bold text-slate-400 text-xs italic uppercase tracking-widest">
              {stats.isLoading ? "Syncing database..." : "Live System Insights"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-3 bg-white shadow-sm px-5 py-3 border border-slate-100 rounded-2xl font-bold text-slate-500 text-sm">
            <Calendar size={16} className="text-orange-500" />
            {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
        </div>
      </div>

      {/* --- TOP CARDS --- */}
      <div className="gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-12">
        {modulesSummary.map((mod, idx) => (
          <motion.div 
            whileHover={{ y: -8 }}
            key={idx} 
            className={`bg-white shadow-xl ${mod.shadow} p-6 border border-slate-50 rounded-[2.5rem] flex flex-col items-center text-center cursor-pointer transition-all relative overflow-hidden`}
          >
            {stats.isLoading && <div className="absolute inset-0 bg-white/50 animate-pulse" />}
            <div className={`${mod.color} text-white p-3 rounded-2xl mb-4 shadow-lg`}>
              {mod.icon}
            </div>
            <p className="mb-1 font-black text-[10px] text-slate-400 uppercase tracking-tighter">{mod.title}</p>
            <h3 className="font-black text-slate-800 text-2xl tracking-tighter">{mod.count}</h3>
          </motion.div>
        ))}
      </div>

      {/* --- MAIN ANALYTICS --- */}
      <div className="gap-8 grid grid-cols-1 lg:grid-cols-12 mb-10">
        
        {/* ডাইনামিক এরিয়া চার্ট (System Growth) */}
        <div className="relative lg:col-span-8 bg-white shadow-2xl shadow-slate-100 p-8 border border-slate-50 rounded-[3.5rem] overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="font-black text-xl uppercase tracking-tight">System <span className="text-orange-500">Growth</span></h2>
              <p className="font-bold text-[10px] text-slate-400 uppercase">Real-time Adoption & Sales Data</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 font-bold text-slate-400 text-xs">
                  <div className="bg-orange-500 rounded-full w-2 h-2" /> Orders
               </div>
               <div className="flex items-center gap-2 font-bold text-slate-400 text-xs">
                  <div className="bg-blue-500 rounded-full w-2 h-2" /> Adoptions
               </div>
            </div>
          </div>

          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              {/* ডাটাবেজ থেকে আসা chartData ব্যবহার করা হয়েছে */}
              <AreaChart data={stats.chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#94A3B8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#94A3B8'}} />
                <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={5} fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="adoptions" stroke="#3b82f6" strokeWidth={5} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ডাইনামিক পাই চার্ট (Pet Diversity) */}
        <div className="flex flex-col gap-8 lg:col-span-4">
          <div className="flex-1 bg-white shadow-2xl shadow-slate-100 p-8 border border-slate-50 rounded-[3.5rem]">
            <h3 className="mb-6 font-black text-slate-800 text-lg text-center italic uppercase">Pet <span className="text-orange-500">Diversity</span></h3>
            <div className="w-full h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={stats.categories} 
                    innerRadius={65} 
                    outerRadius={85} 
                    paddingAngle={5} 
                    dataKey="value"
                  >
                    {stats.categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} cornerRadius={10} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2 mt-4 pr-2 max-h-[160px] overflow-y-auto custom-scrollbar">
              {stats.categories.map((item, i) => (
                <div key={i} className="flex justify-between items-center bg-slate-50 px-4 py-2.5 border border-slate-100 rounded-xl">
                   <div className="flex items-center gap-2">
                      <div className="rounded-full w-2 h-2" style={{backgroundColor: item.color}} />
                      <span className="font-bold text-[11px] text-slate-600 uppercase">{item.name}</span>
                   </div>
                   <span className="font-black text-[11px] text-slate-400">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- INVENTORY & HEALTH --- */}
      <div className="gap-8 grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 bg-white shadow-2xl shadow-slate-100 p-10 border border-slate-50 rounded-[3.5rem]">
           <div className="flex justify-between items-center mb-10">
              <h3 className="font-black text-slate-800 text-xl uppercase tracking-tight">Inventory <span className="text-emerald-500">Status</span></h3>
              <TrendingUp size={20} className="text-emerald-500" />
           </div>
           <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
             <ProgressBar 
                label="Food Supply" 
                value={stats.inventory?.foodPercent || 0} 
                color="bg-emerald-500" 
             />
             <ProgressBar 
                label="Accessories Stock" 
                value={stats.inventory?.accPercent || 0} 
                color="bg-purple-500" 
             />
             <ProgressBar 
                label="Vaccine Inventory" 
                value={stats.inventory?.vaccinePercent || 0} 
                color="bg-rose-500" 
             />
             <ProgressBar 
                label="Litter Supply" 
                value={stats.inventory?.litterPercent || 65} 
                color="bg-orange-500" 
             />
           </div>
        </div>

        <div className="group relative lg:col-span-5 bg-slate-900 shadow-2xl p-10 rounded-[3.5rem] overflow-hidden text-white">
          <div className="top-0 right-0 absolute bg-orange-500/10 rounded-bl-full w-32 h-32 group-hover:scale-150 transition-transform duration-700" />
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-500 p-3 rounded-2xl">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-black text-2xl italic tracking-tighter">System Health</h3>
          </div>
          <p className="mb-8 font-medium text-slate-400 text-sm leading-relaxed">
            All systems are operational. <span className="font-bold text-white decoration-orange-500 underline underline-offset-4">
              {stats.shelters} Pending Shelters
            </span> require your attention for manual verification.
          </p>
          <button className="bg-orange-500 hover:bg-white shadow-lg shadow-orange-500/20 py-4 rounded-2xl w-full font-black text-white hover:text-slate-900 text-sm transition-all">
            Review Pending Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

// Progress Bar Component
const ProgressBar = ({ label, value, color }) => (
  <div className="bg-slate-50 p-4 border border-slate-100 rounded-3xl">
    <div className="flex justify-between items-center mb-3">
      <p className="font-bold text-slate-600 text-xs uppercase tracking-tighter">{label}</p>
      <p className="font-black text-slate-400 text-xs">{value}%</p>
    </div>
    <div className="bg-slate-200 rounded-full w-full h-2 overflow-hidden">
      <motion.div 
        initial={{ width: 0 }} 
        animate={{ width: `${value}%` }} 
        transition={{ duration: 1.5, ease: "circOut" }}
        className={`h-full ${color} rounded-full`}
      />
    </div>
  </div>
);

export default DashboardMainLayout;