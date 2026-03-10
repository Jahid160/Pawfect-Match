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
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Apply for Adoption",
      description: "Submit a simple adoption form with your details. Our team will review it safely.",
      icon: <FaFileAlt className="text-3xl" />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: 3,
      title: "Meet Your Friend",
      description: "Schedule a meet-and-greet session to build a connection with your future companion.",
      icon: <FaUserFriends className="text-3xl" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 4,
      title: "Bring Them Home",
      description: "Complete the final paperwork and welcome your new family member forever!",
      icon: <FaHome className="text-3xl" />,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="mx-auto px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-20 text-center animate-fade-in">
          <h2 className="mb-3 font-bold text-orange-500 text-xs uppercase tracking-[0.3em]">
            Simple Process
          </h2>
          <h3 className="font-black text-gray-900 text-4xl md:text-5xl leading-tight">
            How It <span className="font-extrabold text-orange-500 italic">Works</span>
          </h3>
          <div className="bg-orange-500 mx-auto mt-6 rounded-full w-20 h-1.5 animate-width-expand"></div>
        </div>

        {/* Steps Grid */}
        <div className="relative gap-10 lg:gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Animated Connecting Dots (Desktop Only) */}
          <div className="hidden lg:block top-12 left-[12%] absolute w-[76%] pointer-events-none">
             <div className="flex justify-between items-center w-full">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex flex-1 justify-center items-center">
                    <div className="bg-orange-100 w-full h-[2px] overflow-hidden">
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
              <div className={`relative z-10 w-24 h-24 ${step.color} rounded-[2rem] flex items-center justify-center mb-8 shadow-sm group-hover:shadow-2xl group-hover:rotate-6 group-hover:-translate-y-3 transition-all duration-500 border-4 border-white`}>
                <div className="group-hover:scale-110 transition-transform duration-300">
                   {step.icon}
                </div>
                
                {/* ID Badge with Pulse */}
                <div className="-top-3 -right-3 absolute flex justify-center items-center bg-slate-900 shadow-md rounded-2xl w-9 h-9 font-black text-white text-sm">
                  <span className="group-hover:animate-pulse">0{step.id}</span>
                </div>
              </div>

              {/* Text Content */}
              <div className="transition-transform group-hover:translate-y-[-5px] duration-300">
                <h4 className="mb-4 font-black text-slate-800 group-hover:text-orange-500 text-xl transition-colors">
                  {step.title}
                </h4>
                <p className="px-6 font-medium text-gray-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Mobile Separator Icon */}
              {index !== steps.length - 1 && (
                <div className="lg:hidden opacity-40 mt-8">
                   <FaArrowRight className="text-orange-400 text-xl rotate-90 animate-bounce" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* --- Button (CTA) --- */}
        <div className="mt-20 text-center animate-fade-in-up">
          <p className="mb-8 font-bold text-slate-400 text-sm italic uppercase tracking-widest">Ready to start your journey?</p>
          
          <Link 
            href="/all-pets" 
            className="group inline-flex relative items-center gap-4 bg-orange-500 hover:bg-slate-900 shadow-[0_20px_40px_-15px_rgba(249,115,22,0.4)] hover:shadow-2xl px-12 py-5 rounded-2xl overflow-hidden font-black text-white uppercase tracking-wider transition-all duration-500"
          >
            <span className="z-10 relative">Get Started Now</span>
            <FaArrowRight className="z-10 relative transition-transform group-hover:translate-x-2 duration-300" />
            
            <div className="top-0 -left-full group-hover:left-full absolute bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full transition-all duration-1000 ease-in-out"></div>
          </Link>
        </div>

      </div>

      <style jsx global>{`
        /* Custom Animations */
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

        .animate-fade-in { animation: slide-up 0.8s ease forwards; }
        .animate-fade-in-up { animation: slide-up 1s ease forwards; animation-delay: 1s; opacity: 0; }
      `}</style>
    </section>
  );
};

export default HowItWorks;