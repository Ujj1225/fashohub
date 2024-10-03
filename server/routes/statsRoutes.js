const express = require("express");
const { admin, protect } = require("../middleware/authMiddleware.js");
const { getStatsForAdmin } = require("../controllers/statsController.js");

const router = express.Router();

router.get("/admin", protect, admin, getStatsForAdmin);

module.exports = router;
