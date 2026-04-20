"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaPaw } from 'react-icons/fa';

const Newsletter = () => {
  return (
    <section className="bg-[#FDFCFB] py-24 overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Main Wrapper with Multi-layered Shadows */}
        <div className="relative bg-gradient-to-br from-orange-500 via-orange-550 to-orange-600 shadow-[0_50px_100px_-30px_rgba(249,115,22,0.5)] p-1 md:p-2 rounded-[3.5rem]">
          
          {/* Inner Content Box */}
          <div className="relative bg-orange-500 px-8 md:px-20 py-16 md:py-24 border border-white/20 rounded-[3.2rem] overflow-hidden">
            
            {/* Animated Decorative Elements */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="-top-24 -right-24 absolute bg-orange-300 blur-[100px] rounded-full w-[500px] h-[500px] pointer-events-none"
            />
            <motion.div 
              animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="-bottom-32 -left-32 absolute bg-white/20 blur-[80px] rounded-full w-96 h-96 pointer-events-none"
            />

            {/* Background Icon (Branding) */}
            <div className="hidden lg:block top-[-10%] right-[-5%] absolute text-[20rem] text-white/5 -rotate-12 pointer-events-none select-none">
              <FaPaw />
            </div>

            <div className="z-10 relative items-center gap-16 grid lg:grid-cols-2">
              
              {/* Text Side - Enhanced Typography */}
              <div className="lg:text-left text-center">
                <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md mb-8 px-6 py-2 border border-white/10 rounded-full font-black text-[10px] text-white uppercase tracking-[0.2em]">
                  <span className="bg-white shadow-[0_0_10px_white] rounded-full w-2 h-2 animate-pulse"></span>
                  Join the pack
                </div>
                <h2 className="mb-8 font-black text-white text-5xl md:text-7xl leading-[0.95] tracking-[-0.04em]">
                  Every tail has a <br />
                  <span className="text-orange-200">Success Story.</span>
                </h2>
                <p className="opacity-90 max-w-lg font-medium text-orange-50 text-xl leading-relaxed">
                  Be the first to know about new rescues, expert pet care tips, and exclusive adoption events.
                </p>
              </div>

              {/* Form Side - Modern Glassmorphism */}
              <div className="flex justify-center lg:justify-end">
                <div className="bg-white/10 shadow-3xl backdrop-blur-2xl p-4 md:p-6 border border-white/20 rounded-[3rem] w-full max-w-md">
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="group relative">
                      <input 
                        type="email" 
                        placeholder="Your best email address" 
                        className="bg-white/95 group-hover:bg-white shadow-2xl px-10 py-6 rounded-[2.2rem] focus:outline-none focus:ring-4 focus:ring-white/30 w-full font-bold text-slate-900 transition-all placeholder-slate-400"
                        required
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="group flex justify-center items-center gap-4 bg-slate-900 hover:bg-black shadow-2xl px-10 py-6 rounded-[2.2rem] w-full font-black text-[11px] text-white uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all transform"
                    >
                      <span>Get Updates</span> 
                      <FaPaperPlane className="text-xs transition-transform group-hover:-translate-y-1 group-hover:translate-x-2" />
                    </button>
                  </form>
                  <div className="flex justify-center items-center gap-3 mt-6">
                    <div className="bg-orange-200/30 w-8 h-[1px]"></div>
                    <p className="font-bold text-[11px] text-orange-100 uppercase leading-none tracking-widest">
                      Join 8,000+ Pet Lovers
                    </p>
                    <div className="bg-orange-200/30 w-8 h-[1px]"></div>
                  </div>
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