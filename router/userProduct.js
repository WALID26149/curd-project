const express = require('express');
const getProductData = require('./../component/getData.js');

const router = express.Router();

// router.param('id', getShopingData.checkID);

router
  .route('/')
   .get(getProductData.getAllProducts)
   .post(getProductData.postProduct)

router
  .route('/:id')
   .get(getProductData.getProduct)
   .patch(getProductData.updateProduct)
   .delete(getProductData.deleteProduct)

module.exports = router;


