const express = require('express');
const authUsersData = require('../controllers/authUsers.js');
const usersData = require('../controllers/usersData.js');
const router = express.Router();

router.post('/signup', authUsersData.signup);
router.post('/login', authUsersData.login);

router.post('/forgotPassword', authUsersData.forgotPassword);
router.patch('/resetPassword/:token', authUsersData.resetPassword);

router.patch('/updateMyPassword', authUsersData.protect, authUsersData.updatePassword);

router.patch('/updateMe', authUsersData.protect, usersData.updateMe);
router.delete('/deleteMe', authUsersData.protect, usersData.deleteMe);

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