import CartPageClient from "@/components/Cart/CartPageClient"; // 'c' small letter consistent rakha bhalo
import { Suspense } from "react";
import { getCartItems } from "@/action/server/cart"; 
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import CartStoreInitializer from "@/components/Cart/CartStoreInitializer";

const CartLoader = () => (
  <div className="flex flex-col justify-center items-center bg-gray-50 min-h-screen">
    <div className="flex flex-col items-center gap-4">
      <span className="w-16 text-orange-500 loading loading-spinner"></span>
      <p className="font-bold text-gray-400 text-lg tracking-tight animate-pulse">
        Loading your premium cart...
      </p>
    </div>
  </div>
);

const CartPage = async () => {
  const session = await getServerSession(authOptions);
  let initialCartCount = 0;

  if (session?.user?.email) {
    // getCartItems এখন ফুড এবং এক্সেসরিজ সব মিক্সড ডাটা নিয়ে আসবে
    const cartData = await getCartItems(session.user.email);
    
    // আইটেমের সংখ্যা (length) নাকি মোট কুয়ান্টিটি (quantity)? 
    // যদি কুয়ান্টিটি দেখাতে চাও তবে নিচের reduce লজিকটি ব্যবহার করো:
    initialCartCount = cartData?.reduce((total, item) => total + (item.quantity || 1), 0) || 0;
    
    // অথবা যদি শুধু আইটেম টাইপ সংখ্যা দেখাতে চাও:
    // initialCartCount = cartData?.length || 0;
  }

  return (
    <>
      {/* Zustand Store-এ ইনিশিয়াল কাউন্ট পাঠিয়ে দেয়া হচ্ছে */}
      <CartStoreInitializer count={initialCartCount} />
      
      <Suspense fallback={<CartLoader />}>
        <div className="bg-white min-h-screen">
          {/* Client component-এ আর আলাদাভাবে ডাটা পাস করতে হবে না, সে নিজেই fetch করবে বা store থেকে নিবে */}
          <CartPageClient />
        </div>
      </Suspense>
    </>
  );
};

export default CartPage;