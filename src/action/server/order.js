"use server";

import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { collections, dbConnect } from "@/lib/db";
import { reduceProductStock } from "@/action/server/stock"; // জেনেরিক স্টক রিডিউসার

/**
 * ১. কার্ট থেকে অর্ডার তৈরি করা (Cash on Delivery বা অন্য পেমেন্ট)
 */
export const createOrderFromCart = async (payload) => {
  try {
    const {
      userEmail,
      customerName,
      phone,
      address,
      city,
      area,
      paymentMethod = "Cash on Delivery",
      note = "",
    } = payload || {};

    // ভ্যালিডেশন
    if (!userEmail || !customerName || !phone || !address || !city || !area) {
      return { success: false, message: "Missing required checkout information." };
    }

    const cartCollection = await dbConnect(collections.CART);
    const orderCollection = await dbConnect(collections.ORDER);

    const cartItems = await cartCollection.find({ userEmail }).toArray();

    if (!cartItems.length) {
      return { success: false, message: "Your cart is empty." };
    }

    // আইটেম ম্যাপিং (এখানে productType থাকা জরুরি)
    const orderItems = cartItems.map((item) => ({
      productId: (item.productId || item.foodId || item._id).toString(),
      productName: item.productName || "",
      brand: item.brand || "",
      image: item.image || "",
      weight: item.weight || "",
      weightUnit: item.weightUnit || "",
      quantity: Number(item.quantity || 1),
      price: Number(item.price || 0),
      productType: item.productType || "food", // food/accessory
      lineTotal: Number(item.price || 0) * Number(item.quantity || 1),
    }));

    const totalItems = orderItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    const subtotal = orderItems.reduce((sum, item) => sum + Number(item.lineTotal || 0), 0);
    const totalAmount = subtotal; // এখানে শিপিং কস্ট যোগ করতে পারো ভবিষ্যতে

    const orderDoc = {
      userEmail,
      customerName,
      phone,
      shippingAddress: { address, city, area },
      paymentMethod,
      paymentStatus: paymentMethod === "Cash on Delivery" ? "unpaid" : "pending",
      orderStatus: "pending",
      note,
      items: orderItems,
      totalItems,
      subtotal,
      shippingCost: 0,
      totalAmount,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await orderCollection.insertOne(orderDoc);

    if (!result.insertedId) {
      return { success: false, message: "Order creation failed." };
    }

    // স্টক রিডাকশন (খাবার ও এক্সেসরিজ উভয়ের জন্য)
    const stockResult = await reduceProductStock(orderItems);

    if (!stockResult?.success) {
      // স্টক কমাতে সমস্যা হলে অর্ডারটি রোলব্যাক (ডিলিট) করা হচ্ছে
      await orderCollection.deleteOne({ _id: result.insertedId });
      return { success: false, message: stockResult?.message || "Stock update failed." };
    }

    // অর্ডার সফল হলে কার্ট খালি করা
    await cartCollection.deleteMany({ userEmail });

    // ক্যাশ রিভ্যালিডেশন
    revalidatePath("/cart");
    revalidatePath("/checkout");
    revalidatePath("/dashboard/orders");
    revalidatePath("/pet-food");
    revalidatePath("/pet-accessories");

    return {
      success: true,
      message: "Order placed successfully.",
      insertedId: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("createOrderFromCart error:", error);
    return { success: false, message: "Something went wrong while placing the order." };
  }
};

/**
 * ২. সিঙ্গেল প্রোডাক্ট অর্ডার (Buy Now - Food/Accessory)
 */
export const createSingleOrder = async (payload) => {
  try {
    const {
      userEmail,
      customerName,
      phone,
      address,
      city,
      area,
      note = "",
      productId,
      productType = "food", // 'food' বা 'accessory'
      quantity = 1,
      paymentMethod = "Cash on Delivery",
    } = payload || {};

    if (!userEmail || !customerName || !phone || !address || !city || !area || !productId) {
      return { success: false, message: "Missing required checkout information." };
    }

    if (!ObjectId.isValid(productId)) {
      return { success: false, message: "Invalid product ID." };
    }

    const collectionName = productType === "accessory" ? collections.ACCESSORIES : collections.FOODS;
    const productCollection = await dbConnect(collectionName);
    const orderCollection = await dbConnect(collections.ORDER);

    const product = await productCollection.findOne({ _id: new ObjectId(productId) });

    if (!product) {
      return { success: false, message: "Product not found." };
    }

    const qty = Number(quantity || 1);
    if (Number(product.stock || 0) < qty) {
      return { success: false, message: "Not enough stock available." };
    }

    // ডিসকাউন্ট প্রাইস হ্যান্ডলিং
    const finalPrice = product.discountPrice && Number(product.discountPrice) < Number(product.price)
      ? Number(product.discountPrice)
      : Number(product.price);

    const orderItems = [{
      productId: product._id.toString(),
      productName: product.productName || "",
      brand: product.brand || "",
      image: product.image || "",
      weight: product.weight || "",
      weightUnit: product.weightUnit || "",
      productType,
      quantity: qty,
      price: finalPrice,
      lineTotal: finalPrice * qty,
    }];

    const orderDoc = {
      userEmail,
      customerName,
      phone,
      shippingAddress: { address, city, area },
      paymentMethod,
      paymentStatus: paymentMethod === "Cash on Delivery" ? "unpaid" : "pending",
      orderStatus: "pending",
      note,
      items: orderItems,
      totalItems: qty,
      subtotal: orderItems[0].lineTotal,
      shippingCost: 0,
      totalAmount: orderItems[0].lineTotal,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await orderCollection.insertOne(orderDoc);

    const stockResult = await reduceProductStock(orderItems);

    if (!stockResult?.success) {
      await orderCollection.deleteOne({ _id: result.insertedId });
      return { success: false, message: "Stock update failed." };
    }

    revalidatePath("/checkout");
    revalidatePath("/dashboard/orders");
    revalidatePath(productType === "accessory" ? "/pet-accessories" : "/pet-food");

    return {
      success: true,
      insertedId: result.insertedId.toString(),
      message: "Order placed successfully.",
    };
  } catch (error) {
    console.error("createSingleOrder error:", error);
    return { success: false, message: "Something went wrong while placing the order." };
  }
};

/**
 * ৩. ইউজারের ইমেইল অনুযায়ী সব অর্ডার নিয়ে আসা
 */
export const getOrdersByEmail = async (userEmail) => {
  try {
    if (!userEmail) return [];
    const orderCollection = await dbConnect(collections.ORDER);
    const orders = await orderCollection.find({ userEmail }).sort({ createdAt: -1 }).toArray();
    return orders.map((order) => ({ ...order, _id: order._id.toString() }));
  } catch (error) {
    console.error("getOrdersByEmail error:", error);
    return [];
  }
};

/**
 * ৪. সিঙ্গেল অর্ডার ডিটেইলস দেখা
 */
export const getSingleOrder = async (id, userEmail) => {
  try {
    if (!id || id.length !== 24) return null;
    const orderCollection = await dbConnect(collections.ORDER);
    const order = await orderCollection.findOne({ _id: new ObjectId(id), userEmail });
    return order ? { ...order, _id: order._id.toString() } : null;
  } catch (error) {
    console.error("getSingleOrder error:", error);
    return null;
  }
};

/**
 * ৫. অ্যাডমিনের জন্য সব অর্ডার নিয়ে আসা
 */
export const getAllOrders = async () => {
  try {
    const orderCollection = await dbConnect(collections.ORDER);
    const orders = await orderCollection.find({}).sort({ createdAt: -1 }).toArray();
    return orders.map((order) => ({ ...order, _id: order._id.toString() }));
  } catch (error) {
    console.error("getAllOrders error:", error);
    return [];
  }
};