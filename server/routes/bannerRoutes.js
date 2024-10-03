const express = require("express");
const router = express.Router();
const { addBanner, getBanners } = require("../controllers/bannerController.js");
const { admin, protect } = require("../middleware/authMiddleware.js");

router.get("/", getBanners);
router.post("/", protect, admin, addBanner);

module.exports = router;
