const express = require('express');
const bookingController = require('../controller/bookingController');
const authUsersData = require('../controller/authUsers.js');

const router = express.Router();

router.get(
    '/checkout-session/:productId',
    authUsersData.protect,
    bookingController.getCheckoutSession
)

module.exports = router;
