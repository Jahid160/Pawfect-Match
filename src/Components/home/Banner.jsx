"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1600",
    alt: "Friendly smiling dog",
    tag: "Find your forever friend ",
    headline: 'Every Pet Deserves a <span class="text-orange-500">Pawfect</span> Match.',
    description: "Connecting lonely paws with loving homes. Start your journey today and find a companion that fits your lifestyle perfectly.",
    buttonText: "Adopt a Pet",
    buttonLink: "/adopt",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=1600",
    alt: "Cute cat looking away",
    tag: "Your new family member awaits",
    headline: 'Discover Unconditional <span class="text-orange-500">Love</span> Today.',
    description: "Browse thousands of pets looking for their loving homes. Find your perfect match and bring joy to your life.",
    buttonText: "Meet Our Pets",
    buttonLink: "/pets",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=1600",
    alt: "Human and pet bonding",
    tag: "Making dreams come true",
    headline: 'Start Your <span class="text-orange-500">Adoption Journey</span> Here.',
    description: "Our streamlined process makes adopting easy and safe. We're here to guide you every step of the way.",
    buttonText: "How It Works",
    buttonLink: "/how-it-works",
  },
];

const Banner = () => {
  return (
    // Height update: Mobile e 85vh kintu desktop (lg) e full screen (100vh)
    // pt-16 ba pt-20 add kora hoyeche jate navbar er niche thake
    <section className="relative bg-slate-100 pt-16 md:pt-0 w-full h-[85vh] lg:h-screen overflow-hidden">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                // object-center use kora hoyeche jate image er majhkhan dekha jay
                className="object-center object-cover lg:object-[center_25%]" 
                priority
              />

              {/* Overlay with better centering for desktop */}
              <div className="absolute inset-0 flex justify-center items-center bg-black/40 px-6 py-12">
                <div className="z-10 mx-auto text-white text-center container">
                  <span className="inline-block bg-orange-500 mb-6 px-5 py-1.5 rounded-full font-bold text-xs md:text-sm uppercase tracking-widest">
                    {slide.tag}
                  </span>

                  <h1
                    className="mx-auto mb-6 max-w-5xl font-black text-4xl md:text-6xl lg:text-8xl leading-[1.1]"
                    dangerouslySetInnerHTML={{ __html: slide.headline }}
                  />

                  <p className="opacity-90 mx-auto mb-10 max-w-3xl font-medium text-slate-100 text-lg md:text-2xl">
                    {slide.description}
                  </p>

                  <div className="flex sm:flex-row flex-col justify-center items-center gap-6">
                    <Link
                      href={slide.buttonLink}
                      className="bg-orange-500 hover:bg-orange-600 shadow-xl px-12 py-5 rounded-full font-bold text-white text-xl hover:scale-105 active:scale-95 transition-all"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          background: rgba(255, 255, 255, 0.1);
          width: 50px !important;
          height: 50px !important;
          border-radius: 50%;
          backdrop-filter: blur(4px);
          transform: scale(0.6);
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 24px !important;
          font-weight: bold;
        }
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.7;
          width: 12px !important;
          height: 12px !important;
        }
        .swiper-pagination-bullet-active {
          background: #f97316 !important;
          opacity: 1;
          width: 30px !important;
          border-radius: 8px !important;
        }
      `}</style>
    </section>
  );
};

export default Banner;