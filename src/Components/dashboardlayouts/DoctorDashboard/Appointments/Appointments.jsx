"use client";
import React, { useState, useMemo } from "react";
import {
  CalendarDays,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  Filter,
  Search,
  Eye,
  MapPin,
  Mail,
  MoreHorizontal,
} from "lucide-react";
import { useRouter } from "next/navigation";
import AppointmentModal from "./AppointmentModal";
import { completedOrder, deleteOrder } from "@/action/doctorServerDash/vaccin";
import Swal from "sweetalert2";

const Appointments = ({ appointments = [] }) => {
  const [selectedApt, setSelectedApt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);

  // --- Search & Pagination States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // এক পেজে কয়টি ডাটা দেখাবে

  // 1. Filter Logic (Search by Name, Email, or Vaccine)
  const filteredData = useMemo(() => {
    return appointments.filter((apt) => {
      const searchStr = searchQuery.toLowerCase();
      return (
        apt.userName?.toLowerCase().includes(searchStr) ||
        apt.userEmail?.toLowerCase().includes(searchStr) ||
        apt.vaccineName?.toLowerCase().includes(searchStr)
      );
    });
  }, [appointments, searchQuery]);

  // 2. Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // --- Your Existing Handlers ---
  const handleAccept = async (id) => {
    const result = await Swal.fire({
      title: "Confirm Completion?",
      text: "Are you sure you want to mark this appointment as completed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "oklch(75% 0.15 150)",
      cancelButtonColor: "oklch(95% 0.02 60)",
      confirmButtonText: "Yes, complete it!",
      cancelButtonText: "No, go back",
      background: "oklch(100% 0 0)",
      color: "oklch(25% 0.02 60)",
    });

    if (!result.isConfirmed) return;
    setLoadingId(id);

    try {
      const response = await completedOrder(id);
      if (response.success) {
        router.refresh();
        Swal.fire({
          title: "Accepted!",
          text: "The appointment has been marked as completed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This appointment will be permanently rejected!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "oklch(65% 0.22 25)",
      cancelButtonColor: "oklch(95% 0.02 60)",
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "No, keep it",
    });

    if (!result.isConfirmed) return;
    setLoadingId(id);

    try {
      const response = await deleteOrder(id);
      if (response.success) {
        router.refresh();
        Swal.fire({
          title: "Rejected!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  const handleEye = (data) => {
    setSelectedApt(data);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 md:p-10 bg-base-200 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-neutral tracking-tight uppercase">
              Appointment <span className="text-primary">Registry</span>
            </h1>
            <p className="text-neutral/40 font-bold text-[10px] uppercase tracking-[0.3em] mt-1">
              Internal Medical Record System v2.0
            </p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/30"
                size={18}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // সার্চ করলে পেজিনেশন ১ এ রিসেট হবে
                }}
                placeholder="Filter by name, email or vaccine..."
                className="input input-bordered bg-base-100 border-none rounded-2xl w-full md:w-80 font-medium shadow-sm focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button className="btn btn-square bg-base-100 border-none hover:bg-base-300 shadow-sm">
              <Filter size={20} className="text-neutral/60" />
            </button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="bg-base-100 rounded-[2.5rem] shadow-xl overflow-hidden border border-base-300">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full border-separate border-spacing-0">
              <thead className="bg-base-200/50">
                <tr className="text-neutral/40 border-b border-base-300">
                  <th className="py-6 px-8 text-[10px] font-black uppercase tracking-widest">
                    Patient Details
                  </th>
                  <th className="py-6 px-6 text-[10px] font-black uppercase tracking-widest text-center">
                    Vaccine Info
                  </th>
                  <th className="py-6 px-6 text-[10px] font-black uppercase tracking-widest text-center">
                    Deadline
                  </th>
                  <th className="py-6 px-6 text-[10px] font-black uppercase tracking-widest text-center">
                    Status
                  </th>
                  <th className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="text-neutral">
                {currentItems.map((apt) => (
                  <tr
                    key={apt._id}
                    className="hover:bg-primary/5 transition-colors group"
                  >
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={apt.userImage} alt={apt.userName} />
                          </div>
                        </div>
                        <div>
                          <p className="font-black text-sm leading-none mb-1 group-hover:text-primary transition-colors">
                            {apt.userName}
                          </p>
                          <p className="text-[10px] font-bold text-neutral/40 flex items-center gap-1">
                            <Mail size={10} /> {apt.userEmail}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-5 px-6 text-center">
                      <div className="badge badge-outline border-base-300 font-bold text-[11px] px-4 py-3">
                        {apt.vaccineName}
                      </div>
                    </td>

                    <td className="py-5 px-6 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-black text-neutral/70">
                          {new Date(apt.deadlineDate).toLocaleDateString(
                            "en-GB",
                            { day: "2-digit", month: "short", year: "numeric" }
                          )}
                        </span>
                        <span className="text-[9px] font-bold text-primary uppercase tracking-tighter">
                          Fast-Track
                        </span>
                      </div>
                    </td>

                    <td className="py-5 px-6 text-center">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                          apt.status === "Completing"
                            ? "bg-info/10 border-info text-info"
                            : "bg-primary/10 border-primary text-primary"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </td>

                    <td className="py-5 px-8 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          disabled={loadingId === apt._id}
                          onClick={() => handleAccept(apt._id)}
                          className="btn btn-sm btn-success text-white text-[9px] font-black uppercase rounded-xl px-4 hover:scale-105"
                        >
                          {loadingId === apt._id ? "..." : "Accept"}
                        </button>
                        <button
                          onClick={() => handleReject(apt._id)}
                          className="btn btn-sm btn-ghost text-error hover:bg-error/10 rounded-xl"
                        >
                          <XCircle size={18} />
                        </button>
                        <button
                          onClick={() => handleEye(apt)}
                          className="btn btn-sm btn-circle bg-base-200 border-none hover:bg-neutral hover:text-white"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {currentItems.length === 0 && (
            <div className="p-20 text-center bg-base-100">
              <CalendarDays size={48} className="mx-auto text-base-300 mb-4" />
              <p className="text-neutral/30 font-black uppercase tracking-widest text-sm">
                No Results Found
              </p>
            </div>
          )}
        </div>

        {/* --- Working Pagination --- */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-8 px-4">
            <p className="text-[10px] font-black text-neutral/30 uppercase">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredData.length)} of{" "}
              {filteredData.length} entries
            </p>
            <div className="join shadow-sm">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="join-item btn btn-sm bg-base-100 border-base-300 disabled:bg-base-200"
              >
                Prev
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`join-item btn btn-sm border-base-300 ${
                    currentPage === index + 1
                      ? "bg-primary text-white border-none"
                      : "bg-base-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="join-item btn btn-sm bg-base-100 border-base-300 disabled:bg-base-200"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedApt}
      />
    </div>
  );
};

export default Appointments;