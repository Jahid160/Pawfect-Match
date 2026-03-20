"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  MapPin,
  Briefcase,
  Home,
  Shield,
} from "lucide-react";
import AdoptionDetailModal from "./AdoptionDetailModal";

const AdoptionListTable = ({ adoptions }) => {
const [selectedAdoption, setSelectedAdoption] = useState(null);
  return (
    <div className="overflow-x-auto bg-white rounded-[2rem] shadow-sm border border-slate-100">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
              Applicant & Code
            </th>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
              Living Condition
            </th>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
              Experience
            </th>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
              Date Applied
            </th>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
              Status
            </th>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {adoptions.map((item, index) => (
            <motion.tr
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={item._id}
              className="border-b border-slate-50 hover:bg-orange-50/30 transition-colors group"
            >
              {/* Applicant Info & Adoption Code */}
              <td className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-orange-200">
                    {item.fullName?.[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 leading-none mb-1">
                      {item.fullName}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">
                        Code: {item.adoptionCode}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {item.email}
                      </span>
                    </div>
                  </div>
                </div>
              </td>

              {/* Living Condition */}
              <td className="p-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-600 text-xs font-bold">
                    <Home size={12} className="text-orange-500" />
                    {item.residence}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                    <Shield size={10} />
                    Yard: {item.yard === "yes" ? "Available" : "No Yard"}
                  </div>
                </div>
              </td>

              {/* Experience Level */}
              <td className="p-6">
                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                    item.experience === "Experienced"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {item.experience}
                </span>
              </td>

              {/* Date Applied Section */}
              <td className="p-6">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                  <Calendar size={14} className="text-slate-300" />
                  {item?.adoptedUserTime
                    ? new Date(item.adoptedUserTime).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )
                    : "Not Available"}
                </div>
              </td>

              {/* Status */}
              <td className="p-6">
                <StatusBadge status={item.status} />
              </td>

              {/* Action */}
              <td className="p-6 text-right">
                <button onClick={() => setSelectedAdoption(item)} className="px-4 py-2 text-[10px] font-black text-orange-500 hover:bg-orange-500 hover:text-white border border-orange-200 rounded-xl transition-all uppercase tracking-wider">
                  Details
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      <AnimatePresence>
        {selectedAdoption && (
          <AdoptionDetailModal 
            data={selectedAdoption} 
            onClose={() => setSelectedAdoption(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const normalized = status?.toLowerCase() || "pending";

  const styles = {
    pending: "bg-amber-100 text-amber-600 border-amber-200",
    approved: "bg-emerald-100 text-emerald-600 border-emerald-200",
    rejected: "bg-rose-100 text-rose-600 border-rose-200",
  };

  const icons = {
    pending: <Clock size={12} />,
    approved: <CheckCircle2 size={12} />,
    rejected: <XCircle size={12} />,
  };

  return (
    <span
      className={`px-3 py-1.5 border rounded-full text-[10px] font-black uppercase flex items-center gap-1.5 w-fit shadow-sm ${styles[normalized]}`}
    >
      {icons[normalized]} {normalized}
    </span>
  );
};

export default AdoptionListTable;
