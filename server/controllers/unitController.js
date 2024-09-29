/**
 * @file unitController.js
 * @description Handles unit-related operations for the API.
 *
 * This module provides functions to manage units and their associated nodes.
 * The following operations are supported:
 * - Get a list of all units
 * - Get a specific unit by ID
 * - Append a new node to a unit
 * - Insert a new node into a unit
 * - Delete a node from a unit and reappend its children
 * - Get the list of tail node IDs for the tree
 *
 * Each function uses Mongoose models (`unitsModel`, `unitModel`, `lessonModel`, `videoModel`, `quizModel`)
 * to interact with the MongoDB collections storing unit and node information. Functions are asynchronous
 * and use `express-async-handler` to handle exceptions within async routes. Errors are properly handled
 * and returned to the client with appropriate status codes.
 *
 * @module unitController
 * @requires express-async-handler
 * @requires ../models/unitsModel
 * @requires ../models/unitModel
 * @requires ./lessonController
 * @requires ../models/lessonModel
 * @requires ../models/videoModel
 * @requires ../models/quizModel
 * @throws {Error} Throws errors for unit not found, invalid node types, or issues with node operations.
 * @returns {Promise<void>} A promise that resolves when the operation is successfully completed.
 */

const asyncHandler = require("express-async-handler");
const unitsModel = require("../models/unitsModel");
const unitModel = require("../models/unitModel");
const { createEmptyLesson, getLesson } = require("./lessonController");
const lessonModel = require("../models/lessonModel");
const videoModel = require("../models/videoModel");
const quizModel = require("../models/quizModel");

/**
 * @desc    Get a list of all units
 * @route   GET /api/units
 * @access  Private
 * @function getUnits
 * @async
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the list of units is retrieved and sent in the response.
 */
const getUnits = asyncHandler(async (req, res) => {
  const units = await unitsModel.find();
  res.status(200).json(units);
});

module.exports = {
  getUnits,
  getUnit,
  createUnit,
  appendNode,
  insertNode,
};
