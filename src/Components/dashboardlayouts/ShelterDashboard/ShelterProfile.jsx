"use client";
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import {
     FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaBuilding,
     FaCalendarAlt, FaPaw, FaUserAlt, FaEdit, FaCheckCircle
} from 'react-icons/fa';

// Mock Data based on your requirements
const shelterData = {
     name: "Green Paws Shelter",
     owner: "Rafiqul Islam Rafi",
     photo: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=500",
     address: "12, Mirpur Road, Dhaka",
     city: "Dhaka",
     contact: { phone: "+880 1712-345678", email: "contact@greenpaws.org" },
     type: "NGO",
     capacity: 80,
     joined: "Jan 15, 2024",
     petCount: 7,
     status: "Approved",
     description: "আমাদের মূল লক্ষ্য হলো রাস্তার অবহেলিত পশুদের নিরাপদ আশ্রয় দেওয়া। গত ২ বছরে আমরা প্রায় ১০০+ প্রাণীকে উদ্ধার করেছি এবং তাদের সঠিক চিকিৎসার ব্যবস্থা করেছি। আমাদের টিমে অভিজ্ঞ ভলান্টিয়ার রয়েছে যারা দিনরাত পশুদের সেবায় নিয়োজিত।"
};

const pets = [
     { id: 1, name: "Buddy", age: "2 Years", img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300" },
     { id: 2, name: "Luna", age: "5 Months", img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300" },
     { id: 3, name: "Max", age: "3 Years", img: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=300" },
];

const ShelterProfile = () => {
     const fadeIn = {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 }
     };

     return (
          <div className="min-h-screen bg-base-200 pb-12 font-sans">

               {/* 1. Hero Section */}
               <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative h-64 w-full bg-linear-to-r from-[oklch(70%_0.19_45)] to-[oklch(60%_0.15_40)] overflow-hidden"
               >
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="container mx-auto h-full flex items-end pb-8 px-6">
                         <motion.h1 {...fadeIn} className="text-4xl font-bold text-white z-10">
                              {shelterData.name}
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
                                             src={shelterData.photo}
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
                                             <span className="badge badge-success gap-2 py-3 px-4 text-white font-medium">
                                                  <FaCheckCircle /> {shelterData.status}
                                             </span>
                                             <span className="badge badge-ghost py-3 px-4 border-base-300">{shelterData.type}</span>
                                        </div>

                                        <h2 className="text-2xl font-bold flex items-center gap-2">
                                             <FaUserAlt className="text-primary text-xl" /> {shelterData.owner}
                                        </h2>

                                        <p className="text-base-content/70 leading-relaxed italic">
                                             {shelterData.description}
                                        </p>

                                        <div className="grid grid-cols-2 gap-4 pt-4">
                                             <div className="flex items-center gap-2 text-sm">
                                                  <FaCalendarAlt className="text-primary" />
                                                  <span>স্থাপিত: {shelterData.joined}</span>
                                             </div>
                                             <div className="flex items-center gap-2 text-sm">
                                                  <FaBuilding className="text-primary" />
                                                  <span>ধারণক্ষমতা: {shelterData.capacity} প্রাণি</span>
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
                                   <FaPaw className="text-5xl mb-4 opacity-50" />
                                   <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-5xl font-black"
                                   >
                                        {shelterData.petCount}
                                   </motion.span>
                                   <p className="text-lg font-medium mt-2">বর্তমানে আশ্রিত পশু</p>
                                   <progress className="progress progress-secondary w-full mt-4" value={shelterData.petCount} max={shelterData.capacity}></progress>
                                   <p className="text-xs mt-2 opacity-80">ধারণক্ষমতার {(shelterData.petCount / shelterData.capacity * 100).toFixed(1)}% ব্যবহৃত</p>
                              </motion.div>

                              {/* Contact Card */}
                              <motion.div {...fadeIn} className="bg-base-100 p-6 rounded-3xl shadow-md border border-base-300">
                                   <h3 className="text-lg font-bold mb-4 border-b pb-2 border-base-200">যোগাযোগ</h3>
                                   <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                             <FaMapMarkerAlt className="mt-1 text-primary" />
                                             <span className="text-sm">{shelterData.address}, {shelterData.city}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                             <FaPhoneAlt className="text-primary" />
                                             <span className="text-sm">{shelterData.contact.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                             <FaEnvelope className="text-primary" />
                                             <span className="text-sm">{shelterData.contact.email}</span>
                                        </div>
                                   </div>
                              </motion.div>
                         </div>
                    </div>

                    {/* 4. Pet Listing Grid */}
                    <div className="mt-12">
                         <div className="flex justify-between items-center mb-8">
                              <h3 className="text-2xl font-bold">আশ্রিত প্রাণিসমূহ</h3>
                              <button className="btn btn-outline btn-primary btn-sm">সবগুলো দেখুন</button>
                         </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                              {pets.map((pet, index) => (
                                   <motion.div
                                        key={pet.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -10 }}
                                        className="card bg-base-100 shadow-md hover:shadow-2xl transition-all border border-base-300 overflow-hidden"
                                   >
                                        <figure className="relative h-48 w-full overflow-hidden">
                                             <Image
                                                  src={pet.img}
                                                  alt={pet.name}
                                                  fill
                                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                                             />
                                        </figure>
                                        <div className="card-body p-4 text-center">
                                             <h4 className="card-title justify-center text-primary font-bold">{pet.name}</h4>
                                             <p className="text-sm text-base-content/60">{pet.age}</p>
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