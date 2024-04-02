const dal = require('./pg.auth_db');
const logger = require('../logEvents');


// Get all Customers
const getAllCustomers = async (req, res) => {
  try {
    logger.info('pg.DAL: Getting all customers from the database.');
    const sql = 'SELECT * FROM public.customer ORDER BY customer_id DESC;';
    const sql2 = 'SELECT username FROM public.customer_account ORDER BY username ASC;';
    const result1 = await dal.query(sql);
    const result2 = await dal.query(sql2);
    const customers = [...result1.rows, ...result2.rows];
    res.status(200).json(customers);
  } catch (error) {
    logger.error('Error in getAllCustomers():', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Get a Customer by customer_id
const getCustomerByCustomerId = async (req, res) => {
  const { customer_id } = req.params;
  try {
    logger.info('pg.DAL: Getting a customer by customer_id.');
    const sql = `SELECT * FROM public.customer WHERE customer_id = $1;`;
    const results = await dal.query(sql, [customer_id]);
    if (results.rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json(results.rows);
  } catch (error) {
    logger.error('Error in getCustomerByCustomerId():', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Get a Customer by first_name
const getCustomersByFirstName = async (req, res) => {
  const { first_name } = req.params;
  try {
    logger.info('pg.DAL: Getting customers by first_name.');
    const sql = `SELECT * FROM public.customer WHERE first_name = $1;`;
    const results = await dal.query(sql, [first_name]);
    res.status(200).json(results.rows);
  } catch (error) {
    logger.error('Error in getCustomerByFirstName():', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Get a Customer by last_name
const getCustomersByLastName = async (req, res) => {
  const { last_name } = req.params;
  try {
    logger.info('pg.DAL: Getting customers by last_name.');
    const sql = `SELECT * FROM public.customer WHERE last_name = $1;`;
    const results = await dal.query(sql, [last_name]);
    res.status(200).json(results.rows);
  } catch (error) {
    logger.error('Error in getCustomerByLastName():', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Get a Customer by email
const getCustomerByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    logger.info('pg.DAL: Getting a customer by email.');
    const sql = `SELECT * FROM public.customer WHERE email = $1;`;
    const results = await dal.query(sql, [email]);
    res.status(200).json(results.rows);
  } catch (error) {
    logger.error('Error in getCustomerByEmail():', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Get a Customer by phone number
const getCustomerByPhoneNum = async (req, res) => {
  const { ph_num } = req.params;
  try {
    logger.info('pg.DAL: Getting a customer by phone number.');
    const sql = `SELECT * FROM public.customer WHERE ph_num = $1;`;
    const results = await dal.query(sql, [ph_num]);
    res.status(200).json(results.rows);
  } catch (error) {
    logger.error('Error in getCustomerByPhoneNum():', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Get a Customer by gender
const getCustomersByGender = async (req, res) => {
  const { gender } = req.params;
  try {
    logger.info('pg.DAL: Getting customers by gender.');
    const sql = `SELECT * FROM public.customer WHERE gender = $1;`;
    const results = await dal.query(sql, [gender]);
    res.status(200).json(results.rows);
  } catch (error) {
    logger.error('Error in getCustomerByGender():', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a Customer by pay_method
const getCustomersByPayMethod = async (req, res) => {
  const { pay_method } = req.params;
  try {
    logger.info('pg.DAL: Getting customers by pay_method.');
    const sql = `SELECT * FROM public.customer WHERE pay_method = $1;`;
    const results = await dal.query(sql, [pay_method]);
    res.status(200).json(results.rows);
  } catch (error) {
    logger.error('Error in getCustomerByPayMethod():', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


// Get a Customer by username
const getCustomerByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    logger.info('pg.DAL: Getting a customer by username.');
    const sql = `
      SELECT customer.*, customer_account.username 
      FROM public.customer 
      INNER JOIN public.customer_account 
      ON customer.customer_id = customer_account.customer_id
      WHERE customer_account.username = $1;
    `;
    const results = await dal.query(sql, [username]);
    res.status(200).json(results.rows);
  } catch (error) {
    logger.error('Error in getCustomerByUsername():', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Add a new Customer
const addCustomer = async (req, res) => {
  try {
    logger.info('pg.DAL: Adding a new customer.');
    const { first_name, last_name, email, ph_num, gender, pay_method, username, password } = req.body;
    const idQuery = 'SELECT MAX(customer_id) AS max_id FROM public.customer;';
    const sql = `INSERT INTO public.customer (customer_id, first_name, last_name, email, ph_num, gender, pay_method) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
    const sql2 = `INSERT INTO public.customer_account (username, password) VALUES ($1, $2) RETURNING *;`;
    
    const lastIdResult = await dal.query(idQuery);
    const newCustomerId = lastIdResult.rows[0].max_id + 1;
    
    const values = [newCustomerId, first_name, last_name, email, ph_num, gender, pay_method];
    const newCustomer = await dal.query(sql, values);

    const values2 = [username, password];
    const newCustomerAccount = await dal.query(sql2, values2);
    
    res.status(201).json({ newCustomer: newCustomer.rows, newCustomerAccount: newCustomerAccount.rows });
  } catch (error) {
    logger.error('Error in addCustomer():', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Edit a Customer
const editCustomer = async (req, res) => {
  const { customer_id } = req.params;
  const { first_name, last_name, email, ph_num, gender, pay_method } = req.body;
  try {
    logger.info('pg.DAL: Editing a customer.');
    const selectSql = 'SELECT * FROM public.customer WHERE customer_id = $1';
    const updateSql = 'UPDATE public.customer SET first_name = $2, last_name = $3, email = $4, ph_num = $5, gender = $6, pay_method = $7 WHERE customer_id = $1 RETURNING *';
    
    const selectResult = await dal.query(selectSql, [customer_id]);
    if (selectResult.rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    const updateResult = await dal.query(updateSql, [customer_id, first_name, last_name, email, ph_num, gender, pay_method]);
    res.status(200).json(updateResult.rows);
  } catch (error) {
    logger.error('Error in editCustomer():', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


// Delete a customer
const deleteCustomer = async (req, res) => {
  const { customer_id } = req.params;
  try {
    logger.info('pg.DAL: Deleting a customer.');
    const sql = `DELETE FROM public.customer WHERE customer_id = $1;`;
    await dal.query(sql, [customer_id]);
    res.status(204).send(); // No content success response
  } catch (error) {
    logger.error('Error in deleteCustomer():', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getAllCustomers,
  getCustomerByCustomerId,
  getCustomersByFirstName,
  getCustomersByLastName,
  getCustomerByEmail,
  getCustomerByPhoneNum,
  getCustomersByGender,
  getCustomersByPayMethod,
  getCustomerByUsername,
  addCustomer,
  editCustomer,
  deleteCustomer
};