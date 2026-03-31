"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    Heart, ShieldCheck, PawPrint, Stethoscope,
    ShoppingBag, Award, Target, Globe, CheckCircle2, Activity, ArrowRight
} from 'lucide-react';
import Newsletter from './Newsletter';
import Link from 'next/link';

const About = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const fadeInUp = {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    };

    return (
        <div className="bg-white selection:bg-orange-100 min-h-screen font-sans text-slate-900 selection:text-orange-600">

            {/* --- 1. HERO SECTION --- */}
            <section className="relative bg-[#fffaf5] pt-32 md:pt-56 pb-24 md:pb-48 overflow-hidden">
                <div className="z-10 relative mx-auto px-6 max-w-7xl">
                    <div className="mx-auto max-w-5xl text-center">
                        <motion.div {...fadeInUp}>
                            <span className="inline-flex items-center gap-3 bg-orange-600/10 mb-10 px-6 py-2.5 border border-orange-600/10 rounded-full font-black text-[10px] text-orange-600 uppercase tracking-[0.4em]">
                                <span className="bg-orange-600 rounded-full w-2 h-2 animate-pulse"></span>
                                Reimagining Pet Companionship
                            </span>
                            <h1 className="mb-12 font-black text-slate-900 text-6xl md:text-9xl leading-[0.85] tracking-[-0.06em]">
                                We Are The Bridge To Your <br />
                                <span className="text-orange-500">New Family</span>
                            </h1>
                            <p className="mx-auto max-w-3xl font-bold text-slate-500 text-xl md:text-3xl leading-relaxed tracking-tight">
                                Pawfect Match isn&apos;t just a directory; it&apos;s a high-tech ecosystem designed to ensure no soul is left behind.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6 mt-20">
                                <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                                    <Link href="/all-pets" className="inline-block bg-slate-900 hover:bg-orange-600 shadow-2xl shadow-slate-900/20 px-14 py-7 rounded-[2.5rem] font-black text-[11px] text-white uppercase tracking-[0.25em] transition-all">
                                        Start Your Journey
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05, y: -5 }}>
                                    <Link href="/contact" className="inline-block bg-white shadow-sm px-14 py-7 border-2 border-slate-100 hover:border-orange-500 rounded-[2.5rem] font-black text-[11px] text-slate-800 uppercase tracking-[0.25em] transition-all">
                                        Contact Support
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="top-0 left-0 absolute opacity-[0.03] w-full h-full pointer-events-none">
                    <PawPrint className="top-20 left-[5%] absolute -rotate-12" size={300} />
                    <PawPrint className="right-[5%] bottom-20 absolute text-orange-600 rotate-12" size={350} />
                </div>
            </section>

            {/* --- 2. THE PROBLEM & OUR GENESIS --- */}
            <section className="bg-white py-32 md:py-64 overflow-hidden">
                <div className="mx-auto px-6 max-w-7xl">
                    <div className="flex lg:flex-row flex-col items-center gap-32">
                        <motion.div className="lg:w-1/2" {...fadeInUp}>
                            <h2 className="mb-12 font-black text-slate-900 text-5xl md:text-7xl leading-none tracking-[-0.04em]">
                                Why We Created <br />
                                <span className="text-orange-500">Pawfect Match</span>
                            </h2>
                            <div className="space-y-10 font-bold text-slate-500 text-xl md:text-2xl leading-relaxed tracking-tight">
                                <p>
                                    Every year, millions of pets end up in shelters. We noticed a massive gap: a lack of transparency and a fragmented system.
                                </p>
                                <p className="text-slate-900">
                                    To solve this, we built a <span className="text-orange-600 decoration-8 decoration-orange-200">centralized ecosystem</span> where every pet is verified.
                                </p>
                                <ul className="space-y-8 pt-8">
                                    {["Unified database across regions", "Certified veterinary experts", "Community-driven marketplace"].map((text, i) => (
                                        <motion.li key={i} whileHover={{ x: 20 }} className="flex items-center gap-5 font-black text-slate-900 text-xs uppercase tracking-widest">
                                            <div className="bg-orange-500 shadow-lg shadow-orange-500/30 p-2 rounded-full text-white">
                                                <CheckCircle2 size={20} />
                                            </div>
                                            {text}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        <motion.div className="group relative lg:w-1/2" {...fadeInUp}>
                            <div className="-z-10 absolute -inset-8 bg-orange-50 rounded-[6rem] group-hover:rotate-3 transition-transform duration-1000 ease-out"></div>
                            <div className="relative bg-slate-100 shadow-[0_80px_120px_-30px_rgba(0,0,0,0.18)] border-[20px] border-white md:border-[30px] rounded-[5rem] aspect-[4/5] overflow-hidden">
                                <Image
                                    src="https://i.ibb.co.com/jkVQgfyb/nunu.avif"
                                    alt="About our mission"
                                    fill className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
                                    sizes="(max-width: 768px) 100vw, 50vw" priority
                                />
                            </div>
                            <motion.div whileHover={{ y: -20, rotate: -3 }} className="hidden md:block -right-16 -bottom-16 z-20 absolute bg-slate-900 shadow-4xl p-16 border-8 border-white rounded-[4rem] text-white">
                                <p className="mb-2 font-black text-orange-500 text-7xl leading-none tracking-tighter">100%</p>
                                <p className="opacity-80 font-black text-[12px] uppercase leading-tight tracking-[0.3em]">
                                    Verified <br /> Process
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- 3. OUR ECOSYSTEM --- */}
            <section className="bg-slate-50 py-32 md:py-64">
                <div className="mx-auto mb-32 px-6 max-w-5xl text-center">
                    <h2 className="mb-10 font-black text-6xl md:text-8xl leading-none tracking-[-0.05em]">A Complete Ecosystem</h2>
                    <p className="font-bold text-slate-400 text-xl md:text-3xl tracking-tight">Everything you need under one digital roof.</p>
                </div>

                <div className="gap-12 grid lg:grid-cols-3 mx-auto px-6 max-w-7xl">
                    {[
                        { title: "Smart Adoption", icon: <PawPrint size={48} />, desc: "Find pets based on your lifestyle, home size, and energy levels." },
                        { title: "Expert Healthcare", icon: <Stethoscope size={48} />, desc: "Host a network of certified doctors. Book appointments instantly." },
                        { title: "Care & Supplies", icon: <ShoppingBag size={48} />, desc: "Curated nutrition guides and links to premium pet accessories." }
                    ].map((item, i) => (
                        <motion.div key={i} whileHover={{ y: -30 }} className="group relative bg-white shadow-3xl shadow-slate-200/40 p-16 border border-slate-50 rounded-[5rem] overflow-hidden transition-all duration-700">
                            <div className="bg-slate-900 group-hover:bg-orange-600 mb-12 p-8 rounded-[2.5rem] w-fit text-white group-hover:rotate-[15deg] transition-all duration-700">
                                {item.icon}
                            </div>
                            <h3 className="mb-8 font-black text-4xl uppercase tracking-tighter">{item.title}</h3>
                            <p className="font-bold text-slate-500 text-xl leading-relaxed tracking-tight">{item.desc}</p>
                            <div className="opacity-0 group-hover:opacity-100 mt-12 transition-opacity duration-500">
                                <span className="inline-flex items-center gap-3 font-black text-[11px] text-orange-600 uppercase tracking-[0.3em]">
                                    Explore more <ArrowRight size={18} />
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- 4. MISSION & VISION --- */}
            <section className="mx-auto px-6 py-32 md:py-64 max-w-7xl">
                <div className="items-stretch gap-16 grid md:grid-cols-2">
                    <motion.div whileHover={{ scale: 0.97 }} {...fadeInUp} className="group relative bg-orange-600 p-20 md:p-32 rounded-[5.5rem] overflow-hidden text-white">
                        <Target className="opacity-10 mb-12 group-hover:scale-110 transition-transform duration-1000" size={100} />
                        <h2 className="mb-10 font-black text-6xl uppercase tracking-tighter">Our Mission</h2>
                        <p className="font-bold text-orange-50 text-2xl md:text-3xl leading-snug tracking-tight">
                            To revolutionize pet adoption with a transparent, tech-driven platform.
                        </p>
                    </motion.div>

                    <motion.div whileHover={{ scale: 0.97 }} {...fadeInUp} className="group relative bg-slate-900 p-20 md:p-32 rounded-[5.5rem] overflow-hidden text-white">
                        <Globe className="opacity-10 mb-12 text-orange-500 group-hover:scale-110 transition-transform duration-1000" size={100} />
                        <h2 className="mb-10 font-black text-6xl uppercase tracking-tighter">Our Vision</h2>
                        <p className="font-bold text-slate-300 text-2xl md:text-3xl leading-snug tracking-tight">
                            A world where every stray has a digital identity and a path to professional care.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* --- 5. CORE VALUES --- */}
            <section className="bg-white pb-64">
                <div className="mx-auto px-6 max-w-7xl text-center">
                    <motion.div {...fadeInUp} className="mb-32">
                        <h2 className="mb-8 font-black text-slate-900 text-6xl md:text-9xl uppercase tracking-[-0.05em]">
                            Our <span className="text-orange-500">Core Values</span>
                        </h2>
                        <div className="bg-orange-500 mx-auto rounded-full w-48 h-3"></div>
                    </motion.div>

                    <div className="gap-10 grid md:grid-cols-2 lg:grid-cols-4">
                        {[
                            { title: "Integrity", desc: "Hand-verified doctors through background checks.", icon: <ShieldCheck className="w-10 h-10" />, color: "bg-blue-50 text-blue-600" },
                            { title: "Love", desc: "Building families with lifelong emotional bonds.", icon: <Heart className="w-10 h-10" />, color: "bg-red-50 text-red-600" },
                            { title: "Smart", desc: "Advanced Admin Dashboard for health tracking.", icon: <Activity className="w-10 h-10" />, color: "bg-emerald-50 text-emerald-600" },
                            { title: "Open", desc: "Real-time updates via notification systems.", icon: <Award className="w-10 h-10" />, color: "bg-orange-50 text-orange-600" }
                        ].map((value, i) => (
                            <motion.div key={i} whileHover={{ y: -20 }} className="group bg-slate-50/50 hover:bg-white hover:shadow-4xl p-14 border border-slate-50 rounded-[4.5rem] transition-all duration-700">
                                <div className={`mb-12 p-6 rounded-[2rem] w-fit ${value.color} group-hover:scale-125 transition-all duration-700 mx-auto md:mx-0`}>
                                    {value.icon}
                                </div>
                                <h3 className="mb-6 font-black text-slate-900 text-3xl uppercase tracking-tighter">{value.title}</h3>
                                <p className="font-bold text-slate-400 text-lg leading-relaxed tracking-tight">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Newsletter />
        </div>
    );
};

export default About;