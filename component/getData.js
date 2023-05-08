const express = require('express');
const bodyParser = require('body-parser')
const Product = require('../models/ProductsDB.js');
const APIFeatures = require('./../utils/apiFeatures.js');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));



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
    const product = await Product.findById(req.params.id).exec();
    res.render('shopingPage',
     {
      productTitle: product.title,
      description: product.description,
      price: product.price,
      rating: product.rating,
      thumbnail: product.thumbnail,
      discountPercentage: product.discountPercentage
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};


// post product
exports.postProduct = async(req, res) => {
  try {
    const newProduct = await new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      discountPercentage: req.body.discountPercentage,
      rating: req.body.rating,
      stock: req.body.stock,
      brand: req.body.brand,
      category: req.body.category,
      thumbnail: req.body.thumbnail
    });
    newProduct.save()
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      console.error(`Error saving user: ${error}`);
      res.redirect('/');
    });
    
    // search input
    let payload = req.body.payload.trim();
    let search = await Product.find({title: { $regex: new RegExp('^'+payload+'.*','i')}}).exec();
    // limit search resulte to 10
    search = search.slice(0, 10);
    res.end({payload: search});

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

// patch product
exports.updateProduct = async(req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    res.status(200).json({
      status: 'success',
      deta: {
        product
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

// delete product
exports.deleteProduct = async(req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
