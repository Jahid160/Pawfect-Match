"use server";

import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { collections, dbConnect } from "@/lib/db";

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

    if (
      !userEmail ||
      !customerName ||
      !phone ||
      !address ||
      !city ||
      !area
    ) {
      return {
        success: false,
        message: "Missing required checkout information.",
      };
    }

    const cartCollection = await dbConnect(collections.CART);
    const orderCollection = await dbConnect(collections.ORDER);

    const cartItems = await cartCollection.find({ userEmail }).toArray();

    if (!cartItems.length) {
      return {
        success: false,
        message: "Your cart is empty.",
      };
    }

    const orderItems = cartItems.map((item) => ({
      productId: item.productId || item.product_id || null,
      productName: item.productName || "",
      brand: item.brand || "",
      image: item.image || "",
      weight: item.weight || "",
      weightUnit: item.weightUnit || "",
      quantity: Number(item.quantity || 1),
      stock: Number(item.stock || 0),
      price: Number(item.price || 0),
      lineTotal: Number(item.price || 0) * Number(item.quantity || 1),
    }));

    const totalItems = orderItems.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0
    );

    const subtotal = orderItems.reduce(
      (sum, item) => sum + Number(item.lineTotal || 0),
      0
    );

    const shippingCost = 0;
    const totalAmount = subtotal + shippingCost;

    const orderDoc = {
      userEmail,
      customerName,
      phone,
      shippingAddress: {
        address,
        city,
        area,
      },
      paymentMethod,
      paymentStatus: paymentMethod === "Cash on Delivery" ? "unpaid" : "pending",
      orderStatus: "pending",
      note,
      items: orderItems,
      totalItems,
      subtotal,
      shippingCost,
      totalAmount,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await orderCollection.insertOne(orderDoc);

    if (!result.insertedId) {
      return {
        success: false,
        message: "Order creation failed.",
      };
    }

    await cartCollection.deleteMany({ userEmail });

    revalidatePath("/cart");
    revalidatePath("/checkout");
    revalidatePath("/dashboard/orders");

    return {
      success: true,
      message: "Order placed successfully.",
      insertedId: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("createOrderFromCart error:", error);
    return {
      success: false,
      message: "Something went wrong while placing the order.",
    };
  }
};

export const getOrdersByEmail = async (userEmail) => {
  try {
    if (!userEmail) return [];

    const orderCollection = await dbConnect(collections.ORDER);

    const orders = await orderCollection
      .find({ userEmail })
      .sort({ createdAt: -1 })
      .toArray();

    return orders.map((order) => ({
      ...order,
      _id: order._id.toString(),
    }));
  } catch (error) {
    console.error("getOrdersByEmail error:", error);
    return [];
  }
};

export const getSingleOrder = async (id, userEmail) => {
  try {
    if (!id || id.length !== 24) return null;

    const orderCollection = await dbConnect(collections.ORDER);

    const order = await orderCollection.findOne({
      _id: new ObjectId(id),
      userEmail,
    });

    if (!order) return null;

    return {
      ...order,
      _id: order._id.toString(),
    };
  } catch (error) {
    console.error("getSingleOrder error:", error);
    return null;
  }
};

export const getAllOrders = async () => {
  try {
    const orderCollection = await dbConnect(collections.ORDER);
    const orders = await orderCollection.find({}).sort({ createdAt: -1 }).toArray();
    return orders.map(order => ({
      ...order,
      _id: order._id.toString(),
    }));
  } catch (error) {
    console.error("getAllOrders error:", error);
    return [];
  }
};
