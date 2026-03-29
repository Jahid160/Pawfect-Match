"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  PawPrint,
  Heart,
  Clock,
  MessageCircle,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

import { useEffect, useState } from "react";
import {
  getRecommendedPets,
  getUserDashboardStats,
  getUserRecentRequests,
} from "@/action/userServerDash/myPets";

const UserDashboardHome = () => {
  const { data: session } = useSession();
  const [recentRequests, setRecentRequests] = useState([]);
  const [recommendedPets, setRecommendedPets] = useState([]);
  // Use a single object for all stats
  const [stats, setStats] = useState({
    approved: 0,
    pending: 0,
    favorites: 0,
    available: 0,
  });

  // Fetch the count when the component mounts or session changes
  useEffect(() => {
    const fetchAllStats = async () => {
      const result = await getUserDashboardStats();
      if (result.success) {
        setStats(result.data); // Update all stats at once
      }
    };

    if (session?.user) {
      fetchAllStats();
    }
  }, [session]);

  useEffect(() => {
  const fetchPets = async () => {
    const res = await getRecommendedPets();
    setRecommendedPets(res);
  };

  fetchPets();
}, []);

console.log(recommendedPets);

  const overviewCards = [
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
  ];


  useEffect(() => {
    const fetchRecent = async () => {
      const result = await getUserRecentRequests();

      if (result.success) {
        setRecentRequests(result.data);
      }
    };

    if (session?.user) {
      fetchRecent();
    }
  }, [session]);



  return (
    <div className="p-6 lg:p-10 space-y-10 bg-[#FDFCFB] min-h-screen -mt-22.5 md:m-auto lg:m-auto">
      {/* 1. Welcome Section - Modern Glassmorphism Look */}
      {/* <div className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-8 lg:p-12 text-white shadow-2xl shadow-slate-200">
        <div className="relative z-10">
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight">
            Welcome back, <span className="text-orange-500">{session?.user?.name?.split(' ')[0] || "User"}</span> 👋
          </h1>
          <p className="text-slate-400 mt-2 font-medium max-w-md">
            Your furry friends are waiting for some love! Here is what is happening today.
          </p>
          <div className="mt-6 flex gap-3">
             <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold border border-white/10 flex items-center gap-2">
               <Sparkles size={14} className="text-orange-400" /> Premium Member
             </span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      </div> */}

      {/* 2. Overview Cards - Floating Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group transition-all hover:shadow-xl hover:border-orange-100"
          >
            <div>
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">
                {card.title}
              </p>
              <h2 className="text-3xl font-black text-slate-800">
                {card.value}
              </h2>
            </div>
            <div
              className={`${card.color} p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform`}
            >
              <card.icon size={24} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 3. Recent Adoption Requests - Clean Table */}
        <div className="lg:col-span-7 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-slate-800">
              Recent Requests
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                  <th className="pb-4 px-2">Pet Name</th>
                  <th className="pb-4 px-2">Pet Gender</th>
                  <th className="pb-4 px-2">Status</th>
                  <th className="pb-4 px-2 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentRequests.map((item, i) => (
                  <tr
                    key={i}
                    className="group transition-colors hover:bg-slate-50/50"
                  >
                    <td className="py-4 px-2 font-bold text-slate-700">
                      {item.petName}
                    </td>
                    <td className="py-4 px-2 font-bold text-slate-700">
                      {item.gender}
                    </td>
                    <td className="py-4 px-2">
                      <span
                        className={`px-3 py-1.5 text-[10px] font-black rounded-full uppercase ${
                          item.status === "pending"
                            ? "text-amber-600 bg-amber-50"
                            : item.status === "adopted"
                              ? "text-emerald-600 bg-emerald-50"
                              : "text-rose-600 bg-rose-50"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right text-slate-400 font-medium text-sm">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Quick Actions - Modern Buttons */}
        <div className="lg:col-span-5 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8">
          <h2 className="text-xl font-black text-slate-800 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 gap-3">
            <Link
              href="/all-pets"
              className="flex items-center justify-between w-full p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold transition-all shadow-lg shadow-orange-200"
            >
              Adopt a New Pet <ArrowRight size={18} />
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center justify-between w-full p-4 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-2xl font-bold transition-all"
            >
              Update Profile{" "}
              <ExternalLink size={18} className="text-slate-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* 5. Recommended Pets - Card Hover Effects */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-slate-800">
          New On The Block 🦴
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendedPets.map((pet, index) => (
            <div
              key={index}
              className="group bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full text-rose-500">
                  <Heart size={18} />
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-black text-slate-800 text-lg">
                      {pet.name}
                    </h3>
                    <p className="text-slate-400 text-xs font-bold">
                      {pet.breed}
                    </p>
                  </div>
                  <Link href={`/all-pets/${pet.id}`} className="bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-black hover:bg-orange-500 transition-colors">
                    ADOPT
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
