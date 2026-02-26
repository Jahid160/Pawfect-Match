"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaPaw } from 'react-icons/fa';

const Newsletter = () => {
  return (
    <section className="bg-[#FDFCFB] py-24 overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Main Wrapper with Gradient & Border */}
        <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 shadow-[0_40px_100px_-20px_rgba(251,146,60,0.4)] p-1 md:p-2 rounded-[3.5rem]">
          
          {/* Inner Content Box */}
          <div className="relative bg-orange-500 px-8 md:px-20 py-16 md:py-24 border border-white/20 rounded-[3rem] overflow-hidden">
            
            {/* Animated Decorative Blobs */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 20, repeat: Infinity }}
              className="-top-24 -right-24 absolute bg-orange-400 opacity-40 blur-[80px] rounded-full w-96 h-96"
            />
            <motion.div 
              animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
              transition={{ duration: 15, repeat: Infinity }}
              className="-bottom-32 -left-32 absolute bg-orange-300 opacity-30 blur-[70px] rounded-full w-80 h-80"
            />

            {/* Floating Icon (The Farmer's Dog Style) */}
            <div className="hidden lg:block top-10 left-10 absolute text-white/10 text-9xl -rotate-12">
              <FaPaw />
            </div>

            <div className="z-10 relative items-center gap-12 grid lg:grid-cols-2">
              
              {/* Text Side */}
              <div className="lg:text-left text-center">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm mb-6 px-4 py-2 border border-white/10 rounded-full font-bold text-white text-sm tracking-wide">
                  <span className="bg-white rounded-full w-2 h-2 animate-pulse"></span>
                  JOIN THE PACK
                </div>
                <h2 className="mb-8 font-black text-white text-4xl md:text-6xl leading-[1.1] tracking-tighter">
                  Every tail has a <br />
                  <span className="text-orange-200">Success Story.</span>
                </h2>
                <p className="opacity-90 max-w-lg font-medium text-orange-50 text-lg md:text-xl leading-relaxed">
                  Be the first to know about new rescues, expert pet care tips, and exclusive adoption events.
                </p>
              </div>

              {/* Form Side */}
              <div className="flex justify-center lg:justify-end">
                <div className="bg-white/10 shadow-2xl backdrop-blur-xl p-3 border border-white/30 rounded-[2.5rem] w-full max-w-md">
                  <form className="space-y-3">
                    <div className="relative">
                      <input 
                        type="email" 
                        placeholder="Your best email address" 
                        className="bg-white shadow-inner px-8 py-5 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-orange-300 w-full font-semibold text-gray-900 transition-all placeholder-gray-400"
                        required
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="group flex justify-center items-center gap-3 bg-gray-900 hover:bg-black shadow-black/20 shadow-xl px-8 py-5 rounded-[2rem] w-full font-black text-white text-lg hover:scale-[1.02] active:scale-95 transition-all transform"
                    >
                      GET UPDATES 
                      <FaPaperPlane className="text-sm transition-transform group-hover:-translate-y-1 group-hover:translate-x-2" />
                    </button>
                  </form>
                  <p className="opacity-80 mt-5 font-medium text-[13px] text-orange-100 text-center">
                    Join 8,000+ owners. No spam, just pure love. 🐾
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;