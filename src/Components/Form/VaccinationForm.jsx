"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSyringe, FaPaw, FaArrowLeft, FaPlusCircle, FaIndustry, FaHashtag, FaRegCalendarTimes, FaFileAlt, FaImage, FaChevronRight, FaCheckCircle } from "react-icons/fa";
import { FaBoxesStacked, FaMoneyBill1Wave } from "react-icons/fa6";
import Link from "next/link";
import { addVaccine } from "@/action/server/vaccines";
import toast from "react-hot-toast";

export default function VaccinationForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const vaccineData = {
      vaccineName: formData.get("vaccineName"), // Input name="vaccineName"
      price: formData.get("price"),
      stock: formData.get("stock"),
      forPet: formData.get("forPet"),
      manufacturer: formData.get("manufacturer"),
      batchNumber: formData.get("batchNumber"),
      expiryDate: formData.get("expiryDate"),
      description: formData.get("description"),
      image: image, 
    };

    const result = await addVaccine(vaccineData);
    if (result.success) {
      toast.success("Vaccine registered successfully!");
      router.refresh();
      router.push("/vaccination");
    } else {
      toast.error("Failed to save data");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4">
      <div className="max-w-xl mx-auto">
        <Link href="/vaccination" className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-600 font-bold mb-8 transition-all group">
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Inventory
        </Link>

        <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
          <div className="bg-slate-900 p-10 text-white relative">
            <div className="flex items-center gap-3 mb-3">
                <div className="bg-orange-500 p-2 rounded-xl"><FaPlusCircle className="text-white" /></div>
                <span className="text-orange-400 font-black text-[10px] uppercase tracking-[4px]">Step {step} of 3</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight">
                {step === 1 ? "Basic Info" : step === 2 ? "Medical Details" : "Media & Notes"}
            </h2>
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-800">
                <div className="h-full bg-orange-500 transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-10">
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <InputField label="Vaccine Name" name="vaccineName" icon={<FaSyringe/>} placeholder="e.g. DHPP Vaccine" required />
                <div className="grid grid-cols-2 gap-5">
                    <InputField label="Price ($)" name="price" type="number" icon={<FaMoneyBill1Wave/>} placeholder="0.00" required />
                    <InputField label="Stock" name="stock" type="number" icon={<FaBoxesStacked/>} placeholder="0" required />
                </div>
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase flex items-center gap-2"><FaPaw className="text-orange-500" /> Target Species</label>
                    <select name="forPet" className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-orange-500/10 transition-all appearance-none cursor-pointer">
                        <option>Dogs</option>
                        <option>Cats</option>
                        <option>Birds</option>
                        <option>All Species</option>
                    </select>
                </div>
                <button type="button" onClick={() => setStep(2)} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-orange-600 transition-all">Continue <FaChevronRight/></button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <InputField label="Manufacturer" name="manufacturer" icon={<FaIndustry/>} placeholder="e.g. Zoetis" required />
                <InputField label="Batch ID" name="batchNumber" icon={<FaHashtag/>} placeholder="BATCH-123" required />
                <InputField label="Expiry Date" name="expiryDate" type="date" icon={<FaRegCalendarTimes/>} required />
                <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 bg-slate-100 py-5 rounded-2xl font-black">Back</button>
                    <button type="button" onClick={() => setStep(3)} className="flex-[2] bg-slate-900 text-white py-5 rounded-2xl font-black">Next Step</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase flex items-center gap-2"><FaImage className="text-orange-500" /> Image</label>
                    <div className={`relative w-full h-48 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center overflow-hidden ${image ? 'border-orange-500 bg-orange-50/20' : 'border-slate-100 bg-slate-50'}`}>
                        {image ? <img src={image} className="w-full h-full object-contain p-2" /> : <FaImage size={30} className="text-slate-200" />}
                        <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                </div>
                <textarea name="description" rows="3" placeholder="Description..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold outline-none"></textarea>
                <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(2)} className="flex-1 bg-slate-100 py-5 rounded-2xl font-black">Back</button>
                    <button type="submit" disabled={loading} className="flex-[2] bg-orange-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:bg-orange-600">
                        {loading ? "Registering..." : <><FaCheckCircle/> Complete Setup</>}
                    </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

const InputField = ({ label, icon, ...props }) => (
    <div className="space-y-2">
        <label className="text-[11px] font-black text-slate-400 uppercase flex items-center gap-2"><span className="text-orange-500">{icon}</span> {label}</label>
        <input {...props} className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-orange-500/10 transition-all" />
    </div>
);