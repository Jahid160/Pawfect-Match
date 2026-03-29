"use client";
import React from 'react';
import {
  Search, FileText, Activity, Calendar,
  ExternalLink, Plus, History, ChevronRight
} from 'lucide-react';

const PetRecords = () => {

  const medicalRecords = [
    {
      id: "REC-2024-001",
      petName: "Max",
      owner: "MD SHAKIL",
      lastVisit: "15 Mar 2024",
      diagnosis: "Annual Vaccination & Deworming",
      status: "Stable",
      type: "Vaccination"
    },
    {
      id: "REC-2024-002",
      petName: "Luna",
      owner: "Jahid Hasan",
      lastVisit: "22 Mar 2024",
      diagnosis: "Minor Skin Allergy Treatment",
      status: "Recovering",
      type: "Clinical"
    },
    {
      id: "REC-2024-003",
      petName: "Rocky",
      owner: "Ariful Islam",
      lastVisit: "10 Feb 2024",
      diagnosis: "Fracture Recovery - Leg Surgery",
      status: "Healthy",
      type: "Surgery"
    }
  ];

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
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by Pet Name or Owner..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-[1.5rem] shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500/10 font-medium text-sm"
            />
          </div>
        </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 gap-6">
        {medicalRecords.map((record) => (
          <div
            key={record.id}
            className="bg-white border border-slate-50 p-6 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

              {/* Pet Basic Info */}
              <div className="flex items-center gap-5">
                <div className="h-20 w-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-orange-500 border border-slate-100 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-500">
                  <FileText size={32} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-black text-slate-800 text-xl tracking-tight">{record.petName}</h3>
                    <span className="bg-blue-50 text-blue-600 text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-widest">
                      {record.id}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-400 flex items-center gap-1">
                    <History size={14} className="text-orange-400" /> Owner: {record.owner}
                  </p>
                </div>
              </div>

              <tbody className="text-neutral">
                {completedRecords.map((record) => (
                  <tr key={record._id} className="hover:bg-primary/5 transition-colors group">
                    {/* Pet & Owner Info */}
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

              {/* Meta Info & Actions */}
              <div className="flex items-center justify-between lg:justify-end gap-10">
                <div className="text-right">
                  <p className="text-sm font-black text-slate-800 flex items-center gap-2 justify-end">
                    <Calendar size={16} className="text-orange-500" /> {record.lastVisit}
                  </p>
                  <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${record.status === 'Stable' ? 'text-emerald-500' : 'text-orange-500'
                    }`}>
                    Condition: {record.status}
                  </p>
                </div>

                    {/* Completion Date */}
                    <td className="py-5 px-6 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-black text-neutral/70">
                          {new Date(record.updatedAt || record.deadlineDate).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span className="text-[9px] font-bold text-success uppercase tracking-tighter">
                          Verified
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-5 px-6 text-center">
                      <span className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border bg-success/10 border-success text-success">
                        {record.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-5 px-8">
                      <div className="flex items-center justify-end gap-2">
                        <button className="btn btn-sm btn-circle bg-base-200 border-none hover:bg-neutral hover:text-white">
                          <Eye size={16} />
                        </button>
                        <button className="btn btn-sm bg-neutral text-white text-[9px] font-black uppercase rounded-xl px-4 hover:bg-primary border-none">
                          View File
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {completedRecords.length === 0 && (
            <div className="p-20 text-center bg-base-100">
              <FileText size={48} className="mx-auto text-base-300 mb-4" />
              <p className="text-neutral/30 font-black uppercase tracking-widest text-sm">
                No Medical Records Available
              </p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 flex items-center gap-3 px-4">
          <History size={16} className="text-primary" />
          <p className="text-[10px] font-black text-neutral/30 uppercase">
            Showing {completedRecords.length} completed treatments
          </p>
        </div>
      </div>
    </div>
  );
};

export default PetRecords;