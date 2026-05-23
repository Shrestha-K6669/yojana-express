const express = require("express");
const router = express.Router();

const adminController=require('../controllers/adminController')
const { requireAuth }=require('../middleware/auth')

router.get('/admin', requireAuth, adminController.adminHome)

router.get('/registerForm', adminController.registerU)
router.get('/loginForm',adminController.loginPage)
router.post('/register',adminController.addUser)
router.post('/login',adminController.login)
router.post('/logout', requireAuth, adminController.logout)

router.get('/users', requireAuth, adminController.userList)
router.get('/users/new', requireAuth, adminController.newUserForm)
router.post('/users', requireAuth, adminController.createUser)
router.get('/users/:id/edit', requireAuth, adminController.editUserForm)
router.post('/users/:id', requireAuth, adminController.updateUser)
router.post('/users/:id/delete', requireAuth, adminController.deleteUser)

module.exports=router
