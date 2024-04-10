const { MongoClient } = require('mongodb');
const logger = require('../logEvents.js');

const atlas = process.env.MDBATLAS;
// mongodb+srv://admin:Er20!24mvomm@newfiecluster.culsrfo.mongodb.net/

const pool = new MongoClient(atlas);
logger.info('MongoDB Atlas Connection Pool created.');

module.exports = pool;

