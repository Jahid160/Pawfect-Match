"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { placeVaccineOrder } from "@/action/server/orders";

export default function OrderButton({ vaccineId, vaccineName }) {
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    setLoading(true);
    
    const result = await placeVaccineOrder({ vaccineId, vaccineName });

    if (result.success) {
      toast.success("Order Placed! Admin is reviewing.");
    } else {
      toast.error("Failed to place order.");
    }
    setLoading(false);
  };

  return (
    <button 
      onClick={handleOrder}
      disabled={loading}
      className="w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest bg-orange-500 text-white hover:bg-orange-600 shadow-xl disabled:bg-slate-300"
    >
      {loading ? "Processing..." : "Place Order"}
    </button>
  );
}