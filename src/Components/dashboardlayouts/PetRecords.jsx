"use client";

import React from 'react';
import { motion } from "framer-motion";
import { 
  FileText, 
  Search, 
  History, 
  ShieldCheck, 
  Download, 
  ExternalLink, 
  Clipboard, 
  Filter,
  ArrowUpRight,
  Database,
  ArrowRight
} from 'lucide-react';

const PetRecords = () => {
  const records = [
    { 
      id: "REC-7721", 
      petName: "Charlie", 
      type: "Medical History", 
      date: "02 Mar 2026", 
      author: "Dr. Rakibul", 
      status: "Verified",
      fileSize: "2.4 MB"
    },
    { 
      id: "REC-7718", 
      petName: "Misty", 
      type: "Behavioral Report", 
      date: "28 Feb 2026", 
      author: "Trainer Sabbir", 
      status: "Reviewing",
      fileSize: "1.1 MB"
    },
    { 
      id: "REC-7710", 
      petName: "Rocky", 
      type: "Adoption Deed", 
      date: "15 Feb 2026", 
      author: "Admin Panel", 
      status: "Verified",
      fileSize: "4.8 MB"
    }
  ];

  return (
    <div className="bg-[#F8FAFC] p-6 lg:p-10 min-h-screen font-sans text-slate-900">
      
      {/* --- HEADER --- */}
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="flex items-center gap-3 font-black text-slate-900 text-4xl tracking-tight">
            Pet <span className="text-orange-500 decoration-8 decoration-orange-100 underline underline-offset-[-2px]">Archives</span>
          </h1>
          <p className="mt-2 font-medium text-slate-500">Access lifetime records, medical certifications, and legal documents.</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex flex-1 md:flex-none justify-center items-center gap-2 bg-white hover:bg-slate-50 shadow-sm px-6 py-4 border border-slate-200 rounded-2xl font-bold text-slate-700 transition-all">
            <History size={18} /> Backup Logs
          </button>
          <button className="group flex flex-1 md:flex-none justify-center items-center gap-2 bg-slate-900 hover:bg-orange-500 shadow-lg shadow-slate-200 px-6 py-4 rounded-2xl font-black text-white transition-all">
            <Database size={18} className="group-hover:rotate-12 transition-transform" /> Sync Data
          </button>
        </div>
      </div>

      {/* --- SEARCH & FILTERS --- */}
      <div className="flex lg:flex-row flex-col gap-4 mb-8">
        <div className="relative flex-1 max-w-xl">
          <Search className="top-1/2 left-4 absolute text-slate-400 -translate-y-1/2" size={18} />
          <input 
            type="text" 
            placeholder="Search by Record ID, Pet Name or Document Type..." 
            className="bg-white shadow-sm py-4 pr-4 pl-12 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 w-full font-medium text-sm transition-all" 
          />
        </div>
        <button className="flex items-center gap-2 bg-white hover:bg-slate-50 shadow-sm px-6 py-4 border border-slate-200 rounded-2xl font-bold text-slate-600 text-sm transition-all">
          <Filter size={18} /> Advanced Filter
        </button>
      </div>

      {/* --- RECORDS TABLE --- */}
      <div className="bg-white shadow-sm border border-slate-100 rounded-[3rem] overflow-hidden">
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="font-black text-[10px] text-slate-400 uppercase tracking-[0.2em]">
                <th className="px-8 py-4">Document Details</th>
                <th className="px-6 py-4">Pet Name</th>
                <th className="px-6 py-4">Date Added</th>
                <th className="px-6 py-4">Verified By</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-8 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, i) => (
                <motion.tr 
                  key={record.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group hover:bg-slate-50 transition-all"
                >
                  <td className="bg-white group-hover:bg-slate-50 px-8 py-5 first:rounded-l-[2rem]">
                    <div className="flex items-center gap-4">
                      <div className="flex justify-center items-center bg-orange-50 rounded-2xl w-12 h-12 text-orange-600 shrink-0">
                        <FileText size={22} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{record.type}</p>
                        <p className="font-black text-[10px] text-slate-400 uppercase tracking-tighter">REF: {record.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="bg-white group-hover:bg-slate-50 px-6 py-5">
                    <span className="flex items-center gap-1 font-bold text-slate-600 text-sm">
                       <Clipboard size={14} className="text-slate-300" /> {record.petName}
                    </span>
                  </td>
                  <td className="bg-white group-hover:bg-slate-50 px-6 py-5">
                    <p className="font-medium text-slate-500 text-xs">{record.date}</p>
                  </td>
                  <td className="bg-white group-hover:bg-slate-50 px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="flex justify-center items-center bg-slate-100 border border-slate-200 rounded-full w-6 h-6 font-bold text-[10px]">
                        {record.author.charAt(0)}
                      </div>
                      <p className="font-bold text-slate-600 text-xs">{record.author}</p>
                    </div>
                  </td>
                  <td className="bg-white group-hover:bg-slate-50 px-6 py-5">
                    <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase flex items-center gap-1.5 w-fit ${
                      record.status === 'Verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {record.status === 'Verified' ? <ShieldCheck size={12} /> : <History size={12} />}
                      {record.status}
                    </span>
                  </td>
                  <td className="bg-white group-hover:bg-slate-50 px-8 py-5 last:rounded-r-[2rem] text-right">
                    <div className="flex justify-end gap-2">
                       <button className="bg-slate-50 hover:bg-slate-900 shadow-sm p-2.5 rounded-xl hover:text-white transition-all">
                          <Download size={18} />
                       </button>
                       <button className="bg-slate-50 hover:bg-orange-500 shadow-sm p-2.5 rounded-xl hover:text-white transition-all">
                          <ExternalLink size={18} />
                       </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- BOTTOM INFO --- */}
        <div className="flex md:flex-row flex-col justify-between items-center gap-4 bg-slate-50/30 p-8 border-slate-50 border-t">
           <div className="flex items-center gap-2 font-bold text-slate-400 text-xs">
              <ShieldCheck className="text-emerald-500" size={16} />
              All records are encrypted and stored securely.
           </div>
           <button className="flex items-center gap-2 hover:gap-3 font-black text-orange-500 text-xs uppercase tracking-widest transition-all">
             View Full Audit Trail <ArrowRight size={14} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default PetRecords;