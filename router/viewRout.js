const express = require('express');
const viewsController = require('../controller/viewsController.js');
const authController = require('../controller/authUsers.js');

const router = express.Router();

router.get('/',  viewsController.getOverview);
router.get('/product/:slug',  viewsController.getProduct);
router.get('/login',  viewsController.getLoginForm);
// router.get('/me', authController.protect, viewsController.getAccount);

// router.post(
//   '/submit-user-data',
//   authController.protect,
//   viewsController.updateUserData
// );

module.exports = router;