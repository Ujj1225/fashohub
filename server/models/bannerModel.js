const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  image1: {
    type: String,
    required: true,
  },
  link1: {
    type: String,
    required: true,
  },

  image2: {
    type: String,
    required: true,
  },
  link2: {
    type: String,
    required: true,
  },

  image3: {
    type: String,
    required: true,
  },
  link3: {
    type: String,
    required: true,
  },

  image4: String,
  link4: String,

  image5: String,
  link5: String,

  image6: String,
  link6: String,

  image7: String,
  link7: String,

  image8: String,
  link8: String,

  image9: String,
  link9: String,

  image10: String,
  link10: String,
});

module.exports = mongoose.model("Banner", bannerSchema);
