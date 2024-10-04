const asyncHandler = require("../middleware/asyncHandler.js");
const Order = require("../models/orderModel.js");
const Delivery = require("../models/deliveryModel.js");
const Bag = require("../models/bagModel.js");
const Product = require("../models/productModel.js");
const mongoose = require("mongoose");

// POST: api/orders
const placeOrder = asyncHandler(async (req, res) => {
  const { paymentMethod } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const deliveryDetails = await Delivery.findOne({
      user: req.user._id,
    }).lean();
    const bag = await Bag.findOne({ user: req.user._id }).lean();

    if (!paymentMethod || !deliveryDetails || !bag) {
      res.status(400);
      throw new Error("Error placing order");
    }

    for (const p of bag.products) {
      const pid = p.product;
      const product = await Product.findById(pid).session(session);

      if (!product) {
        throw new Error(
          `${p.name} is unavailable. Please remove from bag and proceed again`
        );
      }

      const size = product.sizes.find((s) => s.size === p.size);
      if (!size) {
        throw new Error(
          `Size ${p.size} not available for ${p.name}. Please remove from bag and proceed again`
        );
      }

      if (size.quantity < p.quantity) {
        throw new Error(
          `Quantity ${p.quantity} not available for ${p.name}. Please remove from bag and proceed again`
        );
      }

      size.quantity -= p.quantity;
      if (size.quantity === 0) {
        // Remove the size from the product
        product.sizes = product.sizes.filter((s) => s.size !== p.size);
      }
      await product.save({ session });
    }

    const order = new Order({
      user: req.user._id,
      bag: bag,
      delivery: deliveryDetails,
      paymentMethod,
    });

    await order.save({ session });

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ message: "Order has been placed successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400);
    throw new Error(error.message);
  }
});

// get logged in user orders, GET: api/orders/myorders
const getMyOrders = asyncHandler(async (req, res) => {
  //find all orders of the logged in user
  const orders = await Order.find({ user: req.user._id });
  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("You have no orders.");
  }
});

//GET: api/orders/:id
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name phone"
  ); // from "user" collection, add "name phone"

  if (order) {
    if (
      order.user._id.toString() === req.user._id.toString() ||
      req.user.isAdmin ||
      req.user.isDeliveryPartner ||
      req.user.isVendor
    ) {
      res.json(order);
    } else {
      res.status(403).json({ message: "Not authorized to view this order" });
    }
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

//PUT: api/orders/:id/pay
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // merchant payment verification - to be done
  const order = await Order.findById(req.params.oid);
  if (!req.user.isAdmin && !order.assignedTo.equals(req.user._id)) {
    res.status(400);
    throw new Error("You are not assigned this order!");
  }

  if (order) {
    // const paidCorrectAmount = order.totalPrice.toString() === value;
    // if (!paidCorrectAmount) throw new Error("Incorrect amount paid");

    order.isPaid = true;
    order.paidAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// PUT: api/orders/:id/deliver
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.oid);
  if (!req.user.isAdmin && !order.assignedTo.equals(req.user._id)) {
    res.status(400);
    throw new Error("You are not assigned this order!");
  }

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

// sorting reference: https://stackoverflow.com/questions/50959590/can-i-query-mongodb-in-reverse-order
// GET: api/orders
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .sort({ createdAt: -1 }) // getting latest order first
    .populate("user", "id name");
  res.status(200).json(orders);
});

const assignOrder = asyncHandler(async (req, res) => {
  const { oid, dpid } = req.body;

  const order = await Order.findOne({ _id: oid });
  if (order) {
    order.assignedTo = dpid;
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

const myProductOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ "bag.products.vendorId": req.user._id });
  if (orders) {
    res.status(200).send(orders);
  } else {
    res.status(404);
    throw new Error("Order not found containing your product");
  }
});

const assignedOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ assignedTo: req.user._id });
  if (orders) {
    res.status(200).send(orders);
  } else {
    res.status(400);
    throw new Error("No orders assigned to you.");
  }
});

module.exports = {
  placeOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  assignOrder,
  myProductOrders,
  assignedOrders,
};
