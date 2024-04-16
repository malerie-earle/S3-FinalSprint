const logger = require('../logEvents.js');
const pgDal = require('./pg.auth_db.js');
const mDal = require('./m.auth_db.js');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

async function searchInPostgres(query) {
  let client; 
  try {
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

    return searchResults; // Return the search results
  } catch (error) {
    logger.error('Error searching in PostgreSQL:', error);
    throw error;
  } finally {
    // Release the client back to the pool
    try {
      if (client) {
        await client.release();
      }
    } catch (error) {
      logger.error('Error releasing PostgreSQL client:', error);
    }
  }
}


async function searchInMongo(query) {
  try {
    let Recipe;
    if (mongoose.models.Recipes) {
      Recipe = mongoose.model('Recipes');
    } else {
      const RecipeSchema = new mongoose.Schema({
        title: String,
        ingredients: [String],
        directions: [String],
        link: String,
        source: String,
        NER: [String],
      });
      Recipe = mongoose.model('Recipes', RecipeSchema);
    }

    // Connect to MongoDB
    const isConnected = await mDal.connect();
    if (!isConnected) {
      throw new Error('Unable to connect to MongoDB');
    }

    // Perform the search using safe query building techniques
    const result = await Recipe.find({ $text: { $search: query } }).exec();

    // Add a type property to each result object
    result.forEach(item => {
      // Ensure item is an array
      item = Array.isArray(item) ? item : [item];
      item.type = 'Recipes'; // Replace 'Recipes' with the appropriate collection name
    });

    // Close the connection
    await mDal.close();

    return result || []; // Ensure the function always returns an array
  } catch (error) {
    logger.error('Error searching in MongoDB:', error);
    throw error;
  }
}

module.exports = {
  searchInPostgres,
  searchInMongo
};