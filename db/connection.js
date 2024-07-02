const { MongoClient, ServerApiVersion } = require("mongodb");
const path = require("path");
const dotenv = require("dotenv");

// Determine the current environment
const ENV = process.env.NODE_ENV || "development";

// Load the appropriate .env file
dotenv.config({ path: path.resolve(__dirname, `../.env.${ENV}`) });

const mongoUri = process.env.MONGODB_URI;

const dbName = "ChatPFQ";

let client;

async function connect() {
  if (!client) {
    client = new MongoClient(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
  }
  return client;
}

async function close() {
  if (client) {
    await client.close();
    client = undefined;
  }
}

function getClient() {
  if (!client) {
    throw new Error('MongoDB client is not initialized.');
  }
  return client;
}

module.exports = {
  connect,
  close,
  getClient,
};