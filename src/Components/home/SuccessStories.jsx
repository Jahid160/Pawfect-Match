"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaHeart } from "react-icons/fa";

const stories = [
  { id: 1, name: "Shakil", text: "We adopted Bruno and he changed our life 🐈‍⬛", img: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600", size: "h-[300px]" },
  { id: 2, name: "Hasib", text: "Robo is now part of our family 🦮", img: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=600", size: "h-[400px]" },
  { id: 3, name: "Tanvir", text: "Adopting Luna was the best decision 🐈", img: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600", size: "h-[350px]" },
  { id: 4, name: "Jahid", text: "Charlie is my best friend now 🐕‍🦺", img: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=600", size: "h-[300px]" },
  { id: 5, name: "Web_Artist_Opu🥷", text: "Briston filled our home with happiness🤍", img: "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=600", size: "h-[450px]" },
  { id: 6, name: "Forhad", text: "Luna is not just a pet, she is family 🐩", img: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=600", size: "h-[320px]" },
];

export default function SuccessStories() {
  return (
    <section className="bg-[#FDFCFB] px-6 py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        
        {/* Header - Consistent with Expert/Accessories Section */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 mb-5 px-5 py-2 border border-orange-500/20 rounded-full font-black text-[10px] text-orange-600 uppercase tracking-[0.2em]">
             <FaHeart className="text-[12px]" /> TESTIMONIALS
          </div>
          <h2 className="font-black text-slate-900 text-5xl md:text-7xl leading-[0.95] tracking-[-0.04em]">
            Stories that make <br />
            <span className="text-orange-500">us wag our tails.</span>
          </h2>
        </div>

        {/* Masonry Grid with Refined Spacing */}
        <div className="gap-8 space-y-8 columns-1 md:columns-2 lg:columns-3">
          {stories.map((story) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -12 }}
              className="group relative break-inside-avoid cursor-pointer"
            >
              <div className={`relative w-full ${story.size} rounded-[3rem] overflow-hidden shadow-2xl border-[10px] border-white group-hover:border-orange-50 transition-all duration-500`}>
                
                {/* Image with subtle zoom */}
                <Image
                  src={story.img}
                  alt={story.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-100 p-10 transition-all duration-300">
                  <div className="transition-transform group-hover:-translate-y-2 duration-500 transform">
                    <FaQuoteLeft className="opacity-50 group-hover:opacity-100 mb-4 text-orange-400 text-3xl transition-opacity" />
                    <p className="mb-6 font-bold text-white text-xl italic leading-relaxed tracking-tight">
                      "{story.text}"
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className="bg-orange-500 w-8 group-hover:w-12 h-[2px] transition-all duration-500"></div>
                      <h4 className="font-black text-[11px] text-white uppercase leading-none tracking-[0.25em]">
                        {story.name}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Floating Heart Badge */}
                <div className="top-8 right-8 absolute bg-white/10 opacity-0 group-hover:opacity-100 shadow-2xl backdrop-blur-xl p-4 border border-white/20 rounded-2xl text-white scale-50 group-hover:scale-100 transition-all duration-500">
                  <FaHeart className="drop-shadow-lg text-orange-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA - Consistent Button Style */}
        <div className="mt-20 text-center">
            <button className="group inline-flex relative items-center gap-4 bg-slate-900 hover:bg-orange-600 shadow-xl px-12 py-5 rounded-2xl overflow-hidden font-black text-[11px] text-white uppercase tracking-[0.2em] transition-all duration-500">
                <span className="z-10 relative">READ ALL STORIES</span>
                <div className="top-0 -left-full group-hover:left-full absolute bg-gradient-to-r from-transparent via-white/10 to-transparent w-full h-full transition-all duration-1000"></div>
            </button>
        </div>
      </div>
    </section>
  );
}