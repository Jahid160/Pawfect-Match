import React from 'react';
import { 
  ClipboardList, 
  Hourglass, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp,
  Calendar
} from 'lucide-react';

const DoctorDashboardHome = () => {
  // ডামি ডাটা
  const stats = [
    {
      id: 1,
      label: "Pending Requests",
      value: "12",
      icon: <Hourglass size={24} />,
      bgColor: "bg-orange-500",
      shadowColor: "shadow-orange-100"
    },
    {
      id: 2,
      label: "Completed",
      value: "25",
      icon: <CheckCircle2 size={24} />,
      bgColor: "bg-emerald-500",
      shadowColor: "shadow-emerald-100"
    },
    {
      id: 3,
      label: "Overdue",
      value: "05",
      icon: <AlertCircle size={24} />,
      bgColor: "bg-rose-500",
      shadowColor: "shadow-rose-100"
    }
  ];

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="bg-orange-500 p-3 rounded-2xl shadow-lg shadow-orange-100 text-white">
            <ClipboardList size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Doctor Panel</h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Vaccination Insights</p>
          </div>
        </div>
        
        <div className="bg-white px-5 py-2.5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
          <Calendar size={18} className="text-orange-500" />
          <span className="text-sm font-black text-slate-600">29 Mar 2026</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {stats.map((stat) => (
          <div 
            key={stat.id} 
            className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden"
          >
            <div className="flex flex-col items-center text-center relative z-10">
              <div className={`${stat.bgColor} p-4 rounded-2xl text-white mb-4 shadow-lg ${stat.shadowColor} group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                {stat.label}
              </p>
              <h2 className="text-4xl font-black text-slate-800">{stat.value}</h2>
            </div>
            
            {/* Background Decoration */}
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${stat.bgColor} opacity-[0.03] rounded-full`}></div>
          </div>
        ))}
      </div>

      {/* System Growth Style Section (Bottom) */}
      <div className="bg-white p-8 rounded-[3rem] border border-slate-50 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <TrendingUp size={20} className="text-orange-500" /> Vaccination Growth
            </h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Monthly completion analytics</p>
          </div>
          <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-slate-500 focus:ring-0 cursor-pointer">
            <option>Last 6 Months</option>
            <option>Last Year</option>
          </select>
        </div>

        {/* Placeholder for Graph */}
        <div className="h-48 w-full border-b border-dashed border-slate-100 flex items-end justify-between px-4">
           {[40, 70, 45, 90, 65, 85].map((height, i) => (
             <div 
               key={i} 
               style={{ height: `${height}%` }} 
               className={`w-12 rounded-t-xl ${i === 3 ? 'bg-orange-500' : 'bg-slate-100'} transition-all duration-700`}
             ></div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardHome;