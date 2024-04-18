// Import the required modules
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const dal = require("./m.auth_db.js");
const { logger } = require("../logEvents.js");

// Get all recipes with pagination
async function getAllRecipes(page = 1, pageSize = 50) {
  logger.info('MongoDB: getAllRecipes()');
  try {
    await dal.connect();
    logger.info('Connected to MongoDB');

    // Parse page and pageSize to integers
    page = !isNaN(Number(page)) ? Number(page) : 1;
    pageSize = !isNaN(Number(pageSize)) ? Number(pageSize) : 50;

    // Get the recipes collection
    const recipes = dal.db.collection('Recipes');

    // Calculate skip value based on page and pageSize
    const skip = (page - 1) * pageSize;

    // Find recipes with pagination
    logger.info(page, pageSize, skip);
    const theRecipes = await recipes.find().skip(skip).limit(pageSize).toArray();

    return { page, pageSize, theRecipes };

  // Handle errors
  } catch (error) {
    logger.error('Error occurred while fetching data from MongoDB:', error);
    throw error;

  // Close the connection
  } finally {
    logger.info('Closing the connection to MongoDB');
    dal.close();
  }
}

// Get a recipe by its ID
async function getRecipeById(_id) {
  logger.info('MongoDB: getRecipeById()');
  try {
    await dal.connect();
    logger.info('Connected to MongoDB');
    const recipes = dal.db.collection('Recipes');
    const result = await recipes.findOne({ _id: ObjectId(_id) });
    // Return the result
    logger.info('Returning the result:', result);
    return result;
  // Handle errors
  } catch(error) {
    logger.error('Error occurred while fetching data from MongoDB:', error);
    throw error;
  // Close the connection
  } finally {
    logger.info('Closing the connection to MongoDB');
    dal.close();
  }
}

// Export the functions
module.exports = {
  getAllRecipes,
  getRecipeById
};