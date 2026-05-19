"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBasket,
  ArrowRight,
  Zap,
  Leaf,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const FOOD_SLIDES = [
  {
    id: 1,
    name: "Dog Food",
    image: "https://i.ibb.co.com/qLndzddK/dogs-food.jpg",
    title: "Premium Dog Kibble",
    tag: "Active & Healthy Dogs",
  },
  {
    id: 2,
    name: "Cat Food",
    image:
      "https://i.ibb.co.com/TxvJyC0g/nicat-almemmedov-ZScq1g-D66s-unsplash.jpg",
    title: "Gourmet Cat Treats",
    tag: "Shiny Fur & Wellness",
  },
  {
    id: 3,
    name: "Rabbit Food",
    image: "https://i.ibb.co.com/bjpCL3ML/TIMOTHYHAY1.webp",
    title: "Timothy Hay Mix",
    tag: "Dental & Digestive Health",
  },
  {
    id: 4,
    name: "Fish Food",
    image: "https://i.ibb.co.com/dwbNvz7x/fish-food.webp",
    title: "Tropical Fish Flakes",
    tag: "Bright Color & Growth",
  },
  {
    id: 5,
    name: "Bird Food",
    image: "https://i.ibb.co.com/qF4BhzJ8/Bird-Food.jpg",
    title: "Wild Bird Seed Blend",
    tag: "Energetic Songbirds",
  },
];

const InteractivePetFood = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % FOOD_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + FOOD_SLIDES.length) % FOOD_SLIDES.length,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % FOOD_SLIDES.length);
  };

  return (
    <section className="relative bg-orange-50/50 mx-4 my-20 py-16 lg:py-24 border border-orange-100 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="-top-24 -left-24 absolute bg-orange-200/30 blur-[100px] rounded-full w-96 h-96 pointer-events-none"></div>
      <div className="right-0 bottom-0 absolute bg-orange-300/20 blur-[80px] rounded-full w-64 h-64 pointer-events-none"></div>

      <div className="z-10 relative mx-auto px-6 max-w-7xl">
        <div className="items-center gap-16 grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side: Text & Offer */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-orange-500/10 px-4 py-2 border border-orange-500/20 rounded-full"
            >
              <Zap
                size={14}
                className="fill-orange-600 text-orange-600 animate-pulse"
              />
              <span className="font-black text-[10px] text-orange-600 uppercase tracking-[0.2em]">
                Limited Offer: 20% Off
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-black text-slate-900 text-4xl md:text-7xl leading-[0.95] tracking-[-0.04em]"
            >
              Premium Food <br />
              <span className="text-orange-500">For All Pets</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="max-w-md font-medium text-slate-600 text-base md:text-lg leading-relaxed"
            >
              We don't just facilitate adoptions; we provide the foundation for
              a healthy life. Discover vet-approved nutrition tailored for your
              pets.
            </motion.p>

            <div className="flex flex-wrap gap-6 md:gap-8">
              <div className="flex items-center gap-3 text-slate-700">
                <div className="flex justify-center items-center bg-white shadow-md border border-orange-50/50 rounded-2xl w-12 h-12 text-orange-500">
                  <Leaf size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-sm uppercase tracking-wide">
                    100% Organic
                  </span>
                  <span className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">
                    Natural Ingredients
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <div className="flex justify-center items-center bg-white shadow-md border border-orange-50/50 rounded-2xl w-12 h-12 text-orange-500">
                  <ShieldCheck size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-sm uppercase tracking-wide">
                    Vet Approved
                  </span>
                  <span className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">
                    Verified Nutrition
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
                href="/pet-food"
                className="group inline-flex relative items-center gap-4 bg-slate-900 hover:bg-orange-600 shadow-xl px-10 md:px-12 py-4 md:py-5 rounded-2xl overflow-hidden font-black text-[11px] text-white uppercase tracking-[0.2em] transition-all duration-500"
              >
                <ShoppingBasket size={20} className="z-10 relative" />
                <span className="z-10 relative">Explore Food Shop</span>
                <ArrowRight
                  size={20}
                  className="z-10 relative transition-transform group-hover:translate-x-2"
                />
              </Link>
            </motion.div>
          </div>

          {/* Right Side: Interactive Food Slider */}
          <div className="group relative mt-12 lg:mt-0">
            <div className="z-20 relative bg-white shadow-2xl mx-auto border-[8px] md:border-[12px] border-white rounded-[2.5rem] md:rounded-[3rem] w-full max-w-[400px] lg:max-w-[500px] aspect-square overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={FOOD_SLIDES[currentIndex].id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.03 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={FOOD_SLIDES[currentIndex].image}
                    alt={FOOD_SLIDES[currentIndex].title}
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
              className="top-1/2 left-4 z-30 absolute bg-white/90 hover:bg-orange-500 hidden md:flex opacity-0 group-hover:opacity-100 shadow-lg p-3 rounded-full text-slate-700 hover:text-white transition-all -translate-y-1/2"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="top-1/2 right-4 z-30 absolute bg-white/90 hover:bg-orange-500 hidden md:flex opacity-0 group-hover:opacity-100 shadow-lg p-3 rounded-full text-slate-700 hover:text-white transition-all -translate-y-1/2"
            >
              <ChevronRight size={24} />
            </button>

            <motion.div
              key={`info-${FOOD_SLIDES[currentIndex].id}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="static md:absolute right-4 -bottom-8 z-30 flex items-center gap-4 bg-white shadow-xl mt-4 md:mt-0 p-5 md:p-6 border border-orange-50 rounded-[2rem] md:rounded-[2.5rem] w-full md:w-auto md:min-w-[280px]"
            >
              <div className="flex flex-col pr-4 pl-2">
                <p className="font-black text-[9px] text-orange-500 uppercase tracking-[0.25em]">
                  {FOOD_SLIDES[currentIndex].name}
                </p>
                <p className="font-black text-slate-900 text-lg md:text-xl leading-tight tracking-tight">
                  {FOOD_SLIDES[currentIndex].title}
                </p>
                <p className="mt-1 font-bold text-[10px] text-slate-400 uppercase tracking-widest">
                  {FOOD_SLIDES[currentIndex].tag}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 12 }}
              viewport={{ once: true }}
              className="-top-4 -right-4 md:top-10 md:-right-8 z-40 absolute flex flex-col justify-center items-center bg-slate-900 shadow-2xl border-4 border-white rounded-full w-22 h-22 md:w-24 md:h-24 text-white"
            >
              <span className="font-black text-[7px] md:text-[8px] text-orange-400 uppercase tracking-widest">
                Low as
              </span>
              <span className="font-black text-2xl md:text-3xl">$12</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractivePetFood;
