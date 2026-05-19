"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Syringe,
  ArrowRight,
  ShieldCheck,
  Activity,
  ChevronLeft,
  ChevronRight,
  Bell,
  HeartPulse,
} from "lucide-react";
import Link from "next/link";

const VACCINE_SLIDES = [
  {
    id: 1,
    vaccineName: "Rabies Vaccine",
    targetAudience: "Dogs & Cats",
    image: "https://i.ibb.co.com/zT7ZxSpM/DHPP-Vaccine.avif",
    description: "Essential protection against rabies virus.",
    status: "Mandatory",
    price: "$25",
  },
  {
    id: 2,
    vaccineName: "DHPP Vaccine",
    targetAudience: "Dogs Only",
    image: "https://i.ibb.co.com/8gdyWMZY/Rabies-Vaccine.jpg",
    description: "5-in-1 vaccine protecting against Distemper.",
    status: "High Demand",
    price: "$45",
  },
  {
    id: 3,
    vaccineName: "FVRCP Vaccine",
    targetAudience: "Cats Only",
    image: "https://i.ibb.co.com/V0qRDR1V/FVRCP-Vaccine.avif",
    description: "Core vaccine for feline viral protection.",
    status: "Recommended",
    price: "$35",
  },
];

const VaccinationSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % VACCINE_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + VACCINE_SLIDES.length) % VACCINE_SLIDES.length,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % VACCINE_SLIDES.length);
  };

  return (
    <section className="relative bg-orange-50/30 mx-4 my-20 py-16 lg:py-24 border border-orange-100 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden">
      {/* Background Decor */}
      <div className="-top-24 -left-24 absolute bg-orange-200/20 blur-[100px] rounded-full w-96 h-96 pointer-events-none"></div>
      <div className="right-0 bottom-0 absolute bg-red-100/30 blur-[80px] rounded-full w-64 h-64 pointer-events-none"></div>

      <div className="z-10 relative mx-auto px-6 max-w-7xl">
        <div className="items-center gap-16 grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side: Text & Features */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 border border-red-100 rounded-full"
            >
              <Bell size={14} className="text-red-600 animate-bounce" />
              <span className="font-black text-[10px] text-red-600 uppercase tracking-[0.3em]">
                Health & Safety First
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-black text-slate-900 text-4xl md:text-7xl leading-[0.95] tracking-[-0.04em]"
            >
              Essential <span className="text-orange-500">Vaccines</span> <br />
              For Your Pets
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-md font-medium text-slate-600 text-base md:text-lg leading-relaxed"
            >
              Protect your furry friends with our vet-approved vaccination
              programs. We ensure the highest quality medical care for every pet
              adoption journey.
            </motion.p>

            <div className="flex flex-wrap gap-6 md:gap-8">
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center bg-white shadow-md rounded-2xl w-12 h-12 text-orange-500">
                  <ShieldCheck size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-slate-800 text-sm uppercase tracking-wider">
                    Certified
                  </span>
                  <span className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">
                    Medical Grade
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center bg-white shadow-md rounded-2xl w-12 h-12 text-orange-500">
                  <HeartPulse size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-slate-800 text-sm uppercase tracking-wider">
                    Safe & Care
                  </span>
                  <span className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">
                    Expert Handling
                  </span>
                </div>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-4"
            >
              <Link
                href="/vaccination"
                className="group inline-flex items-center gap-4 bg-slate-900 hover:bg-orange-600 shadow-xl px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-[11px] text-white uppercase tracking-[0.2em] transition-all duration-500"
              >
                <Syringe size={18} />
                <span>See All Vaccines</span>
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-2"
                />
              </Link>
            </motion.div>
          </div>

          {/* Right Side: Image Slider */}
          <div className="group relative mt-12 lg:mt-0">
            <div className="z-20 relative bg-white shadow-2xl mx-auto border-[8px] md:border-[12px] border-white rounded-[2.5rem] md:rounded-[3.5rem] w-full max-w-[420px] aspect-[4/5] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={VACCINE_SLIDES[currentIndex].id}
                  initial={{ opacity: 0, filter: "blur(5px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(5px)" }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={VACCINE_SLIDES[currentIndex].image}
                    alt={VACCINE_SLIDES[currentIndex].vaccineName}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons (মোবাইলে টাচ এরিয়া সেফ করার জন্য হিডেন, ডেক্সটপে ভিজিবল) */}
            <button
              onClick={handlePrev}
              className="top-1/2 -left-4 md:-left-6 z-30 absolute bg-white/90 hover:bg-white hidden md:flex opacity-0 group-hover:opacity-100 shadow-xl p-4 rounded-full text-slate-700 hover:text-orange-500 transition-all -translate-y-1/2"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="top-1/2 -right-4 md:-right-6 z-30 absolute bg-white/90 hover:bg-white hidden md:flex opacity-0 group-hover:opacity-100 shadow-xl p-4 rounded-full text-slate-700 hover:text-orange-500 transition-all -translate-y-1/2"
            >
              <ChevronRight size={24} />
            </button>

            {/* Floating Info Box (মোবাইল রেসপন্সিভ করা হয়েছে: md:right-0, md:-bottom-8) */}
            <motion.div
              key={`info-${VACCINE_SLIDES[currentIndex].id}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="static md:absolute right-4 -bottom-6 z-30 flex items-center gap-4 bg-white shadow-2xl mt-4 md:mt-0 p-4 md:p-6 border border-orange-50 rounded-[2rem] md:rounded-[2.5rem] w-full md:w-auto md:min-w-[320px]"
            >
              <div className="bg-orange-500 p-3 md:p-4 rounded-xl md:rounded-2xl text-white">
                <Activity size={22} />
              </div>
              <div className="flex flex-col">
                <p className="font-black text-[9px] text-orange-500 uppercase tracking-[0.2em]">
                  {VACCINE_SLIDES[currentIndex].targetAudience}
                </p>
                <p className="font-black text-slate-900 text-lg md:text-xl leading-tight tracking-tight">
                  {VACCINE_SLIDES[currentIndex].vaccineName}
                </p>
                <p className="mt-1 font-bold text-[10px] text-slate-400 uppercase line-clamp-1 tracking-wider">
                  {VACCINE_SLIDES[currentIndex].description}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: 15 }}
              animate={{ scale: 1, rotate: -12 }}
              className="-top-4 -left-4 md:top-10 md:-left-10 z-40 absolute flex flex-col justify-center items-center bg-red-600 shadow-2xl border-4 border-white rounded-full w-24 h-24 md:w-28 md:h-28 text-white text-center"
            >
              <span className="opacity-80 mb-0.5 font-black text-[7px] uppercase tracking-widest">
                Status
              </span>
              <span className="font-black text-[10px] md:text-[11px] uppercase leading-tight tracking-tighter">
                {VACCINE_SLIDES[currentIndex].status}
              </span>
              <div className="bg-white/20 mt-1 px-1.5 py-0.5 rounded font-black text-[9px] md:text-[10px]">
                {VACCINE_SLIDES[currentIndex].price}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VaccinationSection;
