const Product = require('../models/ProductsDB.js');
const factory = require('./handlerFactory.js')



// get all product
exports.getAllProducts = factory.getAll(Product)
// get product
exports.getProduct = factory.getOne(Product, {path: 'reviews'})
// create product
exports.postProduct = factory.createOne(Product)
// patch product
exports.updateProduct = factory.updateOne(Product)
// delete product
exports.deleteProduct = factory.deleteOne(Product)

// get product
// exports.getProduct = async(req, res) => {
//   try {
//     const product = await Product.findById(req.params.id).populate('reviews').exec();
//     res.render('shopingPage',
//      {
//       productTitle: product.title,
//       description: product.description,
//       price: product.price,
//       rating: product.rating,
//       thumbnail: product.thumbnail,
//       discountPercentage: product.discountPercentage
//     })
//     // res.status(200).json({
//     //   status: 'success',
//     //   message: product
//     // });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err
//     });
//   }
// };

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



