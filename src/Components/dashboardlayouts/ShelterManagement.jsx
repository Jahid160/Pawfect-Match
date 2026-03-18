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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  useEffect(() => {
    const SelterRequests = async () => {
      const result = await getShelterRequests(currentPage, itemsPerPage);
      if (result.success) {
        setRequests(result.data);
        setTotalItems(result.totalItems);
      } else {
        console.error("Some error occurred:", result.error);
      }
    };
    SelterRequests();
  }, [currentPage]);

  const tabs = [
    { id: "verification", label: "Verification", icon: <ClipboardCheck size={18} /> },
    { id: "inventory", label: "Inventory", icon: <LayoutGrid size={18} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
  ];

  return (
    <div className="bg-base-200 min-h-screen p-4 sm:p-6 lg:p-10 font-sans">

      {/* --- HEADER --- */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-neutral tracking-tight">
          Shelter <span className="text-primary">Management</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-500 font-medium mt-1">
          Oversee shelter operations, verify documents, and track performance.
        </p>
      </div>

      {/* --- TABBING SYSTEM --- */}
      {/* Mobile: full-width stacked; Tablet+: inline pill row */}
      <div className="
        flex flex-col sm:flex-row
        bg-white p-1.5 rounded-2xl shadow-sm border border-base-300
        w-full sm:w-fit
        mb-6 sm:mb-8
        gap-1 sm:gap-0
      ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              relative flex items-center justify-center gap-2
              px-4 sm:px-6 py-3 rounded-xl font-bold text-sm
              transition-all z-10 w-full sm:w-auto
              ${activeTab === tab.id
                ? "text-white"
                : "text-slate-500 hover:bg-base-200"
              }
            `}
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
            <VerificationTab currentPage={currentPage} setCurrentPage={setCurrentPage} startIndex={startIndex} endIndex={endIndex} totalItems={totalItems} totalPages={totalPages} requests={requests} setRequests={setRequests} />
          )}

          {/* 2. INVENTORY & MONITORING TAB */}
          {activeTab === "inventory" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

              {/* Shelter List */}
              <div className="lg:col-span-2 bg-base-100 rounded-3xl shadow-xl p-5 sm:p-8 border border-base-300">
                <h2 className="text-lg sm:text-xl font-black mb-4 sm:mb-6">
                  Live Inventory Tracking
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-base-200/50 rounded-2xl border border-base-300">
                    <div>
                      <p className="font-black text-slate-800 italic text-base sm:text-lg">
                        Happy Paws Sanctuary
                      </p>
                      <p className="text-sm font-bold text-slate-400">
                        Total Pets:{" "}
                        <span className="text-primary font-black">72</span>
                      </p>
                    </div>
                    <div className="flex gap-2 self-end sm:self-auto">
                      <button className="btn btn-circle btn-ghost text-info hover:bg-info/10">
                        <Eye size={20} />
                      </button>
                      <button className="btn btn-circle btn-ghost text-error hover:bg-error/10">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Moderation Sidebar */}
              <div className="bg-primary text-white rounded-3xl p-5 sm:p-8 shadow-xl shadow-primary/20">
                <h3 className="text-lg sm:text-xl font-black mb-3 sm:mb-4">
                  Post Moderation
                </h3>
                <p className="text-sm opacity-80 mb-4 sm:mb-6 font-medium">
                  Delete or edit fake/misleading pet entries reported by users.
                </p>
                <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                  <p className="font-black text-sm">Adoption Success Rate</p>
                  <div className="text-3xl sm:text-4xl font-black mt-1">84%</div>
                </div>
              </div>
            </div>
          )}

          {/* 3. PERFORMANCE & ANALYTICS TAB */}
          {activeTab === "analytics" && (
            <div className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

                {/* Top Shelter Stat */}
                <div className="stats shadow-sm bg-base-100 border border-base-300 rounded-3xl w-full">
                  <div className="stat">
                    <div className="stat-figure text-primary"><TrendingUp /></div>
                    <div className="stat-title font-bold">Top Shelter</div>
                    <div className="stat-value text-primary text-xl sm:text-2xl">Paws Home</div>
                    <div className="stat-desc font-bold text-success">12 Adoptions/Mo</div>
                  </div>
                </div>

                {/* Region Map Card — spans full width on mobile/tablet, 2 cols on lg */}
                <div className="
                  sm:col-span-1 lg:col-span-2
                  bg-base-100 border border-base-300 rounded-3xl
                  p-5 sm:p-6
                  flex flex-col sm:flex-row items-start sm:items-center
                  justify-between gap-4
                  shadow-sm
                ">
                  <div>
                    <p className="font-black text-slate-400 text-xs uppercase tracking-widest mb-1">
                      Region Map
                    </p>
                    <h3 className="text-xl sm:text-2xl font-black text-neutral">
                      Bangladesh Network
                    </h3>
                    <p className="flex items-center gap-1 text-slate-500 font-bold text-sm mt-1">
                      <MapPin size={14} /> Dhaka, Chittagong, Sylhet active.
                    </p>
                  </div>
                  <button className="btn btn-primary rounded-xl font-black w-full sm:w-auto">
                    View Heatmap
                  </button>
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