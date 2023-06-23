const mongoose = require("mongoose");
const slugify = require('slugify');

// mongodb schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A product must have a title'],
        maxlength: [40, 'A product name must have less or equal then 40 characters'],
        minlength: [5, 'A product name must have more or equal then 5 characters']
    },
    slug: {
      type: String,
      required: [true, 'A product must have a slug']
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
        max: [5, 'Rating must be below 5.0'],
        set: val => Math.round(val * 10) / 10
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    stock: Number,
    brand: String,
    category: String,
    thumbnail: {
        type: String,
        required: [true, 'A product must have a cover image']
    },
    images: [String],
    admins: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'User'
        }
      ]
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);
// productSchema.plugin(uniqueValidator)

productSchema.index({ price: 1, rating: -1 });
productSchema.index({ slug: 1 });
// tourSchema.index({ startLocation: '2dsphere' });

productSchema.virtual('durationWeeks').get(function() {
    return this.duration / 7;
});
  
  // Virtual populate
productSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id'
});
  
  // DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre('save', function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

// the mongoose modal
const Product = mongoose.model('Product', productSchema);

module.exports = Product;