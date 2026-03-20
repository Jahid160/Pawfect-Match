"use server";

import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { collections, dbConnect } from "@/lib/db";
import { reduceProductStock } from "@/action/server/stock";


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

    if (!userEmail || !customerName || !phone || !address || !city || !area) {
      return { success: false, message: "Missing required checkout information." };
    }

    const cartCollection = await dbConnect(collections.CART);
    const orderCollection = await dbConnect(collections.ORDER);

    const cartItems = await cartCollection.find({ userEmail }).toArray();

    if (!cartItems.length) {
      return { success: false, message: "Your cart is empty." };
    }

    const orderItems = cartItems.map((item) => ({
      productId: (item.productId || item.foodId || item._id).toString(),
      productName: item.productName || "",
      brand: item.brand || "",
      image: item.image || "",
      weight: item.weight || "",
      weightUnit: item.weightUnit || "",
      quantity: Number(item.quantity || 1),
      price: Number(item.price || 0),
      productType: item.productType || "food", 
      lineTotal: Number(item.price || 0) * Number(item.quantity || 1),
    }));

    const subtotal = orderItems.reduce((sum, item) => sum + Number(item.lineTotal || 0), 0);

    const orderDoc = {
      userEmail,
      customerName,
      phone,
      shippingAddress: { address, city, area },
      paymentMethod,
      paymentStatus: paymentMethod === "Stripe" ? "pending" : "unpaid",
      orderStatus: "pending",
      note,
      items: orderItems,
      totalItems: orderItems.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      shippingCost: 0,
      totalAmount: subtotal,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // (Safety First)
    const stockResult = await reduceProductStock(orderItems);
    if (!stockResult?.success) {
      return { success: false, message: stockResult?.message || "Stock update failed." };
    }

    const result = await orderCollection.insertOne(orderDoc);

    if (!result.insertedId) {
      return { success: false, message: "Order creation failed." };
    }

    await cartCollection.deleteMany({ userEmail });

    revalidatePath("/cart");
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
      productType = "food",
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
      paymentStatus: paymentMethod === "Stripe" ? "pending" : "unpaid",
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

    const stockResult = await reduceProductStock(orderItems);
    if (!stockResult?.success) {
      return { success: false, message: "Stock update failed." };
    }

    const result = await orderCollection.insertOne(orderDoc);

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


export const updateOrderStatus = async (orderId, status, paymentStatus) => {
  try {
    const orderCollection = await dbConnect(collections.ORDER);
    const updateData = { updatedAt: new Date() };
    if (status) updateData.orderStatus = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const result = await orderCollection.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: updateData }
    );

    revalidatePath("/dashboard/orders");
    return { success: result.modifiedCount > 0 };
  } catch (error) {
    console.error("updateOrderStatus error:", error);
    return { success: false };
  }
};