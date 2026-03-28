"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedinIn, FaTwitter, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const experts = [
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
    image: "https://i.ibb.co.com/0yjC7zpt/usman-yousaf-p-Trhfmj2j-DA-unsplash.jpg",
  }, 
  {
    id: 4,
    name: "James Anderson",
    role: "Rescue Coordinator",
    speciality: "Adoption Lead",
    image: "https://i.ibb.co.com/twxZQyZb/mohamad-azaam-1-O8-CJy1-A7-Wo-unsplash.jpg",
  },
];

const ExpertSection = () => {
  return (
    <section className="bg-white px-4 sm:px-8 py-24">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="flex md:flex-row flex-col justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <div className="inline-block bg-orange-500/10 mb-5 px-5 py-2 border border-orange-500/20 rounded-full font-black text-[10px] text-orange-600 uppercase tracking-[0.2em]">
              Our Professional Team
            </div>
            <h2 className="font-black text-slate-900 text-5xl lg:text-7xl leading-[0.95] tracking-[-0.04em]">
              Meet the <span className="text-orange-500 italic">Experts</span> <br /> Behind PawFact
            </h2>
          </div>
          <div className="pl-6 border-orange-500 border-l-4 max-w-sm">
             <p className="font-medium text-slate-500 text-lg italic leading-relaxed">
              Dedicated specialists working tirelessly to ensure every pet gets the love and care they deserve.
            </p>
          </div>
        </div>

        {/* Experts Grid */}
        <div className="gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-20">
          {experts.map((expert) => (
            <motion.div 
              key={expert.id} 
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Image Container */}
              <div className="relative shadow-2xl rounded-[2.5rem] w-full h-[450px] overflow-hidden transition-all duration-500">
                <Image
                  src={expert.image}
                  alt={expert.name}
                  fill
                  className="grayscale group-hover:grayscale-0 object-cover group-hover:scale-110 transition-all duration-700"
                  priority
                />
                
                {/* Social Overlay */}
                <div className="absolute inset-0 flex justify-center items-end bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 pb-10 transition-all duration-500">
                  <div className="flex gap-4">
                    <button className="bg-white hover:bg-orange-500 shadow-xl p-4 rounded-2xl text-slate-900 hover:text-white transition-all duration-300">
                      <FaLinkedinIn size={18} />
                    </button>
                    <button className="bg-white hover:bg-orange-500 shadow-xl p-4 rounded-2xl text-slate-900 hover:text-white transition-all duration-300">
                      <FaTwitter size={18} />
                    </button>
                    <button className="bg-white hover:bg-orange-500 shadow-xl p-4 rounded-2xl text-slate-900 hover:text-white transition-all duration-300">
                      <FaEnvelope size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Info Content */}
              <div className="mt-8 px-2 text-center">
                <h3 className="font-black text-slate-900 text-2xl tracking-tight transition-colors">
                  {expert.name}
                </h3>
                <p className="mt-1 font-black text-[11px] text-orange-500 uppercase tracking-[0.15em]">
                  {expert.role}
                </p>
                <div className="inline-block bg-slate-50 mt-3 px-4 py-1 border border-slate-100 rounded-full font-bold text-[10px] text-slate-400 uppercase tracking-widest">
                  {expert.speciality}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center pt-4">
          <Link 
            href="/experts" 
            className="group inline-flex relative items-center gap-4 bg-slate-900 hover:bg-orange-600 shadow-xl px-12 py-5 rounded-2xl overflow-hidden font-black text-[11px] text-white uppercase tracking-[0.2em] transition-all duration-500"
          >
            <span className="z-10 relative">View All Our Experts</span>
            <FaArrowRight className="z-10 relative transition-transform group-hover:translate-x-2 duration-300" />
            <div className="top-0 -left-full group-hover:left-full absolute bg-gradient-to-r from-transparent via-white/10 to-transparent w-full h-full transition-all duration-1000"></div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExpertSection;