const { Pool } = require('pg');
const logger  = require('../logEvents');
require('dotenv').config();

// Create a new pool with the connection details
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

module.exports = pool;