const asyncHandler = require("express-async-handler");

const Badge = require("../models/badgeModel");

// @desc    Get badge
// @route   GET /api/badges
// @access  Private
const getBadges = asyncHandler(async (req, res) => {
  const badges = await Badge.find();

  res.status(200).json(badges);
});

// @desc    Set badge
// @route   POST /api/badges
// @access  Private
const setBadge = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("please add a name field");
  }
  if (!req.body.description) {
    res.status(400);
    throw new Error("please add a description field");
  }
  if (!req.body.imagePath) {
    res.status(400);
    throw new Error("please add a imagePath field");
  }

  const badge = await Badge.create({
    name: req.body.name,
    description: req.body.description,
    imagePath: req.body.imagePath,
  });

  res.status(200).json(badge);
});

// @desc    Update badge
// @route   Put /api/badges/:id
// @access  Private
const updateBadge = asyncHandler(async (req, res) => {
  const badge = await Badge.findById(req.params.id);

  if (!badge) {
    res.status(400);
    throw new Error("Badge not found");
  }

  const updatedBadge = await Badge.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedBadge);
});

// @desc    Delete badge
// @route   Delete /api/badges/:id
// @access  Private
const deleteBadge = asyncHandler(async (req, res) => {
  const badge = await Badge.findById(req.params.id);

  if (!badge) {
    res.status(400);
    throw new Error("Badge not found");
  }

  await Badge.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

const getBadge = asyncHandler(async (req, res) => {
  const badgeId = req.params.id;
  console.log(badgeId);
  const badge = await Badge.findById(badgeId);
  console.log(badge);
  if (!badge) {
    res.status(400);
    throw new Error("Badge not found");
  }
  console.log(badge);
  res.status(200).json({ ...badge._doc });
});

module.exports = {
  getBadges,
  setBadge,
  updateBadge,
  deleteBadge,
  getBadge,
};
