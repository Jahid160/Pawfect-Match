"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck,
  BarChart3,
} from 'lucide-react';
import VerificationTab from './VerificationTab';
import { getShelterRequests } from '@/action/server/Shelteruser';
import ShelterInsight from './ShelterInsight';


const ShelterManagement = () => {
  const [activeTab, setActiveTab] = useState("verification");
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const SelterRequests = async () => {
      const result = await getShelterRequests(currentPage, itemsPerPage, searchTerm);
      if (result.success) {
        setRequests(result.data);
        setTotalItems(result.totalItems);
      } else {
        console.error("Some error occurred:", result.error);
      }
    };
    SelterRequests();
  }, [currentPage, searchTerm]);

  const tabs = [
    { id: "verification", label: "Verification", icon: <ClipboardCheck size={18} /> },
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

          {/* 3. PERFORMANCE & ANALYTICS TAB */}
          {activeTab === "analytics" && (
            <ShelterInsight currentPage={currentPage} setCurrentPage={setCurrentPage} startIndex={startIndex} endIndex={endIndex} totalItems={totalItems} totalPages={totalPages} requests={requests} setRequests={setRequests} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ShelterManagement;