import CartPageClient from "@/Components/Cart/CartPageClient";
import { Suspense } from "react";

const CartLoader = () => (
  <div className="flex justify-center items-center bg-base-200 min-h-screen">
    <div className="flex flex-col items-center gap-4">
      <span className="text-primary loading loading-spinner loading-lg"></span>
      <p className="font-bold text-neutral/50 text-lg animate-pulse">Loading your cart...</p>
    </div>
  </div>
);

const CartPage = () => {
  return (
    <Suspense fallback={<CartLoader />}>
      <CartPageClient />
    </Suspense>
  );
};

export default CartPage;