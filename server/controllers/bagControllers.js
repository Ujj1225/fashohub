const Bag = require("../models/bagModel.js");
const Product = require("../models/productModel.js");
const asyncHandler = require("../middleware/asyncHandler.js");
const { calcPrices } = require("../utils/calcPrices.js");

// @desc    Add a product to bag
// @route   POST /api/users/bag/:pid
const addtoBag = asyncHandler(async (req, res) => {
  const productId = req.params.pid;
  const { quantity, size, payment } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let bagItem = await Bag.findOne({ user: req.user._id });

    if (!bagItem) {
      // If no bag exists for the user, create a new one
      const orderItems = [{ sellingPrice: product.sellingPrice, quantity }];
      const prices = calcPrices(orderItems);
      const itemPrice = Number(prices.itemsPrice);
      const shippingPrice = itemPrice > 4000 ? 0 : 200;
      const totalPrice = itemPrice + Number(shippingPrice);

      bagItem = new Bag({
        user: req.user._id,
        products: [
          {
            product: productId,
            vendorId: product.user,
            image: product.image1,
            name: product.name,
            brand: product.brand,
            sellingPrice: product.sellingPrice,
            quantity,
            size,
          },
        ],
        payment,
        itemPrice,
        shippingPrice,
        totalPrice,
      });
    } else {
      // If bag exists, check if the product is already in the bag
      const productExists = bagItem.products.some(
        (p) => p.product.toString() === productId
      );

      if (productExists) {
        return res.status(400).json({ message: "Product is already in bag" });
      }

      // If not, add the product to the bag
      bagItem.products.push({
        product: productId,
        vendorId: product.user,
        image: product.image1,
        name: product.name,
        brand: product.brand,
        sellingPrice: product.sellingPrice,
        quantity,
        size,
      });

      // Recalculate prices
      const orderItems = await Promise.all(
        bagItem.products.map(async (p) => {
          const prod = await Product.findById(p.product);
          return {
            sellingPrice: prod.sellingPrice,
            quantity: p.quantity,
          };
        })
      );

      const prices = calcPrices(orderItems);
      bagItem.itemPrice = prices.itemsPrice;
      bagItem.shippingPrice = bagItem.itemPrice > 4000 ? 0 : 200;
      bagItem.totalPrice = bagItem.itemPrice + bagItem.shippingPrice;
    }

    await bagItem.save();
    res.status(201).json({ message: "Product added to bag" });
  } catch (error) {
    res.status(500).json({ message: "Product couln't be added to bag" });
  }
});

// @desc    Remove a specific product from bag
// @route   DELETE /api/bag/:pid
const removefromBag = asyncHandler(async (req, res) => {
  const productId = req.params.pid;

  try {
    const bagItem = await Bag.findOne({ user: req.user._id });

    if (!bagItem) {
      return res.status(404).json({ message: "Bag not found" });
    }

    const productIndex = bagItem.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in bag" });
    }

    bagItem.products.splice(productIndex, 1);

    if (bagItem.products.length === 0) {
      await Bag.deleteOne({ _id: bagItem._id });
      return res.json({
        message: "Product removed from bag and bag is empty now",
      });
    } else {
      // Recalculate prices
      const orderItems = await Promise.all(
        bagItem.products.map(async (p) => {
          const prod = await Product.findById(p.product);
          return {
            sellingPrice: prod.sellingPrice,
            quantity: p.quantity,
          };
        })
      );

      const prices = calcPrices(orderItems);
      bagItem.itemPrice = prices.itemsPrice;
      bagItem.shippingPrice = bagItem.itemPrice > 4000 ? 0 : 200;
      bagItem.totalPrice = bagItem.itemPrice + bagItem.shippingPrice;

      await bagItem.save();
    }

    res.json({ message: "Product removed from bag" });
  } catch (error) {
    res.status(500).json({ message: "Product could not be removed" });
  }
});

// @desc    Empty the bag
// @route   DELETE /api/users/bag
const emptyBag = asyncHandler(async (req, res) => {
  try {
    await Bag.deleteOne({ user: req.user._id });
    res.json({ message: "Bag emptied" });
  } catch (error) {
    res.status(500).json({ message: "Bag couldn't be emptied" });
  }
});

// @desc    Update a bag item (quantity, size, etc.)
// @route   PUT /api/users/bag/update
const updateBag = asyncHandler(async (req, res) => {
  const { productId, quantity, size } = req.body;

  try {
    const bagItem = await Bag.findOne({ user: req.user._id });

    if (!bagItem) {
      return res.status(404).json({ message: "Bag not found" });
    }

    const product = bagItem.products.find(
      (p) => p.product.toString() === productId
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found in bag" });
    }

    if (quantity) product.quantity = quantity;
    if (size) product.size = size;

    // Recalculate prices
    const orderItems = await Promise.all(
      bagItem.products.map(async (p) => {
        const prod = await Product.findById(p.product);
        return {
          sellingPrice: prod.sellingPrice,
          quantity: p.quantity,
        };
      })
    );

    const prices = calcPrices(orderItems);
    bagItem.itemPrice = prices.itemsPrice;
    bagItem.shippingPrice = bagItem.itemPrice > 4000 ? 0 : 200;
    bagItem.totalPrice = bagItem.itemPrice + bagItem.shippingPrice;

    const updatedBagItem = await bagItem.save();

    res.json(updatedBagItem);
  } catch (error) {
    res.status(500).json({ message: "Product couldn't be updated" });
  }
});

// @desc    Get all items in user's bag
// @route   GET /api/users/bag/mine
const getBag = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const bag = await Bag.findOne({ user: userId });
  if (bag) {
    res.status(200).json(bag);
  } else {
    res.status(500);
    throw new Error("Bag Empty");
  }
});

//   const getBag = asyncHandler(async (req, res) => {
//   try {
//     const bagItems = await Bag.find({ user: req.user._id }).populate({
//       path: "products.product",
//       select: "sellingPrice ",
//     });
//     let orderItems = [];
//     bagItems.forEach((item) => {
//       item.products.forEach((p) => {
//         if (p.product && p.product.sellingPrice) {
//           orderItems.push({
//             sellingPrice: p.product.sellingPrice,
//             quantity: p.quantity,
//           });
//         }
//       });
//     });

//     const prices = calcPrices(orderItems);
//     res.json({
//       bagItems,
//       itemsPrice: prices.itemsPrice,
//       shippingPrice: prices.shippingPrice,
//       totalPrice: prices.totalPrice,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

module.exports = {
  addtoBag,
  removefromBag,
  emptyBag,
  updateBag,
  getBag,
};
