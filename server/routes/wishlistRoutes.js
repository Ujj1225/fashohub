const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware.js");

const {
  addtoWishlist,
  getWishlist,
  getWishlistItemById,
  removefromWishlist,
} = require("../controllers/wishlistControllers.js");

router.post("/wishlist/:productId", protect, addtoWishlist);
router.get("/wishlist/mine", protect, getWishlist);
router.delete("/wishlist/:wid", protect, removefromWishlist);
router.get("/wishlist/mine/:pid", protect, getWishlistItemById);

module.exports = router;
