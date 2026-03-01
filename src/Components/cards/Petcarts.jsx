"use client";

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { FaHeart, FaMapMarkerAlt, FaPaw, FaLongArrowAltRight, FaVenusMars } from 'react-icons/fa';

// --- PetCard Component ---
const PetCard = ({ pet }) => {
  return (
    <div className="group relative flex flex-col bg-white shadow-md hover:shadow-2xl border border-gray-100 rounded-3xl overflow-hidden transition-all hover:-translate-y-2 duration-500 cursor-pointer">
      {/* Image Section */}
      <div className="relative w-full h-72 overflow-hidden">
        <Image
          src={pet.image}
          alt={pet.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Soft Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Category Badge */}
        <div className="top-4 left-4 absolute flex items-center gap-2 bg-white/90 shadow-sm backdrop-blur-md px-4 py-1.5 rounded-full font-bold text-[10px] text-orange-600 uppercase tracking-wider">
          <FaPaw size={12} />
          {pet.category}
        </div>

        {/* Wishlist Icon */}
        <button className="top-4 right-4 z-10 absolute bg-white/80 hover:bg-white shadow-md backdrop-blur-md p-2.5 rounded-full text-gray-400 hover:text-red-500 active:scale-95 transition-all">
          <FaHeart size={18} />
        </button>

        {/* Gender Tag */}
        <div className="bottom-4 left-4 absolute flex items-center gap-1.5 bg-orange-500 shadow-lg px-3 py-1 rounded-lg font-bold text-white text-xs">
          <FaVenusMars size={12} />
          {pet.gender}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-gray-800 group-hover:text-orange-600 text-2xl transition-colors">
              {pet.name}
            </h3>
            <p className="font-medium text-gray-400 text-sm italic">{pet.breed}</p>
          </div>
          <div className="bg-green-100 px-2.5 py-1 rounded-md font-bold text-[10px] text-green-600 uppercase">
            Available
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 border border-gray-100 rounded-full text-xs">
            <span className="font-medium text-gray-400 uppercase">Age:</span>
            <span className="font-bold text-gray-700">{pet.age}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <FaMapMarkerAlt className="text-orange-400" />
            <span className="font-semibold">{pet.location}</span>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex justify-between items-center mt-auto pt-5 border-gray-100 border-t">
          <Link href={`/pet-details/${pet.id}`} className="font-black text-[11px] text-gray-400 group-hover:text-orange-600 uppercase tracking-[2px] transition-all">
            Meet {pet.name}
          </Link>
          <Link
            href={`/pet-details/${pet.id}`}
            className="flex justify-center items-center bg-gray-100 group-hover:bg-orange-500 rounded-xl w-10 h-10 text-gray-400 group-hover:text-white transition-all group-hover:translate-x-1 duration-300"
          >
            <FaLongArrowAltRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- Main Petcarts Component ---
const Petcarts = () => {
  const pets = [
    { id: 1, name: "Buddy", age: "2 Mo", location: "Dhaka", breed: "Golden Retriever", gender: "Male", category: "Dog", image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=500" },
    { id: 2, name: "Luna", age: "3 Mo", location: "Sylhet", breed: "Persian", gender: "Female", category: "Cat", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=500" },
    { id: 3, name: "Max", age: "1 Mo", location: "Chittagong", breed: "Shepherd", gender: "Male", category: "Dog", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=500" },
    { id: 4, name: "Snowy", age: "4 Mo", location: "Khulna", breed: "Angora", gender: "Female", category: "Rabbit", image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=500" },
    { id: 5, name: "Charlie", age: "5 Mo", location: "Rajshahi", breed: "Beagle", gender: "Male", category: "Dog", image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=500" },
    { id: 6, name: "Bella", age: "2 Mo", location: "Barishal", breed: "Siamese", gender: "Female", category: "Cat", image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=500" },
    { id: 7, name: "Rocky", age: "6 Mo", location: "Comilla", breed: "Bulldog", gender: "Male", category: "Dog", image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=500" },
    { id: 8, name: "Mimi", age: "3 Mo", location: "Rangpur", breed: "Parrot", gender: "Female", category: "Bird", image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?q=80&w=500" },
  ];

  return (
    <div className="bg-gray-50 px-4 sm:px-8 py-24 min-h-screen">
      {/* Header Container */}
      <div className="flex md:flex-row flex-col justify-between items-start md:items-end gap-8 mx-auto mb-20 max-w-7xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-orange-100 mb-4 px-4 py-2 rounded-full font-bold text-orange-600 text-xs uppercase tracking-widest">
            <span className="bg-orange-500 rounded-full w-2 h-2 animate-pulse"></span>
            Waiting for Home
          </div>
          <h2 className="font-extrabold text-gray-900 text-5xl lg:text-7xl leading-[1] tracking-tighter">
            Adopt a <span className="inline-block relative">
              Friend
              <svg className="-bottom-2 left-0 -z-10 absolute w-full h-4 text-orange-300" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0,10 Q50,0 100,10" stroke="currentColor" strokeWidth="6" fill="none" />
              </svg>
            </span>
          </h2>
        </div>

        {/* Top Right Section with Button & Text */}
        <div className="flex flex-col items-start md:items-end gap-6 max-w-md">
          <Link 
            href="/all-pets" 
            className="group flex items-center gap-3 bg-white hover:bg-orange-500 shadow-[5px_5px_0px_0px_rgba(249,115,22,1)] hover:shadow-none px-8 py-3.5 border-2 border-orange-500 rounded-2xl font-black text-orange-600 hover:text-white text-sm uppercase tracking-widest transition-all hover:translate-x-[3px] hover:translate-y-[3px] duration-300"
          >
            View All Pets
            <FaLongArrowAltRight className="transition-transform group-hover:translate-x-2 duration-300" size={20} />
          </Link>
          <p className="text-gray-500 text-lg text-start md:text-end italic leading-relaxed">
            "Every paw leaves a footprint in our hearts. Browse our gallery of loving pets waiting for you."
          </p>
        </div>
      </div>

      {/* Grid Section */}
      <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-7xl">
        {pets.map(pet => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default Petcarts;