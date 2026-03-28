"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Home, PawPrint, Sparkles, AlertCircle } from "lucide-react";

const Error404 = () => {
  return (
    <div className="relative flex justify-center items-center bg-[#FDFDFD] px-6 w-full min-h-screen overflow-hidden">
      
      {/* Background Decorative Gradients */}
      <div className="top-[-10%] right-[-5%] absolute bg-orange-50 opacity-60 blur-3xl rounded-full w-96 h-96" />
      <div className="bottom-[-10%] left-[-5%] absolute bg-slate-100 opacity-60 blur-3xl rounded-full w-96 h-96" />

      <div className="z-10 relative w-full max-w-3xl text-center">
        
        {/* Animated Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-orange-100 mb-8 px-5 py-2 rounded-full font-black text-[10px] text-orange-600 uppercase tracking-[0.3em]"
        >
          <AlertCircle size={14} /> Page Missing
        </motion.div>

        {/* Big 404 Text with PawPrint Accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-6"
        >
          <h1 className="opacity-10 font-black text-[120px] text-slate-900 md:text-[180px] leading-none tracking-tighter select-none">
            404
          </h1>
          <div className="absolute inset-0 flex justify-center items-center">
            <h2 className="font-black text-slate-900 text-4xl md:text-6xl leading-tight tracking-tight">
              Lost your <span className="text-orange-500 underline">way?</span>
            </h2>
          </div>
        </motion.div>

        {/* Subtext */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mb-12 max-w-lg font-medium text-slate-500 text-lg md:text-xl leading-relaxed"
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex sm:flex-row flex-col justify-center items-center gap-5"
        >
          <Link
            href="/"
            className="group flex items-center gap-3 bg-slate-900 hover:bg-orange-600 shadow-slate-200 shadow-xl hover:shadow-orange-200 px-12 py-5 rounded-2xl font-black text-[11px] text-white uppercase tracking-[0.2em] transition-all"
          >
            <Home size={16} /> Return Home
          </Link>

          <Link
            href="/pets"
            className="group flex items-center gap-3 bg-white px-12 py-5 border-2 border-slate-100 hover:border-orange-500/20 rounded-2xl font-black text-[11px] text-slate-900 hover:text-orange-600 uppercase tracking-[0.2em] transition-all"
          >
            <Search size={16} /> Search Pets
          </Link>
        </motion.div>

        {/* Navigation Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-x-12 gap-y-4 mt-20 pt-8 border-slate-100 border-t font-bold text-[10px] text-slate-400 uppercase tracking-widest"
        >
          <Link href="/contact" className="hover:text-orange-500 transition-colors">Contact Support</Link>
          <Link href="/faq" className="hover:text-orange-500 transition-colors">Help Center</Link>
          <Link href="/about" className="hover:text-orange-500 transition-colors">About Us</Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Error404;