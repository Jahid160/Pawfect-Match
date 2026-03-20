"use server";

import Stripe from "stripe";
import { dbConnect, collections } from "@/lib/db";
import { getCartItems } from "@/action/server/cart";
import { reduceFoodStock } from "@/action/server/foods";
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
      const foodsCollection = await dbConnect(collections.FOODS);
      const foodId = metadata.foodId;
      const quantity = Number(metadata.quantity || 1);

      if (!foodId || !ObjectId.isValid(foodId)) {
        return { success: false, message: "Invalid product in metadata." };
      }

      const food = await foodsCollection.findOne({
        _id: new ObjectId(foodId),
      });

      if (!food) {
        return { success: false, message: "Food not found." };
      }

      const finalPrice =
        food.discountPrice && Number(food.discountPrice) < Number(food.price)
          ? Number(food.discountPrice)
          : Number(food.price);

      orderItems = [
        {
          productId: food._id.toString(),
          foodId: food._id.toString(),
          productName: food.productName || "",
          brand: food.brand || "",
          image: food.image || "",
          weight: food.weight || "",
          weightUnit: food.weightUnit || "",
          quantity,
          price: finalPrice,
          lineTotal: finalPrice * quantity,
        },
      ];

      totalAmount = finalPrice * quantity;
    } else {
      const cartItems = await getCartItems(userEmail);

      if (!cartItems.length) {
        return { success: false, message: "Cart is empty." };
      }

      orderItems = cartItems.map((item) => ({
        productId: item.productId || item.foodId || item.product_id || null,
        foodId: item.foodId || item.productId || item.product_id || null,
        productName: item.productName || "",
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
      totalItems: orderItems.reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0
      ),
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

    const stockResult = await reduceFoodStock(orderItems);

    if (!stockResult?.success) {
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
