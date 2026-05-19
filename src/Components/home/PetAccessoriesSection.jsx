"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Star,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Heart,
} from "lucide-react";
import Link from "next/link";

const ACCESSORY_SLIDES = [
  {
    id: 1,
    name: "Dog Gear",
    image: "https://i.ibb.co.com/tMsjqP0R/Dog-Collar.avif",
    title: "Leather Dog Collar",
    tag: "Durable & Stylish",
  },
  {
    id: 2,
    name: "Cat Toys",
    image:
      "https://i.ibb.co.com/dw8gmqKr/omar-ramadan-xyjm-C56-MVx-Y-unsplash.jpg",
    title: "Interactive Cat Tunnel",
    tag: "Fun & Active Play",
  },
  {
    id: 3,
    name: "Fish Decor",
    image: "https://i.ibb.co.com/fVmzxL9H/slnc-xh-G6nl-Yy-K2o-unsplash.jpg",
    title: "LED Aquarium Light",
    tag: "Vibrant Underwater Life",
  },
  {
    id: 4,
    name: "Bird Gear",
    image: "https://i.ibb.co.com/mCHMVZhF/ann-ann-2-Q7o-IKs-IQq0-unsplash.jpg",
    title: "Luxury Bird Cage",
    tag: "Safe & Spacious Home",
  },
  {
    id: 5,
    name: "Pet Comfort",
    image: "https://i.ibb.co.com/5PW0JJL/pet-bad.avif",
    title: "Orthopedic Pet Bed",
    tag: "Ultimate Relaxation",
  },
];

const PetAccessoriesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ACCESSORY_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + ACCESSORY_SLIDES.length) % ACCESSORY_SLIDES.length,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ACCESSORY_SLIDES.length);
  };

  return (
    <section className="relative bg-orange-50/30 mx-4 my-20 py-16 lg:py-24 border border-orange-100 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="-top-24 -right-24 absolute bg-orange-200/20 blur-[100px] rounded-full w-96 h-96 pointer-events-none"></div>
      <div className="bottom-0 left-0 absolute bg-orange-300/10 blur-[80px] rounded-full w-64 h-64 pointer-events-none"></div>

      <div className="z-10 relative mx-auto px-6 max-w-7xl">
        <div className="items-center gap-16 grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side: Interactive Accessory Slider */}
          <div className="group relative order-2 lg:order-1 mt-12 lg:mt-0">
            {/* Image Slider Container - Responsive Max Width & Aspect Ratio */}
            <div className="z-20 relative bg-white shadow-2xl mx-auto border-[8px] md:border-[12px] border-white rounded-[2.5rem] md:rounded-[3rem] w-full max-w-[400px] lg:max-w-[500px] aspect-square overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={ACCESSORY_SLIDES[currentIndex].id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.03 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={ACCESSORY_SLIDES[currentIndex].image}
                    alt={ACCESSORY_SLIDES[currentIndex].title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={handlePrev}
              className="top-1/2 left-4 z-30 absolute bg-white/90 hover:bg-orange-500 hidden md:flex opacity-0 group-hover:opacity-100 shadow-xl p-4 rounded-full text-slate-700 hover:text-white transition-all -translate-y-1/2"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="top-1/2 right-4 z-30 absolute bg-white/90 hover:bg-orange-500 hidden md:flex opacity-0 group-hover:opacity-100 shadow-xl p-4 rounded-full text-slate-700 hover:text-white transition-all -translate-y-1/2"
            >
              <ChevronRight size={24} />
            </button>

            {/* Floating Info Element  */}
            <motion.div
              key={`info-${ACCESSORY_SLIDES[currentIndex].id}`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="static md:absolute -bottom-8 left-4 z-30 flex items-center gap-4 bg-white shadow-2xl mt-4 md:mt-0 p-4 md:p-6 border border-orange-50 rounded-[2rem] md:rounded-[2.5rem] w-full md:w-auto"
            >
              <div className="bg-orange-500/10 p-3 rounded-xl md:rounded-2xl text-orange-600">
                <Heart size={22} className="fill-orange-500" />
              </div>
              <div className="flex flex-col pr-4">
                <p className="font-black text-[9px] text-orange-500 uppercase tracking-[0.25em]">
                  {ACCESSORY_SLIDES[currentIndex].name}
                </p>
                <p className="font-black text-slate-900 text-lg md:text-xl leading-tight tracking-tight">
                  {ACCESSORY_SLIDES[currentIndex].title}
                </p>
                <p className="mt-1 font-bold text-[10px] text-slate-400 uppercase leading-none tracking-widest">
                  {ACCESSORY_SLIDES[currentIndex].tag}
                </p>
              </div>
            </motion.div>

            {/* Price Tag Bubble  */}
            <motion.div
              initial={{ scale: 0, rotate: 20 }}
              whileInView={{ scale: 1, rotate: -12 }}
              viewport={{ once: true }}
              className="-top-4 -left-4 md:top-10 md:-left-8 z-40 absolute flex flex-col justify-center items-center bg-slate-900 shadow-2xl border-4 border-white rounded-full w-24 h-24 md:w-28 md:h-28 text-white"
            >
              <span className="font-black text-[8px] text-orange-400 uppercase tracking-widest">
                Starts from
              </span>
              <span className="font-black text-2xl md:text-3xl">$09</span>
            </motion.div>
          </div>

          {/* Right Side: Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-orange-500/10 px-5 py-2 border border-orange-500/20 rounded-full"
            >
              <Sparkles size={14} className="fill-orange-600 text-orange-600" />
              <span className="font-black text-[10px] text-orange-600 uppercase tracking-[0.2em]">
                Premium Collection
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-black text-slate-900 text-4xl md:text-7xl leading-[0.95] tracking-[-0.04em]"
            >
              Pet Gear & <br />
              <span className="text-orange-500">Accessories</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-md font-medium text-slate-600 text-base md:text-lg leading-relaxed"
            >
              Beyond food, we offer everything to make your pet's life joyful.
              Explore our handpicked collection of toys, cozy beds, and stylish
              collars.
            </motion.p>

            {/* (grid-cols-1 sm:grid-cols-2) */}
            <div className="gap-4 md:gap-6 grid grid-cols-1 sm:grid-cols-2">
              <div className="flex items-center gap-4 bg-white shadow-sm p-4 border border-orange-100/50 rounded-3xl text-slate-700">
                <div className="flex justify-center items-center bg-orange-50 rounded-2xl w-12 h-12 text-orange-500">
                  <Star size={24} className="fill-orange-500" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-sm uppercase tracking-wide">
                    Top Rated
                  </span>
                  <span className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">
                    Premium Quality
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white shadow-sm p-4 border border-orange-100/50 rounded-3xl text-slate-700">
                <div className="flex justify-center items-center bg-orange-50 rounded-2xl w-12 h-12 text-orange-500">
                  <ShieldCheck size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-sm uppercase tracking-wide">
                    Safe Tools
                  </span>
                  <span className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">
                    Non-Toxic Gear
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
                href="/pet-accessories"
                className="group inline-flex relative items-center gap-4 bg-slate-900 hover:bg-orange-600 shadow-xl px-10 md:px-12 py-4 md:py-5 rounded-2xl overflow-hidden font-black text-[11px] text-white uppercase tracking-[0.2em] transition-all duration-500"
              >
                <ShoppingBag size={20} className="z-10 relative" />
                <span className="z-10 relative">Shop All Gear</span>
                <ArrowRight
                  size={20}
                  className="z-10 relative transition-transform group-hover:translate-x-2"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetAccessoriesSection;
