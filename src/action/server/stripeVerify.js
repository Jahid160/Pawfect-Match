"use server";

import Stripe from "stripe";
import { dbConnect, collections } from "@/lib/db";
import { getCartItems } from "@/action/server/cart";
// নতুন জেনেরিক স্টক রিডিউসার ইমপোর্ট করতে হবে (নিচে ব্যাখ্যা দিচ্ছি)
import { reduceProductStock } from "@/action/server/stock"; 
import { ObjectId } from "mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const verifyStripePayment = async (sessionId, userEmail) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return { success: false, message: "Payment not completed." };
    }

    const orderCollection = await dbConnect(collections.ORDER);

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

    let orderItems = [];
    let totalAmount = 0;

    if (mode === "buy-now") {
      // ১. প্রোডাক্ট টাইপ চেক করা (মেটাডাটা থেকে আসছে)
      const productType = metadata.productType || "food"; 
      const collectionName = productType === "accessory" ? collections.ACCESSORIES : collections.FOODS;
      
      const productCollection = await dbConnect(collectionName);
      const productId = metadata.productId || metadata.foodId;
      const quantity = Number(metadata.quantity || 1);

      if (!productId || !ObjectId.isValid(productId)) {
        return { success: false, message: "Invalid product in metadata." };
      }

      const product = await productCollection.findOne({
        _id: new ObjectId(productId),
      });

      if (!product) {
        return { success: false, message: "Product not found." };
      }

      const finalPrice =
        product.discountPrice && Number(product.discountPrice) < Number(product.price)
          ? Number(product.discountPrice)
          : Number(product.price);

      orderItems = [
        {
          productId: product._id.toString(),
          productName: product.productName || "",
          brand: product.brand || "",
          image: product.image || "",
          category: product.category || "",
          productType: productType, // অর্ডারে টাইপ সেভ রাখা ভালো
          quantity,
          price: finalPrice,
          lineTotal: finalPrice * quantity,
        },
      ];

      totalAmount = finalPrice * quantity;
    } else {
      // ২. কার্ট থেকে অর্ডার (এখানে কার্ট আইটেমে আগে থেকেই productType থাকা উচিত)
      const cartItems = await getCartItems(userEmail);

      if (!cartItems.length) {
        return { success: false, message: "Cart is empty." };
      }

      orderItems = cartItems.map((item) => ({
        productId: item.productId || item.foodId || item._id,
        productName: item.productName || "",
        productType: item.productType || "food", // ডিফল্ট ফুড
        quantity: Number(item.quantity || 1),
        price: Number(item.price || 0),
        lineTotal: Number(item.price || 0) * Number(item.quantity || 1),
      }));

      totalAmount = orderItems.reduce(
        (sum, item) => sum + Number(item.lineTotal || 0),
        0
      );
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
      totalItems: orderItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
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
      return { success: false, message: "Order save failed." };
    }

    // ৩. স্টক আপডেট (জেনেরিক ফাংশন যা টাইপ অনুযায়ী স্টক কমাবে)
    const stockResult = await reduceProductStock(orderItems);

    if (!stockResult?.success) {
      // স্টক আপডেট ফেইল করলে অর্ডার ডিলিট করে দেয়া (রোলব্যাক)
      await orderCollection.deleteOne({ _id: result.insertedId });
      return {
        success: false,
        message: stockResult?.message || "Stock update failed.",
      };
    }

    if (mode !== "buy-now") {
      const cartCollection = await dbConnect(collections.CART);
      await cartCollection.deleteMany({ userEmail });
    }

    return {
      success: true,
      orderId: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("Stripe verify error:", error);
    return { success: false, message: error.message };
  }
};