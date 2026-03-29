"use client";

import React, { useState } from 'react';
import {
  Stethoscope, Award, Phone, MoreVertical, Activity,
  Syringe, CheckCircle2, Check, CalendarCheck, Clock8, Calendar,
  History, User, ArrowRight
} from 'lucide-react';
import { doctorScheduleOrder, completeVaccination } from "@/action/server/orders";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const DoctorManagement = ({ allOrders = [] }) => {
  const router = useRouter();

  const pendingVaccinations = allOrders.filter(order => order.status === "Pending");
  const activeSchedules = allOrders.filter(order => order.status === "Processing" && !order.isCompleted);
  

  const completedOrders = allOrders.filter(order => order.status === "Completed" || order.isCompleted);

  const doctors = [
    { id: 1, name: "Dr. Rakibul Islam", specialty: "Veterinary Surgeon", status: "On Call", contact: "+880 1712-345678" },
    { id: 2, name: "Dr. Sarah Ahmed", specialty: "General Physician", status: "Available", contact: "+880 1512-987654" },
    { id: 3, name: "Dr. Mahim Khan", specialty: "Vaccination Specialist", status: "Busy", contact: "+880 1912-112233" }
  ];

  const handleComplete = async (id) => {
    const res = await completeVaccination(id);
    if (res.success) {
      toast.success("Done! Moved to Completed History.");
      router.refresh();
    }
  };

  return (
    <div className="bg-[#F8FAFC] p-6 lg:p-10 min-h-screen font-sans text-slate-900 pt-28">

      {/* STATS OVERVIEW */}
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        <StatMiniCard label="Total Doctors" value={doctors.length} icon={<Stethoscope size={20} />} color="bg-blue-50 text-blue-600" />
        <StatMiniCard label="Ongoing" value={activeSchedules.length} icon={<Activity size={20} />} color="bg-emerald-50 text-emerald-600" />
        <StatMiniCard label="Completed" value={completedOrders.length} icon={<CheckCircle2 size={20} />} color="bg-orange-50 text-orange-600" />
        <StatMiniCard label="New Requests" value={pendingVaccinations.length} icon={<Syringe size={20} />} color="bg-purple-50 text-purple-600" />
      </div>

      <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">


        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-black flex items-center gap-2 px-2">
            <User className="text-blue-500" /> Medical Team & Active Tasks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                pending={pendingVaccinations}
                active={activeSchedules}
                onComplete={handleComplete}
              />
            ))}
          </div>
        </div>


        <div className="space-y-6">
          <h2 className="text-2xl font-black flex items-center gap-2 px-2">
            <History className="text-orange-500" /> Completed Tasks
          </h2>
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 shadow-sm max-h-[600px] overflow-y-auto">
            {completedOrders.length > 0 ? (
              <div className="space-y-4">
                {completedOrders.map((order) => (
                  <div key={order._id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group">
                    <div>
                      <p className="font-black text-slate-800 text-sm">{order.vaccineName}</p>
                      <p className="text-[10px] font-bold text-emerald-600 uppercase flex items-center gap-1">
                        <Check size={12} /> Successfully Vaccinated
                      </p>
                    </div>
                    <div className="bg-white p-2 rounded-lg shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-all">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-slate-400 font-bold text-sm">No tasks completed yet.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};


const DoctorCard = ({ doctor, pending, active, onComplete }) => {
  const isVaccinator = doctor.specialty === "Vaccination Specialist";

  return (
    <div className="bg-white shadow-sm p-6 border border-slate-100 rounded-[2.5rem] h-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-blue-100 rounded-2xl p-4 text-blue-600"><Stethoscope size={24} /></div>
        <div>
          <h3 className="font-black text-slate-800 text-lg">{doctor.name}</h3>
          <p className="font-bold text-orange-500 text-[10px] uppercase tracking-widest">{doctor.specialty}</p>
        </div>
      </div>

      {isVaccinator && (
        <div className="space-y-3">
          {active.map(order => (
            <div key={order._id} className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex justify-between items-center">
              <p className="text-xs font-black text-blue-800">{order.vaccineName}</p>
              <button onClick={() => onComplete(order._id)} className="bg-emerald-500 text-white p-2 rounded-lg">
                <Check size={16} />
              </button>
            </div>
          ))}
          {active.length === 0 && <p className="text-[10px] text-slate-300 font-bold text-center">No active tasks</p>}
        </div>
      )}
    </div>
  );
};

const StatMiniCard = ({ label, value, icon, color }) => (
  <div className="flex items-center gap-4 bg-white shadow-sm p-6 border border-slate-100 rounded-3xl">
    <div className={`${color} p-3 rounded-2xl`}>{icon}</div>
    <div>
      <p className="mb-1 font-bold text-[10px] text-slate-400 uppercase tracking-widest">{label}</p>
      <h4 className="font-black text-slate-800 text-2xl">{value}</h4>
    </div>
  </div>
);

export default DoctorManagement;