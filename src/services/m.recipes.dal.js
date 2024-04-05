const { ObjectId } = require("mongodb");
// We need our mongodb connection pool
const dal = require("./m.auth_db.js");
const logger = require("../logEvents.js");

async function getAllRecipes() {
  logger.info('mongo.dal.getRecipes()');
  try {
    await dal.connect();
    logger.info('Connected to MongoDB');
    // fetch the data into a cursor
    // strongly suggest you become the self-directed learner that 
    // public school stole from you. You can learn all this on your own!
    // search up "database cursor"
    const cursor = dal.db("Auth").collection("Recipes").find();
    // I need ALL the data into an array. Cursors exist for dealing with 
    // a lot of data. And a few other things.
    const results = await cursor.toArray();
    return results;
  } catch(error) {
    logger.error('Error occurred while fetching data from MongoDB:', error);
    throw error;
  } finally {
    // release the database connection back into the pool
    logger.info('Closing the connection to MongoDB');
    dal.close();
  }
};

module.exports = {
  getAllRecipes,
}