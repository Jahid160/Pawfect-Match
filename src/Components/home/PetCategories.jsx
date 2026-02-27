"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const categories = [
  {
    id: 1,
    name: "Loyal Dogs",
    count: "120+ Pets",
    image: "https://i.ibb.co.com/tp19dPXC/valentina-VGPd-Bui-Y1-Ss-unsplash.jpg",
    color: "bg-orange-100",
  },
  {
    id: 2,
    name: "Sweet Cats",
    count: "85+ Pets",
    image: "https://i.ibb.co.com/mr11rk0r/adrien-TBZ2-Idu-Q6-TY-unsplash.jpg",
    color: "bg-blue-100",
  },
  {
    id: 3,
    name: "Cute Rabbits",
    count: "40+ Pets",
    image: "https://i.ibb.co.com/jvHc5Y2b/rabbitto.webp",
    color: "bg-green-100",
  },
  {
    id: 4,
    name: "Small Birds",
    count: "260+ Pets",
    image: "https://i.ibb.co.com/DHVVRgkJ/alfred-kenneally-UIu4-Rm-Mxn-HU-unsplash.jpg",
    color: "bg-purple-100",
  }
];

const PetCategories = () => {
  return (
    <section className="bg-[#FDFCFB] py-24">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex md:flex-row flex-col justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="mb-6 font-black text-gray-900 text-4xl md:text-5xl leading-tight tracking-tight">
              Find your <span className="text-orange-500 italic">perfect</span> <br /> 
              companion by category.
            </h2>
            <p className="font-medium text-gray-500 text-lg">
              Whether you're looking for a hiking buddy or a lap-warmer, 
              we have the right match for your lifestyle.
            </p>
          </div>
          <button className="flex items-center gap-2 pb-1 border-orange-500 border-b-2 font-black text-gray-900 hover:text-orange-500 text-sm uppercase tracking-widest transition-all">
            View All Categories <FaArrowRight />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -15 }}
              className="group cursor-pointer"
            >
              <div className={`relative overflow-hidden rounded-[2.5rem] ${cat.color} p-4 transition-all duration-500 shadow-sm group-hover:shadow-2xl group-hover:shadow-orange-100`}>
                
                {/* Image Container */}
                <div className="relative mb-6 rounded-[2rem] w-full h-64 overflow-hidden">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 flex justify-center items-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <div className="bg-white shadow-xl p-4 rounded-full text-orange-500 transition-transform translate-y-10 group-hover:translate-y-0 duration-500 transform">
                        <FaArrowRight size={20} />
                     </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-4 pb-4">
                  <h4 className="mb-1 font-black text-gray-900 text-2xl tracking-tight">
                    {cat.name}
                  </h4>
                  <p className="font-bold text-gray-500 text-sm uppercase tracking-tighter">
                    {cat.count}
                  </p>
                </div>

                {/* Decorative Element */}
                <div className="-right-4 -bottom-4 absolute bg-white/30 opacity-0 group-hover:opacity-100 blur-2xl rounded-full w-24 h-24 transition-opacity"></div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PetCategories;