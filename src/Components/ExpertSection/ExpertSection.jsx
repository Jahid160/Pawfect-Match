"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedinIn, FaTwitter, FaEnvelope, FaArrowRight } from 'react-icons/fa';

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
        <div className="flex md:flex-row flex-col justify-between items-end gap-6 mb-16">
          <div className="max-w-xl">
            <div className="inline-block bg-orange-100 mb-4 px-4 py-1.5 rounded-full font-bold text-orange-600 text-xs uppercase tracking-widest">
              Our Professionals
            </div>
            <h2 className="font-extrabold text-gray-900 text-4xl lg:text-6xl leading-tight">
              Meet the <span className="text-orange-500">Experts</span> Behind PawFact
            </h2>
          </div>
          <p className="pl-4 border-orange-500 border-l-4 max-w-sm text-gray-500 text-lg italic">
            Dedicated specialists working tirelessly to ensure every pet gets the love and care they deserve.
          </p>
        </div>

        {/* Experts Grid */}
        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          {experts.map((expert) => (
            <div key={expert.id} className="group relative">
              {/* Image Container */}
              <div className="relative shadow-lg border-2 border-transparent group-hover:border-orange-500 rounded-3xl w-full h-[400px] overflow-hidden transition-all duration-500">
                <Image
                  src={expert.image}
                  alt={expert.name}
                  fill
                  className="grayscale group-hover:grayscale-0 object-cover group-hover:scale-110 transition-all duration-700"
                />
                
                {/* Social Overlay */}
                <div className="absolute inset-0 flex justify-center items-end bg-gradient-to-t from-orange-600/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 pb-8 transition-all duration-500">
                  <div className="flex gap-4">
                    <button className="bg-white hover:bg-orange-100 shadow-xl p-3 rounded-full text-orange-600 transition-colors">
                      <FaLinkedinIn size={18} />
                    </button>
                    <button className="bg-white hover:bg-orange-100 shadow-xl p-3 rounded-full text-orange-600 transition-colors">
                      <FaTwitter size={18} />
                    </button>
                    <button className="bg-white hover:bg-orange-100 shadow-xl p-3 rounded-full text-orange-600 transition-colors">
                      <FaEnvelope size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Info Content */}
              <div className="mt-6 text-center">
                <h3 className="font-bold text-gray-900 group-hover:text-orange-600 text-xl transition-colors">
                  {expert.name}
                </h3>
                <p className="mb-1 font-semibold text-orange-500 text-sm uppercase tracking-wider">
                  {expert.role}
                </p>
                <p className="font-medium text-gray-400 text-xs italic">
                  Specialist in {expert.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Link 
            href="/experts" 
            className="group inline-flex relative items-center gap-4 bg-orange-500 hover:bg-slate-900 shadow-[0_20px_40px_-15px_rgba(249,115,22,0.4)] hover:shadow-2xl px-12 py-5 rounded-2xl overflow-hidden font-black text-white uppercase tracking-wider transition-all duration-500"
          >
            <span className="z-10 relative">View All Our Experts</span>
            <FaArrowRight className="z-10 relative transition-transform group-hover:translate-x-2 duration-300" />
            
            <div className="top-0 -left-full group-hover:left-full absolute bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full transition-all duration-1000 ease-in-out"></div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExpertSection;