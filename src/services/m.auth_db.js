// Check if connection string is defined 
if (!process.env.MDBATLAS) {
  throw new Error('The MDBATLAS environment variable is not set');
}

// Import the required modules
const { MongoClient } = require('mongodb');
const logger = require('../logEvents.js');

// Create a connection pool
class Pool {
  constructor() {
    this.client = new MongoClient(process.env.MDBATLAS);
    this.db = null;
  }

  // Connect to MongoDB Atlas
  async connect() {
    try {
      // Connect to the MongoDB cluster
      await this.client.connect();
      // Access the database
      this.db = this.client.db(process.env.MDBNAME);
      logger.info('MongoDB Atlas Connection Established.');
    // Handle errors
    } catch (error) {
      logger.error('Error connecting to MongoDB Atlas: ', error);
    }
  }

  // Check if the client is connected
  isConnected() {
    logger.info(this.client.isConnected());
    return this.client.isConnected();
  }

  // Close the connection
  async close() {
    await this.client.close();
    logger.info('MongoDB Atlas Connection Closed.');
  }
}

const pool = new Pool();

module.exports = pool;