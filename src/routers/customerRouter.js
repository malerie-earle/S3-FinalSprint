// Import required modules
const express = require('express');
const router = express.Router();
const { getAllCustomers, getCustomerByCustomerId, getCustomerAccountByCustomerId, getCustomerAddressByCustomerId, getCustomerByFirstName, getCustomerByLastName, getCustomerByEmail, getCustomerByPhoneNum, getCustomerByGender, getCustomerByUsername, addCustomer, addCustomerAccount, addCustomerAddress, editCustomer, editCustomerAccount, editCustomerAddress, deleteCustomer, authenticateUser, signUpCustomer } = require('../services/pg.customers.dal.js');
const { logger } = require('../logEvents.js');
const dal = require('../services/pg.auth_db.js');
const passport = require('passport');
const isAuthentic = require('../middleware/authMiddleware.js');

// List of All Available Routes
logger.info('Route: /customer/all/ - GET/READ - All Customers');
logger.info('Route: /customer/id/:id - GET/READ - Single Customer by ID');
logger.info('Route: /customer/first/:firstName - GET/READ - Customers by First Name');
logger.info('Route: /customer/last/:lastName - GET/READ - Customers by Last Name');
logger.info('Route: /customer/email/:email - GET/READ - Single Customer by Email');
logger.info('Route: /customer/phone/:ph_num - GET/READ - Single Customer by Phone Number');
logger.info('Route: /customer/gender/:gender - GET/READ - Customers by Gender');
logger.info('Route: /customer/payment/:pay_method - GET/READ - Customers by Pay Method');
logger.info('Route: /customer/username/:username - GET/READ - Single Customer by Username');
logger.info('Route: /customer/add/ - POST/CREATE - Add Customer');
logger.info('Route: /customer/edit - PUT/UPDATE - Edit Customer');
logger.info('Route: /customer/delete - DELETE - Delete Customer');


// GET All Customers
router.get('/all/', isAuthentic, async (req, res) => {
  logger.info('Getting all customers from the database.');
  try {
    const theCustomers = await getAllCustomers();
    logger.info('All customers retrieved successfully.');
    res.render('allCustomers.ejs', { theCustomers: theCustomers });

  // Handle errors
  } catch (error) {
    logger.error('Error getting all customers:', error);
    res.status(500).render('503');
  }
});


// GET - Customer by ID - /customer/:id
router.get('/id/:id/', async (req, res) => {
  const id = req.params.id;
  logger.info(`Getting the customer by ID: ${id}`);
  try {
    // Get the customer, account, and address by customer_id
    const aCustomer = await getCustomerByCustomerId(id);
    const aCustomerAccount = await getCustomerAccountByCustomerId(id);
    const aCustomerAddress = await getCustomerAddressByCustomerId(id);
    logger.info(`Customer: ${JSON.stringify(aCustomer, aCustomerAccount, aCustomerAddress)}`);
    res.render('customer.ejs', { aCustomer, aCustomerAccount, aCustomerAddress });

  // Handle errors
  } catch (error) {
    logger.error('Error getting customer page', error);
    res.status(503).render('503');
  }
});

// GET - Read Customer by first_name - /customer/first/:first_name/
router.get('/first/:first_name/', isAuthentic, async (req, res) => {
  const first_name = req.params.first_name;
  logger.info(`Getting the customer by first_name: ${first_name}`);
  try {
    // Get the customer by first_name
    const aCustomer = await getCustomerByFirstName(first_name);
    logger.info(`Customer: ${JSON.stringify(aCustomer)}`);
    res.render('customer.ejs', { aCustomer });

  // Handle errors  
  } catch (error) {
    logger.error('Error getting customer page', error);
    res.status(503).render('503');
  }
});

// GET - Read Customer by last_name - /customer/last/:last_name/
router.get('/last/:last_name/', isAuthentic, async (req, res) => {
  const last_name = req.params.last_name;
  logger.info(`Getting the customer by last_name: ${last_name}`);
  try {
    // Get the customer by last_name
    const aCustomer = await getCustomerByLastName(last_name);
    logger.info(`Customer: ${JSON.stringify(aCustomer)}`);
    res.render('customer.ejs', { aCustomer });

  // Handle errors
  } catch (error) {
    logger.error('Error getting customer page', error);
    res.status(503).render('503');
  }
});

// GET - Read Customer by email - /customer/email/:email/
router.get('/email/:email/', isAuthentic, async (req, res) => {
  const email = req.params.email;
  logger.info(`Getting the customer by email: ${email}`);
  try {
    // Get the customer by email
    const aCustomer = await getCustomerByEmail(email);
    logger.info(`Customer: ${JSON.stringify(aCustomer)}`);
    res.render('customer.ejs', { aCustomer });

  // Handle errors
  } catch (error) {
    logger.error('Error getting customer page', error);
    res.status(503).render('503');
  }
});

// GET - Read Customer by phone number - /customer/phone/:ph_num/
router.get('/phone/:ph_num/', isAuthentic, async (req, res) => {
  const ph_num = req.params.ph_num;
  logger.info(`Getting the customer by phone number: ${ph_num}`);
  try {
    // Get the customer by phone number
    const aCustomer = await getCustomerByPhoneNum(ph_num);
    logger.info(`Customer: ${JSON.stringify(aCustomer)}`);
    res.render('customer.ejs', { aCustomer });

  // Handle errors  
  } catch (error) {
    logger.error('Error getting customer page', error);
    res.status(503).render('503');
  }
});

// GET - Read Customer by gender - /customer/gender/:gender/
router.get('/gender/:gender/', isAuthentic, async (req, res) => {
  const gender = req.params.gender;
  logger.info(`Getting the customer by gender: ${gender}`);
  try {
    // Get the customer by gender
    const aCustomer = await getCustomerByGender(gender);
    logger.info(`Customer: ${JSON.stringify(aCustomer)}`);
    res.render('customer.ejs', { aCustomer });

  // Handle errors
  } catch (error) {
    logger.error('Error getting customer page', error);
    res.status(503).render('503');
  }
});

// GET - Read Customer by username - /customer/username/:username/
router.get('/username/:username/', isAuthentic, async (req, res) => {
  const username = req.params.username;
  logger.info(`Getting the customer by username: ${username}`);
  try {
    // Get the customer by username
    const aCustomer = await getCustomerByUsername(username);
    logger.info(`Customer: ${JSON.stringify(aCustomer)}`);
    res.render('customer.ejs', { aCustomer });
  
  // Handle errors
  } catch (error) {
    logger.error('Error getting customer page', error);
    res.status(503).render('503');
  }
});

// ADD a Customer
router.get('/add/', isAuthentic, (req, res) => {
  logger.info('Rendering the Add Customer Page.');
  res.render('addCustomer');
});
router.post('/add/', async (req, res) => {
  logger.info('Adding a new customer.');
  try {
    // Add a new customer
    const {customer_id, first_name, last_name, email, ph_num, gender, pay_method} = req.body.newCustomer;
    const newCustomer = await addCustomer({customer_id, first_name, last_name, email, ph_num, gender, pay_method});
    const {username, password} = req.body.newCustomerAccount;
    const newCustomerAccount = await addCustomerAccount({customer_id: newCustomer.customer_id, username, password});
    const {street_address, city, province, postal_code, country} = req.body.newCustomerAddress;
    const newCustomerAddress = await addCustomerAddress({customer_id: newCustomer.customer_id, street_address, city, province, postal_code, country});
    logger.info('New customer added successfully.');
    res.redirect(`/customers/`);

  // Handle errors
  } catch (error) {
    logger.error('Error adding a new customer:', error);
    res.status(500).render('503');
  }
});


// Edit Customer Page
router.get('/edit/:customer_id/', isAuthentic, async (req, res) => {
  logger.info('Rendering the Edit Customer Page.');
  const customer_id = req.params.customer_id;
  try {
    // Get the customer, account, and address by customer_id
    const customer = await getCustomerByCustomerId(customer_id);
    const customer_account = await getCustomerAccountByCustomerId(customer_id);
    const customer_address = await getCustomerAddressByCustomerId(customer_id);
    if (Array.isArray(customer)) customer = customer[0];
    if (Array.isArray(customer_account)) customer_account = customer_account[0];
    if (Array.isArray(customer_address)) customer_address = customer_address[0];
    logger.info(`Customer: ${JSON.stringify(customer)}`);
    res.render('editCustomer', { customer, customer_account, customer_address });

  // Handle errors  
  } catch (error) {
    logger.error('Error getting customer edit page:', error);
    res.status(500).render('503');
  }
});
router.post('/edit/:customer_id/', async (req, res) => {
  logger.info('Editing a customer.');
  try {
    // Edit the customer, account, and address by customer_id
    const customer_id = req.params.customer_id;
    const { first_name, last_name, email, ph_num, gender, pay_method } = req.body;
    const customer = await editCustomer({ customer_id, first_name, last_name, email, ph_num, gender, pay_method });
    logger.info('Customer edited successfully.');
    const { username, password } = req.body;
    const customerAccount = await editCustomerAccount({ customer_id, username, password });
    logger.info('Customer Account edited successfully.');
    const { street_address, city, province, postal_code, country } = req.body;
    const customerAddress = await editCustomerAddress({ customer_id, street_address, city, province, postal_code, country });
    logger.info('Customer Address edited successfully.');
    res.redirect(`/customers/`);
    logger.info('Customer edited successfully.');

  // Handle errors  
  } catch (error) {
    logger.error('Error editing a customer:', error);
    res.status(500).render('503');
  }
});


// Delete Customer Page
router.post('/delete/:id/', isAuthentic, async (req, res) => {
  const id = req.params.id;
  try {
    logger.info(`Deleting customer with ID: ${id}`);
    await deleteCustomer(id);
    logger.info(`Deleted customer with ID: ${id} successfully.`);
    res.redirect('/customers/');

  // Handle errors  
  } catch (error) {
    logger.error('Error deleting customer:', error);
    res.status(500).render('503');
  }
});

// Export the router
module.exports = router;
