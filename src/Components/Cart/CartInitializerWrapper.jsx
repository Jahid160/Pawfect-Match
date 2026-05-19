import { getCartItems } from "@/action/server/cart";
import { getServerSession } from "next-auth";
import CartStoreInitializer from "./CartStoreInitializer";

const CartInitializerWrapper = async () => {
  const session = await getServerSession();
  let initialCartCount = 0;

  if (session?.user?.email) {
    try {
      const cartItems = await getCartItems(session.user.email);
      initialCartCount = cartItems?.length || 0;
    } catch (error) {
      console.error("Cart fetch error in component:", error);
    }
  }

  return <CartStoreInitializer count={initialCartCount} />;
};

export default CartInitializerWrapper;
