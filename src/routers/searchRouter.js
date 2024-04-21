const express = require('express');
const router = express.Router();
const { logger, logSearchQuery } = require('../logEvents.js');
const { searchInPostgres, searchInMongo } = require('../services/searchLogic.js');
const isAuthenticated = require('../middleware/authMiddleware.js');  

// GET - Search Recipe Page
router.get('/search/', isAuthenticated, (req, res) => {
  try {
    logger.info('Rendering the Search Page.');
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    res.render('searchEngine.ejs', { user: req.user, page: page, pageSize: pageSize });
  } catch (error) {
    logger.error('Error rendering the Search Page:', error);
    res.status(500).render('503');
  }
});

// POST - Search Engine
router.post('/search/', isAuthenticated, async (req, res) => {
  try {
    const user_id = req.user.customer_id;
    const query = req.body.query; 
    const database = req.body.database;
    const page = parseInt(req.body.page) || 1;
    const pageSize = parseInt(req.body.pageSize) || 10;
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
      searchResults = await searchInPostgres(query, page, pageSize);
      logger.info(`Search results for '${query}' in PostgreSQL`);
      return res.render('results/searchResults', { searchResults: searchResults, query, database, page, pageSize});


    // Search in MongoDB
    } else if (database === 'mongo') {
      searchResults = await searchInMongo(query, page, pageSize);
      logger.info(`Search results for '${query}' in MongoDB`);
      return res.render('results/searchResults', { searchResults: searchResults, query, database, page, pageSize});

    // Search in both databases
    } else if (database === 'both') {
      let [pgResults, mongoResults] = await Promise.all([
        searchInPostgres(query, page, pageSize),
        searchInMongo(query, page, pageSize)
      ]);
      searchResults = [...pgResults.flat(), ...mongoResults.flat()];
      logger.info(`Search results for '${query}' in both databases`);
      return res.render('results/searchResults', { searchResults: searchResults, query, database, page, pageSize});
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