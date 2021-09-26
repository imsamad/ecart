const mongoose = require('mongoose');

const reqString = {
  type: String,
  required: true,
};

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    cart: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Cart' },

    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },

    deliveredAt: { type: Date },

    isDelivered: { type: Boolean, required: true, default: false },

    paymentMethod: { type: Boolean, required: true, default: false },

    isPaid: { type: Boolean, required: true, default: false },

    paidAt: { type: Date },

    paymentResult: {
      payerID: { type: String },
      paymentID: { type: String },
      paymentToken: { type: String },
      email: { type: String },
      returnUrl: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
