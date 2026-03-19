export const reduceProductStock = async (items) => {
  try {
    for (const item of items) {
      const collectionName = item.productType === "accessory" ? collections.ACCESSORIES : collections.FOODS;
      const collection = await dbConnect(collectionName);
      
      await collection.updateOne(
        { _id: new ObjectId(item.productId) },
        { $inc: { stock: -item.quantity } }
      );
    }
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};