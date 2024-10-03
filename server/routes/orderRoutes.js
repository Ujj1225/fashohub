const express = require("express");
const router = express.Router();

const {
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  placeOrder,
  assignOrder,
  myProductOrders,
  assignedOrders,
} = require("../controllers/orderController.js");

const {
  admin,
  adminOrDeliveryPartner,
  deliveryPartner,
  protect,
  vendor,
} = require("../middleware/authMiddleware.js");

router.post("/", protect, placeOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

// vendor or admin or delivery partner
router.get("/", protect, admin, getOrders);
router.put("/:oid/pay", protect, adminOrDeliveryPartner, updateOrderToPaid);
router.put(
  "/:oid/deliver",
  protect,
  adminOrDeliveryPartner,
  updateOrderToDelivered
);
router.post("/assign", protect, admin, assignOrder);

// vendor
router.get("/my/productOrders", protect, vendor, myProductOrders);

// deliveryPartner
router.get("/my/assignedOrders", protect, deliveryPartner, assignedOrders);

module.exports = router;
