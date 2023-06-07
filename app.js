const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

// import modules
const AppError = require('./utils/appError.js');
const globalErrorHandler = require('./controllers/errorController.js');
const userProductRouter = require('./router/productRout.js');
const userRouter = require('./router/userRout.js');
const reviewRouter = require('./router/reviewRout.js');

const app = express();

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"]
    }
  })
)
// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'discountPercentage',
      'rating',
      'stock',
      'price'
    ]
  })
);

// MIDDLEWARES

// Serving static files
app.use(express.static(`${__dirname}/public`));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

// DataBase section
const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

// ROUTES
app.use('/api/v1/products', userProductRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


app.use(globalErrorHandler);

const port = process.env.PORT || 5555;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
