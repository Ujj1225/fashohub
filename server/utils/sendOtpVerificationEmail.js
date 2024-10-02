// import asyncHandler from "../middleware/asyncHandler.js";
// import UserOTPVerification from "../models/userOTPVerificationModel.js";
// import bcrypt from "bcryptjs";
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// let transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   auth: {
//     user: process.env.AUTH_EMAIL,
//     pass: process.env.AUTH_PASS,
//   },
// });

// // sending otp verification
// const sendOTPVerificationEmail = asyncHandler(async (email, res) => {
//   try {
//     const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

//     const mailOptions = {
//       from: process.env.AUTH_EMAIL,
//       to: email,
//       subject: "Email verification OTP",
//       html: `<p> Thanks for registering to Fashohub. Your OTP is <b>${otp}</b>. </p> <p>The OTP expires in 2 minutes. </p>`,
//     };

//     const salt = await bcrypt.genSalt(10);
//     const hashedOtp = await bcrypt.hash(otp, salt);
//     const newOTPVerification = new UserOTPVerification({
//       email,
//       otp: hashedOtp,
//       createdAt: Date.now(),
//       expiresAt: Date.now() + 120000, // ms
//     });
//     await newOTPVerification.save();
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({
//       status: "PENDING",
//       message: `Verify your email. OTP sent to ${email}`,
//       subject: "Fashohub OTP verification",
//       data: {
//         email,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "FAILED",
//       message: error.message,
//     });
//   }
// });

// export default sendOTPVerificationEmail;
