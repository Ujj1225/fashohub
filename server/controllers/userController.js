const asyncHandler = require("../middleware/asyncHandler.js");
const User = require("../models/userModel.js");
const UserOTPVerification = require("../models/userOTPVerificationModel.js");
const generateToken = require("../utils/generateToken.js");
const bcrypt = require("bcryptjs");

// POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  const user = await User.findOne({ phone });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      verified: user.verified,
      isAdmin: user.isAdmin,
      isVendor: user.isVendor,
      isDeliveryPartner: user.isDeliveryPartner,
    });
  } else {
    res.status(401); //unauthorized
    throw new Error("Invalid phone or password");
  }
});

// POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, phone, password, otp } = req.body;

  const userExists = await User.findOne({ phone });
  if (userExists) {
    res.status(400); //bad request
    throw new Error("User already exists");
  }

  const UserOTPVerificationRecords = await UserOTPVerification.find({
    phone,
  });
  if (UserOTPVerificationRecords.length <= 0) {
    // No records found
    res.status(400);
    throw new Error(
      "Account record doesn't exist or has already been verified. Please sign up or log in."
    );
  } else {
    const { expiresAt } = UserOTPVerificationRecords[0];
    const hashedOTP = UserOTPVerificationRecords[0].otp;
    if (expiresAt < Date.now()) {
      // Record expired
      await UserOTPVerification.deleteMany({ phone });
      res.status(400);
      throw new Error("The code has expired. Please request a new one.");
    } else {
      const validOTP = await bcrypt.compare(otp, hashedOTP);
      if (!validOTP) {
        res.status(400);
        throw new Error("Invalid code passed.");
      } else {
        // OTP is valid, create the user
        const user = await User.create({
          name,
          phone,
          password, // storing the hashed password in the db
          verified: true,
        });
        if (user) {
          generateToken(res, user._id);
          // deleting the OTP record
          await UserOTPVerification.deleteMany({ phone });
          res.status(201).json({
            _id: user._id,
            name: user.name,
            phone: user.phone,
            verified: user.verified,
            isAdmin: user.isAdmin,
            isVendor: user.isVendor,
            isDeliveryPartner: user.isDeliveryPartner,
          });
        } else {
          res.status(400);
          throw new Error("Invalid user data");
        }
      }
    }
  }
});

// POST /api/users/logout
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()), // expires immediately
  });
  res.status(200).json({ message: "user logged out" });
});

//GET /api/users/profile,
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      isAdmin: user.isAdmin,
      isVendor: user.isVendor,
      isDeliveryPartner: user.isDeliveryPartner,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// PUT /api/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      // email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// GET /api/users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//GET /api/users/:id
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password"); // we dont want the pw
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// DELETE /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can not delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// PUT /api/users/:id
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.isAdmin = Boolean(req.body.isAdmin); // making sure it is boolean
    user.isVendor = Boolean(req.body.isVendor);
    user.isDeliveryPartner = Boolean(req.body.isDeliveryPartner);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      // email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isVendor: updatedUser.isVendor,
      isDeliveryPartner: updatedUser.isDeliveryPartner,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const getDeliveryPartners = asyncHandler(async (req, res) => {
  const deliveryPartners = await User.find({ isDeliveryPartner: true }).select(
    "-password"
  );
  if (deliveryPartners) {
    res.status(200).send(deliveryPartners);
  } else {
    res.status(404);
    throw new Error("No delivery partners.");
  }
});

module.exports = {
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
};
