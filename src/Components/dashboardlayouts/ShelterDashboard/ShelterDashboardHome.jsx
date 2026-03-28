"use client";
import { getShelterDashboardStats } from "@/action/shelterServerDash/petList";
import { Clock, Heart, PawPrint, UserStar, TrendingUp, BarChart3 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
// Chart Imports
import {
  AreaChart,
  Area,
  BarChart, // Added
  Bar,      // Added
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ShelterDashboardHome = () => {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    adopted: 0,
    pending: 0,
    favorites: 0,
    available: 0,
    preview: 0,
  });

  // Dummy data for the chart
  const chartData = [
    { name: "Jan", count: 10 },
    { name: "Feb", count: 25 },
    { name: "Mar", count: 18 },
    { name: "Apr", count: 40 },
    { name: "May", count: 32 },
    { name: "Jun", count: 50 },
  ];

  useEffect(() => {
    const fetchAllStats = async () => {
      const result = await getShelterDashboardStats();
      if (result.success) {
        setStats(result.data);
      }
    };

    if (session?.user) {
      fetchAllStats();
    }
  }, [session]);

  const overviewCards = [
    { title: "Adopted Pets", value: stats.adopted, icon: PawPrint, color: "bg-orange-500" },
    { title: "Available Pets", value: stats.available, icon: PawPrint, color: "bg-orange-500" },
    { title: "Favorite Pets", value: stats.favorites, icon: Heart, color: "bg-rose-500" },
    { title: "Pending Requests", value: stats.pending, icon: Clock, color: "bg-amber-500" },
    { title: "Preview Requests", value: stats.preview, icon: UserStar, color: "bg-cyan-500" },
  ];

  return (
    <div className="p-6 space-y-8 bg-slate-50/50 min-h-screen">
      {/* 1. Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {overviewCards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className={`bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group transition-all hover:shadow-xl ${index === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
          >
            <div className="overflow-hidden">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1 truncate">
                {card.title}
              </p>
              <h2 className="text-2xl font-black text-slate-800 italic">{card.value || 0}</h2>
            </div>
            <div className={`${card.color} p-3 rounded-2xl text-white shadow-lg`}>
              <card.icon size={20} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 2. Adoption Analytics (Area Chart) */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="mb-8">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <TrendingUp className="text-orange-500" /> Adoption Trends
            </h2>
            <p className="text-slate-400 text-xs font-bold">Monthly activity overview</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }} />
                <Tooltip contentStyle={{ borderRadius: "20px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
                <Area type="monotone" dataKey="count" stroke="#f97316" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. NEW Bar Chart Section */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="mb-8">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <BarChart3 className="text-cyan-500" /> Monthly Statistics
            </h2>
            <p className="text-slate-400 text-xs font-bold">Total adoptions per month</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: "20px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                />
                <Bar
                  dataKey="count"
                  fill="#f97316"
                  radius={[10, 10, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterDashboardHome;