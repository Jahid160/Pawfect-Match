"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Syringe, ArrowRight, ShieldCheck, Activity, ChevronLeft, ChevronRight, Bell, HeartPulse } from "lucide-react";
import Link from "next/link";

const VaccinationSection = () => {
    const vaccineSlides = [
        {
            id: 1,
            vaccineName: "Rabies Vaccine",
            targetAudience: "Dogs & Cats",
            image: "https://i.ibb.co.com/zT7ZxSpM/DHPP-Vaccine.avif", 
            description: "Essential protection against rabies virus.",
            status: "Mandatory",
            price: "$25"
        },
        {
            id: 2,
            vaccineName: "DHPP Vaccine",
            targetAudience: "Dogs Only",
            image: "https://i.ibb.co.com/8gdyWMZY/Rabies-Vaccine.jpg",
            description: "5-in-1 vaccine protecting against Distemper.",
            status: "High Demand",
            price: "$45"
        },
        {
            id: 3,
            vaccineName: "FVRCP Vaccine",
            targetAudience: "Cats Only",
            image: "https://i.ibb.co.com/V0qRDR1V/FVRCP-Vaccine.avif",
            description: "Core vaccine for feline viral protection.",
            status: "Recommended",
            price: "$35"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % vaccineSlides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [vaccineSlides.length]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + vaccineSlides.length) % vaccineSlides.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % vaccineSlides.length);
    };

    return (
        <section className="relative bg-orange-50/30 mx-4 my-20 py-24 border border-orange-100 rounded-[4rem] overflow-hidden">
            <div className="-top-24 -left-24 absolute bg-orange-200/20 blur-[100px] rounded-full w-96 h-96 pointer-events-none"></div>
            <div className="right-0 bottom-0 absolute bg-red-100/30 blur-[80px] rounded-full w-64 h-64 pointer-events-none"></div>

            <div className="z-10 relative mx-auto px-6 max-w-7xl">
                <div className="items-center gap-16 grid grid-cols-1 lg:grid-cols-2">

                    {/* Left Side: Text & Features */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 border border-red-100 rounded-full"
                        >
                            <Bell size={14} className="text-red-600 animate-bounce" />
                            <span className="font-black text-[10px] text-red-600 uppercase tracking-[0.3em]">Health & Safety First</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="font-black text-slate-900 text-5xl md:text-7xl leading-[0.95] tracking-[-0.04em]"
                        >
                            Essential <span className="text-orange-500">Vaccines</span> <br />
                            For Your Pets
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="max-w-md font-medium text-slate-600 text-lg leading-relaxed"
                        >
                            Protect your furry friends with our vet-approved vaccination programs. We ensure the highest quality medical care for every pet adoption journey.
                        </motion.p>

                        <div className="flex flex-wrap gap-8">
                            <div className="flex items-center gap-3">
                                <div className="flex justify-center items-center bg-white shadow-md rounded-2xl w-12 h-12 text-orange-500">
                                    <ShieldCheck size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-black text-slate-800 text-sm uppercase tracking-wider">Certified</span>
                                    <span className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">Medical Grade</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex justify-center items-center bg-white shadow-md rounded-2xl w-12 h-12 text-orange-500">
                                    <HeartPulse size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-black text-slate-800 text-sm uppercase tracking-wider">Safe & Care</span>
                                    <span className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">Expert Handling</span>
                                </div>
                            </div>
                        </div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
                            <Link
                                href="/vaccination"
                                className="group inline-flex items-center gap-4 bg-slate-900 hover:bg-orange-600 shadow-xl px-10 py-5 rounded-2xl font-black text-[11px] text-white uppercase tracking-[0.2em] transition-all duration-500"
                            >
                                <Syringe size={18} />
                                <span>See All Vaccines</span>
                                <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Side: Image Slider (Size Original Rakha Hoyeche) */}
                    <div className="group relative">
                        {/* Main Image Container - ORIGINAL SIZE MAINTAINED */}
                        <div className="z-20 relative bg-white shadow-2xl mx-auto border-[12px] border-white rounded-[3.5rem] w-full max-w-[450px] aspect-[4/5] overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={vaccineSlides[currentIndex].id}
                                    initial={{ opacity: 0, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, filter: "blur(10px)" }}
                                    transition={{ duration: 0.5 }}
                                    className="relative w-full h-full"
                                >
                                    <Image
                                        src={vaccineSlides[currentIndex].image}
                                        alt={vaccineSlides[currentIndex].vaccineName}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation Buttons */}
                        <button onClick={handlePrev} className="top-1/2 -left-6 z-30 absolute bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 shadow-xl p-4 rounded-full text-slate-700 hover:text-orange-500 transition-all -translate-y-1/2">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={handleNext} className="top-1/2 -right-6 z-30 absolute bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 shadow-xl p-4 rounded-full text-slate-700 hover:text-orange-500 transition-all -translate-y-1/2">
                            <ChevronRight size={24} />
                        </button>

                        {/* Floating Info Box */}
                        <motion.div
                            key={`info-${vaccineSlides[currentIndex].id}`}
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="right-0 -bottom-8 z-30 absolute flex items-center gap-5 bg-white shadow-2xl p-6 border border-orange-50 rounded-[2.5rem] min-w-[300px]"
                        >
                            <div className="bg-orange-500 p-4 rounded-2xl text-white">
                                <Activity size={24} />
                            </div>
                            <div className="flex flex-col">
                                <p className="font-black text-[9px] text-orange-500 uppercase tracking-[0.2em]">{vaccineSlides[currentIndex].targetAudience}</p>
                                <p className="font-black text-slate-900 text-xl leading-tight tracking-tight">{vaccineSlides[currentIndex].vaccineName}</p>
                                <p className="mt-1 font-bold text-[10px] text-slate-400 uppercase line-clamp-1 tracking-wider">{vaccineSlides[currentIndex].description}</p>
                            </div>
                        </motion.div>

                        {/* Status Badge */}
                        <motion.div
                            initial={{ scale: 0, rotate: 15 }}
                            animate={{ scale: 1, rotate: -12 }}
                            className="top-10 -left-10 z-40 absolute flex flex-col justify-center items-center bg-red-600 shadow-2xl border-4 border-white rounded-full w-28 h-28 text-white text-center"
                        >
                            <span className="opacity-80 mb-1 font-black text-[8px] uppercase tracking-widest">Status</span>
                            <span className="font-black text-[11px] uppercase leading-tight tracking-tighter">{vaccineSlides[currentIndex].status}</span>
                            <div className="bg-white/20 mt-1 px-2 py-0.5 rounded font-black text-[10px]">
                                {vaccineSlides[currentIndex].price}
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default VaccinationSection;