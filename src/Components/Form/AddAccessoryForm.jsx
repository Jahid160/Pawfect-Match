"use client";

import { createAccessory } from "@/action/server/accessories";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { FiPackage, FiTruck, FiImage, FiCheckCircle, FiArrowRight, FiArrowLeft, FiUploadCloud } from "react-icons/fi";

const AdminPetForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    sku: "",
    tags: "",
    brand: "",
    targetPet: "All Pets",
    stock: "",
    price: "",
    discountPrice: "",
    weight: "",
    size: "",
    image: null,
    description: "",
    material: "",
    warranty: "",
  });
  const [errors, setErrors] = useState({});

  const validateStep = () => {
    let newErrors = {};
    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = "Title is required!";
      if (!formData.category) newErrors.category = "Category is required!";
      if (!formData.sku.trim()) newErrors.sku = "SKU Code is required!";
      if (!formData.brand.trim()) newErrors.brand = "Brand name is required!";
    } else if (step === 2) {
      if (!formData.stock || formData.stock < 1) newErrors.stock = "Stock must be 1+";
      if (!formData.price || formData.price <= 0) newErrors.price = "Valid Price required!";
      if (formData.discountPrice === "") newErrors.discountPrice = "Required (0 if none)";
      if (!formData.weight.trim()) newErrors.weight = "Weight required!";
      if (!formData.size.trim()) newErrors.size = "Size required!";
      if (!formData.material.trim()) newErrors.material = "Material required!";
      if (!formData.warranty) newErrors.warranty = "Select warranty status!";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => validateStep() && setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    setLoading(true);
    try {
      if (!formData.image) {
        setErrors({ image: "Please upload a product image!" });
        setLoading(false);
        return;
      }

      const uploadToImgBB = async (file) => {
        const uploadFormData = new FormData();
        uploadFormData.append("image", file);
        const res = await fetch("/api/upload", { method: "POST", body: uploadFormData });
        const data = await res.json();
        if (!data.success) throw new Error(data.error || "Upload failed");
        return data.url;
      };

      const imageUrl = await uploadToImgBB(formData.image);
      const finalData = { ...formData, image: imageUrl };

      const response = await createAccessory(finalData);
      if (response.success) {
        setIsSubmitted(true);
      } else {
        Swal.fire({ icon: "error", title: "Error", text: response.error || "Failed!" });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Oops!", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Reusable Classes to match your consistent design
  const inputClass = (field) =>
    `input input-bordered w-full bg-base-50 focus:border-primary transition-all duration-200 ${errors[field] ? "border-error" : "border-base-300"}`;

  const selectClass = (field) =>
    `select select-bordered w-full bg-base-50 focus:border-primary ${errors[field] ? "border-error" : "border-base-300"}`;

  const ErrMsg = ({ field }) =>
    errors[field] ? <span className="mt-1 font-bold text-[10px] text-error uppercase tracking-wider">{errors[field]}</span> : null;

  const stepConfig = [
    { num: 1, label: "Identity", icon: <FiPackage /> },
    { num: 2, label: "Logistics", icon: <FiTruck /> },
    { num: 3, label: "Media", icon: <FiImage /> },
  ];

  if (isSubmitted) {
    return (
      <div className="flex justify-center items-center bg-base-200 p-6 min-h-[80vh]">
        <div className="bg-base-100 shadow-2xl p-10 border-primary border-t-8 rounded-2xl w-full max-w-md text-center">
          <div className="flex justify-center mb-4 text-primary text-7xl animate-bounce">
            <FiCheckCircle />
          </div>
          <h2 className="font-black text-neutral text-3xl">Great Job!</h2>
          <p className="py-4 text-neutral/60 italic">Product `{formData.title}` is now live in your store.</p>
          <button onClick={() => window.location.reload()} className="shadow-lg w-full text-white uppercase tracking-widest btn btn-primary">
            Add Another Item
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-200 px-4 py-10 min-h-screen">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h2 className="font-black text-primary text-4xl uppercase tracking-tight">Add New Accessory</h2>
          <p className="mt-2 text-neutral/50">Fill in the details to list a new pet product</p>
        </div>

        {/* Custom Steps Design */}
        <div className="flex justify-between items-center mb-12 px-4 w-full">
          {stepConfig.map(({ num, label, icon }) => (
            <div key={num} className="relative flex flex-col flex-1 items-center">
              <div className={`z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 transition-all duration-500 ${step >= num ? "bg-primary border-primary text-white shadow-lg shadow-primary/30" : "bg-base-100 border-base-300 text-base-300"}`}>
                {step > num ? <FiCheckCircle className="text-xl" /> : <span className="text-xl">{icon}</span>}
              </div>
              <span className={`mt-2 text-xs font-bold uppercase tracking-widest ${step >= num ? "text-primary" : "text-base-300"}`}>{label}</span>
              {num !== 3 && (
                <div className={`absolute top-6 left-[60%] w-[80%] h-[2px] -z-0 ${step > num ? "bg-primary" : "bg-base-300"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-base-100 shadow-2xl border-none rounded-3xl overflow-hidden transition-all duration-300">
          <form onSubmit={handleSubmit}>
            {/* STEP 1: IDENTITY */}
            {step === 1 && (
              <div className="slide-in-from-right-4 p-8 md:p-12 animate-in fade-in">
                <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                  <div className="md:col-span-2 form-control">
                    <label className="mb-2 font-bold text-neutral label-text">Product Title *</label>
                    <input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className={inputClass("title")}
                      placeholder="e.g. Premium Rubber Chew Toy"
                    />
                    <ErrMsg field="title" />
                  </div>
                  <div className="form-control">
                    <label className="mb-2 font-bold text-neutral label-text">Brand Name *</label>
                    <input
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className={inputClass("brand")}
                      placeholder="Brand X"
                    />
                    <ErrMsg field="brand" />
                  </div>
                  <div className="form-control">
                    <label className="mb-2 font-bold text-neutral label-text">SKU Code *</label>
                    <input
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      className={inputClass("sku")}
                      placeholder="PET-SKU-001"
                    />
                    <ErrMsg field="sku" />
                  </div>
                  <div className="form-control">
                    <label className="mb-2 font-bold text-neutral label-text">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className={selectClass("category")}
                    >
                      <option value="">Select Category</option>
                      <option>Toys</option>
                      <option>Food</option>
                      <option>Accessories</option>
                      <option>Health Care</option>
                    </select>
                    <ErrMsg field="category" />
                  </div>
                  <div className="form-control">
                    <label className="mb-2 font-bold text-neutral label-text">Target Pet</label>
                    <select
                      value={formData.targetPet}
                      onChange={(e) => setFormData({ ...formData, targetPet: e.target.value })}
                      className={selectClass()}
                    >
                      <option>Dogs</option>
                      <option>Cats</option>
                      <option>Birds</option>
                      <option>All Pets</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 form-control">
                    <label className="mb-2 font-bold text-neutral label-text">Search Tags</label>
                    <input
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className={inputClass()}
                      placeholder="organic, toy, durable (separate with commas)"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-10">
                  <button type="button" onClick={nextStep} className="gap-2 shadow-lg px-10 text-white uppercase tracking-widest btn btn-primary">
                    Next Step <FiArrowRight />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: LOGISTICS */}
            {step === 2 && (
              <div className="slide-in-from-right-4 p-8 md:p-12 animate-in fade-in">
                <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
                  <div className="form-control">
                    <label className="mb-2 font-bold text-neutral label-text">Initial Stock *</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className={inputClass("stock")}
                      placeholder="0"
                    />
                    <ErrMsg field="stock" />
                  </div>
                  <div className="form-control">
                    <label className="mb-2 font-bold text-neutral label-text">Price ($) *</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className={inputClass("price")}
                      placeholder="0.00"
                      step="0.01"
                    />
                    <ErrMsg field="price" />
                  </div>
                  <div className="form-control">
                    <label className="mb-2 font-bold text-neutral label-text">Discount Price *</label>
                    <input
                      type="number"
                      value={formData.discountPrice}
                      onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                      className={inputClass("discountPrice")}
                      placeholder="0.00"
                    />
                    <ErrMsg field="discountPrice" />
                  </div>
                  <div className="form-control">
                    <label className="mb-2 font-bold text-neutral label-text">Weight *</label>
                    <input
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className={inputClass("weight")}
                      placeholder="e.g. 500g"
                    />
                    <ErrMsg field="weight" />
                  </div>
                  <div className="form-control">
                    <label className="mb-2 font-bold text-neutral label-text">Dimensions *</label>
                    <input
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      className={inputClass("size")}
                      placeholder="L x W x H"
                    />
                    <ErrMsg field="size" />
                  </div>
                  <div className="form-control">
                    <label className="mb-2 font-bold text-neutral label-text">Material *</label>
                    <input
                      value={formData.material}
                      onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                      className={inputClass("material")}
                      placeholder="e.g. Plastic, Silk"
                    />
                    <ErrMsg field="material" />
                  </div>
                  <div className="md:col-span-3 form-control">
                    <label className="mb-2 font-bold text-neutral label-text">Warranty Info *</label>
                    <select
                      value={formData.warranty}
                      onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                      className={selectClass("warranty")}
                    >
                      <option value="">Select Warranty</option>
                      <option>No Warranty</option>
                      <option>6 Months Replacement</option>
                      <option>1 Year Service Warranty</option>
                    </select>
                    <ErrMsg field="warranty" />
                  </div>
                </div>
                <div className="flex justify-between mt-10">
                  <button type="button" onClick={prevStep} className="gap-2 font-bold uppercase tracking-widest btn btn-ghost">
                    <FiArrowLeft /> Back
                  </button>
                  <button type="button" onClick={nextStep} className="gap-2 shadow-lg px-10 text-white uppercase tracking-widest btn btn-primary">
                    Next Step <FiArrowRight />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: MEDIA */}
            {step === 3 && (
              <div className="slide-in-from-right-4 p-8 md:p-12 animate-in fade-in">
                <div className="form-control">
                  <label className="mb-4 font-bold text-neutral text-center uppercase tracking-widest label-text">Upload Product Visuals</label>
                  
                  <label
                    htmlFor="main-image-upload"
                    className={`relative flex flex-col items-center justify-center w-full h-64 border-4 border-dashed rounded-[2rem] cursor-pointer transition-all duration-300 bg-base-50 group shadow-inner
                    ${errors.image ? "border-error/40 bg-error/5" : "border-primary/20 hover:border-primary hover:bg-primary/5"}`}
                  >
                    {formData.image ? (
                      <div className="flex flex-col items-center text-center">
                         <FiCheckCircle className="mb-2 text-primary text-5xl" />
                         <p className="max-w-xs font-bold text-neutral truncate">{formData.image.name}</p>
                         <p className="text-neutral/40 text-xs">{(formData.image.size / 1024).toFixed(1)} KB — Click to replace</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-center">
                        <div className="flex justify-center items-center bg-primary/10 mb-4 rounded-full w-20 h-20 group-hover:scale-110 transition-transform duration-300">
                          <FiUploadCloud className="text-primary text-3xl" />
                        </div>
                        <p className="font-black text-neutral text-xl">Drop image here</p>
                        <p className="text-neutral/40">or <span className="text-primary underline">browse files</span></p>
                      </div>
                    )}
                    <input id="main-image-upload" type="file" accept="image/*" className="hidden" 
                           onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
                  </label>
                  <div className="mt-2 text-center"><ErrMsg field="image" /></div>
                </div>

                <div className="mt-8 form-control">
                  <label className="mb-2 font-bold text-neutral label-text">Full Description</label>
                  <textarea
                    className="bg-base-50 focus:border-primary h-32 transition-all duration-200 textarea-bordered textarea"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the product benefits, usage, and special features..."
                  />
                </div>

                <div className="flex justify-between mt-10">
                  <button type="button" onClick={prevStep} disabled={loading} className="gap-2 font-bold uppercase tracking-widest btn btn-ghost">
                    <FiArrowLeft /> Back
                  </button>
                  <button type="submit" disabled={loading} className="gap-2 shadow-xl px-12 text-white uppercase tracking-widest btn btn-primary">
                    {loading ? <span className="loading loading-spinner" /> : <><FiCheckCircle /> Publish Product</>}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPetForm;