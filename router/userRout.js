const express = require('express');
const authUsersData = require('../controller/authUsers.js');
const usersData = require('../controller/usersData.js');
const router = express.Router();

router.post('/signup', authUsersData.signup);
router.post('/login', authUsersData.login);
router.get('/logout', authUsersData.logout);

router.post('/forgotPassword', authUsersData.forgotPassword);
router.patch('/resetPassword/:token', authUsersData.resetPassword);

// Protect all routes after this middleware
router.use(authUsersData.protect)

router.patch('/updateMyPassword', authUsersData.updatePassword);

router.get('/me', usersData.getMe, usersData.getUser);
router.patch('/updateMe', usersData.updateMe);
router.delete('/deleteMe', usersData.deleteMe);

router.use(authUsersData.restrictTo('admin'))

router
  .route('/')
  .get(usersData.getAllUsers)
  .post(usersData.createUser);

router
  .route('/:id')
  .get(usersData.getUser)
  .patch(usersData.updateUser)
  .delete(usersData.deleteUser);

module.exports = router;