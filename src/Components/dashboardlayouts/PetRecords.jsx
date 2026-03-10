"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Search,
  History,
  ShieldCheck,
  Download,
  ExternalLink,
  Filter,
  Database,
  ArrowRight,
  MoreVertical,
  FileSearch,
  Trash2,
} from "lucide-react";

const PetRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const records = [
    {
      id: "REC-7721",
      petName: "Charlie",
      type: "Medical History",
      date: "02 Mar 2026",
      author: "Dr. Rakibul",
      status: "Verified",
      category: "Health",
    },
    {
      id: "REC-7718",
      petName: "Misty",
      type: "Behavioral Report",
      date: "28 Feb 2026",
      author: "Trainer Sabbir",
      status: "Reviewing",
      category: "Training",
    },
    {
      id: "REC-7710",
      petName: "Rocky",
      type: "Adoption Deed",
      date: "15 Feb 2026",
      author: "Admin Panel",
      status: "Verified",
      category: "Legal",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F0F4F8] p-4 md:p-8 lg:p-12 font-sans selection:bg-orange-100">
      {/* --- TOP NAVIGATION / BREADCRUMB --- */}
      <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            Pet{" "}
            <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
              Archives
            </span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Manage and secure your pet's digital legacy.
          </p>
        </motion.div>

        <div className="hidden md:flex gap-3">
          <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:shadow-md transition-all">
            <History size={20} />
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-orange-600 transition-colors"
          >
            <Database size={18} /> Sync Cloud
          </motion.button>
        </div>
      </div>

      {/* --- STATS / QUICK INFO --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          {
            label: "Total Records",
            value: "128",
            icon: FileText,
            color: "text-blue-500",
          },
          {
            label: "Verified",
            value: "94%",
            icon: ShieldCheck,
            color: "text-emerald-500",
          },
          {
            label: "Pending Review",
            value: "12",
            icon: History,
            color: "text-orange-500",
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-sm flex items-center gap-5"
          >
            <div className={`p-4 rounded-2xl bg-white shadow-sm ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">
                {stat.label}
              </p>
              <h3 className="text-2xl font-black text-slate-800">
                {stat.value}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-xl rounded-[3rem] border border-white shadow-2xl shadow-slate-200/50 overflow-hidden">
        {/* Toolbar */}
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full pl-12 pr-4 py-4 bg-slate-100/50 border-transparent focus:bg-white focus:ring-4 focus:ring-orange-500/10 rounded-2xl outline-none font-medium transition-all"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all text-sm">
              <Filter size={18} /> Filters
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto p-4">
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <th className="px-6 py-2">Document</th>
                <th className="px-6 py-2">Pet Entity</th>
                <th className="px-6 py-2">Timeline</th>
                <th className="px-6 py-2">Authority</th>
                <th className="px-6 py-2">Status</th>
                <th className="px-6 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {records.map((record, i) => (
                  <motion.tr
                    key={record.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{
                      scale: 1.005,
                      backgroundColor: "rgba(255,255,255,0.9)",
                    }}
                    className="group shadow-sm"
                  >
                    <td className="bg-white group-hover:shadow-md px-6 py-5 first:rounded-l-[2rem] transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-slate-600 border border-slate-100 group-hover:from-orange-500 group-hover:to-orange-600 group-hover:text-white transition-all duration-500">
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">
                            {record.type}
                          </p>
                          <span className="text-[10px] font-black text-slate-300 uppercase leading-none">
                            {record.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="bg-white group-hover:shadow-md px-6 py-5 transition-all">
                      <span className="px-4 py-1.5 bg-slate-50 rounded-full text-slate-600 text-sm font-bold border border-slate-100">
                        {record.petName}
                      </span>
                    </td>
                    <td className="bg-white group-hover:shadow-md px-6 py-5 transition-all text-slate-500 font-medium text-sm">
                      {record.date}
                    </td>
                    <td className="bg-white group-hover:shadow-md px-6 py-5 transition-all">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-[10px] font-black border border-orange-200">
                          {record.author.charAt(0)}
                        </div>
                        <p className="font-bold text-slate-700 text-xs">
                          {record.author}
                        </p>
                      </div>
                    </td>
                    <td className="bg-white group-hover:shadow-md px-6 py-5 transition-all">
                      <div
                        className={`flex items-center gap-1.5 font-black text-[10px] uppercase tracking-wider ${
                          record.status === "Verified"
                            ? "text-emerald-500"
                            : "text-orange-400"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full animate-pulse ${
                            record.status === "Verified"
                              ? "bg-emerald-500"
                              : "bg-orange-400"
                          }`}
                        />
                        {record.status}
                      </div>
                    </td>
                    <td className="bg-white group-hover:shadow-md px-6 py-5 last:rounded-r-[2rem] transition-all text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          title="Download"
                          className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-orange-500 transition-colors"
                        >
                          <Download size={18} />
                        </button>
                        <button
                          title="View Details"
                          className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-500 transition-colors"
                        >
                          <FileSearch size={18} />
                        </button>
                        <button
                          title="Delete"
                          className="p-2 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <button className="group-hover:hidden p-2 text-slate-300">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        <div className="p-8 bg-slate-50/50 flex justify-between items-center border-t border-slate-100">
          <p className="text-xs font-bold text-slate-400 flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-500" />
            End-to-end encrypted record management.
          </p>
          <button className="text-xs font-black text-slate-900 flex items-center gap-2 group hover:text-orange-500 transition-colors uppercase tracking-widest">
            Audit logs{" "}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetRecords;
