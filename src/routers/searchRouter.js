const express = require('express');
const router = express.Router();
const { logger, logSearchQuery } = require('../logEvents.js');
const { searchInPostgres, searchInMongo } = require('../services/searchLogic.js');
const isAuthenticated = require('../middleware/authMiddleware.js');  


// List of All Available Routes
logger.info('Index Router - API Endpoints:');
logger.info('Route: GET/READ - Home Page - /');
logger.info('Route: GET/READ - Login Page - /login/');
logger.info('Route: GET/READ - Registration Page - /registration/');
logger.info('Route: GET/READ - Search Customer Page - /customer/search/');
logger.info('Route: GET/READ - Search Product Page - /product/search/');
logger.info('Route: GET/READ - Search Recipe Page - /search/');
logger.info('Route: POST - Search Engine - /search/');

// GET - Search Customer Page
router.get('/customer/search/', isAuthenticated, (req, res) => {
  try {
    logger.info('Rendering the Search Customer Page.');
    res.render('searchCustomers.ejs');
  } catch (error) {
    logger.error('Error rendering the Search Customer Page:', error);
    res.status(500).render('503');
  }
});


// GET - Search Product Page
router.get('/product/search/', isAuthenticated, (req, res) => {
  try {
    logger.info('Rendering the Search Product Page.');
    res.render('searchProducts.ejs');
  } catch (error) {
    logger.error('Error rendering the Search Product Page:', error);
    res.status(500).render('503');
  }
});


// GET - Search Recipe Page
router.get('/search/', isAuthenticated, (req, res) => {
  try {
    logger.info('Rendering the Search Page.');
    res.render('searchEngine.ejs');
  } catch (error) {
    logger.error('Error rendering the Search Page:', error);
    res.status(500).render('503');
  }
});
// POST - Search Engine
router.post('/search/', isAuthenticated, async (req, res) => {
  try {
    const { query, database, user_id } = req.body; 
    logSearchQuery(user_id, query, database);

    // Error handling
    if (!query || !database) {
      logger.error('No search query provided.');
      return res.status(400).json({ error: 'No search query provided. Database selection required.' });
    }
    // Search results
    let searchResults;
    // Handle search based on database selection
    if (database === 'pg') {
      searchResults = await searchInPostgres(query);
      searchResults = searchResults.flat(); 
      logger.info(`Search results for '${query}' in PostgreSQL`);
      return res.render('results/searchResults', { searchResults: searchResults });
    } else if (database === 'mongo') {
      searchResults = await searchInMongo(query);
      searchResults = searchResults.flat(); 
      logger.info(`Search results for '${query}' in MongoDB`);
      return res.render('results/searchResults', { searchResults: searchResults });
    } else if (database === 'both') {
      let [pgResults, mongoResults] = await Promise.all([
        searchInPostgres(query),
        searchInMongo(query)
      ]);
      searchResults = [...pgResults.flat(), ...mongoResults.flat()];
      logger.info(`Search results for '${query}' in both databases`);
      return res.render('results/searchResults', { searchResults: searchResults });
    } else {
      logger.error('Invalid database selection.');
      return res.status(400).json({ error: 'Invalid database selection.' });
    }  
  } catch (error) {
    logger.error('Error searching:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
