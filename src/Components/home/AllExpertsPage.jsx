"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Router import করা হয়েছে
import { motion } from "framer-motion";
import {
  FaLinkedinIn,
  FaTwitter,
  FaEnvelope,
  FaSearch,
  FaStethoscope,
  FaAward,
  FaUsers,
  FaHeart,
  FaChevronRight,
} from "react-icons/fa";

const allExperts = [
  {
    id: 1,
    name: "Dr. Opu Dev Nath",
    role: "Senior Veterinarian",
    speciality: "Surgery & Care",
    image: "https://i.ibb.co.com/DfT6PcCX/Gemini-Generated-Image-lh4rxilh4rxilh4r.png",
  },
  {
    id: 2,
    name: "Dr. Emily Chen",
    role: "Pet Nutritionist",
    speciality: "Diet & Wellness",
    image: "https://i.ibb.co.com/5gmTdSk4/bermix-studio-ODM-Vs-TM2-QQ-unsplash.jpg",
  },
  {
    id: 3,
    name: "Mark Wilson",
    role: "Pet Behaviorist",
    speciality: "Training Expert",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=500",
  },
  {
    id: 4,
    name: "James Anderson",
    role: "Rescue Coordinator",
    speciality: "Adoption Lead",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=500",
  },
  {
    id: 5,
    name: "Dr. Robert Fox",
    role: "Veterinary Surgeon",
    speciality: "Dental Care",
    image: "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=500",
  },
  {
    id: 6,
    name: "Linda Blair",
    role: "Animal Psychologist",
    speciality: "Trauma Recovery",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=500",
  },
  {
    id: 7,
    name: "Dr. Sarah Lee",
    role: "Psychologist",
    speciality: "Trauma Recovery",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=500",
  },
  {
    id: 8,
    name: "Jlinda Blair",
    role: "Animal Psychologist",
    speciality: "Trauma Recovery",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=500",
  },
];

const AllExpertsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter(); // Router initialization

  const filteredExperts = useMemo(() => {
    return allExperts.filter((expert) =>
      expert.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="bg-white selection:bg-orange-100 min-h-screen font-sans">
      {/* --- Section 1: Hero & Search --- */}
      <section className="relative bg-[#fffaf5] px-4 sm:px-8 pt-40 pb-24 border-gray-100 border-b overflow-hidden">
        <div className="top-10 right-10 absolute opacity-5 pointer-events-none">
          <FaStethoscope size={300} className="text-orange-500 -rotate-12" />
        </div>

        <div className="z-10 relative mx-auto max-w-7xl">
          <div className="flex lg:flex-row flex-col justify-between items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-3xl text-left"
            >
              <div className="inline-flex items-center gap-3 bg-white shadow-sm mb-8 px-5 py-2.5 rounded-full font-bold text-[11px] text-orange-600 uppercase tracking-widest">
                <span className="relative flex w-2 h-2">
                  <span className="inline-flex absolute bg-orange-400 opacity-75 rounded-full w-full h-full animate-ping"></span>
                  <span className="inline-flex relative bg-orange-600 rounded-full w-2 h-2"></span>
                </span>
                Expert Medical Team
              </div>

              <h1 className="mb-8 font-black text-gray-900 text-5xl lg:text-7xl leading-[1.1] tracking-tight">
                Meet Our <br />{" "}
                <span className="text-orange-500">Certified</span> Experts
              </h1>

              <p className="mb-10 max-w-xl font-medium text-gray-600 text-lg lg:text-xl leading-relaxed">
                Our team of dedicated professionals brings decades of collective
                experience in veterinary medicine to ensure your pets live their
                best lives.
              </p>

              {/* Search Bar */}
              <div className="group relative max-w-lg">
                <input
                  type="text"
                  placeholder="Find by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white shadow-2xl shadow-orange-100/50 py-5 pr-6 pl-14 border-2 border-transparent focus:border-orange-500 rounded-2xl focus:outline-none w-full font-semibold text-gray-900 placeholder:text-gray-400 text-base transition-all"
                />
                <FaSearch
                  className="top-1/2 left-6 absolute text-gray-400 group-focus-within:text-orange-500 transition-colors -translate-y-1/2"
                  size={18}
                />
                <button
                  type="button"
                  className="top-2 right-2 absolute bg-gray-900 hover:bg-orange-600 px-6 py-3 rounded-xl font-bold text-white text-xs uppercase tracking-wider active:scale-95 transition-all"
                >
                  Search
                </button>
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="gap-4 grid grid-cols-2 w-full md:w-auto"
            >
              {[
                { label: "Experts", val: "25+", icon: <FaUsers /> },
                { label: "Success", val: "99%", icon: <FaAward /> },
                { label: "Years Exp.", val: "15+", icon: <FaStethoscope /> },
                { label: "Pets Cared", val: "10k+", icon: <FaHeart /> },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="group bg-white hover:bg-orange-600 shadow-orange-100/20 shadow-xl p-6 border border-gray-100 rounded-[2rem] text-center transition-all duration-500 cursor-default"
                >
                  <div className="bg-orange-50 group-hover:bg-white/20 mx-auto mb-3 p-3 rounded-xl w-fit text-orange-500 group-hover:text-white text-xl transition-all">
                    {stat.icon}
                  </div>
                  <h4 className="font-extrabold text-gray-900 group-hover:text-white text-2xl tracking-tight transition-colors">
                    {stat.val}
                  </h4>
                  <p className="font-bold text-[10px] text-gray-400 group-hover:text-orange-100 uppercase tracking-widest transition-colors">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Section 2: Experts Grid --- */}
      <section className="mx-auto px-4 sm:px-8 py-24 max-w-7xl">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="font-bold text-orange-500 text-xs uppercase tracking-[0.3em]">
              Our Directory
            </span>
            <h2 className="mt-2 font-black text-gray-900 text-3xl md:text-5xl tracking-tight">
              VERIFIED SPECIALISTS
            </h2>
          </div>
          <div className="hidden md:block font-bold text-gray-400 text-sm uppercase tracking-widest">
            {filteredExperts.length} Curated Profiles
          </div>
        </div>

        {filteredExperts.length > 0 ? (
          <div className="gap-x-8 gap-y-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {filteredExperts.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative shadow-2xl shadow-orange-100/50 rounded-[2.5rem] w-full h-[400px] overflow-hidden">
                  <Image
                    src={expert.image}
                    alt={expert.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />

                  <div className="absolute inset-0 flex justify-center items-center bg-gray-900/60 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-all duration-500">
                    <div className="flex gap-4 transition-transform translate-y-10 group-hover:translate-y-0 duration-500">
                      <button className="bg-white hover:bg-orange-500 shadow-xl p-3.5 rounded-full text-gray-900 hover:text-white transition-all">
                        <FaLinkedinIn size={18} />
                      </button>
                      <button className="bg-white hover:bg-orange-500 shadow-xl p-3.5 rounded-full text-gray-900 hover:text-white transition-all">
                        <FaTwitter size={18} />
                      </button>
                      <button className="bg-white hover:bg-orange-500 shadow-xl p-3.5 rounded-full text-gray-900 hover:text-white transition-all">
                        <FaEnvelope size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="top-5 left-5 absolute bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full font-bold text-[10px] text-orange-600 uppercase tracking-widest">
                    Available
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <h3 className="mb-1 font-bold text-gray-900 text-xl leading-none tracking-tight">
                    {expert.name}
                  </h3>
                  <p className="mb-2 font-bold text-[10px] text-orange-500 uppercase tracking-[0.2em]">
                    {expert.role}
                  </p>
                  <p className="mb-6 font-medium text-gray-500 text-xs tracking-wide">
                    Specialized in {expert.speciality}
                  </p>

                  <Link
                    href={`/experts/${expert.id}`}
                    className="flex justify-center items-center gap-2 bg-gray-900 hover:bg-orange-600 shadow-lg py-4 rounded-xl font-bold text-[11px] text-white uppercase tracking-widest transition-all duration-300"
                  >
                    View Profile <FaChevronRight size={10} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h3 className="font-bold text-gray-800 text-2xl">
              No expert found
            </h3>
            <p className="mt-3 text-gray-500">
              Try searching with another name.
            </p>
          </div>
        )}
      </section>

      {/* --- Section 3: Premium CTA --- */}
      <section className="mx-auto px-4 sm:px-8 pb-32 max-w-7xl">
        <div className="group relative bg-slate-900 p-12 md:p-20 rounded-[3rem] overflow-hidden">
          <div className="z-10 relative flex lg:flex-row flex-col justify-between items-center gap-12 lg:text-left text-center">
            <div className="max-w-xl">
              <h2 className="mb-6 font-black text-white text-4xl md:text-6xl leading-[1.1] tracking-tight">
                Are you a <span className="text-orange-500">Pet Expert?</span>
              </h2>
              <p className="font-medium text-slate-400 text-lg lg:text-xl leading-relaxed">
                Join our elite network of veterinary professionals and help us
                build the future of pet welfare.
              </p>
            </div>
            
            {/* Button updated with onClick to navigate to contact page */}
            <button 
              onClick={() => router.push('/contact')}
              className="bg-orange-600 hover:bg-white shadow-xl px-10 py-5 rounded-xl font-bold text-[12px] text-white hover:text-gray-900 uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-500"
            >
              Apply to join the team
            </button>
          </div>

          {/* Decorative elements */}
          <div className="-top-24 -right-24 absolute bg-orange-500/10 group-hover:bg-orange-500/20 blur-[100px] rounded-full w-80 h-80 transition-colors duration-700"></div>
          <div className="-bottom-32 -left-32 absolute bg-white/5 blur-[80px] rounded-full w-72 h-72"></div>
        </div>
      </section>
    </div>
  );
};

export default AllExpertsPage;