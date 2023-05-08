const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

// import modules
const AppError = require('./utils/appError.js');
const globalErrorHandler = require('./component/errorController.js');
const userProductRouter = require('./router/userProduct.js');

const app = express();
// MIDDLEWARES
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());

// ROUTES
app.use('/', userProductRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const port = process.env.PORT || 5555;
app.listen(port, () => {
  console.log("server is running");
})
