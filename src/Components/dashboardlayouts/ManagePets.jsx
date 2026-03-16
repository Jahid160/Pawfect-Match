"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  CheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Filter, // Added Filter Icon
} from "lucide-react";

const ManagePets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All Status"); // New State for Status
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const initialPets = [
    {
      id: "PET-001",
      name: "Buddy",
      breed: "Golden Retriever",
      age: "2 Years",
      type: "Dog",
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=150",
    },
    {
      id: "PET-002",
      name: "Luna",
      breed: "Persian Cat",
      age: "6 Months",
      type: "Cat",
      status: "Pending",
      image:
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=150",
    },
    {
      id: "PET-003",
      name: "Max",
      breed: "German Shepherd",
      age: "4 Years",
      type: "Dog",
      status: "Adopted",
      image:
        "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=150",
    },
    {
      id: "PET-004",
      name: "Bella",
      breed: "Siberian Husky",
      age: "1 Year",
      type: "Dog",
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=150",
    },
    {
      id: "PET-005",
      name: "Milo",
      breed: "Siamese Cat",
      age: "3 Years",
      type: "Cat",
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&q=80&w=150",
    },
    {
      id: "PET-006",
      name: "Charlie",
      breed: "Beagle",
      age: "2 Years",
      type: "Dog",
      status: "Pending",
      image:
        "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=150",
    },
  ];

  // --- Enhanced Filtering Logic ---
  const filteredPets = useMemo(() => {
    return initialPets.filter((pet) => {
      const matchesSearch =
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = filterType === "All" || pet.type === filterType;
      const matchesStatus =
        filterStatus === "All Status" || pet.status === filterStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchTerm, filterType, filterStatus]);

  const totalPages = Math.ceil(filteredPets.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPets.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to first page on any filter change
  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-[#F8FAFC] p-6 lg:p-10 min-h-screen font-sans text-slate-900">
      {/* Header */}
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="flex items-center gap-3 font-black text-slate-900 text-4xl tracking-tight">
            Manage{" "}
            <span className="text-orange-500 underline decoration-8 decoration-orange-100 underline-offset-[-2px]">
              Pets
            </span>
          </h1>
          <p className="mt-2 font-medium text-slate-500">
            Track and filter your residents with ease.
          </p>
        </div>
        <button className="group flex justify-center items-center gap-2 bg-orange-500 hover:bg-slate-900 shadow-lg px-8 py-4 rounded-2xl font-black text-white transition-all">
          <Plus
            size={20}
            className="group-hover:rotate-90 transition-transform"
          />{" "}
          Add New Pet
        </button>
      </div>

      {/* --- ENHANCED TOOLBAR --- */}
      <div className="flex lg:flex-row flex-col gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-xl">
          <Search
            className="top-1/2 left-4 absolute text-slate-400 -translate-y-1/2"
            size={18}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleFilterChange(setSearchTerm, e.target.value)}
            placeholder="Search by name, ID, or breed..."
            className="bg-white shadow-sm py-4 pr-4 pl-12 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 outline-none w-full font-medium transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter Dropdown */}
          <div className="relative">
            <Filter
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              size={16}
            />
            <select
              value={filterStatus}
              onChange={(e) =>
                handleFilterChange(setFilterStatus, e.target.value)
              }
              className="bg-white shadow-sm py-4 pl-11 pr-8 border border-slate-200 rounded-2xl font-bold text-xs text-slate-600 outline-none focus:ring-2 focus:ring-orange-500/20 appearance-none cursor-pointer hover:bg-slate-50 transition-all"
            >
              <option value="All Status">All Status</option>
              <option value="Available">Available</option>
              <option value="Pending">Pending</option>
              <option value="Adopted">Adopted</option>
            </select>
          </div>

          {/* Type Filter Tabs */}
          <div className="flex bg-white shadow-sm p-1 border border-slate-100 rounded-2xl h-fit">
            {["All", "Dog", "Cat"].map((type) => (
              <button
                key={type}
                onClick={() => handleFilterChange(setFilterType, type)}
                className={`px-6 py-2 rounded-xl font-bold text-xs transition-all ${
                  filterType === type
                    ? "bg-slate-900 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {type === "Dog" ? "Dogs" : type === "Cat" ? "Cats" : "All"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white shadow-sm border border-slate-100 rounded-[2.5rem] overflow-hidden">
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-4">Pet Profile</th>
                <th className="px-6 py-4">Type & Breed</th>
                <th className="px-6 py-4">Age</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {currentItems.length > 0 ? (
                  currentItems.map((pet) => (
                    <motion.tr
                      layout
                      key={pet.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <td className="px-8 py-4 bg-white group-hover:bg-slate-50 rounded-l-2xl border-y border-l border-transparent group-hover:border-slate-100">
                        <div className="flex items-center gap-4">
                          <img
                            src={pet.image}
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-sm"
                          />
                          <div>
                            <p className="font-bold text-slate-800 text-sm">
                              {pet.name}
                            </p>
                            <p className="text-[10px] text-orange-500 font-black tracking-tighter uppercase">
                              {pet.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 bg-white group-hover:bg-slate-50 border-y border-transparent group-hover:border-slate-100">
                        <p className="font-bold text-slate-700 text-sm">
                          {pet.breed}
                        </p>
                        <p className="text-[10px] text-slate-400 uppercase font-medium">
                          {pet.type}
                        </p>
                      </td>
                      <td className="px-6 py-4 bg-white group-hover:bg-slate-50 border-y border-transparent group-hover:border-slate-100">
                        <span className="font-bold text-slate-600 text-sm">
                          {pet.age}
                        </span>
                      </td>
                      <td className="px-6 py-4 bg-white group-hover:bg-slate-50 border-y border-transparent group-hover:border-slate-100">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5 w-fit ${
                            pet.status === "Available"
                              ? "bg-emerald-50 text-emerald-600"
                              : pet.status === "Adopted"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          {pet.status === "Available" ? (
                            <CheckCircle size={10} />
                          ) : (
                            <Clock size={10} />
                          )}
                          {pet.status}
                        </span>
                      </td>
                      <td className="px-8 py-4 bg-white group-hover:bg-slate-50 rounded-r-2xl border-y border-r border-transparent group-hover:border-slate-100 text-right">
                        <div className="flex justify-end gap-1">
                          <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-orange-500 transition-all">
                            <Edit3 size={16} />
                          </button>
                          <button className="p-2 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition-all">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <td
                      colSpan="5"
                      className="py-20 text-center font-bold text-slate-400"
                    >
                      No pets found for this filter.
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Updated Pagination Section */}
        <div className="flex sm:flex-row flex-col justify-between items-center gap-4 bg-slate-50/50 p-6 border-slate-100 border-t">
          <div className="flex gap-4 font-bold text-slate-400 text-xs">
            <p>
              <span className="text-slate-800">{filteredPets.length}</span>{" "}
              Records Found
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition-all shadow-sm"
            >
              <ChevronLeft size={16} /> Previous
            </button>

            <div className="hidden md:flex bg-white px-4 py-2.5 border border-slate-100 rounded-xl shadow-inner font-black text-xs text-orange-500">
              {currentPage} / {totalPages || 1}
            </div>

            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-orange-500 disabled:bg-slate-200 transition-all shadow-md"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePets;
