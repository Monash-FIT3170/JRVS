/**
 * @file userUnitProgressController.js
 * @description Handles user unit progress operations for the API.
 *
 * This module provides functions to manage the progress of users in specific units.
 * The following operations are supported:
 * - Retrieve the progress of a user for a specific unit
 * - Update the progress of a user for a specific unit
 * - Create a new progress entry for a user for a specific unit
 *
 * Each function uses the Mongoose model (`userUnitProgressModel`) to interact with the MongoDB
 * collection storing user progress data. Functions are asynchronous and use `express-async-handler`
 * to handle exceptions within async routes. Errors are properly handled and returned to the client
 * with appropriate status codes.
 *
 * @module userUnitProgressController
 * @requires express-async-handler
 * @requires ../models/userUnitProgressModel
 * @throws {Error} Throws errors for progress not found, invalid inputs, or issues with progress operations.
 * @returns {Promise<void>} A promise that resolves when the operation is successfully completed.
 */

const asyncHandler = require("express-async-handler");

const userUnitProgressModel = require("../models/userUnitProgressModel");

/**
 * Retrieves the progress of a user for a specific unit.
 *
 * @async
 * @param {Object} req - The request object, containing userId and unitId parameters.
 * @param {Object} res - The response object used to return the user's unit progress or an error message.
 * @returns {Promise<void>} A promise that resolves when the user's unit progress is fetched.
 */
const getUserUnitProgress = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const unitId = req.params.unitId;
  const userUnitProgress = await userUnitProgressModel.findOne({
    userId: userId,
    unitId: unitId,
  });

  if (!userUnitProgress) {
    res.status(404).json({ message: "User's unit progress not found" });
  } else {
    res.status(200).json(userUnitProgress);
  }
});

/**
 * Updates the progress of a user for a specific unit.
 *
 * @async
 * @param {Object} req - The request object, containing userId, unitId parameters, and completed lessons data.
 * @param {Object} res - The response object used to return the updated user's unit progress or an error message.
 * @returns {Promise<void>} A promise that resolves when the user's unit progress is updated.
 */
const updateUserUnitProgress = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const unitId = req.params.unitId;
  const { completedLessons } = req.body;

  const userUnitProgress = await userUnitProgressModel.findOne({
    userId: userId,
    unitId: unitId,
  });

  if (!userUnitProgress) {
    res.status(404).json({ message: "User's unit progress not found" });
  } else {
    userUnitProgress.completedLessons = completedLessons;
    await userUnitProgress.save();
    res.status(200).json(userUnitProgress);
  }
});

/**
 * Creates a new progress entry for a user for a specific unit.
 *
 * @async
 * @param {Object} req - The request object, containing userId, unitId parameters, and completed lessons data.
 * @param {Object} res - The response object used to return the created user's unit progress or an error message.
 * @returns {Promise<void>} A promise that resolves when a new user's unit progress entry is created.
 */
const createUserUnitProgress = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const unitId = req.params.unitId;
  const { completedLessons } = req.body;
  let userUnitProgress = await userUnitProgressModel.findOne({
    userId: userId,
    unitId: unitId,
  });
  if (userUnitProgress) {
    res.status(404).json({ message: "User's unit progress not found" });
  } else {
    userUnitProgress = new lessonProgressModel({
      userId: userId,
      unitId: unitId,
      completedLessons: completedLessons,
    });
    await userUnitProgress.save();
    res.status(201).json(userUnitProgress);
  }
});

module.exports = {
  getUserUnitProgress,
  updateUserUnitProgress,
  createUserUnitProgress,
};
