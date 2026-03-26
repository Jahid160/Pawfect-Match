import React from 'react';

import { X, MapPin, Phone, Mail, Home, Users, Calendar, Heart, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { GrDocumentPdf } from 'react-icons/gr';
import Image from 'next/image'


const ShelterDetailsModal = ({ data, onClose }) => {
     if (!data) return null;

     return (
          <AnimatePresence>
               <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    {/* Backdrop with Blur */}
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
                         className="relative w-full max-w-3xl bg-base-100 rounded-4xl shadow-2xl overflow-hidden border border-base-300 max-h-[90vh] overflow-y-auto"
                    >
                         {/* Header */}
                         <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-8 py-5 border-b border-base-200 flex justify-between items-center">
                              <div>
                                   <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                                        {data.shelterName}
                                        <span className="badge badge-primary badge-outline text-[10px] uppercase font-bold tracking-widest px-3">
                                             {data.status}
                                        </span>
                                   </h2>
                                   <p className="text-xs text-slate-500 font-bold">Application ID: {data._id.slice(-8).toUpperCase()}</p>
                              </div>
                              <button onClick={onClose} className="btn btn-circle btn-sm btn-ghost hover:bg-rose-50 hover:text-rose-500">
                                   <X size={20} />
                              </button>
                         </div>

                         <div className="p-8 space-y-8">
                              {/* Grid Sections */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                   {/* Owner Info */}
                                   <section className="space-y-4">
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                             <ShieldCheck size={14} /> Owner Details
                                        </h3>
                                        <div className="space-y-3 bg-base-200/50 p-5 rounded-3xl">
                                             <div className="flex items-center gap-3">
                                                  <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm"><Users size={16} /></div>
                                                  <div><p className="text-[10px] text-slate-400 font-bold uppercase">Full Name</p><p className="font-bold text-slate-700">{data.fullName}</p></div>
                                             </div>
                                             <div className="flex items-center gap-3">
                                                  <div className="w-8 h-8 rounded-xl  bg-white flex items-center justify-center text-primary shadow-sm"><Mail size={16} /></div>
                                                  <div><p className="text-[10px] text-slate-400 font-bold uppercase">Email</p><p className="font-bold text-slate-700">{data.email}</p></div>
                                             </div>
                                             <div className="flex items-center gap-3">
                                                  <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm"><Phone size={16} /></div>
                                                  <div><p className="text-[10px] text-slate-400 font-bold uppercase">Phone</p><p className="font-bold text-slate-700">{data.phone}</p></div>
                                             </div>
                                        </div>
                                   </section>

                                   {/* Shelter Metrics */}
                                   <section className="space-y-4">
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                                             <Home size={14} /> Shelter Info
                                        </h3>
                                        <div className="grid grid-cols-2 gap-3">
                                             <div className="bg-primary/5 border border-primary/10 p-4 rounded-3xl text-center">
                                                  <p className="text-2xl font-black text-primary">{data.capacity}</p>
                                                  <p className="text-[10px] font-bold text-slate-500 uppercase">Capacity</p>
                                             </div>
                                             <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-3xl text-center">
                                                  <p className="text-sm font-black text-emerald-600">{data.shelterType}</p>
                                                  <p className="text-[10px] font-bold text-slate-500 uppercase">Type</p>
                                             </div>
                                             <div className="col-span-2 bg-base-200/50 p-4 rounded-3xl flex items-center gap-3">
                                                  <Calendar size={18} className="text-slate-400" />
                                                  <div><p className="text-[10px] text-slate-400 font-bold uppercase">Operating Since</p><p className="font-bold text-slate-700">{new Date(data.operatingSince).toLocaleDateString()}</p></div>
                                             </div>
                                        </div>
                                   </section>
                              </div>

                              {/* Address & Experience (Full Width) */}
                              <div className="space-y-6">
                                   <div className="p-6 bg-slate-50 rounded-4xl border border-slate-100 flex gap-4">
                                        <MapPin className="text-primary shrink-0" size={24} />
                                        <div>
                                             <h4 className="text-[10px] font-black uppercase text-slate-400 mb-1">Shelter Location</h4>
                                             <p className="font-bold text-slate-700 leading-relaxed">{data.shelterAddress}, {data.shelterCity}</p>
                                        </div>
                                   </div>

                                   <div className="p-6 bg-base-200/40 rounded-4xl border border-dashed border-base-300">
                                        <h4 className="text-[10px] font-black uppercase text-slate-400 mb-2 flex items-center gap-2"><Heart size={14} /> Motivation</h4>
                                        <p className="text-sm text-slate-600 leading-relaxed ">{data.motivation}</p>
                                   </div>
                              </div>

                              {/* Photos Section */}
                              <div className="grid grid-cols-2 gap-4">
                                   <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase text-slate-400 pl-2">Shelter Photo</p>
                                        <Image
                                             width={300}
                                             height={300}
                                             src={data.shelterPhoto} alt="Shelter" className="w-full h-40 object-cover rounded-3xl border-4 border-white shadow-lg shadow-slate-200" />
                                   </div>
                                   <div className="space-y-2 flex flex-col justify-end">
                                        <a href={data.registrationCert
                                        } target="_blank" className="btn btn-primary rounded-2xl w-full flex items-center gap-2 shadow-lg shadow-primary/20">
                                             <GrDocumentPdf size={18} /> View Registration PDF
                                        </a>
                                        <div className="p-4 bg-white rounded-2xl border border-base-300 text-center">
                                             <p className="text-[10px] font-bold text-slate-400 uppercase">Vet Contact Available?</p>
                                             <p className="font-black text-primary">{data.hasVetContact}</p>
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