const asyncHandler = require("../middleware/asyncHandler.js");
const Bag = require("../models/bagModel.js");
const User = require("../models/userModel.js");
const Product = require("../models/productModel.js");
const Order = require("../models/orderModel.js");

const getStatsForAdmin = asyncHandler(async (req, res) => {
  // for users
  const usersCount = await User.countDocuments({});
  const vendorsCount = await User.countDocuments({ isVendor: true });
  const deliveryPartnersCount = await User.countDocuments({
    isDeliveryPartner: true,
  });
  // for orders
  const ordersCount = await Order.countDocuments({});
  const paidOrdersCount = await Order.countDocuments({ isPaid: true });
  const deliveredOrdersCount = await Order.countDocuments({
    isDelivered: true,
  });
  // for products
  const productsCount = await Product.countDocuments({});
  // for bag
  const bagsCount = await Bag.countDocuments({});

  res.status(200).json({
    usersCount,
    vendorsCount,
    deliveryPartnersCount,
    ordersCount,
    paidOrdersCount,
    deliveredOrdersCount,
    productsCount,
    bagsCount,
  });
});

module.exports = { getStatsForAdmin };
