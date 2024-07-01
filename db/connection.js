const { MongoClient } = require('mongodb');
const path = require('path');
const dotenv = require('dotenv');

// Determine the current environment
const ENV = process.env.NODE_ENV || 'development'

// Load the appropriate .env file
dotenv.config({ path: path.resolve(__dirname, `../.env.${ENV}`) });

const mongoUri = process.env.MONGODB_URI;

console.log(mongoUri)