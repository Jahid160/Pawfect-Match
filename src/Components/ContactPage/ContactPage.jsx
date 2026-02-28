"use client";

import React, { useState } from "react"; 
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  PawPrint,
  Plus,
  Minus,
  Instagram,
  Facebook,
  Twitter,
  Heart,
} from "lucide-react";

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // এখানে আপনি চাইলে আপনার API কল করতে পারেন
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans relative overflow-hidden">
      {/* Decorative Paw Prints Background */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <PawPrint className="absolute top-20 left-[10%] rotate-12 text-amber-900" size={120} />
        <PawPrint className="absolute top-60 right-[5%] -rotate-12 text-amber-900" size={180} />
        <PawPrint className="absolute bottom-40 left-[15%] rotate-45 text-amber-900" size={140} />
        <PawPrint className="absolute bottom-10 right-[20%] -rotate-[30deg] text-amber-900" size={200} />
      </div>

      {/* Hero Section */}
      <section className="bg-[#2563EB] relative py-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -ml-20 -mb-20"></div>
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="md:w-1/2 text-white mb-10 md:mb-0">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-black mb-6 leading-tight"
            >
              We'd Love to <br /> Hear From You!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-blue-100 text-lg md:text-xl max-w-md leading-relaxed"
            >
              Questions about adoption, volunteering, or just want to share a pet story? 
              Our team is always here for you and your furry friends.
            </motion.p>
          </div>

          <div className="md:w-1/2 relative flex justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="relative"
            >
              <div className="w-64 h-64 md:w-80 md:h-80 bg-white rounded-full p-2 shadow-2xl overflow-hidden border-8 border-blue-400/30">
                <img
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1000"
                  alt="Happy Dog"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              
              {/* Floating Badge */}
              <motion.div
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-10 bg-[#FFD60A] px-6 py-3 rounded-xl shadow-lg transform -rotate-6 border-2 border-amber-400 flex items-center gap-2"
              >
                <Heart className="text-amber-900" size={20} fill="currentColor" />
                <span className="text-amber-900 font-black text-lg tracking-tight uppercase">
                  Volunteer Now
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 -mt-16 pb-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start my-20">
          
          {/* Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 bg-[#2563EB] rounded-[3rem] p-8 md:p-12 shadow-2xl relative"
          >
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-white text-3xl font-black">Send us a Message</h2>
              <div className="hidden md:flex items-center gap-2 text-blue-300">
                <span className="text-xs font-bold uppercase tracking-widest">Support</span>
                <div className="h-px w-20 bg-blue-400"></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-blue-100 text-sm font-bold mb-2 ml-1">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Pawsome Human"
                    className="w-full bg-white rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-400 transition-all text-gray-800 border-none shadow-inner"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-blue-100 text-sm font-bold mb-2 ml-1">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="hello@example.com"
                    className="w-full bg-white rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-400 transition-all text-gray-800 border-none shadow-inner"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-blue-100 text-sm font-bold mb-2 ml-1">Subject</label>
                <input
                  required
                  type="text"
                  placeholder="How can we help?"
                  className="w-full bg-white rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-blue-400 transition-all text-gray-800 border-none shadow-inner"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-blue-100 text-sm font-bold mb-2 ml-1">Your Message</label>
                <textarea
                  required
                  rows="5"
                  placeholder="Tell us about your furry friend..."
                  className="w-full bg-white rounded-[2rem] px-6 py-5 outline-none focus:ring-4 focus:ring-blue-400 transition-all text-gray-800 border-none shadow-inner resize-none"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full md:w-auto bg-[#FFD60A] text-amber-900 font-black text-lg px-10 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:bg-[#FFE045] transition-colors"
              >
                Submit Message <Send size={20} />
              </motion.button>
            </form>

            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 bg-blue-600 rounded-[3rem] flex flex-col items-center justify-center text-white p-8 text-center z-50"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.6 }}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 text-blue-600"
                  >
                    <Heart size={40} fill="currentColor" />
                  </motion.div>
                  <h3 className="text-3xl font-black mb-2">Message Sent!</h3>
                  <p className="text-blue-100">Thanks for reaching out. We'll get back to you soon!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Details & Map Column */}
          <div className="lg:col-span-2 space-y-10 py-6">
            <div className="space-y-8">
              <ContactInfoItem 
                icon={<Mail size={24} />} 
                title="Email Us" 
                detail="hello@pawsandhomes.org" 
                sub="We respond within 24 hours!" 
                delay={0.3} 
              />
              <ContactInfoItem 
                icon={<Phone size={24} />} 
                title="Call Us" 
                detail="+1 (555) 123-4567" 
                sub="Mon-Fri, 9am - 6pm" 
                delay={0.4} 
              />
              <ContactInfoItem 
                icon={<MapPin size={24} />} 
                title="Visit Us" 
                detail="123 Shelter Way, Tail Town" 
                sub="Find your new best friend here" 
                delay={0.5} 
              />
            </div>

            {/* Stylized Map View */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white p-3 rounded-[2.5rem] shadow-xl border-4 border-white overflow-hidden aspect-square relative"
            >
              <div className="absolute inset-0 bg-[#E5E7EB]">
                <div className="absolute inset-0 opacity-40">
                  <div className="h-4 w-full bg-white absolute top-1/4"></div>
                  <div className="w-4 h-full bg-white absolute left-1/3"></div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-red-500"
                  >
                    <MapPin size={40} fill="currentColor" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 pb-12 flex flex-col items-center border-t border-gray-100 pt-10">
        <div className="flex gap-4 text-gray-400 mb-6">
          <Facebook size={20} className="hover:text-blue-600 cursor-pointer transition-colors" />
          <Twitter size={20} className="hover:text-blue-400 cursor-pointer transition-colors" />
          <Instagram size={20} className="hover:text-pink-600 cursor-pointer transition-colors" />
        </div>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest text-center">
          © 2026 Paws and Homes Animal Shelter. Spreading love, one paw at a time.
        </p>
      </footer>
    </div>
  );
};

// Helper Component for Info Items
const ContactInfoItem = ({ icon, title, detail, sub, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex items-start gap-5 group"
  >
    <div className="bg-[#5D4037] p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div>
      <h4 className="text-xl font-black text-gray-800">{title}</h4>
      <p className="text-blue-600 font-semibold mb-1">{detail}</p>
      <p className="text-gray-400 text-sm">{sub}</p>
    </div>
  </motion.div>
);

export default ContactPage;