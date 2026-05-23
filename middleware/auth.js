const jwt = require('jsonwebtoken');

const TOKEN_COOKIE = 'auth_token';
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret-in-production';

function getToken(req) {
  const authHeader = req.headers.authorization || '';

  if (authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  return req.cookies ? req.cookies[TOKEN_COOKIE] : null;
}

function signToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role || 'user',
    },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
}

function setAuthCookie(res, token) {
  res.cookie(TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
  });
}

function clearAuthCookie(res) {
  res.clearCookie(TOKEN_COOKIE);
}

function optionalAuth(req, res, next) {
  const token = getToken(req);
  res.locals.currentUser = null;

  if (!token) {
    return next();
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    res.locals.currentUser = req.user;
  } catch (error) {
    clearAuthCookie(res);
  }

  return next();
}

function requireAuth(req, res, next) {
  if (!req.user) {
    return res.redirect('/loginForm');
  }

  return next();
}

function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.redirect('/loginForm');
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).render('admin/forbidden', {
        message: 'You do not have permission to access this page.',
      });
    }

    return next();
  };
}

module.exports = {
  optionalAuth,
  requireAuth,
  authorizeRoles,
  signToken,
  setAuthCookie,
  clearAuthCookie,
};
