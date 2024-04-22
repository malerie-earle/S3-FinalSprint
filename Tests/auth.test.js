const { expect } = require('chai');
const request = require('supertest');
const sinon = require('sinon');
const app = require('./server');
const bcrypt = require('bcrypt');

describe('Authentication', () => {
  let testUser = {
    username: 'testuser',
    password: 'testpassword'
  };

  // Mock the authenticateUser function
  let authenticateUserStub;

  before(() => {
    authenticateUserStub = sinon.stub(require('../src/services/pg.customers.dal'), 'authenticateUser');
    
    // Mocking the function to return a user for the testUser
    authenticateUserStub.withArgs(testUser.username).resolves({
      username: testUser.username,
      password: bcrypt.hashSync(testUser.password, 10) // Hash the test password for comparison
    });
    
    // Mocking the function to return null for an invalid user
    authenticateUserStub.withArgs('invaliduser').resolves(null);
  });

  after(() => {
    // Restore the original authenticateUser function after the tests
    authenticateUserStub.restore();
  });

  it('should authenticate a valid user', async () => {
    const res = await request(app)
      .post('/login')
      .send(testUser);

    expect(res.status).to.equal(302); // Assuming successRedirect is set to '/home'
    expect(res.header.location).to.equal('/home');
  });

  it('should not authenticate an invalid user', async () => {
    const invalidUser = {
      username: 'invaliduser',
      password: 'invalidpassword'
    };

    const res = await request(app)
      .post('/login')
      .send(invalidUser);

    expect(res.status).to.equal(302); // Assuming failureRedirect is set to '/login'
    expect(res.header.location).to.equal('/login');
  });
});
