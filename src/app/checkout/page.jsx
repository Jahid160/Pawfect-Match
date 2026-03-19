import CheckoutPageClient from "@/components/checkout/CheckOutPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getCartItems } from "@/action/server/cart";
import CartStoreInitializer from "@/components/Cart/CartStoreInitializer";

const CheckoutPage = async () => {
  // ১. সার্ভার থেকে সেশন এবং কার্ট ডাটা নিয়ে আসা
  const session = await getServerSession(authOptions);
  let initialCartCount = 0;

  if (session?.user?.email) {
    const cartData = await getCartItems(session.user.email);
    // টোটাল আইটেম সংখ্যা বের করা
    initialCartCount = cartData?.length || 0;
  }

  return (
    <>
      {/* ২. চেকআউট পেজেও স্টোর ইনিশিয়ালাইজ করে রাখা ভালো যেন নেভবার কাউন্ট ঠিক থাকে */}
      <CartStoreInitializer count={initialCartCount} />
      
      <div className="bg-gray-50 min-h-screen">
        <CheckoutPageClient />
      </div>
    </>
  );
};

export default CheckoutPage;