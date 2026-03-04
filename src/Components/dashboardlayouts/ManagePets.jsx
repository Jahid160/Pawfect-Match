"use client";

import React from 'react';
import { motion } from "framer-motion";
import { 
  PawPrint, 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Heart, 
  Info,
  Edit3,
  Trash2,
  CheckCircle,
  Clock
} from 'lucide-react';

const ManagePets = () => {
  const pets = [
    { 
      id: "PET-001", 
      name: "Buddy", 
      breed: "Golden Retriever", 
      age: "2 Years", 
      type: "Dog",
      status: "Available",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=150"
    },
    { 
      id: "PET-002", 
      name: "Luna", 
      breed: "Persian Cat", 
      age: "6 Months", 
      type: "Cat",
      status: "Pending",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=150"
    },
    { 
      id: "PET-003", 
      name: "Max", 
      breed: "German Shepherd", 
      age: "4 Years", 
      type: "Dog",
      status: "Adopted",
      image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=150"
    }
  ];

  return (
    <div className="bg-[#F8FAFC] p-6 lg:p-10 min-h-screen font-sans text-slate-900">
      
      {/* --- HEADER --- */}
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="flex items-center gap-3 font-black text-slate-900 text-4xl tracking-tight">
            Manage <span className="text-orange-500 decoration-8 decoration-orange-100 underline underline-offset-[-2px]">Pets</span>
          </h1>
          <p className="mt-2 font-medium text-slate-500">Track your residents, update their profiles, and manage adoption statuses.</p>
        </div>
        
        <button className="group flex justify-center items-center gap-2 bg-orange-500 hover:bg-slate-900 shadow-lg shadow-orange-200 px-8 py-4 rounded-2xl w-full md:w-auto font-black text-white transition-all">
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Add New Pet
        </button>
      </div>

      {/* --- TOOLBAR --- */}
      <div className="flex lg:flex-row flex-col gap-4 mb-8">
        <div className="relative flex-1 max-w-xl">
          <Search className="top-1/2 left-4 absolute text-slate-400 -translate-y-1/2" size={18} />
          <input 
            type="text" 
            placeholder="Search by Pet Name, ID, or Breed..." 
            className="bg-white shadow-sm py-4 pr-4 pl-12 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 w-full font-medium text-sm transition-all" 
          />
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 bg-white hover:bg-slate-50 shadow-sm px-6 py-4 border border-slate-200 rounded-2xl font-bold text-slate-600 text-sm transition-all">
             <Filter size={18} /> Filter
           </button>
           <div className="flex bg-white shadow-sm p-1 border border-slate-100 rounded-2xl">
              <button className="bg-slate-900 px-6 py-2 rounded-xl font-bold text-white text-xs transition-all">All</button>
              <button className="px-6 py-2 rounded-xl font-bold text-slate-400 hover:text-slate-900 text-xs transition-all">Dogs</button>
              <button className="px-6 py-2 rounded-xl font-bold text-slate-400 hover:text-slate-900 text-xs transition-all">Cats</button>
           </div>
        </div>
      </div>

      {/* --- PET INVENTORY TABLE --- */}
      <div className="bg-white shadow-sm border border-slate-100 rounded-[3rem] overflow-hidden">
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-slate-50 border-b font-black text-[10px] text-slate-400 uppercase tracking-[0.2em]">
                <th className="px-8 py-6">Pet Profile</th>
                <th className="px-6 py-6">Type & Breed</th>
                <th className="px-6 py-6">Age</th>
                <th className="px-6 py-6">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {pets.map((pet, i) => (
                <motion.tr 
                  key={pet.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group hover:bg-slate-50/80 transition-all cursor-pointer"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="shadow-sm border-2 border-white rounded-2xl w-14 h-14 overflow-hidden group-hover:scale-110 transition-transform shrink-0">
                        <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="mb-1 font-bold text-slate-800 text-base leading-none">{pet.name}</p>
                        <p className="font-black text-[10px] text-orange-500 italic uppercase tracking-tighter">{pet.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700 text-sm">{pet.breed}</span>
                      <span className="font-medium text-[10px] text-slate-400 uppercase tracking-widest">{pet.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-bold text-slate-600 text-sm">{pet.age}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase flex items-center w-fit gap-2 ${
                      pet.status === 'Available' ? 'bg-emerald-50 text-emerald-600' : 
                      pet.status === 'Adopted' ? 'bg-blue-50 text-blue-600' : 
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {pet.status === 'Available' ? <CheckCircle size={12} /> : 
                       pet.status === 'Adopted' ? <Heart size={12} fill="currentColor" /> : 
                       <Clock size={12} />}
                      {pet.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                       <button title="Edit Pet" className="hover:bg-white hover:shadow-md p-2.5 rounded-xl text-slate-400 hover:text-orange-500 transition-all">
                          <Edit3 size={18} />
                       </button>
                       <button title="Delete Record" className="hover:bg-rose-50 p-2.5 rounded-xl text-slate-400 hover:text-rose-600 transition-all">
                          <Trash2 size={18} />
                       </button>
                       <button className="hover:bg-white hover:shadow-md p-2.5 rounded-xl text-slate-400 transition-all">
                          <MoreVertical size={18} />
                       </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer Statistics */}
        <div className="flex sm:flex-row flex-col justify-between items-center gap-4 bg-slate-50/50 p-6 border-slate-100 border-t">
           <div className="flex gap-6 font-bold text-slate-400 text-xs">
              <p><span className="text-slate-800">1,248</span> Total Pets</p>
              <p><span className="text-emerald-600">854</span> Available</p>
              <p><span className="text-blue-600">320</span> Adopted</p>
           </div>
           <div className="flex gap-2">
              <button className="bg-white hover:bg-slate-50 px-5 py-2.5 border border-slate-200 rounded-xl font-bold text-xs transition-all">Previous</button>
              <button className="bg-slate-900 hover:bg-orange-500 shadow-sm px-5 py-2.5 rounded-xl font-bold text-white text-xs transition-all">Next Page</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePets;