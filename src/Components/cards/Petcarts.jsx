"use client";

import Link from "next/link";
import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaPaw,
  FaLongArrowAltRight,
  FaVenusMars,
  FaSearch,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

// --- PetCard Component ---
export const PetCard = ({ pet }) => {
  const petId = pet._id?.toString() || pet.id;

  return (
    <div className="group relative flex flex-col bg-white shadow-md hover:shadow-2xl border border-gray-100 rounded-3xl overflow-hidden transition-all hover:-translate-y-2 duration-500">
      <div className="relative bg-gray-100 w-full h-64 sm:h-72 overflow-hidden">
        <Image
          src={pet.images?.[0] || pet.image || "https://placehold.co/600x400/png?text=No+Image"}
          alt={pet.name || "Pet"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="top-3 sm:top-4 left-3 sm:left-4 absolute flex items-center gap-2 bg-white/90 shadow-sm backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-[9px] text-orange-600 sm:text-[10px] uppercase tracking-widest">
          <FaPaw size={10} className="sm:size-3" />
          {pet.species || pet.category || "Pet"}
        </div>

        <div className="bottom-3 sm:bottom-4 left-3 sm:left-4 absolute flex items-center gap-1.5 bg-orange-500 shadow-lg px-2.5 py-1 rounded-lg font-bold text-[10px] text-white sm:text-xs">
          <FaVenusMars size={10} />
          {pet.gender || "Unknown"}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <div className="flex justify-between items-start gap-2 mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 group-hover:text-orange-600 text-xl sm:text-2xl truncate transition-colors">
              {pet.name}
            </h3>
            <p className="font-medium text-gray-400 text-xs sm:text-sm truncate">
              {pet.breed || "Mixed Breed"}
            </p>
          </div>
          <div className={`shrink-0 rounded-md px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase ${pet.status === "Available" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
            {pet.status || "Available"}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 mb-5">
          <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 border border-gray-100 rounded-full text-[10px] sm:text-xs">
            <span className="font-medium text-gray-400 uppercase">Age:</span>
            <span className="font-bold text-gray-700">{pet.ageYears || "N/A"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500 sm:text-xs">
            <FaMapMarkerAlt className="text-orange-400" />
            <span className="max-w-[80px] sm:max-w-[120px] font-semibold truncate">{pet.location || "Not specified"}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-auto pt-4 border-gray-100 border-t">
          <Link href={`/all-pets/${petId}`} className="font-black text-[10px] text-gray-400 sm:text-[11px] group-hover:text-orange-600 uppercase tracking-[1.5px] sm:tracking-[2px] transition-all">
            Meet {pet.name}
          </Link>
          <Link href={`/all-pets/${petId}`} className="flex justify-center items-center bg-gray-100 group-hover:bg-orange-500 rounded-xl w-9 sm:w-10 h-9 sm:h-10 text-gray-400 group-hover:text-white transition-all group-hover:translate-x-1 duration-300">
            <FaLongArrowAltRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- Main Petcarts Component ---
const Petcarts = ({ pets = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest First");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const sortRef = useRef(null);
  const PETS_PER_PAGE = 12;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setIsSortOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredPets = useMemo(() => {
    let result = Array.isArray(pets) ? [...pets] : [];
    if (searchQuery) {
      result = result.filter(p => 
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.breed?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory !== "All") {
      result = result.filter(p => (p.species || p.category)?.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (sortBy === "Name: A-Z") result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    else if (sortBy === "Name: Z-A") result.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    else if (sortBy === "Age: Youngest") result.sort((a, b) => parseFloat(a.ageYears || 0) - parseFloat(b.ageYears || 0));
    else if (sortBy === "Age: Oldest") result.sort((a, b) => parseFloat(b.ageYears || 0) - parseFloat(a.ageYears || 0));
    else if (sortBy === "Newest First") result.reverse();
    return result;
  }, [pets, searchQuery, selectedCategory, sortBy]);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredPets.length / PETS_PER_PAGE);
  const paginatedPets = filteredPets.slice((currentPage - 1) * PETS_PER_PAGE, currentPage * PETS_PER_PAGE);
  const categories = ["All", "Dog", "Cat", "Bird", "Rabbit"];
  const sortOptions = ["Newest First", "Name: A-Z", "Name: Z-A", "Age: Youngest", "Age: Oldest"];

  return (
    <div id="petCat" className="bg-gray-50/50 pb-20 min-h-screen font-sans">
      <div className="bg-gradient-to-b from-orange-50/50 to-transparent px-4 lg:px-8 pt-12 sm:pt-20">
        
        <div className="flex md:flex-row flex-col justify-between items-start md:items-end gap-6 mx-auto mb-10 sm:mb-16 max-w-7xl">
          <div className="w-full max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white shadow-sm mb-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-[9px] text-orange-600 sm:text-[10px] uppercase tracking-widest">
              <span className="bg-orange-500 rounded-full w-2 h-2 animate-pulse"></span>
              Waiting for a forever home
            </div>
            <h2 className="font-extrabold text-gray-900 text-4xl sm:text-5xl lg:text-7xl text-balance leading-[1.1] tracking-tighter">
              Find Your New <br />
              <span className="inline-block relative text-orange-500">Best Friend</span>
            </h2>
          </div>
          <div className="w-full max-w-md">
            <p className="text-gray-500 text-base sm:text-lg text-left md:text-right leading-relaxed">
              Every paw leaves a footprint. Browse our gallery of loving pets waiting for a home like yours.
            </p>
          </div>
        </div>

        {/* Filter Bar - Added z-index to parent container */}
        <div className="z-[100] relative bg-white/80 shadow-orange-100/20 shadow-xl backdrop-blur-md mx-auto mb-10 p-4 lg:p-6 border border-white rounded-3xl lg:rounded-[2.5rem] max-w-7xl">
          <div className="flex lg:flex-row flex-col items-center gap-4">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Search name or breed..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-100/50 py-3.5 sm:py-4 pr-4 pl-11 border border-transparent focus:border-orange-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/5 w-full text-sm transition-all"
              />
              <FaSearch className="top-1/2 left-4 absolute text-gray-400 -translate-y-1/2" size={14} />
            </div>

            <div className="flex lg:flex-wrap justify-start sm:justify-center gap-2 pb-2 lg:pb-0 w-full lg:w-auto overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap rounded-xl sm:rounded-2xl px-5 py-2.5 sm:px-6 sm:py-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all active:scale-95 ${
                    selectedCategory === cat ? "bg-gray-900 text-white shadow-lg" : "bg-gray-100 text-gray-500 hover:bg-orange-500 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown - Added high z-index and absolute positioning fix */}
            <div className="relative w-full lg:w-60" ref={sortRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex justify-between items-center bg-gray-100/50 px-5 py-3.5 sm:py-4 border border-transparent rounded-2xl w-full font-bold text-gray-600 text-xs sm:text-sm transition-all"
              >
                <span className="truncate">Sort: {sortBy}</span>
                <FaChevronDown className={`ml-2 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} size={12} />
              </button>

              {isSortOpen && (
                <div className="top-full right-0 z-[110] absolute bg-white shadow-2xl mt-2 p-2 border border-gray-100 rounded-2xl w-full min-w-[200px] overflow-hidden origin-top">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSortBy(opt); setIsSortOpen(false); }}
                      className={`w-full rounded-xl px-4 py-3 text-left text-xs font-bold transition-colors ${sortBy === opt ? "bg-orange-500 text-white shadow-md" : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info & Grid - Ensure lower stacking context */}
        <div className="z-10 relative mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-6 px-2">
            <p className="font-bold text-[10px] text-gray-400 sm:text-xs uppercase tracking-widest">
              Found <span className="text-gray-900">{filteredPets.length} pets</span>
            </p>
          </div>

          <div className="gap-6 sm:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedPets.length > 0 ? (
              paginatedPets.map((pet) => <PetCard key={pet._id} pet={pet} />)
            ) : (
              <div className="col-span-full py-20 text-center">
                <FaPaw className="mx-auto mb-4 text-gray-200 text-7xl" />
                <h3 className="font-bold text-gray-400 text-xl tracking-tighter">No furry friends found matching your search.</h3>
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mx-auto mt-16">
            <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="bg-white disabled:opacity-30 shadow-sm p-3 border border-gray-200 rounded-xl active:scale-90 transition-all">
              <FaChevronLeft size={12} />
            </button>
            <div className="flex items-center bg-white shadow-sm px-4 border border-gray-100 rounded-xl h-10 font-bold text-sm">
              <span className="text-orange-600">{currentPage}</span>
              <span className="mx-2 text-gray-300">/</span>
              <span className="text-gray-600">{totalPages}</span>
            </div>
            <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="bg-white disabled:opacity-30 shadow-sm p-3 border border-gray-200 rounded-xl active:scale-90 transition-all">
              <FaChevronRight size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Petcarts;