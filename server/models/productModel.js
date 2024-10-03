const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
      maxlength: 200,
    },
  },
  {
    timestamps: true,
  }
);
const sizeSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      maxlength: 4,
    },
    quantity: {
      type: Number,
      default: 0,
      maxlength: 4,
    },
  },
  {
    _id: false,
  }
);

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    image1: {
      type: String,
      required: true,
    },
    image2: String,
    image3: String,
    image4: String,
    image5: String,
    image6: String,
    brand: {
      type: String,
      required: true,
      maxlength: 30,
    },
    seller: {
      type: String,
      required: true,
      maxlength: 50,
    },
    primaryCategory: {
      type: String,
      required: true,
    },
    secondaryCategory: {
      type: String,
      required: true,
    },
    tertiaryCategory: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    sizes: [sizeSchema],
    reviews: [reviewSchema], //review will be another schema
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    sellingPrice: {
      type: Number,
      required: true,
      default: 0,
      maxlength: 6,
    },
    actualPrice: {
      type: Number,
      default: 0,
      maxlength: 6,
    },
    off: {
      type: Number,
      default: 0,
      maxlength: 2,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Product", productSchema);
