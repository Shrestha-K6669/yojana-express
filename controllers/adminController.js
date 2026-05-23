const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { initModels } = require('../models/init-models');
const sequelize = require('../db/db_mx');
const { signToken, setAuthCookie, clearAuthCookie } = require('../middleware/auth');
const uuid = require('./uuidcode');
const u = require('uuid');

const login = initModels(sequelize).y_login;
const SALT_ROUNDS = 10;
const ROLES = ['admin', 'user'];

function userPayload(body, includePassword) {
  const payload = {
    firstname: (body.firstName || body.firstname || '').trim(),
    lastname: (body.lastName || body.lastname || '').trim(),
    email: (body.email || '').trim().toLowerCase(),
    role: ROLES.includes(body.role) ? body.role : 'user',
    is_active: body.is_active === 'on' || body.is_active === true || body.is_active === 'true',
    updated_at: new Date(),
  };

  if (includePassword) {
    payload.password = body.password.trim();
  }

  return payload;
}

function sanitizeUser(user) {
  return {
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    role: user.role || 'user',
    is_active: user.is_active,
    last_login: user.last_login,
    created_at: user.created_at,
  };
}

async function nextRegistrationRole() {
  const totalUsers = await login.count();
  return totalUsers === 0 ? 'admin' : 'user';
}

exports.adminHome = (req, res) => {
  res.render('admin/index');
};

exports.registerU = (req, res) => {
  res.render('yojana/register', { message: null });
};

exports.loginPage = (req, res) => {
  res.render('yojana/login', { message: null });
};

exports.addUser = async (req, res) => {
  try {
    const passRepeat = (req.body.password_repeat || '').trim();
    const user = userPayload(req.body, true);

    if (!user.firstname || !user.lastname || !user.email || !user.password) {
      return res.render('yojana/register', { message: 'Please fill all required fields.' });
    }

    if (user.password !== passRepeat) {
      return res.render('yojana/register', { message: 'Your password did not match.' });
    }

    const existingUser = await login.findOne({ where: { email: user.email } });
    if (existingUser) {
      return res.render('yojana/register', { message: 'This email is already registered.' });
    }

    user._id = uuid(u.v4());
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.role = await nextRegistrationRole();
    user.is_active = true;
    user.created_at = new Date();

    await login.create(user);

    return res.render('yojana/login', {
      message: user.role === 'admin'
        ? 'Registration successful. The first account was created as administrator.'
        : 'Registration successful. Please login.',
    });
  } catch (err) {
    console.log('error while creating user', err);
    return res.status(500).render('yojana/register', { message: 'Unable to register user.' });
  }
};

exports.login = async (req, res) => {
  try {
    const email = (req.body.email || '').trim().toLowerCase();
    const password = (req.body.password || '').trim();
    const user = await login.findOne({ where: { email } });

    if (!user) {
      return res.render('yojana/login', { message: "Email you provided doesn't exist." });
    }

    if (!user.is_active) {
      return res.render('yojana/login', { message: 'Your account is disabled.' });
    }

    let passwordMatched = false;
    if (user.password && user.password.startsWith('$2')) {
      passwordMatched = await bcrypt.compare(password, user.password);
    } else {
      passwordMatched = user.password === password;
      if (passwordMatched) {
        user.password = await bcrypt.hash(password, SALT_ROUNDS);
      }
    }

    if (!passwordMatched) {
      return res.render('yojana/login', { message: 'Incorrect password.' });
    }

    user.last_login = new Date();
    user.updated_at = new Date();
    await user.save();

    setAuthCookie(res, signToken(user));
    return res.redirect('/admin');
  } catch (err) {
    console.log('error occurred while logging user', err);
    return res.status(500).render('yojana/login', { message: 'Error occurred while logging user.' });
  }
};

exports.logout = (req, res) => {
  clearAuthCookie(res);
  res.redirect('/loginForm');
};

exports.userList = async (req, res) => {
  const users = await login.findAll({ order: [['created_at', 'DESC']] });
  res.render('admin/users', {
    users: users.map(sanitizeUser),
    message: req.query.message || null,
  });
};

exports.newUserForm = (req, res) => {
  res.render('admin/userForm', {
    title: 'Create User',
    action: '/users',
    user: { firstname: '', lastname: '', email: '', role: 'user', is_active: true },
    roles: ROLES,
    requirePassword: true,
    message: null,
  });
};

exports.createUser = async (req, res) => {
  try {
    const user = userPayload(req.body, true);

    if (!user.firstname || !user.lastname || !user.email || !user.password) {
      return res.status(400).render('admin/userForm', {
        title: 'Create User',
        action: '/users',
        user,
        roles: ROLES,
        requirePassword: true,
        message: 'Please fill all required fields.',
      });
    }

    const existingUser = await login.findOne({ where: { email: user.email } });
    if (existingUser) {
      return res.status(400).render('admin/userForm', {
        title: 'Create User',
        action: '/users',
        user,
        roles: ROLES,
        requirePassword: true,
        message: 'This email is already registered.',
      });
    }

    user._id = uuid(u.v4());
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.created_at = new Date();
    await login.create(user);

    return res.redirect('/users?message=User created successfully');
  } catch (err) {
    console.log('error while creating managed user', err);
    return res.status(500).redirect('/users?message=Unable to create user');
  }
};

exports.editUserForm = async (req, res) => {
  const user = await login.findByPk(req.params.id);

  if (!user) {
    return res.status(404).redirect('/users?message=User not found');
  }

  return res.render('admin/userForm', {
    title: 'Edit User',
    action: `/users/${user._id}`,
    user: sanitizeUser(user),
    roles: ROLES,
    requirePassword: false,
    message: null,
  });
};

exports.updateUser = async (req, res) => {
  try {
    const user = await login.findByPk(req.params.id);

    if (!user) {
      return res.status(404).redirect('/users?message=User not found');
    }

    const payload = userPayload(req.body, false);
    const duplicateEmail = await login.findOne({
      where: {
        email: payload.email,
        _id: { [Op.ne]: user._id },
      },
    });

    if (duplicateEmail) {
      return res.status(400).render('admin/userForm', {
        title: 'Edit User',
        action: `/users/${user._id}`,
        user: { ...sanitizeUser(user), ...payload },
        roles: ROLES,
        requirePassword: false,
        message: 'This email is already used by another user.',
      });
    }

    if ((req.body.password || '').trim()) {
      payload.password = await bcrypt.hash(req.body.password.trim(), SALT_ROUNDS);
    }

    await user.update(payload);
    return res.redirect('/users?message=User updated successfully');
  } catch (err) {
    console.log('error while updating user', err);
    return res.status(500).redirect('/users?message=Unable to update user');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (req.user.id === req.params.id) {
      return res.redirect('/users?message=You cannot delete your own account');
    }

    await login.destroy({ where: { _id: req.params.id } });
    return res.redirect('/users?message=User deleted successfully');
  } catch (err) {
    console.log('error while deleting user', err);
    return res.redirect('/users?message=Unable to delete user');
  }
};
