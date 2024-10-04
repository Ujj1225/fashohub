const asyncHandler = require("../middleware/asyncHandler.js");
const request = require("request");

const khaltiPayment = asyncHandler(async (req, res) => {
  const options = {
    method: "POST",
    url: "https://a.khalti.com/api/v2/epayment/initiate/",
    headers: {
      Authorization: "key live_secret_key_68791341fdd94846a146f0457ff7b455",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      return_url: req.body.return_url || "http://localhost:5173/",
      website_url: "https://example.com/",
      amount: req.body.amount || "1000",
      purchase_order_id: req.body.purchase_order_id || "Order01",
      purchase_order_name: req.body.purchase_order_name || "test",
      customer_info: {
        name: req.body.name || "Ram Bahadur",
        email: req.body.email || "test@khalti.com",
        phone: req.body.phone || "9800000001",
      },
    }),
  };

  request(options, function (error, response, body) {
    if (error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(response.statusCode).json(JSON.parse(body));
    }
  });
});

const esewaPayment = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true });
});

module.exports = { khaltiPayment, esewaPayment };
