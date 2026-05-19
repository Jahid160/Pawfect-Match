"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaLinkedinIn,
  FaTwitter,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

const EXPERTS = [
  {
    id: 1,
    name: "Dr. Opu Dev Nath",
    role: "Senior Veterinarian",
    speciality: "Surgery & Care",
    image:
      "https://i.ibb.co.com/DfT6PcCX/Gemini-Generated-Image-lh4rxilh4rxilh4r.png",
    links: { linkedin: "#", twitter: "#", email: "mailto:opu@pawfact.com" },
  },
  {
    id: 2,
    name: "Dr. Emily Chen",
    role: "Pet Nutritionist",
    speciality: "Diet & Wellness",
    image:
      "https://i.ibb.co.com/5gmTdSk4/bermix-studio-ODM-Vs-TM2-QQ-unsplash.jpg",
    links: { linkedin: "#", twitter: "#", email: "mailto:emily@pawfact.com" },
  },
  {
    id: 3,
    name: "Mark Wilson",
    role: "Pet Behaviorist",
    speciality: "Training Expert",
    image:
      "https://i.ibb.co.com/0yjC7zpt/usman-yousaf-p-Trhfmj2j-DA-unsplash.jpg",
    links: { linkedin: "#", twitter: "#", email: "mailto:mark@pawfact.com" },
  },
  {
    id: 4,
    name: "James Anderson",
    role: "Rescue Coordinator",
    speciality: "Adoption Lead",
    image:
      "https://i.ibb.co.com/twxZQyZb/mohamad-azaam-1-O8-CJy1-A7-Wo-unsplash.jpg",
    links: { linkedin: "#", twitter: "#", email: "mailto:james@pawfact.com" },
  },
];

const ExpertSection = () => {
  return (
    <section className="bg-white px-4 sm:px-8 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex md:flex-row flex-col justify-between items-start md:items-end gap-6 mb-16 md:mb-20">
          <div className="max-w-2xl">
            <div className="inline-block bg-orange-500/10 mb-4 px-5 py-2 border border-orange-500/20 rounded-full font-black text-[10px] text-orange-600 uppercase tracking-[0.2em]">
              Our Professional Team
            </div>
            <h2 className="font-black text-slate-900 text-4xl lg:text-7xl leading-[0.95] tracking-[-0.04em]">
              Meet the <span className="text-orange-500">Experts</span> <br />
              Behind PawFact
            </h2>
          </div>
          <div className="pl-6 border-orange-500 border-l-4 max-w-sm">
            <p className="font-medium text-slate-500 text-base md:text-lg leading-relaxed">
              Dedicated specialists working tirelessly to ensure every pet gets
              the love and care they deserve.
            </p>
          </div>
        </div>

        {/* Experts Grid */}
        <div className="gap-8 lg:gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-16 md:mb-20">
          {EXPERTS.map((expert) => (
            <motion.div
              key={expert.id}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Image Container */}
              <div className="relative shadow-2xl rounded-[2.5rem] w-full h-[450px] md:h-[450px] overflow-hidden transition-all duration-500">
                <Image
                  src={expert.image}
                  alt={expert.name}
                  fill
                  sizes="(max-w-7xl) 25vw, (max-w-md) 100vw, 50vw"
                  className="md:grayscale group-hover:grayscale-0 object-cover group-hover:scale-105 transition-all duration-700"
                />

                <div className="absolute inset-0 flex justify-center items-end bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 pb-8 md:pb-10 transition-all duration-500">
                  <div className="flex gap-3 md:gap-4">
                    <Link
                      href={expert.links.linkedin}
                      className="bg-white hover:bg-orange-500 shadow-xl p-3 md:p-4 rounded-2xl text-slate-900 hover:text-white transition-all duration-300"
                    >
                      <FaLinkedinIn
                        size={16}
                        className="md:w-[18px] md:h-[18px]"
                      />
                    </Link>
                    <Link
                      href={expert.links.twitter}
                      className="bg-white hover:bg-orange-500 shadow-xl p-3 md:p-4 rounded-2xl text-slate-900 hover:text-white transition-all duration-300"
                    >
                      <FaTwitter
                        size={16}
                        className="md:w-[18px] md:h-[18px]"
                      />
                    </Link>
                    <Link
                      href={expert.links.email}
                      className="bg-white hover:bg-orange-500 shadow-xl p-3 md:p-4 rounded-2xl text-slate-900 hover:text-white transition-all duration-300"
                    >
                      <FaEnvelope
                        size={16}
                        className="md:w-[18px] md:h-[18px]"
                      />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Info Content */}
              <div className="mt-6 md:mt-8 px-2 text-center">
                <h3 className="font-black text-slate-900 text-xl md:text-2xl tracking-tight transition-colors">
                  {expert.name}
                </h3>
                <p className="mt-1 font-black text-[10px] md:text-[11px] text-orange-500 uppercase tracking-[0.15em]">
                  {expert.role}
                </p>
                <div className="inline-block bg-slate-50 mt-3 px-4 py-1 border border-slate-100 rounded-full font-bold text-[9px] md:text-[10px] text-slate-400 uppercase tracking-widest">
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
            className="group inline-flex relative items-center gap-4 bg-slate-900 hover:bg-orange-600 shadow-xl px-10 md:px-12 py-4 md:py-5 rounded-2xl overflow-hidden font-black text-[11px] text-white uppercase tracking-[0.2em] transition-all duration-500"
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
