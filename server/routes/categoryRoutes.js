const express = require("express");
const {
  getPrimaryCategories,
  createPrimaryCategory,
  deletePrimaryCategory,
  getSecondaryCategory,
  createSecondaryCategory,
  deleteSecondaryCategory,
  getTertiaryCategories,
  createTertiaryCategory,
  deleteTertiaryCategory,
} = require("../controllers/categoryController.js");
const { admin, protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router
  .route("/primary")
  .get(getPrimaryCategories)
  .post(protect, admin, createPrimaryCategory);

router.route("/primary/:pid").delete(protect, admin, deletePrimaryCategory);

router
  .route("/secondary/:pid")
  .get(getSecondaryCategory)
  .post(protect, admin, createSecondaryCategory);

router.route("/secondary/:sid").delete(protect, admin, deleteSecondaryCategory);

router
  .route("/tertiary/:pid/:sid")
  .get(getTertiaryCategories)
  .post(protect, admin, createTertiaryCategory);

router.route("/tertiary/:tid").delete(protect, admin, deleteTertiaryCategory);

module.exports = router;
