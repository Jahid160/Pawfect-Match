import React from "react";
import { User, Home, Heart, Phone, Mail, MapPin, PawPrint } from "lucide-react"; // আইকন ব্যবহারের জন্য

const AdoptionForm = () => {
  return (
    <div className="max-w-4xl mx-auto my-16 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden border border-gray-100">
      {/* Dynamic Header Section */}
      <div className="relative bg-gradient-to-r from-orange-400 to-rose-500 p-10 text-center overflow-hidden">
        <div className="absolute top-[-20px] right-[-20px] opacity-10 text-white">
          <PawPrint size={150} />
        </div>
        <h2 className="relative text-4xl font-extrabold text-white mb-2 tracking-tight">
          Adopt a New Family Member 🐾
        </h2>
        <p className="relative text-white/90 font-light text-lg italic">
          "Saving one dog will not change the world, but surely for that one
          dog, the world will change forever."
        </p>
      </div>

      <form className="p-8 lg:p-14 bg-slate-50/30 backdrop-blur-sm">
        {/* Section 1: Personal Profile */}
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
                <span className="label-text font-bold flex items-center gap-2">
                  Full Name
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input w-full bg-white border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all rounded-xl"
                />
              </div>
            </div>

            <div className="form-control group">
              <label className="label transition-all group-focus-within:text-orange-500">
                <span className="label-text font-bold">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="hello@trusted.com"
                className="input w-full bg-white border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all rounded-xl"
              />
            </div>

            <div className="form-control group">
              <label className="label transition-all group-focus-within:text-orange-500">
                <span className="label-text font-bold">Phone Number</span>
              </label>
              <input
                type="tel"
                placeholder="+880 1XXX-XXXXXX"
                className="input w-full bg-white border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all rounded-xl"
              />
            </div>

            <div className="form-control group">
              <label className="label transition-all group-focus-within:text-orange-500">
                <span className="label-text font-bold">Current Address</span>
              </label>
              <input
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
            <h3 className="text-2xl font-bold text-slate-800">
              Living Environment
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Type of Residence</span>
              </label>
              <select className="select select-bordered bg-slate-50 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl">
                <option disabled selected>
                  How is your home?
                </option>
                <option>Own Apartment</option>
                <option>Rented House (Pet Allowed)</option>
                <option>Villa / Farmhouse</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">
                  Fenced Yard / Safe Balcony?
                </span>
              </label>
              <div className="flex gap-8 mt-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="yard"
                    className="radio radio-primary transition-transform group-hover:scale-110"
                  />
                  <span className="font-medium text-slate-600">
                    Yes, secured
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="yard"
                    className="radio radio-primary transition-transform group-hover:scale-110"
                  />
                  <span className="font-medium text-slate-600">
                    No, I don't
                  </span>
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
            <h3 className="text-2xl font-bold text-slate-800">
              Heart-to-Heart
            </h3>
          </div>

          <div className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold italic text-slate-500">
                  Why do you want to bring this soul home?
                </span>
              </label>
              <textarea
                className="textarea ml-8 textarea-bordered bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-100 transition-all rounded-2xl h-32 leading-relaxed"
                placeholder="Share your love for animals and your reason for adoption..."
              ></textarea>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">
                  Other furry friends at home?
                </span>
              </label>
              <input
                type="text"
                placeholder="e.g. A golden retriever and two cats"
                className="input ml-8 input-bordered bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-100 transition-all rounded-xl"
              />
            </div>
          </div>
        </section>

        {/* CTA Button */}
        <div className="pt-8">
          <button
            type="button"
            className="group relative w-full h-16 bg-gradient-to-r from-orange-500 to-rose-500 rounded-2xl text-white text-xl font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(244,114,182,0.4)] hover:shadow-[0_15px_40px_rgba(244,114,182,0.6)] hover:-translate-y-1 transition-all active:scale-[0.98] overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              Send Adoption Application <PawPrint size={24} />
            </span>
          </button>
          <div className="flex flex-col items-center mt-6">
            <p className="text-sm text-slate-400 font-medium">
              🔒 Your data is safe and will only be used for adoption
              verification.
            </p>
            <p className="text-xs text-slate-400 mt-1 italic uppercase tracking-tighter">
              * By submitting, you pledge to provide a forever home full of
              care.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdoptionForm;
