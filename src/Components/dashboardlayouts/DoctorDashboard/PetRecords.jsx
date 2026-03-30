"use client";
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Mail, 
  FileText,
  History
} from 'lucide-react';
import AppointmentModal from './Appointments/AppointmentModal';

const PetRecords = ({ appointments = [] }) => {
  const [selectedApt, setSelectedApt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // শুধুমাত্র "Completed" স্ট্যাটাস ফিল্টার করা হচ্ছে
  const completedRecords = appointments.filter(apt => apt.status === "Completed");

  const handleViewDetails = (data) => {
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
              Medical <span className="text-primary">History</span>
            </h1>
            <p className="text-neutral/40 font-bold text-[10px] uppercase tracking-[0.3em] mt-1">
              Verified Pet Vaccination Records
            </p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/30" size={18} />
              <input
                type="text"
                placeholder="Search by pet or owner..."
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
                  <th className="py-6 px-8 text-[10px] font-black uppercase tracking-widest">Pet & Owner Details</th>
                  <th className="py-6 px-6 text-[10px] font-black uppercase tracking-widest text-center">Vaccine Type</th>
                  <th className="py-6 px-6 text-[10px] font-black uppercase tracking-widest text-center">Completion Date</th>
                  <th className="py-6 px-6 text-[10px] font-black uppercase tracking-widest text-center">Status</th>
                  <th className="py-6 px-8 text-[10px] font-black uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="text-neutral">
                {completedRecords.map((record) => (
                  <tr key={record._id} className="hover:bg-primary/5 transition-colors group">
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12 bg-base-200 flex items-center justify-center">
                             <img src={record.userImage} alt={record.userName} />
                          </div>
                        </div>
                        <div>
                          <p className="font-black text-sm leading-none mb-1 group-hover:text-primary transition-colors">
                            {record.userName}
                          </p>
                          <p className="text-[10px] font-bold text-neutral/40 flex items-center gap-1">
                            <Mail size={10} /> {record.userEmail}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-5 px-6 text-center">
                      <div className="badge badge-outline border-base-300 font-bold text-[11px] px-4 py-3">
                        {record.vaccineName}
                      </div>
                    </td>

                    <td className="py-5 px-6 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-black text-neutral/70">
                          {new Date(record.CompletedAtByDoctor || record.updatedAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span className="text-[9px] font-bold text-success uppercase tracking-tighter">
                          Verified By Doctor
                        </span>
                      </div>
                    </td>

                    <td className="py-5 px-6 text-center">
                      <span className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border bg-success/10 border-success text-success">
                        {record.status}
                      </span>
                    </td>

                    <td className="py-5 px-8">
                      <div className="flex items-center justify-end">
                        <button 
                          onClick={() => handleViewDetails(record)}
                          className="btn btn-sm bg-neutral text-white text-[9px] font-black uppercase rounded-xl px-6 hover:bg-primary border-none shadow-md"
                        >
                          View Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {completedRecords.length === 0 && (
            <div className="p-20 text-center bg-base-100">
              <FileText size={48} className="mx-auto text-base-300 mb-4" />
              <p className="text-neutral/30 font-black uppercase tracking-widest text-sm">
                No Medical Records Available
              </p>
            </div>
          )}
        </div>

        {/* Footer Info & Doctor Info */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 px-4">
          <div className="flex items-center gap-3">
            <History size={16} className="text-primary" />
            <p className="text-[10px] font-black text-neutral/30 uppercase">
              Showing {completedRecords.length} completed treatments
            </p>
          </div>
          
          {/* Doctor Info Section */}
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-base-300">
             <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
             <p className="text-[10px] font-black text-slate-500 uppercase">
               Logged as: <span className="text-primary">{completedRecords[0]?.doctorEmail || "N/A"}</span>
             </p>
          </div>
        </div>
      </div>

      {/* Modal Integration */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedApt}
      />
    </div>
  );
};

export default PetRecords;