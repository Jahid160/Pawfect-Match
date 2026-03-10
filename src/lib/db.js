import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.URI;
const dbname = process.env.DBNAME;

export const collections = {
  USERS: "users",
  PETS: "pets",
  FOODS: "foods",
  ACCESSORIES: "accessories",
  ADOPTIONS: "adoptionsInfo",
  SHELTER: "shelterInfo",
  CART: 'cart',
  VACCINES: 'vaccines'
};

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Helper to ensure indexes exist
const setupIndices = async (db) => {
  try {
    await db.collection(collections.USERS).createIndex(
      { email: 1 },
      { unique: true, name: "unique_email_idx" }
    );
  } catch (error) {
    console.error(" Failed to setup indices:", error);
  }
};

let dbInstance = null;

export const dbConnect = async (cname) => {
  if (!cname) {
    throw new Error("Collection name is required for dbConnect!");
  }

  if (!client.connect) {
    await client.connect();
  }

  if (!dbInstance) {
    await client.connect();
    dbInstance = client.db(dbname);
    await setupIndices(dbInstance);
  }

  return dbInstance.collection(cname);
};