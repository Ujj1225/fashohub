const asyncHandler = require("../middleware/asyncHandler.js");
const UserOTPVerification = require("../models/userOTPVerificationModel.js");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const axios = require("axios");
const FormData = require("form-data");

dotenv.config();

const sendOTPVerificationPhone = asyncHandler(async (phone, res) => {
  try {
    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
    console.log("OTP:", otp);
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);
    const newOTPVerification = new UserOTPVerification({
      phone,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 120000,
    });
    await newOTPVerification.save();

    // Send OTP here now!
    const token = process.env.SPARROW_SMS_TOKEN; // Use environment variable for token
    const from = "Demo";
    const text = `Thanks for registering to Fashohub. Your OTP is ${otp}. Expires in: 2min`;

    const form = new FormData();
    form.append("token", token);
    form.append("from", from);
    form.append("to", phone);
    form.append("text", text);

    try {
      const response = await axios.post(
        "http://api.sparrowsms.com/v2/sms/",
        form,
        {
          headers: form.getHeaders(),
        }
      );
      console.log("Status Code:", response.status);
      console.log("Response:", response.data);
    } catch (error) {
      console.error(
        "Error sending SMS:",
        error.response ? error.response.data : error.message
      );
    }

    res.status(200).json({
      status: "PENDING",
      message: `Verify your phone. OTP sent to ${phone}`,
      subject: "Fashohub OTP verification",
      data: {
        phone,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "FAILED",
      message: error.message,
    });
  }
});

module.exports = sendOTPVerificationPhone;
