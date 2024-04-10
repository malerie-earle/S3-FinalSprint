const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const dal = require("./m.auth_db.js");
const logger = require("../logEvents.js");

async function getAllRecipes() {
  logger.info('mongo.dal.getRecipes()');
  try {
    await dal.connect();
    logger.info('Connected to MongoDB');
    const recipes = dal.db.collection('Recipes');
    const result = await recipes.find().toArray();
    logger.info(result);
    return result;
  } catch(error) {
    logger.error('Error occurred while fetching data from MongoDB:', error);
    throw error;
  } finally {
    logger.info('Closing the connection to MongoDB');
    dal.close();
  }
}

async function getRecipeById(_id) {
  logger.info('mongo.dal.getRecipeById()');
  try {
    await dal.connect();
    logger.info('Connected to MongoDB');
    const recipes = dal.db.collection('Recipes');
    const result = await recipes.findOne({ _id: ObjectId(_id) });
    return result;
  } catch(error) {
    logger.error('Error occurred while fetching data from MongoDB:', error);
    throw error;
  } finally {
    logger.info('Closing the connection to MongoDB');
    dal.close();
  }
}

module.exports = {
  getAllRecipes,
  getRecipeById
}