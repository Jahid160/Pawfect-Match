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
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative h-72 w-full overflow-hidden bg-gray-100">
        <Image
          src={
            pet.images?.[0] ||
            pet.image ||
            "https://placehold.co/600x400/png?text=No+Image"
          }
          alt={pet.name || "Pet"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-orange-600 shadow-sm backdrop-blur-md">
          <FaPaw size={12} />
          {pet.species || pet.category || "Pet"}
        </div>

        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-lg bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
          <FaVenusMars size={12} />
          {pet.gender || "Unknown"}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="truncate text-2xl font-bold text-gray-800 transition-colors group-hover:text-orange-600">
              {pet.name}
            </h3>
            <p className="truncate text-sm font-medium italic text-gray-400">
              {pet.breed || "Mixed Breed"}
            </p>
          </div>

          <div
            className={`shrink-0 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase ${
              pet.status === "Available"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {pet.status || "Available"}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-3 py-1 text-xs">
            <span className="font-medium uppercase text-gray-400">Age:</span>
            <span className="font-bold text-gray-700">{pet.ageYears || "N/A"}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <FaMapMarkerAlt className="text-orange-400" />
            <span className="max-w-[100px] truncate font-semibold">
              {pet.location || "Not specified"}
            </span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-5">
          <Link
            href={`/all-pets/${petId}`}
            className="text-[11px] font-black uppercase tracking-[2px] text-gray-400 transition-all group-hover:text-orange-600"
          >
            Meet {pet.name}
          </Link>

          <Link
            href={`/all-pets/${petId}`}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-400 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-orange-500 group-hover:text-white"
          >
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
  const [currentPage, setCurrentPage] = useState(1);

  const sortRef = useRef(null);

  const PETS_PER_PAGE = 12;

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
        (pet) =>
          (pet.species || pet.category)?.toLowerCase() ===
          selectedCategory.toLowerCase()
      );
    }

    // Sorting
    if (sortBy === "Name: A-Z") {
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (sortBy === "Name: Z-A") {
      result.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    } else if (sortBy === "Age: Youngest") {
      result.sort(
        (a, b) => parseFloat(a.ageYears || 0) - parseFloat(b.ageYears || 0)
      );
    } else if (sortBy === "Age: Oldest") {
      result.sort(
        (a, b) => parseFloat(b.ageYears || 0) - parseFloat(a.ageYears || 0)
      );
    } else if (sortBy === "Newest First") {
      result.reverse();
    }

    return result;
  }, [pets, searchQuery, selectedCategory, sortBy]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredPets.length / PETS_PER_PAGE);

  const paginatedPets = useMemo(() => {
    const startIndex = (currentPage - 1) * PETS_PER_PAGE;
    const endIndex = startIndex + PETS_PER_PAGE;
    return filteredPets.slice(startIndex, endIndex);
  }, [filteredPets, currentPage]);

  const categories = ["All", "Dog", "Cat", "Bird", "Rabbit"];

  const sortOptions = [
    "Newest First",
    "Name: A-Z",
    "Name: Z-A",
    "Age: Youngest",
    "Age: Oldest",
  ];

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      <div className="bg-gradient-to-b from-orange-50/50 to-transparent px-4 py-20 sm:px-8">
        {/* Header section */}
        <div className="mx-auto mb-16 flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-orange-600 shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500"></span>
              Waiting for a forever home
            </div>

            <h2 className="text-balance text-5xl font-extrabold leading-[1.1] tracking-tighter text-gray-900 lg:text-7xl">
              Find Your New <br />
              <span className="relative inline-block text-orange-500">
                Best Friend
                <svg
                  className="absolute -bottom-2 left-0 -z-10 h-4 w-full text-orange-200"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,10 Q50,0 100,10"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-start text-lg italic leading-relaxed text-gray-500 md:text-end">
              Every paw leaves a footprint in our hearts. Browse our gallery of
              loving pets waiting for a home like yours.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mx-auto mb-12 max-w-7xl rounded-[2.5rem] border border-white bg-white/80 p-4 shadow-xl shadow-orange-100/20 backdrop-blur-md transition-all duration-300 lg:p-6">
          <div className="flex flex-col items-center gap-6 lg:flex-row">
            {/* Search */}
            <div className="relative w-full flex-1">
              <input
                type="text"
                placeholder="Search by name or breed..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-transparent bg-gray-100/50 py-4 pl-12 pr-4 transition-all focus:border-orange-200 focus:outline-none focus:ring-4 focus:ring-orange-500/5"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-2xl px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all active:scale-95 ${
                    selectedCategory === cat
                      ? "bg-gray-900 text-white shadow-lg"
                      : "bg-gray-100 text-gray-500 hover:bg-orange-500 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full lg:w-64" ref={sortRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex w-full items-center justify-between rounded-2xl border border-transparent bg-gray-100/50 px-6 py-4 text-sm font-bold text-gray-600 transition-all hover:border-gray-200"
              >
                <span className="truncate">Sort: {sortBy}</span>
                <FaChevronDown
                  className={`ml-2 shrink-0 transition-transform duration-300 ${
                    isSortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isSortOpen && (
                <div className="animate-in fade-in zoom-in absolute right-0 top-full z-50 mt-3 w-full min-w-[200px] overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl duration-200">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsSortOpen(false);
                      }}
                      className={`w-full rounded-xl px-4 py-3 text-left text-sm font-bold transition-colors ${
                        sortBy === option
                          ? "bg-orange-500 text-white"
                          : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
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

        {/* Result count */}
        <div className="mx-auto mb-8 flex max-w-7xl items-center justify-between">
          <p className="text-sm font-semibold text-gray-500">
            Showing{" "}
            <span className="text-orange-500">{paginatedPets.length}</span> of{" "}
            <span className="text-gray-800">{filteredPets.length}</span> pets
          </p>
          {totalPages > 1 && (
            <p className="text-sm font-semibold text-gray-500">
              Page <span className="text-gray-800">{currentPage}</span> of{" "}
              <span className="text-gray-800">{totalPages}</span>
            </p>
          )}
        </div>

        {/* Grid Section */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedPets.length > 0 ? (
            paginatedPets.map((pet) => (
              <PetCard key={pet._id?.toString() || pet.id} pet={pet} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="mb-4 flex justify-center">
                <FaPaw className="animate-pulse text-9xl text-gray-400 opacity-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                No furry friends found
              </h3>
              <p className="italic text-gray-400">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredPets.length > PETS_PER_PAGE && (
          <div className="mx-auto mt-14 flex max-w-7xl flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-600 shadow-sm transition hover:border-orange-200 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FaChevronLeft size={12} />
              Prev
            </button>

            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span
                  key={`dots-${index}`}
                  className="px-2 text-sm font-bold text-gray-400"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-11 min-w-[44px] rounded-2xl px-4 text-sm font-bold transition ${
                    currentPage === page
                      ? "bg-orange-500 text-white shadow-lg"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-orange-200 hover:text-orange-500"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-600 shadow-sm transition hover:border-orange-200 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
              <FaChevronRight size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Petcarts;
