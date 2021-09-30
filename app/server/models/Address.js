const mongoose = require('mongoose');
const country_List = require('../_data/countryList');
const reqString = {
  type: String,
  required: true,
};
const addressSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    type: {
      type: String,
      enum: ['Home', 'Office'],
      default: 'Home',
    },
    fullName: reqString,
    mobileNo: reqString,
    pinCode: reqString,
    city: reqString,
    landmark: reqString,
    state: reqString,
    country: {
      type: String,
      enum: country_List,
      default: 'India',
    },
    // Flat, House no., Building, Company, Apartment
    // local: String,
    //Area, Street, Sector, Village
    // area: String,
    // address: reqString,
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

module.exports = mongoose.model('Address', addressSchema);
