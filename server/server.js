const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db.js");
connectDB();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { errorHandler, notFound } = require("./middleware/errorMiddleware.js");

const wishList = require("./routes/wishlistRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const otpRoutes = require("./routes/otpRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const vendorRoutes = require("./routes/vendorRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const bagRoutes = require("./routes/bagRoutes.js");
const deliveryRoutes = require("./routes/deliveryRoutes.js");
const paymentRoutes = require("./routes/paymentRoutes.js");
const statsRoutes = require("./routes/statsRoutes.js");
const bannerRoutes = require("./routes/bannerRoutes.js");

const {
  CopilotRuntime,
  GroqAdapter,
  copilotRuntimeNodeHttpEndpoint,
} = require("@copilotkit/runtime");
const Groq = require("groq-sdk");

const port = process.env.PORT || 8002;
const app = express();
app.set("trust proxy", true);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 400,
  message: "Too many requests from this IP, please try again later.",
});

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://fashohub.com",
      "http://frontend.fashohub.com",
      "https://frontend.fashohub.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(hpp());
app.use(mongoSanitize());

const adaptHeaders = (req, res, next) => {
  req.headers.get = function (headerName) {
    return req.headers[headerName.toLowerCase()];
  };
  next();
};

app.use(adaptHeaders);

const groq = new Groq({ apiKey: process.env["GROQ_API_KEY"] });
const serviceAdapter = new GroqAdapter({
  groq,
  model: "llama3-groq-8b-8192-tool-use-preview",
});

app.use("/api/copilotkit", async (req, res, next) => {
  try {
    const runtime = new CopilotRuntime();
    const handler = copilotRuntimeNodeHttpEndpoint({
      endpoint: "/copilotkit",
      runtime,
      serviceAdapter: serviceAdapter,
    });

    return handler(req, res, next);
  } catch (err) {
    console.error("Error handling CopilotKit request:", err);
    res.status(500).send("Internal Server Error");
  }
});

// app.use("/api/copilotkit/filter", async (req, res) => {
//   try {
//     const { runtime } = require("./copilotkit/filterProducts.js");
//     const handler = copilotRuntimeNodeHttpEndpoint({
//       endpoint: "/copilotkit/filter",
//       runtime,
//       serviceAdapter: serviceAdapter,
//     });
//     const result = await handler(req.body);
//     res.json(result);
//   } catch (err) {
//     console.error("Error handling CopilotKit request:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.use("/api/users", userRoutes);
app.use("/api/users", wishList);
app.use("/api/users", otpRoutes);
app.use("/api/users/bag", bagRoutes);
app.use("/api/products", productRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/banner", bannerRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
