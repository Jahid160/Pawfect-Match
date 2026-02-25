"use client";

import React from 'react';
import { FaShieldAlt, FaStethoscope, FaHeart, FaUserCheck } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';

const WhyChooseUs = () => {
    const { scrollYProgress } = useScroll();

    // Animation timing adjustment for better scroll response
    const reveal = useTransform(scrollYProgress, [0.05, 0.3], [0, 100]);

    const features = [
        { id: 1, title: "Verified Safety", description: "Every pet profile undergoes a rigorous verification process.", icon: <FaShieldAlt className="text-3xl" /> },
        { id: 2, title: "Health First", description: "Detailed medical history and vaccination ensured before adoption.", icon: <FaStethoscope className="text-3xl" /> },
        { id: 3, title: "Expert Support", description: "Our experts are available 24/7 to guide you through care.", icon: <FaUserCheck className="text-3xl" /> },
        { id: 4, title: "Pure Love", description: "Focusing on personality match and lifestyle compatibility.", icon: <FaHeart className="text-3xl" /> },
    ];

    return (
        <section className="bg-[#FDFCFB] py-28 overflow-hidden">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">

                {/* Header Section */}
                <div className="mx-auto mb-24 px-4 max-w-4xl text-center">
                    {/* Header Title */}
                    <h2 className="mb-8 font-black text-gray-900 text-5xl md:text-7xl leading-[1.05] tracking-tight">
                        The standard of care <br />
                        <span className="text-orange-500 italic">they deserve.</span>
                    </h2>

                    {/* Description Text - Perfected Size & Spacing */}
                    <p className="mx-auto max-w-3xl font-medium text-gray-600 text-lg md:text-xl leading-snug md:leading-relaxed tracking-tight">
                        We don't just find homes; we ensure a lifestyle of health and happiness
                        that starts with what's in their bowl and
                        ends with a wagging tail.
                    </p>
                </div>

                <div className="flex lg:flex-row flex-col justify-between items-center gap-12 lg:gap-4">

                    {/* Left Features */}
                    <div className="space-y-24 order-2 lg:order-1 w-full lg:w-1/4">
                        {features.slice(0, 2).map((f) => (
                            <div key={f.id} className="group flex flex-col items-center lg:items-end text-center lg:text-right">
                                <div className="flex justify-center items-center bg-white shadow-2xl group-hover:shadow-orange-200 mb-8 rounded-3xl w-24 h-24 text-orange-500 transition-all group-hover:-translate-y-2 duration-500">
                                    {f.icon}
                                </div>
                                <h4 className="mb-4 font-black text-gray-900 text-3xl">{f.title}</h4>
                                <p className="font-medium text-gray-600 text-lg leading-relaxed">{f.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Central Visual: Massive Reveal Slider (Farmer's Dog Style) */}
                    <div className="flex justify-center order-1 lg:order-2 w-full lg:w-2/4">
                        <div className="group relative bg-white shadow-[0_50px_100px_-20px_rgba(251,146,60,0.3)] border-[16px] border-white rounded-full w-[340px] sm:w-[500px] md:w-[550px] h-[340px] sm:h-[500px] md:h-[550px] overflow-hidden">

                            {/* Image 1: Background (Processed/Raw Vibe) */}
                            <img
                                src="https://i.ibb.co.com/3YWs98HK/bonnie-kittle-MUcxe-w-Dur-E-unsplash.jpg"
                                alt="Standard Pet Care"
                                className="absolute inset-0 brightness-90 grayscale-[40%] w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Image 2: Foreground (Fresh Food/Happy Result Reveal) */}
                            <motion.div
                                className="z-10 absolute inset-0 shadow-2xl border-orange-500 border-r-[8px]"
                                style={{
                                    clipPath: useTransform(reveal, (v) => `inset(0 ${100 - v}% 0 0)`)
                                }}
                            >
                                <img
                                    src="https://i.ibb.co.com/4g748wmh/zhen-yao-WG-Qdg-WTZ-s-unsplash.jpg"
                                    alt="Premium PawFact Care"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </motion.div>

                            {/* Animated Scroll Indicator */}
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="bottom-16 left-1/2 z-20 absolute bg-orange-500 shadow-xl px-8 py-3 rounded-full font-black text-white text-xs tracking-[0.2em] -translate-x-1/2"
                            >
                                SCROLL TO REVEAL
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Features */}
                    <div className="space-y-24 order-3 w-full lg:w-1/4">
                        {features.slice(2, 4).map((f) => (
                            <div key={f.id} className="group flex flex-col items-center lg:items-start lg:text-left text-center">
                                <div className="flex justify-center items-center bg-white shadow-2xl group-hover:shadow-orange-200 mb-8 rounded-3xl w-24 h-24 text-orange-500 transition-all group-hover:-translate-y-2 duration-500">
                                    {f.icon}
                                </div>
                                <h4 className="mb-4 font-black text-gray-900 text-3xl">{f.title}</h4>
                                <p className="font-medium text-gray-600 text-lg leading-relaxed">{f.description}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;