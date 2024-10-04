const Delivery = require("../models/deliveryModel.js");
const asyncHandler = require("../middleware/asyncHandler.js");

const getAddress = asyncHandler(async (req, res) => {
  const address = await Delivery.findOne({ user: req.user._id });
  res.send(address);
});

const saveAddress = asyncHandler(async (req, res) => {
  const { province, district, area, landmark, description, email } = req.body;
  const existingAddress = await Delivery.findOne({ user: req.user._id });
  if (existingAddress) {
    res.status(400);
    throw new Error("Address already exists.");
  }
  const address = new Delivery({
    user: req.user._id,
    province,
    district,
    area,
    landmark,
    description,
    email,
  });
  const createdAddress = await address.save();
  res.status(201);
  res.send(createdAddress);
});

const updateAddress = asyncHandler(async (req, res) => {
  const address = await Delivery.findOne({ user: req.user._id });
  if (address) {
    address.province = req.body.province || address.province;
    address.district = req.body.district || address.district;
    address.area = req.body.area || address.area;
    address.landmark = req.body.landmark || address.landmark;
    address.description = req.body.description || address.description;
    address.email = req.body.email || address.email;

    const updatedAddress = await address.save();
    res.send(updatedAddress);
  } else {
    res.status(404);
    throw new Error("Address not found.");
  }
});

module.exports = {
  getAddress,
  saveAddress,
  updateAddress,
};
