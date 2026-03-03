"use client"

import { useState } from "react";
import { User, Home, Heart, Phone, Mail, MapPin, PawPrint } from "lucide-react";
import { createAdoptionUser } from "@/action/server/Adoptionuser";

const AdoptionForm = () => {
  // ১. সব ডেটা রাখার জন্য একটি state ডিক্লেয়ার করা
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    residenceType: "",
    hasYard: "",
    motivation: "",
    otherPets: "",
  });

  // ২. ইনপুট চেঞ্জ হলে state আপডেট করার ফাংশন
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    createAdoptionUser(formData)
  };

  return (
    <div className="max-w-4xl mx-auto my-16 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden border border-gray-100">
      <div className="relative bg-gradient-to-r from-orange-400 to-rose-500 p-10 text-center overflow-hidden">
        <div className="absolute top-[-20px] right-[-20px] opacity-10 text-white">
          <PawPrint size={150} />
        </div>
        <h2 className="relative text-4xl font-extrabold text-white mb-2 tracking-tight">
          Adopt a New Family Member 🐾
        </h2>
        <p className="relative text-white/90 font-light text-lg italic">
          "Saving one dog will not change the world, but surely for that one dog, the world will change forever."
        </p>
      </div>

      <form onSubmit={handleSubmission} className="p-8 lg:p-14 bg-slate-50/30 backdrop-blur-sm">
        {/* Section 1: Personal Profile */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
            <span className="p-2 bg-orange-100 text-orange-600 rounded-lg">
              <User size={20} />
            </span>
            <h3 className="text-2xl font-bold text-slate-800">Guardian Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control group">
              <label className="label"><span className="label-text font-bold">Full Name</span></label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="John Doe"
                className="input w-full bg-white border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all rounded-xl"
                required
              />
            </div>

            <div className="form-control group">
              <label className="label"><span className="label-text font-bold">Email Address</span></label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="hello@trusted.com"
                className="input w-full bg-white border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all rounded-xl"
                required
              />
            </div>

            <div className="form-control group">
              <label className="label"><span className="label-text font-bold">Phone Number</span></label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="+880 1XXX-XXXXXX"
                className="input w-full bg-white border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all rounded-xl"
              />
            </div>

            <div className="form-control group">
              <label className="label"><span className="label-text font-bold">Current Address</span></label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                type="text"
                placeholder="Street, City, Country"
                className="input w-full bg-white border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all rounded-xl"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Environment */}
        <section className="mb-12 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <span className="p-2 bg-orange-100 text-orange-600 rounded-lg">
              <Home size={20} />
            </span>
            <h3 className="text-2xl font-bold text-slate-800">Living Environment</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Type of Residence</span></label>
              <select
                name="residenceType"
                value={formData.residenceType}
                onChange={handleChange}
                className="select select-bordered bg-slate-50 transition-all rounded-xl"
              >
                <option value="">How is your home?</option>
                <option value="Own Apartment">Own Apartment</option>
                <option value="Rented House">Rented House (Pet Allowed)</option>
                <option value="Villa">Villa / Farmhouse</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Fenced Yard / Safe Balcony?</span></label>
              <div className="flex gap-8 mt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="hasYard"
                    value="yes"
                    onChange={handleChange}
                    className="radio radio-primary"
                  />
                  <span className="font-medium text-slate-600">Yes</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="hasYard"
                    value="no"
                    onChange={handleChange}
                    className="radio radio-primary"
                  />
                  <span className="font-medium text-slate-600">No</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Motivation */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
            <span className="p-2 bg-rose-100 text-rose-600 rounded-lg">
              <Heart size={20} />
            </span>
            <h3 className="text-2xl font-bold text-slate-800">Heart-to-Heart</h3>
          </div>

          <div className="space-y-6">
            <div className="form-control">
              <label className="label"><span className="label-text font-bold italic text-slate-500">Why do you want to bring this soul home?</span></label>
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                className="textarea textarea-bordered bg-white focus:border-rose-400 transition-all rounded-2xl h-32"
                placeholder="Share your love for animals..."
              ></textarea>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Other furry friends at home?</span></label>
              <input
                name="otherPets"
                value={formData.otherPets}
                onChange={handleChange}
                type="text"
                placeholder="e.g. A golden retriever and two cats"
                className="input input-bordered bg-white focus:border-rose-400 transition-all rounded-xl"
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="group relative w-full h-16 bg-gradient-to-r from-orange-500 to-rose-500 rounded-2xl text-white text-xl font-black uppercase tracking-widest shadow-lg hover:-translate-y-1 transition-all active:scale-[0.98]"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            Send Adoption Application <PawPrint size={24} />
          </span>
        </button>
      </form>
    </div>
  );
};

export default AdoptionForm;