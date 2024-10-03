const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  province: {
    type: String,
    required: true,
    maxlength: 20,
  },
  district: {
    type: String,
    required: true,
    maxlength: 20,
  },
  area: {
    type: String,
    required: true,
    maxlength: 40,
  },
  landmark: {
    type: String,
    maxlength: 40,
  },
  description: {
    type: String,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    maxlength: 40,
  },
});

module.exports = mongoose.model("Delivery", deliverySchema);
