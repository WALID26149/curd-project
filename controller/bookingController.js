const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../models/ProductsDB.js');
const factory = require('../controller/handlerFactory.js');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { checkout } = require('../router/viewRout.js');

exports.getCheckoutSession = catchAsync(async(req, res, next) => {
    // 1) get current  bookded product
    const product = await Product.findById(req.params.productId)

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment', 
        success_url: `${req.protocol}://${req.get('host')}/`,
        cancel_url: `${req.protocol}://${req.get('host')}/product/${product.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.productId,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${product.name} Product`,
                description: product.description,
                images: [`${product.thumbnail}`],
              },
              unit_amount: product.price * 100,
            },
            quantity: 1,
          },
        ],
      });
      
      
    
      // 3) Create session as response
      res.status(200).json({
        status: 'success',
        session
      });
})