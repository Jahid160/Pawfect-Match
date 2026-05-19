import CheckoutPageClient from "@/Components/checkout/CheckOutPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getCartItems } from "@/action/server/cart";
import CartStoreInitializer from "@/Components/Cart/CartStoreInitializer";
import { collections, dbConnect } from "@/lib/db";
import { ObjectId } from "mongodb";

const CheckoutPage = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);
  
  const { productId, productType, mode } = await searchParams;

  let initialCartCount = 0;
  let buyNowItem = null;

  if (session?.user?.email) {
    const cartData = await getCartItems(session.user.email);
    initialCartCount = cartData?.length || 0;
  }

  if (mode === "buy-now" && productId) {
    try {
      const type = productType?.toLowerCase();
      const collectionName = (type === "accessory" || type === "accessories") 
        ? collections.ACCESSORIES 
        : collections.FOODS;

      const db = await dbConnect(collectionName);
      const product = await db.findOne({ _id: new ObjectId(productId) });

      if (product) {
        buyNowItem = {
          productId: product._id.toString(),
          productName: product.productName || product.title,
          image: (Array.isArray(product.images) ? product.images[0] : product.image),
          price: (product.discountPrice && Number(product.discountPrice) < Number(product.price)) 
                  ? Number(product.discountPrice) 
                  : Number(product.price),
          quantity: 1,
          productType: type === "accessory" ? "accessory" : "food"
        };
      }
    } catch (error) {
      console.error("Error fetching buy-now item:", error);
    }
  }

  return (
    <>
      <CartStoreInitializer count={initialCartCount} />
      
      <div className="bg-gray-50 min-h-screen">
        <CheckoutPageClient buyNowItem={buyNowItem} isBuyNow={!!buyNowItem} />
      </div>
    </>
  );
};

export default CheckoutPage;