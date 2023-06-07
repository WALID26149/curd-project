const Product = require('../models/ProductsDB.js');
const APIFeatures = require('../utils/apiFeatures.js');
const factory = require('./../controllers/handlerFactory.js')

// get all product
exports.getAllProducts = async(req, res) => {
  try {
    const features = new APIFeatures(Product.find({}), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
    const docs = await features.query;

    // const docs = await Product.find({})
    res.render('homePage', {products: docs})
  } catch (err) {
    console.error(err);
  } 
};

// get product
exports.getProduct = async(req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews').exec();
    res.render('shopingPage',
     {
      productTitle: product.title,
      description: product.description,
      price: product.price,
      rating: product.rating,
      thumbnail: product.thumbnail,
      discountPercentage: product.discountPercentage
    })
    // res.status(200).json({
    //   status: 'success',
    //   message: product
    // });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

// post product
// exports.postProduct = async(req, res) => {
//   try {
//     const newProduct = await new Product({
//       title: req.body.title,
//       description: req.body.description,
//       price: req.body.price,
//       discountPercentage: req.body.discountPercentage,
//       rating: req.body.rating,
//       stock: req.body.stock,
//       brand: req.body.brand,
//       category: req.body.category,
//       thumbnail: req.body.thumbnail
//     });
//     newProduct.save()
//     .then(() => {
//       res.redirect('/');
//     })
//     .catch(error => {
//       console.error(`Error saving user: ${error}`);
//       res.redirect('/');
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err
//     });
//   }
// };

// get search
exports.getSearch = async(req, res) => {
  try {
    let data = await Product.find(
      {
      "$or": [
        {title:{$regex:req.params.key}}
      ]
    });
    res.render('searchPage', {products: data})
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

// post search
exports.postSearch = async(req, res) => {
  try {
    let payload = req.body.payload.trim();
    let search = await Product.find({title: {$regex: new RegExp('^'+payload+'.*', 'i')}}).exec();
    //Limit Search Results to 10
    search = search.slice (0, 10);
    res.send({payload: search});
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

// create product
exports.postProduct = factory.createOne(Product)
// patch product
exports.updateProduct = factory.updateOne(Product)
// delete product
exports.deleteProduct = factory.deleteOne(Product)

