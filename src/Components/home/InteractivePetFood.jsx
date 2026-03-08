"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBasket, ArrowRight, Zap, Leaf, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const InteractivePetFood = () => {
  const foodSlides = [
    {
      id: 1,
      name: "Dog Food",
      image: "https://i.ibb.co.com/qLndzddK/dogs-food.jpg",
      title: "Premium Dog Kibble",
      tag: "Active & Healthy Dogs"
    },
    {
      id: 2,
      name: "Cat Food",
      image: "https://i.ibb.co.com/TxvJyC0g/nicat-almemmedov-ZScq1g-D66s-unsplash.jpg",
      title: "Gourmet Cat Treats",
      tag: "Shiny Fur & Wellness"
    },
    {
      id: 3,
      name: "Rabbit Food",
      image: "https://i.ibb.co.com/bjpCL3ML/TIMOTHYHAY1.webp",
      title: "Timothy Hay Mix",
      tag: "Dental & Digestive Health"
    },
    {
      id: 4,
      name: "Fish Food",
      image: "https://i.ibb.co.com/dwbNvz7x/fish-food.webp",
      title: "Tropical Fish Flakes",
      tag: "Bright Color & Growth"
    },
    {
      id: 5,
      name: "Bird Food",
      image: "https://i.ibb.co.com/qF4BhzJ8/Bird-Food.jpg",
      title: "Wild Bird Seed Blend",
      tag: "Energetic Songbirds"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % foodSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [foodSlides.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + foodSlides.length) % foodSlides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % foodSlides.length);
  };

  return (
    <section className="relative bg-orange-50/50 mx-4 my-10 py-28 border border-orange-100 rounded-[4rem] overflow-hidden">
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
              className="inline-flex items-center gap-2 bg-orange-500/10 px-4 py-2 border border-orange-500/20 rounded-full"
            >
              <Zap size={16} className="fill-orange-600 text-orange-600" />
              <span className="font-black text-orange-600 text-xs uppercase tracking-widest">Limited Offer: 20% Off</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-black text-slate-900 text-5xl md:text-7xl leading-tight"
            >
              Premium Food <br />
              <span className="text-shadow-sm text-orange-500">For All Pets</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="max-w-md text-slate-600 text-lg leading-relaxed"
            >
              We don't just facilitate adoptions; we provide the foundation for a healthy life. Discover vet-approved nutrition tailored for your furry, feathered, or scaled friends.
            </motion.p>

            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3 text-slate-700">
                <div className="flex justify-center items-center bg-white shadow-md border border-orange-50/50 rounded-2xl w-12 h-12 text-orange-500">
                  <Leaf size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-sm uppercase">100% Organic</span>
                  <span className="text-[10px] text-slate-500">Natural Ingredients</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <div className="flex justify-center items-center bg-white shadow-md border border-orange-50/50 rounded-2xl w-12 h-12 text-orange-500">
                  <ShieldCheck size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-sm uppercase">Vet Approved</span>
                  <span className="text-[10px] text-slate-500">Verified Nutrition</span>
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
                className="group inline-flex relative items-center gap-4 bg-orange-500 hover:bg-slate-900 shadow-[0_20px_40px_-15px_rgba(249,115,22,0.4)] hover:shadow-2xl px-12 py-5 rounded-2xl overflow-hidden font-black text-white uppercase tracking-wider transition-all duration-500"
              >
                <ShoppingBasket size={24} className="z-10 relative" />
                <span className="z-10 relative uppercase tracking-[0.2em]">Explore Food Shop</span>
                <ArrowRight size={24} className="z-10 relative transition-transform group-hover:translate-x-2" />
              </Link>
            </motion.div>
          </div>

          {/* Right Side: Interactive Food Slider */}
          <div className="group relative">
            
            {/* Main Featured Food Image Slider */}
            <div className="z-20 relative bg-white shadow-2xl mx-auto border-[12px] border-white rounded-[3rem] w-full max-w-[500px] aspect-square overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={foodSlides[currentIndex].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  <Image 
                    src={foodSlides[currentIndex].image} 
                    alt={foodSlides[currentIndex].title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Navigation Buttons */}
            <button 
              onClick={handlePrev} 
              className="top-1/2 left-4 z-30 absolute bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 shadow-lg p-3 rounded-full text-slate-700 hover:text-orange-500 transition-all -translate-y-1/2"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={handleNext} 
              className="top-1/2 right-4 z-30 absolute bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 shadow-lg p-3 rounded-full text-slate-700 hover:text-orange-500 transition-all -translate-y-1/2"
            >
              <ChevronRight size={24} />
            </button>

            {/* Floating Info Element  */}
            <motion.div 
              key={`info-${foodSlides[currentIndex].id}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="right-4 -bottom-10 z-30 absolute flex items-center gap-4 bg-white shadow-xl p-4 border border-orange-50 rounded-[2rem]"
            >
              <div className="flex flex-col pr-4 pl-2">
                <p className="font-black text-[10px] text-orange-500 uppercase">{foodSlides[currentIndex].name}</p>
                <p className="font-black text-slate-800 text-lg leading-tight">{foodSlides[currentIndex].title}</p>
                <p className="text-[10px] text-slate-500">{foodSlides[currentIndex].tag}</p>
              </div>
            </motion.div>

            {/* Price Tag Bubble (স্থির) */}
            <motion.div 
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 12 }}
              className="top-10 -right-8 z-40 absolute flex flex-col justify-center items-center bg-slate-900 shadow-2xl border-4 border-white rounded-full w-24 h-24 text-white"
            >
              <span className="font-bold text-[10px] text-orange-400">Low as</span>
              <span className="font-black text-2xl">$12</span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InteractivePetFood;