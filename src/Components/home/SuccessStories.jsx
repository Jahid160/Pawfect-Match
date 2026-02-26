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
    <section className="bg-[#FDFCFB] px-6 py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        
        {/* Header - Consistent with your other sections */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 mb-4 px-4 py-1 rounded-full font-black text-orange-600 text-xs tracking-widest">
             <FaHeart /> TESTIMONIALS
          </div>
          <h2 className="font-black text-gray-900 text-4xl md:text-5xl leading-tight">
            Stories that make <br />
            <span className="text-orange-500 italic">us wag our tails.</span>
          </h2>
        </div>

        {/* Unique Masonry-ish Grid */}
        <div className="gap-6 space-y-6 columns-1 md:columns-2 lg:columns-3">
          {stories.map((story) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative break-inside-avoid cursor-pointer"
            >
              <div className={`relative w-full ${story.size} rounded-[2.5rem] overflow-hidden shadow-sm border-4 border-white group-hover:shadow-2xl transition-all duration-500`}>
                
                {/* Image */}
                <Image
                  src={story.img}
                  alt={story.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay Content (Always visible or Hover based) */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 transition-opacity duration-300">
                  <div className="transition-transform translate-y-4 group-hover:translate-y-0 duration-500">
                    <FaQuoteLeft className="opacity-0 group-hover:opacity-100 mb-4 text-orange-400 text-2xl transition-opacity" />
                    <p className="mb-4 font-medium text-white text-lg italic leading-snug">
                      "{story.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-500 w-8 h-[2px]"></div>
                      <h4 className="font-black text-white text-sm uppercase leading-none tracking-widest">
                        {story.name}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Badge */}
                <div className="top-6 right-6 absolute bg-white/20 opacity-0 group-hover:opacity-100 backdrop-blur-md p-3 border border-white/30 rounded-full text-white scale-50 group-hover:scale-100 transition-all duration-500 transform">
                  <FaHeart className="text-orange-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA for Section */}
        <div className="mt-16 text-center">
            <button className="bg-gray-900 hover:bg-orange-500 shadow-xl px-10 py-4 rounded-2xl font-black text-white text-sm tracking-widest transition-colors">
                READ ALL STORIES
            </button>
        </div>
      </div>
    </section>
  );
}