"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaQuestionCircle, FaDog, FaShieldAlt, FaHandHoldingHeart } from 'react-icons/fa';

const faqs = [
  {
    category: "Adoption Process",
    icon: <FaHandHoldingHeart />,
    questions: [
      { q: "How does the PawFact matching process work?", a: "We use a personality-driven algorithm that considers your lifestyle, activity level, and home environment to match you with a pet that shares your energy." },
      { q: "What documents do I need for adoption?", a: "You'll need a valid ID, proof of address, and a completed adoption application. If you rent, we may ask for a landlord's 'No-Objection' certificate." },
      { q: "How long does the entire process take?", a: "Usually, it takes 3-7 business days. This includes application review, a brief interview, and the final meet-and-greet." }
    ]
  },
  {
    category: "Pet Health & Safety",
    icon: <FaShieldAlt />,
    questions: [
      { q: "Are all pets vaccinated and microchipped?", a: "Yes, 100%. Every pet on PawFact Match is fully vaccinated, dewormed, and microchipped before they are listed for adoption." },
      { q: "Do you provide medical history?", a: "Absolutely. You will receive a complete medical folder containing vet visit logs, surgery history (if any), and vaccination dates." },
      { q: "What if the pet gets sick right after adoption?", a: "We provide a 30-day health support window where our partner clinics offer discounted or free consultations for any pre-existing conditions." }
    ]
  },
  {
    category: "Pet Care & Food",
    icon: <FaDog />,
    questions: [
      { q: "What kind of food should I give my new pet?", a: "We follow 'The Farmer's Dog' philosophy—fresh, whole ingredients. We provide a 7-day starter pack of fresh food and a customized diet plan." },
      { q: "Can I change the pet's diet immediately?", a: "We recommend a gradual transition over 10 days to avoid stomach upset. Start with 25% new food and 75% old food." }
    ]
  }
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`mb-4 rounded-3xl transition-all duration-300 ${isOpen ? 'bg-orange-50 shadow-lg' : 'bg-white border border-gray-100 hover:border-orange-200'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center p-6 focus:outline-none w-full text-left"
      >
        <span className={`text-lg font-bold ${isOpen ? 'text-orange-600' : 'text-gray-800'}`}>{question}</span>
        <div className={`p-2 rounded-full ${isOpen ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
          {isOpen ? <FaMinus size={14} /> : <FaPlus size={14} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 font-medium text-gray-600 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQPage = () => {
  return (
    <section className="bg-[#FDFCFB] py-24 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 max-w-4xl">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 mb-6 px-4 py-2 rounded-full font-black text-orange-600 text-sm">
            <FaQuestionCircle /> HELP CENTER
          </div>
          <h2 className="mb-6 font-black text-gray-900 text-4xl md:text-5xl">
            Everything you <span className="text-orange-500 underline italic">need to know.</span>
          </h2>
          <p className="mx-auto max-w-2xl font-medium text-gray-500 text-lg">
            Adopting a pet is a big decision. We're here to answer every question you have, from diet to legalities.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-16">
          {faqs.map((group, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-3 mb-8 ml-2 font-black text-gray-900 text-2xl uppercase tracking-tighter">
                <span className="bg-white shadow-md p-3 rounded-2xl text-orange-500">{group.icon}</span>
                {group.category}
              </div>
              <div className="space-y-4">
                {group.questions.map((item, i) => (
                  <FAQItem key={i} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="relative bg-gray-900 mt-20 p-12 rounded-[3rem] overflow-hidden text-white text-center">
          <div className="-top-10 -right-10 absolute bg-orange-500 opacity-20 blur-3xl rounded-full w-40 h-40"></div>
          <h3 className="mb-4 font-bold text-2xl md:text-3xl">Still have questions?</h3>
          <p className="mx-auto mb-8 max-w-md text-gray-400">Our support team is 24/7 available to help you and your future furry friend.</p>
          <button className="bg-orange-500 hover:bg-orange-600 px-10 py-4 rounded-2xl font-black hover:scale-105 transition-all transform">
            CHAT WITH AN EXPERT
          </button>
        </div>

      </div>
    </section>
  );
};

export default FAQPage;