"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import Image from "next/image";

const sponsors = [
  { id: 1, img: "https://i.ibb.co.com/93qCkQDq/purnima.png" },
  { id: 2, img: "https://i.ibb.co.com/5Xvd5RP5/Royal.png" },
  { id: 3, img: "https://i.ibb.co.com/LD8WsfYZ/hills-logo.avif" },
  { id: 4, img: "https://i.ibb.co.com/v4rvtDwP/pedigree-us-logo-0.webp" },
  { id: 5, img: "https://i.ibb.co.com/3Y8VzS4J/Iams.png" },
  { id: 6, img: "https://i.ibb.co.com/dsGqFbwg/Mars.png" },
];

export default function OurSponsor() {
  return (
    <section className="bg-white py-16 border-gray-100 border-y overflow-hidden">
      <div className="mx-auto px-6 max-w-7xl">
        <p className="mb-12 font-bold text-gray-400 text-xs text-center uppercase tracking-[0.4em]">
          Trusted by Industry Leaders
        </p>

        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={40}
          slidesPerView={2}
          loop={true}
          speed={6000} // Ektu slow and smooth movement
          freeMode={true}
          allowTouchMove={false}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 50 },
            768: { slidesPerView: 4, spaceBetween: 70 },
            1024: { slidesPerView: 5, spaceBetween: 90 },
          }}
          className="flex items-center sponsor-swiper"
        >
          {sponsors.map((sponsor) => (
            // Image link thaklei shudhu render hobe, jate crash na khay
            sponsor.img && (
              <SwiperSlide key={sponsor.id} className="flex justify-center items-center">
                <div className="relative w-32 md:w-40 h-14 md:h-20 transition-all duration-500">
                  <img
                    src={sponsor.img}
                    alt={`Partner Logo ${sponsor.id}`}
                    fill
                    sizes="(max-width: 768px) 120px, 200px"
                    className="opacity-40 hover:opacity-100 brightness-110 grayscale hover:grayscale-0 object-contain transition-all duration-700"
                  />
                </div>
              </SwiperSlide>
            )
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .sponsor-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
}