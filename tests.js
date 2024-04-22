
// MongoDB Connection Test
const assert = require('assert');
const pool = require('./m.auth_db');

describe('MongoDB Connection', () => {
  it('should connect to MongoDB Atlas', async () => {
    await pool.connect();
    assert.strictEqual(pool.isConnected(), true);
  });

  after(async () => {
    await pool.close();
  });
});

// MongoDB Search Test
const assert = require('assert');
const searchLogic = require('./searchLogic');

describe('MongoDB Text Search', () => {
  it('should return search results based on the query', async () => {
    const query = 'chicken';
    const searchResults = await searchLogic.searchInMongo(query);
    
    assert.ok(searchResults.length > 0, 'Expected search results to be greater than 0');
    searchResults.forEach(result => {
      assert.ok(result.title.toLowerCase().includes(query) || result.ingredients.join(' ').toLowerCase().includes(query) || result.directions.join(' ').toLowerCase().includes(query), `Search result should contain the query "${query}" in title, ingredients, or directions`);
    });
  });
});


// Customer Addition Test

const assert = require('assert');
const pgDal = require('./pg.customers.dal');

describe('PostgreSQL Customer Addition', () => {
  it('should add a new customer to the database', async () => {
    const newCustomer = {
      first_name: 'Chantelle',
      last_name: 'Carroll',
      email: 'janeilchantelle@gmail.com',
      ph_num: '7092192491',
      gender: 'Female',
      pay_method: 'visa'
    };
    
    const addedCustomer = await pgDal.addCustomer({ body: { newCustomer } });
    
    assert.strictEqual(addedCustomer.first_name, newCustomer.first_name);
    assert.strictEqual(addedCustomer.last_name, newCustomer.last_name);
    assert.strictEqual(addedCustomer.email, newCustomer.email);
    assert.strictEqual(addedCustomer.ph_num, newCustomer.ph_num);
    assert.strictEqual(addedCustomer.gender, newCustomer.gender);
    assert.strictEqual(addedCustomer.pay_method, newCustomer.pay_method);
  });
});
