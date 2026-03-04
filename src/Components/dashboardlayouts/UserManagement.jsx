"use client";

import React from 'react';
import { motion } from "framer-motion";
import { 
  Users, 
  UserPlus, 
  Search, 
  ShieldCheck, 
  MoreVertical, 
  Mail, 
  Filter,
  UserX,
  UserCheck
} from 'lucide-react';

const UserManagement = () => {
  const users = [
    { id: 1, name: "Arif Ahmed", email: "arif@example.com", role: "Admin", status: "Active", joined: "12 Jan 2026" },
    { id: 2, name: "Sumaiya Jahan", email: "sumi@example.com", role: "Moderator", status: "Active", joined: "05 Feb 2026" },
    { id: 3, name: "Rakib Hasan", email: "rakib@example.com", role: "User", status: "Inactive", joined: "20 Feb 2026" },
    { id: 4, name: "Nusrat Fari", email: "fari@example.com", role: "User", status: "Active", joined: "01 Mar 2026" },
  ];

  return (
    <div className="bg-[#F8FAFC] p-6 lg:p-10 min-h-screen font-sans text-slate-900">
      
      {/* --- HEADER --- */}
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="flex items-center gap-3 font-black text-slate-900 text-4xl tracking-tight">
            User <span className="text-orange-500 decoration-8 decoration-orange-100 underline underline-offset-[-2px]">Directory</span>
          </h1>
          <p className="mt-2 font-medium text-slate-500">Manage your community, assign roles, and monitor user activity.</p>
        </div>
        
        <button className="group flex justify-center items-center gap-2 bg-slate-900 hover:bg-orange-500 shadow-lg shadow-slate-200 px-8 py-4 rounded-2xl font-black text-white transition-all">
          <UserPlus size={20} className="group-hover:scale-110 transition-transform" />
          Add New User
        </button>
      </div>

      {/* --- FILTERS & SEARCH --- */}
      <div className="flex md:flex-row flex-col gap-4 mb-8">
        <div className="relative flex-1 max-w-lg">
          <Search className="top-1/2 left-4 absolute text-slate-400 -translate-y-1/2" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email or role..." 
            className="bg-white shadow-sm py-3.5 pr-4 pl-12 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 w-full font-medium text-sm transition-all" 
          />
        </div>
        <button className="flex items-center gap-2 bg-white hover:bg-slate-50 px-6 py-3.5 border border-slate-200 rounded-2xl font-bold text-slate-600 text-sm transition-all">
          <Filter size={18} /> Filters
        </button>
      </div>

      {/* --- USER TABLE --- */}
      <div className="bg-white shadow-sm border border-slate-100 rounded-[3rem] overflow-hidden">
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-slate-50 border-b font-black text-[10px] text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-5">User Profile</th>
                <th className="px-6 py-5">Role</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Joined Date</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((user, i) => (
                <motion.tr 
                  key={user.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group hover:bg-slate-50 transition-all"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex justify-center items-center bg-orange-100 shadow-sm rounded-2xl w-12 h-12 font-bold text-orange-600 text-lg">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="mb-1 font-bold text-slate-800 text-sm leading-none">{user.name}</p>
                        <p className="flex items-center gap-1 font-medium text-slate-400 text-xs">
                          <Mail size={12} /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} className={user.role === 'Admin' ? 'text-orange-500' : 'text-slate-300'} />
                      <span className="font-bold text-slate-600 text-sm">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase flex items-center w-fit gap-1.5 ${
                      user.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-medium text-slate-400 text-sm">{user.joined}</td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2">
                       <button title="Approve/Active" className="hover:bg-emerald-50 p-2 rounded-xl text-slate-400 hover:text-emerald-600 transition-all">
                          <UserCheck size={18} />
                       </button>
                       <button title="Suspend/Block" className="hover:bg-rose-50 p-2 rounded-xl text-slate-400 hover:text-rose-600 transition-all">
                          <UserX size={18} />
                       </button>
                       <button className="hover:bg-white hover:shadow-md p-2 rounded-xl text-slate-400 transition-all">
                          <MoreVertical size={18} />
                       </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="flex justify-between items-center bg-slate-50/50 p-6 border-slate-100 border-t font-bold text-slate-400 text-xs">
           <p>Showing 4 of 1,240 Users</p>
           <div className="flex gap-2">
              <button className="bg-white hover:bg-white px-4 py-2 border border-slate-200 rounded-lg transition-all">Prev</button>
              <button className="bg-slate-900 hover:bg-orange-500 px-4 py-2 rounded-lg text-white transition-all">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;