const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const upload = require('../utils/upload-multer');

const router = express.Router();

router
.route('/forgotPassword')
.post(authController.forgotPassword);


router
.route('/resetPassword/:token')
.patch(authController.resetPassword);

router
.route('/updatePassword')
.patch(authController.protect, authController.upDatePassword);

router
.route('/me')
.get(authController.protect, userController.getMe, userController.getUser);

router
.route('/logout')
.get(authController.logout);

router
.route('/:id')
.get(userController.getUser)

router
.route('/updateMe')
.patch(authController.protect,upload.single('photo'), userController.upDateMe);

router
.route('/deleteMe')
.delete(authController.protect, userController.deleteMe);

router
.route('/signup')
.post(authController.signup);

router
.route('/login')
.post(authController.login);



router
.route('/')
.get(userController.getAllUsers)
.post(userController.createUser)

router
.route('/deletePhoto')
.patch(authController.protect, userController.deletePhoto);

router
.route('/:id')
.patch(userController.updateUser)
.delete(
    authController.protect,
    authController.restrictTo('lead--guide', 'admin'),
    userController.deleteUser
);

module.exports = router;