"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import { motion } from 'framer-motion';
import {
     FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaBuilding,
     FaCalendarAlt, FaPaw, FaUserAlt, FaEdit, FaCheckCircle,
     FaCamera
} from 'react-icons/fa';
import { getSingleShelter } from '@/action/server/Shelteruser';

import { Poppins } from "next/font/google";

const poppins = Poppins({
     subsets: ["latin"],
     weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});


const pets = [
     { id: 1, name: "Buddy", age: "2 Years", img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300" },
     { id: 2, name: "Luna", age: "5 Months", img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300" },
     { id: 3, name: "Max", age: "3 Years", img: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=300" },
];

const ShelterProfile = ({ email }) => {

     const [shelterData, setShelterData] = useState(null)
     console.log(shelterData)
     const [loading, setLoading] = useState(true);


     // const 
     useEffect(() => {
          if (!email) {
               return;
          }

          const SelterProfileReq = async () => {
               setLoading(true);
               const result = await getSingleShelter(email);

               if (result.success) {
                    setShelterData(result.data);
               } else {
                    console.error("Fetch Error:", result.error || result.message || "Unknown error");
               }
               setLoading(false);
          };

          SelterProfileReq();
     }, [email]);


     const fadeIn = {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 }
     };

     if (loading) return <Loading />

     return (


          <div className={`${poppins.className} min-h-screen bg-base-200 pb-12`}>

               {/* 1. Hero Section */}
               <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative h-80 w-full bg-base-300 overflow-hidden group"
               >
                    {/* Background Image */}
                    {shelterData.shelterPhoto ? (
                         <Image
                              src={shelterData.shelterPhoto}
                              alt="Shelter Cover"
                              fill
                              priority
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                         />
                    ) : (
                         <div className="absolute inset-0 bg-linear-to-r from-primary/80 to-primary" />
                    )}

                    {/* Dark Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40" />

                    {/* Edit Cover Photo Button (Facebook Style) */}
                    <div className="absolute top-4 right-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="flex items-center gap-2 bg-white/90 hover:bg-white text-black px-4 py-2 rounded-lg shadow-lg text-sm font-bold transition-all active:scale-95">
                              <FaCamera className="text-lg" />
                              <span>Upload Cover Photo</span>
                         </button>
                    </div>

                    {/* Shelter Name on Cover */}
                    {/* Shelter Name on Cover */}
                    <div className="container mx-auto h-full flex items-end pb-24 px-8 relative z-10">
                         <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent -z-10" />

                         <motion.h1
                              {...fadeIn}
                              className="text-5xl md:text-6xl font-extrabold text-white tracking-tight 
                   drop-shadow-[0_4px_12px_rgba(0,0,0,1)] selection:bg-primary"
                         >
                              {shelterData.shelterName}
                         </motion.h1>
                    </div>
               </motion.div>
               <div className="container mx-auto px-6 -mt-16 relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                         {/* 2. Profile Card Section (Left/Main) */}
                         <motion.div
                              {...fadeIn}
                              className="lg:col-span-2 bg-base-100 rounded-3xl shadow-xl p-8 border border-base-300"
                         >
                              <div className="flex flex-col md:flex-row gap-8 items-start">
                                   <div className="relative group">
                                        <Image
                                             src={shelterData.shelterPhoto}
                                             alt="Shelter Profile Picture"
                                             width={192}
                                             height={192}
                                             className="rounded-2xl object-cover ring-4 ring-base-100 shadow-lg"
                                             priority
                                        />
                                        <button className="absolute bottom-2 right-2 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                                             <FaEdit size={14} />
                                        </button>
                                   </div>

                                   <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-3">
                                             <span className="badge badge-success gap-2 py-3 px-4 text-white font-semibold uppercase tracking-wider text-xs">
                                                  <FaCheckCircle /> {shelterData.status}
                                             </span>
                                             <span className="badge badge-ghost py-3 px-4 border-base-300 font-medium uppercase text-xs">
                                                  {shelterData.shelterType}
                                             </span>
                                        </div>

                                        <h2 className="text-3xl font-bold flex items-center gap-2 text-base-content">
                                             <FaUserAlt className="text-primary text-xl" /> {shelterData.fullName}
                                        </h2>


                                        <p className="text-base-content/80 leading-relaxed font-normal">
                                             {shelterData.motivation}
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-base-200">
                                             <div className="flex items-center gap-2 text-sm font-medium">
                                                  <FaCalendarAlt className="text-primary" />
                                                  <span>Since: {shelterData.operatingSince}</span>
                                             </div>
                                             <div className="flex items-center gap-2 text-sm font-medium">
                                                  <FaBuilding className="text-primary" />
                                                  <span>Capacity: {shelterData.capacity} Animals</span>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </motion.div>

                         {/* 3. Stats & Contact Section (Right Side) */}
                         <div className="space-y-6">
                              {/* Stats Card */}
                              <motion.div
                                   whileHover={{ y: -5 }}
                                   className="bg-primary text-white p-8 rounded-3xl shadow-lg flex flex-col items-center justify-center text-center"
                              >
                                   <FaPaw className="text-5xl mb-4 opacity-40" />
                                   <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-6xl font-extrabold"
                                   >
                                        {shelterData.petCount}
                                   </motion.span>
                                   <p className="text-lg font-semibold mt-2 uppercase tracking-wide">Animals in Care</p>
                                   <progress
                                        className="progress progress-secondary w-full mt-4"
                                        value={shelterData.petCount}
                                        max={parseInt(shelterData.capacity) || 100}
                                   ></progress>
                                   <p className="text-xs mt-3 font-medium opacity-90">
                                        Space Utilization: {((shelterData.petCount / (parseInt(shelterData.capacity) || 1)) * 100).toFixed(1)}%
                                   </p>
                              </motion.div>

                              {/* Contact Card */}
                              <motion.div {...fadeIn} className="bg-base-100 p-6 rounded-3xl shadow-md border border-base-300">
                                   <h3 className="text-lg font-bold mb-4 border-b pb-2 border-base-200 uppercase tracking-tight">Contact Information</h3>
                                   <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                             <FaMapMarkerAlt className="mt-1 text-primary shrink-0" />
                                             <span className="text-sm font-medium">{shelterData.shelterAddress}, {shelterData.shelterCity}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                             <FaPhoneAlt className="text-primary shrink-0" />
                                             <span className="text-sm font-medium">{shelterData.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                             <FaEnvelope className="text-primary shrink-0" />
                                             <span className="text-sm font-medium">{shelterData.email}</span>
                                        </div>
                                   </div>
                              </motion.div>
                         </div>
                    </div>

                    {/* 4. Pet Listing Grid */}
                    <div className="mt-16">
                         <div className="flex justify-between items-center mb-8 border-b border-base-300 pb-4">
                              <h3 className="text-2xl font-extrabold tracking-tight">Animals Currently in Care</h3>
                              <button className="btn btn-primary btn-sm rounded-full px-6 font-bold uppercase text-xs">View All</button>
                         </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                              {pets.map((pet, index) => (
                                   <motion.div
                                        key={pet.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ y: -8 }}
                                        className="card bg-base-100 shadow-md hover:shadow-xl transition-all border border-base-300 overflow-hidden group"
                                   >
                                        <figure className="relative h-52 w-full overflow-hidden">
                                             <Image
                                                  src={pet.img}
                                                  alt={pet.name}
                                                  fill
                                                  sizes="(max-width: 768px) 100vw, 25vw"
                                                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                                             />
                                        </figure>
                                        <div className="card-body p-5 text-center">
                                             <h4 className="card-title justify-center text-primary font-bold tracking-tight">{pet.name}</h4>
                                             <p className="text-xs font-semibold text-base-content/60 uppercase tracking-widest">{pet.age}</p>
                                        </div>
                                   </motion.div>
                              ))}
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default ShelterProfile;