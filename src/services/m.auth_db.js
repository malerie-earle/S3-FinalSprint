const { MongoClient } = require('mongodb');
const logger = require('../logEvents.js');

class pool {
  constructor() {
    this.client = new MongoClient(process.env.MDBATLAS, { useUnifiedTopology: true });
    this.db = null;
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(process.env.MDBNAME);
      logger.info('MongoDB Atlas Connection Established.');
    } catch (error) {
      logger.error('Error connecting to MongoDB Atlas: ', error);
    }
  }

  async close() {
    await this.client.close();
    logger.info('MongoDB Atlas Connection Closed.');
  }
}


module.exports = pool;

