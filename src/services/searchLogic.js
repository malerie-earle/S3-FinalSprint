const logger = require('../logEvents.js');
const pgDal = require('./pg.auth_db.js');
const mDal = require('./m.auth_db.js');

async function searchInPostgres(query) {
  try {
    const client = await pgDal.connect();

    // Query the system catalogs to get all tables and columns
    const tablesQuery = `
      SELECT table_name, column_name
      FROM information_schema.columns
      WHERE table_schema = 'public' AND data_type IN ('character varying', 'text');
    `;
    const tablesResult = await client.query(tablesQuery);

    // Construct SQL queries to search in all relevant columns of all tables
    const searchQueries = tablesResult.rows.map(row => {
      return `SELECT * FROM ${row.table_name} WHERE ${row.column_name} ILIKE $1`;
    });

    // Execute search queries and aggregate results
    const searchResults = [];
    for (const searchQuery of searchQueries) {
      const result = await client.query(searchQuery, ['%' + query + '%']);
      searchResults.push(...result.rows);
    }

    // Release the client back to the pool
    client.release();

    return searchResults;
  } catch (error) {
    logger.error('Error searching in PostgreSQL:', error);
    throw error;
  }
}

async function searchInMongo(query) {
  try {
    // Connect to MongoDB
    const client = await mDal.connect();

    // Specify the database and collection
    const db = client.db('NewfieNook'); 
    const collection = db.collection('Recipes'); 

    // Perform the search using safe query building techniques
    const result = await collection.find({ $text: { $search: query } }).toArray();

    // Close the connection
    await client.close();

    return result;
  } catch (error) {
    logger.error('Error searching in MongoDB:', error);
    throw error;
  }
}

module.exports = {
  searchInPostgres,
  searchInMongo
};
