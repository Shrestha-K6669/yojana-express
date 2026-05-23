const express = require("express");
const router = express.Router();

const adminController=require('../controllers/adminController')
const { requireAuth, authorizeRoles }=require('../middleware/auth')

router.get('/admin', requireAuth, adminController.adminHome)

router.get('/registerForm', adminController.registerU)
router.get('/loginForm',adminController.loginPage)
router.post('/register',adminController.addUser)
router.post('/login',adminController.login)
router.post('/logout', requireAuth, adminController.logout)

router.get('/users', requireAuth, authorizeRoles('admin'), adminController.userList)
router.get('/users/new', requireAuth, authorizeRoles('admin'), adminController.newUserForm)
router.post('/users', requireAuth, authorizeRoles('admin'), adminController.createUser)
router.get('/users/:id/edit', requireAuth, authorizeRoles('admin'), adminController.editUserForm)
router.post('/users/:id', requireAuth, authorizeRoles('admin'), adminController.updateUser)
router.post('/users/:id/delete', requireAuth, authorizeRoles('admin'), adminController.deleteUser)

module.exports=router
