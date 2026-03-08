"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { 
  Settings, Heart, Calendar, MapPin, 
  Mail, ShieldCheck, Camera, 
  ChevronRight, PawPrint, Loader2 
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      // Only fetch if we have a session email
      if (status === "authenticated" && session?.user?.email) {
        try {
          // Replace with your actual API endpoint
          // const response = await fetch(`/api/user/profile?email=${session.user.email}`);
          // const data = await response.json();
          
          // Mocking the dynamic data based on the session email
          const mockData = {
            name: session.user.name || "User Name",
            email: session.user.email,
            image: session.user.image || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
            location: "New York, NY", // This would come from your DB
            adoptionsCount: 2,
            favoritesCount: 14,
            activeApp: {
              petName: "Luna",
              status: "Background Check",
              progress: 65
            }
          };
          
          setProfileData(mockData);
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setIsLoading(false);
        }
      } else if (status === "unauthenticated") {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [session, status]);

  // 1. Loading State
  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
      </div>
    );
  }

  // 2. Unauthenticated State
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] p-6 text-center">
        <h2 className="text-3xl font-black text-slate-900 mb-4">Access Denied</h2>
        <p className="text-slate-500 mb-8">Please sign in to view your pet adoption dashboard.</p>
        <Link href="/api/auth/signin" className="bg-orange-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all">
          Sign In Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Dynamic Profile Card */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/5 rounded-full pointer-events-none"></div>
            
            <div className="relative flex flex-col items-center text-center">
              <div className="relative group cursor-pointer">
                <div className="w-32 h-32 rounded-[2rem] overflow-hidden ring-4 ring-orange-500/10 transition-transform duration-300 group-hover:scale-105">
                  <img 
                    src={profileData?.image} 
                    alt="User" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-xl shadow-lg border-4 border-white">
                  <Camera className="w-4 h-4" />
                </div>
              </div>

              <h2 className="mt-6 text-2xl font-black text-slate-900 tracking-tight">
                {profileData?.name}
              </h2>
              <p className="text-orange-500 font-bold text-sm uppercase tracking-widest flex items-center gap-2 mt-1">
                <ShieldCheck className="w-4 h-4" /> Verified Adopter
              </p>

              <div className="w-full grid grid-cols-2 gap-4 mt-8">
                <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                  <p className="text-2xl font-black text-slate-900">{profileData?.adoptionsCount}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase">Adoptions</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                  <p className="text-2xl font-black text-slate-900">{profileData?.favoritesCount}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase">Favorites</p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4 text-slate-600 bg-slate-50/50 p-3 rounded-xl">
                <Mail className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium italic">{profileData?.email}</span>
              </div>
              <div className="flex items-center gap-4 text-slate-600 bg-slate-50/50 p-3 rounded-xl">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium">{profileData?.location}</span>
              </div>
            </div>

            <button className="w-full mt-8 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2">
              <Settings className="w-4 h-4" /> Account Settings
            </button>
          </div>
        </aside>

        {/* RIGHT COLUMN: Dashboard Content */}
        <main className="lg:col-span-8 space-y-8">
          <section className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100">
            <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-orange-500" /> Active Application
            </h3>
            
            <div className="relative p-6 bg-orange-50 rounded-3xl border border-orange-100 overflow-hidden group">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Adopting {profileData?.activeApp.petName}</h4>
                  <p className="text-slate-500 text-sm font-medium">Status: {profileData?.activeApp.status}</p>
                </div>
                <span className="px-4 py-1.5 bg-white text-orange-600 rounded-full text-xs font-black shadow-sm uppercase italic">Pending Review</span>
              </div>
              
              {/* Dynamic Progress Bar based on API/Session Data */}
              <div className="mt-6 h-2 w-full bg-white rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 transition-all duration-700 shadow-[0_0_10px_rgba(249,115,22,0.5)]" 
                  style={{ width: `${profileData?.activeApp.progress}%` }}
                ></div>
              </div>
            </div>
          </section>

          {/* Favorites and other sections remain similar but would map from profileData.savedPets */}
        </main>
      </div>
    </div>
  );
}