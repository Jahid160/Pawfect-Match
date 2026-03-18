"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  Save,
  X,
  PawPrint,
  ShieldCheck,
  User,
  Phone,
  Mail,
  MapPin,
  Activity,
} from "lucide-react";
import { updatePet } from "@/action/server/pets";

const PetEdit = ({ petData }) => {
  const [formData, setFormData] = useState(petData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await updatePet(petData._id, formData);

      if (result.success) {
        Swal.fire("Success", "Pet data updated successfully!", "success");
        router.push("/dashboard/manage-pets");
        router.refresh();
      } else {
        Swal.fire("Error", result.message || "Failed to update", "error");
      }
    } catch (error) {
      console.error("Update Error:", error);
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-10 font-sans text-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight">
              Edit <span className="text-orange-500">Pet Profile</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm">
              ID: {formData._id}
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 md:flex-none px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <X size={18} /> Cancel
            </button>
            <button
              type="submit"
              form="pet-edit-form"
              disabled={isSubmitting}
              className={`flex-1 md:flex-none px-6 py-3 ${isSubmitting ? "bg-slate-400" : "bg-orange-500 hover:bg-slate-900"} text-white rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg transition-all`}
            >
              <Save size={18} /> {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <form id="pet-edit-form" className="space-y-8" onSubmit={handleSubmit}>
          {/* Section 1: Identity & Appearance */}
          <FormSection
            title="Identity & Appearance"
            icon={<PawPrint size={20} />}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                label="Pet Name"
                name="petName"
                value={formData.petName}
                onChange={handleChange}
              />
              <Select
                label="Species"
                name="species"
                value={formData.species}
                options={["Dog", "Cat", "Bird", "Rabbit"]}
                onChange={handleChange}
              />
              <Input
                label="Breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Age (Years)"
                  name="ageYears"
                  type="number"
                  value={formData.ageYears}
                  onChange={handleChange}
                />
                <Input
                  label="Age (Months)"
                  name="ageMonths"
                  type="number"
                  value={formData.ageMonths}
                  onChange={handleChange}
                />
              </div>
              <Select
                label="Gender"
                name="gender"
                value={formData.gender}
                options={["Male", "Female"]}
                onChange={handleChange}
              />
              <Input
                label="Color"
                name="color"
                value={formData.color}
                onChange={handleChange}
              />
              <Input
                label="Markings"
                name="markings"
                value={formData.markings}
                onChange={handleChange}
              />
              <Select
                label="Size"
                name="size"
                value={formData.size}
                options={["Small", "Medium", "Large", "Extra Large"]}
                onChange={handleChange}
              />
              <Input
                label="Weight (kg)"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
          </FormSection>

          {/* Section 2: Health Status */}
          <FormSection
            title="Health & Medical"
            icon={<ShieldCheck size={20} />}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Select
                label="Vaccinated"
                name="vaccinated"
                value={formData.vaccinated}
                options={["Yes", "No"]}
                onChange={handleChange}
              />
              <Select
                label="Neutered"
                name="neutered"
                value={formData.neutered}
                options={["Yes", "No"]}
                onChange={handleChange}
              />
              <Select
                label="Microchipped"
                name="microchipped"
                value={formData.microchipped}
                options={["Yes", "No"]}
                onChange={handleChange}
              />
              <Input
                label="Health Condition"
                name="healthCondition"
                value={formData.healthCondition}
                onChange={handleChange}
              />
              <div className="md:col-span-2">
                <TextArea
                  label="Medical History"
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                />
              </div>
              <div className="md:col-span-2">
                <TextArea
                  label="Special Needs"
                  name="specialNeeds"
                  value={formData.specialNeeds}
                  onChange={handleChange}
                />
              </div>
            </div>
          </FormSection>

          {/* Section 3: Behavior & Lifestyle */}
          <FormSection
            title="Behavior & Lifestyle"
            icon={<Activity size={20} />}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Select
                label="Good With Kids"
                name="goodWithKids"
                value={formData.goodWithKids}
                options={["Yes", "No"]}
                onChange={handleChange}
              />
              <Select
                label="Activity Level"
                name="activityLevel"
                value={formData.activityLevel}
                options={["Low", "Medium", "High"]}
                onChange={handleChange}
              />
              <Select
                label="Indoor/Outdoor"
                name="indoorOutdoor"
                value={formData.indoorOutdoor}
                options={["Indoor", "Outdoor", "Both"]}
                onChange={handleChange}
              />
              <Select
                label="House Trained"
                name="houseTrained"
                value={formData.houseTrained}
                options={["Yes", "No"]}
                onChange={handleChange}
              />
              <Input
                label="Time With Owner"
                name="timeWithOwner"
                value={formData.timeWithOwner}
                onChange={handleChange}
              />
              <Input
                label="Adoption Fee ($)"
                name="adoptionFee"
                type="number"
                value={formData.adoptionFee}
                onChange={handleChange}
              />
              <div className="md:col-span-3">
                <TextArea
                  label="Reason For Adoption"
                  name="reasonForAdoption"
                  value={formData.reasonForAdoption}
                  onChange={handleChange}
                />
              </div>
            </div>
          </FormSection>

          {/* Section 4: Contact Information */}
          <FormSection title="Contact Information" icon={<User size={20} />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Owner/Shelter Name"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
              />
              <Select
                label="Owner Type"
                name="ownerType"
                value={formData.ownerType}
                options={["Individual", "Shelter / NGO"]}
                onChange={handleChange}
              />
              <Input
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                icon={<Phone size={14} />}
              />
              <Input
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                icon={<Mail size={14} />}
                readOnly
              />
              <div className="md:col-span-2">
                <Input
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  icon={<MapPin size={14} />}
                />
              </div>
            </div>
          </FormSection>
        </form>
      </motion.div>
    </div>
  );
};

// --- Helper Components (Keep these at the bottom of the file) ---

const FormSection = ({ title, icon, children }) => (
  <section className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
    <div className="px-8 py-5 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
      <div className="p-2 bg-white rounded-lg shadow-sm text-orange-500">
        {icon}
      </div>
      <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">
        {title}
      </h3>
    </div>
    <div className="p-8">{children}</div>
  </section>
);

const Input = ({ label, icon, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>
      )}
      <input
        className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-4 ${icon ? "pl-10" : ""} py-3 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all`}
        {...props}
      />
    </div>
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
      {label}
    </label>
    <select
      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all cursor-pointer"
      {...props}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const TextArea = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
      {label}
    </label>
    <textarea
      rows="3"
      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all resize-none"
      {...props}
    />
  </div>
);

export default PetEdit;
