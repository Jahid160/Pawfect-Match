"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const stories = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1709873582570-4f17d43921d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3BvbnNvciUyMGxvZ298ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1614328669321-cbf2e859fb0f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNwb25zb3IlMjBsb2dvfGVufDB8fDB8fHww",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1658087252613-a4d09bf7a64c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNwb25zb3IlMjBsb2dvfGVufDB8fDB8fHww",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1751263317332-7368f7e98a91?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNwb25zb3IlMjBsb2dvfGVufDB8fDB8fHww",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1660071155921-7204712d7d1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNwb25zb3IlMjBsb2dvfGVufDB8fDB8fHww",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1611488006001-eb993d4d2ec4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNwb25zb3IlMjBsb2dvfGVufDB8fDB8fHww",
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1669975862965-a092cd94a81a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNwb25zb3IlMjBsb2dvfGVufDB8fDB8fHww",
  },
  {
    id: 8,
    img: "https://images.unsplash.com/photo-1628760584600-6c31148991e9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNwb25zb3IlMjBsb2dvfGVufDB8fDB8fHww",
  },
];

export default function OurSponsor() {
  return (
    <section className="bg-gray-100 py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Our Sponsors</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 500 }}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {stories.map((story) => (
          <SwiperSlide key={story.id}>
            <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition">
              {/* Image */}
              <div className="relative w-full h-40">
                <Image
                  src={story.img}
                  alt={story.id}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
