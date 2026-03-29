"use client";

import React from 'react';
import { 
  User, Mail, Phone, MapPin, Award, 
  Calendar, ShieldCheck, Edit3, Camera, 
  Star, Briefcase, GraduationCap 
} from 'lucide-react';

const DoctorProfile = () => {
  // এই ডাটাগুলো পরবর্তীতে আপনার Auth বা Database থেকে আসবে
  const doctorData = {
    name: "MD SHAKIL",
    role: "Senior Veterinary Surgeon",
    email: "shakil.vet@pawfect.com",
    phone: "+880 1712-345678",
    address: "Dhaka, Bangladesh",
    experience: "8+ Years",
    completedTasks: "1,240",
    rating: "4.9",
    joined: "January 2024",
    specialties: ["Surgery", "Vaccination", "Pet Nutrition"]
  };

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans">
      
      {/* Header Section with Cover & Profile Photo */}
      <div className="relative mb-8">
        <div className="h-48 w-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-[3rem] shadow-lg shadow-orange-100"></div>
        
        <div className="absolute -bottom-16 left-10 flex items-end gap-6">
          <div className="relative group">
            <div className="h-32 w-32 bg-white rounded-[2.5rem] p-2 shadow-xl border border-slate-100">
              <div className="h-full w-full bg-slate-200 rounded-[2rem] flex items-center justify-center overflow-hidden">
                 {/* ডক্টরের ছবি এখানে বসবে */}
                 <User size={60} className="text-slate-400" />
              </div>
            </div>
            <button className="absolute bottom-2 right-2 p-2 bg-slate-900 text-white rounded-xl shadow-lg hover:bg-orange-500 transition-all">
              <Camera size={16} />
            </button>
          </div>

          <div className="pb-4">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">{doctorData.name}</h1>
            <p className="text-orange-500 font-bold text-xs uppercase tracking-[0.2em]">{doctorData.role}</p>
          </div>
        </div>

        <button className="absolute bottom-4 right-10 flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-6 py-2.5 rounded-2xl font-bold text-sm border border-white/30 hover:bg-white hover:text-slate-900 transition-all">
          <Edit3 size={18} /> Edit Profile
        </button>
      </div>

      {/* Main Grid Content */}
      <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Quick Info & Stats */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest mb-6 flex items-center gap-2">
              <ShieldCheck size={16} className="text-orange-500" /> Professional Stats
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Experience</p>
                <p className="text-lg font-black text-slate-800">{doctorData.experience}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Rating</p>
                <p className="text-lg font-black text-slate-800 flex items-center gap-1">
                  <Star size={16} className="fill-orange-400 text-orange-400" /> {doctorData.rating}
                </p>
              </div>
              <div className="bg-orange-500 p-4 rounded-2xl col-span-2">
                <p className="text-[10px] font-bold text-orange-100 uppercase tracking-widest">Total Vaccinations Done</p>
                <p className="text-2xl font-black text-white">{doctorData.completedTasks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest mb-6 flex items-center gap-2">
              <Briefcase size={16} className="text-orange-500" /> Specialties
            </h3>
            <div className="flex flex-wrap gap-2">
              {doctorData.specialties.map((skill, index) => (
                <span key={index} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold border border-slate-100">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Information */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest mb-8 border-b border-slate-50 pb-4">
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <InfoItem icon={<Mail size={20}/>} label="Email Address" value={doctorData.email} />
              <InfoItem icon={<Phone size={20}/>} label="Phone Number" value={doctorData.phone} />
              <InfoItem icon={<MapPin size={20}/>} label="Clinic Location" value={doctorData.address} />
              <InfoItem icon={<Calendar size={20}/>} label="Member Since" value={doctorData.joined} />
            </div>

            <div className="mt-12 p-6 bg-orange-50/50 rounded-[2rem] border border-dashed border-orange-200">
              <h4 className="flex items-center gap-2 text-orange-600 font-black text-xs uppercase tracking-widest mb-3">
                <Award size={18} /> Biography & Certifications
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
                Dedicated to providing exceptional care for animals. Specialized in complex surgeries and preventive medicine. 
                Certified by the International Veterinary Board with a focus on pet wellness and surgical recovery.
              </p>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
             <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest mb-6">Education</h3>
             <div className="flex items-start gap-4">
                <div className="bg-slate-100 p-3 rounded-2xl text-slate-600">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h4 className="font-black text-slate-800">Doctor of Veterinary Medicine (DVM)</h4>
                  <p className="text-sm font-bold text-slate-400">University of Animal Sciences · 2012 - 2017</p>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// সাব-কম্পোনেন্ট: ইনফো আইটেম
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 group">
    <div className="bg-slate-50 p-4 rounded-2xl text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-all duration-300">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-0.5">{label}</p>
      <p className="text-sm font-black text-slate-700">{value}</p>
    </div>
  </div>
);

export default DoctorProfile;