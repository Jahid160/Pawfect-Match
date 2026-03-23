"use client"

import React from "react";
import { motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";

const EditFoodModal = ({ formData, updating, onClose, onChange, onUpdate }) => {
  return (
    <div className="z-[100] fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-base-100 shadow-2xl p-8 lg:p-12 rounded-[2.5rem] w-full max-w-3xl my-auto"
      >
        <button onClick={onClose} className="top-6 right-6 absolute text-slate-400 hover:text-primary transition-colors">
          <X size={24} />
        </button>

        <h3 className="mb-8 font-black text-2xl italic uppercase tracking-tighter">
          Edit <span className="text-primary">Product Info</span>
        </h3>

        <form onSubmit={onUpdate} className="gap-5 grid grid-cols-1 md:grid-cols-2">
          <div className="md:col-span-2 form-control">
            <label className="opacity-50 font-black text-[10px] uppercase tracking-widest label">Product Name</label>
            <input 
              name="productName" 
              value={formData.productName} 
              onChange={onChange} 
              className="bg-base-200 border-none rounded-2xl ring-primary/20 focus:ring-2 font-bold input w-full" 
            />
          </div>

          <div className="form-control">
            <label className="opacity-50 font-black text-[10px] uppercase tracking-widest label">Brand</label>
            <input name="brand" value={formData.brand} onChange={onChange} className="bg-base-200 border-none rounded-2xl ring-primary/20 focus:ring-2 font-bold input w-full" />
          </div>
          <div className="form-control">
            <label className="opacity-50 font-black text-[10px] uppercase tracking-widest label">Category</label>
            <input name="category" value={formData.category} onChange={onChange} className="bg-base-200 border-none rounded-2xl ring-primary/20 focus:ring-2 font-bold input w-full" />
          </div>

          <div className="form-control">
            <label className="opacity-50 font-black text-[10px] uppercase tracking-widest label">Food Type</label>
            <input name="foodType" value={formData.foodType} onChange={onChange} className="bg-base-200 border-none rounded-2xl ring-primary/20 focus:ring-2 font-bold input w-full" />
          </div>
          <div className="form-control">
            <label className="opacity-50 font-black text-[10px] uppercase tracking-widest label">Price</label>
            <input type="number" name="price" value={formData.price} onChange={onChange} className="bg-base-200 border-none rounded-2xl ring-primary/20 focus:ring-2 font-bold input w-full" />
          </div>

          <div className="form-control">
            <label className="opacity-50 font-black text-[10px] uppercase tracking-widest label">Discount Price</label>
            <input type="number" name="discountPrice" value={formData.discountPrice} onChange={onChange} className="bg-base-200 border-none rounded-2xl ring-primary/20 focus:ring-2 font-bold input w-full" />
          </div>
          <div className="form-control">
            <label className="opacity-50 font-black text-[10px] uppercase tracking-widest label">Stock Level</label>
            <input type="number" name="stock" value={formData.stock} onChange={onChange} className="bg-base-200 border-none rounded-2xl ring-primary/20 focus:ring-2 font-bold input w-full" />
          </div>

          <div className="md:col-span-1 form-control">
            <label className="opacity-50 font-black text-[10px] uppercase tracking-widest label">Weight</label>
            <input type="number" name="weight" value={formData.weight} onChange={onChange} className="bg-base-200 border-none rounded-2xl ring-primary/20 focus:ring-2 font-bold input w-full" />
          </div>
          <div className="md:col-span-1 form-control">
             <label className="opacity-50 font-black text-[10px] uppercase tracking-widest label">Image URL</label>
             <input name="image" value={formData.image} onChange={onChange} className="bg-base-200 border-none rounded-2xl ring-primary/20 focus:ring-2 font-bold input w-full" />
          </div>

          <div className="md:col-span-2 form-control">
            <label className="opacity-50 font-black text-[10px] uppercase tracking-widest label">Description</label>
            <textarea name="description" value={formData.description} onChange={onChange} rows={3} className="bg-base-200 border-none rounded-3xl ring-primary/20 focus:ring-2 font-bold textarea w-full py-4" />
          </div>

          <div className="flex gap-4 md:col-span-2 mt-4">
            <button type="button" onClick={onClose} className="flex-1 rounded-2xl font-black uppercase tracking-widest btn btn-ghost">Cancel</button>
            <button type="submit" disabled={updating} className="flex-1 shadow-lg shadow-primary/20 rounded-2xl font-black uppercase tracking-widest btn btn-primary">
              {updating ? <Loader2 className="animate-spin" /> : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditFoodModal;