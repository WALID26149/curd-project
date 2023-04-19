const express = require('express');
const getProductData = require('./../component/getData.js');

const router = express.Router();

router.param('id', getProductData.checkID);

router
  .route('/')
   .get(getProductData.getAllProducts)
   .post(getProductData.checkBody, getProductData.postProduct);

router
  .route('/:id')
   .get(getProductData.getProduct)
   .patch(getProductData.patchProduct)
   .delete(getProductData.deleteProduct)

module.exports = router;


