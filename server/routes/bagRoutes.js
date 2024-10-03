const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware.js");
const {
  addtoBag,
  removefromBag,
  updateBag,
  getBag,
  emptyBag,
} = require("../controllers/bagControllers.js");

router.post("/:pid", protect, addtoBag);
router.delete("/remove/all", protect, emptyBag);
router.delete("/:pid", protect, removefromBag);
router.put("/update", protect, updateBag);
router.get("/mine", protect, getBag);

module.exports = router;
