var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const pool = require('./db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postinganRoutes = require('./routes/post'); // ✅ ini sudah pas

const postModel = require('./model/postmodel');
const userModel = require('./model/usermodel');

var app = express();

const session = require('express-session');
app.use(session({
  secret: 'secret_key',           // Ganti dengan string yang aman
  resave: false,
  saveUninitialized: false,       // Jangan simpan session kosong
  cookie: { maxAge: 60 * 60 * 1000 } // 1 jam login aktif
}));

// app.use('/post', postinganRoutes);                // ✅ endpoint /post


// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var authRouter = require('./routes/auth')
// const { requireLogin } = require('./middleware.js');
const { requireLogin, requireSuperadmin } = require('./middleware');




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// Middleware global: inject currentUser ke semua view
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});



// Halaman Dashboard
app.get('/dashboard', requireLogin, async (req, res) => {
  try {
      const posts = await postModel.getAll();
      const admins = await userModel.getAllAdmins();

    res.render('dashboard', {
      postCount: posts.length,
      adminCount: admins.length
    });
  } catch (err) {
    console.error('Error loading dashboard:', err);
    res.status(500).send('Gagal memuat dashboard');
  }
});
//   res.render('dashboard');
// });


// app.use('/', indexRouter);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/post', postinganRoutes);

// untuk log out
// app.get('/logout', (req, res) => {
//   req.session.destroy(err => {
//     if (err) {
//       console.error('Gagal logout:', err);
//       return res.send('Logout gagal!');
//     }
//     res.redirect('/login');
//   });
// });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
