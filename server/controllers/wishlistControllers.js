const asyncHandler = require("../middleware/asyncHandler.js");
const Wishlist = require("../models/wishlistModel.js");

// POST method - /api/users/wishlist/:productId
const addtoWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;
  const productExists = await Wishlist.findOne({
    user: userId,
    product: productId,
  });
  if (productExists) {
    return res.status(400).json({ message: "Product is already in wishlist" });
  }
  const wishlistItem = new Wishlist({ user: userId, product: productId });
  await wishlistItem.save();
  res.status(200).json({ message: "Product added to wishlist" });
});

// GET method - /api/users/wishlist/mine
const getWishlist = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const wishlist = await Wishlist.find({ user: userId }).populate({
    path: "product",
    select: "image1 name brand actualPrice sellingPrice off",
  });
  if (wishlist.length === 0) {
    throw new Error("No wishlist item available");
  }
  res.json(wishlist);
});

// DELETE method - /api/users/wishlist/:wid
const removefromWishlist = asyncHandler(async (req, res) => {
  const { wid } = req.params;
  const userId = req.user._id;
  const wishlistItem = await Wishlist.findOne({
    _id: wid,
    user: userId,
  });

  if (!wishlistItem) {
    throw new Error("No item available");
  }
  await Wishlist.deleteOne({ _id: wishlistItem._id });
  res.json({ message: "Product removed from wishlist" });
});

//GET -/api/users/wishlist/mine/:pid
const getWishlistItemById = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const userId = req.user._id;
  const wishlist = await Wishlist.find({ user: userId, product: pid });
  if (wishlist) {
    res.send(wishlist);
  } else {
    throw new Error("Wishlist item not found");
  }
});

module.exports = {
  addtoWishlist,
  getWishlist,
  removefromWishlist,
  getWishlistItemById,
};
