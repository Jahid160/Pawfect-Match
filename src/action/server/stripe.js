"use server";

import Stripe from "stripe";
import { getCartItems } from "@/action/server/cart";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createStripeCheckoutFromCart = async (payload) => {

  const {
    userEmail,
    customerName,
    phone,
    address,
    city,
    area,
    note
  } = payload;

  const cartItems = await getCartItems(userEmail);

  if (!cartItems?.length) {
    return { success: false };
  }

  const line_items = cartItems.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.productName,
        images: [item.image],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items,

    metadata: {
    userEmail,
    customerName,
    phone,
    address,
    city,
    area,
    note: note || "", // Ensure no nulls
  },

    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
  });

  return {
    success: true,
    url: session.url,
  };
};