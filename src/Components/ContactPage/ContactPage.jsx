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
        // --- PREMIUM CUSTOM ALERT ---
        Swal.fire({
          title: '<span style="font-family: inherit; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">Message Sent!</span>',
          html: '<p style="font-family: inherit; font-weight: 500; color: #64748b;">Thank you! Our team will get back to you within 24 hours.</p>',
          icon: 'success',
          iconColor: '#f97316',
          background: '#ffffff',
          showConfirmButton: true,
          confirmButtonText: 'CLOSE',
          buttonsStyling: false,
          customClass: {
            popup: 'rounded-[3rem] p-10 shadow-2xl border border-slate-50',
            confirmButton: 'bg-slate-900 hover:bg-orange-600 text-white px-12 py-4 rounded-2xl font-black text-[10px] tracking-[0.2em] transition-all uppercase',
          },
          showClass: {
            popup: 'animate__animated animate__fadeInUp animate__faster'
          }
        });
        
        setFormState({ name: "", email: "", subject: "General Inquiry", message: "" });
      }, (error) => {
        // --- PREMIUM ERROR ALERT ---
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
        console.error("EmailJS Error:", error.text);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <div className="relative bg-[#FDFDFD] min-h-screen font-sans text-slate-900">
      
      {/* --- PREMIUM HEADER --- */}
      <section className="relative bg-white px-6 pt-32 pb-16 border-slate-50 border-b overflow-hidden">
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
             How can we <span className="text-orange-500 decoration-orange-200 underline underline-offset-8 italic">help</span> you?
           </h1>
           <p className="max-w-2xl font-medium text-slate-500 text-lg lg:text-xl leading-relaxed">
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

            <div className="bg-slate-900 shadow-2xl shadow-slate-200 p-8 rounded-[2rem] text-white">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="text-orange-400" />
                <h3 className="font-bold text-xl uppercase tracking-tighter">Opening Hours</h3>
              </div>
              <ul className="space-y-3 opacity-90 font-medium text-sm">
                <li className="flex justify-between pb-2 border-white/10 border-b"><span>Mon - Fri</span> <span>09:00 - 18:00</span></li>
                <li className="flex justify-between pb-2 border-white/10 border-b"><span>Saturday</span> <span>10:00 - 16:00</span></li>
                <li className="flex justify-between font-bold text-orange-400"><span>Sunday</span> <span>Closed</span></li>
              </ul>
            </div>
          </div>

          {/* --- RIGHT: THE FORM --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-white shadow-[0_30px_60px_rgba(0,0,0,0.06)] border border-slate-50 rounded-[3.5rem] overflow-hidden"
          >
            <div className="p-8 lg:p-14">
              <div className="mb-10">
                <h2 className="mb-2 font-black text-3xl uppercase tracking-tight">Send a Message</h2>
                <p className="font-medium text-slate-400 italic">We usually respond within a few business hours.</p>
              </div>

              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                   <div className="space-y-2">
                      <label className="ml-1 font-bold text-[11px] text-slate-700 uppercase tracking-widest">Full Name *</label>
                      <input 
                        required 
                        name="user_name" 
                        className="bg-slate-50 px-6 border-2 border-transparent focus:border-orange-500/20 rounded-2xl outline-none focus:ring-4 focus:ring-orange-500/5 w-full h-14 font-semibold transition-all"
                        placeholder="Alexander Pierce"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="ml-1 font-bold text-[11px] text-slate-700 uppercase tracking-widest">Email Address *</label>
                      <input 
                        required type="email"
                        name="user_email" 
                        className="bg-slate-50 px-6 border-2 border-transparent focus:border-orange-500/20 rounded-2xl outline-none focus:ring-4 focus:ring-orange-500/5 w-full h-14 font-semibold transition-all"
                        placeholder="name@company.com"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="ml-1 font-bold text-[11px] text-slate-700 uppercase tracking-widest">Topic of Discussion</label>
                   <select 
                    name="subject" 
                    value={formState.subject}
                    onChange={(e) => setFormState({...formState, subject: e.target.value})}
                    className="bg-slate-50 px-6 border-2 border-transparent rounded-2xl outline-none focus:ring-4 focus:ring-orange-500/5 w-full h-14 font-semibold transition-all appearance-none cursor-pointer"
                   >
                      <option>General Inquiry</option>
                      <option>Adoption Process</option>
                      <option>Donation & Sponsorship</option>
                      <option>Volunteer Work</option>
                   </select>
                </div>

                <div className="space-y-2">
                   <label className="ml-1 font-bold text-[11px] text-slate-700 uppercase tracking-widest">Your Message *</label>
                   <textarea 
                     required rows="5"
                     name="message" 
                     className="bg-slate-50 px-6 py-5 border-2 border-transparent focus:border-orange-500/20 rounded-[2rem] outline-none focus:ring-4 focus:ring-orange-500/5 w-full font-semibold transition-all resize-none"
                     placeholder="Tell us how we can help..."
                     value={formState.message}
                     onChange={(e) => setFormState({...formState, message: e.target.value})}
                   />
                </div>

                <motion.button
                  disabled={isSending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex justify-center items-center gap-3 bg-slate-900 hover:bg-orange-600 disabled:bg-slate-400 shadow-slate-200 shadow-xl px-12 rounded-2xl w-full lg:w-fit h-16 font-black text-white text-xs uppercase tracking-[0.2em] transition-all"
                >
                  {isSending ? (
                    <RefreshCw className="animate-spin" size={20} />
                  ) : (
                    <>Send Message <ArrowRight size={18} /></>
                  )}
                </motion.button>
              </form>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 bg-slate-50 p-8 border-slate-100 border-t">
               <div className="flex items-center gap-2 font-bold text-[10px] text-slate-400 uppercase tracking-widest">
                  <CheckCircle2 size={16} className="text-green-500" /> Professional Support
               </div>
               <div className="flex items-center gap-2 font-bold text-[10px] text-slate-400 uppercase tracking-widest">
                  <CheckCircle2 size={16} className="text-green-500" /> Private & Secure
               </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

const ContactCard = ({ icon, title, desc, value }) => (
  <div className="group flex items-start gap-5 bg-white hover:shadow-orange-50/50 hover:shadow-xl p-7 border border-slate-50 hover:border-orange-100 rounded-[2rem] transition-all duration-500">
    <div className="flex justify-center items-center bg-slate-50 group-hover:bg-orange-500 rounded-2xl w-14 h-14 text-slate-400 group-hover:text-white transition-all duration-500 shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-slate-900 text-sm uppercase tracking-tight">{title}</h4>
      <p className="mb-1 font-medium text-[10px] text-slate-400 uppercase tracking-wider">{desc}</p>
      <p className="font-bold text-slate-600 text-sm break-all">{value}</p>
    </div>
  </div>
);

export default ContactPage;