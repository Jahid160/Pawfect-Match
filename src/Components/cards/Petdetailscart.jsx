import React from 'react';
import Link from 'next/link';
import { FaHeart, FaMapMarkerAlt, FaPaw, FaPhoneAlt, FaEnvelope, FaInfoCircle, FaChevronLeft } from 'react-icons/fa';

const Petdetailscart = () => {
  // Mock Data (Real project-e eta dynamic hobe)
  const pet = {
    id: 1,
    name: "Buddy",
    age: "2 Months",
    location: "Dhaka, Bangladesh",
    price: "$250",
    category: "Dog",
    breed: "Golden Retriever",
    gender: "Male",
    weight: "5 kg",
    description: "Buddy is a very playful and friendly puppy. He loves to play with balls and is already partially house-trained. He is looking for a loving family who can give him lots of attention and belly rubs.",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1000",
    owner: {
      name: "Rahat Islam",
      phone: "+880 1712-345678",
      email: "contact@pawfact.com"
    }
  };

  return (
    <div className="bg-[#FDFCFB] px-4 sm:px-6 py-12 min-h-screen">
      <div className="mx-auto max-w-6xl">

        {/* Navigation Button using Link (Safe for Server Components) */}
        <Link
          href="/"
          className="group flex items-center gap-2 mb-8 w-fit font-bold text-gray-400 hover:text-orange-500 transition-all"
        >
          <FaChevronLeft className="transition-transform group-hover:-translate-x-1" />
          Back to Collection
        </Link>

        <div className="flex lg:flex-row flex-col items-start gap-12">

          {/* Left: Image Hero Section */}
          <div className="top-10 lg:sticky w-full lg:w-1/2">
            <div className="relative bg-white shadow-2xl p-2 border border-gray-100 rounded-[40px] overflow-hidden">
              <img
                src={pet.image}
                alt={pet.name}
                className="rounded-[35px] w-full h-[500px] object-cover"
              />

              {/* Category Badge */}
              <div className="top-8 left-8 absolute flex items-center gap-2 bg-white/90 shadow-lg backdrop-blur-md px-6 py-2 rounded-full font-bold text-orange-600">
                <FaPaw /> {pet.category}
              </div>

              <div className="top-8 right-8 absolute bg-white/90 shadow-lg backdrop-blur-md p-4 rounded-full text-red-500">
                <FaHeart size={22} />
              </div>
            </div>
          </div>

          {/* Right: Details & Action Section */}
          <div className="space-y-8 w-full lg:w-1/2">

            {/* Title & Price */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <h1 className="font-black text-gray-900 text-5xl tracking-tight">{pet.name}</h1>
                <span className="bg-orange-50 px-6 py-2 rounded-2xl font-black text-orange-500 text-3xl">{pet.price}</span>
              </div>
              <p className="flex items-center gap-2 font-semibold text-gray-500 text-lg">
                <FaMapMarkerAlt className="text-orange-400" /> {pet.location}
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="gap-4 grid grid-cols-3">
              <div className="bg-white shadow-sm p-5 border-2 border-gray-100 rounded-3xl text-center">
                <p className="mb-1 font-black text-[10px] text-gray-400 uppercase tracking-widest">Age</p>
                <p className="font-bold text-gray-800 text-lg">{pet.age}</p>
              </div>
              <div className="bg-white shadow-sm p-5 border-2 border-gray-100 rounded-3xl text-center">
                <p className="mb-1 font-black text-[10px] text-gray-400 uppercase tracking-widest">Gender</p>
                <p className="font-bold text-gray-800 text-lg">{pet.gender}</p>
              </div>
              <div className="bg-white shadow-sm p-5 border-2 border-gray-100 rounded-3xl text-center">
                <p className="mb-1 font-black text-[10px] text-gray-400 uppercase tracking-widest">Weight</p>
                <p className="font-bold text-gray-800 text-lg">{pet.weight}</p>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white shadow-sm p-8 border border-gray-100 rounded-[35px]">
              <h3 className="flex items-center gap-2 mb-4 font-bold text-gray-900 text-xl">
                <FaInfoCircle className="text-orange-500" /> Story of {pet.name}
              </h3>
              <p className="font-medium text-gray-600 italic leading-relaxed">
                {pet.description}
              </p>
            </div>

            {/* Contact & Adoption Section */}
            <div className="relative bg-orange-500 shadow-orange-200 shadow-xl p-8 rounded-[40px] overflow-hidden text-white">
              <div className="-right-10 -bottom-10 absolute bg-orange-400 opacity-50 rounded-full w-40 h-40"></div>

              <h3 className="z-10 relative mb-6 font-bold text-2xl">Ready to Adopt?</h3>

              <div className="z-10 relative flex sm:flex-row flex-col gap-4">
                <div className="flex flex-1 justify-center items-center gap-3 bg-white py-4 rounded-2xl font-black text-orange-600 text-sm uppercase tracking-wider cursor-pointer">
                  <FaPhoneAlt size={16} /> Contact Seller
                </div>
                <div className="flex flex-1 justify-center items-center gap-3 bg-orange-900/20 backdrop-blur-sm py-4 border-2 border-white/30 rounded-2xl font-black text-white text-sm uppercase tracking-wider cursor-pointer">
                  Adopt {pet.name}
                </div>
              </div>

              <div className="z-10 relative flex items-center gap-3 mt-6 font-medium text-orange-100 text-sm">
                <FaEnvelope />
                <span>Owner: {pet.owner.name} ({pet.owner.email})</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Petdetailscart;