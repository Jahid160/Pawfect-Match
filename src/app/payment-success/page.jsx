import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Payment Successful
      </h1>

      <p>Your order has been placed.</p>

      <Link
        href="/dashboard/orders"
        className="bg-primary px-6 py-3 text-white rounded-lg mt-6"
      >
        View Orders
      </Link>
    </div>
  );
}
