const express = require('express');
const router = express.Router();
const logger = require('../logEvents.js');
const dal = require('../services/pg.auth_db.js');
const { getAllProducts, getProductrByProductId } = require('../services/pg.products.dal.js');

// List of All Available Routes
logger.info('Product Router - API Endpoints:');
logger.info('Route: GET/READ - All Products - /product/all/');

// GET - All Products Page
router.get('/', (req, res) => {
  logger.info('Rendering the Products Page.');
  res.render('allProducts.ejs');
});
// GET - All Products
router.get('/all/', async (req, res) => {
  logger.info('Getting all products from the database.');
  try {
    const theProducts = await getAllProducts();
    logger.info('All products retrieved successfully.');
    res.render('allProducts.ejs', { theProducts: theProducts });
  } catch (error) {
    logger.error('Error getting all products:', error);
    res.status(500).render('503');
  }
});

module.exports = router;