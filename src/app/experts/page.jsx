"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedinIn, FaTwitter, FaEnvelope, FaSearch, FaUserAlt, FaStethoscope, FaAward, FaUsers, FaHeart } from 'react-icons/fa';

const allExperts = [
  { id: 1, name: "Dr. Opu Dev Nath", role: "Senior Veterinarian", speciality: "Surgery & Care", image: "https://i.ibb.co.com/DfT6PcCX/Gemini-Generated-Image-lh4rxilh4rxilh4r.png" },
  { id: 2, name: "Dr. Emily Chen", role: "Pet Nutritionist", speciality: "Diet & Wellness", image: "https://i.ibb.co.com/5gmTdSk4/bermix-studio-ODM-Vs-TM2-QQ-unsplash.jpg" },
  { id: 3, name: "Mark Wilson", role: "Pet Behaviorist", speciality: "Training Expert", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=500" },
  { id: 4, name: "James Anderson", role: "Rescue Coordinator", speciality: "Adoption Lead", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=500" },
  { id: 5, name: "Dr. Robert Fox", role: "Veterinary Surgeon", speciality: "Dental Care", image: "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=500" },
  { id: 6, name: "Linda Blair", role: "Animal Psychologist", speciality: "Trauma Recovery", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=500" },
];

const AllExpertsPage = () => {
  return (
    <div className="bg-white min-h-screen">
      
      {/* --- Section 1: Hero & Search --- */}
      <div className="bg-gray-50 px-4 sm:px-8 pt-32 pb-20 border-gray-100 border-b">
        <div className="mx-auto max-w-7xl">
          <div className="flex md:flex-row flex-col justify-between items-center gap-12">
            
            <div className="max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 bg-orange-100 mb-6 px-4 py-2 rounded-full font-bold text-orange-600 text-xs uppercase tracking-[2px]">
                <span className="relative flex w-2 h-2">
                  <span className="inline-flex absolute bg-orange-400 opacity-75 rounded-full w-full h-full animate-ping"></span>
                  <span className="inline-flex relative bg-orange-500 rounded-full w-2 h-2"></span>
                </span>
                World-Class Pet Care
              </div>
              <h1 className="mb-6 font-extrabold text-gray-900 text-5xl lg:text-7xl leading-[1.1] tracking-tight">
                Meet Our <span className="text-orange-500 italic">Certified</span> Experts
              </h1>
              <p className="mb-8 max-w-lg text-gray-500 text-xl leading-relaxed">
                Our team of dedicated professionals brings years of experience in veterinary medicine, behavior, and nutrition to ensure your pets live their best lives.
              </p>

              {/* Enhanced Search Bar */}
              <div className="group relative max-w-md">
                <input 
                  type="text" 
                  placeholder="Find a specialist (e.g. Surgeon)..." 
                  className="bg-white shadow-gray-200/50 shadow-xl py-5 pr-6 pl-14 border-2 border-gray-200 focus:border-orange-500 rounded-2xl focus:outline-none w-full transition-all"
                />
                <FaSearch className="top-6 left-6 absolute text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                <button className="top-2.5 right-3 absolute bg-orange-500 hover:bg-orange-600 px-5 py-2.5 rounded-xl font-bold text-white text-sm transition-all">
                  Search
                </button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="gap-4 grid grid-cols-2 w-full md:w-auto">
              {[
                { label: 'Experts', val: '25+', icon: <FaUsers className="text-orange-500"/> },
                { label: 'Success Rate', val: '99%', icon: <FaAward className="text-orange-500"/> },
                { label: 'Years Exp.', val: '15+', icon: <FaStethoscope className="text-orange-500"/> },
                { label: 'Pets Cared', val: '10k+', icon: <FaHeart className="text-orange-500"/> }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center bg-white shadow-sm p-6 border border-gray-100 rounded-[2rem] text-center">
                  <div className="bg-orange-50 mb-3 p-3 rounded-xl text-xl">{stat.icon}</div>
                  <h4 className="font-black text-gray-900 text-2xl">{stat.val}</h4>
                  <p className="font-bold text-gray-400 text-xs uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Section 2: Experts Grid --- */}
      <div className="mx-auto px-4 sm:px-8 py-24 max-w-7xl">
        <div className="flex justify-between items-center mb-16">
          <h2 className="font-black text-gray-900 text-3xl uppercase tracking-tighter">Verified Specialists</h2>
          <div className="hidden md:block flex-1 bg-gray-100 mx-8 h-[2px]"></div>
          <p className="font-medium text-gray-400 text-sm">Showing {allExperts.length} Specialists</p>
        </div>

        <div className="gap-x-8 gap-y-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {allExperts.map((expert) => (
            <div key={expert.id} className="group relative">
              <div className="relative shadow-lg border-2 border-transparent group-hover:border-orange-500 rounded-[40px] w-full h-[380px] overflow-hidden transition-all duration-500">
                <Image
                  src={expert.image}
                  alt={expert.name}
                  fill
                  className="grayscale group-hover:grayscale-0 object-cover group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 flex justify-center items-end bg-gradient-to-t from-orange-600/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 pb-8 transition-all duration-500">
                  <div className="flex gap-4">
                    <button className="bg-white hover:bg-orange-100 shadow-xl p-3 rounded-full text-orange-600 transition-colors"><FaLinkedinIn size={18} /></button>
                    <button className="bg-white hover:bg-orange-100 shadow-xl p-3 rounded-full text-orange-600 transition-colors"><FaTwitter size={18} /></button>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <h3 className="font-bold text-gray-900 group-hover:text-orange-600 text-xl transition-colors">{expert.name}</h3>
                <p className="mb-1 font-semibold text-orange-500 text-sm uppercase tracking-wider">{expert.role}</p>
                <p className="mb-5 font-medium text-gray-400 text-xs italic tracking-wide">Specialist in {expert.speciality}</p>

                <div className="flex items-center gap-2 px-2">
                  <Link 
                    href={`/experts/${expert.id}`}
                    className="flex flex-1 justify-center items-center gap-2 bg-gray-900 hover:bg-orange-500 shadow-gray-200 shadow-lg py-3.5 rounded-2xl font-bold text-[11px] text-white uppercase tracking-[2px] active:scale-95 transition-all duration-300"
                  >
                    <FaUserAlt size={12} /> Profile
                  </Link>
                  <button className="bg-orange-100 hover:bg-orange-500 shadow-sm p-4 rounded-2xl text-orange-600 hover:text-white active:scale-95 transition-all duration-300">
                    <FaEnvelope size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Section 3: Call to Action (CTA) --- */}
      <div className="mx-auto px-4 sm:px-8 pb-24 max-w-7xl">
        <div className="relative flex md:flex-row flex-col justify-between items-center gap-8 bg-orange-500 p-12 rounded-[3rem] overflow-hidden">
          <div className="z-10 relative">
            <h2 className="mb-4 font-black text-white text-4xl md:text-5xl">Are you a pet expert?</h2>
            <p className="max-w-md font-medium text-orange-100 text-lg">Join our mission to provide the best care for every pet in the country. Apply to join our team of professionals.</p>
          </div>
          <button className="z-10 relative bg-white hover:bg-gray-900 px-10 py-5 rounded-2xl font-black text-orange-600 hover:text-white text-sm uppercase tracking-widest active:scale-95 transition-all duration-300">
            Join the Team
          </button>
          {/* Abstract background circles */}
          <div className="-top-20 -right-20 absolute bg-orange-400 opacity-50 rounded-full w-80 h-80"></div>
          <div className="-bottom-20 -left-20 absolute bg-orange-600 opacity-50 rounded-full w-64 h-64"></div>
        </div>
      </div>

    </div>
  );
};

export default AllExpertsPage;