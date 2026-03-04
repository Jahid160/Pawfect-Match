"use client";

import React from 'react';
import { motion } from "framer-motion";
import { 
  Inbox, 
  Search, 
  CheckCircle, 
  XCircle, 
  UserCircle, 
  Calendar, 
  ArrowRight,
  Filter,
  MessageSquare,
  ClipboardList
} from 'lucide-react';

const RequestManagement = () => {
  const requests = [
    { 
      id: "REQ-2041", 
      petName: "Charlie", 
      petType: "Puppy",
      adopter: "Anisur Rahman", 
      date: "04 Mar 2026", 
      status: "Reviewing",
      matchScore: "95%"
    },
    { 
      id: "REQ-2039", 
      petName: "Misty", 
      petType: "Kitten",
      adopter: "Farhana Yeasmin", 
      date: "03 Mar 2026", 
      status: "Pending",
      matchScore: "82%"
    },
    { 
      id: "REQ-2035", 
      petName: "Rocky", 
      petType: "Dog",
      adopter: "Jasim Uddin", 
      date: "01 Mar 2026", 
      status: "Approved",
      matchScore: "88%"
    }
  ];

  return (
    <div className="bg-[#F8FAFC] p-6 lg:p-10 min-h-screen font-sans text-slate-900">
      
      {/* --- HEADER --- */}
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="flex items-center gap-3 font-black text-slate-900 text-4xl tracking-tight">
            Adoption <span className="text-orange-500 decoration-8 decoration-orange-100 underline underline-offset-[-2px]">Requests</span>
          </h1>
          <p className="mt-2 font-medium text-slate-500">Evaluate applications, check adopter profiles, and manage the waitlist.</p>
        </div>
        
        <div className="flex bg-white shadow-sm p-2 border border-slate-100 rounded-2xl">
           <div className="flex items-center gap-2 bg-orange-500 shadow-lg shadow-orange-100 px-6 py-2 rounded-xl font-black text-white text-xs">
             <Inbox size={14} /> New: 12
           </div>
           <div className="flex items-center gap-2 px-6 py-2 font-bold text-slate-400 text-xs">
             <CheckCircle size={14} /> Total: 1.4k
           </div>
        </div>
      </div>

      {/* --- TOOLS & FILTERS --- */}
      <div className="flex lg:flex-row flex-col gap-4 mb-8">
        <div className="relative flex-1 max-w-xl">
          <Search className="top-1/2 left-4 absolute text-slate-400 -translate-y-1/2" size={18} />
          <input 
            type="text" 
            placeholder="Search by Adopter Name, Request ID..." 
            className="bg-white shadow-sm py-4 pr-4 pl-12 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 w-full font-medium text-sm transition-all" 
          />
        </div>
        <button className="flex items-center gap-2 bg-white hover:bg-slate-50 shadow-sm px-6 py-4 border border-slate-200 rounded-2xl font-bold text-slate-600 text-sm transition-all">
          <Filter size={18} /> Advanced Filter
        </button>
      </div>

      {/* --- REQUESTS LIST --- */}
      <div className="space-y-4">
        {requests.map((req, i) => (
          <motion.div 
            key={req.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group flex lg:flex-row flex-col items-center gap-8 bg-white shadow-sm hover:shadow-md p-6 border border-slate-100 rounded-[2.5rem] transition-all"
          >
            {/* Adopter Info */}
            <div className="flex items-center gap-4 min-w-[250px]">
              <div className="flex justify-center items-center bg-slate-100 group-hover:bg-orange-100 rounded-2xl w-14 h-14 text-slate-400 group-hover:text-orange-600 transition-colors">
                 <UserCircle size={32} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{req.adopter}</h3>
                <p className="font-medium text-slate-400 text-xs">ID: {req.id}</p>
              </div>
            </div>

            {/* Pet Match Info */}
            <div className="flex flex-1 items-center gap-6">
               <div className="hidden lg:block bg-slate-100 w-[2px] h-10"></div>
               <div>
                  <p className="mb-1 font-black text-[10px] text-slate-400 uppercase tracking-widest">Applying For</p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">{req.petName}</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-md font-bold text-[10px] text-slate-500">{req.petType}</span>
                  </div>
               </div>
               
               <div className="hidden lg:block bg-slate-100 w-[2px] h-10"></div>
               <div>
                  <p className="mb-1 font-black text-[10px] text-slate-400 uppercase tracking-widest">Compatibility</p>
                  <div className="flex items-center gap-2">
                    <div className="bg-slate-100 rounded-full w-16 h-1.5 overflow-hidden">
                       <div className="bg-emerald-500 rounded-full h-full" style={{ width: req.matchScore }}></div>
                    </div>
                    <span className="font-black text-emerald-600 text-xs">{req.matchScore}</span>
                  </div>
               </div>
            </div>

            {/* Status & Actions */}
            <div className="flex items-center gap-6 w-full lg:w-auto">
               <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase ${
                 req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 
                 req.status === 'Reviewing' ? 'bg-blue-50 text-blue-600' : 
                 'bg-amber-50 text-amber-600'
               }`}>
                 {req.status}
               </div>

               <div className="flex items-center gap-2 ml-auto lg:ml-0">
                  <button title="View Full Application" className="bg-slate-50 hover:bg-slate-900 p-3 rounded-xl hover:text-white transition-all">
                    <ClipboardList size={18} />
                  </button>
                  <button title="Approve Request" className="bg-emerald-50 hover:bg-emerald-600 p-3 rounded-xl text-emerald-600 hover:text-white transition-all">
                    <CheckCircle size={18} />
                  </button>
                  <button title="Decline Request" className="bg-rose-50 hover:bg-rose-600 p-3 rounded-xl text-rose-600 hover:text-white transition-all">
                    <XCircle size={18} />
                  </button>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- EMPTY STATE HINT --- */}
      <div className="bg-white/50 mt-12 p-8 border-2 border-slate-200 border-dashed rounded-[3rem] text-center">
         <MessageSquare className="mx-auto mb-4 text-slate-300" size={32} />
         <p className="font-bold text-slate-400 text-sm">Have more questions about an applicant?</p>
         <button className="flex items-center gap-2 hover:gap-3 mx-auto mt-4 font-black text-orange-500 text-xs uppercase tracking-widest transition-all">
           Open Internal Messenger <ArrowRight size={14} />
         </button>
      </div>
    </div>
  );
};

export default RequestManagement;