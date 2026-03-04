"use client";

import React from 'react';
import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  PawPrint, 
  UserCheck, 
  Clock, 
  Calendar,
  MoreVertical,
  Plus,
  TrendingUp,
  Search
} from 'lucide-react';

const DashboardMainLayout = () => {
  const summaryCards = [
    {
      title: "Total Pets",
      count: "1,248",
      percent: "+12.5%",
      isPositive: true,
      icon: <PawPrint size={22} />,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      title: "Adoptions",
      count: "854",
      percent: "+8.2%",
      isPositive: true,
      icon: <UserCheck size={22} />,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Pending Cases",
      count: "24",
      percent: "-2.4%",
      isPositive: false,
      icon: <Clock size={22} />,
      bgColor: "bg-rose-100",
      iconColor: "text-rose-600"
    },
    {
      title: "Total Events",
      count: "12",
      percent: "Next: 2 days",
      isPositive: true,
      icon: <Calendar size={22} />,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <div className="bg-[#F8FAFC] p-6 lg:p-10 min-h-screen font-sans text-slate-900">
      
      {/* --- ADMIN COMMAND CENTER (TOP HEADER) --- */}
      <div className="flex lg:flex-row flex-col justify-between items-start lg:items-center gap-6 mb-10">
        <div>
          <h1 className="font-black text-slate-900 text-4xl tracking-tight">
            Admin <span className="text-orange-500 decoration-8 decoration-orange-100 underline underline-offset-[-2px]">Control Panel</span>
          </h1>
          <p className="mt-2 font-medium text-slate-500">
            Master overview of pet adoptions, system health, and shelter operations.
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="hidden sm:flex items-center gap-2 bg-white shadow-sm px-5 py-3 border border-slate-100 rounded-2xl font-bold text-slate-400 text-sm">
            <Calendar size={16} className="text-orange-500" />
            {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
          <button className="group flex items-center gap-2 bg-slate-900 hover:bg-orange-500 shadow-lg shadow-slate-200 p-3.5 px-6 rounded-2xl font-bold text-white text-sm transition-all">
            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
            <span className="hidden md:inline">Add New Pet</span>
          </button>
        </div>
      </div>

      {/* --- SEARCH & QUICK FILTERS --- */}
      <div className="flex sm:flex-row flex-col gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="top-1/2 left-4 absolute text-slate-400 -translate-y-1/2" size={18} />
          <input 
            type="text" 
            placeholder="Quick search by ID, name or owner..." 
            className="bg-white shadow-sm py-3.5 pr-4 pl-12 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 w-full font-medium text-sm transition-all" 
          />
        </div>
      </div>

      {/* --- SUMMARY CARDS --- */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-12">
        {summaryCards.map((card, index) => (
          <div key={index} className="group relative bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-orange-500/10 p-6 border border-slate-100 hover:border-orange-200 rounded-[2.5rem] overflow-hidden transition-all duration-300 cursor-pointer">
            <div className="top-0 right-0 -z-0 absolute bg-slate-50 rounded-bl-full w-24 h-24 group-hover:scale-150 transition-transform -translate-y-12 translate-x-12"></div>
            
            <div className="z-10 relative flex flex-col h-full">
               <div className="flex justify-between items-center mb-6">
                 <div className={`${card.bgColor} ${card.iconColor} p-4 rounded-2xl`}>
                   {card.icon}
                 </div>
                 <div className={`flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full ${card.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                   {card.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                   {card.percent}
                 </div>
               </div>
               <div>
                 <p className="mb-1 font-bold text-slate-400 text-xs uppercase tracking-widest">{card.title}</p>
                 <h2 className="font-black text-slate-900 text-3xl">{card.count}</h2>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MAIN GRID AREA --- */}
      <div className="gap-8 grid grid-cols-1 lg:grid-cols-12">
        
        {/* Recent Requests Table (Left) */}
        <div className="lg:col-span-8 bg-white shadow-sm border border-slate-100 rounded-[3rem] overflow-hidden">
          <div className="flex justify-between items-center p-8 border-slate-50 border-b">
            <div className="flex items-center gap-3">
               <h2 className="font-black text-xl tracking-tight">Pending Approval</h2>
               <span className="bg-orange-50 px-2 py-0.5 rounded-md font-bold text-[10px] text-orange-600 uppercase">Live Queue</span>
            </div>
            <button className="group flex items-center gap-2 font-bold text-slate-400 hover:text-orange-500 text-sm transition-colors">
              View All <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>
          
          <div className="p-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="font-black text-[10px] text-slate-400 text-left uppercase tracking-widest">
                  <th className="px-6 py-4">Pet Detail</th>
                  <th className="px-6 py-4">Adopter Info</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Process</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="group hover:bg-slate-50/80 transition-all cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="shadow-sm border-2 border-white rounded-2xl w-12 h-12 overflow-hidden group-hover:scale-110 transition-transform shrink-0">
                          <img src={`https://i.pravatar.cc/150?u=${i + 20}`} alt="pet" className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-[100px]">
                          <p className="mb-1 font-bold text-slate-800 text-sm leading-none">Luna <span className="ml-1 font-medium text-slate-400 text-xs">(Cat)</span></p>
                          <p className="font-black text-[10px] text-orange-500 uppercase tracking-tighter">ID: #RE-900{i}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-600 text-sm">Sarah Jenkins</p>
                      <p className="text-slate-400 text-xs">Khagrachari</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-emerald-50 px-3 py-1.5 rounded-xl font-black text-[10px] text-emerald-600 uppercase">
                        Verified
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button className="hover:bg-white hover:shadow-md p-2 rounded-xl transition-all">
                         <MoreVertical size={18} className="text-slate-400" />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- RIGHT SIDEBAR --- */}
        <div className="space-y-8 lg:col-span-4">
           
           {/* Growth Banner */}
           <div className="group relative bg-slate-900 shadow-2xl shadow-slate-200 p-8 rounded-[3rem] overflow-hidden text-white">
              <div className="-top-6 -right-6 absolute bg-white/5 rounded-full w-32 h-32 group-hover:scale-150 transition-transform"></div>
              <TrendingUp className="mb-6 text-orange-500" size={32} />
              <h3 className="mb-2 font-black text-2xl italic">System Health</h3>
              <p className="mb-8 font-medium text-slate-400 text-sm leading-relaxed">
                Operations are running smoothly. Adoption speed is up by <span className="font-bold text-white decoration-2 decoration-orange-500 underline">15%</span> this week.
              </p>
              <button className="bg-orange-500 hover:bg-white shadow-lg shadow-orange-500/20 py-4 rounded-[1.5rem] w-full font-black text-white hover:text-orange-500 text-sm transition-all">
                View Full Logs
              </button>
           </div>

           {/* Capacity Section */}
           <div className="bg-white shadow-sm p-8 border border-slate-100 rounded-[3rem]">
              <h3 className="mb-8 font-black text-slate-400 text-xs uppercase tracking-[0.2em]">Live Capacity</h3>
              <div className="space-y-8">
                <ProgressBar label="Canine Center" value={85} color="bg-blue-600" />
                <ProgressBar label="Feline Wing" value={62} color="bg-orange-500" />
                <ProgressBar label="Isolation Unit" value={30} color="bg-rose-500" />
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

// Sub-component for Progress Bar
const ProgressBar = ({ label, value, color }) => (
  <div>
    <div className="flex justify-between items-center mb-3">
      <p className="font-bold text-slate-700 text-sm">{label}</p>
      <p className="font-black text-slate-400 text-xs">{value}%</p>
    </div>
    <div className="bg-slate-50 rounded-full w-full h-2.5 overflow-hidden">
      <motion.div 
        initial={{ width: 0 }} 
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full ${color} rounded-full`}
      />
    </div>
  </div>
);

export default DashboardMainLayout;