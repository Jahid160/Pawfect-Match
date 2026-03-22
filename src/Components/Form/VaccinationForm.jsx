"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaSyringe, FaPaw, FaArrowLeft, FaPlusCircle,
  FaIndustry, FaHashtag, FaRegCalendarTimes,
  FaImage, FaChevronRight, FaCheckCircle
} from "react-icons/fa";
import { FaBoxesStacked, FaMoneyBill1Wave } from "react-icons/fa6";
import Link from "next/link";
import { addVaccine } from "@/action/server/vaccines";
import toast from "react-hot-toast";

export default function VaccinationForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    vaccineName: "",
    price: "",
    stock: "",
    forPet: "Dogs",
    manufacturer: "",
    batchNumber: "",
    expiryDate: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await addVaccine(formData);

    if (result.success) {
      toast.success("Vaccine registered successfully!");
      router.push("/vaccination");
    } else {
      toast.error("Failed!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4">
      <div className="max-w-xl mx-auto">

        <Link href="/vaccination" className="mb-6 inline-flex items-center gap-2 text-slate-400 hover:text-orange-600 font-bold">
          <FaArrowLeft /> Back
        </Link>

        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-slate-900 p-8 text-white">
            <p className="text-orange-400 text-xs font-bold">Step {step} of 3</p>
            <h2 className="text-2xl font-black">
              {step === 1 && "Basic Info"}
              {step === 2 && "Medical Info"}
              {step === 3 && "Media & Notes"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <InputField label="Vaccine Name" name="vaccineName" icon={<FaSyringe />} value={formData.vaccineName} onChange={handleChange} />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Price" name="price" type="number" icon={<FaMoneyBill1Wave />} value={formData.price} onChange={handleChange} />
                  <InputField label="Stock" name="stock" type="number" icon={<FaBoxesStacked />} value={formData.stock} onChange={handleChange} />
                </div>

                <select name="forPet" value={formData.forPet} onChange={handleChange}
                  className="w-full bg-slate-50 p-4 rounded-2xl font-bold">
                  <option>Dogs</option>
                  <option>Cats</option>
                  <option>Birds</option>
                  <option>All Species</option>
                </select>

                <button type="button" onClick={() => setStep(2)}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl">
                  Continue <FaChevronRight />
                </button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <InputField label="Manufacturer" name="manufacturer" icon={<FaIndustry />} value={formData.manufacturer} onChange={handleChange} />
                <InputField label="Batch Number" name="batchNumber" icon={<FaHashtag />} value={formData.batchNumber} onChange={handleChange} />
                <InputField label="Expiry Date" name="expiryDate" type="date" icon={<FaRegCalendarTimes />} value={formData.expiryDate} onChange={handleChange} />

                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 bg-gray-200 py-4 rounded-2xl">Back</button>
                  <button type="button" onClick={() => setStep(3)} className="flex-1 bg-slate-900 text-white py-4 rounded-2xl">Next</button>
                </div>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <input type="file" onChange={handleImageChange} />

                <textarea name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full bg-slate-50 p-4 rounded-2xl"
                />

                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(2)} className="flex-1 bg-gray-200 py-4 rounded-2xl">Back</button>
                  <button type="submit" className="flex-1 bg-orange-500 text-white py-4 rounded-2xl">
                    {loading ? "Saving..." : "Submit"}
                  </button>
                </div>
              </>
            )}

          </form>
        </div>
      </div>
    </div>
  );
}

/* Input Component */
const InputField = ({ label, icon, name, value, onChange, ...props }) => (
  <div>
    <label className="text-xs font-bold flex gap-2 items-center">
      <span className="text-orange-500">{icon}</span> {label}
    </label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      {...props}
      className="w-full bg-slate-50 p-4 rounded-2xl mt-1"
    />
  </div>
);