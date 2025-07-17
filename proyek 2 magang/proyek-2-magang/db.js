const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'admin_db',
  password: '12345678',
  port: 5432, // default port
});

pool.connect()

module.exports = pool;
