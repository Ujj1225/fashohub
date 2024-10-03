const mongoose = require("mongoose");
const bagModel = require("./bagModel.js");
const deliveryModel = require("./deliveryModel.js");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bag: {
      type: bagModel.schema,
      required: true,
    },
    delivery: {
      type: deliveryModel.schema,
      required: true,
    },
    paidAt: {
      type: Date,
    },
    isPaid: {
      type: Boolean,
      // required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      // required: true,
      default: false,
    },
    paymentMethod: {
      type: String,
      required: true,
      // default: "COD",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
