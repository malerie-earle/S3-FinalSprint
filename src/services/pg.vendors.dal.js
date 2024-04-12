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
    const result = await dal.query(sql);
    return result.rows;
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
    const results = await dal.query(sql, [vendorId]);
    return results.rows[0]; // Return only the first row
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
    const results = await dal.query(sql, [vendorId]);
    return results.rows[0]; // Return only the first row
  } catch (error) {
    logger.error('Error in getVendorAddressByVendorId:', error);
    throw error;
  }
}

module.exports = {
  getAllVendors,
  getVendorByVendorId,
  getVendorAddressByVendorId,
};
