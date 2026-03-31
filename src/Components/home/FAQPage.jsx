"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestionCircle, FaDog, FaShieldAlt, FaHandHoldingHeart, FaPlus, FaMinus, FaSearch } from 'react-icons/fa';

const faqs = [
  {
    category: "Adoption Process",
    icon: <FaHandHoldingHeart />,
    cardBg: "bg-secondary/20",
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
    cardBg: "bg-info/10",
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
    cardBg: "bg-success/10",
    iconColor: "text-success",
    questions: [
      { q: "What kind of food to give?", a: "We follow fresh, whole food philosophy. We provide a 7-day starter pack and a diet plan." },
      { q: "Can I change diet immediately?", a: "We recommend a gradual transition over 10 days to avoid stomach upset." }
    ]
  }
];

const FAQPage = () => {
  const [activeId, setActiveId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="bg-base-100 selection:bg-primary/20 py-32 min-h-screen overflow-hidden">
      <div className="mx-auto px-6 max-w-7xl">

        {/* Header & Search */}
        <div className="flex lg:flex-row flex-col justify-between items-start gap-12 mb-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 bg-primary/10 mb-8 px-5 py-2.5 rounded-full font-black text-[10px] text-primary tracking-[0.2em]"
            >
              <FaQuestionCircle /> HELP CENTER
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 font-black text-neutral text-5xl md:text-7xl leading-[0.95] tracking-tighter"
            >
              Got questions? <br />
              <span className="text-primary italic">We have answers.</span>
            </motion.h2>

            <p className="max-w-xl font-medium text-neutral/60 text-xl leading-relaxed">
              Adopting a pet is a big decision. We've laid out everything you need to know to make the transition smooth.
            </p>
          </div>
        </div>

        {/* FAQ Categories & Accordions */}
        <div className="gap-12 grid grid-cols-1 lg:grid-cols-3">
          {faqs.map((group, groupIdx) => (
            <div key={groupIdx} className="flex flex-col">
              <div className={`flex items-center gap-5 mb-10 p-6 rounded-[2.5rem] ${group.cardBg}`}>
                <span className={`bg-base-100 shadow-xl p-4 rounded-2xl text-3xl ${group.iconColor}`}>
                  {group.icon}
                </span>
                <h3 className="font-black text-neutral/90 text-xl uppercase tracking-tighter">
                  {group.category}
                </h3>
              </div>

              <div className="space-y-4">
                {group.questions.map((item, i) => {
                  const id = `${groupIdx}-${i}`;
                  const isOpen = activeId === id;

                  return (
                    <div key={i} className={`group border-b border-neutral/5 transition-all ${isOpen ? 'pb-6' : 'pb-4'}`}>
                      <button
                        onClick={() => toggleAccordion(id)}
                        className="flex justify-between items-center gap-4 w-full text-left"
                      >
                        <h4 className={`font-black text-lg tracking-tight transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-neutral group-hover:text-primary'}`}>
                          {item.q}
                        </h4>
                        <span className={`p-2 rounded-full transition-transform duration-500 ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-neutral/5 text-neutral'}`}>
                          {isOpen ? <FaMinus size={10} /> : <FaPlus size={10} />}
                        </span>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="mt-4 font-medium text-neutral/50 text-base leading-relaxed">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative bg-neutral mt-40 p-12 md:p-24 rounded-[4rem] overflow-hidden"
        >
          {/* Animated Glow */}
          <div className="top-0 right-0 absolute bg-primary/20 group-hover:bg-primary/30 blur-[120px] rounded-full w-[500px] h-[500px] transition-colors -translate-y-1/2 translate-x-1/2 duration-700" />

          <div className="z-10 relative flex lg:flex-row flex-col justify-between items-center gap-16">
            <div className="lg:text-left text-center">
              <h3 className="mb-6 font-black text-white text-5xl md:text-7xl leading-none tracking-tighter">Still curious?</h3>
              <p className="max-w-md font-medium text-neutral-content/60 text-xl leading-relaxed">
                Our pet experts are available to guide you through your adoption journey.
              </p>
            </div>
            <div className="flex sm:flex-row flex-col gap-4">
              <button onClick={() => window.location.href = "/contact"} className="bg-white/5 hover:bg-white/10 px-10 border border-white/10 rounded-[2rem] h-20 font-black text-white active:scale-95 transition-all">
                EMAIL SUPPORT
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQPage;