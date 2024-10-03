const mongoose = require("mongoose");

const userOTPVerificationSchema = new mongoose.Schema({
  phone: { type: String, ref: "User", required: true },
  otp: { type: String, required: true },
  createdAt: Date,
  expiresAt: Date,
});

const UserOTPVerification = mongoose.model(
  "UserOTPVerification",
  userOTPVerificationSchema
);

module.exports = UserOTPVerification;
