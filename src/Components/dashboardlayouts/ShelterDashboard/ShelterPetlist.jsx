'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Edit, Trash2, Search, Filter, ChevronLeft, ChevronRight, ChevronDown, Check } from 'lucide-react';

const ShelterPetlist = ({ requests = [], totalPages = 1 }) => {
     const router = useRouter();
     const pathname = usePathname();
     const searchParams = useSearchParams();
     const dropdownRef = useRef(null);

     // 1. Initialize variables from URL
     const currentPage = Number(searchParams.get('page')) || 1;
     const currentSearch = searchParams.get('search') || '';
     const currentSpecies = searchParams.get('species') || 'All';
     const isLastPage = currentPage >= totalPages;

     // 2. Local states
     const [inputValue, setInputValue] = useState(currentSearch);
     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

     const speciesOptions = [
          { label: 'All Species', value: 'All' },
          { label: 'Dogs', value: 'Dog' },
          { label: 'Cats', value: 'Cat' },
          { label: 'Birds', value: 'Bird' },
          { label: 'Rabbits', value: 'Rabbit' },
          { label: 'Hamsters', value: 'Hamster' },
          { label: 'Fish', value: 'Fish' },
          { label: 'Turtles', value: 'Turtle' },
     ];

     // Close dropdown when clicking outside
     useEffect(() => {
          const handleClickOutside = (event) => {
               if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setIsDropdownOpen(false);
               }
          };
          document.addEventListener('mousedown', handleClickOutside);
          return () => document.removeEventListener('mousedown', handleClickOutside);
     }, []);

     // URL Update Function
     const updateQueryParams = (params) => {
          const newParams = new URLSearchParams(searchParams.toString());
          Object.keys(params).forEach(key => {
               if (params[key] === null || params[key] === 'All') {
                    newParams.delete(key);
               } else {
                    newParams.set(key, params[key]);
               }
          });
          if (!params.page) newParams.set('page', '1');
          router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
     };

     // Handle search with 500ms debounce
     useEffect(() => {
          const delayDebounceFn = setTimeout(() => {
               if (inputValue !== currentSearch) {
                    updateQueryParams({ search: inputValue });
               }
          }, 500);
          return () => clearTimeout(delayDebounceFn);
     }, [inputValue]);

     const selectedLabel = speciesOptions.find(s => s.value === currentSpecies)?.label || 'All Species';

     return (
          <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans">
               <div className="max-w-7xl mx-auto">

                    {/* Header Section */}
                    <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                         <div>
                              <h1 className="text-2xl font-bold text-slate-800">Pet Entries</h1>
                              <p className="text-slate-500">Manage and monitor your shelter animals</p>
                         </div>

                         <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                              {/* Professional Search Bar */}
                              <div className="relative w-full sm:w-72 group">
                                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4 group-focus-within:text-primary transition-colors" />
                                   <input
                                        type="text"
                                        value={inputValue}
                                        placeholder="Search pets..."
                                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                        onChange={(e) => setInputValue(e.target.value)}
                                   />
                              </div>

                              {/* Custom Professional Species Dropdown */}
                              <div className="relative w-full sm:w-52" ref={dropdownRef}>
                                   <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className={`flex items-center justify-between w-full px-4 py-2.5 bg-white border transition-all rounded-xl shadow-sm hover:border-primary/50 ${isDropdownOpen ? 'border-primary ring-4 ring-primary/10' : 'border-slate-200'
                                             }`}
                                   >
                                        <div className="flex items-center gap-2">
                                             <Filter className={`${isDropdownOpen ? 'text-primary' : 'text-slate-400'} size-4`} />
                                             <span className="text-sm font-semibold text-slate-700">{selectedLabel}</span>
                                        </div>
                                        <ChevronDown className={`size-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180 text-primary' : ''}`} />
                                   </button>

                                   <AnimatePresence>
                                        {isDropdownOpen && (
                                             <motion.div
                                                  initial={{ opacity: 0, y: 8 }}
                                                  animate={{ opacity: 1, y: 0 }}
                                                  exit={{ opacity: 0, y: 8 }}
                                                  className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden"
                                             >
                                                  <div className="p-1.5 max-h-60 overflow-y-auto custom-scrollbar">
                                                       {speciesOptions.map((option) => (
                                                            <button
                                                                 key={option.value}
                                                                 onClick={() => {
                                                                      updateQueryParams({ species: option.value });
                                                                      setIsDropdownOpen(false);
                                                                 }}
                                                                 className={`flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors ${currentSpecies === option.value
                                                                      ? 'bg-primary/5 text-primary'
                                                                      : 'text-slate-600 hover:bg-slate-50'
                                                                      }`}
                                                            >
                                                                 {option.label}
                                                                 {currentSpecies === option.value && <Check className="size-4" />}
                                                            </button>
                                                       ))}
                                                  </div>
                                             </motion.div>
                                        )}
                                   </AnimatePresence>
                              </div>
                         </div>
                    </div>

                    {/* Main Table Container */}
                    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
                         <div className="overflow-x-auto">
                              <table className="w-full text-left border-separate border-spacing-0">
                                   <thead className="bg-slate-50/80 backdrop-blur-md">
                                        <tr>
                                             <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Pet Information</th>
                                             <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Species</th>
                                             <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Age</th>
                                             <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Status</th>
                                             <th className="px-6 py-4 text-xs font-bold text-center text-slate-500 uppercase tracking-wider border-b border-slate-100">Actions</th>
                                        </tr>
                                   </thead>
                                   <tbody className="divide-y divide-slate-100">
                                        <AnimatePresence mode='popLayout'>
                                             {requests.length > 0 ? (
                                                  requests.map((pet, index) => (
                                                       <motion.tr
                                                            key={pet._id}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, scale: 0.95 }}
                                                            transition={{ duration: 0.2, delay: index * 0.05 }}
                                                            className="hover:bg-slate-50/80 group transition-all"
                                                       >
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                 <div className="flex items-center gap-4">
                                                                      <div className="relative size-12 rounded-2xl overflow-hidden border-2 border-white shadow-md group-hover:scale-105 transition-transform">
                                                                           <Image
                                                                                fill
                                                                                src={pet.images?.[0] || "/default-pet.png"}
                                                                                alt={pet.petName}
                                                                                className="object-cover"
                                                                           />
                                                                      </div>
                                                                      <div>
                                                                           <div className="font-bold text-slate-800">{pet.petName}</div>
                                                                           <div className="text-xs text-slate-500">ID: {pet._id.slice(-6)}</div>
                                                                      </div>
                                                                 </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                 <span className="text-sm font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                                                                      {pet.species}
                                                                 </span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                 <div className="text-sm text-slate-700 font-medium">
                                                                      {pet.ageYears}y <span className="text-slate-400 font-normal">{pet.ageMonths}m</span>
                                                                 </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                 <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${pet.status === 'adopted'
                                                                      ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
                                                                      : 'bg-amber-50 text-amber-700 ring-amber-600/20'
                                                                      }`}>
                                                                      <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${pet.status === 'adopted' ? 'bg-emerald-600' : 'bg-amber-600'}`}></span>
                                                                      {pet.status}
                                                                 </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                                 <div className="flex items-center justify-center gap-2">
                                                                      <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all shadow-sm bg-white border border-slate-100" title="View">
                                                                           <Eye size={16} />
                                                                      </button>
                                                                      <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all shadow-sm bg-white border border-slate-100" title="Edit">
                                                                           <Edit size={16} />
                                                                      </button>
                                                                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shadow-sm bg-white border border-slate-100" title="Delete">
                                                                           <Trash2 size={16} />
                                                                      </button>
                                                                 </div>
                                                            </td>
                                                       </motion.tr>
                                                  ))
                                             ) : (
                                                  <tr>
                                                       <td colSpan="5" className="px-6 py-20 text-center text-slate-400 font-medium">
                                                            No pets found matching your criteria.
                                                       </td>
                                                  </tr>
                                             )}
                                        </AnimatePresence>
                                   </tbody>
                              </table>
                         </div>

                         {/* Attractive Pagination */}
                         <div className="px-6 py-5 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                              <p className="text-sm text-slate-500 font-medium">
                                   Showing page <span className="text-slate-800">{currentPage}</span> of <span className="text-slate-800">{totalPages}</span>
                              </p>

                              <div className="flex items-center gap-1.5">
                                   <button
                                        onClick={() => updateQueryParams({ page: currentPage - 1 })}
                                        disabled={currentPage === 1}
                                        className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition-all shadow-sm"
                                   >
                                        <ChevronLeft size={18} className="text-slate-600" />
                                   </button>

                                   {[...Array(totalPages)].map((_, index) => {
                                        const num = index + 1;
                                        return (
                                             <button
                                                  key={num}
                                                  onClick={() => updateQueryParams({ page: num })}
                                                  className={`size-10 rounded-xl text-sm font-bold transition-all shadow-sm ${currentPage === num
                                                       ? 'bg-primary text-white shadow-primary/20'
                                                       : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                                       }`}
                                             >
                                                  {num}
                                             </button>
                                        );
                                   })}

                                   <button
                                        onClick={() => updateQueryParams({ page: currentPage + 1 })}
                                        disabled={isLastPage}
                                        className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition-all shadow-sm"
                                   >
                                        <ChevronRight size={18} className="text-slate-600" />
                                   </button>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default ShelterPetlist;