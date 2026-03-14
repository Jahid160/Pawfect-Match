"use client";

import { createAccessory } from "@/action/server/accessories";
import React, { useState } from "react";
import Swal from "sweetalert2";

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
    targetPet: "All",
    stock: "",
    price: "",
    discountPrice: "",
    weight: "",
    size: "",
    image: null,
    description: "",
    material: "",
    warranty: "No Warranty",
  });

  const [errors, setErrors] = useState({});

  const validateStep = () => {
    let newErrors = {};
    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = "Title is required!";
      if (!formData.category) newErrors.category = "Category is required!";
      if (!formData.sku.trim())
        newErrors.sku = "SKU Code is required for tracking!";
    } else if (step === 2) {
      if (!formData.stock || formData.stock < 1)
        newErrors.stock = "Stock must be 1 or more!";
      if (!formData.price || formData.price <= 0)
        newErrors.price = "Valid Price is required!";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => validateStep() && setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // image add 
      if (!formData.image) {
        setErrors({ image: "Mandatory: Please upload a product image!" });
        setLoading(false);
        return;
      }

      //  (Internal API call)
      const uploadToImgBB = async (file) => {
        const uploadFormData = new FormData();
        uploadFormData.append("image", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        const data = await res.json();
        if (!data.success) throw new Error(data.error || "Upload failed");
        return data.url; //  get ImgBB  URL
      };

      //  collect form data and upload image to get URL
      const imageUrl = await uploadToImgBB(formData.image);

      //  Image url make 
      const finalData = {
        ...formData,
        image: imageUrl, // File from state change to URL from ImgBB
      };

      //  MongoDB create accessory (Internal API call)
      const response = await createAccessory(finalData);

      if (response.success) {
        setIsSubmitted(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.error || "Failed to publish product!",
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong!");
    } finally {
      setLoading(false); // loading state reset after operation completes
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
        <div className="card w-full max-w-md bg-base-100 shadow-2xl text-center p-10 border-b-8 border-primary animate-pulse">
          <div className="text-7xl mb-4">✨</div>
          <h2 className="text-3xl font-black text-neutral">SUCCESS!</h2>
          <p className="py-4 text-neutral/60 italic">
            Product `{formData.title}` is now added with SKU: {formData.sku}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary text-white w-full"
          >
            Add New Item
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <h2 className="text-primary text-3xl pb-5 font-bold text-center">
        Add New Accessory
      </h2>{" "}
      <div className="max-w-4xl mx-auto">
        {/* Step Indicator */}
        <div className="steps w-full mb-10">
          <li className={`step ${step >= 1 ? "step-primary font-bold" : ""}`}>
            Identity
          </li>
          <li className={`step ${step >= 2 ? "step-primary font-bold" : ""}`}>
            Logistics
          </li>
          <li className={`step ${step >= 3 ? "step-primary font-bold" : ""}`}>
            Media
          </li>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-300">
          <form onSubmit={handleSubmit}>
            {/* STEP 1: Identity */}
            {step === 1 && (
              <div className="card-body">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-primary border-l-4 border-primary pl-3">
                    Product Identity
                  </h3>
                  <p className="text-sm text-base-content/60 pl-4">
                    Provide basic information about the product to get started.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text font-bold">
                        Product Title <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      name="title"
                      value={formData.title}
                      onChange={(e) => {
                        setFormData({ ...formData, title: e.target.value });
                        setErrors({ ...errors, title: "" });
                      }}
                      className={`input input-bordered ${errors.title ? "border-error bg-error/5" : "focus:border-primary"}`}
                      placeholder="e.g. Ultra-Soft Pet Bed"
                    />
                    {errors.title && (
                      <span className="text-error text-xs mt-1 font-bold">
                        {errors.title}
                      </span>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">
                        SKU Code (Unique ID){" "}
                        <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      name="sku"
                      value={formData.sku}
                      onChange={(e) => {
                        setFormData({ ...formData, sku: e.target.value });
                        setErrors({ ...errors, sku: "" });
                      }}
                      className={`input input-bordered ${errors.sku ? "border-error" : ""}`}
                      placeholder="e.g. PET-BD-001"
                    />
                    {errors.sku && (
                      <span className="text-error text-xs mt-1 font-bold">
                        {errors.sku}
                      </span>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">
                        Category <span className="text-error">*</span>
                      </span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={(e) => {
                        setFormData({ ...formData, category: e.target.value });
                        setErrors({ ...errors, category: "" });
                      }}
                      className={`select select-bordered ${errors.category ? "border-error" : ""}`}
                    >
                      <option value="">Select Category</option>
                      <option>Toys</option>
                      <option>Food</option>
                      <option>Accessories</option>
                    </select>
                    {errors.category && (
                      <span className="text-error text-xs mt-1 font-bold">
                        {errors.category}
                      </span>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">
                        Product Tags (Keywords)
                      </span>
                    </label>
                    <input
                      name="tags"
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      className="input input-bordered"
                      placeholder="e.g. eco-friendly, summer"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Targeted Pet</span>
                    </label>
                    <select
                      name="targetPet"
                      className="select select-bordered"
                      onChange={(e) =>
                        setFormData({ ...formData, targetPet: e.target.value })
                      }
                    >
                      <option>Dogs</option>
                      <option>Cats</option>
                      <option>All Pets</option>
                    </select>
                  </div>
                </div>
                <div className="card-actions justify-end mt-8">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn btn-primary px-12 text-white shadow-lg"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Logistics & Pricing */}
            {step === 2 && (
              <div className="card-body bg-secondary/5">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-primary border-l-4 border-primary pl-3">
                    Logistics & Pricing
                  </h3>
                  <p className="text-sm text-base-content/60 pl-4">
                    Define stock levels and pricing strategy for your inventory.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">
                        Stock Level <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="number"
                      name="stock"
                      onChange={(e) => {
                        setFormData({ ...formData, stock: e.target.value });
                        setErrors({ ...errors, stock: "" });
                      }}
                      className={`input input-bordered ${errors.stock ? "border-error" : ""}`}
                      placeholder="0"
                    />
                    {errors.stock && (
                      <span className="text-error text-xs mt-1 font-bold">
                        {errors.stock}
                      </span>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">
                        Regular Price <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      onChange={(e) => {
                        setFormData({ ...formData, price: e.target.value });
                        setErrors({ ...errors, price: "" });
                      }}
                      className={`input input-bordered ${errors.price ? "border-error" : ""}`}
                      placeholder="$ 0.00"
                    />
                    {errors.price && (
                      <span className="text-error text-xs mt-1 font-bold">
                        {errors.price}
                      </span>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">
                        Discount Price
                      </span>
                    </label>
                    <input
                      type="number"
                      name="discountPrice"
                      className="input input-bordered"
                      placeholder="Optional"
                    />
                  </div>
                </div>
                <div className="card-actions justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn btn-ghost"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn btn-primary px-12 text-white"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Media & Finalize */}
            {step === 3 && (
              <div className="card-body">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-primary border-l-4 border-primary pl-3">
                    Media & Details
                  </h3>
                  <p className="text-sm text-base-content/60 pl-4">
                    Upload high-quality images and add a descriptive overview.
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold uppercase text-xs tracking-widest">
                        Main Product Image <span className="text-error">*</span>
                      </span>
                    </label>
                    <input
                      type="file"
                      onChange={(e) => {
                        setFormData({ ...formData, image: e.target.files[0] });
                        setErrors({ ...errors, image: "" });
                      }}
                      className={`file-input file-input-bordered file-input-primary w-full ${errors.image ? "file-input-error" : ""}`}
                    />
                    {errors.image && (
                      <p className="text-error text-xs mt-1 font-bold">
                        {errors.image}
                      </p>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">
                        Full Product Description
                      </span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered h-28"
                      placeholder="Enter all details here..."
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                </div>
                <div className="card-actions justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    // loading state diable button to prevent multiple submissions
                    disabled={loading}
                    className="btn btn-ghost text-neutral"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    // loading state diable button to prevent multiple submissions
                    disabled={loading}
                    className="btn btn-primary px-16 text-white shadow-xl"
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Publishing...
                      </>
                    ) : (
                      "Complete & Publish"
                    )}
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