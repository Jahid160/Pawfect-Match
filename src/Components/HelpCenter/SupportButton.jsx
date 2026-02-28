"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MessageCircleQuestion, ArrowRight } from 'lucide-react';

export default function SupportButton() {
  const router = useRouter();

  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Tooltip visible on hover */}
        <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-neutral text-neutral-content text-sm py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap">
            How can we help?
          </div>
        </div>

        <button
          onClick={() => router.push('/help-center')}
          className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-primary text-primary-content shadow-2xl transition-all hover:bg-primary-focus"
        >
          {/* Background Pulse Effect */}
          <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-transform duration-500"></span>

          {/* Icon Switching Animation */}
          <div className="relative h-7 w-7">
            <MessageCircleQuestion 
              className="absolute inset-0 transition-transform duration-300 group-hover:-translate-y-10 group-hover:opacity-0" 
              size={28} 
            />
            <ArrowRight 
              className="absolute inset-0 translate-y-10 opacity-0 transition-transform duration-300 group-hover:translate-y-0 group-hover:opacity-100" 
              size={28} 
            />
          </div>
        </button>

        {/* DaisyUI Badge for "New" or "Live" status (Optional) */}
        <div className="absolute -top-1 -right-1">
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-secondary"></span>
          </span>
        </div>
      </motion.div>
    </div>
  );
}