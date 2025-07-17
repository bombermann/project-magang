// knex.js
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',       // ganti sesuai
    password: '12345678',
    database: 'admin_db'
  }
});

module.exports = knex;
