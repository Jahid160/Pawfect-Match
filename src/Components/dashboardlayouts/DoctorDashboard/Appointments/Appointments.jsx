"use client";
import React, { useState } from "react";
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
  const displayData = appointments.length > 0 ? appointments : [];

const handleAccept = async (id) => {
  // 1. Show Professional Confirmation Dialog (Similar to handleReject)
  const result = await Swal.fire({
    title: "Confirm Completion?",
    text: "Are you sure you want to mark this appointment as completed?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "oklch(75% 0.15 150)", // Your Success/Green color
    cancelButtonColor: "oklch(95% 0.02 60)",   // Your Base-300 color
    confirmButtonText: "Yes, complete it!",
    cancelButtonText: "No, go back",
    background: "oklch(100% 0 0)",            // Your Base-100
    color: "oklch(25% 0.02 60)",               // Your Neutral text
  });

  // If user cancels or clicks outside, stop execution
  if (!result.isConfirmed) return;

  // Set loading for the specific row being clicked
  setLoadingId(id);

  try {
    // 2. Calling your server action
    const response = await completedOrder(id);

    if (response.success) {
      // Sync UI with server-side data
      router.refresh();
      
      // Success Alert with Auto-close
      Swal.fire({
        title: "Accepted!",
        text: "The appointment has been marked as completed.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        background: "oklch(100% 0 0)",
        iconColor: "oklch(75% 0.15 150)", 
      });

      console.log("Status updated: Completed");
    } else {
      // Logic failure Alert
      Swal.fire({
        title: "Update Failed",
        text: response.message || "Could not update the status.",
        icon: "error",
        confirmButtonColor: "oklch(70% 0.19 45)",
      });
    }
  } catch (error) {
    // Network or Server error Alert
    Swal.fire({
      title: "Error!",
      text: "Connection failed. Please check your internet.",
      icon: "error",
      confirmButtonColor: "oklch(70% 0.19 45)",
    });
    console.error("Execution error:", error);
  } finally {
    // Clear loading state
    setLoadingId(null);
  }
};
  
const handleReject = async (id) => {
  // 1. Show Professional Confirmation Dialog
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This appointment will be permanently rejected!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "oklch(65% 0.22 25)", // Your Error/Red color
    cancelButtonColor: "oklch(95% 0.02 60)",  // Your Base-300 color
    confirmButtonText: "Yes, reject it!",
    cancelButtonText: "No, keep it",
    background: "oklch(100% 0 0)",           // Your Base-100
    color: "oklch(25% 0.02 60)",              // Your Neutral text
  });

  // If user cancels, stop execution
  if (!result.isConfirmed) return;

  setLoadingId(id); // Set loading state for the specific row

  try {
    // 2. Call your server action
    const response = await deleteOrder(id);

    if (response.success) {
      // Sync UI with server data
      router.refresh(); 
      
      // Success Alert
      Swal.fire({
        title: "Rejected!",
        text: "The appointment has been removed.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        background: "oklch(100% 0 0)",
        iconColor: "oklch(75% 0.15 150)", // Your Success color
      });
      
      console.log("Appointment rejected and deleted.");
    } else {
      // Failure Alert
      Swal.fire({
        title: "Failed!",
        text: response.message || "Could not delete the order.",
        icon: "error",
        confirmButtonColor: "oklch(70% 0.19 45)",
      });
    }
  } catch (error) {
    // Error Alert
    Swal.fire({
      title: "Error!",
      text: "Connection failed. Please try again.",
      icon: "error",
      confirmButtonColor: "oklch(70% 0.19 45)",
    });
    console.error("Execution error:", error);
  } finally {
    setLoadingId(null); // Clear loading state
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
              {/* Table Head */}
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

              {/* Table Body */}
              <tbody className="text-neutral">
                {displayData.map((apt) => (
                  <tr
                    key={apt._id}
                    className="hover:bg-primary/5 transition-colors group"
                  >
                    {/* Patient Info */}
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

                    {/* Vaccine Info */}
                    <td className="py-5 px-6 text-center">
                      <div className="badge badge-outline border-base-300 font-bold text-[11px] px-4 py-3">
                        {apt.vaccineName}
                      </div>
                    </td>

                    {/* Deadline */}
                    <td className="py-5 px-6 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-black text-neutral/70">
                          {new Date(apt.deadlineDate).toLocaleDateString(
                            "en-GB",
                            { day: "2-digit", month: "short", year: "numeric" },
                          )}
                        </span>
                        <span className="text-[9px] font-bold text-primary uppercase tracking-tighter">
                          Fast-Track
                        </span>
                      </div>
                    </td>

                    {/* Status */}
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

                    {/* Actions */}
                    <td className="py-5 px-8">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleAccept(apt._id)}
                          className="btn btn-sm btn-success text-white text-[9px] font-black uppercase rounded-xl px-4 hover:scale-105"
                        >
                          Accept
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

          {/* Table Footer / Empty State */}
          {displayData.length === 0 && (
            <div className="p-20 text-center bg-base-100">
              <CalendarDays size={48} className="mx-auto text-base-300 mb-4" />
              <p className="text-neutral/30 font-black uppercase tracking-widest text-sm">
                No Appointments Logged
              </p>
            </div>
          )}
        </div>

        {/* Pagination Placeholder*/}
        <div className="flex justify-between items-center mt-8 px-4">
          <p className="text-[10px] font-black text-neutral/30 uppercase">
            Showing {displayData.length} entries
          </p>
          <div className="join">
            <button className="join-item btn btn-sm bg-base-100 border-base-300">
              Previous
            </button>
            <button className="join-item btn btn-sm bg-primary text-white border-none">
              1
            </button>
            <button className="join-item btn btn-sm bg-base-100 border-base-300">
              Next
            </button>
          </div>
        </div>
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
