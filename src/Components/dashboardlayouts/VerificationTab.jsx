"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Search, Filter, ChevronLeft, ChevronRight, ChevronDown, Check } from 'lucide-react';
import { BiUserCheck, BiUserX } from "react-icons/bi";
import { GrDocumentPdf } from "react-icons/gr";
import { MdAccessTime, MdCheckCircle, MdCancel, MdBlock } from "react-icons/md";
import { LuUserRoundCheck } from "react-icons/lu";
import { FaUserSlash } from "react-icons/fa";

const VerificationTab = () => {
     const [searchTerm, setSearchTerm] = useState("");
     const [statusFilter, setStatusFilter] = useState("All");
     const [isOpen, setIsOpen] = useState(false);

     // Sample data logic
     const requests = [
          { _id: "1", shelterName: "IDEAL Shelter", fullName: "Tanvir Hossain", status: "Pending", submittedAt: "2026-03-16" },
          { _id: "2", shelterName: "Paws Care", fullName: "Al Amin", status: "Approved", submittedAt: "2026-03-15" },
          { _id: "3", shelterName: "Darwins Care", fullName: "Al Amin", status: "Rejected", submittedAt: "2026-03-17" },
          { _id: "4", shelterName: "Xarwins Care", fullName: "Al Amin", status: "Suspended", submittedAt: "2026-03-17" },
          // aro data thakbe...
     ];

     const options = [
          { value: "All", label: "All Status", color: "bg-amber-500" },
          { value: "Pending", label: "Pending Requests", color: "bg-orange-500" },
          { value: "Approved", label: "Approved Shelters", color: "bg-emerald-500" },
          { value: "Rejected", label: "Rejected Applications", color: "bg-rose-500" },
          { value: "Suspended", label: "Suspended Shelters", color: "bg-slate-400" },
     ];

     return (
          <div className="space-y-6">
               {/* --- Search & Filter Bar --- */}
               <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-3xl border border-base-300 shadow-sm">
                    <div className="relative w-full md:w-96">
                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                         <input
                              type="text"
                              placeholder="Search by shelter or owner..."
                              className="input input-bordered w-full pl-12 rounded-2xl bg-base-200/50 border-none focus:ring-2 focus:ring-primary/20 transition-all"
                              onChange={(e) => setSearchTerm(e.target.value)}
                         />
                    </div>


                    <div className="relative w-full md:w-64">
                         {/* --- Trigger Button --- */}
                         <button
                              onClick={() => setIsOpen(!isOpen)}
                              className="flex items-center justify-between gap-3 w-full bg-white px-5 py-3.5 rounded-2xl border border-slate-200 hover:border-primary/50 shadow-sm transition-all active:scale-[0.98]"
                         >
                              <div className="flex items-center gap-2.5">
                                   <Filter size={18} className={isOpen ? "text-primary" : "text-slate-400"} />
                                   <span className="font-bold text-slate-700 text-sm">
                                        {options.find(opt => opt.value === statusFilter)?.label || "Filter Status"}
                                   </span>
                              </div>
                              <motion.div
                                   animate={{ rotate: isOpen ? 180 : 0 }}
                                   transition={{ duration: 0.3 }}
                              >
                                   <ChevronDown size={18} className="text-slate-400" />
                              </motion.div>
                         </button>

                         {/* --- Dropdown Card --- */}
                         <AnimatePresence>
                              {isOpen && (
                                   <>
                                        {/* Click outside to close */}
                                        <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

                                        <motion.div
                                             initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                             animate={{ opacity: 1, y: 5, scale: 1 }}
                                             exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                             transition={{ duration: 0.2, ease: "easeOut" }}
                                             className="absolute right-0 left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-20 overflow-hidden"
                                        >
                                             <div className="flex flex-col gap-1">
                                                  {options.map((option) => (
                                                       <button
                                                            key={option.value}
                                                            onClick={() => {
                                                                 setStatusFilter(option.value);
                                                                 setIsOpen(false);
                                                            }}
                                                            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${statusFilter === option.value
                                                                 ? "bg-primary/5 text-primary"
                                                                 : "hover:bg-slate-50 text-slate-600"
                                                                 }`}
                                                       >
                                                            <div className="flex items-center gap-3">
                                                                 <div className={`w-2 h-2 rounded-full ${option.color}`} />
                                                                 <span className="font-bold text-sm">{option.label}</span>
                                                            </div>
                                                            {statusFilter === option.value && (
                                                                 <Check size={16} className="text-primary" strokeWidth={3} />
                                                            )}
                                                       </button>
                                                  ))}
                                             </div>
                                        </motion.div>
                                   </>
                              )}
                         </AnimatePresence>
                    </div>
               </div>

               {/* --- Table Container --- */}
               <div className="bg-base-100 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-base-300 overflow-hidden">
                    <div className="overflow-x-auto">
                         <table className="table w-full border-separate border-spacing-y-2 px-4">
                              <thead>
                                   <tr className="text-slate-400 font-black uppercase text-[11px] tracking-widest border-none">
                                        <th className="bg-transparent">Shelter Name</th>
                                        <th className="bg-transparent">Owner</th>
                                        <th className="bg-transparent text-center">Documents</th>
                                        <th className="bg-transparent">Status</th>
                                        <th className="bg-transparent text-center">Action</th>
                                        <th className="bg-transparent text-center">Details</th>
                                   </tr>
                              </thead>
                              <tbody className="before:block before:h-2 cursor-pointer ">
                                   <AnimatePresence mode='popLayout'>
                                        {requests.map((request) => {
                                             // Deeper and more effective status-based styles
                                             const statusConfigs = {
                                                  Pending: {
                                                       row: "border-l-orange-500 bg-orange-50/40 hover:bg-orange-100/60 shadow-orange-100",
                                                       badge: "bg-orange-200 text-orange-800",
                                                       icon: <MdAccessTime size={14} className="animate-spin-slow" />
                                                  },
                                                  Approved: {
                                                       row: "border-l-emerald-500 bg-emerald-50/40 hover:bg-emerald-100/60 shadow-emerald-100",
                                                       badge: "bg-emerald-200 text-emerald-800",
                                                       icon: <MdCheckCircle size={14} />
                                                  },
                                                  Suspended: {
                                                       row: "border-l-slate-500 bg-slate-100/60 hover:bg-slate-200/60 shadow-slate-200 opacity-80",
                                                       badge: "bg-slate-300 text-slate-700",
                                                       icon: <MdBlock size={14} />
                                                  },
                                                  Rejected: {
                                                       row: "border-l-rose-500 bg-rose-50/30 hover:bg-rose-100/50 opacity-90 shadow-rose-100",
                                                       badge: "bg-rose-200 text-rose-800",
                                                       icon: <MdCancel size={14} />
                                                  }
                                             };

                                             const config = statusConfigs[request.status] || statusConfigs.Pending;


                                             return (
                                                  <motion.tr
                                                       key={request._id}
                                                       initial={{ opacity: 0, x: -10 }}
                                                       animate={{ opacity: 1, x: 0 }}
                                                       exit={{ opacity: 0, scale: 0.95 }}
                                                       className={`group transition-all duration-300 border border-base-200 border-l-8 rounded-2xl mb-4 ${config.row}`}
                                                  >
                                                       {/* Shelter Name & ID */}
                                                       <td className="rounded-l-none pl-6 py-5 ">
                                                            <p className="font-black text-slate-800 text-base group-hover:scale-[1.01] transition-transform origin-left group-hover:text-primary ">
                                                                 {request.shelterName}
                                                            </p>
                                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                                                                 Submitted: {request.submittedAt}
                                                            </p>
                                                       </td>

                                                       {/* Owner Info */}
                                                       <td className="font-bold text-slate-700 normal-case">
                                                            {request.fullName}
                                                       </td>

                                                       {/* Documents */}
                                                       <td className="text-center">
                                                            <button className="btn btn-circle btn-ghost btn-sm text-primary hover:bg-white hover:shadow-md transition-all">
                                                                 <GrDocumentPdf size={20} />
                                                            </button>
                                                       </td>

                                                       {/* Dynamic Status Badge */}
                                                       <td>
                                                            <div className={`badge badge-sm py-3.5 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest border-none shadow-md flex items-center gap-2 ${config.badge}`}>
                                                                 {config.icon}
                                                                 <span>{request.status}</span>
                                                            </div>
                                                       </td>


                                                       {/* Action Buttons with Toggle Logic */}
                                                       <td className="rounded-r-none">
                                                            <div className="flex justify-center items-center gap-3">

                                                                 {/* Active / Approve Button */}
                                                                 {request.status === 'Suspended' ? (
                                                                      <button
                                                                           className="group relative p-2.5 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-md active:scale-95"
                                                                           title="Re-activate Shelter"
                                                                           onClick={() => handleStatusUpdate(request._id, 'Approved')}
                                                                      >
                                                                           <LuUserRoundCheck size={22} className="transition-transform group-hover:scale-110" />
                                                                      </button>
                                                                 ) : (
                                                                      <button
                                                                           disabled={request.status === 'Rejected' || request.status === 'Approved'}
                                                                           className="group relative p-2.5 flex items-center justify-center rounded-xl
                                                                           cursor-pointer
                                                                           bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white disabled:bg-slate-100 disabled:text-slate-400 
                                                                           disabled:cursor-not-allowed
                                                                           transition-all duration-300 shadow-md active:scale-95"
                                                                           title="Approve"
                                                                           onClick={() => handleStatusUpdate(request._id, 'Approved')}
                                                                      >
                                                                           <BiUserCheck size={22} />
                                                                      </button>
                                                                 )}

                                                                 {/* Suspend / Reject Button */}
                                                                 {request.status === 'Approved' ? (
                                                                      <button
                                                                           className="group relative p-2.5 flex items-center justify-center rounded-xl
                                                                           cursor-pointer
                                                                           bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-md active:scale-95"
                                                                           title="Suspend Shelter"
                                                                           onClick={() => handleStatusUpdate(request._id, 'Suspended')}
                                                                      >
                                                                           <FaUserSlash size={20} className="transition-transform group-hover:scale-110" />
                                                                      </button>
                                                                 ) : (
                                                                      <button
                                                                           disabled={request.status === 'Rejected' || request.status === 'Suspended'}
                                                                           className="group relative p-2.5 flex items-center justify-center rounded-xl
                                                                           cursor-pointer
                                                                           bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white disabled:bg-slate-100 disabled:text-slate-400 
                                                                           disabled:cursor-not-allowed
                                                                           transition-all duration-300 shadow-md active:scale-95"
                                                                           title="Reject"
                                                                           onClick={() => handleStatusUpdate(request._id, 'Rejected')}
                                                                      >
                                                                           {
                                                                                request.status === 'Suspended' ? (
                                                                                     <FaUserSlash size={20} />
                                                                                ) : (
                                                                                     <BiUserX size={20} />
                                                                                )

                                                                           }
                                                                      </button>
                                                                 )}

                                                            </div>
                                                       </td>

                                                       {/* Details Eye Icon */}
                                                       <td className="rounded-r-2xl text-center pr-6">
                                                            <button className="btn btn-ghost btn-sm btn-circle text-slate-500 hover:text-primary hover:bg-white hover:shadow-md transition-all">
                                                                 <Eye size={22} />
                                                            </button>
                                                       </td>
                                                  </motion.tr>
                                             );
                                        })}
                                   </AnimatePresence>
                              </tbody>
                         </table>
                    </div>

                    {/* --- Pagination Footer --- */}
                    <div className="flex flex-col md:flex-row justify-between items-center px-8 py-6 bg-slate-50/50 border-t border-base-200 gap-4">
                         <p className="text-sm font-bold text-slate-400">
                              Showing <span className="text-slate-800 font-black">1-10</span> of <span className="text-slate-800 font-black">42</span> requests
                         </p>
                         <div className="flex items-center gap-2">
                              <button className="btn btn-sm btn-circle btn-ghost hover:bg-white shadow-sm border border-base-300">
                                   <ChevronLeft size={18} />
                              </button>
                              <div className="join bg-white shadow-sm border border-base-300 rounded-xl overflow-hidden">
                                   <button className="join-item btn btn-sm btn-ghost font-black px-4 bg-primary text-white hover:bg-primary">1</button>
                                   <button className="join-item btn btn-sm btn-ghost font-black px-4 hover:bg-base-200">2</button>
                                   <button className="join-item btn btn-sm btn-ghost font-black px-4 hover:bg-base-200">3</button>
                              </div>
                              <button className="btn btn-sm btn-circle btn-ghost hover:bg-white shadow-sm border border-base-300">
                                   <ChevronRight size={18} />
                              </button>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default VerificationTab;