"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck,
  LayoutGrid,
  BarChart3,
  Eye,
  Trash2,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import VerificationTab from './VerificationTab';
import { getShelterRequests } from '@/action/server/Shelteruser';


const ShelterManagement = () => {
  const [activeTab, setActiveTab] = useState("verification");
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const SelterRequests = async () => {
      const result = await getShelterRequests();
      if (result.success) {
        setRequests(result.data)
      } else {
        console.error("Some error occurred:", result.error);
      }

    }
    SelterRequests()
  }, []);

  const tabs = [
    { id: "verification", label: "Verification", icon: <ClipboardCheck size={18} /> },
    { id: "inventory", label: "Inventory", icon: <LayoutGrid size={18} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
  ];


  return (
    <div className="bg-base-200 min-h-screen p-6 lg:p-10 font-sans">
      {/* --- HEADER --- */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-neutral tracking-tight">
          Shelter <span className="text-primary">Management</span>
        </h1>
        <p className="text-slate-500 font-medium">Oversee shelter operations, verify documents, and track performance.</p>
      </div>

      {/* --- TABBING SYSTEM (DaisyUI + Framer Motion) --- */}
      <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-base-300 w-fit mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all z-10 ${activeTab === tab.id ? "text-white" : "text-slate-500 hover:bg-base-200"
              }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary rounded-xl -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* --- TAB CONTENT --- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {/* 1. VERIFICATION TAB */}
          {activeTab === "verification" && (
            <VerificationTab requests={requests} setRequests={setRequests} ></VerificationTab>
          )}

          {/* 2. INVENTORY & MONITORING TAB */}
          {activeTab === "inventory" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Content logic: List of all shelters with pet counts */}
              <div className="lg:col-span-2 bg-base-100 rounded-4xl shadow-xl p-8 border border-base-300">
                <h2 className="text-xl font-black mb-6">Live Inventory Tracking</h2>
                <div className="space-y-4">
                  {/* Sample Shelter Card for Inventory */}
                  <div className="flex items-center justify-between p-4 bg-base-200/50 rounded-2xl border border-base-300">
                    <div>
                      <p className="font-black text-slate-800 italic text-lg">Happy Paws Sanctuary</p>
                      <p className="text-sm font-bold text-slate-400">Total Pets: <span className="text-primary font-black">72</span></p>
                    </div>
                    <div className="flex gap-3">
                      <button className="btn btn-circle btn-ghost text-info hover:bg-info/10"><Eye size={20} /></button>
                      <button className="btn btn-circle btn-ghost text-error hover:bg-error/10"><Trash2 size={20} /></button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Moderation Sidebar */}
              <div className="bg-primary text-white rounded-4xl p-8 shadow-xl shadow-primary/20">
                <h3 className="text-xl font-black mb-4">Post Moderation</h3>
                <p className="text-sm opacity-80 mb-6 font-medium font-sans">Delete or edit fake/misleading pet entries reported by users.</p>
                <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                  <p className="font-black text-sm">Adoption Success Rate</p>
                  <div className="text-3xl font-black mt-1">84%</div>
                </div>
              </div>
            </div>
          )}

          {/* 3. PERFORMANCE & ANALYTICS TAB */}
          {activeTab === "analytics" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="stats shadow-sm bg-base-100 border border-base-300 rounded-4xl">
                  <div className="stat">
                    <div className="stat-figure text-primary"><TrendingUp /></div>
                    <div className="stat-title font-bold">Top Shelter</div>
                    <div className="stat-value text-primary text-2xl">Paws Home</div>
                    <div className="stat-desc font-bold text-success">12 Adoptions/Mo</div>
                  </div>
                </div>
                {/* Location Filter Card */}
                <div className="col-span-2 bg-base-100 border border-base-300 rounded-4xl p-6 flex items-center justify-between shadow-sm">
                  <div>
                    <p className="font-black text-slate-400 text-xs uppercase tracking-widest mb-1">Region Map</p>
                    <h3 className="text-2xl font-black text-neutral">Bangladesh Network</h3>
                    <p className="flex items-center gap-1 text-slate-500 font-bold text-sm mt-1">
                      <MapPin size={14} /> Dhaka, Chittagong, Sylhet active.
                    </p>
                  </div>
                  <button className="btn btn-primary rounded-xl font-black">View Heatmap</button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ShelterManagement;