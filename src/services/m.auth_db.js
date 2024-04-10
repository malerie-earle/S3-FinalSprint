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

const pool = new Pool();

// Connect to the pool
pool.connect((error) => {
  if (error) {
    logger.error('Error connecting to the database', error);
  } else {
    logger.info('Connected to the PostgreSQL Database newfieNook!');
  }
});

module.exports = pool;