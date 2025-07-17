// const express = require('express');
// const router = express.Router();
// const pool = require('../db');
// const bcrypt = require('bcrypt'); // pastikan middleware di-export
// function requireSuperadmin(req, res, next) {
//   if (req.session.user && req.session.user.role === 'superadmin') {
//     return next();
//   }
//   res.status(403).send('Akses ditolak: Hanya untuk superadmin');
// }

// // Tampilkan semua admin
// router.get('/', requireSuperadmin, async (req, res) => {
//   const result = await pool.query("SELECT * FROM admin_users WHERE role = 'admin'");
//   res.render('admin_list.jade', { admins: result.rows });
// });

// // Form tambah admin
// router.get('/add', requireSuperadmin, (req, res) => {
//   res.render('admin_add.jade');
// });

// // Proses tambah admin
// router.post('/add', requireSuperadmin, async (req, res) => {
//   const { username, password } = req.body;
//   const hash = await bcrypt.hash(password, 10);
//   await pool.query("INSERT INTO admin_users (username, password, role) VALUES ($1, $2, 'admin')", [username, hash]);
//   res.redirect('/users');
// });

// // Form edit admin
// router.get('/edit/:id', requireSuperadmin, async (req, res) => {
//   const result = await pool.query('SELECT * FROM admin_users WHERE id = $1', [req.params.id]);
//   res.render('admin_edit.jade', { admin: result.rows[0] });
// });

// // Proses update admin
// router.post('/edit/:id', requireSuperadmin, async (req, res) => {
//   const { username, password } = req.body;
//   const hash = await bcrypt.hash(password, 10);
//   await pool.query("UPDATE admin_users SET username=$1, password=$2 WHERE id=$3", [username, hash, req.params.id]);
//   res.redirect('/users');
// });

// // Hapus admin
// router.post('/delete/:id', requireSuperadmin, async (req, res) => {
//   await pool.query('DELETE FROM admin_users WHERE id = $1', [req.params.id]);
//   res.redirect('/users');
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
// const pool = require('../db');
// const bcrypt = require('bcrypt');
const users = require('../controllers/usercontroller')
const { requireLogin, requireSuperadmin } = require('../middleware');

router.use(requireLogin);
router.use(requireSuperadmin);

router.get('/', users.listAdmins);
router.get('/add', users.showAddForm);
router.post('/add', users.handleAdd);
router.get('/edit/:id', users.showEditForm);
router.post('/edit/:id', users.handleEdit);
router.get('/delete/:id', users.handleDelete);


// // Tampilkan semua admin
// router.get('/', requireLogin, requireSuperadmin, async (req, res) => {
//   const result = await pool.query("SELECT * FROM admin_users WHERE role = 'admin'");
//   res.render('admin_list.jade', { admins: result.rows });
// });

// // Form tambah admin
// router.get('/add', requireLogin, requireSuperadmin, (req, res) => {
//   res.render('admin_add.jade');
// });

// // Tambah admin
// router.post('/add', requireLogin, requireSuperadmin, async (req, res) => {
//   const { username, password } = req.body;
//   const hash = await bcrypt.hash(password, 10);
//   await pool.query("INSERT INTO admin_users (username, password, role) VALUES ($1, $2, 'admin')", [username, hash]);
//   res.redirect('/users');
// });

// // Form edit
// router.get('/edit/:id', requireLogin, requireSuperadmin, async (req, res) => {
//   const result = await pool.query('SELECT * FROM admin_users WHERE id = $1', [req.params.id]);
//   res.render('admin_edit.jade', { admin: result.rows[0] });
// });

// // Update admin
// router.post('/edit/:id', requireLogin, requireSuperadmin, async (req, res) => {
//   const { username, password } = req.body;
//   const hash = await bcrypt.hash(password, 10);
//   await pool.query("UPDATE admin_users SET username=$1, password=$2 WHERE id=$3", [username, hash, req.params.id]);
//   res.redirect('/users');
// });

// // Hapus admin
// router.get('/delete/:id', requireLogin, requireSuperadmin, async (req, res) => {
//   await pool.query('DELETE FROM admin_users WHERE id = $1', [req.params.id]);
//   res.redirect('/users');
// });

module.exports = router;
