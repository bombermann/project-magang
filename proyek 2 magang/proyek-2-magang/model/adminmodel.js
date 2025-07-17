// // model/adminmodel.js
// const pool = require('../knex');

// exports.findByUsername = async (username) => {
//   const res = await pool.query('SELECT * FROM admin_users WHERE username = $1', [username]);
//   return res.rows[0];
// };
// model/usermodel.js
const db = require('../knex');

exports.findByUsername = async (username) => {
  const result = await db('admin_users')
    .where({ username })
    .first(); // ambil satu data
  return result;
};
