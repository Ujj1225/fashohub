const express = require("express");
const { admin, protect, vendor } = require("../middleware/authMiddleware.js");
const {
  addVendorDetails,
  approveRequest,
  deleteRequest,
  getAllRequests,
  getMyVendorRequest,
  getRequestById,
  getVendorDetails,
  requestVendorship,
} = require("../controllers/vendorController.js");

const router = express.Router();

router.get("/vendorDetails/:vid", getVendorDetails);
router.post("/vendorDetails", protect, vendor, addVendorDetails);
router.post("/vendorRequest", protect, requestVendorship);
router.get("/myRequest", protect, getMyVendorRequest);

// admin
router.get("/vendorRequest", protect, admin, getAllRequests);
router.get("/vendorRequest/:rid", protect, admin, getRequestById);
router.put("/vendorRequest/:rid", protect, admin, approveRequest);
router.delete("/vendorRequest/:rid", protect, admin, deleteRequest);

module.exports = router;
