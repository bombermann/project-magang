
// const pool = require('../db');

// exports.getAll = async () => {
//   const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
//   return result.rows;
// };

// exports.findById = async (id) => {
//   const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
//   return result.rows[0];
// };

// exports.create = async (title, content) => {
//   await pool.query('INSERT INTO posts (title, content, created_at) VALUES ($1, $2, NOW())', [title, content]);
// };

// exports.update = async (id, title, content) => {
//   await pool.query('UPDATE posts SET title = $1, content = $2 WHERE id = $3', [title, content, id]);
// };

// exports.delete = async (id) => {
//   await pool.query('DELETE FROM posts WHERE id = $1', [id]);
// };
const db = require('../knex'); // ⬅️ Ini arahkan ke file knex.js lo

exports.getAll = async () => {
  return await db('posts').select('*').orderBy('created_at', 'desc');
};

exports.findById = async (id) => {
  return await db('posts').where({ id }).first();
};

exports.create = async (title, content) => {
  await db('posts').insert({
    title,
    content,
    created_at: db.fn.now()
  });
};

exports.update = async (id, title, content) => {
  await db('posts')
    .where({ id })
    .update({ title, content });
};

exports.delete = async (id) => {
  await db('posts').where({ id }).del();
};
