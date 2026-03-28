"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
     Search, ChevronDown, ChevronLeft, ChevronRight,
     Eye, Edit, Trash2, X, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ShelterPendinglist = ({ pets = [] }) => {
     // States
     const [requests, setRequests] = useState(pets);
     const [inputValue, setInputValue] = useState("");
     const [currentSpecies, setCurrentSpecies] = useState("All");
     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
     const [isViewModalOpen, setIsViewModalOpen] = useState(false);
     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
     const [selectedPet, setSelectedPet] = useState(null);
     const [currentPage, setCurrentPage] = useState(1);
     const dropdownRef = useRef(null);

     const speciesOptions = ["All", "Dog", "Cat", "Rabbit", "Bird", "Fish"];
     const itemsPerPage = 5;

     // Filter Logic
     const filteredPets = requests.filter(pet => {
          const matchesSearch = pet.petName.toLowerCase().includes(inputValue.toLowerCase());
          const matchesSpecies = currentSpecies === "All" || pet.species === currentSpecies;
          return matchesSearch && matchesSpecies;
     });

     const totalPages = Math.ceil(filteredPets.length / itemsPerPage);
     const currentData = filteredPets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

     // Delete Action
     const handleDelete = (id) => {
          if (confirm("Are you sure you want to delete this?")) {
               setRequests(requests.filter(p => p._id !== id));
          }
     };

     return (
          <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
               <div className="max-w-7xl mx-auto">
                    {/* Header & Filters */}
                    <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                         <div>
                              <h1 className="text-3xl font-extrabold text-slate-800">Pending Entries</h1>
                              <p className="text-slate-500 text-sm mt-1">Update and manage your pet listings effortlessly</p>
                         </div>

                         <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                              {/* Search Bar */}
                              <div className="relative w-full sm:w-72">
                                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
                                   <input
                                        type="text"
                                        placeholder="Search by name..."
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                   />
                              </div>

                              {/* Species Dropdown */}
                              <div className="relative w-full sm:w-56" ref={dropdownRef}>
                                   <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm text-sm hover:bg-slate-50 transition-colors"
                                   >
                                        <span className="font-medium text-slate-700">{currentSpecies === 'All' ? 'Filter by Species' : currentSpecies}</span>
                                        <ChevronDown className={`size-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                   </button>

                                   <AnimatePresence>
                                        {isDropdownOpen && (
                                             <motion.div
                                                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                                                  className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden"
                                             >
                                                  {speciesOptions.map((opt) => (
                                                       <button
                                                            key={opt}
                                                            onClick={() => { setCurrentSpecies(opt); setIsDropdownOpen(false); setCurrentPage(1); }}
                                                            className={`w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 flex items-center justify-between ${currentSpecies === opt ? 'bg-primary/10 text-primary font-bold' : 'text-slate-600'}`}
                                                       >
                                                            {opt} {currentSpecies === opt && <Check className="size-3" />}
                                                       </button>
                                                  ))}
                                             </motion.div>
                                        )}
                                   </AnimatePresence>
                              </div>
                         </div>
                    </div>

                    {/* Table Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                         <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                   <thead className="bg-slate-50 border-b border-slate-100">
                                        <tr>
                                             <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Pet</th>
                                             <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Species & Breed</th>
                                             <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                             <th className="px-6 py-4 text-xs font-bold text-center text-slate-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                   </thead>
                                   <tbody className="divide-y divide-slate-100">
                                        {currentData.length > 0 ? currentData.map((pet) => (
                                             <tr key={pet._id} className="hover:bg-slate-50/50 transition-colors group">
                                                  <td className="px-6 py-4">
                                                       <div className="flex items-center gap-4">
                                                            <div className="relative size-12 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                                                                 <Image
                                                                      width={196}
                                                                      height={196}
                                                                      src={pet.images?.[0] || "/placeholder.png"} alt={pet.petName} className="object-cover w-full h-full" />
                                                            </div>
                                                            <div>
                                                                 <p className="font-bold text-slate-800 text-sm">{pet.petName}</p>
                                                                 <p className="text-[10px] text-slate-400">ID: {pet._id.slice(-6).toUpperCase()}</p>
                                                            </div>
                                                       </div>
                                                  </td>
                                                  <td className="px-6 py-4">
                                                       <p className="text-sm font-semibold text-slate-700">{pet.species}</p>
                                                       <p className="text-xs text-slate-400">{pet.breed}</p>
                                                  </td>
                                                  <td className="px-6 py-4">
                                                       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${pet.status === 'preview' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                                                            {pet.status}
                                                       </span>
                                                  </td>
                                                  <td className="px-6 py-4">
                                                       <div className="flex justify-center gap-2">
                                                            <button onClick={() => { setSelectedPet(pet); setIsViewModalOpen(true); }} className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"><Eye size={18} /></button>
                                                            <button onClick={() => { setSelectedPet(pet); setIsEditModalOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit size={18} /></button>
                                                            <button onClick={() => handleDelete(pet._id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                                                       </div>
                                                  </td>
                                             </tr>
                                        )) : (
                                             <tr>
                                                  <td colSpan="4" className="px-6 py-20 text-center text-slate-400 text-sm">No pets found matching your filters.</td>
                                             </tr>
                                        )}
                                   </tbody>
                              </table>
                         </div>

                         {/* Pagination */}
                         <div className="px-6 py-4 bg-slate-50/50 flex items-center justify-between border-t border-slate-100">
                              <div className="text-xs text-slate-500">
                                   Showing page <span className="font-bold text-slate-800">{currentPage}</span> of <span className="font-bold text-slate-800">{totalPages || 1}</span>
                              </div>
                              <div className="flex gap-2">
                                   <button
                                        disabled={currentPage <= 1}
                                        onClick={() => setCurrentPage(prev => prev - 1)}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-50 disabled:opacity-40 transition-all shadow-sm"
                                   >
                                        <ChevronLeft size={14} /> Prev
                                   </button>
                                   <button
                                        disabled={currentPage >= totalPages}
                                        onClick={() => setCurrentPage(prev => prev + 1)}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-50 disabled:opacity-40 transition-all shadow-sm"
                                   >
                                        Next <ChevronRight size={14} />
                                   </button>
                              </div>
                         </div>
                    </div>
               </div>

               {/* View Modal Implementation - Same as your reference but styled with Primary color */}
               <AnimatePresence>
                    {isViewModalOpen && selectedPet && (
                         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative">
                                   <button onClick={() => setIsViewModalOpen(false)} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white z-10"><X size={20} /></button>
                                   <div className="relative h-64 w-full bg-slate-100">
                                        <Image
                                             width={196}
                                             height={196}
                                             src={selectedPet.images?.[0]} className="object-cover w-full h-full" alt={selectedPet.petName} />
                                   </div>
                                   <div className="p-6 text-center">
                                        <h2 className="text-2xl font-bold text-slate-800">{selectedPet.petName}</h2>
                                        <p className="text-primary font-bold mb-4">{selectedPet.species} • {selectedPet.breed}</p>
                                        <div className="grid grid-cols-3 gap-3 mb-6">
                                             <div className="bg-slate-50 p-3 rounded-2xl"><p className="text-[10px] text-slate-400 font-bold uppercase">Age</p><p className="text-sm font-bold">{selectedPet.ageYears}y</p></div>
                                             <div className="bg-slate-50 p-3 rounded-2xl"><p className="text-[10px] text-slate-400 font-bold uppercase">Gender</p><p className="text-sm font-bold">{selectedPet.gender}</p></div>
                                             <div className="bg-slate-50 p-3 rounded-2xl"><p className="text-[10px] text-slate-400 font-bold uppercase">Weight</p><p className="text-sm font-bold">{selectedPet.weight}kg</p></div>
                                        </div>
                                        <button onClick={() => setIsViewModalOpen(false)} className="w-full py-3 bg-slate-900 text-white rounded-2xl font-bold">Close Details</button>
                                   </div>
                              </motion.div>
                         </div>
                    )}
               </AnimatePresence>
          </div>
     );
};

export default ShelterPendinglist;