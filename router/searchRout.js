const express = require('express');
const searchData = require('../controller/searchData.js');

const router = express.Router();

router
  .route('/')
   .post(searchData.postSearch)

router
  .route('/search/:key')
   .get(searchData.getSearch);


module.exports = router;