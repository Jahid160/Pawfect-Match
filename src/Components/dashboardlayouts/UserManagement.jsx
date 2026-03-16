"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  UserPlus,
  Search,
  ShieldCheck,
  MoreVertical,
  Mail,
  Filter,
  UserX,
  UserCheck,
  Loader2,
  Calendar,
  Clock,
  X,
  Home,
  User as UserIcon,
} from "lucide-react";
import { activeUser, blockUser } from "@/action/server/users";
import { useRouter } from "next/navigation";

const UserManagement = ({ user = [] }) => {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);

  // --- Filter States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // --- 4 Role Implementation Logic ---
  const filteredUsers = useMemo(() => {
    return user.filter((u) => {
      const matchesSearch =
        u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole =
        roleFilter === "All" ||
        u.role?.toLowerCase() === roleFilter.toLowerCase();
      const matchesStatus = statusFilter === "All" || u.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [user, searchQuery, roleFilter, statusFilter]);

  const handleAction = async (id, actionFn) => {
    setLoadingId(id);
    try {
      await actionFn(id);
      router.refresh();
    } finally {
      setLoadingId(null);
    }
  };

  // UI helper for Role Icons
  const getRoleBadge = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return {
          icon: <ShieldCheck size={14} />,
          color: "text-orange-500 bg-orange-50",
          label: "Admin",
        };
      case "shelter":
        return {
          icon: <Home size={14} />,
          color: "text-blue-500 bg-blue-50",
          label: "Shelter",
        };
      default:
        return {
          icon: <UserIcon size={14} />,
          color: "text-slate-500 bg-slate-50",
          label: "User",
        };
    }
  };

  return (
    <div className="bg-[#FBFCFE] p-4 lg:p-10 min-h-screen font-sans text-slate-900">
      {/* --- HEADER --- */}
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="font-black text-slate-900 text-5xl tracking-tight">
            User{" "}
            <span className="text-orange-500 underline decoration-orange-100 underline-offset-4">
              Directory
            </span>
          </h1>
          <p className="mt-2 font-medium text-slate-500">
            Filtering through {user.length} registered members.
          </p>
        </motion.div>

        <button className="flex items-center gap-3 bg-slate-900 hover:bg-orange-600 shadow-xl shadow-slate-200 px-8 py-4 rounded-2xl font-bold text-white transition-all active:scale-95">
          <UserPlus size={20} /> Add Member
        </button>
      </div>

      {/* --- ADVANCED FILTERS --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
        <div className="md:col-span-6 relative group">
          <Search
            className="top-1/2 left-5 absolute text-slate-400 -translate-y-1/2 group-focus-within:text-orange-500 transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Search name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white shadow-sm py-4 pr-12 pl-14 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/5 outline-none w-full font-medium transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="top-1/2 right-4 absolute bg-slate-100 hover:bg-slate-200 p-1 rounded-full text-slate-400 -translate-y-1/2"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Role Select */}
        <div className="md:col-span-3">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-white shadow-sm px-6 py-4 border border-slate-200 rounded-2xl font-bold text-slate-600 text-sm outline-none cursor-pointer w-full appearance-none transition-all"
          >
            <option value="All">All Roles</option>
            <option value="user">User</option>
            <option value="shelter">Shelter</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Status Select */}
        <div className="md:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white shadow-sm px-6 py-4 border border-slate-200 rounded-2xl font-bold text-slate-600 text-sm outline-none cursor-pointer w-full appearance-none transition-all"
          >
            <option value="All">All Status</option>
            <option value="active">Active</option>
            <option value="block">Blocked</option>
          </select>
        </div>
      </div>

      {/* --- TABLE --- */}
      <div className="bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 rounded-[2.5rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 font-black text-[11px] text-slate-400 uppercase tracking-[0.15em]">
                <th className="px-8 py-6">Identity</th>
                <th className="px-8 py-6">Access Role</th>
                <th className="px-8 py-6">Account Status</th>
                <th className="px-8 py-6">History</th>
                <th className="bg-slate-50/30 px-8 py-6 text-right">
                  Management
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode="popLayout">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((u, i) => {
                    const roleInfo = getRoleBadge(u.role);
                    return (
                      <motion.tr
                        key={u._id || i}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="hover:bg-slate-50/50 transition-all"
                      >
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="flex justify-center items-center bg-slate-100 rounded-2xl w-12 h-12 font-black text-slate-600 text-lg">
                              {u.name?.charAt(0)}
                            </div>
                            <div>
                              <p className="mb-1 font-bold text-slate-900 text-sm leading-none">
                                {u.name}
                              </p>
                              <p className="font-medium text-slate-400 text-xs">
                                {u.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl w-fit font-bold text-xs ${roleInfo.color}`}
                          >
                            {roleInfo.icon}
                            {roleInfo.label}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span
                            className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase flex items-center w-fit gap-2 ${
                              u.status === "active"
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-rose-50 text-rose-600"
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${u.status === "active" ? "bg-emerald-500" : "bg-rose-500"}`}
                            />
                            {u.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-slate-400">
                          <div className="flex flex-col gap-1">
                            <span className="flex items-center gap-1.5 font-bold text-[11px]">
                              <Calendar size={12} />{" "}
                              {new Date(u.createdAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1.5 font-medium text-[10px]">
                              <Clock size={12} />{" "}
                              {new Date(u.lastLoginAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </td>
                        <td className="bg-slate-50/20 px-8 py-6 text-right">
                          <div className="flex justify-end items-center gap-3">
                            <button
                              onClick={() => handleAction(u._id, activeUser)}
                              disabled={
                                u.status === "active" || loadingId === u._id
                              }
                              className="bg-white hover:bg-emerald-50 disabled:opacity-30 shadow-sm border border-slate-100 p-2.5 rounded-xl text-slate-400 hover:text-emerald-600 transition-all"
                            >
                              {loadingId === u._id ? (
                                <Loader2
                                  size={18}
                                  className="animate-spin text-emerald-600"
                                />
                              ) : (
                                <UserCheck size={18} />
                              )}
                            </button>
                            <button
                              onClick={() => handleAction(u._id, blockUser)}
                              disabled={
                                u.status === "block" || loadingId === u._id
                              }
                              className="bg-white hover:bg-rose-50 disabled:opacity-30 shadow-sm border border-slate-100 p-2.5 rounded-xl text-slate-400 hover:text-rose-600 transition-all"
                            >
                              <UserX size={18} />
                            </button>
                            <button className="bg-white hover:bg-slate-100 shadow-sm border border-slate-100 p-2.5 rounded-xl text-slate-400 transition-all">
                              <MoreVertical size={18} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="px-8 py-32 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="bg-slate-50 p-4 rounded-full text-slate-300">
                          <Search size={40} />
                        </div>
                        <p className="font-black text-slate-400 text-sm uppercase tracking-widest">
                          No matching results
                        </p>
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            setRoleFilter("All");
                            setStatusFilter("All");
                          }}
                          className="text-orange-500 font-bold text-xs hover:underline"
                        >
                          Clear all filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="bg-slate-50/30 p-8 border-t border-slate-100 flex justify-between items-center">
          <span className="font-bold text-slate-400 text-[10px] tracking-widest uppercase">
            Result Count:{" "}
            <span className="text-slate-900">{filteredUsers.length}</span>
          </span>
          <div className="flex gap-2">
            <button className="bg-white px-5 py-2 border border-slate-200 rounded-xl font-bold text-slate-500 text-xs transition-all">
              Previous
            </button>
            <button className="bg-slate-900 px-5 py-2 border border-slate-900 rounded-xl font-bold text-white text-xs transition-all shadow-lg shadow-slate-200">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
