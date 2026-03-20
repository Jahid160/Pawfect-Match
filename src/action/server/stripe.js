"use server";

import Stripe from "stripe";
import { ObjectId } from "mongodb";
import { collections, dbConnect } from "@/lib/db";
import { getCartItems } from "@/action/server/cart";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * ১. কার্ট থেকে স্ট্রাইপ চেকআউট সেশন তৈরি করা
 */
export const createStripeCheckoutFromCart = async (payload) => {
  try {
    const { userEmail, customerName, phone, address, city, area, note } = payload || {};

    // বেসিক ভ্যালিডেশন
    if (!userEmail || !customerName || !phone || !address || !city || !area) {
      return { success: false, message: "Missing checkout information." };
    }

    const cartItems = await getCartItems(userEmail);

    if (!cartItems?.length) {
      return { success: false, message: "Cart is empty." };
    }

    // স্ট্রাইপ লাইন আইটেম তৈরি
    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.productName || "Pet Product",
          ...(item.image && item.image.trim() !== "" ? { images: [item.image] } : {}),
        },
        unit_amount: Math.round(Number(item.price || 0) * 100), // সেন্টে কনভার্ট
      },
      quantity: Number(item.quantity || 1),
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      metadata: {
        mode: "cart",
        userEmail,
        customerName,
        phone,
        address,
        city,
        area,
        note: note || "",
      },
      // সাকসেস ইউআরএল-এ সেশন আইডি পাঠানো হচ্ছে যাতে পরে ভেরিফাই করা যায়
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    });

    return { success: true, url: session.url };
  } catch (error) {
    console.error("createStripeCheckoutFromCart error:", error);
    return { success: false, message: error.message || "Stripe checkout failed." };
  }
};

/**
 * ২. সিঙ্গেল প্রোডাক্ট (Buy Now) চেকআউট সেশন তৈরি করা
 * এটি Food এবং Accessories দুটোর জন্যই কাজ করবে।
 */
export const createStripeCheckoutForSingleProduct = async (payload) => {
  try {
    const {
      userEmail,
      customerName,
      phone,
      address,
      city,
      area,
      note,
      productId,
      productType = "food", // ডিফল্ট ফুড, তবে এক্সেসরিজও হতে পারে
      quantity = 1,
    } = payload || {};

    if (!userEmail || !customerName || !phone || !address || !city || !area || !productId) {
      return { success: false, message: "Missing checkout information." };
    }

    if (!ObjectId.isValid(productId)) {
      return { success: false, message: "Invalid product ID." };
    }

    // টাইপ অনুযায়ী কালেকশন সিলেক্ট করা
    const collectionName = productType === "accessory" ? collections.ACCESSORIES : collections.FOODS;
    const productCollection = await dbConnect(collectionName);

    const product = await productCollection.findOne({ _id: new ObjectId(productId) });

    if (!product) {
      return { success: false, message: "Product not found." };
    }

    const qty = Number(quantity || 1);
    
    const finalPrice = product.discountPrice && Number(product.discountPrice) < Number(product.price)
        ? Number(product.discountPrice)
        : Number(product.price);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.productName || "Pet Product",
              ...(product.image && product.image.trim() !== "" ? { images: [product.image] } : {}),
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
        productId: product._id.toString(),
        productType,
        quantity: String(qty),
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pet-food/${productId}`,
    });

    return { success: true, url: session.url };
  } catch (error) {
    console.error("Single product checkout error:", error);
    return { success: false, message: error.message || "Stripe session failed." };
  }
};