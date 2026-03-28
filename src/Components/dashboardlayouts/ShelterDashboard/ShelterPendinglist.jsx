"use client";
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
     Search, ChevronDown, ChevronLeft, ChevronRight,
     Eye, Edit, Trash2, X, Check, Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { deleteEntry, updateEntry } from '@/action/server/Entries';
import Swal from 'sweetalert2';

const ShelterPendinglist = ({ pets = [] }) => {
     const [requests, setRequests] = useState(pets);
     const [inputValue, setInputValue] = useState("");
     const [currentSpecies, setCurrentSpecies] = useState("All");
     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
     const [isViewModalOpen, setIsViewModalOpen] = useState(false);
     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
     const [selectedPet, setSelectedPet] = useState(null);
     const [currentPage, setCurrentPage] = useState(1);
     const dropdownRef = useRef(null);

     const speciesOptions = ['All', 'Dog', 'Cat', 'Bird', 'Rabbit', 'Hamster', 'Fish', 'Turtle', 'Horse', 'Other'];
     const itemsPerPage = 5;

     // Filter Logic
     const filteredPets = requests.filter(pet => {
          const matchesSearch = pet.petName.toLowerCase().includes(inputValue.toLowerCase());
          const matchesSpecies = currentSpecies === "All" || pet.species === currentSpecies;
          return matchesSearch && matchesSpecies;
     });

     const totalPages = Math.ceil(filteredPets.length / itemsPerPage);
     const currentData = filteredPets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

     // --- DELETE HANDLER ---
     const handleDelete = async (id) => {
          Swal.fire({
               title: "Are you sure?",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#ef4444",
               confirmButtonText: "Yes, delete it!",
          }).then(async (result) => {
               if (result.isConfirmed) {
                    try {
                         const res = await deleteEntry(id);
                         if (res.success) {
                              setRequests(prev => prev.filter(p => p._id !== id));
                              Swal.fire("Deleted!", "Entry removed successfully.", "success");
                         } else {
                              Swal.fire("Failed!", "Entry not found or already deleted.", "error");
                         }
                    } catch (err) {
                         Swal.fire("Error!", "Could not connect to server.", "error");
                    }
               }
          });
     };

     // --- UPDATE HANDLER ---
     const handleUpdateSubmit = async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const updatedFields = Object.fromEntries(formData.entries());

          try {
               const res = await updateEntry(selectedPet._id, updatedFields);

               if (res.success) {
                    setRequests(prev => prev.map(p =>
                         p._id === selectedPet._id ? { ...p, ...updatedFields } : p
                    ));
                    setIsEditModalOpen(false);
                    Swal.fire({
                         title: "Updated!",
                         icon: "success",
                         timer: 1500,
                         showConfirmButton: false
                    });
               } else {
                    Swal.fire("Error!", "No changes were made.", "info");
               }
          } catch (err) {
               Swal.fire("Error!", "Update failed.", "error");
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
                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                         <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                   <thead className="bg-slate-50/50">
                                        <tr>
                                             <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Pet</th>
                                             <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Species & Breed</th>
                                             <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                             <th className="px-6 py-5 text-xs font-bold text-center text-slate-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {requests.length === 0 ? (
                                             <tr>
                                                  <td colSpan="4" className="px-6 py-20">
                                                       <motion.div
                                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                            className="flex flex-col items-center justify-center text-center max-w-sm mx-auto"
                                                       >
                                                            <div className="size-20 bg-amber-50 rounded-3xl flex items-center justify-center mb-6">
                                                                 <Search className="size-10 text-amber-500" />
                                                            </div>
                                                            <h3 className="text-xl font-bold text-slate-800 mb-2">No Pets Available</h3>
                                                            <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                                                 It looks like your shelter doesn't have any pet entries yet.
                                                                 Start by adding a new pet to your listing.
                                                            </p>
                                                       </motion.div>
                                                  </td>
                                             </tr>
                                        ) : filteredPets.length === 0 ? (
                                             <tr>
                                                  <td colSpan="4" className="px-6 py-20">
                                                       <motion.div
                                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                            className="flex flex-col items-center justify-center text-center"
                                                       >
                                                            <div className="size-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                                                 <X className="size-8 text-slate-400" />
                                                            </div>
                                                            <h3 className="text-lg font-bold text-slate-800">No matching results</h3>
                                                            <p className="text-slate-500 text-sm mt-1">
                                                                 We couldn't find anything for "{inputValue}" in {currentSpecies}
                                                            </p>
                                                            <button
                                                                 onClick={() => { setInputValue(""); setCurrentSpecies("All"); }}
                                                                 className="mt-4 text-primary font-bold text-sm hover:underline"
                                                            >
                                                                 Clear all filters
                                                            </button>
                                                       </motion.div>
                                                  </td>
                                             </tr>
                                        ) : (
                                             currentData.map((pet) => (
                                                  <tr key={pet._id} className="group hover:bg-slate-50/80 transition-all duration-300">
                                                       <td className="px-6 py-4">
                                                            <div className="flex items-center gap-4">
                                                                 <div className="relative size-12 rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
                                                                      <Image fill src={pet.images?.[0] || "/placeholder.png"} alt={pet.petName} className="object-cover" />
                                                                 </div>
                                                                 <div>
                                                                      <p className="font-bold text-sm text-slate-700">{pet.petName}</p>
                                                                      <p className="text-[10px] text-slate-400 font-medium">ID: {pet._id.slice(-6).toUpperCase()}</p>
                                                                 </div>
                                                            </div>
                                                       </td>
                                                       <td className="px-6 py-4">
                                                            <div className="flex flex-col">
                                                                 <span className="text-sm font-semibold text-slate-600">{pet.species}</span>
                                                                 <span className="text-xs text-slate-400">{pet.breed}</span>
                                                            </div>
                                                       </td>
                                                       <td className="px-6 py-4">
                                                            <span className="px-3 py-1 rounded-lg text-[10px] font-black bg-amber-50 text-amber-600 uppercase tracking-tighter border border-amber-100/50">
                                                                 {pet.status}
                                                            </span>
                                                       </td>
                                                       <td className="px-6 py-4">
                                                            <div className="flex justify-center gap-1">
                                                                 <button onClick={() => { setSelectedPet(pet); setIsViewModalOpen(true); }} className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"><Eye size={18} /></button>
                                                                 <button onClick={() => { setSelectedPet(pet); setIsEditModalOpen(true); }} className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all"><Edit size={18} /></button>
                                                                 <button onClick={() => handleDelete(pet._id)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                                                            </div>
                                                       </td>
                                                  </tr>
                                             ))
                                        )}
                                   </tbody>
                              </table>


                              <AnimatePresence>
                                   {isEditModalOpen && selectedPet && (
                                        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                                             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl">
                                                  <div className="p-6 border-b flex justify-between items-center">
                                                       <h2 className="text-xl font-black text-slate-800 tracking-tight">Update {selectedPet.petName}</h2>
                                                       <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all"><X size={20} /></button>
                                                  </div>

                                                  <form onSubmit={handleUpdateSubmit} className="p-6 space-y-4">
                                                       <div className="space-y-1">
                                                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Pet Name</label>
                                                            <input name="petName" defaultValue={selectedPet.petName} className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-xl outline-none transition-all font-semibold" required />
                                                       </div>

                                                       <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-1">
                                                                 <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Species</label>
                                                                 <select name="species" defaultValue={selectedPet.species} className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-primary/20 rounded-xl outline-none font-semibold appearance-none">
                                                                      {speciesOptions.filter(o => o !== "All").map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                                 </select>
                                                            </div>
                                                            <div className="space-y-1">
                                                                 <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Breed</label>
                                                                 <input name="breed" defaultValue={selectedPet.breed} className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-primary/20 rounded-xl outline-none font-semibold" />
                                                            </div>
                                                       </div>

                                                       <div className="pt-4">
                                                            <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg">
                                                                 <Save size={18} /> Save Changes
                                                            </button>
                                                       </div>
                                                  </form>
                                             </motion.div>
                                        </div>
                                   )}
                              </AnimatePresence>
                         </div>

                         {/* Pagination */}
                         {filteredPets.length > 0 && (
                              <div className="px-6 py-4 bg-slate-50/50 flex items-center justify-between border-t border-slate-100">
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
                         )}

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