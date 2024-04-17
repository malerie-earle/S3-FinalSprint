// Import required modules
const dal = require('./pg.auth_db');
const { logger } = require('../logEvents');

// Get all Customers
async function getAllProducts() {  
  try {
    logger.info('pg.DAL: Getting all products.');
    const sql = `SELECT * FROM public.products ORDER BY product_id DESC;`;
    const result = await dal.query(sql);
    logger.info('pg.DAL: Got all products.');
    return result.rows;

  // Handle errors
  } catch (error) {
    logger.error('Error in getAllProducts():', error);
    throw error; 
  }
};


// GET a product by product_id
async function getProductrByProductId(product_id) {
  try {
    logger.info('pg.DAL: Getting a product by product_id.');
    const sql = `SELECT * FROM product WHERE product_id = $1;`;
    const results = await dal.query(sql, [product_id]);
    logger.info('pg.DAL: Got a product by product_id.');
    return results.rows[0];

  // Handle errors
  } catch (error) {
    logger.error('Error in getProductByProductId():', error);
    throw error;
  }
};

module.exports = {
  getAllProducts,
  getProductrByProductId
};