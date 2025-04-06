import { MongoClient, Db } from 'mongodb';

const mongoURI = process.env.MONGO_URI as string;

if (!mongoURI) {
  throw new Error('❌ MONGO_URI is not defined in .env file');
}

let db: Db;
let client: MongoClient;

export const connectDB = async (): Promise<Db> => {
  if (db) return db;

  try {
    client = new MongoClient(mongoURI);
    await client.connect();
    db = client.db(); // default DB from URI
    console.log('✅ Connected to MongoDB using native driver');
    return db;
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  }
};

export const closeDB = async () => {
  if (client) {
    await client.close();
    console.log('🔒 MongoDB connection closed');
  }
};
