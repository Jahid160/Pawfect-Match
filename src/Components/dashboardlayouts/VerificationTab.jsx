"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Search, Filter, ChevronLeft, ChevronRight, ChevronDown, Check, Inbox } from 'lucide-react';
import { BiUserCheck, BiUserX } from "react-icons/bi";
import { GrDocumentPdf } from "react-icons/gr";
import { MdAccessTime, MdCheckCircle, MdCancel, MdBlock } from "react-icons/md";
import { LuUserRoundCheck } from "react-icons/lu";
import { FaUserSlash } from "react-icons/fa";
import { updateShelterStatus } from '@/action/server/Shelteruser';
import Swal from 'sweetalert2';
import ShelterDetailsModal from './ShelterDetailsModal';

const VerificationTab = ({ totalItems, requests = [], setRequests, currentPage, setCurrentPage, startIndex, endIndex, totalPages, statusFilter, setStatusFilter, setSearchTerm }) => {
     const [selectedRequest, setSelectedRequest] = useState(null);
     const [isOpen, setIsOpen] = useState(false);


     const options = [
          { value: "All", label: "All Status", color: "bg-amber-500" },
          { value: "Pending", label: "Pending Requests", color: "bg-orange-500" },
          { value: "Approved", label: "Approved Shelters", color: "bg-emerald-500" },
          { value: "Rejected", label: "Rejected Applications", color: "bg-rose-500" },
          { value: "Suspended", label: "Suspended Shelters", color: "bg-slate-400" },
     ];

     const handleStatusUpdate = async (id, newStatus) => {
          Swal.fire({
               title: "Are you sure?",
               text: `You are about to change the status to ${newStatus}.`,
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#fa6e1d",
               cancelButtonColor: "#f94144",
               confirmButtonText: "Yes, confirm!",
               cancelButtonText: "Cancel",
               background: "#ffffff",
               color: "#404040",
          }).then(async (result) => {
               if (result.isConfirmed) {
                    try {
                         const response = await updateShelterStatus(id, newStatus);
                         if (response.success) {
                              setRequests((prev) =>
                                   prev.map((req) => (req._id === id ? { ...req, status: newStatus } : req))
                              );
                              Swal.fire({
                                   title: "Success!",
                                   text: "Status updated successfully.",
                                   icon: "success",
                                   confirmButtonColor: "#fa6e1d",
                                   timer: 1500,
                                   showConfirmButton: false
                              });
                         } else {
                              Swal.fire({
                                   title: "Failed!",
                                   text: response.message,
                                   icon: "error",
                                   confirmButtonColor: "#fa6e1d"
                              });
                         }
                    } catch (error) {
                         Swal.fire("Error!", "Something went wrong.", "error");
                    }
               }
          });
     };

     // Responsive Filter logic (optional based on your requirement)
     const filteredRequests = requests.filter(req => {
          const matchesStatus = statusFilter === "All" || req.status === statusFilter;
          return matchesStatus;
     });

     return (
          <>
               {
                    requests.length === 0 ? (

                         <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex flex-col items-center justify-center py-20 px-6 text-center"
                         >
                              <div className="relative mb-6">
                                   <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
                                   <div className="relative bg-white p-6 rounded-full shadow-xl border border-slate-100">
                                        <Inbox size={64} className="text-slate-300" strokeWidth={1} />
                                   </div>
                              </div>
                              <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-2">No Requests Found</h3>
                              <p className="text-slate-500 max-w-sm font-medium text-sm md:text-base">
                                   We could not find any shelter verification requests matching your current filters or search.
                              </p>
                         </motion.div>
                    ) : (

                         <div className="space-y-6 px-2 md:px-0">
                              {selectedRequest && (
                                   <ShelterDetailsModal
                                        data={selectedRequest}
                                        onClose={() => setSelectedRequest(null)}
                                   />
                              )}

                              {/* --- Search & Filter Bar --- */}
                              <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-3xl border border-base-300 shadow-sm">
                                   <div className="relative w-full md:w-96">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                             type="text"
                                             placeholder="Search by shelter or owner..."
                                             className="input input-bordered w-full pl-12 rounded-2xl bg-base-200/50 border-none focus:ring-2 focus:ring-primary/20 transition-all text-sm md:text-base"
                                             onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                        />
                                   </div>

                                   <div className="relative w-full md:w-64">
                                        <button
                                             onClick={() => setIsOpen(!isOpen)}
                                             className="flex items-center justify-between gap-3 w-full bg-white px-5 py-3.5 rounded-2xl border border-slate-200 hover:border-primary/50 shadow-sm transition-all active:scale-[0.98]"
                                        >
                                             <div className="flex items-center gap-2.5">
                                                  <Filter size={18} className={isOpen ? "text-primary" : "text-slate-400"} />
                                                  <span className="font-bold text-slate-700 text-xs md:text-sm">
                                                       {options.find(opt => opt.value === statusFilter)?.label || "Filter Status"}
                                                  </span>
                                             </div>
                                             <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                                                  <ChevronDown size={18} className="text-slate-400" />
                                             </motion.div>
                                        </button>

                                        <AnimatePresence>
                                             {isOpen && (
                                                  <>
                                                       <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                                                       <motion.div
                                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 5, scale: 1 }}
                                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                            className="absolute right-0 left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-20 overflow-hidden"
                                                       >
                                                            <div className="flex flex-col gap-1">
                                                                 {options.map((option) => (
                                                                      <button
                                                                           key={option.value}
                                                                           onClick={() => {
                                                                                setStatusFilter(option.value);
                                                                                setCurrentPage(1)
                                                                                setIsOpen(false);
                                                                           }}
                                                                           className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${statusFilter === option.value ? "bg-primary/5 text-primary" : "hover:bg-slate-50 text-slate-600"}`}
                                                                      >
                                                                           <div className="flex items-center gap-3">
                                                                                <div className={`w-2 h-2 rounded-full ${option.color}`} />
                                                                                <span className="font-bold text-sm">{option.label}</span>
                                                                           </div>
                                                                           {statusFilter === option.value && <Check size={16} className="text-primary" strokeWidth={3} />}
                                                                      </button>
                                                                 ))}
                                                            </div>
                                                       </motion.div>
                                                  </>
                                             )}
                                        </AnimatePresence>
                                   </div>
                              </div>

                              {/* --- Table / Data Container --- */}
                              <div className="bg-base-100 rounded-4xl md:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-base-300 overflow-hidden">
                                   <div className="overflow-x-auto min-h-75">
                                        {filteredRequests.length > 0 ? (
                                             <table className="table w-full border-separate border-spacing-y-2 px-2 md:px-4">
                                                  <thead>
                                                       <tr className="text-slate-400 font-black uppercase text-[10px] md:text-[11px] tracking-widest border-none">
                                                            <th className="bg-transparent">Shelter Name</th>
                                                            <th className="bg-transparent hidden sm:table-cell">Owner</th>
                                                            <th className="bg-transparent text-center">Docs</th>
                                                            <th className="bg-transparent">Status</th>
                                                            <th className="bg-transparent text-center">Action</th>
                                                            <th className="bg-transparent text-center">Details</th>
                                                       </tr>
                                                  </thead>
                                                  <tbody className="before:block before:h-2 cursor-pointer ">
                                                       <AnimatePresence mode='popLayout'>
                                                            {filteredRequests.map((request) => {
                                                                 const statusConfigs = {
                                                                      Pending: { row: "border-l-orange-500 bg-orange-50/40 hover:bg-orange-100/60", badge: "bg-orange-200 text-orange-800", icon: <MdAccessTime size={14} className="animate-pulse" /> },
                                                                      Approved: { row: "border-l-emerald-500 bg-emerald-50/40 hover:bg-emerald-100/60", badge: "bg-emerald-200 text-emerald-800", icon: <MdCheckCircle size={14} /> },
                                                                      Suspended: { row: "border-l-slate-500 bg-slate-100/60 hover:bg-slate-200/60 opacity-80", badge: "bg-slate-300 text-slate-700", icon: <MdBlock size={14} /> },
                                                                      Rejected: { row: "border-l-rose-500 bg-rose-50/30 hover:bg-rose-100/50 opacity-90", badge: "bg-rose-200 text-rose-800", icon: <MdCancel size={14} /> }
                                                                 };
                                                                 const config = statusConfigs[request.status] || statusConfigs.Pending;

                                                                 return (
                                                                      <motion.tr
                                                                           key={request._id}
                                                                           initial={{ opacity: 0, x: -10 }}
                                                                           animate={{ opacity: 1, x: 0 }}
                                                                           exit={{ opacity: 0, scale: 0.95 }}
                                                                           className={`group transition-all duration-300 border-l-4 md:border-l-8 rounded-2xl mb-4 ${config.row}`}
                                                                      >
                                                                           <td className="rounded-l-none pl-4 md:pl-6 py-4">
                                                                                <p className="font-black text-slate-800 text-sm md:text-base group-hover:text-primary transition-colors">{request.shelterName}</p>
                                                                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">
                                                                                     {new Date(request.submittedAt).toLocaleDateString()}
                                                                                </p>
                                                                                {/* Mobile Only Owner Name */}
                                                                                <p className="sm:hidden text-xs text-slate-600 mt-1 font-semibold">{request.fullName}</p>
                                                                           </td>
                                                                           <td className="font-bold text-slate-700 normal-case hidden sm:table-cell">{request.fullName}</td>
                                                                           <td className="text-center">
                                                                                <a href={request.nidPdf} target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-ghost btn-xs md:btn-sm text-primary">
                                                                                     <GrDocumentPdf size={18} />
                                                                                </a>
                                                                           </td>
                                                                           <td>
                                                                                <div className={`badge badge-xs md:badge-sm py-3 px-2 md:px-4 rounded-xl font-black text-[9px] uppercase tracking-widest border-none shadow-sm flex items-center gap-1.5 ${config.badge}`}>
                                                                                     {config.icon}
                                                                                     <span className="hidden xs:inline">{request.status}</span>
                                                                                </div>
                                                                           </td>
                                                                           <td className="">
                                                                                <div className="flex justify-center items-center gap-1 md:gap-3">
                                                                                     {request.status === 'Suspended' ? (
                                                                                          <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white transition-all" onClick={() => handleStatusUpdate(request._id, 'Active')}>
                                                                                               <LuUserRoundCheck size={18} />
                                                                                          </button>
                                                                                     ) : (
                                                                                          <button disabled={request.status === 'Rejected' || request.status === 'Approved'} className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white disabled:bg-slate-100 disabled:text-slate-400" onClick={() => handleStatusUpdate(request._id, 'Active')}>
                                                                                               <BiUserCheck size={18} />
                                                                                          </button>
                                                                                     )}
                                                                                     {request.status === 'Approved' ? (
                                                                                          <button className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white transition-all" onClick={() => handleStatusUpdate(request._id, 'Suspended')}>
                                                                                               <FaUserSlash size={16} />
                                                                                          </button>
                                                                                     ) : (
                                                                                          <button disabled={request.status === 'Rejected' || request.status === 'Suspended'} className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white disabled:bg-slate-100 disabled:text-slate-400" onClick={() => handleStatusUpdate(request._id, 'Rejected')}>
                                                                                               {request.status === 'Suspended' ? <FaUserSlash size={16} /> : <BiUserX size={18} />}
                                                                                          </button>
                                                                                     )}
                                                                                </div>
                                                                           </td>
                                                                           <td className="rounded-r-2xl text-center pr-4">
                                                                                <button onClick={() => setSelectedRequest(request)} className="btn btn-ghost btn-xs md:btn-sm btn-circle text-slate-500 hover:text-primary transition-all">
                                                                                     <Eye size={20} />
                                                                                </button>
                                                                           </td>
                                                                      </motion.tr>
                                                                 );
                                                            })}
                                                       </AnimatePresence>
                                                  </tbody>
                                             </table>
                                        ) : (
                                             /* --- Professional Empty State --- */
                                             <motion.div
                                                  initial={{ opacity: 0, y: 20 }}
                                                  animate={{ opacity: 1, y: 0 }}
                                                  className="flex flex-col items-center justify-center py-20 px-6 text-center"
                                             >
                                                  <div className="relative mb-6">
                                                       <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
                                                       <div className="relative bg-white p-6 rounded-full shadow-xl border border-slate-100">
                                                            <Inbox size={64} className="text-slate-300" strokeWidth={1} />
                                                       </div>
                                                  </div>
                                                  <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-2">No Requests Found</h3>
                                                  <p className="text-slate-500 max-w-sm font-medium text-sm md:text-base">
                                                       We could not find any shelter verification requests matching your current filters or search.
                                                  </p>
                                                  <button
                                                       onClick={() => { setSearchTerm(""); setStatusFilter("All"); }}
                                                       className="mt-8 btn btn-primary px-8 rounded-2xl text-white font-bold normal-case shadow-lg shadow-primary/30"
                                                  >
                                                       Clear All Filters
                                                  </button>
                                             </motion.div>
                                        )}
                                   </div>

                                   {/* --- Pagination Footer --- */}
                                   {totalItems > 0 && (
                                        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-6 bg-white/50 backdrop-blur-sm border-t border-base-200 gap-4 rounded-b-3xl">
                                             {/* Info Text */}
                                             <div className="flex flex-col items-center md:items-start">
                                                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                                       Showing <span className="text-primary font-black">{startIndex}-{endIndex}</span> of <span className="text-slate-800 font-black">{totalItems}</span> requests
                                                  </p>
                                             </div>

                                             {/* Controls */}
                                             <div className="flex items-center gap-3">
                                                  {/* Previous Button */}
                                                  <button
                                                       onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                       disabled={currentPage === 1}
                                                       className="btn btn-sm btn-circle bg-white border-base-300 hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-40 shadow-sm"
                                                  >
                                                       <ChevronLeft size={18} />
                                                  </button>

                                                  {/* Page Numbers */}
                                                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-base-200">
                                                       {[...Array(totalPages)].map((_, index) => {
                                                            const pageNum = index + 1;
                                                            return (
                                                                 <button
                                                                      key={pageNum}
                                                                      onClick={() => setCurrentPage(pageNum)}
                                                                      className={`btn btn-sm min-w-10 border-none rounded-xl transition-all duration-300 ${currentPage === pageNum
                                                                           ? 'bg-primary text-white shadow-md shadow-primary/30'
                                                                           : 'bg-transparent text-slate-500 hover:bg-white'
                                                                           }`}
                                                                 >
                                                                      {pageNum}
                                                                 </button>
                                                            );
                                                       })}
                                                  </div>

                                                  {/* Next Button */}
                                                  <button
                                                       onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                       disabled={currentPage === totalPages}
                                                       className="btn btn-sm btn-circle bg-white border-base-300 hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-40 shadow-sm"
                                                  >
                                                       <ChevronRight size={18} />
                                                  </button>
                                             </div>
                                        </div>
                                   )}
                              </div>
                         </div>)
               }
          </>
     );
};

export default VerificationTab;