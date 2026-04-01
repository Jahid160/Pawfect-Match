"use client";

import Link from 'next/link';
import React from 'react';
import { FaSearch, FaFileAlt, FaUserFriends, FaHome, FaArrowRight } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Find Your Match",
      description: "Browse through our gallery of adorable pets and use filters to find the one that fits.",
      icon: <FaSearch className="text-3xl" />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: 2,
      title: "Apply for Adoption",
      description: "Submit a simple adoption form with your details. Our team will review it safely.",
      icon: <FaFileAlt className="text-3xl" />,
      color: "bg-orange-50 text-orange-600",
    },
    {
      id: 3,
      title: "Meet Your Friend",
      description: "Schedule a meet-and-greet session to build a connection with your future companion.",
      icon: <FaUserFriends className="text-3xl" />,
      color: "bg-purple-50 text-purple-600",
    },
    {
      id: 4,
      title: "Bring Them Home",
      description: "Complete the final paperwork and welcome your new family member forever!",
      icon: <FaHome className="text-3xl" />,
      color: "bg-green-50 text-green-600",
    },
  ];

  return (
    <section className="relative bg-white py-20 overflow-hidden">
      <div className="z-10 relative mx-auto px-6 lg:px-8 max-w-7xl">
        
        {/* --- SECTION HEADER --- */}
        <div className="mb-24 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-50 mb-6 px-4 py-2 border border-orange-100 rounded-full font-black text-[10px] text-orange-600 uppercase tracking-[0.3em]">
            Simple Process
          </div>
          
          <h2 className="font-black text-slate-900 text-5xl md:text-7xl leading-[0.95] tracking-[-0.04em]">
            How It <span className="font-black text-orange-500">Works</span>
          </h2>
          
          <div className="bg-orange-500 mx-auto mt-8 rounded-full w-20 h-1.5 animate-width-expand"></div>
        </div>

        {/* --- STEPS GRID --- */}
        <div className="relative gap-12 lg:gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Animated Connecting Dots (Desktop Only) */}
          <div className="hidden lg:block top-12 left-[12%] absolute w-[76%] pointer-events-none">
             <div className="flex justify-between items-center w-full">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex flex-1 justify-center items-center px-4">
                    <div className="bg-orange-100 opacity-50 w-full h-[2px] overflow-hidden">
                      <div className="bg-orange-400 w-1/2 h-full animate-progress-flow"></div>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`group relative flex flex-col items-center text-center animate-slide-up`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              
              {/* Icon Container */}
              <div className={`relative z-10 w-24 h-24 ${step.color} rounded-[2.5rem] flex items-center justify-center mb-8 shadow-sm group-hover:shadow-2xl group-hover:shadow-orange-100 group-hover:rotate-6 group-hover:-translate-y-2 transition-all duration-500 border-4 border-white`}>
                <div className="group-hover:scale-110 transition-transform duration-300">
                   {step.icon}
                </div>
                
                {/* ID Badge */}
                <div className="-top-2 -right-2 absolute flex justify-center items-center bg-slate-900 shadow-lg rounded-2xl w-10 h-10 font-black text-white text-xs">
                  <span>0{step.id}</span>
                </div>
              </div>

              {/* Text Content */}
              <div className="px-4">
                <h4 className="mb-3 font-black text-slate-900 group-hover:text-orange-500 text-2xl tracking-tight transition-colors duration-300">
                  {step.title}
                </h4>
                <p className="font-medium text-slate-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Mobile Arrow */}
              {index !== steps.length - 1 && (
                <div className="lg:hidden opacity-30 mt-10">
                   <FaArrowRight className="text-orange-400 text-xl rotate-90 animate-bounce" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* --- CTA BUTTON --- */}
        <div className="mt-24 text-center">
          <p className="mb-8 font-black text-[10px] text-slate-400 uppercase tracking-[0.3em]">Ready to start your journey?</p>
          
          <Link 
            href="/all-pets" 
            className="group inline-flex relative flex items-center gap-4 bg-slate-900 hover:bg-orange-600 shadow-slate-100 shadow-xl px-12 py-5 rounded-2xl overflow-hidden font-black text-[11px] text-white uppercase tracking-[0.2em] transition-all hover:-translate-y-1 duration-500 transform"
          >
            <span className="z-10 relative">Get Started Now</span>
            <FaArrowRight className="z-10 relative transition-transform group-hover:translate-x-2 duration-300" />
            
            <div className="top-0 -left-full group-hover:left-full absolute bg-gradient-to-r from-transparent via-white/10 to-transparent w-full h-full transition-all duration-1000 ease-in-out"></div>
          </Link>
        </div>

      </div>

      <style jsx global>{`
        @keyframes progress-flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-progress-flow {
          animation: progress-flow 3s linear infinite;
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease forwards;
        }

        @keyframes width-expand {
          from { width: 0; }
          to { width: 5rem; }
        }
        .animate-width-expand {
          animation: width-expand 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;