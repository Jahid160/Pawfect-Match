"use client";
import React from 'react';
import { motion } from "framer-motion";
import { Edit3, Trash2, Trophy, ShieldAlert, Zap } from 'lucide-react';
import Swal from 'sweetalert2';

const ShelterInsight = ({ requests, setRequests }) => {
     // 1. Logic to find the Top Shelter (Basi pet add korse je)
     const topShelter = requests.length > 0
          ? [...requests].sort((a, b) => (b.petCount || 0) - (a.petCount || 0))[0]
          : null;

     // 2. Delete Moderation Logic
     const handleDelete = (id, shelterName) => {
          Swal.fire({
               title: `Delete ${shelterName}'s Entry?`,
               text: "Fake data ba vul thakle delete korte paren. Eta irreversible!",
               icon: "error",
               showCancelButton: true,
               confirmButtonColor: "#ef4444",
               cancelButtonColor: "#64748b",
               confirmButtonText: "Yes, Delete!",
               background: "#fff",
               color: "#1e293b"
          }).then((result) => {
               if (result.isConfirmed) {
                    // Backend API call ekhane hobe
                    setRequests(prev => prev.filter(req => req._id !== id));
                    Swal.fire("Deleted!", "Entry has been removed.", "success");
               }
          });
     };

     // 3. Edit Moderation Logic (Placeholder for now)
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
          <div className="space-y-8 py-6">
               {/* --- TOP CONTRIBUTOR CARD --- */}
               {topShelter && (
                    <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="relative overflow-hidden bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl border border-slate-700"
                    >
                         <div className="absolute top-0 right-0 p-10 opacity-10">
                              <Trophy size={150} />
                         </div>

                         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                              <div className="flex items-center gap-6">
                                   <div className="w-20 h-20 rounded-3xl bg-amber-500/20 flex items-center justify-center border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                                        <Trophy className="text-amber-500" size={40} />
                                   </div>
                                   <div>
                                        <div className="flex items-center gap-2 mb-1">
                                             <Zap size={14} className="text-amber-400 fill-amber-400" />
                                             <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.3em]">Top Performer</span>
                                        </div>
                                        <h2 className="text-3xl font-black tracking-tight">{topShelter.shelterName}</h2>
                                        <p className="text-slate-400 font-medium">Verified Shelter managed by <span className="text-white">{topShelter.fullName}</span></p>
                                   </div>
                              </div>

                              <div className="flex gap-4">
                                   <div className="bg-white/5 backdrop-blur-md border border-white/10 px-8 py-4 rounded-3xl text-center">
                                        <p className="text-4xl font-black text-white">{topShelter.petCount || 0}</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Pets</p>
                                   </div>
                              </div>
                         </div>
                    </motion.div>
               )}

               {/* --- MODERATION TABLE --- */}
               <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                              <div className="p-2 bg-rose-50 rounded-xl text-rose-500">
                                   <ShieldAlert size={20} />
                              </div>
                              <h3 className="font-black text-slate-800 tracking-tight">Post Moderation & Stats</h3>
                         </div>
                         <span className="badge badge-ghost font-bold text-slate-500">{requests.length} Shelters Listed</span>
                    </div>

                    <div className="overflow-x-auto">
                         <table className="table w-full border-separate border-spacing-0">
                              <thead>
                                   <tr className="bg-slate-50/50">
                                        <th className="py-4 pl-8 text-slate-500 font-black text-[11px] uppercase tracking-widest">Shelter Details</th>
                                        <th className="text-center text-slate-500 font-black text-[11px] uppercase tracking-widest">Total Pets</th>
                                        <th className="text-center text-slate-500 font-black text-[11px] uppercase tracking-widest">Last Activity</th>
                                        <th className="text-right pr-8 text-slate-500 font-black text-[11px] uppercase tracking-widest">Control</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                   {requests.map((request) => (
                                        <tr key={request._id} className="group hover:bg-slate-50/80 transition-all">
                                             <td className="py-5 pl-8">
                                                  <div className="flex flex-col">
                                                       <span className="font-black text-slate-800 group-hover:text-primary transition-colors">{request.shelterName}</span>
                                                       <span className="text-xs text-slate-400 font-semibold">{request.fullName}</span>
                                                  </div>
                                             </td>
                                             <td className="text-center">
                                                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 font-black text-slate-700">
                                                       {request.petCount || 0}
                                                  </div>
                                             </td>
                                             <td className="text-center text-sm font-bold text-slate-500">
                                                  {new Date(request.submittedAt).toLocaleDateString()}
                                             </td>
                                             <td className="text-right pr-8">
                                                  <div className="flex justify-end gap-2">
                                                       <button
                                                            onClick={() => handleEdit(request)}
                                                            className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all"
                                                            title="Edit Entry"
                                                       >
                                                            <Edit3 size={18} />
                                                       </button>
                                                       <button
                                                            onClick={() => handleDelete(request._id, request.shelterName)}
                                                            className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all"
                                                            title="Delete Fake Entry"
                                                       >
                                                            <Trash2 size={18} />
                                                       </button>
                                                  </div>
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               </div>
          </div>
     );
};

export default ShelterInsight;