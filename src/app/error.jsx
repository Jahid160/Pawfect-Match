"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, RefreshCw, ShieldAlert } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("System Error Context:", error);
  }, [error]);

  return (
    <div className="flex justify-center items-center bg-[#fafafa] px-6 py-20 w-full min-h-[85vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white shadow-slate-200/50 shadow-xl p-12 md:p-20 border border-slate-100 rounded-[2rem] w-full max-w-3xl overflow-hidden text-center"
      >
        {/* Abstract Background Element */}
        <div className="-top-10 -right-10 absolute opacity-[0.03] rotate-12 pointer-events-none">
          <ShieldAlert size={300} />
        </div>

        {/* --- Icon Header --- */}
        <div className="flex justify-center mb-10">
          <div className="bg-orange-50 p-6 rounded-3xl text-orange-600">
            <AlertCircle size={48} strokeWidth={1.5} />
          </div>
        </div>

        {/* --- Textual Content --- */}
        <div className="z-10 relative mx-auto max-w-xl">
          <h1 className="mb-6 font-black text-slate-900 text-3xl md:text-5xl uppercase leading-none tracking-tight">
            System <span className="text-orange-500">Interruption</span>
          </h1>
          <p className="mb-10 font-medium text-slate-500 text-lg md:text-xl leading-relaxed">
            An unexpected technical error occurred while processing your request. 
            Our systems have logged this incident for review.
          </p>
        </div>

        {/* --- Action Controls (Consistent Brand Buttons) --- */}
        <div className="z-10 relative flex sm:flex-row flex-col justify-center items-center gap-5">
          <button
            onClick={() => reset()}
            className="group inline-flex justify-center items-center gap-3 bg-orange-500 hover:bg-slate-800 shadow-lg px-10 py-5 rounded-2xl w-full sm:w-auto font-bold text-[11px] text-white uppercase tracking-[0.2em] active:scale-95 transition-all"
          >
            <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-700" />
            Retry Connection
          </button>

          <Link
            href="/"
            className="inline-flex justify-center items-center gap-3 bg-white hover:bg-slate-50 px-10 py-5 border-2 border-slate-900 rounded-2xl w-full sm:w-auto font-bold text-[11px] text-slate-900 uppercase tracking-[0.2em] active:scale-95 transition-all"
          >
            <ArrowLeft size={18} />
            Return to Dashboard
          </Link>
        </div>

        {/* --- Debugging Information Panel --- */}
        {error?.message && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-left"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-grow bg-slate-100 h-[1px]"></div>
              <span className="px-3 font-bold text-[9px] text-slate-400 uppercase tracking-widest">
                Technical Details
              </span>
              <div className="flex-grow bg-slate-100 h-[1px]"></div>
            </div>
            
            <div className="bg-slate-50 p-6 border border-slate-100 rounded-2xl">
              <code className="block font-mono text-[11px] text-slate-500 break-all leading-normal">
                [Error ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}] 
                <br />
                {error.message}
              </code>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}