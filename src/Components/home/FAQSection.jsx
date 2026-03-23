"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react';

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
        <section className="bg-white py-24">
            <div className="mx-auto px-6 container">
                <div className="flex lg:flex-row flex-col gap-16">
                    
                    {/* --- Left Side: Header & Support --- */}
                    <div className="lg:w-1/3">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="top-32 sticky"
                        >
                            <div className="bg-orange-100 mb-6 p-3 rounded-2xl w-fit text-orange-600">
                                <HelpCircle size={32} />
                            </div>
                            <h2 className="mb-6 font-black text-slate-900 text-4xl md:text-5xl leading-tight">
                                Have Questions? <br />
                                <span className="text-orange-500 decoration-orange-100 underline">We Have Answers.</span>
                            </h2>
                            <p className="mb-10 text-slate-600 text-lg">
                                Can't find what you're looking for? Our support team is always ready to help you and your furry friends.
                            </p>
                            
                            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                                <MessageCircle className="mb-4 text-orange-500" size={28} />
                                <h4 className="mb-2 font-bold text-xl">Still need help?</h4>
                                <p className="mb-6 text-slate-400 text-sm">Our experts are available for direct consultation.</p>
                                <button className="bg-orange-600 hover:bg-orange-700 py-4 rounded-xl w-full font-bold text-sm uppercase tracking-widest transition-all">
                                    Contact Support
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* --- Right Side: Accordion --- */}
                    <div className="lg:w-2/3">
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`border-2 rounded-[2rem] transition-all duration-300 ${
                                        activeIndex === index 
                                        ? 'border-orange-500 bg-[#fffaf5]' 
                                        : 'border-slate-100 hover:border-orange-200'
                                    }`}
                                >
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="flex justify-between items-center p-8 w-full text-left"
                                    >
                                        <span className={`text-lg md:text-xl font-bold ${
                                            activeIndex === index ? 'text-orange-600' : 'text-slate-800'
                                        }`}>
                                            {faq.question}
                                        </span>
                                        <div className={`p-2 rounded-full transition-all ${
                                            activeIndex === index ? 'bg-orange-600 text-white rotate-180' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                            {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {activeIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="mt-2 px-8 pt-6 pb-8 border-orange-100 border-t text-md text-slate-600 leading-relaxed">
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