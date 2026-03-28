"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    Heart, ShieldCheck, Users, PawPrint, Stethoscope,
    ShoppingBag, Award, Target, Globe, CheckCircle2, Activity, ArrowRight
} from 'lucide-react';
import Newsletter from './Newsletter';

const About = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    };

    return (
        <div className="bg-white selection:bg-orange-100 min-h-screen font-sans text-slate-900 selection:text-orange-600">

            {/* --- 1. HERO SECTION --- */}
            <section className="relative bg-[#fffaf5] pt-32 md:pt-48 pb-24 md:pb-40 overflow-hidden">
                <div className="z-10 relative mx-auto px-6 max-w-7xl">
                    <div className="mx-auto max-w-4xl text-center">
                        <motion.div {...fadeInUp}>
                            <span className="inline-flex items-center gap-2 bg-orange-500/10 mb-8 px-6 py-2 border border-orange-500/20 rounded-full font-black text-[10px] text-orange-600 uppercase tracking-[0.3em]">
                                <span className="bg-orange-600 rounded-full w-1.5 h-1.5 animate-pulse"></span>
                                Reimagining Pet Companionship
                            </span>
                            <h1 className="mb-10 font-black text-slate-900 text-5xl md:text-8xl leading-[0.95] tracking-[-0.05em]">
                                We Are The Bridge To Your <br />
                                <span className="text-orange-500 italic">New Family Member</span>
                            </h1>
                            <p className="mx-auto max-w-3xl font-medium text-slate-500 text-lg md:text-2xl leading-relaxed">
                                Pawfect Match isn&apos;t just a directory; it&apos;s a high-tech ecosystem designed to ensure no soul is left behind. We combine empathy with innovation to create lifelong bonds.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6 mt-16">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-orange-600 hover:bg-orange-500 shadow-2xl shadow-orange-600/20 px-12 py-6 rounded-[2rem] font-black text-[11px] text-white uppercase tracking-[0.2em] transition-all"
                                >
                                    Start Your Journey
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="bg-white shadow-sm px-12 py-6 border-2 border-slate-200 hover:border-orange-500 rounded-[2rem] font-black text-[11px] text-slate-700 uppercase tracking-[0.2em] transition-all"
                                >
                                    Contact Support
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Subtle Background Elements */}
                <div className="top-0 left-0 absolute opacity-[0.03] w-full h-full pointer-events-none">
                    <PawPrint className="top-20 left-[5%] absolute -rotate-12" size={200} />
                    <PawPrint className="right-[5%] bottom-20 absolute text-orange-600 rotate-12" size={250} />
                </div>
            </section>

            {/* --- 2. THE PROBLEM & OUR GENESIS --- */}
            <section className="bg-white py-32 md:py-48 overflow-hidden">
                <div className="mx-auto px-6 max-w-7xl">
                    <div className="flex lg:flex-row flex-col items-center gap-24">
                        <motion.div className="lg:w-1/2" {...fadeInUp}>
                            <h2 className="mb-10 font-black text-slate-900 text-4xl md:text-6xl leading-none tracking-tight">
                                Why We Created <br />
                                <span className="text-orange-500 italic">Pawfect Match</span>
                            </h2>
                            <div className="space-y-8 font-medium text-slate-500 text-lg md:text-xl leading-relaxed">
                                <p>
                                    Every year, millions of pets end up in shelters, and many more wander the streets. We noticed a massive gap: a lack of transparency and a fragmented system.
                                </p>
                                <p className="text-slate-900">
                                    To solve this, we built a <span className="font-black text-orange-600 decoration-orange-200 underline underline-offset-8">centralized ecosystem</span> where every pet is verified, every doctor is certified, and every transaction is secure.
                                </p>
                                <ul className="space-y-6 pt-6">
                                    {[
                                        "Unified database for adoption across regions",
                                        "Instant access to professional veterinary experts",
                                        "A community-driven marketplace for pet essentials"
                                    ].map((text, i) => (
                                        <motion.li
                                            key={i}
                                            whileHover={{ x: 15 }}
                                            className="flex items-center gap-4 font-bold text-slate-800"
                                        >
                                            <div className="bg-orange-500 p-1.5 rounded-full text-white">
                                                <CheckCircle2 size={18} />
                                            </div>
                                            {text}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        <motion.div className="group relative lg:w-1/2" {...fadeInUp}>
                            <div className="-z-10 absolute -inset-6 bg-orange-100 rounded-[5rem] group-hover:rotate-6 transition-transform duration-700 ease-out"></div>

                            <div className="relative bg-slate-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[15px] border-white md:border-[20px] rounded-[4rem] aspect-[4/5] overflow-hidden">
                                <Image
                                    src="https://i.ibb.co.com/jkVQgfyb/nunu.avif"
                                    alt="About our mission"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </div>

                            <motion.div
                                whileHover={{ y: -15, rotate: -5 }}
                                className="hidden md:block -right-12 -bottom-12 z-20 absolute bg-slate-900 shadow-3xl p-12 rounded-[3rem] text-white"
                            >
                                <p className="mb-2 font-black text-orange-500 text-6xl tracking-tighter">100%</p>
                                <p className="font-black text-[11px] uppercase leading-none tracking-[0.25em]">
                                    Verified <br /> Process
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- 3. OUR ECOSYSTEM (Enhanced Cards) --- */}
            <section className="bg-slate-50 py-32 md:py-48">
                <div className="mx-auto mb-24 px-6 max-w-4xl text-center">
                    <h2 className="mb-8 font-black text-5xl md:text-7xl leading-none tracking-tighter">A Complete Ecosystem</h2>
                    <p className="font-medium text-slate-500 text-xl leading-relaxed">
                        We have integrated everything you need to be a successful pet parent under one digital roof.
                    </p>
                </div>

                <div className="gap-10 grid lg:grid-cols-3 mx-auto px-6 max-w-7xl">
                    {[
                        {
                            title: "Smart Adoption",
                            icon: <PawPrint size={44} />,
                            desc: "Our category-based search and smart filters allow you to find pets based on your lifestyle, home size, and energy levels."
                        },
                        {
                            title: "Expert Healthcare",
                            icon: <Stethoscope size={44} />,
                            desc: "We host a network of certified doctors. From routine vaccinations to emergency consultations, book appointments instantly."
                        },
                        {
                            title: "Care & Supplies",
                            icon: <ShoppingBag size={44} />,
                            desc: "Beyond adoption, we provide curated nutrition guides and links to premium pet accessories for your new friend."
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -20 }}
                            className="group relative bg-white shadow-2xl shadow-slate-200/50 p-14 border border-slate-100 rounded-[4rem] overflow-hidden transition-all duration-500"
                        >
                            <div className="bg-slate-50 group-hover:bg-orange-600 mb-10 p-6 rounded-[2rem] w-fit text-slate-900 group-hover:text-white group-hover:rotate-12 transition-all duration-500 transform">
                                {item.icon}
                            </div>
                            <h3 className="mb-6 font-black text-3xl tracking-tight transition-colors">{item.title}</h3>
                            <p className="font-medium text-slate-500 text-lg leading-relaxed">{item.desc}</p>
                            
                            <div className="opacity-0 group-hover:opacity-100 mt-10 transition-opacity">
                                <span className="inline-flex items-center gap-2 font-black text-[10px] text-orange-600 uppercase tracking-widest">
                                    Explore more <ArrowRight size={14} />
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- 4. MISSION & VISION (High Contrast) --- */}
            <section className="mx-auto px-6 py-32 md:py-56 max-w-7xl">
                <div className="items-stretch gap-12 grid md:grid-cols-2">
                    <motion.div
                        whileHover={{ scale: 0.98 }}
                        {...fadeInUp}
                        className="group relative bg-orange-600 p-16 md:p-24 rounded-[4.5rem] overflow-hidden text-white"
                    >
                        <Target className="opacity-20 mb-10 group-hover:scale-110 transition-transform duration-700" size={80} />
                        <h2 className="mb-8 font-black text-5xl italic uppercase tracking-tighter">Our Mission</h2>
                        <p className="font-medium text-orange-50 text-2xl leading-relaxed">
                            To revolutionize the pet adoption landscape by providing a secure, transparent, and technology-driven platform that minimizes animal homelessness.
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 0.98 }}
                        {...fadeInUp}
                        className="group relative bg-slate-900 p-16 md:p-24 rounded-[4.5rem] overflow-hidden text-white"
                    >
                        <Globe className="opacity-20 mb-10 text-orange-500 group-hover:scale-110 transition-transform duration-700" size={80} />
                        <h2 className="mb-8 font-black text-5xl italic uppercase tracking-tighter">Our Vision</h2>
                        <p className="font-medium text-slate-300 text-2xl leading-relaxed">
                            We envision a world where every stray animal has a digital identity and a guaranteed path to a loving home and professional care.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* --- 5. CORE VALUES --- */}
            <section className="bg-white pb-32">
                <div className="mx-auto px-6 max-w-7xl">
                    <motion.div {...fadeInUp} className="mb-24 text-center">
                        <h2 className="mb-6 font-black text-slate-900 text-5xl md:text-7xl uppercase tracking-tighter">
                            Our <span className="text-orange-500 italic">Core Values</span>
                        </h2>
                        <div className="bg-orange-500 mx-auto rounded-full w-32 h-2.5"></div>
                    </motion.div>

                    <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                title: "Medical Integrity",
                                desc: "Every doctor on our platform is hand-verified through rigorous background checks.",
                                icon: <ShieldCheck className="w-9 h-9" />,
                                color: "bg-blue-50 text-blue-600"
                            },
                            {
                                title: "Unconditional Love",
                                desc: "We don't just facilitate adoptions; we build families with lifelong bonds.",
                                icon: <Heart className="w-9 h-9" />,
                                color: "bg-red-50 text-red-600"
                            },
                            {
                                title: "Smart Management",
                                desc: "Advanced Admin Dashboard for tracking health records and adoption status.",
                                icon: <Activity className="w-9 h-9" />, 
                                color: "bg-emerald-50 text-emerald-600"
                            },
                            {
                                title: "Transparent Process",
                                desc: "Real-time updates via our notification system at every stage of adoption.",
                                icon: <Award className="w-9 h-9" />,
                                color: "bg-orange-50 text-orange-600"
                            }
                        ].map((value, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -15 }}
                                className="group bg-slate-50/50 hover:bg-white hover:shadow-3xl p-12 border border-slate-100 rounded-[3.5rem] transition-all duration-500"
                            >
                                <div className={`mb-10 p-5 rounded-[1.5rem] w-fit ${value.color} group-hover:scale-110 transition-transform duration-500`}>
                                    {value.icon}
                                </div>
                                <h3 className="mb-6 font-black text-slate-900 text-2xl italic uppercase tracking-tighter">
                                    {value.title}
                                </h3>
                                <p className="font-medium text-[15px] text-slate-500 leading-relaxed">
                                    {value.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 6. CTA --- */}
            <Newsletter />
        </div>
    );
};

export default About;