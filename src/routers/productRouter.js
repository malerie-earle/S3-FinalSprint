const express = require('express');
const router = express.Router();
const { logger } = require('../logEvents.js');
const { getAllProducts, getProductByProductId } = require('../services/pg.products.dal.js');
const isAuthenticated = require('../middleware/authMiddleware.js');  // Assuming you have a middleware for authentication

// List of All Available Routes
logger.info('Route: /product/all/ - GET/READ - All Products');
logger.info('Route: /product/id/:id/ - GET/READ - Single Product by ID');
logger.info('Route: /product/search/ - GET/READ - Search Products');

// GET - All Products Page
router.get('/', isAuthenticated, (req, res) => {
  try {
    logger.info('Rendering the Products Page.');
    res.render('allProducts.ejs');
  } catch (error) {
    logger.error('Error rendering the Products Page:', error);
    res.status(500).render('503');
  }
});

// GET - All Products
router.get('/all/', isAuthenticated, async (req, res) => {
  try {
    logger.info('Getting all products from the database.');
    const theProducts = await getAllProducts();
    logger.info('All products retrieved successfully.');
    res.render('allProducts.ejs', { theProducts: theProducts });
  } catch (error) {
    logger.error('Error getting all products:', error);
    res.status(500).render('503');
  }
});

// Search Products
router.get('/search/', isAuthenticated, (req, res) => {
  try {
    logger.info('Rendering the Search Products Page.');
    res.render('searchProducts.ejs');
  } catch (error) {
    logger.error('Error rendering the Search Products Page:', error);
    res.status(500).render('503');
  }
});

// GET - A Product
router.get('/:id/', isAuthenticated, async (req, res) => {
  const product_id = req.params.id; 
  try {
    logger.info(`Getting the Product by ID: ${product_id}`);
    const aProduct = await getProductByProductId(product_id);
    logger.info(`Product: ${JSON.stringify(aProduct)}`);
    res.render('aProduct.ejs', { aProduct });
  } catch (error) {
    logger.error('Error getting product page', error);
    res.status(500).render('503'); 
  }
});

module.exports = router;
