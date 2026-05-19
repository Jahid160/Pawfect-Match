"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Mail, Phone, MapPin, Sparkles, 
  ArrowRight, Clock, CheckCircle2, RefreshCw
} from "lucide-react";
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  const form = useRef(); 
  const [isSending, setIsSending] = useState(false);
  const [formState, setFormState] = useState({
    name: "", email: "", subject: "General Inquiry", message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
        Swal.fire({
          title: '<span style="font-family: inherit; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em;">Message Sent!</span>',
          html: '<p style="font-family: inherit; font-weight: 600; color: #64748b;">Thank you! Our team will get back to you within 24 hours.</p>',
          icon: 'success',
          iconColor: '#f97316',
          background: '#ffffff',
          showConfirmButton: true,
          confirmButtonText: 'CLOSE',
          buttonsStyling: false,
          customClass: {
            popup: 'rounded-[3rem] p-10 shadow-2xl border border-slate-50',
            confirmButton: 'bg-slate-900 hover:bg-orange-600 text-white px-12 py-4 rounded-2xl font-black text-[10px] tracking-[0.2em] transition-all uppercase',
          }
        });
        
        setFormState({ name: "", email: "", subject: "General Inquiry", message: "" });
      }, (error) => {
        Swal.fire({
          title: '<span style="font-family: inherit; font-weight: 900; text-transform: uppercase;">Error!</span>',
          text: 'Something went wrong. Please try again later.',
          icon: 'error',
          iconColor: '#ef4444',
          confirmButtonText: 'TRY AGAIN',
          buttonsStyling: false,
          customClass: {
            popup: 'rounded-[3rem] p-10',
            confirmButton: 'bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase',
          }
        });
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <div className="relative bg-[#FDFDFD] min-h-screen font-sans text-slate-900">
      
      {/* --- PREMIUM HEADER --- */}
      <section className="relative bg-white px-6 pt-32 pb-16 border-slate-50 border-b overflow-hidden lg:text-left text-center">
        <div className="top-0 right-0 -z-10 absolute bg-orange-50/50 w-1/3 h-full skew-x-12 translate-x-20"></div>
        <div className="mx-auto max-w-7xl">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 bg-orange-100 mb-6 px-4 py-1.5 rounded-full font-black text-[10px] text-orange-600 uppercase tracking-[0.2em]"
           >
             <Sparkles size={14} /> Get In Touch
           </motion.div>
           <h1 className="mb-6 font-black text-6xl lg:text-8xl leading-[0.9] tracking-[-0.05em]">
             How can <span className="text-orange-500">we help</span> you?
           </h1>
           <p className="max-w-2xl font-bold text-slate-500 text-lg lg:text-2xl leading-relaxed tracking-tight">
             Whether you're looking to adopt, volunteer, or just want to learn more about our mission, we're here to talk.
           </p>
        </div>
      </section>

      <main className="z-20 relative mx-auto -mt-10 px-6 pb-24 max-w-7xl">
        <div className="gap-12 grid grid-cols-1 lg:grid-cols-12">
          
          {/* --- LEFT: CONTACT CARDS --- */}
          <div className="space-y-6 lg:col-span-4">
            <div className="gap-4 grid grid-cols-1">
              <ContactCard icon={<Mail size={24}/>} title="Email Support" desc="Response in 24h" value="support@pawfect.com" />
              <ContactCard icon={<Phone size={24}/>} title="Direct Call" desc="Mon-Fri, 9am-6pm" value="+1 (800) PAW-MATCH" />
              <ContactCard icon={<MapPin size={24}/>} title="Main Shelter" desc="Visit our furry friends" value="123 Rescue Way, CA 90210" />
            </div>

            <div className="bg-slate-900 shadow-2xl p-10 rounded-[3rem] text-white">
              <div className="flex items-center gap-3 mb-8">
                <Clock className="text-orange-500" size={28} />
                <h3 className="font-black text-2xl uppercase tracking-tighter">Opening Hours</h3>
              </div>
              <ul className="space-y-4 font-bold text-sm tracking-tight">
                <li className="flex justify-between pb-3 border-white/10 border-b">
                  <span className="opacity-60 text-[11px] uppercase">Mon - Fri</span> 
                  <span>09:00 - 18:00</span>
                </li>
                <li className="flex justify-between pb-3 border-white/10 border-b">
                  <span className="opacity-60 text-[11px] uppercase">Saturday</span> 
                  <span>10:00 - 16:00</span>
                </li>
                <li className="flex justify-between text-orange-500">
                  <span className="opacity-60 text-[11px] uppercase">Sunday</span> 
                  <span className="font-black text-xs uppercase tracking-widest">Closed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- RIGHT: THE FORM --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-white shadow-[0_40px_80px_rgba(0,0,0,0.05)] border border-slate-50 rounded-[4rem] overflow-hidden"
          >
            <div className="p-10 lg:p-16">
              <div className="mb-12">
                <h2 className="mb-3 font-black text-4xl uppercase tracking-tighter">Send a Message</h2>
                <p className="font-bold text-slate-400 text-lg tracking-tight">We usually respond within a few business hours.</p>
              </div>

              <form ref={form} onSubmit={handleSubmit} className="space-y-8">
                <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
                   <div className="space-y-3">
                      <label className="ml-1 font-black text-[11px] text-slate-900 uppercase tracking-[0.2em]">Full Name *</label>
                      <input 
                        required name="user_name" 
                        className="bg-slate-50 px-8 border-2 border-transparent focus:border-orange-500/20 rounded-2xl outline-none focus:ring-8 focus:ring-orange-500/5 w-full h-16 font-bold text-slate-900 placeholder:text-slate-300 transition-all"
                        placeholder="Alexander Pierce"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                      />
                   </div>
                   <div className="space-y-3">
                      <label className="ml-1 font-black text-[11px] text-slate-900 uppercase tracking-[0.2em]">Email Address *</label>
                      <input 
                        required type="email" name="user_email" 
                        className="bg-slate-50 px-8 border-2 border-transparent focus:border-orange-500/20 rounded-2xl outline-none focus:ring-8 focus:ring-orange-500/5 w-full h-16 font-bold text-slate-900 placeholder:text-slate-300 transition-all"
                        placeholder="name@company.com"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                      />
                   </div>
                </div>

                <div className="space-y-3">
                   <label className="ml-1 font-black text-[11px] text-slate-900 uppercase tracking-[0.2em]">Topic of Discussion</label>
                   <select 
                    name="subject" value={formState.subject}
                    onChange={(e) => setFormState({...formState, subject: e.target.value})}
                    className="bg-slate-50 px-8 border-2 border-transparent rounded-2xl outline-none focus:ring-8 focus:ring-orange-500/5 w-full h-16 font-bold text-slate-900 transition-all appearance-none cursor-pointer"
                   >
                      <option>General Inquiry</option>
                      <option>Adoption Process</option>
                      <option>Donation & Sponsorship</option>
                      <option>Volunteer Work</option>
                   </select>
                </div>

                <div className="space-y-3">
                   <label className="ml-1 font-black text-[11px] text-slate-900 uppercase tracking-[0.2em]">Your Message *</label>
                   <textarea 
                     required rows="6" name="message" 
                     className="bg-slate-50 px-8 py-6 border-2 border-transparent focus:border-orange-500/20 rounded-[2.5rem] outline-none focus:ring-8 focus:ring-orange-500/5 w-full font-bold text-slate-900 placeholder:text-slate-300 transition-all resize-none"
                     placeholder="Tell us how we can help..."
                     value={formState.message}
                     onChange={(e) => setFormState({...formState, message: e.target.value})}
                   />
                </div>

                <motion.button
                  disabled={isSending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex justify-center items-center gap-4 bg-slate-900 hover:bg-orange-600 disabled:bg-slate-400 shadow-2xl px-14 rounded-2xl w-full lg:w-fit h-20 font-black text-[11px] text-white uppercase tracking-[0.25em] transition-all"
                >
                  {isSending ? (
                    <RefreshCw className="animate-spin" size={20} />
                  ) : (
                    <>Send Message <ArrowRight size={20} /></>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

const ContactCard = ({ icon, title, desc, value }) => (
  <div className="group flex items-center gap-6 bg-white hover:shadow-2xl p-8 border border-slate-50 hover:border-orange-100 rounded-[2.5rem] transition-all duration-500">
    <div className="flex justify-center items-center bg-slate-50 group-hover:bg-orange-500 rounded-2xl w-16 h-16 text-slate-400 group-hover:text-white transition-all duration-500 shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="mb-1 font-black text-slate-900 text-xs uppercase tracking-[0.15em]">{title}</h4>
      <p className="mb-1 font-bold text-[10px] text-slate-400 uppercase tracking-widest">{desc}</p>
      <p className="font-black text-slate-700 text-sm break-all tracking-tight">{value}</p>
    </div>
  </div>
);

export default ContactPage;