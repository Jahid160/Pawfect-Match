"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, Trash2, Trophy, Zap, Search, ChevronLeft, ChevronRight, ArrowUpDown, Inbox, SearchX } from 'lucide-react';
import Swal from 'sweetalert2';

// --- 1. Move EmptyState OUTSIDE the main component ---
const EmptyState = ({ icon: Icon, title, description }) => (
     <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-4xl border-2 border-dashed border-slate-100"
     >
          <div className="p-6 bg-slate-50 rounded-full mb-4">
               <Icon size={48} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-black text-slate-800 mb-2">{title}</h3>
          <p className="text-slate-400 max-w-xs mx-auto text-sm font-medium">{description}</p>
     </motion.div>
);

const ShelterInsight = ({ totalItems, requests = [], setRequests, currentPage, setCurrentPage, startIndex, endIndex, totalPages, searchTerm, setSearchTerm }) => {
     const [sortOrder, setSortOrder] = useState('desc');

     // ... (All your existing logic: filteredAndSortedData, topShelter, handleDelete, handleEdit)
     const sortedData = useMemo(() => {
          return [...requests].sort((a, b) => {
               return sortOrder === 'desc'
                    ? (b.petCount || 0) - (a.petCount || 0)
                    : (a.petCount || 0) - (b.petCount || 0);
          });
     }, [requests, sortOrder]);



     const topShelter = requests.length > 0
          ? [...requests].sort((a, b) => (b.petCount || 0) - (a.petCount || 0))[0]
          : null;

     const handleDelete = (id, name) => {
          Swal.fire({
               title: `Remove ${name}?`,
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#ef4444",
               confirmButtonText: "Yes, Delete"
          }).then((result) => {
               if (result.isConfirmed) {
                    setRequests(prev => prev.filter(req => req._id !== id));
               }
          });
     };

     const handleEdit = (request) => {
          Swal.fire({
               title: 'Edit Shelter Stats',
               input: 'number',
               inputValue: request.petCount || 0,
               inputLabel: `Update pet count for ${request.shelterName}`,
               showCancelButton: true,
               confirmButtonText: 'Update',
               confirmButtonColor: '#fa6e1d',
          }).then((result) => {
               if (result.isConfirmed) {
                    setRequests(prev => prev.map(req =>
                         req._id === request._id ? { ...req, petCount: parseInt(result.value) } : req
                    ));
               }
          });
     };

     return (
          <div className="space-y-6 py-4 px-2 md:px-0">
               {/* Top Card Section */}
               <AnimatePresence>
                    {topShelter && (
                         <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="relative overflow-hidden bg-slate-900 rounded-4xl p-6 md:p-10 text-white shadow-xl border border-slate-700"
                         >
                              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                                   <div className="flex items-center gap-4 md:gap-6">
                                        <div className="p-4 bg-amber-500/20 rounded-2xl border border-amber-500/30">
                                             <Trophy className="text-amber-500 w-8 h-8 md:w-10 md:h-10" />
                                        </div>
                                        <div>
                                             <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                                                  <Zap size={12} className="fill-current" /> MVP Shelter
                                             </span>
                                             <h2 className="text-2xl md:text-3xl font-black italic">{topShelter.shelterName}</h2>
                                             <p className="text-slate-400 text-sm italic">Lead: {topShelter.fullName}</p>
                                        </div>
                                   </div>
                                   <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 text-center w-full md:w-auto">
                                        <p className="text-3xl font-black leading-none">{topShelter.petCount || 0}</p>
                                        <p className="text-[10px] uppercase font-bold text-slate-500 mt-1">Total Impact</p>
                                   </div>
                              </div>
                         </motion.div>
                    )}
               </AnimatePresence>

               {/* Controls Section */}
               <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="relative w-full md:w-96">
                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                         <input
                              type="text"
                              placeholder="Search shelter or owner..."
                              className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500/20 text-sm font-medium outline-none"
                              value={searchTerm}
                              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                         />
                    </div>

                    <button
                         onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                         className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all w-full md:w-auto justify-center"
                    >
                         <ArrowUpDown size={16} />
                         {sortOrder === 'desc' ? "Sort: High to Low" : "Sort: Low to High"}
                    </button>
               </div>

               {/* --- Data Display --- */}
               {requests.length === 0 ? (
                    <EmptyState
                         icon={Inbox}
                         title="No Data Found"
                         description="No shelter requests have been submitted yet."
                    />
               ) : sortedData.length === 0 ? (
                    <EmptyState
                         icon={SearchX}
                         title="No Match Found"
                         description={`"${searchTerm}" does not match any shelter or owner.`}
                    />
               ) : (
                    <div className="bg-white rounded-4xl border border-slate-200 shadow-sm overflow-hidden">
                         <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                   <thead>
                                        <tr className="bg-slate-50/50 border-b border-slate-100">
                                             <th className="p-6 text-[11px] font-black uppercase text-slate-400 tracking-wider">Shelter Information</th>
                                             <th className="p-6 text-[11px] font-black uppercase text-center text-slate-400 tracking-wider">Stats</th>
                                             <th className="p-6 text-[11px] font-black uppercase text-right text-slate-400 tracking-wider">Actions</th>
                                        </tr>
                                   </thead>
                                   <tbody className="divide-y divide-slate-50">
                                        <AnimatePresence mode='popLayout'>
                                             {sortedData.map((item) => (
                                                  <motion.tr
                                                       key={item._id}
                                                       layout
                                                       initial={{ opacity: 0 }}
                                                       animate={{ opacity: 1 }}
                                                       exit={{ opacity: 0, x: 20 }}
                                                       className="group hover:bg-slate-50/50 transition-colors"
                                                  >
                                                       <td className="p-6">
                                                            <div className="flex flex-col">
                                                                 <span className="font-bold text-slate-800">{item.shelterName}</span>
                                                                 <span className="text-xs text-slate-400">{item.fullName}</span>
                                                            </div>
                                                       </td>
                                                       <td className="p-6 text-center">
                                                            <span className="px-4 py-1 bg-slate-100 rounded-lg font-black text-sm text-slate-600">
                                                                 {item.petCount || 0} Pets
                                                            </span>
                                                       </td>
                                                       <td className="p-6 text-right">
                                                            <div className="flex justify-end gap-2">
                                                                 <button onClick={() => handleEdit(item)} className="p-2.5 text-slate-400 hover:text-blue-600 rounded-xl transition-all border border-slate-100 hover:border-blue-100">
                                                                      <Edit3 size={18} />
                                                                 </button>
                                                                 <button
                                                                      onClick={() => handleDelete(item._id, item.shelterName)}
                                                                      className="p-2.5 text-slate-400 hover:text-red-600 rounded-xl transition-all border border-slate-100 hover:border-red-100"
                                                                 >
                                                                      <Trash2 size={18} />
                                                                 </button>
                                                            </div>
                                                       </td>
                                                  </motion.tr>
                                             ))}
                                        </AnimatePresence>
                                   </tbody>
                              </table>
                         </div>

                         {/* Pagination */}
                         {totalItems > 1 && (
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
               )}
          </div>
     );
};

export default ShelterInsight;