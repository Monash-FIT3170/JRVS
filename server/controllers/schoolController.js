/**
 * Handles school-related operations for the API.
 *
 * This module provides functions to retrieve a list of schools from the database.
 * The following operation is supported:
 * - Get a list of all schools
 *
 * Each function uses the Mongoose model `School` to interact with the MongoDB collection
 * storing school information. All functions are asynchronous and use `express-async-handler`
 * to handle exceptions within async routes. Errors are properly handled and returned to the client
 * with appropriate status codes.
 *
 * @module schoolController
 * @requires express-async-handler
 * @requires ../models/schoolModel
 * @throws {Error} Throws a 404 error if no schools are found.
 * @returns {Promise<void>} A promise that resolves when the operation is successfully completed.
 */

const asyncHandler = require("express-async-handler");
const School = require("../models/schoolModel");

/**
 * @desc    Get a list of all schools
 * @route   GET /api/schools
 * @access  Private
 * @function getSchools
 * @async
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the list of schools is retrieved and sent in the response.
 * @throws {Error} Throws a 404 error if no schools are found.
 */
const getSchools = asyncHandler(async (req, res) => {
  // const response = await fetch("../SearchResults.json");
  // const data = await response.json();

  const schools = await School.find();
  if (!schools) {
    res.status(404).json({ message: "Schools not found" });
  }
  res.status(200).json(schools);
});

module.exports = {
  getSchools,
};
