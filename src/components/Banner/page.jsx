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

    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1600",
    alt: "Friendly smiling dog",
    tag: "Find your forever friend ",
    headline:
      'Every Pet Deserves a <span class="text-orange-500">Pawfect</span> Match.',
    description:
      "Connecting lonely paws with loving homes. Start your journey today and find a companion that fits your lifestyle perfectly.",
    buttonText: "Adopt a Pet",
    buttonLink: "/adopt",
  },
  {
    id: 2,

    image:
      "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=1600",
    alt: "Cute cat looking away",
    tag: "Your new family member awaits",
    headline:
      'Discover Unconditional <span class="text-orange-500">Love</span> Today.',
    description:
      "Browse thousands of pets looking for their loving homes. Find your perfect match and bring joy to your life.",
    buttonText: "Meet Our Pets",
    buttonLink: "/pets",
  },
  {
    id: 3,

    image:
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=1600",
    alt: "Human and pet bonding",
    tag: "Making dreams come true",
    headline:
      'Start Your <span class="text-orange-500">Adoption Journey</span> Here.',
    description:
      "Our streamlined process makes adopting easy and safe. We're here to guide you every step of the way.",
    buttonText: "How It Works",
    buttonLink: "/how-it-works",
  },
];

const Banner = () => {
  return (
    <section className="relative bg-slate-100 w-full h-[85vh] md:h-[90vh] overflow-hidden">
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
              {/* Image using unoptimized for external links if needed, or normal Next Image */}
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover"
                priority
              />

              {/* Overlay */}
              <div className="absolute inset-0 flex justify-center items-center bg-black/40 p-6">
                <div className="z-10 mx-auto text-white text-center container">
                  <span className="inline-block bg-primary mb-4 px-4 py-1 rounded-full font-semibold text-xs md:text-sm uppercase tracking-widest animate-fade-in">
                    {slide.tag}
                  </span>

                  <h1
                    className="mx-auto mb-6 max-w-4xl font-bold text-4xl md:text-7xl leading-tight"
                    dangerouslySetInnerHTML={{ __html: slide.headline }}
                  />

                  <p className="opacity-90 mx-auto mb-10 max-w-2xl text-slate-100 text-lg md:text-xl">
                    {slide.description}
                  </p>

                  <div className="flex sm:flex-row flex-col justify-center gap-4">
                    <Link
                      href={slide.buttonLink}
                      className="bg-primary hover:opacity-90 shadow-lg shadow-primary/20 px-10 py-4 rounded-full font-bold text-white text-lg hover:scale-105 transition-all"
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

      {/* Custom CSS for Swiper arrows - optional but makes it pro */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          transform: scale(0.7);
        }
        .swiper-pagination-bullet-active {
          background: #f97316 !important;
        }
      `}</style>
    </section>
  );
};

export default Banner;
