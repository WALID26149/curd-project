const express = require('express');
const getProductData = require('../controllers/productData.js');
const authUsersData = require('../controllers/authUsers.js');
const reviewRouter = require('./../router/reviewRout.js');
// const reviewController = require('./../controllers/reviewController.js');

const router = express.Router();

// router.param('id', getShopingData.checkID);

router.use('/:productId/reviews', reviewRouter);

router
  .route('/')
   .get(getProductData.getAllProducts)
   .post(getProductData.postProduct)
  //  authUsersData.protect ,

router
  .route('/search')
   .post(getProductData.postSearch)

router
  .route('/search/:key')
   .get(getProductData.getSearch)

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
