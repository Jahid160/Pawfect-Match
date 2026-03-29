import React from 'react';
import { 
  CalendarDays, Clock, User, CheckCircle2, 
  XCircle, Filter, Search, MoreVertical 
} from 'lucide-react';

const Appointments = () => {
  // ডাটাবেজ থেকে ডাটা না আসা পর্যন্ত এই ডামি ডাটা ব্যবহার করুন
  const appointmentList = [
    { 
      id: "APT-7821", 
      petName: "Max", 
      breed: "Golden Retriever", 
      owner: "MD SHAKIL", 
      time: "10:30 AM", 
      date: "28 Mar", 
      status: "Confirmed", 
      type: "Vaccination" 
    },
    { 
      id: "APT-7822", 
      petName: "Luna", 
      breed: "Persian Cat", 
      owner: "Jahid Hasan", 
      time: "12:00 PM", 
      date: "28 Mar", 
      status: "Pending", 
      type: "Checkup" 
    },
    { 
      id: "APT-7823", 
      petName: "Rocky", 
      breed: "German Shepherd", 
      owner: "Ariful Islam", 
      time: "03:15 PM", 
      date: "29 Mar", 
      status: "Confirmed", 
      type: "Surgery" 
    },
  ];

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
            Appointments <span className="text-orange-500 text-sm align-top">● Live</span>
          </h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
            Manage your medical schedule & pet consultations
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search appointments..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 w-64 font-medium"
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:bg-slate-50 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Appointment Cards Grid */}
      <div className="grid grid-cols-1 gap-4">
        {appointmentList.map((apt) => (
          <div 
            key={apt.id} 
            className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between group"
          >
            {/* Left: Pet & Owner Info */}
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="h-16 w-16 bg-orange-50 rounded-[1.8rem] flex items-center justify-center text-orange-600 font-black text-xl group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                {apt.petName[0]}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-black text-slate-800 text-lg leading-none">{apt.petName}</h3>
                  <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg font-black uppercase tracking-tighter">
                    {apt.breed}
                  </span>
                </div>
                <p className="text-sm text-slate-400 font-bold flex items-center gap-1">
                  <User size={14} className="text-orange-400" /> {apt.owner}
                  <span className="mx-2 text-slate-200">|</span>
                  <span className="text-orange-500/80 italic">{apt.type}</span>
                </p>
              </div>
            </div>

            {/* Middle: Time & Date */}
            <div className="flex items-center gap-12 my-4 md:my-0">
              <div className="text-center md:text-right">
                <p className="font-black text-slate-800 text-xl flex items-center gap-2 tracking-tight">
                  <Clock size={18} className="text-orange-500" /> {apt.time}
                </p>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                  Scheduled: {apt.date}
                </p>
              </div>

              <div className="hidden lg:block">
                <span className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
                  apt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                }`}>
                  {apt.status}
                </span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0">
              <button className="flex-1 md:flex-none px-6 py-3 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2">
                <CheckCircle2 size={16} /> Accept
              </button>
              <button className="p-3 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                <XCircle size={20} />
              </button>
              <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-200 transition-all">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (Optional) */}
      {appointmentList.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
          <CalendarDays size={48} className="mx-auto text-slate-200 mb-4" />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No Appointments Found for Today</p>
        </div>
      )}
    </div>
  );
};

export default Appointments;