"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How does the pet adoption process work at Pawfect Match?",
            answer: "Our process is designed to be transparent and secure. First, you browse through our 'All Pets' page using category-based filters. Once you find a match, you submit an adoption request. Our team (or the pet owner) reviews your profile through our Admin Dashboard. After verification, we schedule a meeting. The final step involves signing digital adoption papers and a 100% safety check."
        },
        {
            question: "Are the doctors listed on the website verified?",
            answer: "Yes, absolutely. Every veterinarian in our 'Expert Doctor' section goes through a manual verification process. We check their certifications and medical backgrounds before allowing them to create a profile. You can view their full profiles, specialties, and experience directly on the website."
        },
        {
            question: "Is there any fee for pet adoption?",
            answer: "Pawfect Match itself does not charge an adoption fee. However, some individual shelters or owners might have a small nominal fee to cover the pet's initial vaccination and medical costs. We recommend discussing this directly with the caretaker during the consultation process."
        },
        {
            question: "How can I contact a doctor for my pet's health issue?",
            answer: "You can go to the 'Expert' section, browse the doctors' profiles, and use the contact form. Since we have integrated Emailjs, your inquiry will be sent directly to the doctor's email, ensuring a quick and professional response for your pet's needs."
        },
        {
            question: "Can I list a pet for adoption on this platform?",
            answer: "Yes! After creating an account, you can submit a pet's details including their category, health status, and photos. Our Admin system will review the listing to ensure it meets our quality standards before making it live on the 'Recent Pets' section."
        },
        {
            question: "What should I do if I face technical issues on the dashboard?",
            answer: "Our website features a built-in notification system and a direct contact page. If you face any issues with the dashboard or sidebar options, you can use the 'Contact Us' form, and our technical team will reach out to you within 24 hours."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="bg-white py-28">
            <div className="mx-auto px-6 max-w-7xl">
                <div className="flex lg:flex-row flex-col gap-20">
                    
                    {/* --- Left Side: Header & Support --- */}
                    <div className="lg:w-[40%]">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="top-32 lg:sticky"
                        >
                            <div className="bg-orange-500/10 mb-6 p-4 border border-orange-500/20 rounded-[1.5rem] w-fit text-orange-600">
                                <HelpCircle size={32} strokeWidth={2.5} />
                            </div>
                            
                            <h2 className="mb-6 font-black text-slate-900 text-5xl md:text-6xl leading-[0.95] tracking-[-0.04em]">
                                Got Questions? <br />
                                <span className="text-orange-500 italic">We Got Answers.</span>
                            </h2>
                            
                            <p className="mb-10 font-medium text-slate-500 text-lg leading-relaxed">
                                Can't find what you're looking for? Our support team is always ready to help you and your furry friends.
                            </p>
                            
                            <div className="group relative bg-slate-900 p-10 rounded-[3rem] overflow-hidden text-white">
                                {/* Decorative circle */}
                                <div className="-top-10 -right-10 absolute bg-orange-600/20 blur-2xl rounded-full w-32 h-32 group-hover:scale-150 transition-all duration-700"></div>
                                
                                <MessageCircle className="mb-5 text-orange-500" size={32} />
                                <h4 className="mb-2 font-black text-2xl tracking-tight">Still need help?</h4>
                                <p className="mb-8 font-medium text-slate-400 text-sm leading-relaxed">Our support experts are available for direct consultation regarding technical issues.</p>
                                
                                <button className="group/btn relative flex justify-center items-center gap-3 bg-orange-600 hover:bg-orange-500 shadow-orange-900/20 shadow-xl py-5 rounded-2xl w-full font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300">
                                    <span>Contact Support</span>
                                    <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* --- Right Side: Accordion --- */}
                    <div className="lg:w-[60%]">
                        <div className="space-y-5">
                            {faqs.map((faq, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`border-2 rounded-[2.5rem] transition-all duration-500 ${
                                        activeIndex === index 
                                        ? 'border-orange-500 bg-orange-50/30 shadow-xl shadow-orange-500/5' 
                                        : 'border-slate-100 hover:border-orange-200 bg-white'
                                    }`}
                                >
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="flex justify-between items-center p-8 md:p-10 w-full text-left"
                                    >
                                        <span className={`text-xl md:text-2xl font-black tracking-tight leading-tight pr-8 ${
                                            activeIndex === index ? 'text-slate-900' : 'text-slate-800'
                                        }`}>
                                            {faq.question}
                                        </span>
                                        <div className={`flex-shrink-0 p-3 rounded-2xl transition-all duration-500 ${
                                            activeIndex === index 
                                            ? 'bg-orange-600 text-white rotate-180 shadow-lg shadow-orange-600/30' 
                                            : 'bg-slate-50 text-slate-400'
                                        }`}>
                                            {activeIndex === index ? <Minus size={20} strokeWidth={3} /> : <Plus size={20} strokeWidth={3} />}
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {activeIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="mx-8 md:mx-10 mb-8 pt-8 border-slate-200 border-t font-medium text-slate-500 text-lg leading-relaxed">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FAQSection;