'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Edit, Trash2, Search, ChevronLeft, ChevronRight, ChevronDown, Check, X, Mail, AlertTriangle } from 'lucide-react';
import Swal from 'sweetalert2';

// Server Actions
import { deletePet, updatePets } from '@/action/server/pets';
import Loading from '@/components/Loading';
import { SheltergetStatus } from '@/action/server/Shelteruser';

const ShelterPetlist = ({ requests = [], totalPages = 1 }) => {
     const { data: session } = useSession();
     const userEmail = session?.user?.email;
     const router = useRouter();
     const [shelterStatus, setShelterStatus] = useState(null);
     const pathname = usePathname();
     const [isLoading, setIsLoading] = useState(true);
     const searchParams = useSearchParams();
     const dropdownRef = useRef(null);


     useEffect(() => {
          const checkShelterStatus = async () => {
               const userEmail = session?.user?.email;

               if (userEmail) {

                    try {
                         setIsLoading(true);
                         const status = await SheltergetStatus(userEmail);
                         setShelterStatus(status);
                    } catch (error) {
                         console.error("Status check failed:", error);
                    } finally {
                         setIsLoading(false);
                    }
               }
          };

          checkShelterStatus();
     }, [session?.user?.email])

     // Modal States
     const [selectedPet, setSelectedPet] = useState(null);
     const [isViewModalOpen, setIsViewModalOpen] = useState(false);
     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
     const [editFormData, setEditFormData] = useState({});

     // Filter and Pagination States
     const currentPage = Number(searchParams.get('page')) || 1;
     const currentSearch = searchParams.get('search') || '';
     const currentSpecies = searchParams.get('species') || 'All';
     const [inputValue, setInputValue] = useState(currentSearch);
     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

     const speciesOptions = ['All', 'Dog', 'Cat', 'Bird', 'Rabbit', 'Hamster', 'Fish', 'Turtle', 'Horse', 'Other'];

     // --- URL Update & Pagination Logic ---
     const updateQueryParams = (params) => {
          const newParams = new URLSearchParams(searchParams.toString());
          Object.keys(params).forEach(key => {
               if (params[key] === null || params[key] === 'All') {
                    newParams.delete(key);
               } else {
                    newParams.set(key, params[key]);
               }
          });
          if (!params.page && (params.species || params.search !== undefined)) {
               newParams.set('page', '1');
          }
          router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
     };

     // Debounced Search
     useEffect(() => {
          const delayDebounceFn = setTimeout(() => {
               if (inputValue !== currentSearch) {
                    updateQueryParams({ search: inputValue, page: '1' });
               }
          }, 500);
          return () => clearTimeout(delayDebounceFn);
     }, [inputValue]);

     // Close dropdown on click outside
     useEffect(() => {
          const handleClickOutside = (event) => {
               if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setIsDropdownOpen(false);
               }
          };
          document.addEventListener("mousedown", handleClickOutside);
          return () => document.removeEventListener("mousedown", handleClickOutside);
     }, []);

     // --- Actions ---
     const handleDelete = async (id) => {
          if (!userEmail) return Swal.fire("Error", "Login required", "error");
          Swal.fire({
               title: "Are you sure?",
               text: "This will permanently remove the pet entry.",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#ef4444",
               confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
               if (result.isConfirmed) {
                    const res = await deletePet(id, userEmail);
                    if (res.success) Swal.fire("Deleted!", res.message, "success");
                    else Swal.fire("Error!", res.message, "error");
               }
          });
     };

     const handleEditSubmit = async (e) => {
          e.preventDefault();
          const res = await updatePets(selectedPet._id, editFormData, userEmail);
          if (res.success) {
               setIsEditModalOpen(false);
               Swal.fire("Updated!", res.message, "success");
          } else {
               Swal.fire("Error!", res.message, "error");
          }
     };

     if (shelterStatus === "Suspended") {
          return (
               <div className="card bg-base-100 shadow-2xl max-w-2xl mx-auto rounded-3xl overflow-hidden border-2 border-error/20">
                    <div className="p-12 text-center space-y-6">
                         <div className="w-20 h-20 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                              <AlertTriangle size={40} />
                         </div>

                         <div className="space-y-2">
                              <h2 className="text-3xl font-black text-neutral tracking-tight">
                                   Account Suspended
                              </h2>
                              <p className="text-base-content/70 font-medium px-4">
                                   Your shelter account is currently suspended. You cannot list new pets at this moment.
                              </p>
                         </div>

                         <div className="bg-base-200/50 p-6 rounded-2xl border border-base-300">
                              <p className="text-sm text-neutral font-bold mb-3 flex items-center justify-center gap-2">
                                   <Mail size={16} className="text-primary" /> How to resolve this?
                              </p>
                              <p className="text-sm text-base-content/60 ">
                                   Please contact the system administrator to discuss the status of your account and request reactivation.
                              </p>
                         </div>
                    </div>
               </div>
          );
     }

     if (isLoading) {
          return <Loading />
     }

     // --- Main Render ---
     return (
          <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
               <div className="max-w-7xl mx-auto">
                    {/* Header & Filters */}
                    <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                         <div>
                              <h1 className="text-2xl font-bold text-slate-800">Pet Entries</h1>
                              <p className="text-slate-500 text-sm">Update and manage pet listings</p>
                         </div>

                         <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                              <div className="relative w-full sm:w-72">
                                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
                                   <input
                                        type="text"
                                        value={inputValue}
                                        placeholder="Search by name..."
                                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
                                        onChange={(e) => setInputValue(e.target.value)}
                                   />
                              </div>

                              {/* Species Filter */}
                              <div className="relative w-full sm:w-56" ref={dropdownRef}>
                                   <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm text-sm"
                                   >
                                        <span className="font-medium text-slate-700">{currentSpecies === 'All' ? 'Select Species' : currentSpecies}</span>
                                        <ChevronDown className={`size-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                   </button>

                                   <AnimatePresence>
                                        {isDropdownOpen && (
                                             <motion.div
                                                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                                                  className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden max-h-64 overflow-y-auto"
                                             >
                                                  {speciesOptions.map((opt) => (
                                                       <button
                                                            key={opt}
                                                            onClick={() => { updateQueryParams({ species: opt, page: '1' }); setIsDropdownOpen(false); }}
                                                            className={`w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 flex items-center justify-between ${currentSpecies === opt ? 'bg-blue-50 text-blue-600' : 'text-slate-600'}`}
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
                              <table className="w-full text-left">
                                   <thead className="bg-slate-50">
                                        <tr>
                                             <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Pet</th>
                                             <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Species</th>
                                             <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                                             <th className="px-6 py-4 text-xs font-bold text-center text-slate-500 uppercase">Actions</th>
                                        </tr>
                                   </thead>
                                   <tbody className="divide-y divide-slate-100">
                                        {requests.length > 0 ? requests.map((pet) => (
                                             <tr key={pet._id} className="hover:bg-slate-50/50 transition-colors">
                                                  <td className="px-6 py-4">
                                                       <div className="flex items-center gap-3">
                                                            <div className="relative size-10 rounded-lg overflow-hidden border">
                                                                 <Image fill src={pet.images?.[0] || "/placeholder.png"} alt={pet.petName} className="object-cover" />
                                                            </div>
                                                            <span className="font-bold text-slate-800 text-sm">{pet.petName}</span>
                                                       </div>
                                                  </td>
                                                  <td className="px-6 py-4 text-sm text-slate-600">{pet.species}</td>
                                                  <td className="px-6 py-4">
                                                       <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${pet.status === 'adopted' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                                            {pet.status}
                                                       </span>
                                                  </td>
                                                  <td className="px-6 py-4">
                                                       <div className="flex justify-center gap-2">
                                                            <button onClick={() => { setSelectedPet(pet); setIsViewModalOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Eye size={16} /></button>
                                                            <button onClick={() => { setSelectedPet(pet); setEditFormData({ ...pet }); setIsEditModalOpen(true); }} className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg"><Edit size={16} /></button>
                                                            <button onClick={() => handleDelete(pet._id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                                                       </div>
                                                  </td>
                                             </tr>
                                        )) : (
                                             <tr>
                                                  <td colSpan="4" className="px-6 py-20">
                                                       <div className="flex flex-col items-center justify-center text-center">
                                                            <div className="bg-slate-100 p-6 rounded-full mb-4">
                                                                 <Search className="size-10 text-slate-400" />
                                                            </div>
                                                            <h3 className="text-lg font-bold text-slate-800 mb-1">No Pets Found</h3>
                                                            <p className="text-slate-500 text-sm max-w-[250px] mx-auto">
                                                                 We couldn't find any pet entries .
                                                            </p>
                                                       </div>
                                                  </td>
                                             </tr>
                                        )}
                                   </tbody>
                              </table>
                         </div>

                         {/* Pagination */}

                         {requests.length > 0 &&

                              <div className="px-6 py-4 bg-slate-50/50 flex items-center justify-between border-t border-slate-100">
                                   <div className="text-xs text-slate-500">
                                        Showing page <span className="font-bold text-slate-800">{currentPage}</span> of <span className="font-bold text-slate-800">{totalPages || 1}</span>
                                   </div>
                                   <div className="flex gap-2">
                                        <button disabled={currentPage <= 1} onClick={() => updateQueryParams({ page: currentPage - 1 })} className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-50 disabled:opacity-40 transition-all shadow-sm">
                                             <ChevronLeft size={14} /> Previous
                                        </button>
                                        <button disabled={currentPage >= totalPages} onClick={() => updateQueryParams({ page: currentPage + 1 })} className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium hover:bg-slate-50 disabled:opacity-40 transition-all shadow-sm">
                                             Next <ChevronRight size={14} />
                                        </button>
                                   </div>
                              </div>

                         }

                    </div>
               </div>

               {/* --- VIEW MODAL (এখানে রাখা হয়েছে যাতে রেন্ডার হয়) --- */}
               <AnimatePresence>
                    {isViewModalOpen && selectedPet && (
                         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                              <motion.div
                                   initial={{ scale: 0.9, opacity: 0 }}
                                   animate={{ scale: 1, opacity: 1 }}
                                   exit={{ scale: 0.9, opacity: 0 }}
                                   className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative"
                              >
                                   <button onClick={() => setIsViewModalOpen(false)} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white z-10 transition-colors">
                                        <X size={20} />
                                   </button>

                                   <div className="relative h-64 w-full bg-slate-100">
                                        <Image fill src={selectedPet.images?.[0] || "/placeholder.png"} className="object-cover" alt={selectedPet.petName} />
                                   </div>

                                   <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                             <div>
                                                  <h2 className="text-2xl font-bold text-slate-800">{selectedPet.petName}</h2>
                                                  <p className="text-blue-600 font-medium">{selectedPet.species}</p>
                                             </div>
                                             <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${selectedPet.status === 'adopted' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                                  {selectedPet.status}
                                             </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                             <div className="bg-slate-50 p-3 rounded-2xl">
                                                  <p className="text-[10px] text-slate-400 uppercase font-bold">Gender</p>
                                                  <p className="text-sm font-semibold text-slate-700">{selectedPet.gender || 'Not specified'}</p>
                                             </div>
                                             <div className="bg-slate-50 p-3 rounded-2xl">
                                                  <p className="text-[10px] text-slate-400 uppercase font-bold">Weight</p>
                                                  <p className="text-sm font-semibold text-slate-700">{selectedPet.weight ? `${selectedPet.weight} kg` : 'N/A'}</p>
                                             </div>
                                        </div>

                                        {selectedPet.description && (
                                             <div className="mb-6">
                                                  <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Description</p>
                                                  <p className="text-sm text-slate-600 leading-relaxed">{selectedPet.description}</p>
                                             </div>
                                        )}

                                        <button onClick={() => setIsViewModalOpen(false)} className="w-full py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors">
                                             Close Details
                                        </button>
                                   </div>
                              </motion.div>
                         </div>
                    )}
               </AnimatePresence>

               {/* --- EDIT MODAL --- */}
               <AnimatePresence>
                    {isEditModalOpen && (
                         <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">
                                   <h2 className="text-xl font-bold mb-4 text-slate-800">Edit Pet Status</h2>
                                   <form onSubmit={handleEditSubmit} className="space-y-4">
                                        <div>
                                             <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Status</label>
                                             <select
                                                  value={editFormData.status || ''}
                                                  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                                                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
                                             >
                                                  <option value="available">Available</option>
                                                  <option value="adopted">Adopted</option>
                                             </select>
                                        </div>
                                        <div className="flex gap-3 mt-6">
                                             <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 py-2.5 text-sm font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50">Cancel</button>
                                             <button type="submit" className="flex-1 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30">Update</button>
                                        </div>
                                   </form>
                              </motion.div>
                         </div>
                    )}
               </AnimatePresence>
          </div>
     );
};

export default ShelterPetlist;