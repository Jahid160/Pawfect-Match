"use server";

import Stripe from "stripe";
import { ObjectId } from "mongodb";
import { collections, dbConnect } from "@/lib/db";
import { getCartItems } from "@/action/server/cart";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ১. কার্ট থেকে চেকআউট (এখানে খাবার ও এক্সেসরিজ মিক্স থাকলেও সমস্যা নেই)
export const createStripeCheckoutFromCart = async (payload) => {
  try {
    const { userEmail, customerName, phone, address, city, area, note } = payload || {};

    if (!userEmail || !customerName || !phone || !address || !city || !area) {
      return { success: false, message: "Missing checkout information." };
    }

    const cartItems = await getCartItems(userEmail);

    if (!cartItems?.length) {
      return { success: false, message: "Cart is empty." };
    }

    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.productName || "Pet Product",
          // Stripe-এ খালি ইমেজ স্ট্রিং দিলে এরর দেয়, তাই চেক করে পাঠানো হচ্ছে
          ...(item.image && item.image.trim() !== "" ? { images: [item.image] } : {}),
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

    return { success: true, url: session.url };
  } catch (error) {
    console.error("createStripeCheckoutFromCart error:", error);
    return { success: false, message: error.message || "Stripe checkout failed." };
  }
};

// ২. সিঙ্গেল প্রোডাক্ট চেকআউট (Food অথবা Accessory উভয়ের জন্য)
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
      productId, // foodId এর বদলে জেনেরিক নাম productId ব্যবহার করলাম
      productType = "food", // 'food' অথবা 'accessory'
      quantity = 1,
    } = payload || {};

    if (!userEmail || !customerName || !phone || !address || !city || !area || !productId) {
      return { success: false, message: "Missing checkout information." };
    }

    if (!ObjectId.isValid(productId)) {
      return { success: false, message: "Invalid product ID." };
    }

    // কালেকশন সিলেক্ট করা (Food নাকি Accessory)
    const collectionName = productType === "accessory" ? collections.ACCESSORIES : collections.FOODS;
    const productCollection = await dbConnect(collectionName);

    const product = await productCollection.findOne({ _id: new ObjectId(productId) });

    if (!product) {
      return { success: false, message: "Product not found." };
    }

    const qty = Number(quantity || 1);
    
    // ডিসকাউন্ট প্রাইস চেক
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
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    });

    return { success: true, url: session.url };
  } catch (error) {
    console.error("Single product checkout error:", error);
    return { success: false, message: error.message || "Stripe session failed." };
  }
};