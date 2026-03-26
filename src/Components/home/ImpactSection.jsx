"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { Users, Heart, ShieldCheck, Sparkles, Dog } from "lucide-react";

// --- COUNTER COMPONENT ---
const Counter = ({ value, duration = 2 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, value, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const ImpactSection = () => {
  const stats = [
    {
      id: 1,
      icon: <Users size={28} />,
      number: 12000,
      suffix: "+",
      label: "Registered Members",
      desc: "Verified animal lovers in our community."
    },
    {
      id: 2,
      icon: <Dog size={28} />,
      number: 8500,
      suffix: "+",
      label: "Happy Adoptions",
      desc: "Pets found their forever homes through us."
    },
    {
      id: 3,
      icon: <Heart size={28} />,
      number: 15000,
      suffix: "+",
      label: "Lives Impacted",
      desc: "Rescued, treated, and cared for daily."
    },
    {
      id: 4,
      icon: <ShieldCheck size={28} />,
      number: 100,
      suffix: "%",
      label: "Verified Shelters",
      desc: "Secure and ethical adoption process."
    }
  ];

  // Variants for Staggered Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section className="relative bg-white py-24 overflow-hidden">
      {/* Background Accent Line */}
      <div className="top-0 left-1/2 absolute bg-gradient-to-r from-transparent via-slate-200 to-transparent w-full h-px -translate-x-1/2" />

      <div className="mx-auto px-6 max-w-7xl">
        <div className="mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-orange-100 mb-4 px-4 py-1.5 rounded-full font-bold text-[10px] text-orange-600 uppercase tracking-[0.2em]"
          >
            <Sparkles size={14} /> Our Real Impact
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-black text-slate-900 text-4xl md:text-5xl tracking-tight"
          >
            Trust built on <span className="text-orange-500 decoration-orange-100 underline underline-offset-8 italic">results</span>
          </motion.h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={cardVariants}
              className="group bg-[#FDFDFD] hover:shadow-2xl hover:shadow-orange-100/40 p-8 border border-slate-50 hover:border-orange-100 rounded-[2.5rem] transition-all duration-500"
            >
              {/* Icon Animation */}
              <div className="flex justify-center items-center bg-white shadow-sm mb-6 border border-slate-50 rounded-2xl w-14 h-14 text-slate-400 group-hover:text-orange-500 group-hover:rotate-[360deg] transition-all duration-700">
                {stat.icon}
              </div>

              {/* Number Counter */}
              <h3 className="mb-2 font-black text-slate-900 text-3xl md:text-4xl tracking-tighter">
                <Counter value={stat.number} />{stat.suffix}
              </h3>

              <p className="mb-3 font-bold text-[10px] text-orange-600 uppercase tracking-[0.2em]">
                {stat.label}
              </p>
              
              <p className="font-medium text-slate-400 text-sm leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;