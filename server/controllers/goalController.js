/**
 * Handles goal-related operations for the API.
 *
 * This module provides functions to perform CRUD operations on goals in the database.
 * The following operations are supported:
 * - Get all goals
 * - Create a new goal
 * - Update an existing goal
 * - Delete a goal
 *
 * Each function uses the Mongoose model `Goal` to interact with the MongoDB collection
 * storing goal information. All functions are asynchronous and use `express-async-handler`
 * to handle exceptions within async routes. Errors are properly handled and returned to the client
 * with appropriate status codes.
 *
 * @module goalController
 * @requires express-async-handler
 * @requires ../models/goalModel
 * @throws {Error} Throws an error if any operation fails (e.g., goal not found, validation errors).
 * @returns {Promise<void>} A promise that resolves when the operation is successfully completed.
 */

const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const goalModel = require("../models/goalModel");

/**
 * @desc    Get all goals
 * @route   GET /api/goals
 * @access  Private
 * @function getGoals
 * @async
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the goals are retrieved and sent in the response.
 */
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();

  res.status(200).json(goals);
});

/**
 * @desc    Create a new goal
 * @route   POST /api/goals
 * @access  Private
 * @function setGoal
 * @async
 * @param {Request} req - The request object containing goal data in the body.
 * @param {Response} res - The response object.
 * @throws {Error} Throws an error if the 'text' field is missing in the request body.
 * @returns {Promise<void>} A promise that resolves when the goal is created and sent in the response.
 */
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
  });

  res.status(200).json(goal);
});

/**
 * @desc    Update an existing goal
 * @route   PUT /api/goals/:id
 * @access  Private
 * @function updateGoal
 * @async
 * @param {Request} req - The request object containing the goal ID in the URL and updated data in the body.
 * @param {Response} res - The response object.
 * @throws {Error} Throws an error if the goal with the given ID is not found.
 * @returns {Promise<void>} A promise that resolves when the goal is updated and sent in the response.
 */
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

/**
 * @desc    Delete a goal
 * @route   DELETE /api/goals/:id
 * @access  Private
 * @function deleteGoal
 * @async
 * @param {Request} req - The request object containing the goal ID in the URL.
 * @param {Response} res - The response object.
 * @throws {Error} Throws an error if the goal with the given ID is not found.
 * @returns {Promise<void>} A promise that resolves when the goal is deleted and a confirmation object is sent in the response.
 */
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  await Goal.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
