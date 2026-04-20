"use server";

import Stripe from "stripe";
import { ObjectId } from "mongodb";
import { collections, dbConnect } from "@/lib/db";
import { getCartItems } from "@/action/server/cart";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


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
          ...(item.image && item.image.startsWith('http') ? { images: [item.image] } : {}),
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
        mode: "cart",
        userEmail,
        customerName,
        phone,
        address,
        city,
        area,
        note: note || "",
      },
      success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/payment-cancel`,
    });

    return { success: true, url: session.url };
  } catch (error) {
    console.error("createStripeCheckoutFromCart error:", error);
    return { success: false, message: error.message || "Cart checkout failed." };
  }
};


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
      productType = "food",
      quantity = 1,
    } = payload || {};

 

    if (!userEmail || !productId) {
      return { success: false, message: "User email and Product ID are required." };
    }


    if (!ObjectId.isValid(productId)) {
      return { success: false, message: "Invalid product ID." };
    }

    const type = productType.toLowerCase();
    const isAccessory = type === "accessory" || type === "accessories";
    const collectionName = isAccessory ? collections.ACCESSORIES : collections.FOODS;

    const productCollection = await dbConnect(collectionName);
    let product = await productCollection.findOne({ _id: new ObjectId(productId) });

    if (!product) {
      const fallbackCollection = isAccessory ? collections.FOODS : collections.ACCESSORIES;
      const fallbackDb = await dbConnect(fallbackCollection);
      product = await fallbackDb.findOne({ _id: new ObjectId(productId) });

      if (!product) {
        return { success: false, message: `Product not found in database.` };
      }
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
              ...(product.image && product.image.startsWith('http') ? { images: [product.image] } : {}),
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
        productType: isAccessory ? "accessory" : "food",
        quantity: String(qty),
      },
      success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/payment-cancel`,
    });

    return { success: true, url: session.url };
  } catch (error) {
    console.error("Single product checkout error:", error);
    return { success: false, message: error.message || "Stripe session failed." };
  }
};
