const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path');
const dotenv = require('dotenv');

// Determine the current environment
const ENV = process.env.NODE_ENV || 'development'

// Load the appropriate .env file
dotenv.config({ path: path.resolve(__dirname, `../.env.${ENV}`) });

const mongoUri = process.env.MONGODB_URI;

const dbName = 'ChatPFQ'

const client = new MongoClient(mongoUri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

async function connect() {
    await client.connect()
    console.log('Connected to DB')
}

async function close() {
    await client.close()
    console.log('MongoDB connection closed')
}

module.exports = {
    client,
    connect,
    close
}