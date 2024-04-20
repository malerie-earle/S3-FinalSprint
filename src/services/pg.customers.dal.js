// Import the required modules
const dal = require('./pg.auth_db');
const { logger } = require('../logEvents');
const bcrypt = require('bcrypt');

// Authenticate User
async function authenticateUser(username, password) {
  try {
    // Authenticate the user
    logger.info('pg.DAL: Authenticating user.');
    const sql = 'SELECT * FROM public.customer_account WHERE username = $1;';
    const result = await dal.query(sql, [username]);
    const user = result.rows[0];

    // If the user is not found, return null
    if (!user) {
      logger.info('User not found.');
      return null;
    }
    // If the user is found, compare the password
    logger.info(`Retrieved user: ${JSON.stringify(user)}`);

    // Compare the entered password with the stored hashed password
    if (password !== user.password) {
      logger.info('Incorrect password.');
      return null;
    }

    // Return the user
    logger.info('User authenticated successfully.');
    return user;

  // Handle errors
  } catch (error) {
    logger.error('Error in authenticateUser():', error);
    throw error;
  }
}


// Register a new user
async function signUpUser({ first_name, last_name, email, ph_num, gender, pay_method, username, password, street_address, city, province, postal_code, country }) {
  logger.info('pg.DAL: signUpUser():');
  const userDetails = { first_name, last_name, email, ph_num, gender, pay_method, username, password, street_address, city, province, postal_code, country };
  logger.info('pg.DAL: signUpUser():', userDetails);
  try {
    // Add a new Customer
    logger.info('pg.DAL: Adding a new customer.');
    const newCustomer = await addCustomer({ first_name, last_name, email, ph_num, gender, pay_method });
    const newCustomerId = newCustomer.customer_id;
    logger.info('pg.DAL: New customer added successfully.');

    // Add a new Customer Account
    logger.info('pg.DAL: Registering a new user.');
    const newCustomerAccount = await addCustomerAccount({ username, password });
    const newCustomerID = newCustomerAccount.customer_id;

    logger.info('pg.DAL: New user registered successfully.');

    // Add a new Customer Address
    logger.info('pg.DAL: Adding a new customer address.');
    const newCustomerAddress = await addCustomerAddress({ street_address, city, province, postal_code, country });
    const newCustomerAddressID = newCustomerAddress.customer_id;
    logger.info('pg.DAL: New customer address added successfully.');

    // Return the new customer details
    logger.info('pg.DAL: New customer registered successfully.');
    return { newCustomerID, newCustomer, newCustomerAccount, newCustomerAddress };
    
  // Handle errors
  } catch (error) {
    logger.error('Error in registerCustomer():', error);
    throw error;
  }
}


// Get all Customers
async function getAllCustomers() {  
  logger.info('pg.DAL: getAllCustomers():');
  try {
    const sql = `
      SELECT c.*, ca.username, caa.*
      FROM public.customer c
      LEFT JOIN public.customer_account ca ON c.customer_id = ca.customer_id
      LEFT JOIN public.customer_address caa ON c.customer_id = caa.customer_id
      ORDER BY c.customer_id DESC;
    `;
    // Execute the query
    const result = await dal.query(sql);
    logger.info('pg.DAL: All customers retrieved successfully.');
    return result.rows;

  // Handle errors
  } catch (error) {
    logger.error('Error in getAllCustomers():', error);
    throw error; 
  }
};


// Get a Customer by customer_id
async function getCustomerByCustomerId(customer_id) {
  logger.info('pg.DAL: getCustomerByCustomerId():');
  try {
    logger.info('pg.DAL: Getting a customer by customer_id.');
    const sql = `SELECT * FROM customer WHERE customer_id = $1;`;
    // Execute the query
    const results = await dal.query(sql, [customer_id]);
    logger.info('pg.DAL: Customer retrieved successfully.');
    return results.rows[0];

  // Handle errors
  } catch (error) {
    logger.error('Error in getCustomerByCustomerId():', error);
    throw error;
  }
};


// Get a Customer Account by customer_id
async function getCustomerAccountByCustomerId(customer_id) {
  logger.info('pg.DAL: getCustomerAccountByCustomerId():');
  try {
    logger.info('pg.DAL: Getting a customer account by customer_id.');
    const sql = `SELECT * FROM public.customer_account WHERE customer_id = $1;`;
    // Execute the query
    const results = await dal.query(sql, [customer_id]);
    logger.info('pg.DAL: Customer account retrieved successfully.');
    return results.rows[0];

  // Handle errors
  } catch (error) {
    logger.error('Error in getCustomerAccountByCustomerId():', error);
    throw error;
  }
}


// Get a Customer Address by customer_id
async function getCustomerAddressByCustomerId(customer_id) {
  logger.info('pg.DAL: getCustomerAddressByCustomerId():');
  try {
    logger.info('pg.DAL: Getting a customer address by customer_id.');
    const sql = `SELECT * FROM public.customer_address WHERE customer_id = $1;`;
    // Execute the query
    const results = await dal.query(sql, [customer_id]);
    logger.info('pg.DAL: Customer address retrieved successfully.');
    return results.rows[0];

  // Handle errors
  } catch (error) {
    logger.error('Error in getCustomerAddressByCustomerId():', error);
    throw error;
  }
}

// Get a Customer by first_name
async function getCustomersByFirstName(first_name) {
  logger.info('pg.DAL: getCustomersByFirstName():');
  try {
    logger.info('pg.DAL: Getting customers by first_name.');
    const sql = `SELECT * FROM public.customer WHERE first_name = $1;`;
    // Execute the query
    const results = await dal.query(sql, [first_name]);
    logger.info('pg.DAL: Customers retrieved successfully.');
    return results.rows;
  
  // Handle errors
  } catch (error) {
    logger.error('Error in getCustomerByFirstName():', error);
    throw error;
  }
};


// Get a Customer by last_name
async function getCustomersByLastName(last_name) {
  logger.info('pg.DAL: getCustomersByLastName():');
  try {
    logger.info('pg.DAL: Getting customers by last_name.');
    const sql = `SELECT * FROM public.customer WHERE last_name = $1;`;
    // Execute the query
    const results = await dal.query(sql, [last_name]);
    logger.info('pg.DAL: Customers retrieved successfully.');
    return results.rows;

  // Handle errors
  } catch (error) {
    logger.error('Error in getCustomerByLastName():', error);
    throw error;
  }
};


// Get a Customer by email
async function getCustomerByEmail(email) {
  logger.info('pg.DAL: getCustomerByEmail():');
  try {
    logger.info('pg.DAL: Getting a customer by email.');
    const sql = `SELECT * FROM public.customer WHERE email = $1;`;
    // Execute the query
    const results = await dal.query(sql, [email]);
    logger.info('pg.DAL: Customer retrieved successfully.');
    return results.rows;

  // Handle errors
  } catch (error) {
    logger.error('Error in getCustomerByEmail():', error);
    throw error;
  }
};


// Get a Customer by phone number
async function getCustomerByPhoneNum(ph_num) {
  logger.info('pg.DAL: getCustomerByPhoneNum():');
  try {
    logger.info('pg.DAL: Getting a customer by phone number.');
    const sql = `SELECT * FROM public.customer WHERE ph_num = $1;`;
    // Execute the query
    const results = await dal.query(sql, [ph_num]);
    logger.info('pg.DAL: Customer retrieved successfully.');
    return results.rows;

  // Handle errors
  } catch (error) {
    logger.error('Error in getCustomerByPhoneNum():', error);
    throw error;
  }
};


// Get a Customer by gender
async function getCustomersByGender(gender) {
  logger.info('pg.DAL: getCustomersByGender():');
  try {
    logger.info('pg.DAL: Getting customers by gender.');
    const sql = `SELECT * FROM public.customer WHERE gender = $1;`;
    // Execute the query
    const results = await dal.query(sql, [gender]);
    logger.info('pg.DAL: Customers retrieved successfully.');
    return results.rows;

  // Handle errors
  } catch (error) {
    logger.error('Error in getCustomerByGender():', error);
    throw error;
  }
};

// Get a Customer by pay_method
async function getCustomersByPayMethod(pay_method) {
  logger.info('pg.DAL: getCustomersByPayMethod():');
  try {
    logger.info('pg.DAL: Getting customers by pay_method.');
    const sql = `SELECT * FROM public.customer WHERE pay_method = $1;`;
    // Execute the query
    const results = await dal.query(sql, [pay_method]);
    logger.info('pg.DAL: Customers retrieved successfully.');
    return results.rows;

  // Handle errors
  } catch (error) {
    logger.error('Error in getCustomerByPayMethod():', error);
    throw error;
  }
}


// Get a Customer by username
async function getCustomerByUsername(username) {
  logger.info('pg.DAL: getCustomerByUsername():');
  try {
    logger.info('pg.DAL: Getting a customer by username.');
    const sql = `
      SELECT customer.*, customer_account.username 
      FROM public.customer 
      INNER JOIN public.customer_account 
      ON customer.customer_id = customer_account.customer_id
      WHERE customer_account.username = $1;
    `;
    // Execute the query
    const results = await dal.query(sql, [username]);
    logger.info('pg.DAL: Customer retrieved successfully.');
    return results.rows;

  // Handle errors
  } catch (error) {
    logger.error('Error in getCustomerByUsername():', error);
    throw error;
  }
};


// Add a new Customer
async function addCustomer({ first_name, last_name, email, ph_num, gender, pay_method }) {
  logger.info('pg.DAL: addCustomer():');
  try {
    const sql = `INSERT INTO public.customer (customer_id, first_name, last_name, email, ph_num, gender, pay_method) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
    const idQuery = 'SELECT MAX(customer_id) AS max_id FROM public.customer;';
    // Get the last customer_id
    const lastIdResult = await dal.query(idQuery);
    const newCustomerId = lastIdResult.rows[0].max_id + 1;
    const values = [newCustomerId, first_name, last_name, email, ph_num, gender, pay_method];
    // Execute the query
    const newCustomer = await dal.query(sql, values);
    return newCustomer.rows[0];

  // Handle errors
  } catch (error) {
    logger.error('Error in addCustomer():', error);
    throw error;
  }
};

// Add a new Customer Account
async function addCustomerAccount({ customer_id, username, password }) {
  logger.info('pg.DAL: Adding a new customer account.');
  try {
    const sql = `INSERT INTO public.customer_account (customer_id, username, password) VALUES ($1, $2, $3) RETURNING *;`;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const values = [customer_id, username, hashedPassword];
    // Execute the query
    const newCustomerAccount = await dal.query(sql, values);
    return newCustomerAccount.rows[0];

  // Handle errors
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
    // Execute the query
    const newCustomerAddress = await dal.query(sql, values);
    logger.info('pg.DAL: New customer address added successfully.');
    return newCustomerAddress.rows[0];
  } catch (error) {
    logger.error('Error in addCustomerAddress():', error);
    throw error;
  }
};


// Edit a Customer
async function editCustomer({customer_id, first_name, last_name, email, ph_num, gender, pay_method}) {
  try {
    logger.info('pg.DAL: Editing a customer.');
    const selectSql = 'SELECT * FROM public.customer WHERE customer_id = $1';
    const updateSql = 'UPDATE public.customer SET first_name = $2, last_name = $3, email = $4, ph_num = $5, gender = $6, pay_method = $7 WHERE customer_id = $1 RETURNING *';
    // Execute the query
    const selectResult = await dal.query(selectSql, [customer_id]);
    // Check if the customer exists
    if (selectResult.rows.length === 0) {
      throw new Error('Customer not found');
    }
    const values = [customer_id, first_name, last_name, email, ph_num, gender, pay_method];
    const updateResult = await dal.query(updateSql, values);
    logger.info('Customer edited successfully.');
    return updateResult.rows;

  // Handle errors
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
    // Execute the query
    const values = [customer_id, username, password];
    const updatedCustomerAccount = await dal.query(sql, values);
    logger.info('Customer account edited successfully.');
    return updatedCustomerAccount.rows[0];

  // Handle errors
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
    // Execute the query
    const values = [customer_id, street_address, city, province, postal_code, country];
    const updatedCustomerAddress = await dal.query(sql, values);
    logger.info('Customer address edited successfully.');
    return updatedCustomerAddress.rows[0];

  // Handle errors
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
  deleteCustomer,
  authenticateUser,
  signUpUser
};