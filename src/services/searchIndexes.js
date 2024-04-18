// Import the required modules
const { MongoClient } = require('mongodb');
const { logger } = require('../logEvents.js');

// Check if the desired indexes exist, if not, create them
async function checkIndexes(req, res, next) {
  // Define the connection URI and create a new client
  const uri = "mongodb+srv://admin:dbpassword@newfiecluster.culsrfo.mongodb.net/NewfieNook";
  const client = new MongoClient(uri);
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    // Access the database
    const database = client.db('NewfieNook');
    // Access a specific collection
    const collection = database.collection('Recipes');
    // Retrieve the existing indexes for the collection
    const indexes = await collection.indexes();
    // Print the existing indexes
    logger.info("Existing indexes for collection:", indexes);

    // Check if the desired indexes already exist, if not, create them
    const indexNames = indexes.map(index => index.name);
    // Check if compound index exists on multiple fields
    if (!indexNames.includes("text_index")) {
      await collection.createIndex(
        { title: "text", ingredients: "text", directions: "text" },
        { name: "text_index" }
      );
      logger.info("Created compound index on 'title', 'ingredients', and 'directions' fields for text search.");
    }

    // Index additional fields as needed
    if (!indexNames.includes("source")) {
      await collection.createIndex({ source: 1 });
      logger.info("Created index on 'source' field.");
    }

    // Print a message indicating that the indexes check and creation is complete
    logger.info("Index check and creation completed.");

    // Call the next middleware function if it's provided
    if (next) {
      next();
    }
  // Handle errors
  } catch (error) {
    console.error("Error checking or creating indexes:", error);

    // Pass the error to the next middleware function if it's provided
    if (next) {
      next(error);
    }
  // Close the connection
  } finally {
    await client.close();
  }
}


// Export the function for use in other modules
module.exports = checkIndexes;