import Link from "next/link";

export default function PaymentCancel() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4">
        Payment Cancelled
      </h1>

      <p className="mb-6">Your payment was not completed.</p>

      <Link
        href="/petfoods"
        className="bg-gray-900 px-6 py-3 text-white rounded-lg"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
