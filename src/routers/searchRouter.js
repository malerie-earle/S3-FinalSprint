// Import the required modules
const express = require('express');
const router = express.Router();
const { logger, logSearchQuery } = require('../logEvents.js');
const { searchInPostgres, searchInMongo } = require('../services/searchLogic.js');
const isAuthenticated = require('../middleware/authMiddleware.js');  


// List of All Available Routes
logger.info('Route: /customer/search/ - GET/READ - Search Customer Page');
logger.info('Route: /product/search/ - GET/READ - Search Product Page');
logger.info('Route: /search/ - GET/READ - Search Recipe Page');
logger.info('Route: /search/ - POST - Search Engine');


// GET - Search Customer Page
router.get('/customer/search/', isAuthentic, (req, res) => {
  logger.info('Rendering the Search Customer Page.');
  try {
    // Render the Search Customer Page
    logger.info('Rendering the Search Customer Page.');
    res.render('searchCustomers.ejs');

  // Handle errors  
  } catch (error) {
    logger.error('Error rendering the Search Customer Page:', error);
    res.status(500).render('503');
  }
});


// GET - Search Product Page
router.get('/product/search/', isAuthentic, (req, res) => {
  logger.info('Rendering the Search Product Page.');
  try {
    // Render the Search Product Page
    logger.info('Rendering the Search Product Page.');
    res.render('searchProducts.ejs');

  // Handle errors
  } catch (error) {
    logger.error('Error rendering the Search Product Page:', error);
    res.status(500).render('503');
  }
});


// GET - Search Recipe Page
router.get('/search/', isAuthentic, (req, res) => {
  logger.info('Rendering the Search Page.');
  try {
    // Render the Search Page
    logger.info('Rendering the Search Page.');
    res.render('searchEngine.ejs', { user: req.user });
  } catch (error) {
    logger.error('Error rendering the Search Page:', error);
    res.status(500).render('503');
  }
});
// POST - Search Engine
router.post('/search/', isAuthentic, async (req, res) => {
  try {
    const user_id = req.user.customer_id;
    const query = req.body.query; 
    const database = req.body.database;
    logSearchQuery(user_id, query, database);

    // Error handling
    if (!query || !database) {
      logger.error('No search query provided.');
      return res.status(400).json({ error: 'No search query provided. Database selection required.' });
    }
    // Search results
    let searchResults;

    // Search in PostgreSQL
    if (database === 'pg') {
      searchResults = await searchInPostgres(query);
      logger.info(`Search results for '${query}' in PostgreSQL`);
      return res.render('results/searchResults', { searchResults: searchResults });

    // Search in MongoDB
    } else if (database === 'mongo') {
      searchResults = await searchInMongo(query);
      logger.info(`Search results for '${query}' in MongoDB`);
      return res.render('results/searchResults', { searchResults: searchResults });

    // Search in both databases
    } else if (database === 'both') {
      let [pgResults, mongoResults] = await Promise.all([
        searchInPostgres(query),
        searchInMongo(query)
      ]);
      searchResults = [...pgResults.flat(), ...mongoResults.flat()];
      logger.info(`Search results for '${query}' in both databases`);
      return res.render('results/searchResults', { searchResults: searchResults });

    // If the database selection is invalid
    } else {
      logger.error('Invalid database selection.');
      return res.status(400).json({ error: 'Invalid database selection.' });
    }  

  // Handle errors
  } catch (error) {
    logger.error('Error searching:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Export the router
module.exports = router;
