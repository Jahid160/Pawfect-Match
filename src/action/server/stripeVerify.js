"use server";

import Stripe from "stripe";
import { dbConnect, collections } from "@/lib/db";
import { getCartItems } from "@/action/server/cart";
import { reduceProductStock } from "@/action/server/stock"; 
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * স্ট্রাইপ পেমেন্ট ভেরিফাই করা এবং সাকসেস হলে ডাটাবেজে অর্ডার সেভ করা
 */
export const verifyStripePayment = async (sessionId) => {
  try {
    // ১. স্ট্রাইপ থেকে সেশন রিট্রিভ করা
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return { success: false, message: "Payment not completed or failed." };
    }

    const orderCollection = await dbConnect(collections.ORDER);

    // ২. ডুপ্লিকেট অর্ডার চেক করা (একই সেশন আইডি দিয়ে যেন বারবার অর্ডার না হয়)
    const existingOrder = await orderCollection.findOne({
      stripeSessionId: sessionId,
    });

    if (existingOrder) {
      return {
        success: true,
        orderId: existingOrder._id.toString(),
      };
    }

    // ৩. মেটাডাটা থেকে ইনফরমেশন নেওয়া
    const metadata = session.metadata || {};
    const mode = metadata.mode || "cart";
    const userEmail = metadata.userEmail;

    if (!userEmail) {
      return { success: false, message: "User email missing in session metadata." };
    }

    let orderItems = [];
    let totalAmount = 0;

    // ৪. অর্ডার আইটেম প্রিপারেশন (Buy Now নাকি Cart)
    if (mode === "buy-now") {
      const productType = metadata.productType || "food"; 
      const collectionName = productType === "accessory" ? collections.ACCESSORIES : collections.FOODS;
      
      const productCollection = await dbConnect(collectionName);
      const productId = metadata.productId;
      const quantity = Number(metadata.quantity || 1);

      if (!productId || !ObjectId.isValid(productId)) {
        return { success: false, message: "Invalid product in metadata." };
      }

      const product = await productCollection.findOne({ _id: new ObjectId(productId) });

      if (!product) {
        return { success: false, message: "Product not found in database." };
      }

      const finalPrice = product.discountPrice && Number(product.discountPrice) < Number(product.price)
          ? Number(product.discountPrice)
          : Number(product.price);

      orderItems = [{
          productId: product._id.toString(),
          productName: product.productName || "Pet Product",
          brand: product.brand || "",
          image: product.image || "",
          productType: productType,
          quantity: quantity,
          price: finalPrice,
          lineTotal: finalPrice * quantity,
      }];

      totalAmount = finalPrice * quantity;
    } else {
      // কার্ট থেকে আইটেম নেওয়া
      const cartItems = await getCartItems(userEmail);

      if (!cartItems || cartItems.length === 0) {
        return { success: false, message: "Cart data not found. Possible session timeout." };
      }

      orderItems = cartItems.map((item) => ({
        productId: (item.productId || item.foodId || item._id).toString(),
        productName: item.productName || "Pet Product",
        productType: item.productType || "food",
        quantity: Number(item.quantity || 1),
        price: Number(item.price || 0),
        lineTotal: Number(item.price || 0) * Number(item.quantity || 1),
      }));

      totalAmount = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);
    }

    // ৫. ফাইনাল অর্ডার ডকুমেন্ট তৈরি
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
      orderStatus: "processing", // পেইড অর্ডার সরাসরি প্রসেসিংয়ে যাবে
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

    // ৬. ডাটাবেজে অর্ডার ইনসার্ট করা
    const result = await orderCollection.insertOne(orderDoc);

    if (!result.insertedId) {
      return { success: false, message: "Failed to save order to database." };
    }

    // ৭. স্টক কমানো (খাবার ও এক্সেসরিজ উভয় কালেকশন থেকে)
    const stockResult = await reduceProductStock(orderItems);

    if (!stockResult?.success) {
      // যদি স্টক আপডেট ফেইল করে, তবে অর্ডারটি ডিলিট করে রিফান্ড প্রসেস করতে হতে পারে (রোলব্যাক)
      await orderCollection.deleteOne({ _id: result.insertedId });
      return { success: false, message: stockResult?.message || "Product went out of stock." };
    }

    // ৮. পেমেন্ট সাকসেস হওয়ার পর কার্ট খালি করা (যদি কার্ট থেকে কেনা হয়)
    if (mode !== "buy-now") {
      const cartCollection = await dbConnect(collections.CART);
      await cartCollection.deleteMany({ userEmail });
    }

    // রিভ্যালিডেট করা যাতে ড্যাশবোর্ড এবং কার্ট আপডেট থাকে
    revalidatePath("/dashboard/orders");
    revalidatePath("/cart");

    return {
      success: true,
      orderId: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("Stripe verification full error:", error);
    return { success: false, message: "An unexpected error occurred during verification." };
  }
};