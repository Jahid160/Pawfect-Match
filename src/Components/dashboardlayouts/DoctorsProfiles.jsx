"use client";

import React from 'react';
import { motion } from "framer-motion";
import { 
  Stethoscope, 
  Search, 
  Plus, 
  Phone, 
  Clock, 
  Award, 
  MoreVertical,
  Activity,
  HeartPulse,
  Syringe
} from 'lucide-react';

const DoctorManagement = () => {
  const doctors = [
    { 
      id: 1, 
      name: "Dr. Rakibul Islam", 
      specialty: "Veterinary Surgeon", 
      experience: "8 Years", 
      status: "On Call",
      assignedShelter: "Happy Paws Sanctuary",
      contact: "+880 1712-345678"
    },
    { 
      id: 2, 
      name: "Dr. Sarah Ahmed", 
      specialty: "General Physician", 
      experience: "5 Years", 
      status: "Available",
      assignedShelter: "Urban Pet Haven",
      contact: "+880 1512-987654"
    },
    { 
      id: 3, 
      name: "Dr. Mahim Khan", 
      specialty: "Vaccination Specialist", 
      experience: "12 Years", 
      status: "Busy",
      assignedShelter: "Safe Tails Shelter",
      contact: "+880 1912-112233"
    }
  ];

  return (
    <div className="bg-[#F8FAFC] p-6 lg:p-10 min-h-screen font-sans text-slate-900">
      
      {/* --- HEADER --- */}
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="flex items-center gap-3 font-black text-slate-900 text-4xl tracking-tight">
            Vet <span className="text-orange-500 decoration-8 decoration-blue-100 underline underline-offset-[-2px]">Specialists</span>
          </h1>
          <p className="mt-2 font-medium text-slate-500">Coordinate with your medical team and manage doctor schedules.</p>
        </div>
        
        <button className="group flex justify-center items-center gap-2 bg-blue-600 hover:bg-slate-900 shadow-blue-200 shadow-lg px-8 py-4 rounded-2xl w-full md:w-auto font-black text-white transition-all">
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Register New Doctor
        </button>
      </div>

      {/* --- STATS OVERVIEW --- */}
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        <StatMiniCard label="Active Doctors" value="12" icon={<Stethoscope size={20}/>} color="bg-blue-50 text-blue-600" />
        <StatMiniCard label="On Call" value="04" icon={<Activity size={20}/>} color="bg-emerald-50 text-emerald-600" />
        <StatMiniCard label="Surgeries Today" value="07" icon={<HeartPulse size={20}/>} color="bg-orange-50 text-orange-600" />
        <StatMiniCard label="Vaccinations" value="24" icon={<Syringe size={20}/>} color="bg-purple-50 text-purple-600" />
      </div>

      {/* --- SEARCH BAR --- */}
      <div className="relative mb-10 max-w-lg">
        <Search className="top-1/2 left-4 absolute text-slate-400 -translate-y-1/2" size={18} />
        <input 
          type="text" 
          placeholder="Search by specialty, name or shelter..." 
          className="bg-white shadow-sm py-4 pr-4 pl-12 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 w-full font-medium text-sm transition-all" 
        />
      </div>

      {/* --- DOCTOR DIRECTORY --- */}
      <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
        {doctors.map((doctor, i) => (
          <motion.div 
            key={doctor.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-white shadow-sm hover:shadow-xl p-8 border border-slate-100 rounded-[2.5rem] overflow-hidden transition-all"
          >
            {/* Background Accent */}
            <div className="top-0 right-0 -z-0 absolute bg-blue-50/50 rounded-bl-full w-32 h-32 -translate-y-12 translate-x-12"></div>
            
            <div className="z-10 relative flex sm:flex-row flex-col items-start gap-6">
              {/* Doctor Avatar Placeholder */}
              <div className="flex justify-center items-center bg-blue-100 rounded-3xl w-20 h-20 text-blue-600 shrink-0">
                <Stethoscope size={32} />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-black text-slate-800 text-xl">{doctor.name}</h3>
                    <p className="flex items-center gap-1 mt-1 font-bold text-orange-500 text-xs uppercase tracking-widest">
                      <Award size={14} /> {doctor.specialty}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${
                    doctor.status === 'Busy' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {doctor.status}
                  </span>
                </div>

                <div className="gap-4 grid grid-cols-2 mt-6">
                   <div className="flex items-center gap-2">
                      <Clock size={16} className="text-slate-300" />
                      <p className="font-bold text-slate-500 text-xs">{doctor.experience} Exp.</p>
                   </div>
                   <div className="flex items-center gap-2">
                      <Activity size={16} className="text-slate-300" />
                      <p className="font-bold text-slate-500 text-xs">{doctor.assignedShelter}</p>
                   </div>
                </div>

                <div className="flex justify-between items-center mt-8">
                   <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl font-bold text-slate-700 text-sm">
                      <Phone size={14} className="text-blue-500" />
                      {doctor.contact}
                   </div>
                   <div className="flex gap-2">
                      <button className="hover:bg-blue-50 p-2 rounded-lg text-slate-400 hover:text-blue-600 transition-all">
                        <MoreVertical size={18} />
                      </button>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Sub-component for Mini Stats
const StatMiniCard = ({ label, value, icon, color }) => (
  <div className="flex items-center gap-4 bg-white shadow-sm p-5 border border-slate-100 rounded-3xl">
    <div className={`${color} p-3 rounded-2xl`}>{icon}</div>
    <div>
      <p className="mb-1 font-bold text-[10px] text-slate-400 uppercase leading-none tracking-widest">{label}</p>
      <h4 className="font-black text-slate-800 text-xl">{value}</h4>
    </div>
  </div>
);

export default DoctorManagement;