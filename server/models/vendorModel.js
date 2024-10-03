const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  location: {
    type: String,
    required: true,
    maxlength: 50,
  },
  contact: {
    type: String,
    required: true,
    maxlength: 40,
  },
  description: {
    type: String,
    required: true,
    maxlength: 200,
  },
});
const vendorRequestSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 30,
  },
  phone: {
    type: String,
    required: true,
    maxlength: 10,
  },
  email: {
    type: String,
    required: true,
    maxlength: 40,
  },
  citizenshipFront: {
    type: String,
    required: true,
  },
  citizenshipBack: {
    type: String,
    required: true,
  },
  panCard: {
    type: String,
    required: true,
  },
  companyRegistration: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

const Vendor = mongoose.model("Vendor", vendorSchema);
const VendorRequest = mongoose.model("VendorRequest", vendorRequestSchema);

module.exports = { Vendor, VendorRequest };
