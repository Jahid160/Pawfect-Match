"use server";

import Stripe from "stripe";
import { dbConnect, collections } from "@/lib/db";
import { getCartItems } from "@/action/server/cart";
import { reduceFoodStock } from "./foods";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const verifyStripePayment = async (sessionId, userEmail) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return { success: false };
    }

    const orderCollection = await dbConnect(collections.ORDER);
    
    // 1. Check if this order was already processed (Prevents stock reducing twice on refresh)
    const existingOrder = await orderCollection.findOne({ stripeSessionId: sessionId });
    if (existingOrder) {
      return { success: true, orderId: existingOrder._id.toString() };
    }

    // 2. Get Cart Items and Metadata
    const cartItems = await getCartItems(userEmail);
    const { customerName, phone, address, city, area, note } = session.metadata;

    if (!cartItems.length) return { success: false };

    // 3. Create the Order Document
    const orderItems = cartItems.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      price: Number(item.price),
      lineTotal: Number(item.price) * Number(item.quantity),
    }));

    const totalAmount = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);

    const orderDoc = {
      userEmail,
      customerName,
      phone,
      shippingAddress: { address, city, area },
      paymentMethod: "Stripe",
      paymentStatus: "paid",
      orderStatus: "processing",
      items: orderItems,
      totalAmount,
      stripeSessionId: sessionId,
      note,
      createdAt: new Date(),
    };

    // 4. Save Order to Database
    const result = await orderCollection.insertOne(orderDoc);

    // 5. REDUCE STOCK IN DATABASE
    // This is the missing piece!
    await reduceFoodStock(orderItems);

    // 6. Clear the Cart
    const cartCollection = await dbConnect(collections.CART);
    await cartCollection.deleteMany({ userEmail });

    return {
      success: true,
      orderId: result.insertedId.toString(),
    };

  } catch (error) {
    console.error("Stripe verify error:", error);
    return { success: false };
  }
};
