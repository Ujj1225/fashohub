const asyncHandler = require("../middleware/asyncHandler.js");
// const sendOTPVerificationEmail = require("../utils/sendOtpVerificationEmail.js");
const sendOTPVerificationPhone = require("../utils/sendOtpMobile.js");
const User = require("../models/userModel.js");

// POST /api/users/requestOTP
// const requestOTP = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   await sendOTPVerificationEmail(email, res);
// });

const requestOTPMobile = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  const userExist = await User.findOne({ phone });
  if (userExist && userExist.verified) {
    res.status(400);
    throw new Error("User already exists");
  }

  await sendOTPVerificationPhone(phone, res);
});

module.exports = { requestOTPMobile };
