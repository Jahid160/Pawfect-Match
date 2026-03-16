"use server";

import Stripe from "stripe";
import { dbConnect, collections } from "@/lib/db";
import { getCartItems } from "@/action/server/cart";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const verifyStripePayment = async (sessionId, userEmail) => {
  try {

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return { success: false };
    }

    const cartItems = await getCartItems(userEmail);

    if (!cartItems.length) {
      return { success: false };
    }

    const orderCollection = await dbConnect(collections.ORDER);

    const items = cartItems.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
      lineTotal: item.price * item.quantity,
    }));

    const totalAmount = items.reduce(
      (sum, item) => sum + item.lineTotal,
      0
    );

    const result = await orderCollection.insertOne({
      userEmail,
      paymentMethod: "Stripe",
      paymentStatus: "paid",
      orderStatus: "processing",
      items,
      totalAmount,
      createdAt: new Date(),
    });

    return {
      success: true,
      orderId: result.insertedId.toString(),
    };

  } catch (error) {
    console.error("Stripe verify error:", error);
    return { success: false };
  }
};
