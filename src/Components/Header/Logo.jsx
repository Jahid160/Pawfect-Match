"use client";

import Link from "next/link";
import { Heart, PawPrint } from "lucide-react";
import { motion } from "framer-motion";

export default function Logo() {
  const slogan = "Pet Adoption & Care";

  // অক্ষরগুলোর জন্য এনিমেশন ভেরিয়েন্ট - Fixed Duration and Ease
  const charVariants = {
    initial: { y: 0 },
    hover: (i) => ({
      y: [0, -10, 0],
      color: i > 2 ? "#f97316" : "#0f172a",
      transition: {
        duration: 0.6,
        delay: i * 0.05,
        repeat: Infinity,
        repeatDelay: 1,
        ease: "easeInOut", // Spring এর বদলে ease ব্যবহার করা হয়েছে ৩টি কী-ফ্রেমের জন্য
      },
    }),
  };

  return (
    <Link href={'/'}>
      <motion.div 
        className="group flex items-center gap-3 cursor-pointer"
        whileHover="hover"
        initial="initial"
      >
        {/* --- ICON SECTION --- */}
        <div className="relative flex justify-center items-center w-12 h-12">
          <motion.div 
            className="absolute inset-0 border-2 border-orange-200 border-dashed rounded-2xl"
            variants={{
              hover: { rotate: 180, scale: 1.1, transition: { duration: 1.2, ease: "easeInOut" } }
            }}
          />
          
          <motion.div 
            className="z-10 relative flex justify-center items-center bg-white shadow-lg shadow-orange-100 border border-orange-50 rounded-2xl w-11 h-11"
            variants={{
              hover: { y: -2 }
            }}
          >
            <motion.div
              variants={{
                hover: { 
                  scale: [1, 1.2, 1],
                  transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
                }
              }}
              className="text-slate-700 group-hover:text-orange-500 transition-colors"
            >
              <PawPrint size={26} strokeWidth={2.5} />
            </motion.div>

            {/* Fixed Heart Pop Animation */}
            <motion.div
              className="absolute text-orange-500"
              variants={{
                initial: { scale: 0, opacity: 0, y: 0 },
                hover: { 
                  scale: 1, // Spring এ ৩টি কী-ফ্রেমের বদলে ১টি টার্গেট ভ্যালু দেওয়া হয়েছে
                  opacity: 1,
                  y: -18,
                  x: 10,
                  transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 10 // এটি অটোমেটিক বাউন্স ইফেক্ট তৈরি করবে
                  } 
                }
              }}
            >
              <Heart size={14} fill="currentColor" />
            </motion.div>
          </motion.div>
        </div>

        {/* --- TEXT SECTION --- */}
        <div className="flex flex-col">
          <div className="flex overflow-hidden">
            {"PAWFECT".split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={charVariants}
                className={`text-2xl font-black leading-none tracking-tighter inline-block ${
                  i > 2 ? "text-orange-500 italic" : "text-slate-800"
                }`}
              >
                {char}
              </motion.span>
            ))}
            
            <motion.span 
              className="self-end bg-orange-500 mb-1 ml-1 rounded-full w-2 h-2"
              animate={{
                boxShadow: ["0px 0px 0px rgba(249,115,22,0)", "0px 0px 10px rgba(249,115,22,0.8)", "0px 0px 0px rgba(249,115,22,0)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          
          <div className="relative overflow-hidden">
            <motion.p 
              className="mt-1 font-black text-[9px] text-slate-400 uppercase tracking-[0.25em]"
              variants={{
                hover: { 
                  x: [0, 5, 0],
                  transition: { duration: 0.4, ease: "easeInOut" }
                }
              }}
            >
              {slogan}
            </motion.p>
            
            <motion.div 
              className="bottom-0 left-0 absolute bg-orange-500 h-[1.5px]"
              initial={{ width: 0 }}
              variants={{
                hover: { width: "100%", transition: { duration: 0.6, ease: "circOut" } }
              }}
            />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}