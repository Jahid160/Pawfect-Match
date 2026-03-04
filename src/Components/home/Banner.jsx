"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const heroSlides = [
  {
    id: 1,
    image: "https://i.ibb.co.com/672CDDNf/alvan-nee-br-Fs-Z7qsz-SY-unsplash.jpg",
    tag: "Find your forever friend",
    headline: 'Every Pet Deserves a <span class="text-orange-500 decoration-orange-200">Pawfect</span> Match.',
    description: "Connecting lonely paws with loving homes. Start your journey today and find a companion that fits your lifestyle perfectly.",
    buttonText: "Adopt a Pet",
    buttonLink: "/adopt",
    icon: "🐶",
    stats: "2.5k+ Adoptions"
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/gMCCDfBG/juairia-islam-shefa-Qqf-Ry-I79-LO8-unsplash.jpg",
    tag: "Feline companions",
    headline: 'Bring Home a <span class="text-orange-500 italic">Purr-fect</span> Soulmate.',
    description: "Elegant, independent, and full of love. Our rescue cats are waiting to fill your home with soft purrs and constant joy.",
    buttonText: "Meet Cats",
    buttonLink: "/pets/cats",
    icon: "🐱",
    stats: "900+ Happy Cats"
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/DDSDvzDM/dmitry-chernyshov-vz-VWYIr6-F8-U-unsplash.jpg",
    tag: "Colorful chirps",
    headline: 'Fill Your Life with <span class="text-orange-500">Vibrant</span> Chirps.',
    description: "From talkative parrots to sweet canaries, find a feathered friend that brings melody and color to your world.",
    buttonText: "View Birds",
    buttonLink: "/pets/birds",
    icon: "🦜",
    stats: "150+ Rare Birds"
  },
  {
    id: 4,
    image: "https://i.ibb.co.com/pBc2LLzw/nikolett-emmert-kkpom-Ot-VXT8-unsplash.jpg",
    tag: "Small & Cuddly",
    headline: 'Adorable <span class="text-orange-500">Bunnies</span> for Little Smiles.',
    description: "Gentle and curious, our rabbits are perfect for families looking for a soft, quiet, and playful companion.",
    buttonText: "Meet Rabbits",
    buttonLink: "/pets/rabbits",
    icon: "🐰",
    stats: "300+ Bunnies"
  },
  {
    id: 5,
    image: "https://i.ibb.co.com/ZzSBCdpQ/claudio-guglieri-K2-RH1-QZd-LF4-unsplash.jpg",
    tag: "Serene Aquatics",
    headline: 'Find Peace with <span class="text-orange-500">Aquatic</span> Beauty.',
    description: "Create a tranquil underwater world. Explore our collection of exotic fish and bring serenity to your living space.",
    buttonText: "Explore Fish",
    buttonLink: "/pets/fish",
    icon: "🐠",
    stats: "1.2k+ Exotic Fish"
  }
];

const Banner = () => {
  return (
    // Pure White Background
    <section className="relative bg-white w-full h-screen lg:h-[95vh] min-h-[750px] overflow-hidden">
      
      <Swiper
        spaceBetween={0}
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ 
          clickable: true,
          el: '.custom-pagination' // Custom class for precise control
        }}
        modules={[Autoplay, Pagination, EffectFade]}
        className="w-full h-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="flex lg:flex-row flex-col items-center bg-transparent mx-auto px-6 lg:px-12 w-full max-w-7xl h-full">
              
              {/* --- LEFT CONTENT --- */}
              <div className="z-20 flex flex-col flex-1 justify-center py-10 lg:py-0 text-start">
                <div className="inline-flex items-center gap-3 bg-orange-50 mb-8 px-5 py-2.5 border border-orange-100 rounded-full w-fit font-bold text-[10px] text-orange-600 uppercase tracking-[2px]">
                  <span className="relative flex w-2 h-2">
                    <span className="inline-flex absolute bg-orange-400 opacity-75 rounded-full w-full h-full animate-ping"></span>
                    <span className="inline-flex relative bg-orange-500 rounded-full w-2 h-2"></span>
                  </span>
                  {slide.tag}
                </div>
                
                <h1 
                  className="mb-8 font-black text-slate-900 lg:text-[85px] text-5xl md:text-7xl leading-[1] tracking-[-3px]"
                  dangerouslySetInnerHTML={{ __html: slide.headline }}
                />
                
                <p className="mb-12 max-w-xl font-medium text-gray-500 text-lg md:text-xl leading-relaxed">
                  {slide.description}
                </p>

                <div className="flex sm:flex-row flex-col gap-5">
                  <Link
                    href="/all-pets"
                    className="group flex justify-center items-center gap-3 bg-orange-500 hover:bg-slate-900 shadow-lg shadow-orange-100 px-12 py-5 rounded-2xl font-bold text-white text-center transition-all hover:-translate-y-1 duration-500 transform"
                  >
                    {slide.buttonText}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="hover:bg-orange-50 px-12 py-5 border-2 border-slate-100 hover:border-orange-500 rounded-2xl font-bold text-slate-700 hover:text-orange-600 text-center transition-all duration-300"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>

              {/* --- RIGHT IMAGE --- */}
              <div className="relative flex flex-1 justify-center items-center pb-24 lg:pb-0 w-full h-[500px] lg:h-[700px]">
                <div className="group relative w-full h-[400px] lg:h-[600px]">
                    {/* Simplified Image Container */}
                    <div className="relative bg-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border-[10px] border-slate-50 rounded-[4.5rem] w-full h-full overflow-hidden">
                      <Image
                          src={slide.image}
                          alt="Pet"
                          fill
                          className="object-cover scale-100 group-hover:scale-105 transition-transform duration-[8000ms] ease-out"
                          priority
                      />
                    </div>

                    {/* Floating Info Card 1 */}
                    <div className="top-10 -right-4 lg:-right-8 z-30 absolute flex items-center gap-3 bg-white/95 shadow-xl px-5 py-4 border border-slate-100 rounded-[2rem] animate-float">
                        <div className="bg-orange-100 p-2 rounded-xl text-lg">✨</div>
                        <div>
                            <p className="font-black text-slate-800 text-sm leading-none">{slide.stats}</p>
                            <p className="mt-1 font-bold text-[9px] text-gray-400 uppercase tracking-wider">Happy Homes</p>
                        </div>
                    </div>

                    {/* Floating Info Card 2 */}
                    <div className="bottom-12 -left-6 lg:-left-10 z-30 absolute flex items-center gap-4 bg-white shadow-2xl p-5 border border-slate-50 rounded-[2.5rem] animate-float-delayed">
                        <div className="bg-orange-500 shadow-lg shadow-orange-200 p-3.5 rounded-2xl text-white text-xl">
                            {slide.icon}
                        </div>
                        <div>
                            <p className="font-black text-slate-900 text-base leading-none">Pet Verified</p>
                            <p className="mt-1 font-bold text-[10px] text-orange-500 uppercase tracking-widest">100% Healthy</p>
                        </div>
                    </div>
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Container - Separated for exact control */}
      <div className="right-0 bottom-10 left-0 z-50 absolute flex justify-center items-center gap-2 pointer-events-none custom-pagination"></div>

      <style jsx global>{`
        /* Background removal for container */
        .swiper-pagination-lock { display: block !important; }
        
        /* Centering and Styling Dots */
        .custom-pagination {
          pointer-events: auto;
        }
        .swiper-pagination-bullet { 
          background: #E2E8F0 !important; 
          opacity: 1 !important; 
          width: 12px !important; 
          height: 12px !important; 
          margin: 0 5px !important;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
        }
        .swiper-pagination-bullet-active { 
          background: #f97316 !important; 
          width: 45px !important; 
          border-radius: 12px !important; 
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(15px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Banner;