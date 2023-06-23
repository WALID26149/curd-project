const express = require('express');
const getProductData = require('../controller/productData.js');
const authUsersData = require('../controller/authUsers.js');
const reviewRouter = require('./../router/reviewRout.js');
// const reviewController = require('./../controllers/reviewController.js');

const router = express.Router();

// router.param('id', getShopingData.checkID);

router.use('/:productId/reviews', reviewRouter);

router
  .route('/')
   .get(getProductData.getAllProducts)
   .post(authUsersData.protect ,authUsersData.restrictTo('admin'), getProductData.postProduct)

router
  .route('/:id')
   .get(getProductData.getProduct)
   .patch(getProductData.updateProduct)
   .delete(
    authUsersData.protect,
    authUsersData.restrictTo('admin'),
    getProductData.deleteProduct
  );



module.exports = router;
