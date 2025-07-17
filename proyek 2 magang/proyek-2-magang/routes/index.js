// var express = require('express');
// var router = express.Router();
// const bcrypt = require('bcrypt');
// const pool = require('../db');
// const { requireLogin } = require('../middleware.js');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.redirect('/login');
// });
// router.get('/login', function(req, res, next) {
//   res.render('login', { title: 'LOGIN PAGE' });
// });

// // Login Handler
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const result = await pool.query('SELECT * FROM admin_users WHERE username = $1 AND password =$2', [username , password]);
//     // const result = await pool.query(
//     //   'SELECT * FROM admin_users WHERE TRIM(LOWER(username)) = TRIM(LOWER($1))',
//     //   [username]
//     // );
//     console.log('Query result:', result.rows);
//     console.log('Username input:', username);
//     console.log('Query result:', result.rows);

//     // const user = r
//     const user = result.rows[0];

//     if (!user) {
//       return res.render('login', { error: 'Username tidak ditemukan atau password salah' });
//     }

//     // const passwordMatch = await compare(password, user.password);
//     // if (!passwordMatch) {
//     //   return res.render('login', { error: 'Password salah' });
//     // }

//     // Simpan session user
//     req.session.user = {
//       id: user.id,
//       username: user.username,
//       role: user.role
//     };

//     res.redirect('/dashboard');
//   } catch (err) {
//     console.error('Error saat login:', err);
//     res.render('login', { error: 'Terjadi kesalahan saat login' });
//   }
// });
// // router.get('/dashboard', requireLogin, (req, res) => {
// //   res.render('dashboard', { currentUser: req.session.user });
// // });
// router.get('/dashboard', requireLogin, (req, res) => {
//   console.log('User di dashboard:', req.session.user);
//   res.render('dashboard', {
//      title: 'SELAMATT DATANG DI DUNIA LAIN!!',
//     currentUser: req.session.user
//   });
// });


// module.exports = router;
