// Import the required modules
const express = require('express');
const router = express.Router();
const { getAllVendors, getVendorByVendorId, getVendorAddressByVendorId } = require('../services/pg.vendors.dal.js');
const { logger } = require('../logEvents.js');
const isAuthenticated = require('../middleware/authMiddleware.js');  // Assuming you have the authMiddleware.js in the middleware directory

// List of All Available Routes
logger.info('Route: /vendor/all/ - GET/READ - All Vendors');
logger.info('Route: /vendor/id/:id/ - GET/READ - Single Vendor by ID');
logger.info('Route: /vendor/address/:id/ - GET/READ - Vendor Address by ID');

// GET All Vendors
router.get('/all/', isAuthenticated, async (req, res) => {
  logger.info('Getting all vendors from the database.');
  try {
    // Get all vendors from the database
    const theVendors = await getAllVendors();
    logger.info('All vendors retrieved successfully.');
    res.render('allVendors.ejs', { theVendors });

  // Handle errors  
  } catch (error) {
    logger.error('Error getting all Vendors:', error);
    res.status(500).render('503');
  }
});

// GET - A Vendor
router.get('/', isAuthenticated, async (req, res) => {
  logger.info('Getting the Vendor by ID.');
  try {
    // Get a vendor by vendor_id
    const aVendor = await getVendorByVendorId();
    const aVendorAddress = await getVendorAddressByVendorId();
    res.render('aVendor.ejs', { aVendor, aVendorAddress });

  // Handle errors
  } catch (error) {
    logger.error('Error getting vendor page', error);
    res.status(500).render('503');
  }
});

// GET - vendor by ID - /vendor/id/:id
router.get('/id/:id/', isAuthenticated, async (req, res) => {
  logger.info('Getting the Vendor by ID.');
  const vendor_id = req.params.id; 
  try {
    // Get a vendor by vendor_id
    logger.info(`Getting the Vendor by ID: ${vendor_id}`);
    const aVendor = await getVendorByVendorId(vendor_id);
    const aVendorAddress = await getVendorAddressByVendorId(vendor_id);
    logger.info(`Vendor: ${JSON.stringify(aVendor)}`);
    res.render('aVendor.ejs', { aVendor, aVendorAddress });

  // Handle errors
  } catch (error) {
    logger.error('Error getting vendor page', error);
    res.status(500).render('503'); 
  }
});

// GET - vendor address by ID - /vendor/address/:id
router.get('/address/:id/', isAuthenticated, async (req, res) => {
  logger.info('Getting the Vendor Address by ID.');
  const vendor_id = req.params.id;
  try {
    // Get a vendor address by vendor_id  
    logger.info(`Getting the Vendor Address by ID: ${vendor_id}`);
    const aVendorAddress = await getVendorAddressByVendorId(vendor_id);
    logger.info(`Vendor Address: ${JSON.stringify(aVendorAddress)}`);
    res.render('aVendorAddress.ejs', { aVendorAddress });

  // Handle errors
  } catch (error) {
    logger.error('Error getting vendor address page', error);
    res.status(500).render('503');
  }
});

// Export the router
module.exports = router;
