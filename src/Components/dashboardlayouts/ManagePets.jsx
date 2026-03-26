"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  Filter,
  Eye,
  Check,
  X,
} from "lucide-react";
import {
  DeletePets,
  UpdatePetStatus,
  UpdatePetStatusReject,
} from "@/action/server/pets";
import Image from "next/image";
import Swal from "sweetalert2";
import PetDetailsModal from "./PetDetailsModal";
import PetProfileModal from "./AdminDashboard/PetMangeMent/PetProfileModal";
import { getAdoptionUserByCode } from "@/action/server/Adoptionuser";
import { useRouter } from "next/navigation";

const ManagePets = ({ initialPets }) => {
  const [pets, setPets] = useState(initialPets);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedProfilePet, setSelectedProfilePet] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType, filterStatus]);

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      const matchesSearch =
        pet.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        filterType === "All" ||
        pet.type?.toLowerCase() === filterType.toLowerCase();

      const matchesStatus =
        filterStatus === "All Status" || pet.status === filterStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [pets, searchTerm, filterType, filterStatus]);

  const totalPages = Math.ceil(filteredPets.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPets.slice(indexOfFirstItem, indexOfLastItem);;
  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };
  const router = useRouter();
  const handleApprove = async (id) => {
    // 1️⃣ Update UI immediately
    setPets((prev) =>
      prev.map((pet) => (pet._id === id ? { ...pet, status: "Adopted" } : pet)),
    );

    // 2️⃣ Call server action
    const result = await UpdatePetStatus(id);

    if (!result.success) {
      // rollback if server fails
      setPets((prev) =>
        prev.map((pet) =>
          pet._id === id ? { ...pet, status: "Pending" } : pet,
        ),
      );
      alert("Failed to update status");
    }
  };
  const handleReject = async (pet) => {
    const id = pet._id;
    const code = pet.adoptionCode;
    setPets((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, status: "Rejected" } : item,
      ),
    );

    const result = await UpdatePetStatusReject(id, code);

    if (!result.success) {
      setPets((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: "Pending" } : item,
        ),
      );
      alert(result.message || "Something went wrong");
    }
  };
  const handleEdit = (id) => {
    router.push(`/dashboard/manage-pets/petEdit/${id}`);
  };
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    // 1️⃣ Optimistic UI update
    const originalPets = [...pets];
    setPets((prev) => prev.filter((pet) => pet._id !== id));

    // 2️⃣ Call server action
    const result = await DeletePets(id);

    // 3️⃣ Handle result
    if (!result.success) {
      setPets(originalPets);

      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: result.message || "Failed to delete pet",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Pet has been deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };
  const handleApproveEye = async (pet) => {
    const userData = await getAdoptionUserByCode(pet.adoptionCode);
    setSelectedPet(userData.data);
    setIsModalOpen(true);
  };
  const handleAvailableEye = (pet) => {
    setSelectedProfilePet(pet);
    setIsProfileModalOpen(true);
  };
  // pihyl@mailinator.com
  return (
    <div className="bg-[#F8FAFC] p-6 lg:p-10 min-h-screen font-sans text-slate-900">
      {/* HEADER */}
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="flex items-center gap-3 font-black text-slate-900 text-4xl tracking-tight">
            Manage{" "}
            <span className="text-orange-500 underline decoration-8 decoration-orange-100 underline-offset-[-2px]">
              Pets
            </span>
          </h1>
          <p className="mt-2 font-medium text-slate-500">
            Showing {filteredPets.length} pets from database.
          </p>
        </div>
        <button className="group flex justify-center items-center gap-2 bg-orange-500 hover:bg-slate-900 shadow-lg px-8 py-4 rounded-2xl font-black text-white transition-all">
          <Plus
            size={20}
            className="group-hover:rotate-90 transition-transform"
          />
          Add New Pet
        </button>
      </div>

      {/* TOOLBAR */}
      <div className="flex lg:flex-row flex-col gap-4 mb-8">
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
            className="bg-white shadow-sm py-4 pr-4 pl-12 border border-slate-200 rounded-2xl outline-none w-full font-medium transition-all focus:ring-4 focus:ring-orange-500/10"
          />
        </div>

        <div className="relative">
          <Filter
            className="top-1/2 left-4 absolute text-slate-400 -translate-y-1/2 pointer-events-none"
            size={16}
          />
          <select
            value={filterStatus}
            onChange={(e) =>
              handleFilterChange(setFilterStatus, e.target.value)
            }
            className="bg-white shadow-sm py-4 pr-8 pl-11 border border-slate-200 rounded-2xl font-bold text-slate-600 text-xs outline-none cursor-pointer appearance-none"
          >
            <option value="All Status">All Status</option>
            <option value="Available">Available</option>
            <option value="pending">Pending</option>
            <option value="adopted">Adopted</option>
          </select>
        </div>

        <div className="flex bg-white shadow-sm p-1 border border-slate-100 rounded-2xl">
          {["All", "Dog", "Cat", "Fish"].map((type) => (
            <button
              key={type}
              onClick={() => handleFilterChange(setFilterType, type)}
              className={`px-6 py-2 rounded-xl font-bold text-xs transition-all ${filterType === type
                ? "bg-slate-900 text-white shadow-md"
                : "text-slate-400 hover:text-slate-600"
                }`}
            >
              {type === "All" ? "All" : `${type}s`}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-sm border border-slate-100 rounded-[2.5rem] overflow-hidden">
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-4">Pet Profile</th>
                <th className="px-6 py-4">Type & Breed</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {currentItems.map((pet) => (
                  <motion.tr
                    layout
                    key={pet._id}
                    className="group hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-8 py-4 rounded-l-2xl">
                      <div className="flex items-center gap-4">
                        <Image
                          width={12}
                          height={12}
                          src={pet?.image}
                          className="w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-sm"
                          alt=""
                        />
                        <div>
                          <p className="font-bold text-sm">{pet.name}</p>
                          <p className="text-[10px] text-orange-500 font-black tracking-tighter">
                            {pet._id?.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-bold text-sm">{pet.breed}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-black">
                        {pet.type}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5 w-fit ${pet.status === "Available" || pet.status === "available"
                          ? "bg-emerald-50 text-emerald-600"
                          : pet.status === "adopted"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-amber-50 text-amber-600"
                          }`}
                      >
                        {pet.status === "Available" || pet.status === "available" ? (
                          <CheckCircle size={10} />
                        ) : (
                          <Clock size={10} />
                        )}
                        {pet.status}
                      </span>
                    </td>

                    {/* ACTION BUTTONS WITH DYNAMIC LOGIC */}
                    <td className="px-8 py-4 text-right rounded-r-2xl">
                      <div className="flex justify-end gap-1">
                        {pet.status.toLowerCase() === "pending" && (
                          <>
                            {/* Approve (Pending -> Adopted) */}
                            <button
                              onClick={() => handleApprove(pet._id)}
                              title="Approve"
                              className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"
                            >
                              <Check size={16} />
                            </button>

                            {/* Reject (Pending -> Available) */}
                            <button
                              onClick={() => handleReject(pet)}
                              title="Reject"
                              className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                            >
                              <X size={16} />
                            </button>
                            <button
                              onClick={() => handleApproveEye(pet)}
                              className="p-2 "
                            >
                              <Eye size={16} />
                            </button>
                          </>
                        )}

                        {pet.status.toLowerCase() === "available" && (
                          <>
                            {/* Edit */}
                            <button
                              onClick={() => handleEdit(pet._id)}
                              title="Edit"
                              className="p-2 text-slate-400 hover:text-orange-500 transition-all"
                            >
                              <Edit3 size={16} />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(pet._id)}
                              title="Delete"
                              className="p-2 text-slate-400 hover:text-rose-600 transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                            <button className="p-2 ">
                              <Eye
                                onClick={() => handleAvailableEye(pet)}
                                size={16}
                              />
                            </button>
                          </>
                        )}

                        {pet.status.toLowerCase() === "adopted" && (
                          <>
                            {/* Edit Disabled */}
                            <button
                              disabled
                              title="Adopted pets cannot be edited"
                              className="p-2 text-slate-200 cursor-not-allowed transition-all"
                            >
                              <Edit3 size={16} />
                            </button>

                            {/* Delete Disabled */}
                            <button
                              onClick={() => handleReject(pet)}
                              title="Reject"
                              className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                            <button
                              onClick={() => handleApproveEye(pet)}
                              className="p-2 "
                            >
                              <Eye size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex sm:flex-row flex-col justify-between items-center gap-4 bg-slate-50/50 p-6 border-slate-100 border-t">
          <p className="font-bold text-slate-400 text-xs">
            <span className="text-slate-800">{filteredPets.length}</span>{" "}
            Records Found
          </p>
          <div className="flex items-center gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-700 hover:bg-slate-50 disabled:opacity-50 shadow-sm transition-all"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-orange-500 disabled:bg-slate-200 shadow-md transition-all"
            >
              Next <ChevronRight size={16} />
            </button>
            <PetDetailsModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              petData={selectedPet}
            />
            <PetProfileModal
              isOpen={isProfileModalOpen}
              onClose={() => setIsProfileModalOpen(false)}
              pet={selectedProfilePet}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePets;
