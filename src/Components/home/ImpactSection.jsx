"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Heart, ShieldCheck, Sparkles, Dog } from "lucide-react";

const ImpactSection = () => {
  const stats = [
    {
      id: 1,
      icon: <Users size={28} />,
      count: "12,000+",
      label: "Registered Members",
      desc: "Verified animal lovers in our community."
    },
    {
      id: 2,
      icon: <Dog size={28} />,
      count: "8,500+",
      label: "Happy Adoptions",
      desc: "Pets found their forever homes through us."
    },
    {
      id: 3,
      icon: <Heart size={28} />,
      count: "15,000+",
      label: "Lives Impacted",
      desc: "Rescued, treated, and cared for daily."
    },
    {
      id: 4,
      icon: <ShieldCheck size={28} />,
      count: "100%",
      label: "Verified Shelters",
      desc: "Secure and ethical adoption process."
    }
  ];

  return (
    <section className="relative bg-white py-24 overflow-hidden">
      {/* Background Accent */}
      <div className="top-0 left-1/2 absolute bg-gradient-to-r from-transparent via-slate-200 to-transparent w-full h-px -translate-x-1/2" />

      <div className="mx-auto px-6 max-w-7xl">
        <div className="mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-orange-100 mb-4 px-4 py-1.5 rounded-full font-bold text-[10px] text-orange-600 uppercase tracking-[0.2em]"
          >
            <Sparkles size={14} /> Our Real Impact
          </motion.div>
          <h2 className="font-black text-slate-900 text-4xl md:text-5xl tracking-tight">
            Trust built on <span className="text-orange-500 italic">results</span>
          </h2>
        </div>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bg-[#FDFDFD] hover:shadow-2xl hover:shadow-orange-100/50 p-8 border border-slate-50 hover:border-orange-100 rounded-[2.5rem] transition-all duration-500"
            >
              <div className="flex justify-center items-center bg-white shadow-sm mb-6 border border-slate-50 rounded-2xl w-14 h-14 text-slate-400 group-hover:text-orange-500 group-hover:scale-110 transition-all duration-500">
                {stat.icon}
              </div>
              <h3 className="mb-2 font-black text-slate-900 text-3xl md:text-4xl tracking-tighter">
                {stat.count}
              </h3>
              <p className="mb-3 font-bold text-orange-600 text-xs uppercase tracking-widest">
                {stat.label}
              </p>
              <p className="font-medium text-slate-400 text-sm leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;