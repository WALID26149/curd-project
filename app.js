const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

// import modules postProducts
const userProductRouter = require('./router/userProduct.js');

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());


app.use('/', userProductRouter);

const port = process.env.PORT || 5555;
app.listen(port, () => {
  console.log("server is running");
})
