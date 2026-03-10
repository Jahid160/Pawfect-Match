"use client";

import React from 'react';
import { motion } from "framer-motion";
import { 
  Syringe, 
  Search, 
  Plus, 
  AlertCircle, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Filter,
  FileText
} from 'lucide-react';

const VaccinationManagement = () => {
  const vaccineRecords = [
    { 
      id: "VAC-9901", 
      petName: "Buddy", 
      petType: "Dog",
      vaccine: "Rabies", 
      date: "01 Mar 2026", 
      status: "Completed",
      nextDose: "01 Mar 2027"
    },
    { 
      id: "VAC-9905", 
      petName: "Luna", 
      petType: "Cat",
      vaccine: "Feline Distemper", 
      date: "20 Feb 2026", 
      status: "Overdue",
      nextDose: "20 Feb 2026"
    },
    { 
      id: "VAC-9882", 
      petName: "Max", 
      petType: "Dog",
      vaccine: "Parvovirus", 
      date: "15 Jan 2026", 
      status: "Upcoming",
      nextDose: "15 Mar 2026"
    }
  ];

  return (
    <div className="bg-[#F8FAFC] p-6 lg:p-10 min-h-screen font-sans text-slate-900">
      
      {/* --- HEADER --- */}
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="flex items-center gap-3 font-black text-slate-900 text-4xl tracking-tight">
            Vaccination <span className="text-blue-600 decoration-8 decoration-blue-100 underline underline-offset-[-2px]">Registry</span>
          </h1>
          <p className="mt-2 font-medium text-slate-500">Monitor immunization schedules and prevent disease outbreaks.</p>
        </div>
        
        <button className="group flex justify-center items-center gap-2 bg-blue-600 hover:bg-slate-900 shadow-blue-200 shadow-lg px-8 py-4 rounded-2xl w-full md:w-auto font-black text-white transition-all">
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Log New Vaccine
        </button>
      </div>

      {/* --- HEALTH ALERTS --- */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mb-10">
         <div className="flex items-center gap-5 bg-rose-50 p-6 border border-rose-100 rounded-[2.5rem]">
            <div className="bg-rose-500 shadow-lg shadow-rose-200 p-3 rounded-2xl text-white">
               <AlertCircle size={24} />
            </div>
            <div>
               <h4 className="font-black text-rose-900 leading-tight">08 Overdue Vaccinations</h4>
               <p className="font-medium text-rose-700/70 text-sm">Critical: Please schedule doses for these pets immediately.</p>
            </div>
         </div>
         <div className="flex items-center gap-5 bg-blue-50 p-6 border border-blue-100 rounded-[2.5rem]">
            <div className="bg-blue-500 shadow-blue-200 shadow-lg p-3 rounded-2xl text-white">
               <Calendar size={24} />
            </div>
            <div>
               <h4 className="font-black text-blue-900 leading-tight">15 Upcoming This Week</h4>
               <p className="font-medium text-blue-700/70 text-sm">Next 7 days immunization schedule is ready for review.</p>
            </div>
         </div>
      </div>

      {/* --- SEARCH & FILTERS --- */}
      <div className="flex lg:flex-row flex-col gap-4 mb-8">
        <div className="relative flex-1 max-w-xl">
          <Search className="top-1/2 left-4 absolute text-slate-400 -translate-y-1/2" size={18} />
          <input 
            type="text" 
            placeholder="Search by Pet Name or Vaccine Type..." 
            className="bg-white shadow-sm py-4 pr-4 pl-12 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 w-full font-medium text-sm transition-all" 
          />
        </div>
        <button className="flex items-center gap-2 bg-white hover:bg-slate-50 shadow-sm px-6 py-4 border border-slate-200 rounded-2xl font-bold text-slate-600 text-sm transition-all">
          <Filter size={18} /> Filter Status
        </button>
      </div>

      {/* --- VACCINE TABLE --- */}
      <div className="bg-white shadow-sm border border-slate-100 rounded-[3rem] overflow-hidden">
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-slate-50 border-b font-black text-[10px] text-slate-400 uppercase tracking-[0.2em]">
                <th className="px-8 py-6">Pet Details</th>
                <th className="px-6 py-6">Vaccine Name</th>
                <th className="px-6 py-6">Last Dose</th>
                <th className="px-6 py-6">Next Scheduled</th>
                <th className="px-6 py-6 text-center">Status</th>
                <th className="px-8 py-6 text-right">Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium">
              {vaccineRecords.map((record, i) => (
                <motion.tr 
                  key={record.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group hover:bg-slate-50/80 transition-all cursor-pointer"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex justify-center items-center bg-slate-100 group-hover:bg-blue-500 rounded-xl w-10 h-10 font-bold text-slate-500 group-hover:text-white transition-all">
                        {record.petName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm leading-none">{record.petName}</p>
                        <p className="mt-1 font-black text-[10px] text-slate-400 italic uppercase">{record.petType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-bold text-slate-700 text-sm">{record.vaccine}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-slate-500 text-xs">{record.date}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className={`text-xs font-black ${record.status === 'Overdue' ? 'text-rose-500' : 'text-slate-800'}`}>
                      {record.nextDose}
                    </p>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase inline-flex items-center gap-2 ${
                      record.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
                      record.status === 'Overdue' ? 'bg-rose-50 text-rose-600 animate-pulse' : 
                      'bg-blue-50 text-blue-600'
                    }`}>
                      {record.status === 'Completed' ? <CheckCircle2 size={12} /> : 
                       record.status === 'Overdue' ? <AlertCircle size={12} /> : 
                       <Clock size={12} />}
                      {record.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="bg-slate-50 group-hover:bg-blue-600 shadow-sm p-2.5 rounded-xl text-slate-400 group-hover:text-white transition-all">
                      <FileText size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VaccinationManagement;