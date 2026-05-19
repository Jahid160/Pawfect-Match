"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaHeart } from "react-icons/fa";

const STORIES = [
  {
    id: 1,
    name: "Shakil",
    text: "We adopted Bruno and he changed our life 🐈‍⬛",
    img: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600",
    size: "h-[280px] md:h-[320px]",
  },
  {
    id: 2,
    name: "Hasib",
    text: "Robo is now part of our family 🦮",
    img: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=600",
    size: "h-[340px] md:h-[420px]",
  },
  {
    id: 3,
    name: "Tanvir",
    text: "Adopting Luna was the best decision 🐈",
    img: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600",
    size: "h-[300px] md:h-[360px]",
  },
  {
    id: 4,
    name: "Jahid",
    text: "Charlie is my best friend now 🐕‍🦺",
    img: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=600",
    size: "h-[280px] md:h-[320px]",
  },
  {
    id: 5,
    name: "Web_Artist_Opu🥷",
    text: "Briston filled our home with happiness🤍",
    img: "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=600",
    size: "h-[360px] md:h-[460px]",
  },
  {
    id: 6,
    name: "Forhad",
    text: "Luna is not just a pet, she is family 🐩",
    img: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=600",
    size: "h-[300px] md:h-[340px]",
  },
];

export default function SuccessStories() {
  return (
    <section className="bg-[#FDFCFB] px-4 md:px-6 py-16 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Header - Consistent with Luxury UI */}
        <div className="mb-12 md:mb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 mb-4 md:mb-5 px-5 py-2 border border-orange-500/20 rounded-full font-black text-[10px] text-orange-600 uppercase tracking-[0.2em]">
            <FaHeart className="text-[12px]" /> TESTIMONIALS
          </div>
          <h2 className="font-black text-slate-900 text-4xl md:text-7xl leading-[0.95] tracking-[-0.04em]">
            Stories that make <br />
            <span className="text-orange-500">us wag our tails.</span>
          </h2>
        </div>

        {/* Masonry Grid Layout - Optimized Spacing */}
        <div className="gap-6 md:gap-8 columns-1 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {STORIES.map((story) => (
            <div
              key={story.id}
              className="inline-block mb-6 md:mb-8 w-full [break-inside:avoid]"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ y: -10 }}
                className="group relative cursor-pointer"
              >
                {/* Responsive Border and Rounded Corners */}
                <div
                  className={`relative w-full ${story.size} rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-[6px] md:border-[10px] border-white group-hover:border-orange-50 transition-all duration-500`}
                >
                  {/* Image Component with optimized layout */}
                  <Image
                    src={story.img}
                    alt={story.name}
                    fill
                    sizes="(max-w-7xl) 33vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Overlay Content - Mobile Friendly Padding */}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-900/95 via-slate-900/30 to-transparent p-6 md:p-10 transition-all duration-300">
                    <div className="transition-transform group-hover:-translate-y-1 duration-500 transform">
                      <FaQuoteLeft className="opacity-60 group-hover:opacity-100 mb-3 text-orange-400 text-2xl md:text-3xl transition-opacity" />

                      <p className="mb-4 md:mb-6 font-bold text-white text-base md:text-xl italic leading-snug md:leading-relaxed tracking-tight">
                        "{story.text}"
                      </p>

                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="bg-orange-500 w-6 group-hover:w-10 h-[2px] transition-all duration-500"></div>
                        <h4 className="font-black text-[10px] md:text-[11px] text-white uppercase leading-none tracking-[0.25em]">
                          {story.name}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Floating Heart Badge (Responsive Scale) */}
                  <div className="top-4 right-4 md:top-8 md:right-8 absolute bg-white/10 opacity-0 group-hover:opacity-100 shadow-2xl backdrop-blur-xl p-3 md:p-4 border border-white/20 rounded-xl md:rounded-2xl text-white scale-70 group-hover:scale-100 transition-all duration-500">
                    <FaHeart className="drop-shadow-lg text-orange-500" />
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
