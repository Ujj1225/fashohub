const asyncHandler = require("../middleware/asyncHandler.js");
const Product = require("../models/productModel.js");
const Wishlist = require("../models/wishlistModel.js");
const Bag = require("../models/bagModel.js");

// GET - api/products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}); //gets all the products
  res.send(products);
});

// GET - api/products/:id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// POST - api/products/create
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    brand,
    seller,
    primaryCategory,
    secondaryCategory,
    tertiaryCategory,
    description,
    sizes,
    sellingPrice,
    actualPrice,
    off,
  } = req.body;

  const product = new Product({
    user: req.user._id,
    name,
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    brand,
    seller,
    primaryCategory: primaryCategory.replace(/\s+/g, "-").toLowerCase(),
    secondaryCategory: secondaryCategory.replace(/\s+/g, "-").toLowerCase(),
    tertiaryCategory: tertiaryCategory.replace(/\s+/g, "-").toLowerCase(),
    description,
    sizes,
    sellingPrice,
    actualPrice,
    off,
  });
  // if (image.length > 6) {
  //   res.status(400);
  //   throw new Error("Maximum 6 images allowed");
  // }
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// PUT: api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    brand,
    seller,
    primaryCategory,
    secondaryCategory,
    tertiaryCategory,
    description,
    sizes,
    sellingPrice,
    actualPrice,
    off,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    if (!product.user.equals(req.user._id)) {
      res.status(400);
      throw new Error("Product doesnot belong to you!");
    }
    product.name = name;
    product.image1 = image1;
    product.image2 = image2;
    product.image3 = image3;
    product.image4 = image4;
    product.image5 = image5;
    product.image6 = image6;
    product.brand = brand;
    product.seller = seller;
    product.primaryCategory = primaryCategory
      .replace(/\s+/g, "-")
      .toLowerCase();
    product.secondaryCategory = secondaryCategory
      .replace(/\s+/g, "-")
      .toLowerCase();
    product.tertiaryCategory = tertiaryCategory
      .replace(/\s+/g, "-")
      .toLowerCase();
    product.description = description;
    product.sizes = sizes;
    product.sellingPrice = sellingPrice;
    product.actualPrice = actualPrice;
    product.off = off;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// DELETE: api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    if (!product.user.equals(req.user._id)) {
      res.status(400);
      throw new Error("Product doesnot belong to you!");
    }
    await Product.deleteOne({ _id: product._id });

    // while deleting product, it shall delete it from everywhere i.e bag and wishlist
    await Wishlist.deleteMany({ product: product._id }); // deleting from Wishlist
    await Bag.updateMany({}, { $pull: { products: { product: product._id } } }); // deleting from Bag

    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// DELETE: /api/products/admin/:pid
const deleteProductByAdmin = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findOne({ _id: pid });
  // console.log(product)
  if (product) {
    await Product.deleteOne({ _id: pid });
    await Wishlist.deleteMany({ product: pid });
    await Bag.updateMany({}, { $pull: { products: { product: pid } } });
    res.json({ message: "Product deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// GET: /api/products/:primary
const getPrimaryCategoryProduct = asyncHandler(async (req, res) => {
  const { primary } = req.params;
  const { sort, discounts, priceRanges } = req.query;

  let sortCriteria;
  switch (sort) {
    case "new":
      sortCriteria = { createdAt: -1 };
      break;
    case "discount":
      sortCriteria = { off: -1 };
      break;
    case "rating":
      sortCriteria = { rating: -1 };
      break;
    case "pl2h":
      sortCriteria = { sellingPrice: 1 };
      break;
    case "ph2l":
      sortCriteria = { sellingPrice: -1 };
      break;
    default:
      sortCriteria = {};
  }

  let discountCriteria = {};
  if (discounts) {
    const discountArray = discounts.split(",").map(Number);
    if (discountArray.length > 0) {
      discountCriteria = {
        off: { $gte: Math.min(...discountArray) },
      };
    }
  }

  let priceCriteria = {};
  if (priceRanges) {
    const priceArray = priceRanges.split(",");
    priceCriteria = {
      $or: priceArray.map((range) => {
        if (range.startsWith("<")) {
          return { sellingPrice: { $lt: parseInt(range.substring(1)) } };
        } else if (range.startsWith(">")) {
          return { sellingPrice: { $gt: parseInt(range.substring(1)) } };
        } else {
          const [min, max] = range.split("-").map(Number);
          return { sellingPrice: { $gte: min, $lte: max } };
        }
      }),
    };
  }

  const products = await Product.find({
    primaryCategory: primary,
    ...discountCriteria,
    ...priceCriteria,
  }).sort(sortCriteria);
  res.send(products);
});

// GET: /api/products/:primary/:secondary
const getSecondaryCategoryProduct = asyncHandler(async (req, res) => {
  const { primary, secondary } = req.params;
  const { sort, discounts, priceRanges } = req.query;

  let sortCriteria;
  switch (sort) {
    case "new":
      sortCriteria = { createdAt: -1 };
      break;
    case "discount":
      sortCriteria = { off: -1 };
      break;
    case "rating":
      sortCriteria = { rating: -1 };
      break;
    case "pl2h":
      sortCriteria = { sellingPrice: 1 };
      break;
    case "ph2l":
      sortCriteria = { sellingPrice: -1 };
      break;
    default:
      sortCriteria = {};
  }

  let discountCriteria = {};
  if (discounts) {
    const discountArray = discounts.split(",").map(Number);
    discountCriteria = {
      off: { $gte: Math.min(...discountArray) },
    };
  }
  let priceCriteria = {};
  if (priceRanges) {
    const priceArray = priceRanges.split(",");
    priceCriteria = {
      $or: priceArray.map((range) => {
        if (range.startsWith("<")) {
          return { sellingPrice: { $lt: parseInt(range.substring(1)) } };
        } else if (range.startsWith(">")) {
          return { sellingPrice: { $gt: parseInt(range.substring(1)) } };
        } else {
          const [min, max] = range.split("-").map(Number);
          return { sellingPrice: { $gte: min, $lte: max } };
        }
      }),
    };
  }

  const products = await Product.find({
    primaryCategory: primary,
    secondaryCategory: secondary,
    ...discountCriteria,
    ...priceCriteria,
  }).sort(sortCriteria);
  res.send(products);
});

// GET: /api/products/:primary/:secondary/:tertiary
const getTertiaryCategoryProduct = asyncHandler(async (req, res) => {
  const { primary, secondary, tertiary } = req.params;
  const { sort, discounts, priceRanges } = req.query;

  let sortCriteria;
  switch (sort) {
    case "new":
      sortCriteria = { createdAt: -1 };
      break;
    case "discount":
      sortCriteria = { off: -1 };
      break;
    case "rating":
      sortCriteria = { rating: -1 };
      break;
    case "pl2h":
      sortCriteria = { sellingPrice: 1 };
      break;
    case "ph2l":
      sortCriteria = { sellingPrice: -1 };
      break;
    default:
      sortCriteria = {};
  }

  let discountCriteria = {};
  if (discounts) {
    const discountArray = discounts.split(",").map(Number);
    discountCriteria = {
      off: { $gte: Math.min(...discountArray) },
    };
  }
  let priceCriteria = {};
  if (priceRanges) {
    const priceArray = priceRanges.split(",");
    priceCriteria = {
      $or: priceArray.map((range) => {
        if (range.startsWith("<")) {
          return { sellingPrice: { $lt: parseInt(range.substring(1)) } };
        } else if (range.startsWith(">")) {
          return { sellingPrice: { $gt: parseInt(range.substring(1)) } };
        } else {
          const [min, max] = range.split("-").map(Number);
          return { sellingPrice: { $gte: min, $lte: max } };
        }
      }),
    };
  }

  const products = await Product.find({
    primaryCategory: primary,
    secondaryCategory: secondary,
    tertiaryCategory: tertiary,
    ...discountCriteria,
    ...priceCriteria,
  }).sort(sortCriteria);
  res.send(products);
});

// GET: /api/products/mine/:vid
const getProductByVendor = asyncHandler(async (req, res) => {
  const { vid } = req.params;
  const product = await Product.find({ user: vid });

  if (product) {
    res.status(200);
    res.send(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// POST: api/products/:id/reviews, private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  // product schema have rating and comment
  const product = await Product.findById(req.params.id);

  if (product) {
    // check is the product is already reviewed by the user
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    // create a review
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    // product contains array of reviews
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    // averaging to get product rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// DELETE: /api/products/:id/reviews
const deleteReview = (req, res) => {};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getPrimaryCategoryProduct,
  getSecondaryCategoryProduct,
  getTertiaryCategoryProduct,
  getProductByVendor,
  createProductReview,
  deleteReview,
  deleteProductByAdmin,
};
