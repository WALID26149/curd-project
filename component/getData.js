const https = require('https');
const express = require('express');
const bodyParser = require('body-parser')
const ejs = require('ejs');
const Product = require('../models/ProductsDB.js');


const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");



// get all product
exports.getAllProducts = async(req, res) => {
  // res.status(200).json({
  //   status: 'success',
  //   requestedAt: req.requestTime,
  //   results: products.length,
  //   data: {
  //     products
  //   }
  //  });
  try {
    const docs = await Product.find({})
    res.render('homePage', {products: docs})
  } catch (err) {
    console.error(err);
  } 
};

// get product
exports.getProduct = async(req, res) => {
  try {
    const product = await Product.findById(req.params.id).exec();

    res.status(200).json({
      status: 'success',
      data: {
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

// post product
exports.postProduct = async(req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        product: newProduct
      }
    });
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
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
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
