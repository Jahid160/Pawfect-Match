"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import Link from "next/link";
import Image from 'next/image';

const categories = [
  {
    id: 1,
    name: "Loyal Dogs",
    count: "120+ Pets",
    image: "https://i.ibb.co.com/tp19dPXC/valentina-VGPd-Bui-Y1-Ss-unsplash.jpg",
    color: "bg-orange-100/50",
  },
  {
    id: 2,
    name: "Sweet Cats",
    count: "85+ Pets",
    image: "https://i.ibb.co.com/mr11rk0r/adrien-TBZ2-Idu-Q6-TY-unsplash.jpg",
    color: "bg-blue-100/50",
  },
  {
    id: 3,
    name: "Cute Rabbits",
    count: "40+ Pets",
    image: "https://i.ibb.co.com/jvHc5Y2b/rabbitto.webp",
    color: "bg-green-100/50",
  },
  {
    id: 4,
    name: "Small Birds",
    count: "260+ Pets",
    image: "https://i.ibb.co.com/DHVVRgkJ/alfred-kenneally-UIu4-Rm-Mxn-HU-unsplash.jpg",
    color: "bg-purple-100/50",
  }
];

const PetCategories = () => {
  return (
    <section className="bg-[#FDFCFB] py-32 overflow-hidden">
      <div className="z-10 relative mx-auto px-6 lg:px-8 max-w-7xl">

        {/* --- SECTION HEADER --- */}
        <div className="flex lg:flex-row flex-col justify-between items-end gap-12 mb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-orange-50 mb-6 px-4 py-2 border border-orange-100 rounded-full font-black text-[10px] text-orange-600 uppercase tracking-[0.3em]">
              Explore
            </div>

            <h2 className="font-black text-slate-900 text-5xl md:text-7xl leading-[0.95] tracking-[-0.04em]">
              Find your <span className="text-orange-500 italic">perfect</span> <br />
              companion by category.
            </h2>
          </div>

          <p className="hidden lg:block max-w-xs font-medium text-slate-500 text-base leading-relaxed">
            Whether you're looking for a hiking buddy or a lap-warmer,
            we have the right match for your lifestyle.
          </p>
        </div>

        {/* --- CATEGORIES GRID --- */}
        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -15 }}
              className="group cursor-pointer"
            >
              <div className={`relative overflow-hidden rounded-[3rem] ${cat.color} p-5 transition-all duration-500 shadow-sm border border-transparent hover:border-white group-hover:shadow-2xl group-hover:shadow-orange-100`}>

                {/* Image Container */}

                <div className="relative mb-8 rounded-[2.5rem] w-full h-72 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 flex justify-center items-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="px-2 pb-2">
                  <h4 className="mb-2 font-black text-slate-900 text-2xl tracking-tight">
                    {cat.name}
                  </h4>
                  <p className="font-bold text-[10px] text-orange-600 uppercase tracking-[0.2em]">
                    {cat.count}
                  </p>
                </div>

                {/* Decorative Element */}
                <div className="-right-4 -bottom-4 absolute bg-white/40 opacity-0 group-hover:opacity-100 blur-2xl rounded-full w-24 h-24 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PetCategories;