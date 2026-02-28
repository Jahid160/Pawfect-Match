"use client"
import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Search, BookOpen, Heart, ShieldCheck, User, CreditCard, LifeBuoy, ChevronRight } from 'lucide-react';

const HelpCenter = () => {
  const categories = [
    { icon: <BookOpen className="w-8 h-8 text-blue-500" />, title: 'Adoption Process', desc: 'How to apply and bring your friend home.' },
    { icon: <Heart className="w-8 h-8 text-red-500" />, title: 'Pet Care Guides', desc: 'Expert tips on nutrition and health care.' },
    { icon: <ShieldCheck className="w-8 h-8 text-green-500" />, title: 'Safety & Trust', desc: 'Our standards for pet and owner safety.' },
    { icon: <User className="w-8 h-8 text-purple-500" />, title: 'Account Support', desc: 'Manage your profile and applications.' },
    { icon: <CreditCard className="w-8 h-8 text-orange-500" />, title: 'Donations', desc: 'Learn how your contributions help pets.' },
    { icon: <LifeBuoy className="w-8 h-8 text-teal-500" />, title: 'Volunteering', desc: 'Join our community to save lives.' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Head>
        <title>Help Center | Paws & Homes</title>
      </Head>

      {/* Hero Section - Improved Search Visibility */}
      <section className="relative py-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2000&auto=format&fit=crop" 
            alt="Dog and Cat" 
            className="w-full h-full object-cover"
          />
          {/* Darker Overlay for Search Visibility */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-6 text-center relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">How can we help?</h1>
          <p className="mb-10 text-xl text-gray-200">Find answers to all your adoption and pet care questions</p>
          
          <div className="max-w-2xl mx-auto relative group">
            <input 
              type="text" 
              placeholder="Search for answers (e.g., 'adoption fees')"
              className="w-full py-5 px-8 pr-14 rounded-2xl text-gray-900 shadow-2xl bg-white border-4 border-amber-500/30 focus:border-amber-500 focus:outline-none transition-all text-lg"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-amber-500 p-2 rounded-xl text-white shadow-lg cursor-pointer hover:bg-amber-600 transition">
              <Search size={24} />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-amber-200/40 transition-all cursor-pointer group"
            >
              <div className="mb-6 p-4 bg-amber-50 rounded-2xl w-fit group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                {cat.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">{cat.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{cat.desc}</p>
              <div className="flex items-center gap-2 text-amber-600 font-bold group-hover:translate-x-2 transition-transform">
                Read Articles <ChevronRight size={18} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section with Zoom-In/Out Cat Image */}
      <section className="bg-gray-50 py-24 overflow-hidden border-t border-gray-100">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            {/* Background Shape */}
            <div className="absolute -inset-4 bg-amber-200 rounded-full blur-3xl opacity-30 animate-pulse" />
            
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop" 
                alt="Happy Cat" 
                className="rounded-[40px] shadow-2xl border-8 border-white w-full max-w-md mx-auto"
              />
            </motion.div>
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-black mb-10 text-gray-900 flex items-center gap-3">
              <span className="w-12 h-1 bg-amber-500 rounded-full inline-block"></span>
              Popular FAQs
            </h2>
            <div className="space-y-4">
              {[
                { q: 'Is there any adoption fee?', a: 'Yes, it helps us cover vaccinations and shelter maintenance.' },
                { q: 'Can I visit the pet before adoption?', a: 'Absolutely! We encourage multiple meet-and-greets.' },
                { q: 'What happens if I can’t keep the pet?', a: 'We have a lifetime return policy to ensure the pet stays safe.' }
              ].map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-amber-200 transition-all cursor-pointer group"
                >
                  <h4 className="font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">{item.q}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Space Placeholder */}
      <footer className="py-10 bg-white border-t border-gray-50 text-center text-gray-400 text-sm">
        © 2026 Paws & Homes Adoption Project
      </footer>
    </div>
  );
};

export default HelpCenter;