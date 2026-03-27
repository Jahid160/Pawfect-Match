"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, PawPrint } from 'lucide-react';

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
            image: "https://i.ibb.co.com/bMgLpTdq/Gemini-Generated-Image-bp8kycbp8kycbp8k-1.png",
            bio: "Specialist in scalable web architectures. Managed task allocation and user-friendly functional developments.",
            social: { github: "https://github.com/Jahid160", linkedin: "https://www.linkedin.com/in/md-zahid-hasan12/", twitter: "#" }
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

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <section className="bg-[#fffaf5] py-24 min-h-screen">
            <div className="mx-auto px-6 container">
                
                {/* --- Header Section --- */}
                <motion.div 
                    {...fadeInUp}
                    className="mx-auto mb-20 max-w-3xl text-center"
                >
                    <span className="inline-block bg-orange-100 mb-6 px-5 py-2 rounded-full font-bold text-orange-600 text-xs uppercase tracking-widest">
                        The Minds Behind Pawfect Match
                    </span>
                    <h2 className="mb-6 font-black text-slate-900 text-4xl md:text-6xl leading-tight">
                        Meet Our <span className="text-orange-500 text-5xl md:text-7xl italic">Passionate</span> Team
                    </h2>
                    <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
                        We are a group of animal lovers, designers, and developers dedicated to making pet adoption safe, easy, and professional for everyone.
                    </p>
                </motion.div>

                {/* --- Team Grid --- */}
                <div className="gap-12 grid md:grid-cols-2 lg:grid-cols-3">
                    {teamMembers.map((member, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.5 }}
                            className="group relative"
                        >
                            {/* Card Background Decoration */}
                            <div className="-z-10 absolute -inset-2 bg-gradient-to-b from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 blur-xl group-hover:blur-2xl rounded-[3rem] transition-all duration-500"></div>
                            
                            <div className="z-10 relative flex flex-col bg-white shadow-orange-100/50 shadow-xl p-8 border border-orange-50 rounded-[2.5rem] h-full overflow-hidden">
                                
                                {/* Image Container */}
                                <div className="relative mb-8 border-4 border-slate-50 group-hover:border-orange-100 rounded-[2rem] w-full aspect-square overflow-hidden transition-colors">
                                    <Image 
                                        src={member.image} 
                                        alt={member.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    
                                    {/* Social Overlay */}
                                    <div className="absolute inset-0 flex justify-center items-center gap-4 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all translate-y-full group-hover:translate-y-0 duration-300">
                                        <a href={member.social.github} className="bg-white hover:bg-orange-500 p-3 rounded-xl text-slate-900 hover:text-white transition-all hover:-translate-y-1 transform">
                                            <Github size={20} />
                                        </a>
                                        <a href={member.social.linkedin} className="bg-white hover:bg-orange-500 p-3 rounded-xl text-slate-900 hover:text-white transition-all hover:-translate-y-1 transform">
                                            <Linkedin size={20} />
                                        </a>
                                        <a href={member.social.twitter} className="bg-white hover:bg-orange-500 p-3 rounded-xl text-slate-900 hover:text-white transition-all hover:-translate-y-1 transform">
                                            <Twitter size={20} />
                                        </a>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-grow text-center">
                                    <h3 className="mb-1 font-black text-slate-900 group-hover:text-orange-600 text-2xl transition-colors">
                                        {member.name}
                                    </h3>
                                    <p className="mb-4 font-bold text-[10px] text-orange-500 uppercase tracking-[0.2em]">
                                        {member.role}
                                    </p>
                                    <p className="mb-6 text-slate-500 text-sm italic leading-relaxed">
                                        &quot;{member.bio}&quot;
                                    </p>
                                </div>

                                {/* Bottom Accent */}
                                <div className="flex justify-center mt-auto pt-6 border-slate-50 border-t">
                                    <PawPrint className="text-orange-100 group-hover:text-orange-400 transition-colors" size={32} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* --- Join Us CTA --- */}
                <motion.div 
                    {...fadeInUp}
                    className="bg-white mt-24 p-12 border-2 border-orange-200 border-dashed rounded-[3rem] text-center"
                >
                    <h4 className="mb-4 font-bold text-slate-800 text-2xl">Want to be part of our mission?</h4>
                    <p className="mx-auto mb-8 max-w-xl text-slate-500">We are always looking for passionate volunteers, veterinarians, and animal lovers to expand our community.</p>
                    <button className="bg-slate-900 hover:bg-orange-600 shadow-xl px-10 py-4 rounded-2xl font-black text-white text-xs uppercase tracking-widest active:scale-95 transition-all">
                        Send Your Resume
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Team;