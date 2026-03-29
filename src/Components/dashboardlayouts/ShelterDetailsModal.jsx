import React from 'react';
import { X, MapPin, Phone, Mail, Home, Users, Calendar, Heart, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { GrDocumentPdf } from 'react-icons/gr';
import Image from 'next/image';

const ShelterDetailsModal = ({ data, onClose }) => {
     if (!data) return null;

     return (
          <AnimatePresence>
               <div className="fixed inset-0 z-100 flex items-center justify-center p-2 md:p-4">
                    {/* Backdrop */}
                    <motion.div
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                         onClick={onClose}
                         className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                         initial={{ opacity: 0, scale: 0.9, y: 20 }}
                         animate={{ opacity: 1, scale: 1, y: 0 }}
                         exit={{ opacity: 0, scale: 0.9, y: 20 }}
                         className="relative w-full max-w-3xl bg-base-100 rounded-3xl md:rounded-4xl shadow-2xl overflow-hidden border border-base-300 max-h-[95vh] flex flex-col"
                    >
                         {/* Header */}
                         <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-4 md:px-8 py-4 border-b border-base-200 flex justify-between items-center">
                              <div className="min-w-0 flex-1">
                                   <h2 className="text-xl md:text-2xl font-black text-slate-800 flex flex-wrap items-center gap-2 truncate">
                                        {data.shelterName}
                                        <span className="badge badge-primary badge-outline text-[9px] md:text-[10px] uppercase font-bold tracking-widest px-2 py-0 h-auto">
                                             {data.status}
                                        </span>
                                   </h2>
                                   <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase">ID: {data._id.slice(-8).toUpperCase()}</p>
                              </div>
                              <button onClick={onClose} className="btn btn-circle btn-sm btn-ghost hover:bg-rose-50 hover:text-rose-500 shrink-0 ml-2">
                                   <X size={18} />
                              </button>
                         </div>

                         {/* Scrollable Body */}
                         <div className="p-4 md:p-8 space-y-6 md:space-y-8 overflow-y-auto custom-scrollbar">

                              {/* Info Grid */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                   {/* Owner Info */}
                                   <section className="space-y-3">
                                        <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                             <ShieldCheck size={14} /> Owner Details
                                        </h3>
                                        <div className="space-y-3 bg-base-200/50 p-4 md:p-5 rounded-2xl md:rounded-3xl">
                                             {/* Name */}
                                             <div className="flex items-start gap-3">
                                                  <div className="w-8 h-8 shrink-0 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm"><Users size={16} /></div>
                                                  <div className="min-w-0"><p className="text-[9px] text-slate-400 font-bold uppercase">Full Name</p><p className="font-bold text-slate-700 text-sm md:text-base truncate">{data.fullName}</p></div>
                                             </div>
                                             {/* Email - Fixed Responsive */}
                                             <div className="flex items-start gap-3">
                                                  {/* Icon Container - shrink-0 ensures icon doesn't get squashed */}
                                                  <div className="w-8 h-8 shrink-0 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                                                       <Mail size={16} />
                                                  </div>

                                                  {/* Content Container - min-w-0 is crucial for flex children to allow shrinking */}
                                                  <div className="min-w-0 flex-1">
                                                       <p className="text-[9px] text-slate-400 font-bold uppercase">Email</p>
                                                       <p className="font-bold text-slate-700 text-sm md:text-base wrap-break-word">
                                                            {data.email}
                                                       </p>
                                                  </div>
                                             </div>
                                             {/* Phone */}
                                             <div className="flex items-start gap-3">
                                                  <div className="w-8 h-8 shrink-0 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm"><Phone size={16} /></div>
                                                  <div className="min-w-0"><p className="text-[9px] text-slate-400 font-bold uppercase">Phone</p><p className="font-bold text-slate-700 text-sm md:text-base">{data.phone}</p></div>
                                             </div>
                                        </div>
                                   </section>

                                   {/* Shelter Metrics */}
                                   <section className="space-y-3">
                                        <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                             <Home size={14} /> Shelter Info
                                        </h3>
                                        <div className="grid grid-cols-2 gap-3">
                                             <div className="bg-primary/5 border border-primary/10 p-3 md:p-4 rounded-2xl md:rounded-3xl text-center">
                                                  <p className="text-xl md:text-2xl font-black text-primary">{data.capacity}</p>
                                                  <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase leading-none mt-1">Capacity</p>
                                             </div>
                                             <div className="bg-emerald-50 border border-emerald-100 p-3 md:p-4 rounded-2xl md:rounded-3xl text-center">
                                                  <p className="text-xs md:text-sm font-black text-emerald-600 truncate px-1">{data.shelterType}</p>
                                                  <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase leading-none mt-1">Type</p>
                                             </div>
                                             <div className="col-span-2 bg-base-200/50 p-3 md:p-4 rounded-2xl md:rounded-3xl flex items-center gap-3">
                                                  <Calendar size={18} className="text-slate-400 shrink-0" />
                                                  <div className="min-w-0"><p className="text-[9px] text-slate-400 font-bold uppercase">Since</p><p className="font-bold text-slate-700 text-sm">{new Date(data.operatingSince).toLocaleDateString()}</p></div>
                                             </div>
                                        </div>
                                   </section>
                              </div>

                              {/* Location & Motivation */}
                              <div className="space-y-4">
                                   <div className="p-4 md:p-6 bg-slate-50 rounded-2xl md:rounded-4xl border border-slate-100 flex gap-3 md:gap-4">
                                        <MapPin className="text-primary shrink-0" size={20} md={24} />
                                        <div className="min-w-0">
                                             <h4 className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 mb-1">Shelter Location</h4>
                                             <p className="font-bold text-slate-700 text-sm md:text-base leading-snug">{data.shelterAddress}, {data.shelterCity}</p>
                                        </div>
                                   </div>

                                   <div className="p-4 md:p-6 bg-base-200/40 rounded-2xl md:rounded-4xl border border-dashed border-base-300">
                                        <h4 className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 mb-2 flex items-center gap-2"><Heart size={14} /> Motivation</h4>
                                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed italic">"{data.motivation}"</p>
                                   </div>
                              </div>

                              {/* Photos & Document - Fixed for Mobile */}
                              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
                                   <div className="space-y-2">
                                        <p className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 pl-2">Shelter Photo</p>
                                        <div className="relative aspect-video sm:aspect-square w-full">
                                             <Image
                                                  fill
                                                  src={data.shelterPhoto}
                                                  alt="Shelter"
                                                  className="object-cover rounded-2xl md:rounded-3xl border-4 border-white shadow-lg"
                                             />
                                        </div>
                                   </div>

                                   <div className="flex flex-col justify-between gap-4 mt-2 sm:mt-0">
                                        <div className="space-y-2">
                                             <p className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 pl-2">Documentation</p>
                                             <a href={data.registrationCert} target="_blank" rel="noopener noreferrer"
                                                  className="btn btn-primary rounded-xl md:rounded-2xl w-full flex items-center justify-center gap-2 shadow-lg shadow-primary/20 text-xs md:text-sm py-3 md:py-4 h-auto min-h-0">
                                                  <GrDocumentPdf size={18} /> View Registration PDF
                                             </a>
                                        </div>
                                        <div className="p-3 md:p-4 bg-white rounded-xl md:rounded-2xl border border-base-300 text-center">
                                             <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase">Vet Contact</p>
                                             <p className="font-black text-primary text-sm md:text-base">{data.hasVetContact}</p>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </motion.div>
               </div>
          </AnimatePresence>
     );
};

export default ShelterDetailsModal;