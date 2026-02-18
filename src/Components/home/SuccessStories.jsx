"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const stories = [
  {
    id: 1,
    name: "Rahim Family",
    text: "We adopted Bruno and he changed our life ❤️",
    img: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhdHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 2,
    name: "Karim Family",
    text: "Milo is now part of our family 🐱",
    img: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fHww",
  },
  {
    id: 3,
    name: "Sadia",
    text: "Adopting Luna was the best decision 🐶",
    img: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNhdHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 4,
    name: "Hasan",
    text: "Charlie is my best friend now 🐕",
    img: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9nfGVufDB8fDB8fHww",
  },
  {
    id: 5,
    name: "Kona",
    text: "Max filled our home with love and happiness 🐶",
    img: "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhdHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 6,
    name: "Hasib",
    text: "Luna is not just a pet, she is family now 🐾",
    img: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRvZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 7,
    name: "Kohinur",
    text: "Our kids found their best friend in Rocky 🐕",
    img: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2F0fGVufDB8fDB8fHww",
  },
  {
    id: 8,
    name: "Bristy",
    text: "Giving Oliver a home changed our lives forever 💕",
    img: "https://images.unsplash.com/photo-1535241749838-299277b6305f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFiaXR8ZW58MHx8MHx8fDA%3D",
  },
];

export default function SuccessStories() {
  return (
    <section className="bg-gray-100 py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Happy Tails</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 2000 }}
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
              <div className="relative w-full h-56">
                <Image
                  src={story.img}
                  alt={story.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <p className="italic text-gray-600">&#34;{story.text}&#34;</p>
                <h4 className="mt-4 font-semibold text-lg">– {story.name}</h4>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
