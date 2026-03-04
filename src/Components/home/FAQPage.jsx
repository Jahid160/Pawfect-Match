"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaQuestionCircle, FaDog, FaShieldAlt, FaHandHoldingHeart } from 'react-icons/fa';

const faqs = [
  {
    category: "Adoption Process",
    icon: <FaHandHoldingHeart />,
    // DaisyUI secondary color (Peach/Cream) compatible
    cardBg: "bg-secondary/30", 
    iconColor: "text-primary",
    questions: [
      { q: "How does the matching process work?", a: "We use a personality-driven algorithm that considers your lifestyle, activity level, and home environment." },
      { q: "What documents do I need?", a: "You'll need a valid ID, proof of address, and a completed adoption application." },
      { q: "How long does it take?", a: "Usually, it takes 3-7 business days. This includes review, interview, and meet-and-greet." }
    ]
  },
  {
    category: "Health & Safety",
    icon: <FaShieldAlt />,
    cardBg: "bg-info/10", // Using DaisyUI info color
    iconColor: "text-info",
    questions: [
      { q: "Vaccinated & Microchipped?", a: "Yes, 100%. Every pet is fully vaccinated, dewormed, and microchipped before listing." },
      { q: "Do you provide medical history?", a: "Absolutely. You will receive a folder containing vet logs, surgeries, and vaccination dates." },
      { q: "Post-adoption support?", a: "We provide a 30-day health support window with partner clinics for pre-existing conditions." }
    ]
  },
  {
    category: "Pet Care & Food",
    icon: <FaDog />,
    cardBg: "bg-success/10", // Using DaisyUI success color
    iconColor: "text-success",
    questions: [
      { q: "What kind of food to give?", a: "We follow fresh, whole food philosophy. We provide a 7-day starter pack and a diet plan." },
      { q: "Can I change diet immediately?", a: "We recommend a gradual transition over 10 days to avoid stomach upset." }
    ]
  }
];

const FAQPage = () => {
  return (
    <section className="bg-base-100 py-24 min-h-screen">
      <div className="mx-auto px-6 max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-20 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 mb-6 px-4 py-2 rounded-full font-bold text-primary text-sm"
          >
            <FaQuestionCircle /> HELP CENTER
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 font-extrabold text-neutral text-5xl md:text-6xl tracking-tight"
          >
            Got questions? <br />
            <span className="text-primary italic">We have answers.</span>
          </motion.h2>

          <p className="font-medium text-neutral/70 text-xl leading-relaxed">
            Adopting a pet is a big decision. We've laid out everything you need to know to make the transition smooth for you and your future furry friend.
          </p>
        </div>

        {/* FAQ Grid Layout */}
        <div className="gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {faqs.map((group, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col"
            >
              {/* Category Title Header */}
              <div className={`flex items-center gap-4 mb-8 p-5 rounded-[2rem] ${group.cardBg}`}>
                <span className={`bg-base-100 shadow-sm p-3 rounded-2xl text-2xl ${group.iconColor}`}>
                    {group.icon}
                </span>
                <h3 className={`font-black text-lg uppercase tracking-wider text-neutral/90`}>
                  {group.category}
                </h3>
              </div>

              {/* Questions List */}
              <div className="space-y-8 pl-2">
                {group.questions.map((item, i) => (
                  <div key={i} className="group">
                    <h4 className="mb-3 font-bold text-neutral group-hover:text-primary text-lg transition-colors duration-300">
                      {item.q}
                    </h4>
                    <p className="font-medium text-neutral/60 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA Card - Matches Neutral Charcoal from your CSS */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-neutral mt-32 p-10 md:p-16 rounded-[3.5rem] overflow-hidden text-neutral-content"
        >
          {/* Subtle Glow using Primary Color */}
          <div className="top-0 right-0 absolute bg-primary/20 blur-[120px] rounded-full w-80 h-80 -translate-y-1/2 translate-x-1/2" />
          
          <div className="z-10 relative flex md:flex-row flex-col justify-between items-center gap-10">
            <div className="md:text-left text-center">
              <h3 className="mb-4 font-black text-3xl md:text-5xl tracking-tight">Still curious?</h3>
              <p className="max-w-md font-medium text-neutral-content/70 text-lg">
                Our pet experts are available 24/7 to guide you through your adoption journey.
              </p>
            </div>
            <button className="shadow-2xl shadow-primary/30 px-12 rounded-2xl h-16 font-black hover:scale-105 transition-transform btn btn-primary btn-lg">
              CHAT WITH AN EXPERT
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQPage;