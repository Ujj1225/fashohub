const asyncHandler = require("../middleware/asyncHandler.js");
const { Vendor, VendorRequest } = require("../models/vendorModel.js");
const User = require("../models/userModel.js");

// GET - /api/vendors/vendorDetails/:vid
const getVendorDetails = asyncHandler(async (req, res) => {
  const { vid } = req.params;
  const vendor = await Vendor.findOne({ user: vid });
  if (vendor) {
    res.send(vendor);
  } else {
    res.status(404);
    throw new Error("Vendor not found.");
  }
});

// POST - /api/vendors/vendorDetails
const addVendorDetails = asyncHandler(async (req, res) => {
  const { name, location, contact, description } = req.body;

  const existingVendor = await Vendor.findOne({ user: req.user._id });
  if (existingVendor) {
    // updating existing vendor details
    existingVendor.name = name;
    existingVendor.location = location;
    existingVendor.contact = contact;
    existingVendor.description = description;

    const updatedVendor = await existingVendor.save();
    res.status(200).send(updatedVendor);
  } else {
    // creating new vendor details
    const vendor = new Vendor({
      user: req.user._id,
      name,
      location,
      contact,
      description,
    });
    const createdVendor = await vendor.save();
    res.status(200).send(createdVendor);
  }
});

const requestVendorship = asyncHandler(async (req, res) => {
  const {
    name,
    phone,
    email,
    citizenshipFront,
    citizenshipBack,
    panCard,
    companyRegistration,
  } = req.body;
  const existingRequest = await VendorRequest.findOne({ user: req.user._id });
  if (existingRequest) {
    res.status(400);
    throw new Error("Vendor request is pending.");
  }
  const vendorRequest = new VendorRequest({
    user: req.user._id,
    name,
    phone,
    email,
    citizenshipFront,
    citizenshipBack,
    panCard,
    companyRegistration,
  });
  await vendorRequest.save();
  res.status(200).json({ message: "Application submitted." });
});

const getMyVendorRequest = asyncHandler(async (req, res) => {
  const vendorRequest = await VendorRequest.findOne({ user: req.user._id });

  if (vendorRequest) {
    res.status(200).send({ message: "Your request is pending." });
  } else {
    res.status(404);
    throw new Error("Vendor request not found.");
  }
});
const getAllRequests = asyncHandler(async (req, res) => {
  const vendorRequest = await VendorRequest.find({});

  if (vendorRequest) {
    res.status(200).send(vendorRequest);
  } else {
    res.status(404);
    throw new Error("No requests for vendorship.");
  }
});
const getRequestById = asyncHandler(async (req, res) => {
  const { rid } = req.params;
  const vendorRequest = await VendorRequest.findOne({ _id: rid });
  if (vendorRequest) {
    res.status(200).send(vendorRequest);
  } else {
    res.status(404);
    throw new Error("Request not found.");
  }
});

const approveRequest = asyncHandler(async (req, res) => {
  const { rid } = req.params;
  const vendorRequest = await VendorRequest.findOne({ _id: rid });
  if (vendorRequest) {
    const user = await User.findOne({ _id: vendorRequest.user });
    if (user) {
      user.isVendor = true;
      await user.save();

      vendorRequest.approved = true;
      await vendorRequest.save();
      res.status(200).json({
        message: "User request approved. User is now a vendor.",
      });
    }
  } else {
    res.status(404);
    throw new Error("Request not found.");
  }
});
const deleteRequest = asyncHandler(async (req, res) => {
  const { rid } = req.params;
  await VendorRequest.deleteOne({ _id: rid });
  res.status(200);
  res.json({ message: "Request deleted successfully" });
});

module.exports = {
  getVendorDetails,
  addVendorDetails,
  requestVendorship,
  getMyVendorRequest,
  getAllRequests,
  getRequestById,
  approveRequest,
  deleteRequest,
};
