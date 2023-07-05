const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const cookieParser = require('cookie-parser')

// import modules
const AppError = require('./utils/appError.js');
const globalErrorHandler = require('./controller/errorController.js');
const userProductRouter = require('./router/productRout.js');
const userRouter = require('./router/userRout.js');
const reviewRouter = require('./router/reviewRout.js');
const searchRouter = require('./router/searchRout.js');
const viewRouter = require('./router/viewRout.js');

const app = express();

// 1) GLOBAL MIDDLEWARES
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));

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
);

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

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

// Content-Security-Policy MIDDLEWARES
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "script-src 'self' https://cdnjs.cloudflare.com");
  next();
});


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
app.use('/', viewRouter);
app.use('/api/v1/products', userProductRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/', searchRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


app.use(globalErrorHandler);

const port = process.env.PORT || 5555;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
