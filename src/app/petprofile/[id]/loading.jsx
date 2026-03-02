'use client';
import React from 'react';


const PetProfileSkeleton = () => {
     return (
          <div className="min-h-screen bg-base-100 font-['Quicksand'] antialiased">

               {/* 1. TOP NAVIGATION SKELETON */}
               <nav className="max-w-6xl mx-auto px-6 pt-8">
                    <div className="flex items-center gap-2 opacity-50">
                         <div className="p-2 rounded-full bg-base-300 w-9 h-9 animate-pulse" />
                         <div className="h-4 w-32 bg-base-300 rounded animate-pulse" />
                    </div>
               </nav>

               {/* 2. HEADER SECTION SKELETON */}
               <header className="max-w-6xl mx-auto px-6 pt-6 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-3">
                         <div className="h-4 w-40 bg-primary/20 rounded animate-pulse" />
                         <div className="h-12 w-64 bg-base-300 rounded-2xl animate-pulse" />
                         <div className="h-5 w-48 bg-base-200 rounded animate-pulse" />
                    </div>
                    <div className="flex gap-3">
                         <div className="w-12 h-12 rounded-full bg-base-200 animate-pulse" />
                         <div className="w-12 h-12 rounded-full bg-base-200 animate-pulse" />
                    </div>
               </header>

               <main className="max-w-6xl mx-auto px-6 pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                         {/* LEFT: GALLERY & HEALTH SKELETON */}
                         <div className="lg:col-span-7 space-y-12">

                              {/* Gallery Section */}
                              <section className="space-y-6">
                                   <div className="relative overflow-hidden rounded-[2.5rem] aspect-16/10 bg-base-200 animate-pulse shadow-sm" />
                                   <div className="grid grid-cols-4 gap-4">
                                        {[1, 2, 3, 4].map((i) => (
                                             <div key={i} className="rounded-2xl aspect-square bg-base-200 animate-pulse" />
                                        ))}
                                   </div>
                              </section>

                              {/* Health Journey Section */}
                              <section className="space-y-8">
                                   <div className="flex items-center justify-between">
                                        <div className="h-8 w-48 bg-base-200 rounded-lg animate-pulse" />
                                        <div className="h-3 w-32 bg-base-100 border border-base-200 rounded animate-pulse" />
                                   </div>

                                   <div className="space-y-6 relative">
                                        {[1, 2, 3].map((i) => (
                                             <div key={i} className="flex gap-4 items-start">
                                                  <div className="w-10 h-10 rounded-full bg-base-200 shrink-0 animate-pulse" />
                                                  <div className="flex-1 h-24 bg-white rounded-3xl border border-neutral/5 animate-pulse" />
                                             </div>
                                        ))}
                                   </div>
                              </section>
                         </div>

                         {/* RIGHT: INFO & CTA SKELETON */}
                         <div className="lg:col-span-5 space-y-8">

                              {/* Stats Grid */}
                              <div className="grid grid-cols-3 gap-4">
                                   {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="bg-white p-5 rounded-3xl h-24 border border-neutral/5 animate-pulse flex flex-col items-center justify-center gap-2">
                                             <div className="w-8 h-8 rounded-xl bg-base-100" />
                                             <div className="w-12 h-2 bg-base-100 rounded" />
                                        </div>
                                   ))}
                              </div>

                              {/* Story Card */}
                              <div className="rounded-4xl border border-neutral/5 bg-white overflow-hidden shadow-sm">
                                   <div className="bg-base-100/50 p-6 h-16 animate-pulse" />
                                   <div className="p-8 space-y-4">
                                        <div className="h-4 w-full bg-base-100 rounded animate-pulse" />
                                        <div className="h-4 w-full bg-base-100 rounded animate-pulse" />
                                        <div className="h-4 w-3/4 bg-base-100 rounded animate-pulse" />
                                        <div className="grid grid-cols-2 gap-4 pt-4">
                                             <div className="h-12 bg-base-100 rounded-2xl animate-pulse" />
                                             <div className="h-12 bg-base-100 rounded-2xl animate-pulse" />
                                        </div>
                                   </div>
                              </div>

                              {/* CTA Card */}
                              <div className="rounded-4xl bg-neutral/10 p-10 space-y-6 border border-dashed border-neutral/20 animate-pulse">
                                   <div className="h-6 w-3/4 bg-neutral/20 rounded mx-auto" />
                                   <div className="h-16 w-full bg-neutral/20 rounded-2xl" />
                                   <div className="h-3 w-24 bg-neutral/10 rounded mx-auto" />
                              </div>
                         </div>
                    </div>
               </main>
          </div>
     );
};

export default PetProfileSkeleton;