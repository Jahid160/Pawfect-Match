import Link from "next/link";
import { FaTimesCircle, FaArrowLeft, FaShoppingCart } from "react-icons/fa";

export default function PaymentCancel() {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 px-4 min-h-screen text-center">
      <div className="bg-white shadow-lg p-10 border border-red-100 rounded-3xl w-full max-w-md">
        
        {/* আইকন */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-50 p-5 rounded-full">
            <FaTimesCircle className="text-red-500 text-7xl" />
          </div>
        </div>

        {/* টেক্সট */}
        <h1 className="mb-3 font-black text-gray-800 text-3xl">
          Payment Cancelled
        </h1>
        <p className="mb-8 text-gray-500 leading-relaxed">
          It looks like the transaction was cancelled. No worries, your items are 
          still safe in your cart. You can try again whenever you're ready!
        </p>

        {/* অ্যাকশন বাটনসমূহ */}
        <div className="flex flex-col gap-4">
          <Link
            href="/cart"
            className="flex justify-center items-center gap-2 bg-gray-900 hover:bg-gray-800 shadow-md px-6 py-4 rounded-2xl font-bold text-white transition-all"
          >
            <FaShoppingCart className="text-sm" />
            Back to Cart
          </Link>

          <Link
            href="/all-pets"
            className="flex justify-center items-center gap-2 py-2 font-semibold text-gray-500 hover:text-gray-800 transition-colors"
          >
            <FaArrowLeft className="text-xs" />
            Continue Shopping
          </Link>
        </div>

        {/* নিচের ছোট নোট */}
        <div className="mt-8 pt-6 border-gray-100 border-t">
          <p className="text-gray-400 text-xs">
            If you're having trouble with your payment, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}