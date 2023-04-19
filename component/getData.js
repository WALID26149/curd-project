const https = require('https');
const express = require('express');
const bodyParser = require('body-parser')
const ejs = require('ejs');
const { json } = require('body-parser');
const Product = require('../models/ProductsDB.js');


const app = express();
app.set("view engine", "ejs");

exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > products.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};

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
exports.getProduct = (req, res) => {
  const id = req.params.id * 1;

  const product = products.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      product
    }
  });
};

// post product
exports.postProduct = (req, res) => {
  const newId = products[products.length - 1].id + 1;
  const newProduct = Object.assign({ id: newId }, req.body);

  products.push(newProduct);

  fs.writeFile(
    `${__dirname}/../dataBase/productData.json`,
    JSON.stringify(products),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          product: newProduct
        }
      });
    }
  );
  // const url ="https://dummyjson.com/products";

  //   https.get(url, function(response) {
  //     response.on("data", function(data) {
  //       const productData = JSON.parse(data)
  //       const title = productData.products[0].title;
  //       res.render('homePage', {product: `${title}`});
  //     });
  //   });
};

// patch product
exports.patchProduct = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};

// delete product
exports.deleteProduct = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};
