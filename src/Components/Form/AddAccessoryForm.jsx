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
      if (!formData.stock || formData.stock < 1)
        newErrors.stock = "Stock must be 1 or more!";
      if (!formData.price || formData.price <= 0)
        newErrors.price = "Valid Price is required!";
      if (formData.discountPrice === "")
        newErrors.discountPrice = "Discount Price is required! (Put 0 if none)";
      if (!formData.weight.trim()) newErrors.weight = "Weight is required!";
      if (!formData.size.trim()) newErrors.size = "Size is required!";
      if (!formData.material.trim())
        newErrors.material = "Material is required!";
      if (!formData.warranty)
        newErrors.warranty = "Please select warranty status!";
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
        setErrors({ image: "Mandatory: Please upload a product image!" });
        setLoading(false);
        return;
      }
      const uploadFormData = new FormData();
      uploadFormData.append("image", formData.image);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Upload failed");
      const finalData = { ...formData, image: data.url };
      const response = await createAccessory(finalData);
      if (response.success) {
        setIsSubmitted(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.error || "Failed to publish!",
        });
      }
    } catch (err) {
      alert(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `input input-bordered w-full ${errors[field] ? "input-error" : ""}`;

  const selectClass = (field) =>
    `select select-bordered w-full ${errors[field] ? "select-error" : ""}`;

  const ErrMsg = ({ field }) =>
    errors[field] ? (
      <span className="text-error text-xs mt-1 font-bold">{errors[field]}</span>
    ) : null;

  const stepConfig = [
    { num: 1, label: "Identity" },
    { num: 2, label: "Logistics" },
    { num: 3, label: "Media" },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
        <div className="card w-full max-w-md bg-base-100 shadow-2xl text-center p-10 border-b-8 border-primary">
          <div className="text-7xl mb-4">✨</div>
          <h2 className="text-3xl font-black text-neutral">SUCCESS!</h2>
          <p className="py-4 text-neutral/60 italic">
            Product `{formData.title}` is added!
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
      </h2>

      <div className="max-w-4xl mx-auto">
        {/* Step Bar */}
        <ul className="steps w-full mb-10">
          {stepConfig.map(({ num, label }) => (
            <li
              key={num}
              className={`step ${step >= num ? "step-primary font-bold" : ""}`}
            >
              {label}
            </li>
          ))}
        </ul>

        <div className="card bg-base-100 shadow-xl border border-base-300">
          <form onSubmit={handleSubmit}>
            {/* STEP 1: Identity */}
            {step === 1 && (
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text font-bold">
                        Product Title *
                      </span>
                    </label>
                    <input
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className={inputClass("title")}
                      placeholder="Title"
                    />
                    <ErrMsg field="title" />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Brand *</span>
                    </label>
                    <input
                      value={formData.brand}
                      onChange={(e) =>
                        setFormData({ ...formData, brand: e.target.value })
                      }
                      className={inputClass("brand")}
                      placeholder="Brand Name"
                    />
                    <ErrMsg field="brand" />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">SKU Code *</span>
                    </label>
                    <input
                      value={formData.sku}
                      onChange={(e) =>
                        setFormData({ ...formData, sku: e.target.value })
                      }
                      className={inputClass("sku")}
                      placeholder="SKU-001"
                    />
                    <ErrMsg field="sku" />
                  </div>

                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text font-bold">Tags</span>
                    </label>
                    <input
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      className="input input-bordered w-full"
                      placeholder="e.g. funny, toy, organic (comma separated)"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Category *</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className={selectClass("category")}
                    >
                      <option value="">Select Category</option>
                      <option>Toys</option>
                      <option>Food</option>
                      <option>Accessories</option>
                    </select>
                    <ErrMsg field="category" />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Targeted Pet</span>
                    </label>
                    <select
                      value={formData.targetPet}
                      onChange={(e) =>
                        setFormData({ ...formData, targetPet: e.target.value })
                      }
                      className="select select-bordered w-full"
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
                    className="btn btn-primary px-12 text-white"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Logistics & Pricing */}
            {step === 2 && (
              <div className="card-body bg-secondary/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Stock *</span>
                    </label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      className={inputClass("stock")}
                      placeholder="0"
                      min="1"
                    />
                    <ErrMsg field="stock" />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Price *</span>
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className={inputClass("price")}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                    <ErrMsg field="price" />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">
                        Discount Price *
                      </span>
                    </label>
                    <input
                      type="number"
                      value={formData.discountPrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          discountPrice: e.target.value,
                        })
                      }
                      className={inputClass("discountPrice")}
                      placeholder="0"
                      min="0"
                    />
                    <ErrMsg field="discountPrice" />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Weight *</span>
                    </label>
                    <input
                      value={formData.weight}
                      onChange={(e) =>
                        setFormData({ ...formData, weight: e.target.value })
                      }
                      className={inputClass("weight")}
                      placeholder="e.g. 500g"
                    />
                    <ErrMsg field="weight" />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Size *</span>
                    </label>
                    <input
                      value={formData.size}
                      onChange={(e) =>
                        setFormData({ ...formData, size: e.target.value })
                      }
                      className={inputClass("size")}
                      placeholder="e.g. Large / 10x12"
                    />
                    <ErrMsg field="size" />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold">Material *</span>
                    </label>
                    <input
                      value={formData.material}
                      onChange={(e) =>
                        setFormData({ ...formData, material: e.target.value })
                      }
                      className={inputClass("material")}
                      placeholder="e.g. Cotton"
                    />
                    <ErrMsg field="material" />
                  </div>

                  <div className="form-control md:col-span-3">
                    <label className="label">
                      <span className="label-text font-bold">Warranty *</span>
                    </label>
                    <select
                      value={formData.warranty}
                      onChange={(e) =>
                        setFormData({ ...formData, warranty: e.target.value })
                      }
                      className={selectClass("warranty")}
                    >
                      <option value="">Select Warranty</option>
                      <option>No Warranty</option>
                      <option>6 Months</option>
                      <option>1 Year</option>
                    </select>
                    <ErrMsg field="warranty" />
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
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Main Image *</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.files[0] })
                    }
                    className={`file-input file-input-bordered file-input-primary w-full ${
                      errors.image ? "file-input-error" : ""
                    }`}
                  />
                  <ErrMsg field="image" />
                </div>

                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text font-bold">Description</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-28"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Write a short product description..."
                  />
                </div>

                <div className="card-actions justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={loading}
                    className="btn btn-ghost"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary px-16 text-white"
                  >
                    {loading ? (
                      <span className="loading loading-spinner" />
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
