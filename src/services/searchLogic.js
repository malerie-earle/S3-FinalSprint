// Check if connection string is defined
if (!process.env.MDBATLAS) {
  throw new Error('The MDBATLAS environment variable is not set');
}

// Import the required modules 
const { logger } = require('../logEvents.js');
const pgDal = require('./pg.auth_db.js');
const mDal = require('./m.auth_db.js');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const checkIndexes = require('./searchIndexes');

// Function to search in PostgreSQL
async function searchInPostgres(query) {
  // Declare the client variable
  let client; 
  try {
    // Connect to PostgreSQL
    client = await pgDal.connect();

    // Query the system catalogs to get all tables and columns
    const tablesQuery = `
      SELECT table_name, column_name
      FROM information_schema.columns
      WHERE table_schema = 'public' AND data_type IN ('character varying', 'text');
    `;
    const tablesResult = await client.query(tablesQuery);

    // Construct SQL queries to search in all relevant columns of all tables
    const searchQueries = tablesResult.rows.map(row => {
      return `SELECT *, '${row.table_name}' as type FROM "${row.table_name}" WHERE "${row.column_name}" ILIKE $1`;
    });

    // Execute search queries and aggregate results
    const searchResults = [];
    for (const searchQuery of searchQueries) {
      const result = await client.query(searchQuery, ['%' + query + '%']);
      result.rows.forEach(row => {
        // Ensure row is an array
        row = Array.isArray(row) ? row : [row];
        searchResults.push(row);
      });
    }
    // Return the search results
    logger.info(searchResults);
    return searchResults; 
  
  // Handle errors
  } catch (error) {
    logger.error('Error searching in PostgreSQL:', error);
    throw error;

  // Ensure the client is released back to the pool
  } finally {
    try {
      if (client) {
        await client.release();
      }
    // Handle errors
    } catch (error) {
      logger.error('Error releasing PostgreSQL client:', error);
    }
  }
}



// Function to search in MongoDB
async function searchInMongo(query) {
  // Declare the Recipe model and client variables
  let Recipe;
  let client;
  let searchResults = [];

  // Ensure MongoDB indexes before performing the search
  await checkIndexes();

  try {
    // Check if the Recipe model is already defined
    if (mongoose.models[process.env.MDBCOLLECTION]) { 
      Recipe = mongoose.model(process.env.MDBCOLLECTION); 

    // Define the Recipe model schema if it's not already defined
    } else {
      const RecipeSchema = new mongoose.Schema({
        title: String,
        ingredients: [String],
        directions: [String],
        link: String,
        source: String,
        NER: [String],
      });
      // Create the Recipe model
      Recipe = mongoose.model(process.env.MDBCOLLECTION, RecipeSchema);
    }

    // Create a new MongoClient instance
    client = new MongoClient(process.env.MDBATLAS);

    // Connect to MongoDB
    await client.connect();

    // Access the database and collection
    const db = client.db(process.env.MDBNAME);
    const collection = db.collection(process.env.MDBCOLLECTION); // Use environment variable

    // Perform the search using MongoDB's text search feature
    const result = await collection.find({ $text: { $search: query } }).toArray();

    // Add the search results to searchResults
    searchResults = result.map(item => {
      // Add a type property to each result object
      item.type = process.env.MDBCOLLECTION;
      logger.info('Item: ', item);
      return item;
    });

  // Handle errors
  } catch (error) {
    logger.error('Error searching in MongoDB:', error);
    throw error;
  
  // Ensure the client is closed
  } finally {
    if (client && client.topology.isConnected()) {
      await client.close();
    }
  }
  // Return the search results
  logger.info(searchResults);
  return searchResults;
}

// Export the functions
module.exports = {
  searchInPostgres,
  searchInMongo
};