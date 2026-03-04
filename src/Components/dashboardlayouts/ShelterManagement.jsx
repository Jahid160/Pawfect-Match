"use client";

import React from 'react';
import { motion } from "framer-motion";
import { 
  Home, 
  MapPin, 
  Plus, 
  Search, 
  MoreVertical, 
  Activity, 
  Navigation,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

const ShelterManagement = () => {
  const shelters = [
    { 
      id: 1, 
      name: "Happy Paws Sanctuary", 
      location: "Mirpur, Dhaka", 
      capacity: 85, 
      pets: 72, 
      status: "Available",
      manager: "Tanvir Rahman" 
    },
    { 
      id: 2, 
      name: "Urban Pet Haven", 
      location: "Gulshan, Dhaka", 
      capacity: 50, 
      pets: 50, 
      status: "Full",
      manager: "Sabbir Hossain" 
    },
    { 
      id: 3, 
      name: "Safe Tails Shelter", 
      location: "Chottogram", 
      capacity: 120, 
      pets: 45, 
      status: "Available",
      manager: "Anika Tabassum" 
    }
  ];

  return (
    <div className="bg-[#F8FAFC] p-6 lg:p-10 min-h-screen font-sans text-slate-900">
      
      {/* --- HEADER --- */}
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="flex items-center gap-3 font-black text-slate-900 text-4xl tracking-tight">
            Shelter <span className="text-orange-500 decoration-8 decoration-orange-100 underline underline-offset-[-2px]">Network</span>
          </h1>
          <p className="mt-2 font-medium text-slate-500">Monitor capacity, locations, and health across all rescue centers.</p>
        </div>
        
        <button className="group flex justify-center items-center gap-2 bg-slate-900 hover:bg-orange-500 shadow-lg shadow-slate-200 px-8 py-4 rounded-2xl w-full md:w-auto font-black text-white transition-all">
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Register New Shelter
        </button>
      </div>

      {/* --- QUICK SEARCH & VIEW TOGGLE --- */}
      <div className="flex md:flex-row flex-col gap-4 mb-8">
        <div className="relative flex-1 max-w-lg">
          <Search className="top-1/2 left-4 absolute text-slate-400 -translate-y-1/2" size={18} />
          <input 
            type="text" 
            placeholder="Find shelter by name or city..." 
            className="bg-white shadow-sm py-3.5 pr-4 pl-12 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 w-full font-medium text-sm transition-all" 
          />
        </div>
        <div className="flex bg-white shadow-sm p-1.5 border border-slate-100 rounded-2xl">
           <button className="bg-slate-900 px-6 py-2 rounded-xl font-bold text-white text-xs">Grid View</button>
           <button className="px-6 py-2 rounded-xl font-bold text-slate-400 hover:text-slate-900 text-xs transition-all">List View</button>
        </div>
      </div>

      {/* --- SHELTER GRID --- */}
      <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {shelters.map((shelter, i) => {
          const occupancyPercent = (shelter.pets / shelter.capacity) * 100;
          
          return (
            <motion.div 
              key={shelter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white shadow-sm hover:shadow-orange-500/5 hover:shadow-xl p-8 border border-slate-100 rounded-[2.5rem] overflow-hidden transition-all"
            >
              {/* Top Section */}
              <div className="flex justify-between items-start mb-6">
                <div className="bg-orange-50 group-hover:bg-orange-500 p-4 rounded-2xl text-orange-600 group-hover:text-white transition-colors duration-500">
                  <Home size={24} />
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase ${
                  shelter.status === 'Full' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {shelter.status === 'Full' ? <AlertTriangle size={12} /> : <CheckCircle2 size={12} />}
                  {shelter.status}
                </div>
              </div>

              {/* Shelter Info */}
              <div className="mb-8">
                <h3 className="mb-1 font-black text-slate-900 group-hover:text-orange-500 text-xl transition-colors">{shelter.name}</h3>
                <p className="flex items-center gap-1 font-bold text-slate-400 text-sm">
                  <MapPin size={14} className="text-slate-300" /> {shelter.location}
                </p>
              </div>

              {/* Occupancy Indicator */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                   <p className="font-black text-slate-400 text-xs uppercase tracking-widest">Occupancy</p>
                   <p className="font-black text-slate-800 text-xs">{shelter.pets} / {shelter.capacity} Pets</p>
                </div>
                <div className="bg-slate-50 p-0.5 border border-slate-100 rounded-full w-full h-3 overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${occupancyPercent}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      occupancyPercent > 90 ? 'bg-rose-500' : 'bg-orange-500'
                    }`}
                   />
                </div>
              </div>

              {/* Footer Info */}
              <div className="flex justify-between items-center pt-6 border-slate-50 border-t">
                <div>
                   <p className="font-black text-[10px] text-slate-400 uppercase">Manager</p>
                   <p className="font-bold text-slate-700 text-sm">{shelter.manager}</p>
                </div>
                <button className="bg-slate-50 hover:bg-slate-900 p-3 rounded-2xl hover:text-white transition-all">
                   <Navigation size={18} />
                </button>
              </div>

              {/* Options Dots */}
              <button className="top-8 right-8 absolute opacity-0 group-hover:opacity-100 text-slate-300 hover:text-slate-900 transition-opacity">
                 <MoreVertical size={20} />
              </button>
            </motion.div>
          );
        })}

        {/* --- ADD NEW SHELTER PLACEHOLDER --- */}
        <div className="group flex flex-col justify-center items-center bg-slate-50/30 p-8 border-2 border-slate-200 hover:border-orange-200 border-dashed rounded-[2.5rem] text-center transition-all cursor-pointer">
           <div className="flex justify-center items-center bg-white shadow-sm mb-4 rounded-full w-16 h-16 group-hover:scale-110 transition-transform">
              <Plus size={24} className="text-slate-300 group-hover:text-orange-500" />
           </div>
           <p className="font-bold text-slate-400 text-sm">Expand your network</p>
           <p className="mt-1 font-black text-[10px] text-slate-300 uppercase tracking-widest">Add another location</p>
        </div>
      </div>
    </div>
  );
};

export default ShelterManagement;