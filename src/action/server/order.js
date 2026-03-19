"use server";

import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { collections, dbConnect } from "@/lib/db";
import { reduceFoodStock } from "@/action/server/foods";

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
      productId: item.productId || item.foodId || item.product_id || null,
      foodId: item.foodId || item.productId || item.product_id || null,
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
      paymentStatus:
        paymentMethod === "Cash on Delivery" ? "unpaid" : "pending",
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

    const stockResult = await reduceFoodStock(orderItems);

    if (!stockResult?.success) {
      await orderCollection.deleteOne({ _id: result.insertedId });

      return {
        success: false,
        message: stockResult?.message || "Stock update failed.",
      };
    }

    await cartCollection.deleteMany({ userEmail });

    revalidatePath("/cart");
    revalidatePath("/checkout");
    revalidatePath("/dashboard/pet-food&accessories");
    revalidatePath("/pet-food");

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

export const createSingleFoodOrder = async (payload) => {
  try {
    const {
      userEmail,
      customerName,
      phone,
      address,
      city,
      area,
      note = "",
      foodId,
      quantity = 1,
      paymentMethod = "Cash on Delivery",
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
        message: "Missing required checkout information.",
      };
    }

    if (!ObjectId.isValid(foodId)) {
      return {
        success: false,
        message: "Invalid food ID.",
      };
    }

    const foodsCollection = await dbConnect(collections.FOODS);
    const orderCollection = await dbConnect(collections.ORDER);

    const food = await foodsCollection.findOne({ _id: new ObjectId(foodId) });

    if (!food) {
      return {
        success: false,
        message: "Food not found.",
      };
    }

    const qty = Number(quantity || 1);

    if (Number(food.stock || 0) < qty) {
      return {
        success: false,
        message: "Not enough stock available.",
      };
    }

    const orderItems = [
      {
        productId: food._id.toString(),
        foodId: food._id.toString(),
        productName: food.productName || "",
        brand: food.brand || "",
        image: food.image || "",
        weight: food.weight || "",
        weightUnit: food.weightUnit || "",
        quantity: qty,
        stock: Number(food.stock || 0),
        price: Number(
          food.discountPrice && Number(food.discountPrice) < Number(food.price)
            ? food.discountPrice
            : food.price
        ),
        lineTotal:
          Number(
            food.discountPrice && Number(food.discountPrice) < Number(food.price)
              ? food.discountPrice
              : food.price
          ) * qty,
      },
    ];

    const totalItems = qty;
    const subtotal = orderItems[0].lineTotal;
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
      paymentStatus:
        paymentMethod === "Cash on Delivery" ? "unpaid" : "pending",
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

    const stockResult = await reduceFoodStock(orderItems);

    if (!stockResult?.success) {
      await orderCollection.deleteOne({ _id: result.insertedId });

      return {
        success: false,
        message: stockResult?.message || "Stock update failed.",
      };
    }

    revalidatePath("/pet-food");
    revalidatePath("/checkout");
    revalidatePath("/dashboard/pet-food&accessories");

    return {
      success: true,
      insertedId: result.insertedId.toString(),
      message: "Order placed successfully.",
    };
  } catch (error) {
    console.error("createSingleFoodOrder error:", error);
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

    return orders.map((order) => ({
      ...order,
      _id: order._id.toString(),
    }));
  } catch (error) {
    console.error("getAllOrders error:", error);
    return [];
  }
};
