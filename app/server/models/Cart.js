const mongoose = require('mongoose');

const productItem = mongoose.Schema({
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  product: { type: mongoose.Types.ObjectId, required: true, ref: 'Product' },
});

const cartSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },

    productItems: [productItem],

    taxPrice: { type: Number, required: true, default: 0.0 },

    shippingPrice: { type: Number, required: true, default: 0.0 },

    itemsPrice: { type: Number, required: true, default: 0.0 },

    totalPrice: { type: Number, required: true, default: 0.0 },

    // Additional Field for making Cart => Order
    isOrder: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const toInt = (val) => parseInt(val, 10);
cartSchema.pre('save', function (next) {
  this.taxPrice = 0;
  this.shippingPrice = 0;

  const firstItemPrice =
    toInt(this.productItems[0].qty) * toInt(this.productItems[0].price);

  this.itemsPrice = this.productItems
    .slice(1)
    .reduce((acc, item) => acc + toInt(item.qty * item.price), firstItemPrice);
  this.totalPrice = this.itemsPrice + this.shippingPrice + this.taxPrice;
  next();
});
// cartSchema.path('productItems').schema.virtual('product', {
//   ref: 'Product',
//   localField: 'product',
//   foreignField: '_id',
//   justOne: false,
// });
module.exports = mongoose.model('Cart', cartSchema);
