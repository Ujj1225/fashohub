const asyncHandler = require("../middleware/asyncHandler.js");
const Banner = require("../models/bannerModel.js");

const getBanners = asyncHandler(async (req, res) => {
  const banner = await Banner.find({});
  res.send(banner);
});

const addBanner = asyncHandler(async (req, res) => {
  const {
    image1,
    link1,
    image2,
    link2,
    image3,
    link3,
    image4,
    link4,
    image5,
    link5,
    image6,
    link6,
    image7,
    link7,
    image8,
    link8,
    image9,
    link9,
    image10,
    link10,
  } = req.body;

  let banner = await Banner.findOne({});

  if (banner) {
    // updating existing banner
    banner.image1 = image1 || banner.image1;
    banner.link1 = link1 || banner.link1;
    banner.image2 = image2 || banner.image2;
    banner.link2 = link2 || banner.link2;
    banner.image3 = image3 || banner.image3;
    banner.link3 = link3 || banner.link3;
    banner.image4 = image4 || banner.image4;
    banner.link4 = link4 || banner.link4;
    banner.image5 = image5 || banner.image5;
    banner.link5 = link5 || banner.link5;
    banner.image6 = image6 || banner.image6;
    banner.link6 = link6 || banner.link6;
    banner.image7 = image7 || banner.image7;
    banner.link7 = link7 || banner.link7;
    banner.image8 = image8 || banner.image8;
    banner.link8 = link8 || banner.link8;
    banner.image9 = image9 || banner.image9;
    banner.link9 = link9 || banner.link9;
    banner.image10 = image10 || banner.image10;
    banner.link10 = link10 || banner.link10;
  } else {
    // creating new banner
    banner = new Banner({
      image1,
      link1,
      image2,
      link2,
      image3,
      link3,
      image4,
      link4,
      image5,
      link5,
      image6,
      link6,
      image7,
      link7,
      image8,
      link8,
      image9,
      link9,
      image10,
      link10,
    });
  }

  const createdBanner = await banner.save();
  res.status(201).send(createdBanner);
});

module.exports = { getBanners, addBanner };
