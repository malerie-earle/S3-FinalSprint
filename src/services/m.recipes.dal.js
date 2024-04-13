const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const dal = require("./m.auth_db.js");
const logger = require("../logEvents.js");

async function getAllRecipes(page = 1, pageSize = 50) {
  try {
    await dal.connect();
    logger.info('Connected to MongoDB');

    // Parse page and pageSize to integers
    page = !isNaN(Number(page)) ? Number(page) : 1;
    pageSize = !isNaN(Number(pageSize)) ? Number(pageSize) : 50;

    const recipes = dal.db.collection('Recipes');

    // Calculate skip value based on page and pageSize
    const skip = (page - 1) * pageSize;
    const theRecipes = await recipes.find().skip(skip).limit(pageSize).toArray();

    // logger.info(theRecipes);
    return { page, pageSize, theRecipes };
  } catch (error) {
    logger.error('Error occurred while fetching data from MongoDB:', error);
    throw error;
  // } finally {
  //   logger.info('Closing the connection to MongoDB');
  //   dal.close();
  }
}

module.exports = {
  getAllRecipes
};



async function getRecipeById(_id) {
  logger.info('mongo.dal.getRecipeById()');
  try {
    await dal.connect();
    logger.info('Connected to MongoDB');
    const recipes = dal.db.collection('Recipes');
    const result = await recipes.findOne({ _id: ObjectId(_id) });
    logger.info('Result:', result);
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