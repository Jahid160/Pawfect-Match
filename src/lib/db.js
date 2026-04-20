import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.URI;
const dbname = process.env.DBNAME;

export const collections = {
  USERS: "users",
  ENTRYREQ: "entryreq",
  PETS: "pets",
  FOODS: "foods",
  ACCESSORIES: "accessories",
  ADOPTIONS: "adoptionsInfo",
  SHELTER: "shelterInfo",
  VACCINES: "vaccines",
  ORDERS: "orders",
  CART: "cart",
  NOTIFICATIONS: "notifications",
  VACCINES_ORDERS: "vaccine_orders"
};

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const setupIndices = async (db) => {
  try {
    await db.collection(collections.USERS).createIndex(
      { email: 1 },
      { unique: true, name: "unique_email_idx" }
    );
  } catch (error) {
    console.error("Failed to setup indices:", error);
  }
};

let dbInstance = null;

export const dbConnect = async (cname) => {
  if (!cname) {
    throw new Error("Collection name is required for dbConnect!");
  }

  try {
    if (!dbInstance) {
      await client.connect();
      dbInstance = client.db(dbname);
      await setupIndices(dbInstance);
    }

    return dbInstance.collection(cname);
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw new Error("Failed to connect to database");
  }
};