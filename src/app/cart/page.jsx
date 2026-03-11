import CartPageClient from "@/components/Cart/CartPageClient";
import { Suspense } from "react";
// import CartPageClient from "@/components/Cart/CartPageClient"; // পাথ ঠিক আছে কি না চেক করে নিন

// একটি সিম্পল লোডার কম্পোনেন্ট
const CartLoader = () => (
  <div className="flex justify-center items-center min-h-screen bg-base-200">
    <div className="flex flex-col items-center gap-4">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="font-bold text-lg animate-pulse text-neutral/50">Loading your cart...</p>
    </div>
  </div>
);

const CartPage = () => {
  return (
    // Suspense boundary বিল্ড এরর ফিক্স করবে
    <Suspense fallback={<CartLoader />}>
      <CartPageClient />
    </Suspense>
  );
};

export default CartPage;