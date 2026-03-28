"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

const sponsors = [
  { id: 1, name: "Purnima", img: "https://i.ibb.co.com/93qCkQDq/purnima.png" },
  { id: 2, name: "Royal Canin", img: "https://i.ibb.co.com/5Xvd5RP5/Royal.png" },
  { id: 3, name: "Hills", img: "https://i.ibb.co.com/LD8WsfYZ/hills-logo.avif" },
  { id: 4, name: "Pedigree", img: "https://i.ibb.co.com/v4rvtDwP/pedigree-us-logo-0.webp" },
  { id: 5, name: "Iams", img: "https://i.ibb.co.com/3Y8VzS4J/Iams.png" },
  { id: 6, name: "Mars", img: "https://i.ibb.co.com/dsGqFbwg/Mars.png" },
];

export default function OurSponsor() {
  return (
    <section className="relative bg-white py-20 border-slate-100 border-y overflow-hidden">
      {/* Subtle Background Pattern (Optional) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png')` }}>
      </div>

      <div className="z-10 relative mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center mb-12">
          <p className="font-black text-[10px] text-slate-400 uppercase tracking-[0.4em]">
            Trusted by Industry Leaders
          </p>
          <div className="bg-orange-500 mt-3 w-12 h-[2px]"></div>
        </div>

        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={40}
          slidesPerView={2}
          loop={true}
          speed={5000} // Slightly faster for smoother flow
          freeMode={true}
          allowTouchMove={false}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 60 },
            768: { slidesPerView: 4, spaceBetween: 80 },
            1024: { slidesPerView: 5, spaceBetween: 100 },
          }}
          className="flex items-center sponsor-swiper"
        >
          {sponsors.map((sponsor) => (
            <SwiperSlide key={sponsor.id} className="flex justify-center items-center">
              <div className="group relative w-32 md:w-44 h-16 md:h-24 transition-all duration-500">
                <Image
                  src={sponsor.img}
                  alt={sponsor.name}
                  fill
                  sizes="(max-width: 768px) 120px, 200px"
                  className="opacity-40 group-hover:opacity-100 brightness-110 grayscale group-hover:grayscale-0 object-contain group-hover:scale-110 transition-all duration-700 ease-out"
                  priority={sponsor.id <= 4}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom CSS for perfectly linear motion */}
      <style jsx global>{`
        .sponsor-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
          display: flex;
          align-items: center;
        }
      `}</style>
    </section>
  );
}