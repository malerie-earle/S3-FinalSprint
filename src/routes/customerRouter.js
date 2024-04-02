const express = require('express');
const router = express.Router();
const { getAllCustomers, getCustomerByCustomerId, getCustomerByFirstName, getCustomerByLastName, getCustomerByEmail, getCustomerByPhoneNum, getCustomerByGender, getCustomerByUsername, addCustomer, editCustomer, deleteCustomer } = require('../services/pg.customers.dal.js');
const logger = require('../logEvents.js');

// Import the DAL
const dal = require('../services/pg.auth_db.js');

// List of All Available Routes
logger.info('Customer Router - API Endpoints:');
logger.info('Route: GET/READ - Home Page - /');
logger.info('Route: GET/READ - All Customers - /customers/');
logger.info('Route: GET/READ - Single Customer by ID - /customer/id/:id');
logger.info('Route: GET/READ - Customers by First Name - /customer/first/:firstName');
logger.info('Route: GET/READ - Customers by Last Name - /customer/last/:lastName');
logger.info('Route: GET/READ - Single Customer by Email - /customer/email/:email');
logger.info('Route: GET/READ - Single Customer by Phone Number - /customer/phone/:ph_num');
logger.info('Route: GET/READ - Customers by Gender - /customer/gender/:gender');
logger.info('Route: GET/READ - Customers by Pay Method - /customer/payment/:pay_method');
logger.info('Route: GET/READ - Single Customer by Username - /customer/username/:username');
logger.info('Route: POST/CREATE - Add Customer - /customer/add');
logger.info('Route: PUT/UPDATE - Edit Customer - /customer/edit');
logger.info('Route: DELETE - Delete Customer - /customer/delete');

// Home Page
router.get('/', (req, res) => {
  logger.info('customerRouter: Rendering the Home Page.');
  res.render('index.ejs', { title: 'Home Page', name: 'Malerie' });
});

// GET All Customers
router.get('/customers/', async (req, res) => {
  logger.info('customerRouter: Getting all customers from the database.');
  try {
    const theCustomers = await getAllCustomers();
    logger.info('customerRouter: All customers retrieved successfully.');
    res.render('allCustomers.ejs', { theCustomers: theCustomers });
  } catch (error) {
    logger.error('customerRouter: Error getting all customers:', error);
    res.status(500).render('503');
  }
});

// GET - Customer by ID - /customer/id/:id
router.get('/customer/id/:id', async (req, res) => {
  const id = req.params.id;
  logger.info(`customerRouter: Getting the customer by ID: ${id}`);
  try {
    const aCustomer = await getCustomerByCustomerId(id);
    logger.info(`Customer: ${JSON.stringify(aCustomer)}`);
    res.render('customer.ejs', { aCustomer });
  } catch (error) {
    logger.error('Error getting customer page', error);
    res.status(503).render('503');
  }
});

// GET - Read Customer by first_name - /customer/first/:first_name/
router.get('/customer/first/:first_name/', async (req, res) => {
  const first_name = req.params.first_name;
  logger.info(`customerRouter: Getting the customer by first_name: ${first_name}`);
  try {
    const aCustomer = await getCustomerByFirstName(first_name);
    logger.info(`Customer: ${JSON.stringify(aCustomer)}`);
    res.render('customer.ejs', { aCustomer });
  } catch (error) {
    logger.error('Error getting customer page', error);
    res.status(503).render('503');
  }
});

// GET - Read Customer by last_name - /customer/last/:last_name/
router.get('/customer/last/:last_name/', async (req, res) => {
  const last_name = req.params.last_name;
  logger.info(`customerRouter: Getting the customer by last_name: ${last_name}`);
  try {
    const aCustomer = await getCustomerByLastName(last_name);
    logger.info(`Customer: ${JSON.stringify(aCustomer)}`);
    res.render('customer.ejs', { aCustomer });
  } catch (error) {
    logger.error('Error getting customer page', error);
    res.status(503).render('503');
  }
});

// GET - Read Customer by email - /customer/email/:email/
router.get('/customer/email/:email/', async (req, res) => {
  const email = req.params.email;
  logger.info(`customerRouter: Getting the customer by email: ${email}`);
  try {
    const aCustomer = await getCustomerByEmail(email);
    logger.info(`Customer: ${JSON.stringify(aCustomer)}`);
    res.render('customer.ejs', { aCustomer });
  } catch (error) {
    logger.error('Error getting customer page', error);
    res.status(503).render('503');
  }
});

// GET - Read Customer by phone number - /customer/phone/:ph_num/
router.get('/customer/phone/:ph_num/', async (req, res) => {
  const ph_num = req.params.ph_num;
  logger.info(`customerRouter: Getting the customer by phone number: ${ph_num}`);
  try {
    const aCustomer = await getCustomerByPhoneNum(ph_num);
    logger.info(`Customer: ${JSON.stringify(aCustomer)}`);
    res.render('customer.ejs', { aCustomer });
  } catch (error) {
    logger.error('Error getting customer page', error);
    res.status(503).render('503');
  }
});

// GET - Read Customer by gender - /customer/gender/:gender/
router.get('/customer/gender/:gender/', async (req, res) => {
  const gender = req.params.gender;
  logger.info(`customerRouter: Getting the customer by gender: ${gender}`);
  try {
    const aCustomer = await getCustomerByGender(gender);
    logger.info(`Customer: ${JSON.stringify(aCustomer)}`);
    res.render('customer.ejs', { aCustomer });
  } catch (error) {
    logger.error('Error getting customer page', error);
    res.status(503).render('503');
  }
});

// GET - Read Customer by username - /customer/username/:username/
router.get('/customer/username/:username/', async (req, res) => {
  const username = req.params.username;
  logger.info(`customerRouter: Getting the customer by username: ${username}`);
  try {
    const aCustomer = await getCustomerByUsername(username);
    logger.info(`Customer: ${JSON.stringify(aCustomer)}`);
    res.render('customer.ejs', { aCustomer });
  } catch (error) {
    logger.error('Error getting customer page', error);
    res.status(503).render('503');
  }
});

// ADD a Customer
// Display the form for adding a customer
router.get('/customer/add/', (req, res) => {
  logger.info('customerRouter: Rendering the Add Customer Page.');
  res.render('addCustomer', { newCustomerId: null });
});
// Handle the form submission
router.post('/customer/add/', async (req, res) => {
  const { first_name, last_name, email, username, password, address, payment_method } = req.body;
  logger.info('customerRouter: Adding a new customer.');
  try {
    const newCustomerDetails = await addCustomer(first_name, last_name, email, username, password, address, payment_method);
    const newCustomerId = newCustomerDetails[0].customer_id;
    logger.info('customerRouter: New customer added successfully.');
    res.redirect(`/customers/`);
  } catch (error) {
    logger.error('customerRouter: Error adding a new customer:', error);
    res.status(500).render('503');
  }
});

// GET the Edit Customer Page
router.get('/customer/edit/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const customer = await getCustomerByCustomerId(id);
    if (customer) {
      res.render('editCustomer', { customer: customer });
    } else {
      res.status(404).send('Customer not found');
    }
  } catch (error) {
    logger.error('Error getting customer:', error);
    res.status(500).send('Server error');
  }
});
// POST the Edit Customer Page
router.post('/customer/edit/:id', async (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, email, username, password, address, payment_method } = req.body;
  try {
    const updatedCustomer = await editCustomer(id, first_name, last_name, email, username, password, address, payment_method);
    logger.info('customerRouter: Customer edited successfully.');
    res.redirect(`/customers/`);
  } catch (error) {
    logger.error('customerRouter: Error editing customer:', error);
    res.status(500).render('503');
  }
});

// Delete Customer Page
router.post('/customer/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await deleteCustomer(id);
    logger.info(`customerRouter: Deleted customer with ID: ${id} successfully.`);
    res.redirect('/customers/');
  } catch (error) {
    logger.error('customerRouter: Error deleting customer:', error);
    res.status(500).render('503');
  }
});

module.exports = router;
