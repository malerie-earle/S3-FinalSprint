const express = require('express');
const router = express.Router();
const logger = require('../logEvents.js');
const dal = require('../services/pg.auth_db.js');
const { getAllProducts, getProductByProductId } = require('../services/pg.products.dal.js');

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

// Search Products
router.get('/search/', (req, res) => {
  logger.info('Rendering the Search Products Page.');
  res.render('searchProducts.ejs');
});


// GET - A Product
router.get('/:id/', async (req, res) => {
  const product_id = req.params.id; 
  logger.info(`Getting the Product by ID: ${product_id}`);
  try {
    const aProduct = await getProductByProductId(product_id);
    logger.info(`Product: ${JSON.stringify(aProduct)}`);
    res.render('aProduct.ejs', { aProduct });
  } catch (error) {
    logger.error('Error getting product page', error);
    res.status(500).render('503'); 
  }
});

module.exports = router;