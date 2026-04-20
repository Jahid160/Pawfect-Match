"use client";

import React from "react";
import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";

const Loading = () => {
  // Paw prints er position gulo define kora
  const paws = [
    { x: -40, y: 10, rotate: -20 },
    { x: -10, y: -20, rotate: 10 },
    { x: 20, y: 10, rotate: 30 },
    { x: 50, y: -20, rotate: 10 },
  ];

  return (
    <div className="flex justify-center items-center bg-white w-full min-h-[85vh]">
      <div className="flex flex-col items-center">
        
        {/* --- Paw Trail Animation --- */}
        <div className="relative flex justify-center items-center mb-10 w-40 h-24">
          {paws.map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: [0, 1, 0], 
                scale: [0.8, 1.2, 0.8] 
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                left: `calc(50% + ${pos.x}px)`,
                top: `calc(50% + ${pos.y}px)`,
                transform: `rotate(${pos.rotate}deg)`,
              }}
              className="text-orange-500"
            >
              <PawPrint size={32} fill="currentColor" />
            </motion.div>
          ))}
        </div>

        {/* --- Sleek Text & Progress --- */}
        <div className="text-center">
          <motion.h2 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-black text-slate-800 text-xl uppercase tracking-[0.3em]"
          >
            Searching<span className="text-orange-500">...</span>
          </motion.h2>
          
          <p className="mt-2 font-medium text-slate-400 text-xs uppercase tracking-widest">
            Finding your soul mate
          </p>
        </div>

        {/* --- Minimalist Dot Loader --- */}
        <div className="flex gap-2 mt-8">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              animate={{
                y: [0, -6, 0],
                backgroundColor: ["#e2e8f0", "#f97316", "#e2e8f0"]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: dot * 0.2
              }}
              className="rounded-full w-2.5 h-2.5"
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Loading;