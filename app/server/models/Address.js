const mongoose = require('mongoose');
const country_List = require('../_data/countryList');
const reqString = {
  type: String,
  required: true,
};
const addressSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    body: [
      {
        type: {
          type: String,
          enum: ['Home', 'Office', 'Temporary'],
          default: 'Home',
        },
        order: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Cart',
        },
        address: reqString,
        city: reqString,
        postalCode: reqString,
        state: reqString,
        country: {
          type: String,
          enum: country_List,
          default: 'India',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Address', addressSchema);
