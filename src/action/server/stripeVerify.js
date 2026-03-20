"use server";

import Stripe from "stripe";
import { dbConnect, collections } from "@/lib/db";
import { getCartItems } from "@/action/server/cart";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const verifyStripePayment = async (sessionId, email) => {
  try {
   
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return { success: false, message: "Payment not completed or failed." };
    }

    const orderCollection = await dbConnect(collections.ORDERS || "orders");

    const existingOrder = await orderCollection.findOne({
      stripeSessionId: sessionId,
    });

    if (existingOrder) {
      return {
        success: true,
        orderId: existingOrder._id.toString(),
      };
    }

    const metadata = session.metadata || {};
    const mode = metadata.mode || "cart";
    const userEmail = metadata.userEmail || email;

    if (!userEmail) {
      return { success: false, message: "User email missing in session." };
    }

    let orderItems = [];
    let totalAmount = 0;

    if (mode === "buy-now") {
      const productType = metadata.productType || "food"; 
      const collectionName = productType === "accessory" ? collections.ACCESSORIES : collections.FOODS;
      
      const productCollection = await dbConnect(collectionName);
      const productId = metadata.productId;
      const quantity = Number(metadata.quantity || 1);

      if (!productId || !ObjectId.isValid(productId)) {
        return { success: false, message: "Invalid product ID." };
      }

      const product = await productCollection.findOne({ _id: new ObjectId(productId) });

      if (!product) {
        return { success: false, message: "Product not found." };
      }

      const finalPrice = product.discountPrice && Number(product.discountPrice) < Number(product.price)
          ? Number(product.discountPrice)
          : Number(product.price);

      orderItems = [{
          productId: product._id.toString(),
          productName: product.productName || "Pet Product",
          image: product.image || "",
          productType: productType,
          quantity: quantity,
          price: finalPrice,
          lineTotal: finalPrice * quantity,
      }];

      totalAmount = finalPrice * quantity;
    } else {
      const cartItems = await getCartItems(userEmail);

      if (!cartItems || cartItems.length === 0) {
        
        return { success: false, message: "Cart items not found for this user." };
      }

      orderItems = cartItems.map((item) => ({
        productId: (item.productId || item._id).toString(),
        productName: item.productName || "Pet Product",
        productType: item.productType || "food",
        quantity: Number(item.quantity || 1),
        price: Number(item.price || 0),
        lineTotal: Number(item.price || 0) * Number(item.quantity || 1),
      }));

      totalAmount = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);
    }

    const orderDoc = {
      userEmail,
      customerName: metadata.customerName || "",
      phone: metadata.phone || "",
      shippingAddress: {
        address: metadata.address || "",
        city: metadata.city || "",
        area: metadata.area || "",
      },
      paymentMethod: "Stripe",
      paymentStatus: "paid",
      orderStatus: "processing",
      items: orderItems,
      totalItems: orderItems.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: totalAmount,
      shippingCost: 0,
      totalAmount,
      stripeSessionId: sessionId,
      note: metadata.note || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await orderCollection.insertOne(orderDoc);

    if (!result.insertedId) {
      throw new Error("Failed to save order to database.");
    }

    /*
    try {
      const { reduceProductStock } = await import("@/action/server/stock");
      await reduceProductStock(orderItems);
    } catch (stockError) {
      console.error("Stock update failed, but order saved:", stockError);
    }
    */

    if (mode !== "buy-now") {
      const cartCollection = await dbConnect(collections.CART);
      await cartCollection.deleteMany({ userEmail });
    }

    // ১০. ক্যাশ রিভ্যালিডেট করা যাতে ড্যাশবোর্ডে অর্ডার দেখায়
    // revalidatePath("/dashboard/orders");
    // revalidatePath("/cart");

    return {
      success: true,
      orderId: result.insertedId.toString(),
    };

  } catch (error) {
    console.error("Critical Stripe Verification Error:", error);
    return { success: false, message: error.message || "An unexpected error occurred." };
  }
};