"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { Users, Heart, ShieldCheck, Sparkles, Dog, ArrowUpRight } from "lucide-react";

// --- COUNTER COMPONENT ---
const Counter = ({ value, duration = 2.5 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: duration, ease: [0.32, 0.23, 0.4, 0.9] });
      return controls.stop;
    }
  }, [isInView, value, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const ImpactSection = () => {
  const stats = [
    {
      id: 1,
      icon: <Users size={24} />,
      number: 12000,
      suffix: "+",
      label: "Community Members",
      desc: "Verified animal lovers joined us."
    },
    {
      id: 2,
      icon: <Dog size={24} />,
      number: 8500,
      suffix: "+",
      label: "Success Stories",
      desc: "Pets found their forever families."
    },
    {
      id: 3,
      icon: <Heart size={24} />,
      number: 15000,
      suffix: "+",
      label: "Rescue Missions",
      desc: "Emergency cases handled with care."
    },
    {
      id: 4,
      icon: <ShieldCheck size={24} />,
      number: 100,
      suffix: "%",
      label: "Safe Adoption",
      desc: "Secure and ethical process guaranteed."
    }
  ];

  return (
    <section className="relative bg-[#FDFDFD] py-32 overflow-hidden">
      
      {/* --- ELITE BACKGROUND ELEMENTS --- */}
      <div className="top-0 left-0 absolute w-full h-full pointer-events-none">
        <div className="top-[-10%] left-[-5%] absolute bg-orange-50/50 blur-[120px] rounded-full w-[500px] h-[500px]" />
        <div className="right-[-5%] bottom-[-10%] absolute bg-slate-100 blur-[100px] rounded-full w-[400px] h-[400px]" />
      </div>

      <div className="z-10 relative mx-auto px-6 max-w-7xl">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex lg:flex-row flex-col justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl lg:text-left text-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-orange-50 mb-6 px-4 py-2 border border-orange-100 rounded-full font-black text-[10px] text-orange-600 uppercase tracking-[0.3em]"
            >
              <Sparkles size={14} className="animate-pulse" /> The Impact We Make
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-black text-slate-900 text-5xl md:text-7xl leading-[0.9] tracking-tighter"
            >
              Numbers that tell <br />
              <span className="text-orange-500 italic">our story.</span>
            </motion.h2>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="hidden lg:block max-w-xs font-medium text-slate-400 text-sm leading-relaxed"
          >
            We're on a mission to bridge the gap between abandoned pets and loving homes, one pawsitive step at a time.
          </motion.p>
        </div>

        {/* --- STATS GRID --- */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: "circOut" }}
              className="group relative bg-white hover:bg-slate-900 p-10 border border-slate-100 hover:border-slate-900 rounded-[3rem] overflow-hidden transition-all duration-700"
            >
              {/* Card Decor */}
              <div className="top-[-10%] right-[-10%] absolute bg-orange-400 opacity-0 group-hover:opacity-20 blur-2xl rounded-full w-24 h-24 transition-opacity duration-700" />
              
              <div className="z-10 relative">
                <div className="flex justify-between items-start mb-12">
                  <div className="flex justify-center items-center bg-slate-50 group-hover:bg-orange-500 border border-slate-100 group-hover:border-transparent rounded-2xl w-14 h-14 text-slate-400 group-hover:text-white group-hover:rotate-[15deg] transition-all duration-500">
                    {stat.icon}
                  </div>
                  <ArrowUpRight className="opacity-0 group-hover:opacity-100 text-orange-500 transition-all -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 duration-500" size={24} />
                </div>

                <h3 className="mb-2 font-black text-slate-900 group-hover:text-white text-5xl md:text-6xl tracking-tighter transition-colors duration-500">
                  <Counter value={stat.number} />{stat.suffix}
                </h3>

                <p className="mb-4 font-bold text-[10px] text-orange-600 group-hover:text-orange-400 uppercase tracking-[0.2em] transition-colors duration-500">
                  {stat.label}
                </p>
                
                <p className="font-medium text-slate-400 group-hover:text-slate-400 text-sm leading-relaxed transition-colors duration-500">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;