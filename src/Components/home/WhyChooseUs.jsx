"use client";

import React, { useRef } from 'react';
import { FaShieldAlt, FaStethoscope, FaHeart, FaUserCheck } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image'; // Next.js Image ইমপোর্ট করা হলো

const WhyChooseUs = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const reveal = useTransform(scrollYProgress, [0.35, 0.65], [0, 100]);
    const opacityIndicator = useTransform(scrollYProgress, [0.35, 0.4, 0.6, 0.65], [0, 1, 1, 0]);

    const features = [
        { id: 1, title: "Verified Safety", description: "Every pet profile undergoes a rigorous verification process.", icon: <FaShieldAlt className="text-3xl" /> },
        { id: 2, title: "Health First", description: "Detailed medical history and vaccination ensured before adoption.", icon: <FaStethoscope className="text-3xl" /> },
        { id: 3, title: "Expert Support", description: "Our experts are available 24/7 to guide you through care.", icon: <FaUserCheck className="text-3xl" /> },
        { id: 4, title: "Pure Love", description: "Focusing on personality match and lifestyle compatibility.", icon: <FaHeart className="text-3xl" /> },
    ];

    return (
        <section ref={containerRef} className="relative bg-[#FDFCFB] py-32 overflow-hidden">
            <div className="z-10 relative mx-auto px-6 lg:px-8 max-w-[1400px]">

                {/* --- SECTION HEADER --- */}
                <div className="mx-auto mb-24 max-w-5xl text-center">
                    <div className="inline-flex items-center gap-2 bg-orange-50 mb-6 px-4 py-2 border border-orange-100 rounded-full font-black text-[10px] text-orange-600 uppercase tracking-[0.3em]">
                        Why Choose Us
                    </div>

                    <h2 className="mb-8 font-black text-slate-900 lg:text-[80px] text-5xl md:text-7xl leading-[0.95] tracking-[-0.04em]">
                        The standard of care <br />
                        <span className="text-orange-500 italic">they deserve.</span>
                    </h2>

                    <p className="mx-auto max-w-3xl font-medium text-slate-500 text-base md:text-lg leading-relaxed">
                        We don't just find homes; we ensure a lifestyle of health and happiness
                        that starts with what's in their bowl and ends with a wagging tail.
                    </p>
                </div>

                <div className="flex lg:flex-row flex-col justify-between items-center gap-16 lg:gap-8">

                    {/* Left Features */}
                    <div className="space-y-24 order-2 lg:order-1 w-full lg:w-1/4">
                        {features.slice(0, 2).map((f) => (
                            <div key={f.id} className="group flex flex-col items-center lg:items-end text-center lg:text-right">
                                <div className="flex justify-center items-center bg-white shadow-slate-100 shadow-xl group-hover:shadow-orange-200 mb-8 rounded-[2rem] w-24 h-24 text-orange-500 transition-all group-hover:-translate-y-2 duration-500">
                                    {f.icon}
                                </div>
                                <h4 className="mb-4 font-black text-slate-900 group-hover:text-orange-600 text-2xl md:text-3xl tracking-tight transition-colors duration-300">
                                    {f.title}
                                </h4>
                                <p className="font-medium text-slate-500 text-sm md:text-base leading-relaxed">
                                    {f.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Central Visual */}
                    <div className="flex justify-center order-1 lg:order-2 w-full lg:w-2/4">
                        <div className="group relative bg-white shadow-[0_50px_100px_-20px_rgba(251,146,60,0.2)] border-[12px] border-white rounded-full w-[340px] sm:w-[500px] md:w-[550px] h-[340px] sm:h-[500px] md:h-[550px] overflow-hidden">
                            
                            {/* Background Image (Standard Care) */}
                            <Image
                                src="https://i.ibb.co.com/3YWs98HK/bonnie-kittle-MUcxe-w-Dur-E-unsplash.jpg"
                                alt="Standard Pet Care"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="absolute inset-0 brightness-90 grayscale-[40%] object-cover group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Reveal Image (Premium Care) */}
                            <motion.div
                                className="z-10 absolute inset-0 shadow-2xl border-orange-500 border-r-[8px]"
                                style={{
                                    clipPath: useTransform(reveal, (v) => `inset(0 ${100 - v}% 0 0)`)
                                }}
                            >
                                <Image
                                    src="https://i.ibb.co.com/4g748wmh/zhen-yao-WG-Qdg-WTZ-s-unsplash.jpg"
                                    alt="Premium PawFact Care"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="absolute inset-0 object-cover"
                                />
                            </motion.div>

                            <motion.div
                                style={{ opacity: opacityIndicator }}
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="bottom-16 left-1/2 z-20 absolute bg-slate-900/90 shadow-xl backdrop-blur-sm px-8 py-3 rounded-full font-black text-[10px] text-white tracking-[0.2em] -translate-x-1/2"
                            >
                                SCROLL TO REVEAL
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Features */}
                    <div className="space-y-24 order-3 w-full lg:w-1/4">
                        {features.slice(2, 4).map((f) => (
                            <div key={f.id} className="group flex flex-col items-center lg:items-start lg:text-left text-center">
                                <div className="flex justify-center items-center bg-white shadow-slate-100 shadow-xl group-hover:shadow-orange-200 mb-8 rounded-[2rem] w-24 h-24 text-orange-500 transition-all group-hover:-translate-y-2 duration-500">
                                    {f.icon}
                                </div>
                                <h4 className="mb-4 font-black text-slate-900 group-hover:text-orange-600 text-2xl md:text-3xl tracking-tight transition-colors duration-300">
                                    {f.title}
                                </h4>
                                <p className="font-medium text-slate-500 text-sm md:text-base leading-relaxed">
                                    {f.description}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;