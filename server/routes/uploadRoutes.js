const path = require("path");
const express = require("express");
const multer = require("multer");
const { protect } = require("../middleware/authMiddleware.js");
const FTP = require("ftp");
// const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

// Configure FTP connection
const ftpConfig = {
  host: process.env.FTP_HOST,
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  port: process.env.FTP_PORT,
};

// Configure multer for temporary local storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Images only!"), false);
    }
  },
  limits: { fileSize: 1024 * 1024 * 0.2 }, // 0.2mb i.e 200kb
});

router.post("/", protect, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded" });
  }

  const fileName = `image-${Date.now()}${path.extname(req.file.originalname)}`;
  const remoteFilePath = `/public_html/uploads/${req.user._id}/${fileName}`;

  const ftp = new FTP();

  ftp.on("ready", () => {
    ftp.mkdir(`/public_html/uploads/${req.user._id}`, true, (err) => {
      if (err) {
        ftp.end();
        return res.status(500).send({ message: "Error creating directory" });
      }

      ftp.put(req.file.buffer, remoteFilePath, (err) => {
        ftp.end();

        if (err) {
          return res.status(500).send({ message: "Error uploading file" });
        }

        const imageUrl = `https://images.fashohub.com/${req.user._id}/${fileName}`;
        res.status(200).send({
          message: "Image uploaded successfully",
          image: imageUrl,
        });
      });
    });
  });

  ftp.connect(ftpConfig);
});

module.exports = router;
