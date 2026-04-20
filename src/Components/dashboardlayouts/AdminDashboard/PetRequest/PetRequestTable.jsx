"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import {
  Search,
  Eye,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Mail,
} from "lucide-react";
import { ApprovePet, RejectPet } from "@/action/server/pets";
import Swal from "sweetalert2";
import RequestPetDetailsModal from "./RequestPetDetailsModal";

const PetRequestTable = ({ initialRequests }) => {
  const [requests, setRequests] = useState(initialRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [selectedPet, setSelectedPet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search logic
  const filteredRequests = useMemo(() => {
    return requests.filter(
      (req) =>
        req.petName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.species?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [requests, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const currentItems = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );


  // Approve Handler
  const handleApprove = async (id) => {
    const confirm = await Swal.fire({
      title: "Approve this pet?",
      text: "It will be moved to the main pet collection.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      confirmButtonText: "Yes, Approve!",
    });

    if (confirm.isConfirmed) {
      const original = [...requests];
      setRequests((prev) => prev.filter((r) => r._id !== id)); // Optimistic UI

      const res = await ApprovePet(id);
      if (!res.success) {
        setRequests(original); // Rollback if failed
        Swal.fire("Error", res.error, "error");
      } else {
        Swal.fire({
          icon: "success",
          title: "Approved!",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    }
  };

  // Reject Handler
  const handleReject = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This request will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Reject!",
    });

    if (confirm.isConfirmed) {
      const original = [...requests];
      setRequests((prev) => prev.filter((r) => r._id !== id)); // Optimistic UI

      const res = await RejectPet(id);
      if (!res.success) {
        setRequests(original);
        Swal.fire("Error", res.error, "error");
      } else {
        Swal.fire({
          icon: "success",
          title: "Rejected!",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    }
  };

  const handleViewDetails = (pet) => {
    setSelectedPet(pet); // Full pet object is stored here
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-lg">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search requests..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-4 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl outline-none shadow-sm focus:ring-4 focus:ring-orange-500/10 transition-all"
        />
      </div>

      {/* Table Content */}
      <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[10px] text-slate-400 font-black uppercase tracking-widest px-8">
                <th className="px-8 py-4">Pet Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-center">Current Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((req) => (
                <motion.tr
                  layout
                  key={req._id}
                  className="group hover:bg-slate-50 transition-colors"
                >
                  {/* 1. Pet Profile (Image & Name) */}
                  <td className="px-8 py-4 rounded-l-2xl">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 overflow-hidden rounded-xl ring-2 ring-slate-100">
                        <Image
                          src={req.images?.[0] || "/placeholder-pet.png"}
                          alt={req.petName || "Pet Image"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-800">
                          {req.petName}
                        </p>
                        <p className="text-[10px] text-orange-500 font-black uppercase tracking-tighter">
                          ID: {req._id.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* 2. Species & Breed */}
                  <td className="px-6 py-4">
                    <p className="font-bold text-sm text-slate-700">
                      {req.species}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium truncate max-w-[120px]">
                      {req.breed}
                    </p>
                  </td>

                  {/* 3. Applicant/Owner Info */}
                  <td className="px-6 py-4">
                    <p className="font-bold text-xs text-slate-700">
                      {req.ownerName}
                    </p>
                    <div className="flex items-center gap-1 text-slate-400">
                      <Mail size={10} />
                      <p className="text-[10px] italic">{req.email}</p>
                    </div>
                  </td>

                  {/* 4. Health & Status */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${req.healthCondition === "Excellent"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-blue-50 text-blue-600"
                        }`}
                    >
                      {req.healthCondition}
                    </span>
                  </td>

                  {/* 5. Actions */}
                  <td className="px-8 py-4 text-right rounded-r-2xl">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleViewDetails(req)} // Pass full data to modal
                        className="p-2.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleApprove(req._id)}
                        className="p-2.5 text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={() => handleReject(req._id)}
                        className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {filteredRequests.length === 0 && (
            <div className="text-center py-20">
              <Inbox className="mx-auto text-slate-200 mb-4" size={48} />
              <p className="text-slate-400 font-bold">
                No requests available at the moment.
              </p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center p-6 border-t border-slate-50 bg-slate-50/30">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
            Page {currentPage} of {totalPages || 1}
          </p>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-2 bg-white border border-slate-200 rounded-xl disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-2 bg-slate-900 text-white rounded-xl disabled:bg-slate-200"
            >
              <ChevronRight size={18} />
            </button>
            <RequestPetDetailsModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              pet={selectedPet}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetRequestTable;
