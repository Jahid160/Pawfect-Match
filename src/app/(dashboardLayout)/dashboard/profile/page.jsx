"use client";

import React from 'react';
import { 
  Settings, Heart, Calendar, MapPin, 
  Mail, Phone, ShieldCheck, Camera, 
  ChevronRight, PawPrint 
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const savedPets = [
    { id: 1, name: "Luna", breed: "Golden Retriever", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200" },
    { id: 2, name: "Oliver", breed: "Tabby Cat", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Profile Card */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
            {/* Decorative background circle */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/5 rounded-full pointer-events-none"></div>
            
            <div className="relative flex flex-col items-center text-center">
              {/* Avatar with Edit Badge */}
              <div className="relative group cursor-pointer">
                <div className="w-32 h-32 rounded-[2rem] overflow-hidden ring-4 ring-orange-500/10 transition-transform duration-300 group-hover:scale-105">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400" 
                    alt="User" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-xl shadow-lg border-4 border-white">
                  <Camera className="w-4 h-4" />
                </div>
              </div>

              <h2 className="mt-6 text-2xl font-black text-slate-900 tracking-tight">Sarah Jenkins</h2>
              <p className="text-orange-500 font-bold text-sm uppercase tracking-widest flex items-center gap-2 mt-1">
                <ShieldCheck className="w-4 h-4" /> Verified Adopter
              </p>

              <div className="w-full grid grid-cols-2 gap-4 mt-8">
                <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100 transition-hover hover:border-orange-200">
                  <p className="text-2xl font-black text-slate-900">02</p>
                  <p className="text-xs font-bold text-slate-500 uppercase">Adoptions</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100 transition-hover hover:border-orange-200">
                  <p className="text-2xl font-black text-slate-900">14</p>
                  <p className="text-xs font-bold text-slate-500 uppercase">Favorites</p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4 text-slate-600 bg-slate-50/50 p-3 rounded-xl">
                <Mail className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium italic">sarah.j@example.com</span>
              </div>
              <div className="flex items-center gap-4 text-slate-600 bg-slate-50/50 p-3 rounded-xl">
                <MapPin className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium">Brooklyn, New York</span>
              </div>
            </div>

            <button className="w-full mt-8 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2">
              <Settings className="w-4 h-4" /> Edit Profile
            </button>
          </div>
        </aside>

        {/* RIGHT COLUMN: Dashboard Content */}
        <main className="lg:col-span-8 space-y-8">
          
          {/* Section 1: Application Progress */}
          <section className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100">
            <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-orange-500" /> Active Application
            </h3>
            
            <div className="relative p-6 bg-orange-50 rounded-3xl border border-orange-100 overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                <PawPrint className="w-16 h-16 text-orange-600" />
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Adopting </h4>
                  <p className="text-slate-500 text-sm font-medium">Status: Background Check in Progress</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="px-4 py-1.5 bg-white text-orange-600 rounded-full text-xs font-black shadow-sm uppercase tracking-tighter italic">Pending Review</span>
                    <button className="p-2 bg-white rounded-full text-slate-400 hover:text-orange-500 transition-colors shadow-sm"><ChevronRight /></button>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="mt-6 h-2 w-full bg-white rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-[65%] rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
              </div>
            </div>
          </section>

          {/* Section 2: Saved Pets Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-500 fill-red-500" /> Favorites
              </h3>
              <Link href="#" className="text-sm font-bold text-orange-500 hover:underline">View All</Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {savedPets.map((pet) => (
                <div key={pet.id} className="group bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-slate-50">
                    <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-orange-500 transition-colors">{pet.name}</h4>
                    <p className="text-xs text-slate-400 font-medium">{pet.breed}</p>
                    <button className="mt-1 text-[10px] font-black uppercase tracking-widest text-orange-500 flex items-center gap-1">
                      Check Status <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}