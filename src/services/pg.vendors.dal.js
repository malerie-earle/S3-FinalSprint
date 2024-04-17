// Import the logger
const dal = require('./pg.auth_db');
const logger = require('../logEvents');

// Get all Vendors
async function getAllVendors() {  
  try {
    logger.info('pg.DAL: Getting all vendors.');
    const sql = `
      SELECT *
      FROM public.vendor v
      JOIN public.vendor_address va ON v.vendor_id = va.vendor_id
      ORDER BY v.vendor_id DESC;
    `;
    // Execute the query
    const result = await dal.query(sql);
    logger.info('pg.DAL: Got all vendors.');
    return result.rows;

  // Handle errors
  } catch (error) {
    logger.error('Error in getAllVendors:', error);
    throw error; 
  }
}

// Get a vendor by vendor_id
async function getVendorByVendorId(vendorId) {
  try {
    logger.info('pg.DAL: Getting a vendor by vendor_id:', vendorId);
    const sql = `SELECT * FROM vendor WHERE vendor_id = $1;`;
    // Execute the query
    const results = await dal.query(sql, [vendorId]);
    logger.info('pg.DAL: Got a vendor by vendor_id:', vendorId);
    return results.rows[0];

  // Handle errors
  } catch (error) {
    logger.error('Error in getVendorByVendorId:', error);
    throw error;
  }
}

// Get a vendor Address by vendor_id
async function getVendorAddressByVendorId(vendorId) {
  try {
    logger.info('pg.DAL: Getting a vendor address by vendor_id:', vendorId);
    const sql = `SELECT * FROM public.vendor_address WHERE vendor_id = $1;`;
    // Execute the query
    const results = await dal.query(sql, [vendorId]);
    logger.info('pg.DAL: Got a vendor address by vendor_id:', vendorId);
    return results.rows[0];

  // Handle errors
  } catch (error) {
    logger.error('Error in getVendorAddressByVendorId:', error);
    throw error;
  }
}

// Export the modules
module.exports = {
  getAllVendors,
  getVendorByVendorId,
  getVendorAddressByVendorId,
};
