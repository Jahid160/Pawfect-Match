"use client";

import Link from "next/link";
import { FaTimesCircle, FaArrowLeft, FaShoppingCart } from "react-icons/fa";

export default function PaymentCancel() {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 px-4 min-h-screen font-sans text-center">
      <div className="bg-white shadow-2xl p-10 border border-red-50 rounded-[2.5rem] w-full max-w-md">
        
        <div className="flex justify-center mb-6">
          <div className="bg-red-50 p-6 rounded-full animate-pulse">
            <FaTimesCircle className="text-red-500 text-7xl" />
          </div>
        </div>

        <h1 className="mb-3 font-black text-gray-900 text-3xl tracking-tight">
          Payment Cancelled
        </h1>
        <p className="mb-8 font-medium text-gray-500 text-sm leading-relaxed">
          It looks like the transaction was cancelled. No worries, your items are 
          still safe in your cart. You can try again whenever you're ready!
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/cart"
            className="flex justify-center items-center gap-3 bg-gray-900 hover:bg-red-600 shadow-gray-200 shadow-xl px-6 py-4.5 rounded-2xl font-black text-white active:scale-95 transition-all duration-300"
          >
            <FaShoppingCart className="text-sm" />
            Back to Cart
          </Link>

          <Link
            href="/all-pets"
            className="flex justify-center items-center gap-2 py-2 font-bold text-gray-400 hover:text-gray-900 text-sm transition-colors"
          >
            <FaArrowLeft className="text-xs" />
            Continue Shopping
          </Link>
        </div>

        <div className="mt-8 pt-6 border-gray-100 border-t">
          <p className="font-medium text-[10px] text-gray-400 uppercase tracking-[0.2em]">
            Need help? Contact Pawfect Match Support
          </p>
        </div>
      </div>
    </div>
  );
}