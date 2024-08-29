/**
 * Handles badge-related operations for the API.
 *
 * This module provides functions to perform CRUD operations on badges in the database.
 * The following operations are supported:
 * - Get all badges
 * - Create a new badge
 * - Update an existing badge
 * - Delete a badge
 * - Get a specific badge by ID
 *
 * Each function uses the Mongoose model `Badge` to interact with the MongoDB collection
 * storing badge information. All functions are asynchronous and use `express-async-handler`
 * to handle exceptions within async routes. Errors are properly handled and returned to the client
 * with appropriate status codes.
 *
 * @module badgeController
 * @requires express-async-handler
 * @requires ../models/badgeModel
 * @throws {Error} Throws an error if any operation fails (e.g., badge not found, database error).
 * @returns {Promise<void>} A promise that resolves when the operation is successfully completed.
 */
const asyncHandler = require("express-async-handler");
const Badge = require("../models/badgeModel");

/**
 * @desc    Get all badges
 * @route   GET /api/badges
 * @access  Private
 * @function getBadges
 * @async
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the badges are retrieved and sent in the response.
 */
const getBadges = asyncHandler(async (req, res) => {
  const badges = await Badge.find();

  res.status(200).json(badges);
});

/**
 * @desc    Create a new badge
 * @route   POST /api/badges
 * @access  Private
 * @function setBadge
 * @async
 * @param {Request} req - The request object containing badge data in the body.
 * @param {Response} res - The response object.
 * @throws {Error} Throws an error if required fields (name, description, imagePath) are missing.
 * @returns {Promise<void>} A promise that resolves when the badge is created and sent in the response.
 */
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

/**
 * @desc    Update an existing badge
 * @route   PUT /api/badges/:id
 * @access  Private
 * @function updateBadge
 * @async
 * @param {Request} req - The request object containing the badge ID in the URL and updated data in the body.
 * @param {Response} res - The response object.
 * @throws {Error} Throws an error if the badge with the given ID is not found.
 * @returns {Promise<void>} A promise that resolves when the badge is updated and sent in the response.
 */
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

/**
 * @desc    Delete a badge
 * @route   DELETE /api/badges/:id
 * @access  Private
 * @function deleteBadge
 * @async
 * @param {Request} req - The request object containing the badge ID in the URL.
 * @param {Response} res - The response object.
 * @throws {Error} Throws an error if the badge with the given ID is not found.
 * @returns {Promise<void>} A promise that resolves when the badge is deleted and a confirmation object is sent in the response.
 */
const deleteBadge = asyncHandler(async (req, res) => {
  const badge = await Badge.findById(req.params.id);

  if (!badge) {
    res.status(400);
    throw new Error("Badge not found");
  }

  await Badge.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

/**
 * @desc    Get a specific badge by ID
 * @route   GET /api/badges/:id
 * @access  Private
 * @function getBadge
 * @async
 * @param {Request} req - The request object containing the badge ID in the URL.
 * @param {Response} res - The response object.
 * @throws {Error} Throws an error if the badge with the given ID is not found.
 * @returns {Promise<void>} A promise that resolves when the badge is retrieved and sent in the response.
 */
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
