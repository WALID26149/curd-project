const mongoose = require("mongoose");
const { unique } = require("rjs");

// Data Base section
const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful!'));


// mongodb schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A product must have a title'],
        maxlength: [40, 'A product name must have less or equal then 40 characters'],
        minlength: [5, 'A product name must have more or equal then 5 characters']
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'A product must have a price']
    },
    discountPercentage: Number,
    rating: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
    },
    stock: Number,
    brand: String,
    category: String,
    thumbnail: {
        type: String,
        required: [true, 'A product must have a cover image']
    },
    images: [String]
});
// productSchema.plugin(uniqueValidator)

// the mongoose modal
const Product = mongoose.model('Product', productSchema);

module.exports = Product;