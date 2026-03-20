import CheckoutPageClient from "@/components/checkout/CheckOutPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getCartItems } from "@/action/server/cart";
import CartStoreInitializer from "@/components/Cart/CartStoreInitializer";

const CheckoutPage = async () => {
  const session = await getServerSession(authOptions);
  let initialCartCount = 0;

  if (session?.user?.email) {
    const cartData = await getCartItems(session.user.email);
    initialCartCount = cartData?.length || 0;
  }

  return (
    <>
      <CartStoreInitializer count={initialCartCount} />
      
      <div className="bg-gray-50 min-h-screen">
        <CheckoutPageClient />
      </div>
    </>
  );
};

export default CheckoutPage;