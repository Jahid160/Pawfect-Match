"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight, Sparkles, Star, ShieldCheck, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Link from "next/link";

const PetAccessoriesSection = () => {
  const accessorySlides = [
    {
      id: 1,
      name: "Dog Gear",
      image: "https://i.ibb.co.com/tMsjqP0R/Dog-Collar.avif",
      title: "Leather Dog Collar",
      tag: "Durable & Stylish"
    },
    {
      id: 2,
      name: "Cat Toys",
      image: "https://i.ibb.co.com/dw8gmqKr/omar-ramadan-xyjm-C56-MVx-Y-unsplash.jpg",
      title: "Interactive Cat Tunnel",
      tag: "Fun & Active Play"
    },
    {
      id: 3,
      name: "Fish Decor",
      image: "https://i.ibb.co.com/fVmzxL9H/slnc-xh-G6nl-Yy-K2o-unsplash.jpg",
      title: "LED Aquarium Light",
      tag: "Vibrant Underwater Life"
    },
    {
      id: 4,
      name: "Bird Gear",
      image: "https://i.ibb.co.com/mCHMVZhF/ann-ann-2-Q7o-IKs-IQq0-unsplash.jpg",
      title: "Luxury Bird Cage",
      tag: "Safe & Spacious Home"
    },
    {
      id: 5,
      name: "Pet Comfort",
      image: "https://i.ibb.co.com/5PW0JJL/pet-bad.avif",
      title: "Orthopedic Pet Bed",
      tag: "Ultimate Relaxation"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % accessorySlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [accessorySlides.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + accessorySlides.length) % accessorySlides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % accessorySlides.length);
  };

  return (
    <section className="relative bg-orange-50/30 mx-4 my-10 py-28 border border-orange-100 rounded-[4rem] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="-top-24 -right-24 absolute bg-orange-200/20 blur-[100px] rounded-full w-96 h-96 pointer-events-none"></div>
      <div className="bottom-0 left-0 absolute bg-orange-300/10 blur-[80px] rounded-full w-64 h-64 pointer-events-none"></div>
      
      <div className="z-10 relative mx-auto px-6 max-w-7xl">
        <div className="items-center gap-16 grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Side: Interactive Accessory Slider */}
          <div className="group relative order-2 lg:order-1">
            
            {/* Main Featured Image Slider */}
            <div className="z-20 relative bg-white shadow-2xl mx-auto border-[12px] border-white rounded-[3rem] w-full max-w-[500px] aspect-square overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={accessorySlides[currentIndex].id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  <Image 
                    src={accessorySlides[currentIndex].image} 
                    alt={accessorySlides[currentIndex].title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Navigation Buttons */}
            <button 
              onClick={handlePrev} 
              className="top-1/2 left-4 z-30 absolute bg-white/90 hover:bg-orange-500 opacity-0 group-hover:opacity-100 shadow-xl p-4 rounded-full text-slate-700 hover:text-white transition-all -translate-y-1/2"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={handleNext} 
              className="top-1/2 right-4 z-30 absolute bg-white/90 hover:bg-orange-500 opacity-0 group-hover:opacity-100 shadow-xl p-4 rounded-full text-slate-700 hover:text-white transition-all -translate-y-1/2"
            >
              <ChevronRight size={24} />
            </button>

            {/* Floating Info Element */}
            <motion.div 
              key={`info-${accessorySlides[currentIndex].id}`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="-bottom-10 left-4 z-30 absolute flex items-center gap-4 bg-white shadow-2xl p-5 border border-orange-50 rounded-[2.5rem]"
            >
              <div className="bg-orange-500/10 p-3 rounded-2xl text-orange-600">
                <Heart size={24} className="fill-orange-500" />
              </div>
              <div className="flex flex-col pr-6">
                <p className="font-black text-[10px] text-orange-500 uppercase tracking-widest">{accessorySlides[currentIndex].name}</p>
                <p className="font-black text-slate-800 text-xl leading-tight">{accessorySlides[currentIndex].title}</p>
                <p className="font-medium text-slate-500 text-xs">{accessorySlides[currentIndex].tag}</p>
              </div>
            </motion.div>

            {/* Price Tag Bubble */}
            <motion.div 
              initial={{ scale: 0, rotate: 20 }}
              whileInView={{ scale: 1, rotate: -12 }}
              className="top-10 -left-8 z-40 absolute flex flex-col justify-center items-center bg-slate-900 shadow-2xl border-4 border-white rounded-full w-28 h-28 text-white"
            >
              <span className="font-bold text-[10px] text-orange-400">Starts from</span>
              <span className="font-black text-3xl">$09</span>
            </motion.div>
          </div>

          {/* Right Side: Text & Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 bg-orange-500/10 px-5 py-2 border border-orange-500/20 rounded-full"
            >
              <Sparkles size={16} className="fill-orange-600 text-orange-600" />
              <span className="font-black text-orange-600 text-xs uppercase tracking-widest">Premium Collection</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-black text-slate-900 text-5xl md:text-7xl leading-tight"
            >
              Pet Gear & <br />
              <span className="text-shadow-sm text-orange-500">Accessories</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="max-w-md font-medium text-slate-600 text-lg leading-relaxed"
            >
              Beyond food, we offer everything to make your pet's life joyful. Explore our handpicked collection of toys, cozy beds, and stylish collars.
            </motion.p>

            <div className="gap-6 grid grid-cols-2">
              <div className="flex items-center gap-4 bg-white shadow-sm p-4 border border-orange-100/50 rounded-3xl text-slate-700">
                <div className="flex justify-center items-center bg-orange-50 rounded-2xl w-12 h-12 text-orange-500">
                  <Star size={24} className="fill-orange-500" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-sm uppercase">Top Rated</span>
                  <span className="font-bold text-[10px] text-slate-500">Premium Quality</span>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white shadow-sm p-4 border border-orange-100/50 rounded-3xl text-slate-700">
                <div className="flex justify-center items-center bg-orange-50 rounded-2xl w-12 h-12 text-orange-500">
                  <ShieldCheck size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-sm uppercase">Safe Materials</span>
                  <span className="font-bold text-[10px] text-slate-500">Non-Toxic Gear</span>
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
                className="group inline-flex relative items-center gap-4 bg-orange-500 hover:bg-slate-900 shadow-[0_20px_40px_-15px_rgba(249,115,22,0.4)] hover:shadow-2xl px-12 py-5 rounded-2xl overflow-hidden font-black text-white uppercase tracking-wider transition-all duration-500"
              >
                <ShoppingBag size={24} className="z-10 relative" />
                <span className="z-10 relative uppercase tracking-[0.15em]">Shop All Gear</span>
                <ArrowRight size={24} className="z-10 relative transition-transform group-hover:translate-x-2" />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PetAccessoriesSection;