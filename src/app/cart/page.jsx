import CartPageClient from "@/Components/Cart/CartPageClient"; 
import { Suspense } from "react";
import { getCartItems } from "@/action/server/cart"; 
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import CartStoreInitializer from "@/Components/Cart/CartStoreInitializer";

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
    const cartData = await getCartItems(session.user.email);
    
    
    initialCartCount = cartData?.reduce((total, item) => total + (item.quantity || 1), 0) || 0;
    

  }

  return (
    <>
      {/* Zustand Store*/}
      <CartStoreInitializer count={initialCartCount} />
      
      <Suspense fallback={<CartLoader />}>
        <div className="bg-white min-h-screen">
          <CartPageClient />
        </div>
      </Suspense>
    </>
  );
};

export default CartPage;