import { MongoClient, ServerApiVersion } from "mongodb";
import dotEnv from "dotenv";
dotEnv.config();
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kpsyb7k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wxzps.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
let client: any;

export const connectToDatabase = async () => {
  try {
    if (!client) {
      client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
    }
    console.log("database connected");
    return client.db("school-management");
  } catch (err) {
    console.error("Database connection failed");
  }
};


