const express = require("express");

const {
  createProduct,
  createProductReview,
  deleteProduct,
  getPrimaryCategoryProduct,
  getProductById,
  getProductByVendor,
  getProducts,
  getSecondaryCategoryProduct,
  getTertiaryCategoryProduct,
  updateProduct,
  deleteReview,
  deleteProductByAdmin,
} = require("../controllers/productController.js");

const checkObjectId = require("../middleware/checkObjectId.js");
const {
  admin,
  protect,
  vendorOrAdmin,
} = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/", getProducts); //router.route("/").get(getProducts);
router.get("/:id", checkObjectId, getProductById);
router.get("/primary/:primary", getPrimaryCategoryProduct);
router.get("/secondary/:primary/:secondary", getSecondaryCategoryProduct);
router.get(
  "/tertiary/:primary/:secondary/:tertiary",
  getTertiaryCategoryProduct
);
router.post("/:id/reviews", protect, createProductReview);
router.delete("/:id/reviews", protect, deleteReview);
// rem: creating, editing and deleting product reviews

// vendor or admin
router.post("/create", protect, vendorOrAdmin, createProduct);
router.put("/:id", protect, vendorOrAdmin, checkObjectId, updateProduct);
router.delete("/:id", protect, vendorOrAdmin, checkObjectId, deleteProduct);
router.get("/mine/:vid", protect, vendorOrAdmin, getProductByVendor);

// admin
router.delete("/admin/:pid", protect, admin, deleteProductByAdmin);

module.exports = router;
