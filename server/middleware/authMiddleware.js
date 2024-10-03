const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler.js");
const User = require("../models/userModel.js");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //read token from the cookie
  token = req.cookies.jwt; //jwt is name of the cookie

  if (token) {
    //if there is a token, we need to verify it
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const vendor = (req, res, next) => {
  if (req.user && req.user.isVendor) {
    //req.user is set in the protect middleware, and if that user is admin then we'll allow the user to access the route
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an vendor");
  }
};
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};
const deliveryPartner = (req, res, next) => {
  if (req.user && req.user.isDeliveryPartner) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a delivery partner");
  }
};
const vendorOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isVendor || req.user.isAdmin)) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an vendor or an admin");
  }
};
const adminOrDeliveryPartner = (req, res, next) => {
  if (req.user && (req.user.isDeliveryPartner || req.user.isAdmin)) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin or an delivery partner");
  }
};

const vendorOrAdminOrDeliveryPartner = (req, res, next) => {
  if (
    req.user &&
    (req.user.isVendor || req.user.isAdmin || req.user.isDeliveryPartner)
  ) {
    next();
  } else {
    res.status(401);
    throw new Error(
      "Not authorized as an vendor or an admin or a delivery partner"
    );
  }
};
module.exports = {
  protect,
  vendor,
  admin,
  deliveryPartner,
  adminOrDeliveryPartner,
  vendorOrAdmin,
  vendorOrAdminOrDeliveryPartner,
};
