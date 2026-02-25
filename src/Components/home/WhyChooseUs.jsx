"use client";

import React from 'react';
import { FaShieldAlt, FaStethoscope, FaHeart, FaUserCheck } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';

const WhyChooseUs = () => {
  const { scrollYProgress } = useScroll();
  
  // Ekhane ami percentage ta define korlam
  const reveal = useTransform(scrollYProgress, [0.1, 0.4], [0, 100]);

  const features = [
    { id: 1, title: "Verified Safety", description: "Every pet profile undergoes a rigorous verification process.", icon: <FaShieldAlt className="text-3xl" /> },
    { id: 2, title: "Health First", description: "Detailed medical history and vaccination ensured before adoption.", icon: <FaStethoscope className="text-3xl" /> },
    { id: 3, title: "Expert Support", description: "Our experts are available 24/7 to guide you through care.", icon: <FaUserCheck className="text-3xl" /> },
    { id: 4, title: "Pure Love", description: "Focusing on personality match and lifestyle compatibility.", icon: <FaHeart className="text-3xl" /> },
  ];

  return (
    <section className="bg-[#FDFCFB] py-24">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header Section */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <h2 className="mb-6 font-black text-gray-900 text-4xl md:text-5xl leading-tight">
            You shouldn’t be the only one <br />
            <span className="text-orange-500">Living Healthy.</span>
          </h2>
        </div>

        <div className="flex lg:flex-row flex-col justify-between items-center gap-12">
          
          {/* Left Features */}
          <div className="space-y-16 w-full lg:w-1/3">
            {features.slice(0, 2).map((f) => (
              <div key={f.id} className="flex flex-col items-center lg:items-end text-center lg:text-right">
                <div className="flex justify-center items-center bg-white shadow-lg mb-4 rounded-2xl w-16 h-16 text-orange-500">
                  {f.icon}
                </div>
                <h4 className="font-bold text-gray-800 text-2xl">{f.title}</h4>
                <p className="text-gray-500">{f.description}</p>
              </div>
            ))}
          </div>

          {/* Central Visual: Reveal Slider */}
          <div className="flex justify-center w-full lg:w-1/3">
             <div className="relative bg-gray-200 shadow-2xl border-8 border-white rounded-full w-80 md:w-[400px] h-80 md:h-[400px] overflow-hidden">
                
                {/* Image 1: Background (Puran/Raw look) */}
                <img 
                  src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=600" 
                  alt="Before" 
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Image 2: Foreground (Reveal/Healthy look) */}
                <motion.div 
                  className="z-10 absolute inset-0"
                  style={{ 
                    clipPath: useTransform(reveal, (v) => `inset(0 ${100 - v}% 0 0)`) 
                  }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=600" 
                    alt="After" 
                    className="absolute inset-0 border-orange-500 border-r-4 w-full h-full object-cover"
                  />
                </motion.div>
                
                <div className="bottom-5 left-1/2 z-20 absolute bg-black/50 px-3 py-1 rounded-full font-bold text-[10px] text-white -translate-x-1/2">
                   SCROLL DOWN
                </div>
             </div>
          </div>

          {/* Right Features */}
          <div className="space-y-16 w-full lg:w-1/3">
            {features.slice(2, 4).map((f) => (
              <div key={f.id} className="flex flex-col items-center lg:items-start lg:text-left text-center">
                <div className="flex justify-center items-center bg-white shadow-lg mb-4 rounded-2xl w-16 h-16 text-orange-500">
                  {f.icon}
                </div>
                <h4 className="font-bold text-gray-800 text-2xl">{f.title}</h4>
                <p className="text-gray-500">{f.description}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;