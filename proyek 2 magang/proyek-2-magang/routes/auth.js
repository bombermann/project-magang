const express = require('express');
const router = express.Router();
const auth = require('../controllers/authcontroller');
const {requireLogin,requireSuperadmin,bruteForceProtect } = require('../middleware');

console.log(bruteForceProtect);
console.log('authcontroller:', auth); // Lihat isinya

router.get('/login', bruteForceProtect, auth.showLogin);
// router.post('/login', auth.handleLogin);
router.post('/login', bruteForceProtect, auth.handleLogin);
router.get('/logout', auth.logout);

module.exports = router;
