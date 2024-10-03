const express = require("express");
const { requestOTPMobile } = require("../controllers/otpController.js");

const router = express.Router();

// router.post("/requestOTP", requestOTP);
router.post("/requestOTPMobile", requestOTPMobile);

module.exports = router;
