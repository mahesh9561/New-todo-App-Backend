const express = require('express');
const router = express.Router();
const AuthController = require('../controller/authController');
const authorizeRole = require('../middleware/Auth');
const AdminController = require('../controller/adminController')
const userController = require('../controller/userController');

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);


router.get('/adminUsers', AdminController.getAllUsers);
router.delete('/adminUsers/:id', AdminController.deleteUser);

router.get('/usersProfile/:id', userController.getUserProfile);
router.put('/updateUser/:id', userController.updateUserProfile);
module.exports = router;