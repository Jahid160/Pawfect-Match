import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.URI;


const dbname = process.env.DBNAME;

export const collections = {
  USERS: "users",
  PETS: 'pets',
  ADOPTIONS: 'adoptionsInfo',
  SHELTER: 'shelterInfo',
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
    // console.log(" Database indices verified");
  } catch (error) {
    console.error(" Failed to setup indices:", error);
  }
};

let dbInstance = null;

export const dbConnect = async (cname) => {
  if (!dbInstance) {
    await client.connect();
    dbInstance = client.db(dbname);
    // Run index setup only once when the connection is first established
    await setupIndices(dbInstance);
  }
  return dbInstance.collection(cname);
};