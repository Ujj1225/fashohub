const express = require("express");
const {
  khaltiPayment,
  esewaPayment,
} = require("../controllers/paymentControllers.js");

const router = express.Router();
router.post("/khalti", khaltiPayment);
router.post("/esewa", esewaPayment);
module.exports = router;
