"use client";

import React from 'react';
import { motion } from "framer-motion";
import { 
  Stethoscope, Search, Plus, Phone, Clock, Award, 
  MoreVertical, Activity, HeartPulse, Syringe, CheckCircle2,
  Check, CalendarCheck
} from 'lucide-react';
import { doctorScheduleOrder, completeVaccination } from "@/action/server/orders";
import { toast } from "react-hot-toast";

const DoctorManagement = ({ allOrders = [] }) => {
  // ১. লজিক ফিল্টারিং
  const pendingVaccinations = allOrders.filter(order => order.status === "AdminAccepted");
  const activeSchedules = allOrders.filter(order => order.status === "DoctorAccepted");
  const completedCount = allOrders.filter(order => order.status === "Completed" || order.isCompleted).length;

  // ২. হ্যান্ডলার ফাংশনস
  const handleAccept = async (id) => {
    const res = await doctorScheduleOrder(id, 1); // ১ দিনের ডেডলাইন
    if (res.success) toast.success("Accepted! 1-day deadline set.");
  };

  const handleComplete = async (id) => {
    const res = await completeVaccination(id);
    if (res.success) toast.success("Vaccination marked as Completed!");
  };

  const doctors = [
    { id: 1, name: "Dr. Rakibul Islam", specialty: "Veterinary Surgeon", experience: "8 Years", status: "On Call", assignedShelter: "Happy Paws Sanctuary", contact: "+880 1712-345678" },
    { id: 2, name: "Dr. Sarah Ahmed", specialty: "General Physician", experience: "5 Years", status: "Available", assignedShelter: "Urban Pet Haven", contact: "+880 1512-987654" },
    { id: 3, name: "Dr. Mahim Khan", specialty: "Vaccination Specialist", experience: "12 Years", status: "Busy", assignedShelter: "Safe Tails Shelter", contact: "+880 1912-112233" }
  ];

  return (
    <div className="bg-[#F8FAFC] p-6 lg:p-10 min-h-screen font-sans text-slate-900 pt-28">
      
      {/* --- HEADER --- */}
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="flex items-center gap-3 font-black text-slate-900 text-4xl tracking-tight">
            Vet <span className="text-orange-500 decoration-8 decoration-blue-100 underline underline-offset-[-2px]">Specialists</span>
          </h1>
          <p className="mt-2 font-medium text-slate-500">Coordinate with your medical team and manage schedules.</p>
        </div>
        
        <button className="bg-blue-600 hover:bg-slate-900 shadow-xl px-8 py-4 rounded-2xl font-black text-white transition-all flex items-center gap-2">
          <Plus size={20} /> Register New Doctor
        </button>
      </div>

      {/* --- STATS OVERVIEW --- */}
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        <StatMiniCard label="Active Doctors" value="12" icon={<Stethoscope size={20}/>} color="bg-blue-50 text-blue-600" />
        <StatMiniCard label="Ongoing Tasks" value={activeSchedules.length} icon={<Activity size={20}/>} color="bg-emerald-50 text-emerald-600" />
        <StatMiniCard label="Completed" value={completedCount} icon={<CheckCircle2 size={20}/>} color="bg-orange-50 text-orange-600" />
        <StatMiniCard label="New Requests" value={pendingVaccinations.length} icon={<Syringe size={20}/>} color="bg-purple-50 text-purple-600" />
      </div>

      {/* --- DOCTOR DIRECTORY --- */}
      <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
        {doctors.map((doctor, i) => {
          const isVaccinator = doctor.specialty === "Vaccination Specialist";

          return (
            <motion.div 
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white shadow-sm hover:shadow-xl p-8 border border-slate-100 rounded-[2.5rem] transition-all"
            >
              <div className="flex sm:flex-row flex-col items-start gap-6">
                <div className="bg-blue-100 rounded-3xl w-20 h-20 text-blue-600 shrink-0 flex items-center justify-center">
                  <Stethoscope size={32} />
                </div>

                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-black text-slate-800 text-xl">{doctor.name}</h3>
                      <p className="font-bold text-orange-500 text-xs uppercase tracking-widest flex items-center gap-1">
                        <Award size={14} /> {doctor.specialty}
                      </p>
                    </div>
                  </div>

                  {/* ৪. ডক্টর পেন্ডিং টাস্ক সেকশন (Actionable) */}
                  {isVaccinator && (pendingVaccinations.length > 0 || activeSchedules.length > 0) && (
                    <div className="mt-6 p-5 bg-slate-50 rounded-[2rem] border border-slate-100">
                      <p className="mb-4 font-black text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Activity size={12}/> Live Task Queue
                      </p>
                      
                      <div className="space-y-3">
                        {/* New Requests to Accept */}
                        {pendingVaccinations.map(order => (
                          <div key={order._id} className="flex items-center justify-between bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                            <div>
                              <p className="text-xs font-black text-slate-700">{order.vaccineName}</p>
                              <p className="text-[10px] text-purple-500 font-bold">New Request</p>
                            </div>
                            <button 
                              onClick={() => handleAccept(order._id)}
                              className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-xl transition-all"
                              title="Accept & Set 1 Day Deadline"
                            >
                              <CalendarCheck size={16} />
                            </button>
                          </div>
                        ))}

                        {/* Active Schedules to Complete */}
                        {activeSchedules.map(order => (
                          <div key={order._id} className="flex items-center justify-between bg-blue-50/50 p-3 rounded-2xl border border-blue-100">
                            <div>
                              <p className="text-xs font-black text-blue-800">{order.vaccineName}</p>
                              <p className="text-[10px] text-blue-500 font-bold italic">Deadline: Tomorrow</p>
                            </div>
                            <button 
                              onClick={() => handleComplete(order._id)}
                              className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-xl transition-all"
                              title="Mark as Completed"
                            >
                              <Check size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-8">
                     <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl font-bold text-slate-700 text-sm">
                        <Phone size={14} className="text-blue-500" /> {doctor.contact}
                     </div>
                     <button className="p-2 text-slate-400 hover:text-blue-600"><MoreVertical size={18}/></button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const StatMiniCard = ({ label, value, icon, color }) => (
  <div className="flex items-center gap-4 bg-white shadow-sm p-5 border border-slate-100 rounded-3xl">
    <div className={`${color} p-3 rounded-2xl`}>{icon}</div>
    <div>
      <p className="mb-1 font-bold text-[10px] text-slate-400 uppercase tracking-widest">{label}</p>
      <h4 className="font-black text-slate-800 text-xl">{value}</h4>
    </div>
  </div>
);

export default DoctorManagement;