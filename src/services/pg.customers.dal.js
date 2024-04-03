const dal = require('./pg.auth_db');
const logger = require('../logEvents');
const { log } = require('winston');


// Get all Customers
async function getAllCustomers() {  
  try {
    logger.info('pg.DAL: Getting all customers.');
    const sql = `
      SELECT c.*, ca.username, caa.*
      FROM public.customer c
      LEFT JOIN public.customer_account ca ON c.customer_id = ca.customer_id
      LEFT JOIN public.customer_address caa ON c.customer_id = caa.customer_id
      ORDER BY c.customer_id DESC;
    `;
    const result = await dal.query(sql);
    return result.rows;
  } catch (error) {
    logger.error('Error in getAllCustomers():', error);
    throw error; 
  }
};
// Get a Customer by customer_id
async function getCustomerByCustomerId(customer_id) {
  try {
    logger.info('pg.DAL: Getting a customer by customer_id.');
    const sql = `SELECT * FROM customer WHERE customer_id = $1;`;
    const results = await dal.query(sql, [customer_id]);
    return results.rows[0];
  } catch (error) {
    logger.error('Error in getCustomerByCustomerId():', error);
    throw error;
  }
};

// Get a Customer Account by customer_id
async function getCustomerAccountByCustomerId(customer_id) {
  try {
    logger.info('pg.DAL: Getting a customer account by customer_id.');
    const sql = `SELECT * FROM public.customer_account WHERE customer_id = $1;`;
    const results = await dal.query(sql, [customer_id]);
    return results.rows[0];
  } catch (error) {
    logger.error('Error in getCustomerAccountByCustomerId():', error);
    throw error;
  }
}

// Get a Customer Address by customer_id
async function getCustomerAddressByCustomerId(customer_id) {
  try {
    logger.info('pg.DAL: Getting a customer address by customer_id.');
    const sql = `SELECT * FROM public.customer_address WHERE customer_id = $1;`;
    const results = await dal.query(sql, [customer_id]);
    return results.rows[0];
  } catch (error) {
    logger.error('Error in getCustomerAddressByCustomerId():', error);
    throw error;
  }
}

// Get a Customer by first_name
async function getCustomersByFirstName(first_name) {
  try {
    logger.info('pg.DAL: Getting customers by first_name.');
    const sql = `SELECT * FROM public.customer WHERE first_name = $1;`;
    const results = await dal.query(sql, [first_name]);
    return results.rows;
  } catch (error) {
    logger.error('Error in getCustomerByFirstName():', error);
    throw error;
  }
};


// Get a Customer by last_name
async function getCustomersByLastName(last_name) {
  try {
    logger.info('pg.DAL: Getting customers by last_name.');
    const sql = `SELECT * FROM public.customer WHERE last_name = $1;`;
    const results = await dal.query(sql, [last_name]);
    return results.rows;
  } catch (error) {
    logger.error('Error in getCustomerByLastName():', error);
    throw error;
  }
};


// Get a Customer by email
async function getCustomerByEmail(email) {
  try {
    logger.info('pg.DAL: Getting a customer by email.');
    const sql = `SELECT * FROM public.customer WHERE email = $1;`;
    const results = await dal.query(sql, [email]);
    return results.rows;
  } catch (error) {
    logger.error('Error in getCustomerByEmail():', error);
    throw error;
  }
};


// Get a Customer by phone number
async function getCustomerByPhoneNum(ph_num) {
  try {
    logger.info('pg.DAL: Getting a customer by phone number.');
    const sql = `SELECT * FROM public.customer WHERE ph_num = $1;`;
    const results = await dal.query(sql, [ph_num]);
    return results.rows;
  } catch (error) {
    logger.error('Error in getCustomerByPhoneNum():', error);
    throw error;
  }
};


// Get a Customer by gender
async function getCustomersByGender(gender) {
  try {
    logger.info('pg.DAL: Getting customers by gender.');
    const sql = `SELECT * FROM public.customer WHERE gender = $1;`;
    const results = await dal.query(sql, [gender]);
    return results.rows;
  } catch (error) {
    logger.error('Error in getCustomerByGender():', error);
    throw error;
  }
};

// Get a Customer by pay_method
async function getCustomersByPayMethod(pay_method) {
  try {
    logger.info('pg.DAL: Getting customers by pay_method.');
    const sql = `SELECT * FROM public.customer WHERE pay_method = $1;`;
    const results = await dal.query(sql, [pay_method]);
    return results.rows;
  } catch (error) {
    logger.error('Error in getCustomerByPayMethod():', error);
    throw error;
  }
}


// Get a Customer by username
async function getCustomerByUsername(username) {
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
    return results.rows;
  } catch (error) {
    logger.error('Error in getCustomerByUsername():', error);
    throw error;
  }
};


// Add a new Customer
async function addCustomer({ first_name, last_name, email, ph_num, gender, pay_method }) {
  try {
    logger.info('pg.DAL: Adding a new customer.');
    const sql = `INSERT INTO public.customer (customer_id, first_name, last_name, email, ph_num, gender, pay_method) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
    
    const idQuery = 'SELECT MAX(customer_id) AS max_id FROM public.customer;';
    const lastIdResult = await dal.query(idQuery);
    const newCustomerId = lastIdResult.rows[0].max_id + 1;
    const values = [newCustomerId, first_name, last_name, email, ph_num, gender, pay_method];
    const newCustomer = await dal.query(sql, values);
    return newCustomer.rows[0];
  } catch (error) {
    logger.error('Error in addCustomer():', error);
    throw error;
  }
};

// Add a new Customer Account
async function addCustomerAccount({ customer_id, username, password }) {
  try {
    logger.info('pg.DAL: Adding a new customer account.');
    const sql = `INSERT INTO public.customer_account (customer_id, username, password) VALUES ($1, $2, $3) RETURNING *;`;
    const values = [customer_id, username, password];
    const newCustomerAccount = await dal.query(sql, values);
    return newCustomerAccount.rows[0];
  } catch (error) {
    logger.error('Error in addCustomerAccount():', error);
    throw error;
  }
};

// Add a new Customer Address
async function addCustomerAddress({ customer_id, street_address, city, province, postal_code, country }) {
  try {
    logger.info('pg.DAL: Adding a new customer address.');
    const sql = `INSERT INTO public.customer_address (customer_id, street_address, city, province, postal_code, country) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
    const values = [customer_id, street_address, city, province, postal_code, country];
    const newCustomerAddress = await dal.query(sql, values);
    return newCustomerAddress.rows[0];
  } catch (error) {
    logger.error('Error in addCustomerAddress():', error);
    throw error;
  }
};


// Edit a Customer
async function editCustomer(req, res) {
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
    return updateResult.rows;
  } catch (error) {
    logger.error('Error in editCustomer():', error);
    throw error;
  }
}

// Edit a Customer Account
async function editCustomerAccount({ customer_id, username, password }) {
  try {
    logger.info('pg.DAL: Editing a customer account.');
    const sql = 'UPDATE public.customer_account SET username = $2, password = $3 WHERE customer_id = $1 RETURNING *;';
    const values = [customer_id, username, password];
    const updatedCustomerAccount = await dal.query(sql, values);
    return updatedCustomerAccount.rows[0];
  } catch (error) {
    logger.error('Error in editCustomerAccount():', error);
    throw error;
  }
}

// Edit a Customer Address
async function editCustomerAddress({ customer_id, street_address, city, province, postal_code, country }) {
  try {
    logger.info('pg.DAL: Editing a customer address.');
    const sql = 'UPDATE public.customer_address SET street_address = $2, city = $3, province = $4, postal_code = $5, country = $6 WHERE customer_id = $1 RETURNING *;';
    const values = [customer_id, street_address, city, province, postal_code, country];
    const updatedCustomerAddress = await dal.query(sql, values);
    return updatedCustomerAddress.rows[0];
  } catch (error) {
    logger.error('Error in editCustomerAddress():', error);
    throw error;
  }
}


// Delete a customer
async function deleteCustomer(customer_id) {
  try {
    logger.info('pg.DAL: Deleting a customer.');
    const sqlAddress = 'DELETE FROM public.customer_address WHERE customer_id = $1;';
    const sqlAccount = 'DELETE FROM public.customer_account WHERE customer_id = $1;';
    const sqlCustomer = 'DELETE FROM public.customer WHERE customer_id = $1;';
    await dal.query(sqlAddress, [customer_id]);
    await dal.query(sqlAccount, [customer_id]);
    await dal.query(sqlCustomer, [customer_id]);
    logger.info('Customer deleted successfully.');
  } catch (error) {
    logger.error('Error in deleteCustomer():', error);
    throw error;
  }
};


module.exports = {
  getAllCustomers,
  getCustomerByCustomerId,
  getCustomerAccountByCustomerId,
  getCustomerAddressByCustomerId,
  getCustomersByFirstName,
  getCustomersByLastName,
  getCustomerByEmail,
  getCustomerByPhoneNum,
  getCustomersByGender,
  getCustomersByPayMethod,
  getCustomerByUsername,
  addCustomer,
  addCustomerAccount,
  addCustomerAddress,
  editCustomer,
  editCustomerAccount,
  editCustomerAddress,
  deleteCustomer
};