const bcrypt = require('bcrypt');
const userModel = require('../model/usermodel');
const adminModel = require('../model/adminmodel'); // atau sesuaikan nama file modelnya
const axios = require('axios');
const RECAPTCHA_SECRET_KEY = '6Le5830rAAAAAJ3IgHHdqomvtP7E1H46okxq35qa';
// const bcrypt = require('bcrypt');

exports.showLogin = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.handleLogin = async (req, res) => {
//   const { username, password } = req.body;
  const { username, password, 'g-recaptcha-response': recaptcha } = req.body;
  
  try {
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptcha}`;
    const response = await axios.post(verifyURL);

    if (!response.data.success) {
      return res.send('Verifikasi reCAPTCHA gagal!');
    }
  } catch (err) {
    console.error('Error verifikasi reCAPTCHA:', err);
    return res.send('Gagal memverifikasi reCAPTCHA.');
  }
    let user = await userModel.findByUsername(username);
    if (!user) {
    user = await adminModel.findByUsername(username); // Coba cari di tabel admin kalau gak ketemu di superadmin
  }
  // const user = await userModel.findByUsername(username);
//   if (!user) {
//       if (req.brute) req.brute.registerFail();
//       return res.render('login', { title: 'Login', error: 'User tidak ditemukan' });
//     }
//     let matcheduser = null;
//     for (const u of users) {
//     const match = await bcrypt.compare(password, u.password);
//    if (match) {
//     matcheduser = u;
//     break;
//   }
// }
// if (!matcheduser) {
//   if (req.brute) req.brute.registerFail();
//   return res.render('login', { title: 'Login', error: 'Password salah' });
// }

    // ✅ Cek password (gunakan bcrypt.compare!)
    // const match = await bcrypt.compare(password, user.password);
    // 
    // const isMatch = await bcrypt.compare(password, user.password);
    console.log(user);
    const match = await bcrypt.compare(password, user.password);
    const hash = await bcrypt.hash(password, 10);
    console.log(hash);
    if (!match) {
    // const valid = await bcrypt.compare(password, user.password);
    // if (!valid) {
  
      if (req.brute) req.brute.registerFail();
      return res.render('login', { title: 'Login', error: 'Password salah' });
    }

    // ✅ Reset percobaan jika login sukses
    if (req.brute) req.brute.reset();
  
//   if (!user) return res.render('login', { error: 'User tidak ditemukan' });

// //   const valid = await compare(password, user.password);
//   if (user.password !== password) return res.render('login', { error: 'Password salah' });

   req.session.user = user;
  // req.session.user = matcheduser;
  res.redirect('/dashboard');
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    return res.redirect('login');
  });
};
