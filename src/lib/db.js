const uri = process.env.URI;
const dbname = process.env.DBNAME;

export const collections = {
  USERS: "users",
};
//  npm install mongodb first
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(uri, {
     serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
     }
});

export const dbConnect = async (cname) => {
     return client.db(dbname).collection(cname)

}