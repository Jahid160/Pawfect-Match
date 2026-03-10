"use client";
import React, { useState } from "react";
import Link from 'next/link'
import {
  User,
  Home,
  PawPrint,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { createAdoptionUser } from "@/action/server/Adoptionuser";

const AdoptionForm = () => {
  const [step, setStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  // Form states (Guardian Details)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    residence: "",
    yard: "",
  });

  // Capability Quiz states
  const [quizData, setQuizData] = useState({
    income: "",
    dailyTime: "",
    vacationPlan: "",
    experience: "",
    emergencyFund: "",
    commitment: "",
  });

  const handleNext = () => {
    const { fullName, email, phone, address, residence, yard } = formData;
    if (!fullName || !email || !phone || !address || !residence || !yard) {
      Swal.fire({
        icon: "error",
        title: "Required Fields Missing",
        text: "Please fill in all Guardian Details and Living Environment requirements.",
        confirmButtonColor: "#f97316",
      });
      return
    }
    setStep(2);
  };

  const handlePrev = () => setStep(1);

  const handleComplete = async (e) => {
    e.preventDefault();
    const isAllQuizAnswered = Object.values(quizData).every(
      (val) => val !== "",
    );

    if (!isAllQuizAnswered) {
      Swal.fire({
        icon: "warning",
        title: "Quiz Incomplete",
        text: "Please answer all suitability questions to proceed.",
        confirmButtonColor: "#f97316",
      });
      return;
    }


    try {
      // formData এবং quizData কে একসাথে একটি অবজেক্টে নেওয়া হচ্ছে
      const finalData = {
        ...formData,
        ...quizData
      };


      // make server call to save the data
      const response = await createAdoptionUser(finalData);

      if (response) {
        setIsCompleted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please try again.",
      });
    }


  };

  return (
    <div className="max-w-4xl mx-auto my-16 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden border border-gray-100 font-sans">
      {/* Header Section */}
      <div className="relative bg-linear-to-r from-orange-400 to-rose-500 p-10 text-center overflow-hidden">
        <div className="absolute -top-5 -right-5 opacity-10 text-white">
          <PawPrint size={150} />
        </div>
        <h2 className="relative text-4xl font-extrabold text-white mb-2 tracking-tight">
          Adoption Suitability 🐾
        </h2>
        <p className="relative text-white/90 font-light text-lg italic">
          A pet is a lifetime commitment. Help us ensure a perfect match .
        </p>
      </div>

      <div className="p-8 lg:p-14 bg-slate-50/30 backdrop-blur-sm">
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {/* Guardian Details & Living Environment (Your existing code) */}
                <section className="mb-12">
                  <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
                    <span className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                      <User size={20} />
                    </span>
                    <h3 className="text-2xl font-bold text-slate-800">
                      Guardian Details
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control group">
                      <label className="label transition-all group-focus-within:text-orange-500">
                        <span className="label-text font-bold">
                          Full Name <span className="text-rose-500">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="input w-full bg-white border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all rounded-xl"
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        value={formData.fullName}
                      />
                    </div>
                    <div className="form-control group">
                      <label className="label transition-all group-focus-within:text-orange-500">
                        <span className="label-text font-bold">
                          Email Address <span className="text-rose-500">*</span>
                        </span>
                      </label>
                      <input
                        type="email"
                        placeholder="hello@trusted.com"
                        className="input w-full bg-white border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all rounded-xl"
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        value={formData.email}
                      />
                    </div>
                    <div className="form-control group">
                      <label className="label transition-all group-focus-within:text-orange-500">
                        <span className="label-text font-bold">
                          Phone Number <span className="text-rose-500">*</span>
                        </span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+880 1XXX-XXXXXX"
                        className="input w-full bg-white border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all rounded-xl"
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        value={formData.phone}
                      />
                    </div>
                    <div className="form-control group">
                      <label className="label transition-all group-focus-within:text-orange-500">
                        <span className="label-text font-bold">
                          Current Address{" "}
                          <span className="text-rose-500">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Street, City, Country"
                        className="input w-full bg-white border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all rounded-xl"
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        value={formData.address}
                      />
                    </div>
                  </div>
                </section>

                <section className="mb-12 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                      <Home size={20} />
                    </span>
                    <h3 className="text-2xl font-bold text-slate-800">
                      Living Environment
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-bold">
                          Type of Residence{" "}
                          <span className="text-rose-500">*</span>
                        </span>
                      </label>
                      <select
                        className="select select-bordered bg-slate-50 focus:border-blue-400 transition-all rounded-xl"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            residence: e.target.value,
                          })
                        }
                        value={formData.residence}
                      >
                        <option value="">How is your home?</option>
                        <option>Own Apartment</option>
                        <option>Rented House (Pet Allowed)</option>
                        <option>Villa / Farmhouse</option>
                      </select>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-bold">
                          Fenced Yard / Safe Balcony?{" "}
                          <span className="text-rose-500">*</span>
                        </span>
                      </label>
                      <div className="flex gap-8 mt-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="yard"
                            className="radio radio-primary"
                            onChange={() =>
                              setFormData({ ...formData, yard: "yes" })
                            }
                          />
                          <span className="font-medium text-slate-600">
                            Yes, secured
                          </span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="yard"
                            className="radio radio-primary"
                            onChange={() =>
                              setFormData({ ...formData, yard: "no" })
                            }
                          />
                          <span className="font-medium text-slate-600">
                            No, I do not
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </section>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full h-16 bg-linear-to-r from-orange-500 to-rose-500 rounded-2xl text-white text-xl font-black uppercase tracking-widest shadow-lg hover:-translate-y-1 transition-all"
                >
                  Next: Capability Assessment{" "}
                  <ChevronRight className="inline ml-2" />
                </button>
              </motion.div>
            ) : (
              /* Step 2: Suitability & Capability Quiz */
              <motion.div
                key="step2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
              >
                <div className="mb-10 text-center">
                  <div className="inline-flex p-3 bg-blue-100 text-blue-600 rounded-full mb-4">
                    <HelpCircle size={32} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-800 mb-2">
                    Capability Quiz
                  </h3>
                  <p className="text-slate-500 italic">
                    Please share your lifestyle details for verification
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {/* Q1: Annual Income */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="font-bold text-slate-800 mb-3 text-sm">
                      1. Your Annual Income Range?
                    </p>
                    <select
                      className="select select-bordered w-full bg-slate-50"
                      onChange={(e) =>
                        setQuizData({ ...quizData, income: e.target.value })
                      }
                    >
                      <option value="">Select Range</option>
                      <option>Under $30,000</option>
                      <option>$30,000 - $60,000</option>
                      <option>$60,000+</option>
                    </select>
                  </div>

                  {/* Q2: Daily Time */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="font-bold text-slate-800 mb-3 text-sm">
                      2. Daily time for the pet?
                    </p>
                    <select
                      className="select select-bordered w-full bg-slate-50"
                      onChange={(e) =>
                        setQuizData({ ...quizData, dailyTime: e.target.value })
                      }
                    >
                      <option value="">Select Time</option>
                      <option>Less than 2 hours</option>
                      <option>2 - 5 hours</option>
                      <option>5+ hours (Work from home)</option>
                    </select>
                  </div>

                  {/* Q3: Vacation Plan */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="font-bold text-slate-800 mb-3 text-sm">
                      3. Plan during your vacations?
                    </p>
                    <div className="flex flex-col gap-2">
                      {[
                        "Pet Sitter",
                        "Boarding Center",
                        "Take pet with me",
                      ].map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-2 cursor-pointer text-sm"
                        >
                          <input
                            type="radio"
                            name="vacation"
                            className="radio radio-primary radio-xs"
                            onChange={() =>
                              setQuizData({ ...quizData, vacationPlan: opt })
                            }
                          />{" "}
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Q4: Prior Experience */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="font-bold text-slate-800 mb-3 text-sm">
                      4. Past pet ownership?
                    </p>
                    <div className="flex gap-4">
                      {["First Timer", "Experienced"].map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-2 cursor-pointer text-sm"
                        >
                          <input
                            type="radio"
                            name="experience"
                            className="radio radio-primary radio-xs"
                            onChange={() =>
                              setQuizData({ ...quizData, experience: opt })
                            }
                          />{" "}
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Q5: Emergency Fund */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="font-bold text-slate-800 mb-3 text-sm">
                      5. Set aside for medical emergencies?
                    </p>
                    <div className="flex gap-4">
                      {["Yes", "No"].map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-2 cursor-pointer text-sm"
                        >
                          <input
                            type="radio"
                            name="emergency"
                            className="radio radio-primary radio-xs"
                            onChange={() =>
                              setQuizData({ ...quizData, emergencyFund: opt })
                            }
                          />{" "}
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Q6: Lifetime Commitment */}
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="font-bold text-slate-800 mb-3 text-sm">
                      6. Ready for 10-15 years commitment?
                    </p>
                    <div className="flex gap-4">
                      {["Absolutely", "Not sure"].map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-2 cursor-pointer text-sm"
                        >
                          <input
                            type="radio"
                            name="commitment"
                            className="radio radio-primary radio-xs"
                            onChange={() =>
                              setQuizData({ ...quizData, commitment: opt })
                            }
                          />{" "}
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 max-w-lg mx-auto">
                  <button
                    onClick={handlePrev}
                    className="flex-1 h-16 bg-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-300 flex items-center justify-center gap-2"
                  >
                    <ChevronLeft size={20} /> Back
                  </button>
                  <button
                    onClick={handleComplete}
                    className="flex-2 h-16 bg-linear-to-r from-green-500 to-emerald-600 rounded-2xl text-white font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-2"
                  >
                    Final Submit <CheckCircle2 size={24} />
                  </button>
                </div>
              </motion.div>
            )
          ) : (
            /* Success Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="bg-green-100 text-green-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <CheckCircle2 size={56} />
              </div>
              <h3 className="text-4xl font-black text-slate-800 mb-4">
                Application Sent!
              </h3>
              <p className="text-slate-500 text-lg mb-6 italic">
                Thank you, {formData.fullName}. We will evaluate your profile
                and contact you within 48 hours.
              </p>
              <Link
                href="/"
                className="mt-10 px-8 py-4 bg-slate-800 text-white rounded-2xl font-bold"
              >
                Return Home
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        {!isCompleted && (
          <div className="pt-12 border-t border-gray-200 mt-12 text-center">
            <p className="text-sm text-slate-400 font-medium italic">
              🔒 Verification helps us ensure every pet gets the stable home
              they deserve.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptionForm;