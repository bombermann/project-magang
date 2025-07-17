function requireLogin(req, res, next) {
  // if (req.session.user) {
  if (req.session.user && ['admin', 'superadmin'].includes(req.session.user.role)) {
    return next();
  }
  res.redirect('/auth/login'); // atau res.status(401).send('Silakan login');
}

function requireSuperadmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'superadmin') {
    return next();
  }
  res.status(403).send('Akses ditolak: Hanya untuk superadmin');
}

// 🔐 Middleware Brute Force Protection
const attemptLog = {};

function getDelay(count) {
  if (count < 5) return 0;
  if (count < 10) return 60;     // 1 menit
  if (count < 15) return 180;    // 3 menit
  return 300;                    // 5 menit
}

function bruteForceProtect(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const log = attemptLog[ip] || { count: 0, lastTry: 0, blockedUntil: 0 };

  if (now < log.blockedUntil) {
    const waitSeconds = Math.ceil((log.blockedUntil - now) / 1000);
    return res.render('wait', { waitSeconds }); // 👈 buat file wait.jade
  }

  req.brute = {
    log,
    registerFail: () => {
      log.count += 1;
      const delay = getDelay(log.count) * 1000;
      log.lastTry = now;
      log.blockedUntil = delay ? now + delay : 0;
      attemptLog[ip] = log;
    },
    reset: () => {
      delete attemptLog[ip];
    }
  };

  next();
}

module.exports = {
  requireLogin,
  requireSuperadmin,
   bruteForceProtect
};
