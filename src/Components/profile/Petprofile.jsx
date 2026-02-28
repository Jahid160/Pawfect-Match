'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import {
     Heart, MapPin, Smile, Syringe, Home, Scissors,
     Camera, Cpu, Venus, Dog, Clock, Palette, Scale, Ruler,
     Share2, ShieldCheck, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

const PetProfile = () => {
     const [activeImage, setActiveImage] = useState('https://i.ibb.co.com/xK0gRxNT/alvan-nee-8g0-D8-Zf-FXy-A-unsplash.jpg');

     const thumbnails = [
          { id: 1, src: 'https://i.ibb.co.com/xK0gRxNT/alvan-nee-8g0-D8-Zf-FXy-A-unsplash.jpg', alt: 'Magie Profile Close-up' },
          { id: 2, src: 'https://i.ibb.co.com/MkZm1hPy/alvan-nee-eoqnr8ikw-FE-unsplash.jpg', alt: 'Magie Standing' },
          { id: 3, src: 'https://i.ibb.co.com/tMNH2HMg/jamie-street-Mo-Dcn-VRN5-JU-unsplash.jpg', alt: 'Magie Running' },
          { id: 4, src: 'https://i.ibb.co.com/k6JDwg7b/karsten-winegeart-BJaq-Pa-H6-AGQ-unsplash.jpg', alt: 'Magie Profile' }
     ];

     const stats = [
          { label: 'Gender', value: 'Female', icon: <Venus className="w-5 h-5" /> },
          { label: 'Breed', value: 'Shiba Inu', icon: <Dog className="w-5 h-5" /> },
          { label: 'Age', value: '14 Month', icon: <Clock className="w-5 h-5" /> },
          { label: 'Color', value: 'Red', icon: <Palette className="w-5 h-5" /> },
          { label: 'Weight', value: '12 Lb', icon: <Scale className="w-5 h-5" /> },
          { label: 'Height', value: '91 Cm', icon: <Ruler className="w-5 h-5" /> },
     ];

     const traits = [
          { text: 'Child Friendly', icon: <Smile className="w-5 h-5" /> },
          { text: 'Fully Vaccinated', icon: <Syringe className="w-5 h-5" /> },
          { text: 'House Trained', icon: <Home className="w-5 h-5" /> },
          { text: 'Neutered', icon: <Scissors className="w-5 h-5" /> },
     ];

     return (
          <div className="min-h-screen bg-base-100 font-['Quicksand'] antialiased text-neutral">

               {/* 1. TOP NAVIGATION (Back Button & Breadcrumbs) */}
               <nav className="max-w-6xl mx-auto px-6 pt-8">
                    <Link
                         href="/"
                         className="group flex items-center gap-2 text-neutral/60 hover:text-primary transition-all duration-300 font-bold"
                    >
                         <div className="p-2 rounded-full bg-base-200 group-hover:bg-primary group-hover:text-white transition-all shadow-sm group-hover:shadow-md group-hover:-translate-x-1">
                              <ArrowLeft size={20} />
                         </div>
                         <span className="text-sm tracking-wide">Return to listings</span>
                    </Link>
               </nav>

               {/* 2. HEADER SECTION */}
               <header className="max-w-6xl mx-auto px-6 pt-6 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                         <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-2">
                              <ShieldCheck size={18} />
                              Verified Adoption Listing
                         </div>
                         <h1 className="text-5xl font-extrabold text-neutral tracking-tight">Magie</h1>
                         <div className="flex items-center gap-2 mt-2 text-neutral/60 font-medium">
                              <MapPin size={18} className="text-primary" />
                              <span>South Mumbai, Maharashtra</span>
                         </div>
                    </div>
                    <div className="flex gap-3">
                         <button className="btn btn-circle btn-outline border-neutral/10 hover:bg-base-200 hover:border-neutral/20 text-neutral shadow-sm">
                              <Share2 size={20} />
                         </button>
                         <button className="btn btn-circle btn-outline border-neutral/10 hover:bg-base-200 hover:border-neutral/20 text-neutral shadow-sm">
                              <Heart size={20} />
                         </button>
                    </div>
               </header>

               <main className="max-w-6xl mx-auto px-6 pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                         {/* LEFT: GALLERY & TABLE */}
                         <div className="lg:col-span-7 space-y-12">

                              {/* Gallery Section */}
                              <section className="space-y-6">
                                   <div className="relative overflow-hidden rounded-[2.5rem] aspect-16/10 bg-base-200 shadow-2xl border border-white/20">
                                        <Image
                                             fill
                                             src={activeImage}
                                             alt="Magie"
                                             className="object-cover"
                                             priority
                                        />
                                   </div>
                                   <div className="grid grid-cols-4 gap-4">
                                        {thumbnails.map((thumb) => (
                                             <button
                                                  key={thumb.id}
                                                  onClick={() => setActiveImage(thumb.src)}
                                                  className={`relative rounded-2xl overflow-hidden aspect-square border-4 transition-all duration-300 ${activeImage === thumb.src ? 'border-primary scale-95 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'
                                                       }`}
                                             >
                                                  <Image fill src={thumb.src} alt={thumb.alt} className="object-cover" />
                                             </button>
                                        ))}
                                   </div>
                              </section>

                              {/* Health Record Section */}
                              <section className="space-y-6">
                                   <div className="flex items-center gap-3">
                                        <div className="h-8 w-1.5 bg-primary rounded-full"></div>
                                        <h3 className="text-2xl font-bold italic">Health Record</h3>
                                   </div>
                                   <div className="overflow-hidden rounded-[2rem] border border-neutral/5 bg-base-100 shadow-xl">
                                        <table className="table w-full">
                                             <thead>
                                                  <tr className="bg-base-200/50 text-neutral/50 border-none uppercase text-[10px] tracking-widest font-black">
                                                       <th className="py-6 text-center">Developmental Stage</th>
                                                       <th className="text-center">8th Week</th>
                                                       <th className="text-center">14th Week</th>
                                                       <th className="text-center">22th Week</th>
                                                  </tr>
                                             </thead>
                                             <tbody className="text-neutral/80">
                                                  <tr className="border-none">
                                                       <td className="text-center font-bold text-neutral p-8 bg-base-200/20">Vaccinations</td>
                                                       <td className="text-center p-8 border-r border-base-200/50">
                                                            <p className="text-xs opacity-60">Bordetella</p>
                                                            <span className="badge badge-primary badge-sm font-bold my-2 py-3 px-4 uppercase text-[9px]">Confirmed</span>
                                                            <p className="text-xs opacity-60">Lepto</p>
                                                       </td>
                                                       <td className="text-center p-8 border-r border-base-200/50">
                                                            <p className="text-xs opacity-60 leading-tight">Bordetella,<br />Canine Influenza</p>
                                                            <span className="badge badge-primary badge-sm font-bold my-2 py-3 px-4 uppercase text-[9px]">Confirmed</span>
                                                            <p className="text-xs opacity-60">Lepto</p>
                                                       </td>
                                                       <td className="text-center p-8">
                                                            <p className="text-xs opacity-60 leading-tight">Bordetella,<br />Canine Influenza</p>
                                                            <span className="badge badge-primary badge-sm font-bold my-2 py-3 px-4 uppercase text-[9px]">Confirmed</span>
                                                            <p className="text-xs opacity-60">Lepto</p>
                                                       </td>
                                                  </tr>
                                             </tbody>
                                        </table>
                                   </div>
                              </section>
                         </div>

                         {/* RIGHT: INFO & CTA */}
                         <div className="lg:col-span-5 space-y-8">

                              {/* Stats Grid */}
                              <div className="grid grid-cols-3 gap-4">
                                   {stats.map((stat) => (
                                        <div key={stat.label} className="bg-white p-5 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm border border-neutral/5 hover:shadow-md transition-shadow">
                                             <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                                                  {stat.icon}
                                             </div>
                                             <span className="text-[10px] font-bold uppercase opacity-40 tracking-widest">{stat.label}</span>
                                             <span className="text-sm font-black text-neutral mt-1">{stat.value}</span>
                                        </div>
                                   ))}
                              </div>

                              {/* Story Card */}
                              <div className="rounded-[2rem] border border-neutral/5 bg-white overflow-hidden shadow-xl">
                                   <div className="bg-secondary/20 p-6 border-b border-secondary/20">
                                        <h2 className="text-xl font-black text-neutral flex items-center gap-2">
                                             <Dog size={24} className="text-primary" />
                                             About Magie
                                        </h2>
                                   </div>
                                   <div className="p-8 space-y-6">
                                        <p className="text-neutral/70 leading-relaxed font-medium">
                                             Magie is a vibrant and social Shiba Inu. Raised in a loving home environment, she is perfectly socialized with kids and other pets.
                                        </p>
                                        <div className="grid grid-cols-2 gap-4">
                                             {traits.map((trait, idx) => (
                                                  <div key={idx} className="flex items-center gap-3 p-3 bg-base-200/50 rounded-2xl">
                                                       <div className="text-primary">{trait.icon}</div>
                                                       <span className="text-xs font-bold text-neutral/80">{trait.text}</span>
                                                  </div>
                                             ))}
                                        </div>
                                   </div>
                              </div>

                              {/* Premium CTA Card */}
                              <div className="rounded-[2rem] bg-neutral p-10 text-center shadow-2xl relative overflow-hidden">
                                   <div className="absolute top-0 left-0 w-full h-1.5 bg-primary"></div>
                                   <div className="relative z-10 space-y-6">
                                        <h3 className="text-2xl font-bold text-white leading-tight">
                                             Interested in making <br /> Magie part of your family?
                                        </h3>
                                        <button className="btn btn-primary btn-lg w-full rounded-2xl text-white font-bold hover:scale-[1.02] transition-all shadow-lg border-none h-16 uppercase tracking-widest">
                                             Start Application
                                        </button>
                                        <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                                             <ShieldCheck size={12} />
                                             Safe & Secure Adoption
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </main>
          </div>
     );
};

export default PetProfile;