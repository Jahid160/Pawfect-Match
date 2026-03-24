"use client";

import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex justify-center items-center bg-white px-4 w-full min-h-[80vh]">
      <div className="flex flex-col items-center w-full max-w-sm">
        
        {/* Animated Paw & Ring */}
        <div className="relative flex justify-center items-center mb-8">
          {/* Outer Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="border-4 border-orange-100 border-t-orange-500 rounded-full w-24 h-24"
          />
          
          {/* Central Pulsing Paw */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute text-4xl"
          >
            🐾
          </motion.div>
        </div>

        {/* Text with Staggered Animation */}
        <div className="space-y-2 text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-black text-slate-800 text-2xl tracking-tight"
          >
            Preparing <span className="text-orange-500 italic">Pawfect</span> Matches
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center items-center gap-1 font-medium text-slate-500"
          >
            <span>Fetching fresh updates</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 1] }}
            >.</motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
            >.</motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
            >.</motion.span>
          </motion.div>
        </div>

        {/* Modern Progress Line */}
        <div className="relative bg-slate-100 mt-8 rounded-full w-48 h-1.5 overflow-hidden">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="top-0 bottom-0 absolute bg-gradient-to-r from-transparent via-orange-500 to-transparent w-1/2"
          />
        </div>

        {/* Tip Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-orange-50 mt-12 px-6 py-2 border border-orange-100 rounded-full"
        >
          <p className="font-bold text-[11px] text-orange-600 uppercase tracking-widest">
            Pro Tip: Use filters for faster results
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;