"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, UserPlus, Mail, UserX, UserCheck, Loader2,
  Calendar, X, Eye, ChevronLeft, ChevronRight
} from "lucide-react";
import { activeUser, blockUser } from "@/action/server/users";
import { useRouter } from "next/navigation";
import UserDetailsModal from "./AdminDashboard/UserDetailsModal/UserDetailsModal";


const UserManagement = ({ user = [] }) => {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Filter States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // --- Filter Logic ---
  const filteredUsers = useMemo(() => {
    return user.filter((u) => {
      const isRoleUser = u.role?.toLowerCase() === "user" || !u.role;
      const matchesSearch = u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || u.status === statusFilter;
      return isRoleUser && matchesSearch && matchesStatus;
    });
  }, [user, searchQuery, statusFilter]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const handleAction = async (id, actionFn) => {
    setLoadingId(id);
    try {
      await actionFn(id);
      router.refresh();
    } finally {
      setLoadingId(null);
    }
  };

  const openDetails = (u) => {
    setSelectedUser(u);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-base-200 p-4 lg:p-10 min-h-screen font-sans text-neutral">
      {/* Header & Filters  */}
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-6 mb-12">
        <h1 className="font-black text-neutral text-5xl tracking-tight">User <span className="text-primary underline decoration-primary/10">Directory</span></h1>
        <button className="flex items-center gap-3 bg-neutral hover:bg-primary px-8 py-4 rounded-2xl font-bold text-white transition-all">
          <UserPlus size={20} /> Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
        <div className="md:col-span-8 relative">
          <Search className="top-1/2 left-5 absolute text-neutral/30 -translate-y-1/2" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            className="bg-base-100 py-4 pl-14 border border-base-300 rounded-2xl w-full outline-none focus:ring-4 focus:ring-primary/10"
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="md:col-span-4">
          <select
            className="bg-base-100 px-6 py-4 border border-base-300 rounded-2xl w-full font-bold outline-none"
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="All">All Status</option>
            <option value="active">Active</option>
            <option value="block">Blocked</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-base-100 shadow-2xl border border-base-300 rounded-[2.5rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-base-200/50 font-black text-[11px] text-neutral/40 uppercase tracking-widest">
                <th className="px-8 py-6">Member</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6">Joined</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200">
              <AnimatePresence mode="popLayout">
                {paginatedUsers.map((u) => (
                  <motion.tr key={u._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-base-200/30 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="flex justify-center items-center bg-primary/10 rounded-2xl w-10 h-10 font-black text-primary text-sm">{u.name?.charAt(0)}</div>
                        <div>
                          <p className="font-bold text-neutral text-sm">{u.name}</p>
                          <p className="text-neutral/40 text-[10px]">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase ${u.status === 'active' || u.status !== 'block' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>{u.status || "active"}</span>
                    </td>
                    <td className="px-8 py-6 text-neutral/40 font-bold text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        {/* Eye Icon Button */}
                        <button onClick={() => openDetails(u)} className="p-2.5 bg-base-200 text-neutral/40 hover:text-primary rounded-xl transition-all">
                          <Eye size={18} />
                        </button>
                        <button onClick={() => handleAction(u._id, activeUser)} disabled={u.status === "active"} className="p-2.5 bg-base-200 text-neutral/40 hover:text-success rounded-xl disabled:opacity-20"><UserCheck size={18} /></button>
                        <button onClick={() => handleAction(u._id, blockUser)} disabled={u.status === "block"} className="p-2.5 bg-base-200 text-neutral/40 hover:text-error rounded-xl disabled:opacity-20"><UserX size={18} /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* --- PAGINATION FOOTER --- */}
        <div className="p-8 bg-base-200/30 border-t border-base-300 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black text-neutral/30 uppercase tracking-widest">
            Showing {paginatedUsers.length} of {filteredUsers.length} users
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 bg-base-100 border border-base-300 rounded-xl disabled:opacity-30 hover:bg-primary hover:text-white transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-xl font-bold text-xs transition-all ${currentPage === i + 1 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-base-100 text-neutral/40 hover:bg-base-300'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 bg-base-100 border border-base-300 rounded-xl disabled:opacity-30 hover:bg-primary hover:text-white transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <UserDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default UserManagement;