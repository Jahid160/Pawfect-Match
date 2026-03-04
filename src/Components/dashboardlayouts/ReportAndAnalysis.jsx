"use client";

import React from 'react';
import { motion } from "framer-motion";
import { 
  FileBarChart2, 
  Download, 
  Filter, 
  TrendingUp, 
  PieChart, 
  Calendar,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

const ReportAnalysis = () => {
  const reportStats = [
    { label: "Total Reports", value: "2,480", change: "+14%", icon: <FileBarChart2 />, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Growth Rate", value: "24.5%", change: "+3.2%", icon: <TrendingUp />, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Accuracy", value: "99.2%", change: "Stable", icon: <ShieldCheck />, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const recentReports = [
    { id: "R-102", name: "Monthly Adoption Audit", date: "02 Mar 2026", type: "PDF", status: "Ready" },
    { id: "R-101", name: "Shelter Capacity Analysis", date: "28 Feb 2026", type: "CSV", status: "Ready" },
    { id: "R-099", name: "Donation Impact Report", date: "25 Feb 2026", type: "PDF", status: "Processing" },
  ];

  return (
    <div className="bg-[#F8FAFC] p-6 lg:p-10 min-h-screen font-sans text-slate-900">
      
      {/* --- HEADER --- */}
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="flex items-center gap-3 font-black text-slate-900 text-4xl tracking-tight">
            Reports <span className="text-orange-500 italic">&</span> Analysis
          </h1>
          <p className="mt-2 font-medium text-slate-500">Generate, view, and export detailed system insights.</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex flex-1 md:flex-none justify-center items-center gap-2 bg-white hover:bg-slate-50 shadow-sm px-6 py-3 border border-slate-200 rounded-2xl font-bold text-slate-700 transition-all">
            <Filter size={18} /> Filters
          </button>
          <button className="flex flex-1 md:flex-none justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-200 px-6 py-3 rounded-2xl font-black text-white transition-all">
            <Download size={18} /> Export All
          </button>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mb-12">
        {reportStats.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-6 bg-white shadow-sm p-8 border border-slate-100 rounded-[2.5rem]"
          >
            <div className={`${stat.bg} ${stat.color} p-5 rounded-3xl shrink-0`}>
              {React.cloneElement(stat.icon, { size: 28 })}
            </div>
            <div>
              <p className="mb-1 font-bold text-slate-400 text-xs uppercase tracking-widest">{stat.label}</p>
              <h2 className="font-black text-slate-900 text-3xl">{stat.value}</h2>
              <span className="font-bold text-emerald-500 text-xs">{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="gap-8 grid grid-cols-1 lg:grid-cols-12">
        
        {/* --- MAIN ANALYSIS TABLE --- */}
        <div className="lg:col-span-8 bg-white shadow-sm border border-slate-100 rounded-[3rem] overflow-hidden">
          <div className="flex justify-between items-center p-8 border-slate-50 border-b">
            <h3 className="font-black text-xl tracking-tight">Recent Generated Reports</h3>
            <span className="font-bold text-slate-400 text-xs uppercase tracking-tighter">Page 1 of 12</span>
          </div>
          
          <div className="p-4 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="font-black text-[10px] text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-4">Report Name</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Format</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium">
                {recentReports.map((report, i) => (
                  <tr key={i} className="group hover:bg-slate-50 transition-colors cursor-pointer">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex justify-center items-center bg-slate-100 group-hover:bg-orange-100 rounded-xl w-10 h-10 text-slate-500 group-hover:text-orange-600 transition-all">
                          <PieChart size={18} />
                        </div>
                        <span className="font-bold text-slate-800">{report.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-slate-500 text-sm">{report.date}</td>
                    <td className="px-6 py-5 font-black text-slate-400 text-xs">{report.type}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        report.status === 'Ready' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-orange-500 hover:text-orange-700 transition-colors">
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- SIDEBAR WIDGETS --- */}
        <div className="space-y-8 lg:col-span-4">
          
          {/* Quick Action Card */}
          <div className="relative bg-slate-900 p-8 rounded-[2.5rem] overflow-hidden text-white">
            <div className="-top-4 -right-4 absolute bg-orange-500/20 blur-3xl rounded-full w-24 h-24"></div>
            <h4 className="mb-2 font-black text-2xl italic">Need Custom Data?</h4>
            <p className="mb-8 font-medium text-slate-400 text-sm leading-relaxed">Create a customized data set by selecting specific date ranges and parameters.</p>
            <button className="flex justify-center items-center gap-2 bg-orange-500 hover:bg-white py-4 rounded-2xl w-full font-black hover:text-orange-500 text-sm transition-all">
              Start Custom Analysis <ArrowRight size={18} />
            </button>
          </div>

          {/* Alert Box */}
          <div className="flex gap-4 bg-rose-50 p-8 border border-rose-100 rounded-[2.5rem]">
             <AlertCircle className="text-rose-500 shrink-0" size={24} />
             <div>
                <h5 className="font-bold text-rose-900">Weekly Reminder</h5>
                <p className="mt-1 font-medium text-rose-700/70 text-sm leading-relaxed">Don't forget to sync the adoption logs with the main server before Sunday night.</p>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ReportAnalysis;