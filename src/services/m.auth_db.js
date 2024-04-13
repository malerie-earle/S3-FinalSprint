const { MongoClient } = require('mongodb');
const logger = require('../logEvents.js');

class Pool {
  constructor() {
    this.client = new MongoClient(process.env.MDBATLAS);
    this.db = null;
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(process.env.MDBNAME);
    } catch (error) {
      logger.error('Error connecting to MongoDB Atlas: ', error);
      throw error; // Propagate the error
    }
  }

  async close() {
    await this.client.close();
    logger.info('MongoDB Atlas Connection Closed.');
  }
}

const pool = new Pool();

module.exports = pool;