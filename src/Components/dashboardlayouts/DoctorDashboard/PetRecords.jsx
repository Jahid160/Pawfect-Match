import React from 'react';
import { 
  Search, FileText, Activity, Calendar, 
  ExternalLink, Plus, History, ChevronRight 
} from 'lucide-react';

const PetRecords = () => {
  // ডামি রেকর্ড ডাটা (পরে ডাটাবেজ থেকে কানেক্ট করবেন)
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
    <div className="p-8 bg-[#F8FAFC] min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
            Medical <span className="text-orange-500">Records</span>
          </h1>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">
            Access and manage comprehensive pet health histories
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
          <button className="bg-orange-500 text-white p-3 rounded-[1.2rem] shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all">
            <Plus size={24} />
          </button>
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

              {/* Diagnosis Summary */}
              <div className="flex-1 lg:max-w-md bg-slate-50/50 p-5 rounded-[1.8rem] border border-dashed border-slate-200">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1 flex items-center gap-2">
                  <Activity size={12} className="text-orange-500" /> Diagnosis Summary
                </p>
                <p className="text-sm font-bold text-slate-700 italic">{record.diagnosis}</p>
              </div>

              {/* Meta Info & Actions */}
              <div className="flex items-center justify-between lg:justify-end gap-10">
                <div className="text-right">
                  <p className="text-sm font-black text-slate-800 flex items-center gap-2 justify-end">
                    <Calendar size={16} className="text-orange-500" /> {record.lastVisit}
                  </p>
                  <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${
                    record.status === 'Stable' ? 'text-emerald-500' : 'text-orange-500'
                  }`}>
                    Condition: {record.status}
                  </p>
                </div>

                <button className="h-14 w-14 bg-slate-900 text-white rounded-[1.2rem] flex items-center justify-center hover:bg-orange-500 transition-all shadow-lg">
                  <ExternalLink size={20} />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Stats Footer (Optional) */}
      <div className="mt-12 flex items-center gap-4 bg-orange-50 p-6 rounded-[2rem] border border-orange-100/50">
        <div className="bg-white p-3 rounded-xl text-orange-500 shadow-sm">
          <Activity size={20} />
        </div>
        <p className="text-xs font-bold text-orange-800 uppercase tracking-widest leading-relaxed">
          Tip: Click on the external link icon to view full laboratory reports and prescription history for each pet.
        </p>
      </div>
    </div>
  );
};

export default PetRecords;