"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  PawPrint,
  Heart,
  Sparkles,
  MessageSquareHeart,
  ExternalLink
} from "lucide-react";
import Swal from 'sweetalert2';

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Success!',
      text: 'Our team will bark back at you soon!',
      icon: 'success',
      confirmButtonColor: 'var(--color-primary)',
      background: 'var(--color-base-100)',
      color: 'var(--color-neutral)',
      customClass: {
        popup: 'rounded-[2rem]',
        confirmButton: 'rounded-full px-8 py-3'
      }
    });
    setFormState({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-neutral-content/20 font-sans relative overflow-hidden text-neutral">
      
      {/* Decorative Warm Glows - No Black/Blue */}
      <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] bg-accent/30 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Hero Section - Using Secondary Cream/Peach */}
      <section className="relative pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8 font-bold text-sm"
          >
            <Sparkles size={16} />
            <span>WE ARE HERE FOR YOU</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-6 leading-tight text-neutral"
          >
            Have Questions? <br />
            <span className="text-primary font-serif italic">Give us a growl!</span>
          </motion.h1>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 pb-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Sidebar: Contact Info */}
          <motion.div 
            className="lg:col-span-4 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-primary/5 border border-primary/10">
              <h3 className="text-xl font-black text-neutral mb-8">Contact Details</h3>
              
              <div className="space-y-6">
                <ContactDetail 
                    icon={<Mail className="text-primary" size={20} />} 
                    title="Send an Email" 
                    value="adopt@pawfect.match" 
                />
                <ContactDetail 
                    icon={<Phone className="text-primary" size={20} />} 
                    title="Call the Shelter" 
                    value="+1 234 PAWS" 
                />
                <ContactDetail 
                    icon={<MapPin className="text-primary" size={20} />} 
                    title="Visit the Pups" 
                    value="Sunshine Valley, CA" 
                />
              </div>

              <div className="mt-10 pt-8 border-t border-base-200 flex items-center justify-between">
                <span className="text-xs font-bold text-neutral/40 uppercase tracking-widest">Follow the fun</span>
                <div className="flex gap-3">
                    <SocialButton icon={<MessageSquareHeart size={18} />} />
                    <SocialButton icon={<ExternalLink size={18} />} />
                </div>
              </div>
            </div>

            {/* Fun Fact Card */}
            <div className="bg-accent rounded-[2.5rem] p-8 text-accent-content shadow-lg relative overflow-hidden group">
                <PawPrint className="absolute -right-4 -bottom-4 opacity-10 rotate-12 group-hover:scale-125 transition-transform" size={120} />
                <p className="text-sm font-bold opacity-80 mb-2">Did you know?</p>
                <p className="font-black text-lg">Adopting a pet can lower your blood pressure and reduce stress!</p>
            </div>
          </motion.div>

          {/* Main Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 bg-white rounded-[3rem] p-8 md:p-14 shadow-2xl shadow-primary/5 border border-white"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-neutral/40 uppercase tracking-widest ml-4">Full Name</label>
                  <input
                    required
                    className="w-full bg-neutral-content focus:bg-white border-2 border-transparent focus:border-primary/20 rounded-3xl px-6 py-4 outline-none transition-all font-semibold"
                    placeholder="E.g. Oliver Twist"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-neutral/40 uppercase tracking-widest ml-4">Email Address</label>
                  <input
                    required
                    type="email"
                    className="w-full bg-neutral-content focus:bg-white border-2 border-transparent focus:border-primary/20 rounded-3xl px-6 py-4 outline-none transition-all font-semibold"
                    placeholder="oliver@paws.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-neutral/40 uppercase tracking-widest ml-4">What's on your mind?</label>
                <input
                  required
                  className="w-full bg-neutral-content focus:bg-white border-2 border-transparent focus:border-primary/20 rounded-3xl px-6 py-4 outline-none transition-all font-semibold"
                  placeholder="Inquiry about adoption process"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-neutral/40 uppercase tracking-widest ml-4">Your Message</label>
                <textarea
                  required
                  rows="5"
                  className="w-full bg-neutral-content focus:bg-white border-2 border-transparent focus:border-primary/20 rounded-[2rem] px-6 py-5 outline-none transition-all font-semibold resize-none"
                  placeholder="Tell us more..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn btn-primary w-full md:w-auto rounded-full px-12 h-16 text-lg font-black shadow-xl shadow-primary/30 border-none"
              >
                Send Message
                <Heart size={20} className="ml-2" fill="currentColor" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </main>

      <footer className="text-center pb-12 opacity-30 font-bold text-[10px] tracking-[0.3em] uppercase">
        Pawfect Match Shelter • 2026
      </footer>
    </div>
  );
};

// Sub-components for cleaner code
const ContactDetail = ({ icon, title, value }) => (
    <div className="flex items-center gap-4 group">
        <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            {icon}
        </div>
        <div>
            <p className="text-[10px] font-black text-neutral/30 uppercase tracking-wider leading-none mb-1">{title}</p>
            <p className="font-bold text-neutral/80">{value}</p>
        </div>
    </div>
);

const SocialButton = ({ icon }) => (
    <button className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center text-neutral/40 hover:bg-primary hover:text-white transition-all">
        {icon}
    </button>
);

export default ContactPage;