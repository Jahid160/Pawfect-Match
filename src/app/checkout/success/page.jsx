import Link from "next/link";
import { FaCheckCircle, FaShoppingBag, FaClipboardList } from "react-icons/fa";

const CheckoutSuccessPage = async ({ searchParams }) => {
  const params = await searchParams;
  const orderId = params?.orderId || "";

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4 py-10">
      <div className="w-full max-w-2xl bg-base-100 rounded-3xl shadow-xl p-8 md:p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-success/10 p-6 rounded-full">
            <FaCheckCircle className="text-success text-6xl" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-black mb-3">
          Order Placed Successfully
        </h1>

        <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
          Thank you for your order. We received your checkout request and your
          order is now being processed.
        </p>

        {orderId ? (
          <div className="mt-6 bg-base-200 rounded-2xl p-4">
            <p className="text-sm text-gray-500 mb-1">Your Order ID</p>
            <p className="text-primary font-black text-lg break-all">{orderId}</p>
          </div>
        ) : null}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/pet-food"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-2xl transition"
          >
            <FaShoppingBag />
            Continue Shopping
          </Link>

          <Link
            href="/dashboard/orders"
            className="inline-flex items-center justify-center gap-2 bg-base-200 hover:bg-base-300 font-bold py-4 px-6 rounded-2xl transition"
          >
            <FaClipboardList />
            View Orders
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-base-300">
          <p className="text-sm text-gray-500">
            A confirmation of your order has been saved in your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
