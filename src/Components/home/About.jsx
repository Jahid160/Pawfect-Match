"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    Heart, ShieldCheck, Users, PawPrint, Stethoscope,
    ShoppingBag, Award, Target, Globe, CheckCircle2, Activity // এখানে Activity যোগ করা হয়েছে
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
        transition: { duration: 0.7 }
    };

    return (
        <div className="bg-white min-h-screen font-sans text-slate-900">

            {/* --- 1. HERO SECTION --- */}
            <section className="relative bg-[#fffaf5] pt-24 md:pt-40 pb-20 md:pb-32 overflow-hidden">
                <div className="z-10 relative mx-auto px-6 container">
                    <div className="mx-auto max-w-4xl text-center">
                        <motion.div {...fadeInUp}>
                            <span className="inline-block bg-orange-100 mb-6 px-5 py-2 rounded-full font-bold text-orange-600 text-xs uppercase tracking-[0.2em]">
                                Reimagining Pet Companionship
                            </span>
                            <h1 className="mb-8 font-black text-slate-900 text-4xl md:text-7xl leading-[1.1]">
                                We Are The Bridge To Your <br />
                                <span className="text-orange-500">New Family Member</span>
                            </h1>
                            <p className="mx-auto max-w-3xl text-slate-600 text-lg md:text-xl leading-relaxed">
                                Pawfect Match isn&apos;t just a directory; it&apos;s a high-tech ecosystem designed to ensure no soul is left behind. We combine advanced matching technology with human empathy to create lifelong bonds.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6 mt-12">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-orange-600 hover:bg-orange-700 shadow-orange-200 shadow-xl px-10 py-4 rounded-2xl font-bold text-white transition-all"
                                >
                                    Start Your Journey
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white shadow-sm px-10 py-4 border-2 border-slate-200 hover:border-orange-500 rounded-2xl font-bold text-slate-700 transition-all"
                                >
                                    Contact Support
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="top-0 left-0 absolute opacity-5 w-full h-full pointer-events-none">
                    <PawPrint className="top-20 left-[10%] absolute -rotate-12" size={120} />
                    <PawPrint className="right-[10%] bottom-20 absolute text-orange-600 rotate-12" size={150} />
                </div>
            </section>

            {/* --- 2. THE PROBLEM & OUR GENESIS --- */}
            <section className="bg-white py-24 overflow-hidden">
                <div className="mx-auto px-6 container">
                    <div className="flex lg:flex-row flex-col items-center gap-20">
                        <motion.div className="lg:w-1/2" {...fadeInUp}>
                            <h2 className="mb-8 font-extrabold text-slate-900 text-3xl md:text-5xl">
                                Why We Created <span className="text-orange-500 italic">Pawfect Match</span>
                            </h2>
                            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                                <p>
                                    Every year, millions of pets end up in shelters, and many more wander the streets without care. At the same time, thousands of potential pet parents struggle to find a reliable source for adoption, healthcare, and nutrition.
                                </p>
                                <p>
                                    We noticed a massive gap: a lack of transparency and a fragmented system. To solve this, we built a <strong>centralized platform</strong> where every pet is verified, every doctor is certified, and every transaction is secure.
                                </p>
                                <ul className="space-y-4 pt-4">
                                    {[
                                        "Unified database for adoption across regions",
                                        "Instant access to professional veterinary experts",
                                        "A community-driven marketplace for pet essentials"
                                    ].map((text, i) => (
                                        <motion.li
                                            key={i}
                                            whileHover={{ x: 10 }}
                                            className="flex items-center gap-3 font-semibold text-slate-800 cursor-default"
                                        >
                                            <CheckCircle2 className="text-green-500" size={24} /> {text}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        <motion.div className="group relative lg:w-1/2" {...fadeInUp}>
                            <div className="-z-10 absolute -inset-4 bg-orange-100 rounded-[4rem] group-hover:rotate-3 transition-transform duration-500"></div>

                            <div className="relative bg-slate-100 shadow-2xl border-[12px] border-white md:border-[16px] rounded-[3rem] aspect-square overflow-hidden">
                                <Image
                                    src="https://i.ibb.co.com/jkVQgfyb/nunu.avif"
                                    alt="About our mission"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </div>

                            <motion.div
                                whileHover={{ y: -10, rotate: -2 }}
                                className="hidden md:block -right-8 -bottom-8 z-20 absolute bg-orange-600 shadow-2xl p-10 rounded-[2.5rem] text-white"
                            >
                                <p className="mb-1 font-black text-5xl tracking-tighter">100%</p>
                                <p className="opacity-90 font-bold text-[10px] uppercase leading-none tracking-widest">
                                    Safe & Verified <br /> Process
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- 3. OUR ECOSYSTEM --- */}
            <section className="bg-slate-50 py-24">
                <div className="mx-auto mb-16 px-6 text-center container">
                    <h2 className="mb-6 font-black text-4xl md:text-6xl">A Complete Ecosystem</h2>
                    <p className="mx-auto max-w-2xl text-slate-500 text-lg">
                        We have integrated everything you need to be a successful and happy pet parent under one digital roof.
                    </p>
                </div>

                <div className="gap-10 grid md:grid-cols-3 mx-auto px-6 container">
                    {[
                        {
                            title: "Smart Adoption",
                            icon: <PawPrint size={40} />,
                            desc: "Our category-based search and smart filters allow you to find pets based on your lifestyle, home size, and energy levels."
                        },
                        {
                            title: "Expert Healthcare",
                            icon: <Stethoscope size={40} />,
                            desc: "We host a network of certified doctors. From routine vaccinations to emergency consultations, book appointments instantly."
                        },
                        {
                            title: "Care & Supplies",
                            icon: <ShoppingBag size={40} />,
                            desc: "Beyond adoption, we provide curated nutrition guides and links to premium pet accessories for your new friend."
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -15, scale: 1.02 }}
                            className="group bg-white shadow-slate-200/50 shadow-xl p-12 border border-slate-100 rounded-[3rem] text-left transition-all"
                        >
                            <div className="bg-orange-50 group-hover:bg-orange-600 mb-8 p-5 rounded-2xl w-fit text-orange-600 group-hover:text-white transition-all duration-300">
                                {item.icon}
                            </div>
                            <h3 className="mb-4 font-bold group-hover:text-orange-600 text-2xl transition-colors">{item.title}</h3>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- 4. MISSION & VISION --- */}
            <section className="mx-auto px-6 py-24 md:py-40 container">
                <div className="items-start gap-16 grid md:grid-cols-2">
                    <motion.div
                        whileHover={{ scale: 0.98 }}
                        {...fadeInUp}
                        className="bg-orange-600 p-12 md:p-20 rounded-[4rem] text-white cursor-default"
                    >
                        <Target className="mb-8" size={60} />
                        <h2 className="mb-6 font-black text-4xl italic uppercase tracking-tighter">Our Mission</h2>
                        <p className="opacity-90 text-xl leading-relaxed">
                            To revolutionize the pet adoption landscape by providing a secure, transparent, and technology-driven platform that minimizes animal homelessness.
                        </p>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 0.98 }}
                        {...fadeInUp}
                        className="bg-slate-900 p-12 md:p-20 rounded-[4rem] text-white cursor-default"
                    >
                        <Globe className="mb-8 text-orange-500" size={60} />
                        <h2 className="mb-6 font-black text-4xl italic uppercase tracking-tighter">Our Vision</h2>
                        <p className="opacity-80 text-xl leading-relaxed">
                            We envision a world where every stray animal has a digital identity and a guaranteed path to a loving home and professional care.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* --- 5. CORE VALUES --- */}
            <section className="bg-white py-24 overflow-hidden">
                <div className="mx-auto px-6 container">
                    <motion.div
                        {...fadeInUp}
                        className="mb-16 text-center"
                    >
                        <h2 className="mb-6 font-black text-slate-900 text-4xl md:text-5xl uppercase tracking-tight">
                            Our <span className="text-orange-500 italic">Core Values</span>
                        </h2>
                        <div className="bg-orange-500 mx-auto rounded-full w-24 h-2"></div>
                    </motion.div>

                    <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                title: "Medical Integrity",
                                desc: "Every doctor on our platform is hand-verified through rigorous background checks to ensure your pet gets only the best professional care.",
                                icon: <ShieldCheck className="w-8 h-8" />,
                                color: "bg-blue-50 text-blue-600"
                            },
                            {
                                title: "Unconditional Love",
                                desc: "We don't just facilitate adoptions; we build families. Our success story section is a testament to the thousands of bonds we've helped create.",
                                icon: <Heart className="w-8 h-8" />,
                                color: "bg-red-50 text-red-600"
                            },
                            {
                                title: "Smart Management",
                                desc: "With our advanced Admin Dashboard, tracking pet health records, appointments, and adoption status is seamless and user-friendly.",
                                icon: <Activity className="w-8 h-8" />, // এখানে 'A' বড় হাতের করা হয়েছে
                                color: "bg-green-50 text-green-600"
                            },
                            {
                                title: "Transparent Process",
                                desc: "From the first click to the final adoption papers, our notification system keeps you updated at every single stage of the process.",
                                icon: <Award className="w-8 h-8" />,
                                color: "bg-orange-50 text-orange-600"
                            }
                        ].map((value, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="group bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:shadow-orange-100 p-10 border border-slate-100 rounded-[3rem] transition-all duration-500"
                            >
                                <div className={`mb-8 p-4 rounded-2xl w-fit ${value.color} group-hover:scale-110 transition-transform`}>
                                    {value.icon}
                                </div>
                                <h3 className="mb-4 font-black text-slate-900 text-xl italic uppercase tracking-tighter">
                                    {value.title}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {value.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 6. CTA --- */}
            <section className="py-32">
                <Newsletter></Newsletter>
            </section>
        </div>
    );
};

export default About;