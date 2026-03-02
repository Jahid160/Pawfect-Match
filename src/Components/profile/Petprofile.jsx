'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import {
     Heart, MapPin, Smile, Syringe, Home, Scissors,
     Venus, Dog, Clock, Palette, Scale, Ruler,
     Share2, ShieldCheck, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

const PetProfile = ({ pet }) => {
     // Fallback to primary image if no gallery exists, or use the first gallery image
     const [activeImage, setActiveImage] = useState(pet?.images?.primary || '');

     if (!pet) return <div className="p-10 text-center">Loading pet details...</div>;

     // Mapping Icons to labels dynamically from quick_stats
     const getStatIcon = (type) => {
          switch (type) {
               case 'gender': return <Venus className="w-5 h-5" />;
               case 'breed': return <Dog className="w-5 h-5" />;
               case 'age': return <Clock className="w-5 h-5" />;
               case 'color': return <Palette className="w-5 h-5" />;
               case 'weight': return <Scale className="w-5 h-5" />;
               case 'height': return <Ruler className="w-5 h-5" />;
               default: return <Dog className="w-5 h-5" />;
          }
     };

     // Mapping Icons for traits
     const getTraitIcon = (type) => {
          switch (type) {
               case 'smile': return <Smile className="w-5 h-5" />;
               case 'syringe': return <Syringe className="w-5 h-5" />;
               default: return <Heart className="w-5 h-5" />;
          }
     };

     return (
          <div className="min-h-screen bg-base-100 font-['Quicksand'] antialiased text-neutral">

               {/* 1. TOP NAVIGATION */}
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
                         {pet.verified && (
                              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-2">
                                   <ShieldCheck size={18} />
                                   Verified Adoption Listing
                              </div>
                         )}
                         <h1 className="text-5xl font-extrabold text-neutral tracking-tight">{pet.name}</h1>
                         <div className="flex items-center gap-2 mt-2 text-neutral/60 font-medium">
                              <MapPin size={18} className="text-primary" />
                              <span>{pet.location}</span>
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

                         {/* LEFT: GALLERY & HEALTH */}
                         <div className="lg:col-span-7 space-y-12">

                              {/* Gallery Section */}
                              <section className="space-y-6">
                                   <div className="relative overflow-hidden rounded-[2.5rem] aspect-16/10 bg-base-200 shadow-2xl border border-white/20">
                                        <Image
                                             fill
                                             src={activeImage}
                                             alt={pet.name}
                                             className="object-cover"
                                             priority
                                        />
                                   </div>
                                   <div className="grid grid-cols-4 gap-4">
                                        {pet.images.gallery.map((thumb, idx) => (
                                             <button
                                                  key={idx}
                                                  onClick={() => setActiveImage(thumb.url)}
                                                  className={`relative rounded-2xl overflow-hidden aspect-square border-4 transition-all duration-300 ${activeImage === thumb.url ? 'border-primary scale-95 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                             >
                                                  <Image
                                                       fill
                                                       src={thumb.url}
                                                       alt={thumb.alt || `${pet.name} gallery image`}
                                                       className="object-cover"
                                                  />
                                             </button>
                                        ))}
                                   </div>
                              </section>

                              {/* Health Record Section - Enhanced Timeline Version */}
                              <section className="space-y-8">
                                   <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                             <div className="h-8 w-1.5 bg-primary rounded-full"></div>
                                             <h3 className="text-2xl font-bold italic">Health Journey</h3>
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-neutral/40">
                                             Last Updated: {new Date().toLocaleDateString()}
                                        </span>
                                   </div>

                                   <div className="relative space-y-4 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-primary before:via-base-300 before:to-transparent">
                                        {pet.health_records.milestones.map((milestone, idx) => {
                                             const record = pet.health_records.details.find((d) => d.week === milestone);
                                             const isCompleted = !!record;

                                             return (
                                                  <div key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${isCompleted ? 'is-completed' : 'opacity-60'}`}>
                                                       {/* Icon/Dot */}
                                                       <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-base-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-300 ${isCompleted ? 'bg-primary text-white' : 'bg-base-200 text-neutral/30'}`}>
                                                            {isCompleted ? <ShieldCheck size={16} /> : <div className="w-2 h-2 rounded-full bg-current" />}
                                                       </div>

                                                       {/* Content Card */}
                                                       <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-4xl shadow-sm border border-neutral/5 hover:shadow-md transition-all">
                                                            <div className="flex items-center justify-between mb-2">
                                                                 <time className="font-black text-primary text-sm uppercase tracking-tighter">
                                                                      {milestone}
                                                                 </time>
                                                                 {isCompleted ? (
                                                                      <span className="badge badge-success badge-sm gap-1 text-[9px] font-bold text-white uppercase">
                                                                           Verified
                                                                      </span>
                                                                 ) : (
                                                                      <span className="badge badge-ghost badge-sm text-[9px] font-bold uppercase">
                                                                           Upcoming
                                                                      </span>
                                                                 )}
                                                            </div>

                                                            <div className="text-neutral/80 font-medium">
                                                                 {isCompleted ? (
                                                                      <div className="flex flex-wrap gap-2">
                                                                           {record.vaccines.map((v) => (
                                                                                <span key={v} className="px-3 py-1 bg-base-200 rounded-full text-[11px] font-bold">
                                                                                     {v}
                                                                                </span>
                                                                           ))}
                                                                      </div>
                                                                 ) : (
                                                                      <p className="text-xs italic opacity-50">Scheduled checkup and booster</p>
                                                                 )}
                                                            </div>
                                                       </div>
                                                  </div>
                                             );
                                        })}
                                   </div>
                              </section>
                         </div>

                         {/* RIGHT: INFO & CTA */}
                         <div className="lg:col-span-5 space-y-8">

                              {/* Stats Grid */}
                              <div className="grid grid-cols-3 gap-4">
                                   {pet.quick_stats.map((stat) => (
                                        <div key={stat.label} className="bg-white p-5 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm border border-neutral/5 hover:shadow-md transition-shadow">
                                             <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                                                  {getStatIcon(stat.type)}
                                             </div>
                                             <span className="text-[10px] font-bold uppercase opacity-40 tracking-widest">{stat.label}</span>
                                             <span className="text-sm font-black text-neutral mt-1">{stat.value}</span>
                                        </div>
                                   ))}
                              </div>

                              {/* Story Card */}
                              <div className="rounded-4xl border border-neutral/5 bg-white overflow-hidden shadow-xl">
                                   <div className="bg-secondary/20 p-6 border-b border-secondary/20">
                                        <h2 className="text-xl font-black text-neutral flex items-center gap-2">
                                             <Dog size={24} className="text-primary" />
                                             About {pet.name}
                                        </h2>
                                   </div>
                                   <div className="p-8 space-y-6">
                                        <p className="text-neutral/70 leading-relaxed font-medium">
                                             {pet.description}
                                        </p>
                                        <div className="grid grid-cols-2 gap-4">
                                             {pet.traits.map((trait, idx) => (
                                                  <div key={idx} className="flex items-center gap-3 p-3 bg-base-200/50 rounded-2xl">
                                                       <div className="text-primary">{getTraitIcon(trait.type)}</div>
                                                       <span className="text-xs font-bold text-neutral/80">{trait.label}</span>
                                                  </div>
                                             ))}
                                        </div>
                                   </div>
                              </div>

                              {/* Premium CTA Card */}
                              <div className="rounded-4xl bg-neutral p-10 text-center shadow-2xl relative overflow-hidden">
                                   <div className="absolute top-0 left-0 w-full h-1.5 bg-primary"></div>
                                   <div className="relative z-10 space-y-6">
                                        <h3 className="text-2xl font-bold text-white leading-tight">
                                             Interested in making <br /> {pet.name} part of your family?
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