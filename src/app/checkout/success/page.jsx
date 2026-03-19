import Link from "next/link";
import { FaCheckCircle, FaShoppingBag, FaArrowRight } from "react-icons/fa";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { verifyStripePayment } from "@/action/server/stripeVerify";
import { redirect } from "next/navigation";

const CheckoutSuccessPage = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);

  // ১. ইউজার লগইন না থাকলে সরাসরি হোমপেজে রিডাইরেক্ট
  if (!session?.user?.email) {
    redirect("/");
  }

  const params = await searchParams;
  const stripeSessionId = params?.session_id;
  const orderIdFromUrl = params?.orderId;

  let finalOrderId = orderIdFromUrl;

  // ২. স্ট্রাইপ পেমেন্ট ভেরিফিকেশন লজিক
  if (stripeSessionId) {
    const result = await verifyStripePayment(
      stripeSessionId,
      session.user.email
    );

    if (result?.success) {
      finalOrderId = result.orderId;
    } else {
      // যদি পেমেন্ট ফেইল করে তবে ইউজারকে ক্যান্সেল পেজে পাঠানো ভালো
      redirect("/checkout/cancel");
    }
  }

  return (
    <div className="flex justify-center items-center bg-base-200 px-4 py-10 min-h-screen">
      <div className="bg-base-100 shadow-xl p-8 md:p-12 border border-success/20 rounded-3xl w-full max-w-2xl text-center">

        <div className="flex justify-center mb-6">
          <div className="bg-success/10 p-6 rounded-full animate-bounce">
            <FaCheckCircle className="text-success text-6xl" />
          </div>
        </div>

        <h1 className="mb-3 font-black text-gray-800 text-3xl md:text-4xl">
          Order Placed Successfully!
        </h1>

        <p className="mx-auto mb-8 max-w-xl text-gray-500 text-base md:text-lg">
          Thank you for choosing us. Your payment was confirmed and our team is 
          preparing your pets favorite items for delivery.
        </p>

        {finalOrderId && (
          <div className="bg-base-200 mb-8 p-6 border border-gray-300 border-dashed rounded-2xl">
            <p className="mb-2 font-bold text-gray-400 text-xs uppercase tracking-widest">Order Tracking ID</p>
            <p className="font-black text-primary text-xl md:text-2xl break-all">
              #{finalOrderId}
            </p>
          </div>
        )}

        <div className="flex md:flex-row flex-col justify-center items-center gap-4">
          <Link
            href="/all-pets" // সব প্রোডাক্টের পেজে পাঠানো ভালো
            className="inline-flex justify-center items-center gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 px-8 py-4 rounded-2xl w-full md:w-auto font-bold text-white transition"
          >
            <FaShoppingBag />
            Continue Shopping
          </Link>
          
          <Link
            href="/dashboard/orders"
            className="inline-flex justify-center items-center gap-2 bg-gray-100 hover:bg-gray-200 px-8 py-4 rounded-2xl w-full md:w-auto font-bold text-gray-700 transition"
          >
            View My Orders
            <FaArrowRight className="text-sm" />
          </Link>
        </div>

        <div className="mt-10 pt-6 border-base-300 border-t">
          <p className="text-gray-400 text-sm">
            A confirmation email has been sent to <span className="font-semibold text-gray-600">{session.user.email}</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;