const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.URI;
const dbname = process.env.DBNAME;

export const collections = {
  USERS: "users",
};

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let isConnected = false;

export const dbConnect = async (cname) => {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return client.db(dbname).collection(cname);
};

// const uri = process.env.MONGODB_URI;
// const dbname = process.env.DBNAME;
// export const collections = {
//   USERS: "users",
// };

// const { MongoClient, ServerApiVersion } = require("mongodb");

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
// export const dbConnect = (cname) => {
//   return client.db(dbname).collection(cname);
// };

