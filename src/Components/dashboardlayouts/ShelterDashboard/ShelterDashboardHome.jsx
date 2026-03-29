"use client";
import { getShelterDashboardStats } from "@/action/shelterServerDash/petList";
import {
  Clock,
  Heart,
  PawPrint,
  UserStar,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Loading from "@/Components/Loading";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ShelterDashboardHome = () => {
  const { data: session } = useSession();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllStats = async () => {
      setLoading(true);
      try {
        const result = await getShelterDashboardStats();
        if (result.success) {
          setDashboardData(result.data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchAllStats();
    }
  }, [session]);

  const { overviewCards, barData } = useMemo(() => {
    if (!dashboardData || !dashboardData.currentStats) {
      return { overviewCards: [], barData: [] };
    }

    const stats = dashboardData.currentStats;

    const cards = [
      {
        title: "Adopted Pets",
        value: stats.adopted,
        icon: PawPrint,
        color: "bg-orange-500",
      },
      {
        title: "Available Pets",
        value: stats.available,
        icon: PawPrint,
        color: "bg-orange-500",
      },
      {
        title: "Favorite Pets",
        value: stats.favorites,
        icon: Heart,
        color: "bg-rose-500",
      },
      {
        title: "Pending Requests",
        value: stats.pending,
        icon: Clock,
        color: "bg-amber-500",
      },
      {
        title: "Preview Requests",
        value: stats.preview,
        icon: UserStar,
        color: "bg-cyan-500",
      },
    ];

    const bData = [
      { name: "Adopted", value: stats.adopted, color: "#f97316" },
      { name: "Available", value: stats.available, color: "#fb923c" },
      { name: "Favorites", value: stats.favorites, color: "#f43f5e" },
      { name: "Pending", value: stats.pending, color: "#f59e0b" },
      { name: "Preview", value: stats.preview, color: "#06b6d4" },
    ];

    return { overviewCards: cards, barData: bData };
  }, [dashboardData]);

  const areaData = useMemo(() => {
    return dashboardData?.monthlyData || [];
  }, [dashboardData]);

  if (loading) return <Loading />;
  if (!dashboardData)
    return <div className="p-10 text-center">No dashboard data found.</div>;

  return (
    <div className="p-6 space-y-10 bg-[#FDFCFB] min-h-screen -mt-22.5 md:m-auto lg:m-auto">
      {/* SECTION 1: Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {overviewCards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group transition-all hover:shadow-xl hover:border-orange-100"
          >
            <div className="overflow-hidden">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1 truncate">
                {card.title}
              </p>
              <h2 className="text-2xl font-black text-slate-800 italic">
                {card.value || 0}
              </h2>
            </div>
            <div
              className={`${card.color} p-3 rounded-2xl text-white shadow-lg`}
            >
              <card.icon size={20} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SECTION 2: BarChart */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <BarChart3 className="text-orange-500" /> Shelter Inventory
              </h2>
              <p className="text-slate-400 text-xs font-bold mt-1">
                Status distribution
              </p>
            </div>
          </div>
          <div style={{ width: "100%", height: 350 }}>
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 11, fontWeight: 800 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }}
                />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    borderRadius: "15px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={40}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECTION 3: Area Chart */}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <TrendingUp className="text-orange-500" /> Adoption Trends
              </h2>
              <p className="text-slate-400 text-xs font-bold mt-1">
                Last 6 Months performance
              </p>
            </div>
          </div>
          <div style={{ width: "100%", height: 350 }}>
            <ResponsiveContainer>
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "15px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#f97316"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterDashboardHome;
