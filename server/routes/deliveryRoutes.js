const express = require("express");
const {
  getAddress,
  saveAddress,
  updateAddress,
} = require("../controllers/deliveryControllers.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/", protect, saveAddress);
router.get("/", protect, getAddress);
router.put("/", protect, updateAddress);

module.exports = router;
