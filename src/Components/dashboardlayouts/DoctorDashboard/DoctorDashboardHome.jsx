"use client";
import React, { useEffect } from 'react';
import { Clock, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

const DoctorDashboardHome = ({ stats }) => {
  
  useEffect(() => {
    console.log("Stats received in Client:", stats);
  }, [stats]);

  // যদি stats না আসে তবে ০ সেট হবে
  const pendingCount = stats?.pending || 0;
  const completedCount = stats?.completed || 0;
  const overdueCount = stats?.overdue || 0;

  const chartData = [
    { name: 'Pending', value: pendingCount, color: '#570df8' },
    { name: 'Completed', value: completedCount, color: '#36d399' },
    { name: 'Overdue', value: overdueCount, color: '#f87272' },
  ];

  return (
    <div className="p-4 md:p-10 bg-base-200 min-h-screen">
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard 
            title="Pending Requests" 
            value={pendingCount} 
            icon={<Clock size={24} />} 
            color="border-primary text-primary" 
          />
          <StatCard 
            title="Completed" 
            value={completedCount} 
            icon={<CheckCircle2 size={24} />} 
            color="border-success text-success" 
          />
          <StatCard 
            title="Overdue" 
            value={overdueCount} 
            icon={<AlertCircle size={24} />} 
            color="border-error text-error" 
          />
        </div>

        {/* Chart Section */}
        <div className="bg-base-100 p-8 rounded-[2.5rem] shadow-xl border border-base-300">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <TrendingUp size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-neutral">
                Activity <span className="text-primary">Overview</span>
              </h2>
            </div>
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