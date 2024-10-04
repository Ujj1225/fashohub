const asyncHandler = require("../middleware/asyncHandler.js");
const {
  PrimaryCategory,
  SecondaryCategory,
  TertiaryCategory,
} = require("../models/categoryModel.js");

// PRIMARY

// @desc    Fetch all primary categories
// @route   GET /api/categories/primary
const getPrimaryCategories = asyncHandler(async (req, res) => {
  const primaryCategories = await PrimaryCategory.find({});
  res.json(primaryCategories);
});

// @desc    Create a new primary category
// @route   POST /api/categories/primary
const createPrimaryCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const primaryCategory = await PrimaryCategory.create({ name });
  res.status(201).json(primaryCategory);
});

// @desc    Delete a primary category
// @route   DELETE /api/categories/primary/:pid
const deletePrimaryCategory = asyncHandler(async (req, res) => {
  const primaryCategoryId = req.params.pid;
  const { name } = await PrimaryCategory.findById(primaryCategoryId);
  await PrimaryCategory.findByIdAndDelete(primaryCategoryId);
  res.json({ message: `Primary category '${name}' removed` });
});

// SECONDARY

// @desc    Fetch all secondary categories under a primary category
// @route   GET /api/categories/secondary/:pid
const getSecondaryCategory = asyncHandler(async (req, res) => {
  const secondaryCategories = await SecondaryCategory.find({
    primaryCategoryId: req.params.pid,
  });
  console.log(secondaryCategories);
  res.json(secondaryCategories);
});

// @desc    Create a new secondary category under a primary category
// @route   POST /api/categories/secondary/:pid
const createSecondaryCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { pid } = req.params;
  const secondaryCategory = await SecondaryCategory.create({
    name,
    primaryCategoryId: pid,
  });
  res.status(201).json(secondaryCategory);
});

// @desc    Delete a secondary category
// @route   DELETE /api/categories/secondary/:sid
const deleteSecondaryCategory = asyncHandler(async (req, res) => {
  const { sid } = req.params;
  const secondaryCategory = await SecondaryCategory.findById(sid);
  if (!secondaryCategory) {
    res.status(404);
    throw new Error("Secondary category not found");
  }
  const { name } = secondaryCategory;
  await SecondaryCategory.findByIdAndDelete(sid);
  res.json({ message: `Secondary category '${name}' removed` });
});

// TERTIARY

// @desc    Fetch all tertiary categories under a secondary category
// @route   GET /api/categories/tertiary/:pid/:sid
const getTertiaryCategories = asyncHandler(async (req, res) => {
  const tertiaryCategories = await TertiaryCategory.find({
    primaryCategoryId: req.params.pid,
    secondaryCategoryId: req.params.sid,
  });
  res.json(tertiaryCategories);
});

// @desc    Create a new tertiary category under a secondary category
// @route   POST /api/categories/tertiary/:pid/:sid
const createTertiaryCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { pid, sid } = req.params;

  const tertiaryCategory = await TertiaryCategory.create({
    name,
    primaryCategoryId: pid,
    secondaryCategoryId: sid,
  });

  res.status(201).json(tertiaryCategory);
});

// @desc    Delete a tertiary category
// @route   DELETE /api/categories/tertiary/:tid
const deleteTertiaryCategory = asyncHandler(async (req, res) => {
  const { tid } = req.params;
  const tertiaryCategory = await TertiaryCategory.findById(tid);
  if (!tertiaryCategory) {
    res.status(404);
    throw new Error("Tertiary category not found");
  }
  const { name } = tertiaryCategory;
  await TertiaryCategory.findByIdAndDelete(tid);
  res.json({ message: `Tertiary category '${name}' removed` });
});

module.exports = {
  getPrimaryCategories,
  createPrimaryCategory,
  deletePrimaryCategory,
  getSecondaryCategory,
  createSecondaryCategory,
  deleteSecondaryCategory,
  getTertiaryCategories,
  createTertiaryCategory,
  deleteTertiaryCategory,
};
