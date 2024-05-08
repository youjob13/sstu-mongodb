import { MongoClient } from "mongodb";

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "booking";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  return "done.";
}

export function connectToCollection(collectionName) {
  const db = client.db(dbName);
  return db.collection(collectionName);
}

export async function start() {
  return main().then(console.log).catch(console.error);
}

export async function closeMongoDBConnection() {
  if (client && client.isConnected()) {
    await client.close();
    console.log("MongoDB connection closed");
  }
}
