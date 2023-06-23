const Product = require('../models/ProductsDB.js');
const catchAsync = require('../utils/catchAsync.js');

// get search
exports.getSearch = catchAsync(async(req, res) => {
      let data = await Product.find(
        {
        "$or": [
          {title:{$regex:req.params.key}}
        ]
      });
      res.render('product', {products: data})
  });

  
  // post search
  exports.postSearch = catchAsync(async(req, res) => {
      let payload = req.body.payload.trim();
      let search = await Product.find({title: {$regex: new RegExp('^'+payload+'.*', 'i')}}).exec();
      //Limit Search Results to 10
      search = search.slice (0, 10);
      res.send({payload: search});
  });