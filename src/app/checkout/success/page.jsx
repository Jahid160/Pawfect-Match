import Link from "next/link";
import { FaCheckCircle, FaShoppingBag, FaArrowRight } from "react-icons/fa";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { verifyStripePayment } from "@/action/server/stripeVerify";
import { redirect } from "next/navigation";

const CheckoutSuccessPage = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/");
  }

  const params = await searchParams;
  const stripeSessionId = params?.session_id;
  const orderIdFromUrl = params?.orderId;

  let finalOrderId = orderIdFromUrl;

  if (stripeSessionId) {
    try {
      const result = await verifyStripePayment(
        stripeSessionId,
        session.user.email
      );

      if (result?.success) {
        finalOrderId = result.orderId;
      } else {
        redirect("/payment-cancel");
      }
    } catch (error) {
      console.error("Verification error logic:", error);
      redirect("/payment-cancel");
    }
  }

  return (
    <div className="flex justify-center items-center bg-gray-50 px-4 py-10 min-h-screen font-sans">
      <div className="bg-white shadow-2xl p-8 md:p-12 border border-green-100 rounded-[3rem] w-full max-w-2xl text-center">

        <div className="flex justify-center mb-6">
          <div className="bg-green-50 p-6 rounded-full animate-bounce">
            <FaCheckCircle className="text-green-500 text-6xl" />
          </div>
        </div>

        <h1 className="mb-3 font-black text-gray-900 text-3xl md:text-4xl tracking-tight">
          Order Placed Successfully!
        </h1>

        <p className="mx-auto mb-8 max-w-xl text-gray-500 text-base md:text-lg leading-relaxed">
          Thank you for choosing **Pawfect Match**. Your payment was confirmed and our team is 
          preparing your pet's favorite items for delivery.
        </p>

        {finalOrderId && (
          <div className="bg-gray-50 mb-8 p-6 border border-gray-200 border-dashed rounded-2xl">
            <p className="mb-2 font-bold text-gray-400 text-xs uppercase tracking-widest">Order Tracking ID</p>
            <p className="font-black text-primary text-xl md:text-2xl break-all">
              #{finalOrderId}
            </p>
          </div>
        )}

        <div className="flex md:flex-row flex-col justify-center items-center gap-4">
          <Link
            href="/all-pets"
            className="inline-flex justify-center items-center gap-3 bg-primary hover:bg-orange-600 shadow-orange-100 shadow-xl px-8 py-5 rounded-2xl w-full md:w-auto font-black text-white active:scale-95 transition-all"
          >
            <FaShoppingBag />
            Continue Shopping
          </Link>
          
          <Link
            href="/dashboard/pet-food&accessories"
            className="inline-flex justify-center items-center gap-3 bg-gray-900 hover:bg-gray-800 px-8 py-5 rounded-2xl w-full md:w-auto font-black text-white active:scale-95 transition-all"
          >
            View My Orders
            <FaArrowRight className="text-sm" />
          </Link>
        </div>

        <div className="mt-10 pt-6 border-gray-100 border-t">
          <p className="text-gray-400 text-sm italic">
            A confirmation details has been saved for <span className="font-bold text-gray-700">{session.user.email}</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;