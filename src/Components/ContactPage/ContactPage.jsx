"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail, Phone, MapPin, Heart, Sparkles, 
  Instagram, Facebook, Twitter, ArrowRight,
  MessageCircle, Clock, CheckCircle2
} from "lucide-react";
import Swal from 'sweetalert2';

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: "", email: "", subject: "", message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Message Received!',
      text: 'Our team will get back to you within 24 hours.',
      icon: 'success',
      confirmButtonColor: '#f97316',
      customClass: { popup: 'rounded-[1.5rem]' }
    });
    setFormState({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="relative bg-[#FDFDFD] min-h-screen font-sans text-slate-900">
      
      {/* --- PREMIUM HEADER --- */}
      <section className="relative bg-white px-6 pt-32 pb-16 overflow-hidden">
        <div className="top-0 right-0 -z-10 absolute bg-orange-50/50 w-1/3 h-full skew-x-12 translate-x-20"></div>
        <div className="mx-auto max-w-7xl lg:text-left text-center">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 bg-orange-100 mb-6 px-4 py-1.5 rounded-full font-bold text-orange-600 text-xs uppercase tracking-widest"
           >
             <Sparkles size={14} /> Get In Touch
           </motion.div>
           <h1 className="mb-6 font-black text-5xl lg:text-7xl leading-none tracking-tight">
             How can we <span className="text-orange-500 decoration-orange-200">help</span> you?
           </h1>
           <p className="max-w-2xl font-medium text-slate-500 text-lg lg:text-xl">
             Whether you're looking to adopt, volunteer, or just want to learn more about our mission, we're here to talk.
           </p>
        </div>
      </section>

      <main className="z-20 relative mx-auto -mt-10 px-6 pb-24 max-w-7xl">
        <div className="gap-12 grid grid-cols-1 lg:grid-cols-12">
          
          {/* --- LEFT: CONTACT CARDS --- */}
          <div className="space-y-6 lg:col-span-4">
            <div className="gap-4 grid grid-cols-1">
              <ContactCard 
                icon={<Mail size={24}/>} 
                title="Email Support" 
                desc="Response in 24h" 
                value="support@pawfect.com" 
              />
              <ContactCard 
                icon={<Phone size={24}/>} 
                title="Direct Call" 
                desc="Mon-Fri, 9am-6pm" 
                value="+1 (800) PAW-MATCH" 
              />
              <ContactCard 
                icon={<MapPin size={24}/>} 
                title="Main Shelter" 
                desc="Visit our furry friends" 
                value="123 Rescue Way, CA 90210" 
              />
            </div>

            {/* Business Hours */}
            <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="text-orange-400" />
                <h3 className="font-bold text-xl">Opening Hours</h3>
              </div>
              <ul className="space-y-3 opacity-90 font-medium text-sm">
                <li className="flex justify-between pb-2 border-white/10 border-b"><span>Mon - Fri</span> <span>09:00 - 18:00</span></li>
                <li className="flex justify-between pb-2 border-white/10 border-b"><span>Saturday</span> <span>10:00 - 16:00</span></li>
                <li className="flex justify-between text-orange-400"><span>Sunday</span> <span>Closed (Adoption only)</span></li>
              </ul>
            </div>
          </div>

          {/* --- RIGHT: THE FORM --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 rounded-[3rem] overflow-hidden"
          >
            <div className="p-8 lg:p-12">
              <div className="mb-10">
                <h2 className="mb-2 font-bold text-3xl">Send a Message</h2>
                <p className="font-medium text-slate-400">Fields marked with * are required.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                   <div className="space-y-2">
                      <label className="ml-1 font-bold text-slate-700 text-sm">Full Name *</label>
                      <input 
                        required 
                        className="bg-slate-50 px-6 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 w-full h-14 font-semibold transition-all"
                        placeholder="e.g. Alexander Pierce"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="ml-1 font-bold text-slate-700 text-sm">Email Address *</label>
                      <input 
                        required type="email"
                        className="bg-slate-50 px-6 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 w-full h-14 font-semibold transition-all"
                        placeholder="name@company.com"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="ml-1 font-bold text-slate-700 text-sm">Topic of Discussion</label>
                   <select className="bg-slate-50 px-6 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 w-full h-14 font-semibold transition-all appearance-none cursor-pointer">
                      <option>General Inquiry</option>
                      <option>Adoption Process</option>
                      <option>Donation & Sponsorship</option>
                      <option>Volunteer Work</option>
                   </select>
                </div>

                <div className="space-y-2">
                   <label className="ml-1 font-bold text-slate-700 text-sm">Your Message *</label>
                   <textarea 
                     required rows="5"
                     className="bg-slate-50 px-6 py-5 border-none rounded-[2rem] outline-none focus:ring-2 focus:ring-orange-500/20 w-full font-semibold transition-all resize-none"
                     placeholder="How can we help you today?"
                     value={formState.message}
                     onChange={(e) => setFormState({...formState, message: e.target.value})}
                   />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex justify-center items-center gap-3 bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-200 px-12 rounded-2xl w-full lg:w-fit h-16 font-black text-white text-lg transition-all"
                >
                  Send Message <ArrowRight size={20} />
                </motion.button>
              </form>
            </div>
            
            {/* Form Footer */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 bg-slate-50 p-8 border-slate-100 border-t">
               <div className="flex items-center gap-2 font-bold text-slate-500 text-sm">
                  <CheckCircle2 size={18} className="text-green-500" /> Professional Support
               </div>
               <div className="flex items-center gap-2 font-bold text-slate-500 text-sm">
                  <CheckCircle2 size={18} className="text-green-500" /> Private & Secure
               </div>
            </div>
          </motion.div>
        </div>
      </main>

      
      
    </div>
  );
};

// --- MINI COMPONENTS ---
const ContactCard = ({ icon, title, desc, value }) => (
  <div className="group flex items-start gap-5 bg-white p-6 border border-slate-100 hover:border-orange-200 rounded-3xl transition-all">
    <div className="flex justify-center items-center bg-slate-50 group-hover:bg-orange-50 rounded-2xl w-14 h-14 text-slate-400 group-hover:text-orange-500 transition-all shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-slate-900">{title}</h4>
      <p className="mb-1 font-medium text-slate-400 text-xs">{desc}</p>
      <p className="font-bold text-slate-600 text-sm">{value}</p>
    </div>
  </div>
);

const SocialLink = ({ icon }) => (
  <button className="flex justify-center items-center hover:bg-orange-500 border border-slate-100 hover:border-orange-500 rounded-full w-12 h-12 text-slate-400 hover:text-white transition-all">
    {icon}
  </button>
);

export default ContactPage;