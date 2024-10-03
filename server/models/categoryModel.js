const mongoose = require("mongoose");

const primaryCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const secondaryCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  primaryCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "PrimaryCategory",
  },
});

const tertiaryCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  primaryCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "PrimaryCategory",
  },
  secondaryCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "SecondaryCategory",
  },
});

// Cascade deletion
primaryCategorySchema.pre("remove", async function (next) {
  try {
    // Delete associated secondary categories
    await SecondaryCategory.deleteMany({ primaryCategoryId: this._id });

    // Delete associated tertiary categories
    await TertiaryCategory.deleteMany({ primaryCategoryId: this._id });

    next();
  } catch (err) {
    next(err);
  }
});

const PrimaryCategory = mongoose.model(
  "PrimaryCategory",
  primaryCategorySchema
);
const SecondaryCategory = mongoose.model(
  "SecondaryCategory",
  secondaryCategorySchema
);
const TertiaryCategory = mongoose.model(
  "TertiaryCategory",
  tertiaryCategorySchema
);

module.exports = { PrimaryCategory, SecondaryCategory, TertiaryCategory };
