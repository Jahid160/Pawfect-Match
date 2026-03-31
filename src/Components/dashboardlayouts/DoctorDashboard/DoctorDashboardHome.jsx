"use client";
import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle2, AlertCircle, TrendingUp, CalendarDays, Mail } from 'lucide-react'; 
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { useSession } from 'next-auth/react';
import { getDoctorDashboardStats } from '@/action/doctorServerDash/vaccin';

const DoctorDashboardHome = () => {
  const { data: session } = useSession();
  
  // Initialize state with all necessary fields to avoid "undefined" errors
  const [stats, setStats] = useState({
    pendingOrders: 0,
    completedOrders: 0,
    overdueOrders: 0,
    recentActivity: [] // Added this to store the table data
  });

  useEffect(() => {
    const fetchAllStats = async () => {
      const result = await getDoctorDashboardStats();
      if (result.success) {
        setStats(result.data);
      }
    };

    if (session?.user) {
      fetchAllStats();
    }
  }, [session]);

  // Map stats to chart data
  const chartData = [
    { name: 'Pending', value: stats.pendingOrders || 0, color: '#570df8' },
    { name: 'Completed', value: stats.completedOrders || 0, color: '#36d399' },
    { name: 'Overdue', value: stats.overdueOrders || 0, color: '#f87272' },
  ];

  // Helper for the table (using recentActivity from your API or empty array)
  const recentOrders = stats.recentActivity || [];

  return (
    <div className="p-4 md:p-10 bg-base-200 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-neutral tracking-tight uppercase">
            Doctor <span className="text-primary">Dashboard</span>
          </h1>
          <p className="text-neutral/40 font-bold text-[10px] uppercase tracking-widest mt-1">
            Live Statistics & Analytics
          </p>
        </div>

        {/* Stats Cards - Pointed to stats object */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard 
            title="Pending Requests" 
            value={stats.pendingOrders} 
            icon={<Clock size={24} />} 
            color="border-primary text-primary" 
          />
          <StatCard 
            title="Completed" 
            value={stats.completedOrders} 
            icon={<CheckCircle2 size={24} />} 
            color="border-success text-success" 
          />
          <StatCard 
            title="Overdue" 
            value={stats.overdueOrders || 0} 
            icon={<AlertCircle size={24} />} 
            color="border-error text-error" 
          />
        </div>

        {/* Chart Section */}
        <div className="bg-base-100 p-8 rounded-[2.5rem] shadow-xl border border-base-300 mb-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <TrendingUp size={20} />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tight text-neutral">
              Activity <span className="text-primary">Overview</span>
            </h2>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 800 }}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  content={({ active, payload }) => {
                    if (active && payload?.length) {
                      return (
                        <div className="bg-neutral text-white p-2 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                          {`${payload[0].payload.name}: ${payload[0].value}`}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[10, 10, 10, 10]} barSize={50}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-base-100 rounded-[2.5rem] shadow-xl overflow-hidden border border-base-300">
          <div className="p-8 border-b border-base-300">
            <h2 className="text-2xl font-black uppercase tracking-tight text-neutral flex items-center gap-3">
              <CalendarDays size={24} className="text-primary" />
              Recent Activity
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead className="bg-base-200/50">
                <tr className="text-neutral/40">
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest">Patient</th>
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-center">Vaccine</th>
                  <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-center">Date</th>
                  <th className="py-4 px-8 text-[10px] font-black uppercase tracking-widest text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-neutral">
                {recentOrders.slice(0, 6).map((order) => (
                  <tr key={order._id} className="hover:bg-primary/5 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="mask mask-squircle w-10 h-10 bg-base-200">
                          <img src={order.userImage} alt="" />
                        </div>
                        <div>
                          <p className="font-black text-sm">{order.userName}</p>
                          <p className="text-[9px] font-bold text-neutral/40 flex items-center gap-1">
                            <Mail size={10} /> {order.userEmail}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center text-xs font-bold uppercase">
                      {order.vaccineName}
                    </td>
                    <td className="py-4 px-6 text-center text-xs font-black text-neutral/70">
                      {new Date(order.createdAt || order.CompletedAtByDoctor).toLocaleDateString("en-GB")}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                        order.status === "Completed" ? "bg-success/10 border-success text-success" : "bg-info/10 border-info text-info"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {recentOrders.length === 0 && (
            <div className="p-20 text-center bg-base-100">
              <CalendarDays size={48} className="mx-auto text-base-300 mb-4" />
              <p className="text-neutral/30 font-black uppercase tracking-widest text-sm">No Recent Activity</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className={`bg-base-100 rounded-[2rem] p-6 shadow-xl border-l-[6px] ${color.split(' ')[0]} hover:scale-[1.02] transition-all`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-neutral/40 mb-1">{title}</p>
        <h2 className="text-4xl font-black text-neutral">{value}</h2>
      </div>
      <div className={`p-4 bg-base-200 rounded-2xl ${color.split(' ')[1]}`}>
        {icon}
      </div>
    </div>
  </div>
);

export default DoctorDashboardHome;
