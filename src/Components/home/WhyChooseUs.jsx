"use client";

import React, { useRef } from 'react';
import { ShieldCheck, Stethoscope, Heart, UserCheck, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const WhyChooseUs = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const reveal = useTransform(scrollYProgress, [0.35, 0.65], [0, 100]);
    const opacityIndicator = useTransform(scrollYProgress, [0.35, 0.4, 0.6, 0.65], [0, 1, 1, 0]);

    const features = [
        { id: 1, title: "Verified Safety", description: "Every pet profile undergoes a rigorous verification process.", icon: <ShieldCheck size={32} /> },
        { id: 2, title: "Health First", description: "Detailed medical history and vaccination ensured before adoption.", icon: <Stethoscope size={32} /> },
        { id: 3, title: "Expert Support", description: "Our experts are available 24/7 to guide you through care.", icon: <UserCheck size={32} /> },
        { id: 4, title: "Pure Love", description: "Focusing on personality match and lifestyle compatibility.", icon: <Heart size={32} /> },
    ];

    return (
        <section ref={containerRef} className="relative bg-[#FDFCFB] py-20 lg:py-32 overflow-hidden">
            <div className="z-10 relative mx-auto px-6 lg:px-8 max-w-[1400px]">

                {/* --- SECTION HEADER --- */}
                <div className="mx-auto mb-16 lg:mb-24 max-w-5xl text-center">
                    <div className="inline-flex items-center gap-2 bg-orange-50 mb-6 px-4 py-2 border border-orange-100 rounded-full font-black text-[10px] text-orange-600 uppercase tracking-[0.3em]">
                        <Sparkles size={12} className="animate-pulse" /> Why Choose Us
                    </div>

                    <h2 className="mb-6 lg:mb-8 font-black text-slate-900 lg:text-[80px] text-4xl md:text-7xl leading-[1.1] lg:leading-[0.95] tracking-[-0.04em]">
                        The standard of care <br className="hidden md:block" />
                        <span className="text-orange-500">they deserve.</span>
                    </h2>

                    <p className="mx-auto max-w-2xl font-medium text-slate-500 text-sm md:text-lg leading-relaxed">
                        We don't just find homes; we ensure a lifestyle of health and happiness
                        starting with what's in their bowl and ending with a wagging tail.
                    </p>
                </div>

                <div className="flex lg:flex-row flex-col justify-between items-center gap-12 lg:gap-8">

                    {/* Left Features - Order 2 on Mobile */}
                    <div className="space-y-12 lg:space-y-24 order-2 lg:order-1 w-full lg:w-1/4">
                        {features.slice(0, 2).map((f) => (
                            <div key={f.id} className="group flex flex-col items-center lg:items-end text-center lg:text-right">
                                <div className="flex justify-center items-center bg-white shadow-xl group-hover:shadow-orange-100 mb-6 rounded-3xl w-20 h-20 text-orange-500 transition-all group-hover:-translate-y-2 duration-500">
                                    {f.icon}
                                </div>
                                <h4 className="mb-3 font-black text-slate-900 group-hover:text-orange-600 text-xl md:text-2xl tracking-tight transition-colors">
                                    {f.title}
                                </h4>
                                <p className="font-medium text-slate-500 text-xs md:text-base leading-relaxed">
                                    {f.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Central Visual - Circular Frame Fix for Mobile */}
                    <div className="flex justify-center order-1 lg:order-2 w-full lg:w-2/4">
                        <div className="group relative bg-white shadow-2xl border-[8px] border-white lg:border-[12px] rounded-full w-[280px] sm:w-[450px] lg:w-[550px] h-[280px] sm:h-[450px] lg:h-[550px] overflow-hidden">
                            
                            {/* Background Image */}
                            <Image
                                src="https://i.ibb.co.com/3YWs98HK/bonnie-kittle-MUcxe-w-Dur-E-unsplash.jpg"
                                alt="Standard Pet Care"
                                fill
                                sizes="(max-width: 768px) 280px, 550px"
                                className="absolute inset-0 brightness-90 grayscale-[40%] object-cover group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Reveal Image with ClipPath */}
                            <motion.div
                                className="z-10 absolute inset-0 border-r-[4px] lg:border-r-[8px]"
                                style={{
                                    clipPath: useTransform(reveal, (v) => `inset(0 ${100 - v}% 0 0)`)
                                }}
                            >
                                <Image
                                    src="https://i.ibb.co.com/4g748wmh/zhen-yao-WG-Qdg-WTZ-s-unsplash.jpg"
                                    alt="Premium Care"
                                    fill
                                    sizes="(max-width: 768px) 280px, 550px"
                                    className="absolute inset-0 object-cover"
                                />
                            </motion.div>

                            {/* Indicator Label */}
                            <motion.div
                                style={{ opacity: opacityIndicator }}
                                animate={{ y: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="bottom-8 lg:bottom-16 left-1/2 z-20 absolute bg-slate-900 shadow-xl px-4 lg:px-8 py-2 lg:py-3 rounded-full font-black text-[8px] text-white lg:text-[10px] tracking-widest whitespace-nowrap -translate-x-1/2"
                            >
                                SCROLL TO REVEAL
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Features - Order 3 */}
                    <div className="space-y-12 lg:space-y-24 order-3 w-full lg:w-1/4">
                        {features.slice(2, 4).map((f) => (
                            <div key={f.id} className="group flex flex-col items-center lg:items-start lg:text-left text-center">
                                <div className="flex justify-center items-center bg-white shadow-xl group-hover:shadow-orange-100 mb-6 rounded-3xl w-20 h-20 text-orange-500 transition-all group-hover:-translate-y-2 duration-500">
                                    {f.icon}
                                </div>
                                <h4 className="mb-3 font-black text-slate-900 group-hover:text-orange-600 text-xl md:text-2xl tracking-tight transition-colors">
                                    {f.title}
                                </h4>
                                <p className="font-medium text-slate-500 text-xs md:text-base leading-relaxed">
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