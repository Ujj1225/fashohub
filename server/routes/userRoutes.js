const express = require("express");
const router = express.Router();

const {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  getDeliveryPartners,
} = require("../controllers/userController.js");

const { admin, protect } = require("../middleware/authMiddleware.js");
const checkObjectId = require("../middleware/checkObjectId.js");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// admin
router.get("/", protect, admin, getUsers);
router.get("/deliveryPartners", protect, admin, getDeliveryPartners);
router.get("/:id", protect, admin, checkObjectId, getUserById);
router.delete("/:id", protect, admin, checkObjectId, deleteUser);
router.put("/:id", protect, admin, checkObjectId, updateUser);

module.exports = router;
