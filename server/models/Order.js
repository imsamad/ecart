const mongoose = require('mongoose');

const reqString = {
  type: String,
  required: true,
};
const orderItem = mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  qty: { type: Number, required: true, default: 1 },
});
const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    orderItems: [orderItem],

    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },

    taxPercentage: { type: Number, required: true, default: 7 },
    taxPrice: { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    subTotal: { type: Number, required: true },
    totalPrice: { type: Number, required: true },

    deliveredAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    // tracking: "123412341234"

    // gateway: "stripe",
    // type: "credit",
    paymentMethod: reqString,
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    paymentResult: {
      payerID: { type: String },
      paymentID: { type: String },
      paymentToken: { type: String },
      email: { type: String },
      returnUrl: { type: String },
    },
    // card: {
    //   brand: "Visa",
    //   pan: "4242424242424242",
    //   expirationMonth: 1,
    //   expirationYear: 2090,
    //   cvv: 123
    // }
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
