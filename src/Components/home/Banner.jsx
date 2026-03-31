"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Dog, Cat, Bird, Rabbit, Fish } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const heroSlides = [
  {
    id: 1,
    image: "https://i.ibb.co.com/672CDDNf/alvan-nee-br-Fs-Z7qsz-SY-unsplash.jpg",
    tag: "Find your forever friend",
    headline: 'Every Pet Deserves a <span class="text-orange-500">Pawfect</span> Match.',
    description: "Connecting lonely paws with loving homes. Start your journey today and find a companion that fits your lifestyle perfectly.",
    buttonText: "Adopt a Pet",
    buttonLink: "/all-pets",
    icon: <Dog size={24} />,
    stats: "2.5k+ Adoptions"
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/gMCCDfBG/juairia-islam-shefa-Qqf-Ry-I79-LO8-unsplash.jpg",
    tag: "Feline companions",
    headline: 'Bring Home a <span class="text-orange-500">Purr-fect</span> Soulmate.',
    description: "Elegant, independent, and full of love. Our rescue cats are waiting to fill your home with soft purrs and constant joy.",
    buttonText: "Meet Cats",
    buttonLink: "/all-pets",
    icon: <Cat size={24} />,
    stats: "900+ Happy Cats"
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/DDSDvzDM/dmitry-chernyshov-vz-VWYIr6-F8-U-unsplash.jpg",
    tag: "Colorful chirps",
    headline: 'Fill Your Life with <span class="text-orange-500">Vibrant</span> Chirps.',
    description: "From talkative parrots to sweet canaries, find a feathered friend that brings melody and color to your world.",
    buttonText: "View Birds",
    buttonLink: "/all-pets",
    icon: <Bird size={24} />,
    stats: "150+ Rare Birds"
  },
  {
    id: 4,
    image: "https://i.ibb.co.com/pBc2LLzw/nikolett-emmert-kkpom-Ot-VXT8-unsplash.jpg",
    tag: "Small & Cuddly",
    headline: 'Adorable <span class="text-orange-500">Bunnies</span> for Little Smiles.',
    description: "Gentle and curious, our rabbits are perfect for families looking for a soft, quiet, and playful companion.",
    buttonText: "Meet Rabbits",
    buttonLink: "/all-pets",
    icon: <Rabbit size={24} />,
    stats: "300+ Bunnies"
  },
  {
    id: 5,
    image: "https://i.ibb.co.com/ZzSBCdpQ/claudio-guglieri-K2-RH1-QZd-LF4-unsplash.jpg",
    tag: "Serene Aquatics",
    headline: 'Find Peace with <span class="text-orange-500">Aquatic</span> Beauty.',
    description: "Create a tranquil underwater world. Explore our collection of exotic fish and bring serenity to your living space.",
    buttonText: "Explore Fish",
    buttonLink: "/all-pets",
    icon: <Fish size={24} />,
    stats: "1.2k+ Exotic Fish"
  }
];

const Banner = () => {
  return (
    <section className="relative bg-white w-full lg:h-[95vh] min-h-screen overflow-hidden">
      
      <Swiper
        spaceBetween={0}
        effect={"fade"}
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ 
          clickable: true,
          el: '.custom-pagination'
        }}
        modules={[Autoplay, Pagination, EffectFade]}
        className="w-full h-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="flex lg:flex-row flex-col-reverse items-center gap-10 lg:gap-0 mx-auto px-6 lg:px-12 py-16 lg:py-0 w-full max-w-7xl h-full">
              
              {/* --- LEFT CONTENT --- */}
              <div className="z-20 flex flex-col flex-1 justify-center text-center lg:text-start">
                <div className="inline-flex items-center gap-3 bg-orange-50 mx-auto lg:mx-0 mb-6 lg:mb-8 px-5 py-2.5 border border-orange-100 rounded-full w-fit font-black text-[10px] text-orange-600 uppercase tracking-[0.3em]">
                  <span className="relative flex w-2 h-2">
                    <span className="inline-flex absolute bg-orange-400 opacity-75 rounded-full w-full h-full animate-ping"></span>
                    <span className="inline-flex relative bg-orange-500 rounded-full w-2 h-2"></span>
                  </span>
                  {slide.tag}
                </div>
                
                <h1 
                  className="mb-6 lg:mb-8 font-black text-slate-900 lg:text-[85px] text-4xl md:text-6xl leading-[1.1] lg:leading-[0.95] tracking-[-0.04em]"
                  dangerouslySetInnerHTML={{ __html: slide.headline }}
                />
                
                <p className="mx-auto lg:mx-0 mb-8 lg:mb-12 max-w-xl font-medium text-slate-500 text-sm md:text-xl leading-relaxed">
                  {slide.description}
                </p>

                <div className="flex sm:flex-row flex-col justify-center lg:justify-start gap-4 lg:gap-5">
                  <Link
                    href={slide.buttonLink}
                    className="group flex justify-center items-center gap-3 bg-slate-900 hover:bg-orange-500 shadow-xl px-10 py-4 lg:py-5 rounded-2xl font-black text-[11px] text-white uppercase tracking-[0.2em] transition-all hover:-translate-y-1 duration-500"
                  >
                    {slide.buttonText}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/contact"
                    className="hover:bg-orange-50 px-10 py-4 lg:py-5 border-2 border-slate-100 hover:border-orange-500 rounded-2xl font-black text-[11px] text-slate-900 hover:text-orange-600 text-center uppercase tracking-[0.2em] transition-all duration-300"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>

              {/* --- RIGHT IMAGE (MOBILE OPTIMIZED) --- */}
              <div className="relative flex flex-1 justify-center items-center w-full min-h-[320px] lg:min-h-[600px]">
                <div className="group relative w-full max-w-[450px] lg:max-w-none lg:h-[600px] aspect-square">
                    <div className="relative bg-white shadow-2xl border-[6px] border-slate-50 lg:border-[10px] rounded-[3rem] lg:rounded-[4.5rem] w-full h-full overflow-hidden">
                      <Image
                          src={slide.image}
                          alt="Pet"
                          fill
                          className="object-cover scale-100 group-hover:scale-105 transition-transform duration-[8000ms] ease-out"
                          priority
                      />
                    </div>

                    {/* Floating Info Card 1 */}
                    <div className="top-4 lg:top-10 -right-2 lg:-right-8 z-30 absolute flex items-center gap-2 lg:gap-3 bg-white/95 shadow-xl px-4 lg:px-6 py-3 lg:py-4 border border-slate-50 rounded-3xl lg:rounded-[2.2rem] animate-float">
                        <div className="bg-orange-100 p-2 rounded-xl text-orange-600">
                          <Sparkles size={18} />
                        </div>
                        <div>
                            <p className="font-black text-slate-900 text-xs lg:text-sm leading-none tracking-tight">{slide.stats}</p>
                            <p className="mt-1 font-bold text-[8px] text-slate-400 lg:text-[9px] uppercase tracking-[0.1em]">Happy Homes</p>
                        </div>
                    </div>

                    {/* Floating Info Card 2 */}
                    <div className="bottom-6 lg:bottom-12 -left-2 lg:-left-10 z-30 absolute flex items-center gap-3 lg:gap-4 bg-white shadow-2xl p-4 lg:p-6 border border-slate-50 rounded-3xl lg:rounded-[2.5rem] animate-float-delayed">
                        <div className="bg-slate-900 shadow-lg p-2.5 lg:p-3.5 rounded-xl lg:rounded-2xl text-white">
                            {slide.icon}
                        </div>
                        <div>
                            <p className="font-black text-slate-900 text-sm lg:text-base leading-none tracking-tight">Verified</p>
                            <p className="mt-1 font-bold text-[9px] text-orange-500 lg:text-[10px] uppercase tracking-[0.2em]">100% Healthy</p>
                        </div>
                    </div>
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination */}
      <div className="right-0 bottom-6 lg:bottom-10 left-0 z-50 absolute flex justify-center items-center gap-2 pointer-events-none custom-pagination"></div>

      <style jsx global>{`
        .custom-pagination { pointer-events: auto; }
        .swiper-pagination-bullet { 
          background: #E2E8F0 !important; 
          opacity: 1 !important; 
          width: 8px !important; 
          height: 8px !important; 
          margin: 0 5px !important;
          transition: all 0.4s ease;
        }
        .swiper-pagination-bullet-active { 
          background: #f97316 !important; 
          width: 32px !important; 
          border-radius: 8px !important; 
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
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Banner;