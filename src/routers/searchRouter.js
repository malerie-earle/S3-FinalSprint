const express = require('express');
const router = express.Router();
const logger = require('../logEvents.js');
const { searchInPostgres, searchInMongo } = require('../services/searchLogic.js');

// List of All Available Routes
logger.info('Index Router - API Endpoints:');
logger.info('Route: GET/READ - Home Page - /');
logger.info('Route: GET/READ - Login Page - /login/');
logger.info('Route: GET/READ - Registration Page - /registration/');

// GET - Search Customer Page
router.get('/customer/search/', (req, res) => {
  try {
    logger.info('Rendering the Search Customer Page.');
    res.render('searchCustomers.ejs');
  } catch (error) {
    logger.error('Error rendering the Search Customer Page:', error);
    res.status(500).render('503');
  }
});

// GET - Search Product Page
router.get('/product/search/', (req, res) => {
  try {
    logger.info('Rendering the Search Product Page.');
    res.render('searchProducts.ejs');
  } catch (error) {
    logger.error('Error rendering the Search Product Page:', error);
    res.status(500).render('503');
  }
});

// GET - Search Recipe Page
router.get('/search/', (req, res) => {
  try {
    logger.info('Rendering the Search Page.');
    res.render('searchEngine.ejs');
  } catch (error) {
    logger.error('Error rendering the Search Page:', error);
    res.status(500).render('503');
  }
});

// POST - Search Engine
router.post('/search/', async (req, res) => {
  try {
    const { query, database } = req.body; 

    // Error handling
    if (!query || !database) {
      logger.error('No search query provided.');
      return res.status(400).json({ error: 'No search query provided. Database selection required.' });
    }
    
    let searchResults;
    // Handle search based on database selection
    if (database === 'pg') {
      searchResults = await searchInPostgres(query);
      searchResults = searchResults.flat(); 
      logger.info(`Search results for '${query}' in PostgreSQL`);
    
    } else if (database === 'mongo') {
      searchResults = await searchInMongo(query);
      searchResults = searchResults.flat(); 
      logger.info(`Search results for '${query}' in MongoDB`);
    
    } else if (database === 'both') {
      let [pgResults, mongoResults] = await Promise.all([
        searchInPostgres(query),
        searchInMongo(query)
      ]);
      searchResults = [...pgResults.flat(), ...mongoResults.flat()];
      logger.info(`Search results for '${query}' in both databases`);
    } else {
      logger.error('Invalid database selection.');
      return res.status(400).json({ error: 'Invalid database selection.' });
    }  

    res.render('results/searchResults', { searchResults: searchResults });

  } catch (error) {
    logger.error('Error searching:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
