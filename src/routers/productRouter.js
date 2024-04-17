// Import required modules
const express = require('express');
const router = express.Router();
const logger = require('../logEvents.js');
const { getAllProducts, getProductByProductId } = require('../services/pg.products.dal.js');
const isAuthentic = require('../middleware/authMiddleware.js');

// List of All Available Routes
logger.info('Route: /product/all/ - GET/READ - All Products');
logger.info('Route: /product/id/:id/ - GET/READ - Single Product by ID');
logger.info('Route: /product/search/ - GET/READ - Search Products');

// GET - All Products Page
router.get('/', isAuthentic, (req, res) => {
  try {
    logger.info('Rendering the Products Page.');
    res.render('allProducts.ejs');
  } catch (error) {
    logger.error('Error rendering the Products Page:', error);
    res.status(500).render('503');
  }
});

// GET - All Products
router.get('/all/', isAuthentic, async (req, res) => {
  try {
    // Get all products from the database
    logger.info('Getting all products from the database.');
    const theProducts = await getAllProducts();
    logger.info('All products retrieved successfully.');
    res.render('allProducts.ejs', { theProducts: theProducts });

  // Handle errors  
  } catch (error) {
    logger.error('Error getting all products:', error);
    res.status(500).render('503');
  }
});

// Search Products
router.get('/search/', isAuthentic, (req, res) => {
  try {
    logger.info('Rendering the Search Products Page.');
    res.render('searchProducts.ejs');

  // Handle errors
  } catch (error) {
    logger.error('Error rendering the Search Products Page:', error);
    res.status(500).render('503');
  }
});

// GET - A Product
router.get('/id/:id/', isAuthentic, async (req, res) => {
  const product_id = req.params.id; 
  try {
    // Get a product by product_id
    logger.info(`Getting the Product by ID: ${product_id}`);
    const aProduct = await getProductByProductId(product_id);
    logger.info(`Product: ${JSON.stringify(aProduct)}`);
    res.render('aProduct.ejs', { aProduct });

  // Handle errors
  } catch (error) {
    logger.error('Error getting product page', error);
    res.status(500).render('503'); 
  }
});

// Export the module
module.exports = router;
