"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, PawPrint, ExternalLink } from 'lucide-react';

const Team = () => {
    const teamMembers = [
        {
            name: "Apu Nath",
            role: "Founder & Lead Designer",
            image: "https://i.ibb.co.com/S4tkcPfc/profile3.png",
            bio: "Visionary behind Pawfect Match. Designed the entire ecosystem including the Admin Dashboard and Notification systems.",
            social: { github: "#", linkedin: "#", twitter: "#" }
        },
        {
            name: "Al Amin Hossain",
            role: "Chief Veterinary Officer",
            image: "https://i.ibb.co.com/TxmtvmzJ/Screenshot-4.png", 
            bio: "Expert surgeon with 10+ years of experience. Leads the expert doctor panel and health verification process.",
            social: { github: "#", linkedin: "#", twitter: "#" }
        },
        {
            name: "Md Zahid Hasan",
            role: "Lead Full-Stack Developer",
            image: "https://i.ibb.co.com/fYmmxjqD/Screenshot-3.png",
            bio: "Specialist in scalable web architectures. Managed task allocation and user-friendly functional developments.",
            social: { github: "#", linkedin: "#", twitter: "#" }
        },
        {
            name: "Forhad Redoy",
            role: "Lead Full-Stack Developer",
            image: "https://i.ibb.co.com/rGbqNPQL/Screenshot-5.png",
            bio: "Specialist in scalable web architectures. Managed task allocation and user-friendly functional developments.",
            social: { github: "#", linkedin: "#", twitter: "#" }
        },
        {
            name: "MD SHAKIL",
            role: "Lead Full-Stack Developer",
            image: "https://i.ibb.co.com/jvCdxW94/Screenshot-1.png",
            bio: "Specialist in scalable web architectures. Managed task allocation and user-friendly functional developments.",
            social: { github: "#", linkedin: "#", twitter: "#" }
        },
        {
            name: "Hasib Ahmed Shrabon",
            role: "Chief Veterinary Officer",
            image: "https://i.ibb.co.com/pBwt20wQ/Screenshot-2.png", 
            bio: "Expert surgeon with 10+ years of experience. Leads the expert doctor panel and health verification process.",
            social: { github: "#", linkedin: "#", twitter: "#" }
        },
    ];

    return (
        <section className="bg-white selection:bg-orange-100 py-32 min-h-screen">
            <div className="mx-auto px-6 container">
                
                {/* --- Header Section --- */}
                <div className="flex lg:flex-row flex-col justify-between items-end gap-12 mb-24">
                    <div className="max-w-3xl">
                        <motion.span 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-block bg-orange-100 mb-6 px-5 py-2 rounded-full font-black text-[10px] text-orange-600 uppercase tracking-[0.2em]"
                        >
                            The Minds Behind Pawfect Match
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="font-black text-slate-900 text-5xl md:text-8xl leading-[0.9] tracking-tighter"
                        >
                            Meet Our <br /> <span className="text-orange-500 italic">Passionate</span> Team
                        </motion.h2>
                    </div>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="max-w-md font-medium text-slate-500 text-xl leading-relaxed"
                    >
                        We are a group of animal lovers, designers, and developers dedicated to making pet adoption safe, easy, and professional.
                    </motion.p>
                </div>

                {/* --- Team Grid --- */}
                <div className="gap-x-8 gap-y-20 grid md:grid-cols-2 lg:grid-cols-3">
                    {teamMembers.map((member, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative"
                        >
                            {/* Premium Card Layout */}
                            <div className="relative bg-[#fffaf5] hover:bg-white shadow-2xl shadow-orange-100/30 p-2 rounded-[3.5rem] overflow-hidden transition-all duration-500">
                                
                                {/* Image Container with Floating Action */}
                                <div className="relative rounded-[3rem] w-full aspect-[4/5] overflow-hidden">
                                    <Image 
                                        src={member.image} 
                                        alt={member.name}
                                        fill
                                        className="grayscale group-hover:grayscale-0 object-cover group-hover:scale-105 transition-all duration-1000 ease-out"
                                    />
                                    
                                    {/* Social Badge (Appears on Hover) */}
                                    <div className="right-6 bottom-6 absolute flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-20 group-hover:translate-x-0 duration-500">
                                        <a href={member.social.linkedin} className="bg-white hover:bg-orange-500 shadow-xl p-4 rounded-2xl text-slate-900 hover:text-white transition-all">
                                            <Linkedin size={20} />
                                        </a>
                                        <a href={member.social.github} className="bg-white hover:bg-orange-500 shadow-xl p-4 rounded-2xl text-slate-900 hover:text-white transition-all">
                                            <Github size={20} />
                                        </a>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-8 lg:text-left text-center">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-black text-slate-900 text-3xl tracking-tighter">
                                                {member.name}
                                            </h3>
                                            <p className="font-black text-[10px] text-orange-500 uppercase tracking-[0.2em]">
                                                {member.role}
                                            </p>
                                        </div>
                                        <PawPrint className="hidden lg:block opacity-10 text-orange-500" size={40} />
                                    </div>
                                    <p className="font-medium text-slate-500 text-sm italic line-clamp-3 leading-relaxed">
                                        &quot;{member.bio}&quot;
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* --- Join Us Premium CTA --- */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="group relative bg-slate-900 mt-40 p-12 md:p-24 rounded-[4rem] overflow-hidden lg:text-left text-center"
                >
                    <div className="z-10 relative flex lg:flex-row flex-col justify-between items-center gap-12">
                        <div className="max-w-2xl">
                            <h4 className="mb-6 font-black text-white text-4xl md:text-6xl tracking-tighter">Want to be part of <br /> <span className="text-orange-500">our mission?</span></h4>
                            <p className="font-medium text-slate-400 text-lg leading-relaxed">We are always looking for passionate volunteers, veterinarians, and animal lovers to expand our community.</p>
                        </div>
                        <button className="bg-orange-600 hover:bg-white shadow-2xl shadow-orange-600/20 px-12 py-6 rounded-2xl h-fit font-black text-[11px] text-white hover:text-slate-900 uppercase tracking-[0.2em] hover:scale-105 transition-all duration-500">
                            Apply to join the team
                        </button>
                    </div>
                    
                    {/* Decorative Background Elements */}
                    <div className="-top-24 -right-24 absolute bg-orange-500/10 blur-[100px] rounded-full w-96 h-96"></div>
                    <div className="-bottom-32 -left-32 absolute bg-white/5 blur-[80px] rounded-full w-80 h-80"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default Team;