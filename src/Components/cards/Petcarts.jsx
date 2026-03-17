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
} from "react-icons/fa";

// --- PetCard Component (Unchanged) ---
export const PetCard = ({ pet }) => {
  const petId = pet._id?.toString() || pet.id;

  return (
    <div className="group relative flex flex-col bg-white shadow-md hover:shadow-2xl border border-gray-100 rounded-3xl overflow-hidden transition-all hover:-translate-y-2 duration-500">
      <div className="relative bg-gray-100 w-full h-72 overflow-hidden">
        <Image
          src={pet.images?.[0] || pet.image || "https://placehold.co/600x400/png?text=No+Image"}
          alt={pet.name || "Pet"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="top-4 left-4 absolute flex items-center gap-2 bg-white/90 shadow-sm backdrop-blur-md px-4 py-1.5 rounded-full font-bold text-[10px] text-orange-600 uppercase tracking-wider">
          <FaPaw size={12} />
          {pet.species || pet.category || "Pet"}
        </div>

        <div className="bottom-4 left-4 absolute flex items-center gap-1.5 bg-orange-500 shadow-lg px-3 py-1 rounded-lg font-bold text-white text-xs">
          <FaVenusMars size={12} />
          {pet.gender || "Unknown"}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 group-hover:text-orange-600 text-2xl truncate transition-colors">
              {pet.name}
            </h3>
            <p className="font-medium text-gray-400 text-sm truncate italic">
              {pet.breed || "Mixed Breed"}
            </p>
          </div>
          <div className={`shrink-0 px-2.5 py-1 rounded-md font-bold text-[10px] uppercase ${pet.status === "Available" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
            {pet.status || "Available"}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 border border-gray-100 rounded-full text-xs">
            <span className="font-medium text-gray-400 uppercase">Age:</span>
            <span className="font-bold text-gray-700">{pet.ageYears || "N/A"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <FaMapMarkerAlt className="text-orange-400" />
            <span className="max-w-[100px] font-semibold truncate">{pet.location || "Not specified"}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-auto pt-5 border-gray-100 border-t">
          <Link href={`/all-pets/${petId}`} className="font-black text-[11px] text-gray-400 group-hover:text-orange-600 uppercase tracking-[2px] transition-all">
            Meet {pet.name}
          </Link>
          <Link href={`/all-pets/${petId}`} className="flex justify-center items-center bg-gray-100 group-hover:bg-orange-500 rounded-xl w-10 h-10 text-gray-400 group-hover:text-white transition-all group-hover:translate-x-1 duration-300">
            <FaLongArrowAltRight size={20} />
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
  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredPets = useMemo(() => {
    let result = Array.isArray(pets) ? [...pets] : [];

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (pet) =>
          pet.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pet.breed?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter(
        (pet) => (pet.species || pet.category)?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Full Sorting Logic
    if (sortBy === "Name: A-Z") {
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (sortBy === "Name: Z-A") {
      result.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    } else if (sortBy === "Age: Youngest") {
      result.sort((a, b) => parseFloat(a.ageYears || 0) - parseFloat(b.ageYears || 0));
    } else if (sortBy === "Age: Oldest") {
      result.sort((a, b) => parseFloat(b.ageYears || 0) - parseFloat(a.ageYears || 0));
    } else if (sortBy === "Newest First") {
      // Assuming _id or a createdAt field exists for newest first
      result.reverse(); 
    }

    return result;
  }, [pets, searchQuery, selectedCategory, sortBy]);

  const categories = ["All", "Dog", "Cat", "Bird", "Rabbit"];
  
  // All Sort Options Returned
  const sortOptions = [
    "Newest First",
    "Name: A-Z",
    "Name: Z-A",
    "Age: Youngest",
    "Age: Oldest"
  ];

  return (
    <div className="bg-gray-50/50 min-h-screen font-sans">
      <div className="bg-gradient-to-b from-orange-50/50 to-transparent px-4 sm:px-8 py-20">
        
        {/* Header section */}
        <div className="flex md:flex-row flex-col justify-between items-start md:items-end gap-8 mx-auto mb-16 max-w-7xl">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white shadow-sm mb-4 px-4 py-2 rounded-full font-bold text-[10px] text-orange-600 uppercase tracking-widest">
              <span className="bg-orange-500 rounded-full w-2 h-2 animate-pulse"></span>
              Waiting for a forever home
            </div>
            <h2 className="font-extrabold text-gray-900 text-5xl lg:text-7xl text-balance leading-[1.1] tracking-tighter">
              Find Your New <br />
              <span className="inline-block relative text-orange-500">
                Best Friend
                <svg className="-bottom-2 left-0 -z-10 absolute w-full h-4 text-orange-200" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,10 Q50,0 100,10" stroke="currentColor" strokeWidth="6" fill="none" />
                </svg>
              </span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-gray-500 text-lg text-start md:text-end italic leading-relaxed">
              Every paw leaves a footprint in our hearts. Browse our gallery of loving pets waiting for a home like yours.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white/80 shadow-orange-100/20 shadow-xl backdrop-blur-md mx-auto mb-12 p-4 lg:p-6 border border-white rounded-[2.5rem] max-w-7xl transition-all duration-300">
          <div className="flex lg:flex-row flex-col items-center gap-6">
            
            {/* Search */}
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Search by name or breed..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-100/50 py-4 pr-4 pl-12 border border-transparent focus:border-orange-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/5 w-full transition-all"
              />
              <FaSearch className="top-1/2 left-4 absolute text-gray-400 -translate-y-1/2" />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all active:scale-95 ${
                    selectedCategory === cat
                      ? "bg-gray-900 text-white shadow-lg"
                      : "bg-gray-100 text-gray-500 hover:bg-orange-500 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown (All options restored) */}
            <div className="relative w-full lg:w-64" ref={sortRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex justify-between items-center bg-gray-100/50 px-6 py-4 border border-transparent hover:border-gray-200 rounded-2xl w-full font-bold text-gray-600 text-sm transition-all"
              >
                <span className="truncate">Sort: {sortBy}</span>
                <FaChevronDown className={`ml-2 shrink-0 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
              </button>
              
              {isSortOpen && (
                <div className="top-full right-0 z-50 absolute bg-white shadow-2xl mt-3 p-2 border border-gray-100 rounded-2xl w-full min-w-[200px] overflow-hidden animate-in duration-200 fade-in zoom-in">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                        sortBy === option ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Grid Section */}
        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-7xl">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <PetCard key={pet._id?.toString() || pet.id} pet={pet} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="flex justify-center mb-4">
                <FaPaw className="opacity-10 text-gray-400 text-9xl animate-pulse" />
              </div>
              <h3 className="font-bold text-gray-800 text-2xl">No furry friends found</h3>
              <p className="text-gray-400 italic">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Petcarts;