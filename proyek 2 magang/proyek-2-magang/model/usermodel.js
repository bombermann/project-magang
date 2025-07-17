// const pool = require('../db');

// exports.findByUsername = async (username) => {
//   const res = await pool.query('SELECT * FROM admin_users WHERE username = $1', [username]);
//   return res.rows[0];
// };

// exports.createAdmin = async (username, hash) => {
//   await pool.query(
//     "INSERT INTO admin_users (username, password, role) VALUES ($1, $2, 'admin')",
//     [username, hash]
//   );
// };

// exports.getAllAdmins = async () => {
//   const res = await pool.query("SELECT * FROM admin_users WHERE role = 'admin'");
//   return res.rows;
// };

// exports.findById = async (id) => {
//   const res = await pool.query('SELECT * FROM admin_users WHERE id = $1', [id]);
//   return res.rows[0];
// };

// exports.updateAdmin = async (id, username, hash) => {
//   await pool.query("UPDATE admin_users SET username = $1, password = $2 WHERE id = $3", [username, hash, id]);
// };

// exports.deleteAdmin = async (id) => {
//   await pool.query('DELETE FROM admin_users WHERE id = $1', [id]);
// };

const db = require('../knex'); // ⬅️ Ganti pool dengan koneksi Knex
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

exports.findByUsername = async (username) => {
  return await db('admin_users')
    .where({ username })
    .first(); // Ambil hanya 1 hasil
};

exports.createAdmin = async (username, password) => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  await db('admin_users').insert({
    username,
    password: hash,
    role: 'admin'
  });
};

exports.getAllAdmins = async () => {
  return await db('admin_users')
    .where({ role: 'admin' })
    .orderBy('id', 'asc');
};

exports.findById = async (id) => {
  return await db('admin_users')
    .where({ id })
    .first();
};

exports.updateAdmin = async (id, username, password) => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  await db('admin_users')
    .where({ id })
    .update({
      username,
      password: hash
    });
};

exports.deleteAdmin = async (id) => {
  await db('admin_users')
    .where({ id })
    .del();
};
