"use client";

import Link from "next/link";
import {
  Facebook, Instagram, Twitter, Mail,
  Phone, MapPin, Heart, PawPrint, ExternalLink
} from "lucide-react";
import Logo from "../Header/Logo";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) return null;

  const pawPositions = [
    { top: "10%", left: "5%", rotate: -15 },
    { top: "40%", left: "15%", rotate: 20 },
    { top: "70%", left: "8%", rotate: -10 },
    { top: "15%", right: "12%", rotate: 30 },
    { top: "55%", right: "5%", rotate: -25 },
    { top: "85%", right: "18%", rotate: 15 },
  ];

  return (
    <div className="bg-white pt-24 pb-12 w-full">
      <div className="mx-auto px-6">
        {/* Main Footer Wrapper */}
        <footer className="relative bg-[#0F172A] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] p-10 md:p-16 border border-slate-800 rounded-[3rem] overflow-hidden">

          {/* --- Animated Paw Prints  --- */}
          {pawPositions.map((pos, idx) => (
            <motion.div
              key={idx}
              className="absolute text-orange-500 pointer-events-none"
              style={{ ...pos }}
              initial={{ opacity: 0.1, scale: 1 }}
              animate={{
                opacity: [0.1, 0.4, 0.1], 
                scale: [1, 1.2, 1],       
                filter: ["blur(1px)", "blur(0px)", "blur(1px)"]
              }}
              transition={{
                duration: 3,            
                repeat: Infinity,
                delay: idx * 1,          
                ease: "easeInOut"
              }}
            >
             
              <PawPrint size={66} style={{ transform: `rotate(${pos.rotate}deg)` }} strokeWidth={1.5} />
            </motion.div>
          ))}

          {/* Subtle Glow Effects */}
          <div className="-top-24 -left-24 absolute bg-orange-500/5 blur-[120px] rounded-full w-96 h-96 pointer-events-none"></div>

          <div className="z-10 relative gap-16 grid grid-cols-1 lg:grid-cols-12">

            {/* Column 1: Brand & Mission */}
            <div className="space-y-8 lg:col-span-4">
              <div className="space-y-6">
                <div className="inline-block bg-white/90 shadow-orange-500/10 shadow-xl p-3 rounded-2xl">
                  <Logo />
                </div>
                <p className="max-w-sm text-slate-400 text-lg leading-relaxed">
                  We believe every pet deserves a loving home. Join us in our mission to rescue, rehabilitate, and rehome animals in need.
                </p>
              </div>

              {/* Social Media */}
              <div className="flex gap-4">
                {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="group relative flex justify-center items-center bg-slate-900 border border-slate-800 hover:border-orange-500 rounded-2xl w-12 h-12 transition-all hover:-translate-y-1 duration-300"
                  >
                    <Icon className="w-5 h-5 text-slate-500 group-hover:text-orange-500 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 & 3: Navigation */}
            <div className="gap-8 grid grid-cols-2 lg:col-span-4">
              <div>
                <h3 className="mb-8 font-bold text-white text-sm uppercase tracking-[0.2em]">Navigation</h3>
                <ul className="space-y-4">
                  {["Browse Pets", "Adoption", "Volunteer", "Success Stories"].map((item) => (
                    <li key={item}>
                      <Link href="#" className="group flex items-center gap-2 text-slate-400 hover:text-orange-500 transition-all">
                        <span className="bg-orange-500 rounded-full w-1.5 h-1.5 scale-0 group-hover:scale-100 transition-all duration-300"></span>
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-8 font-bold text-white text-sm uppercase tracking-[0.2em]">Support</h3>
                <ul className="space-y-4">
                  {["Help Center", "Pet Care", "Donations", "Shelters"].map((item) => (
                    <li key={item}>
                      <Link href="#" className="group flex items-center gap-2 text-slate-400 hover:text-orange-500 transition-all">
                        <span className="bg-orange-500 rounded-full w-1.5 h-1.5 scale-0 group-hover:scale-100 transition-all duration-300"></span>
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 4: Premium Contact Card */}
            <div className="lg:col-span-4">
              <div className="group relative space-y-6 bg-slate-900/80 backdrop-blur-sm p-8 border border-slate-800 rounded-[2.5rem] overflow-hidden">
                <div className="top-0 right-0 absolute bg-orange-500/5 -mt-16 -mr-16 rounded-full w-32 h-32"></div>

                <h3 className="flex items-center gap-2 font-bold text-white text-xl">
                  Get in Touch <ExternalLink className="w-4 h-4 text-orange-500" />
                </h3>

                <div className="space-y-4">
                  <div className="group/item flex items-center gap-4">
                    <div className="flex justify-center items-center bg-orange-500/10 group-hover/item:bg-orange-500 rounded-xl w-10 h-10 text-orange-500 group-hover/item:text-white transition-all">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-[10px] text-slate-500 uppercase tracking-widest">Location</p>
                      <p className="text-slate-300 text-sm">Petville, CA 90210</p>
                    </div>
                  </div>

                  <div className="group/item flex items-center gap-4">
                    <div className="flex justify-center items-center bg-orange-500/10 group-hover/item:bg-orange-500 rounded-xl w-10 h-10 text-orange-500 group-hover/item:text-white transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-[10px] text-slate-500 uppercase tracking-widest">Email Us</p>
                      <p className="font-medium text-slate-300 text-sm">hello@pawfect.com</p>
                    </div>
                  </div>
                </div>

                <button className="flex justify-center items-center gap-2 bg-orange-500 hover:bg-white shadow-orange-500/10 shadow-xl py-4 rounded-2xl w-full font-black text-white hover:text-orange-500 active:scale-[0.98] transition-all">
                  Start Adoption <Heart className="fill-current w-5 h-5" />
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Branding & Legal */}
          <div className="z-10 relative flex md:flex-row flex-col justify-between items-center gap-6 mt-16 pt-8 border-slate-800/50 border-t font-bold text-[12px] text-slate-500">
            <div className="flex md:flex-row flex-col items-center gap-4 md:gap-10">
              <p className="uppercase tracking-widest">© {new Date().getFullYear()} Pawfect Adoption</p>
              <div className="flex gap-6 uppercase tracking-widest">
                <Link href="#" className="hover:text-orange-500 transition-colors">Privacy</Link>
                <Link href="#" className="hover:text-orange-500 transition-colors">Terms</Link>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-900/80 shadow-inner px-5 py-2 border border-slate-800 rounded-full">
              <span className="bg-orange-500 rounded-full w-2 h-2 animate-ping"></span>
              <span className="text-slate-300 uppercase tracking-tighter">12 Animals adopted today</span>
            </div>
          </div>

        </footer>
      </div>
    </div>
  );
}