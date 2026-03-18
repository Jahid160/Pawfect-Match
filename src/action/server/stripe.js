"use server";

import Stripe from "stripe";
import { ObjectId } from "mongodb";
import { collections, dbConnect } from "@/lib/db";

import { getCartItems } from "@/action/server/cart";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createStripeCheckoutFromCart = async (payload) => {
  try {
    const {
      userEmail,
      customerName,
      phone,
      address,
      city,
      area,
      note,
    } = payload || {};

    if (!userEmail || !customerName || !phone || !address || !city || !area) {
      return {
        success: false,
        message: "Missing checkout information.",
      };
    }

    const cartItems = await getCartItems(userEmail);

    if (!cartItems?.length) {
      return {
        success: false,
        message: "Cart is empty.",
      };
    }

    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.productName || "Pet Food",
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(Number(item.price || 0) * 100),
      },
      quantity: Number(item.quantity || 1),
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
        note: note || "",
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    });

    return {
      success: true,
      url: session.url,
    };
  } catch (error) {
    console.error("createStripeCheckoutFromCart error:", error);
    return {
      success: false,
      message: error.message || "Stripe checkout session failed.",
    };
  }
};




export const createStripeCheckoutForSingleFood = async (payload) => {
  try {
    const {
      userEmail,
      customerName,
      phone,
      address,
      city,
      area,
      note,
      foodId,
      quantity = 1,
    } = payload || {};

    if (
      !userEmail ||
      !customerName ||
      !phone ||
      !address ||
      !city ||
      !area ||
      !foodId
    ) {
      return {
        success: false,
        message: "Missing checkout information.",
      };
    }

    if (!ObjectId.isValid(foodId)) {
      return {
        success: false,
        message: "Invalid food ID.",
      };
    }

    const foodsCollection = await dbConnect(collections.FOODS);

    const food = await foodsCollection.findOne({ _id: new ObjectId(foodId) });

    if (!food) {
      return {
        success: false,
        message: "Food not found.",
      };
    }

    const qty = Number(quantity || 1);
    const finalPrice =
      food.discountPrice && Number(food.discountPrice) < Number(food.price)
        ? Number(food.discountPrice)
        : Number(food.price);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: food.productName || "Pet Food",
              images: food.image ? [food.image] : [],
            },
            unit_amount: Math.round(finalPrice * 100),
          },
          quantity: qty,
        },
      ],
      metadata: {
        mode: "buy-now",
        userEmail,
        customerName,
        phone,
        address,
        city,
        area,
        note: note || "",
        foodId: food._id.toString(),
        quantity: String(qty),
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    });

    return {
      success: true,
      url: session.url,
    };
  } catch (error) {
    console.error("createStripeCheckoutForSingleFood error:", error);
    return {
      success: false,
      message: error.message || "Stripe session failed.",
    };
  }
};

