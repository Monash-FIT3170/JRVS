/**
 * @file lessonController.js
 * @description Handles lesson-related operations for the API.
 *
 * This module provides functions to perform operations on lessons in the database.
 * The following operations are supported:
 * - Get a specific lesson by ID
 * - Update an existing lesson
 *
 * Each function uses the Mongoose model `lessonModel` to interact with the MongoDB collection
 * storing lesson information. All functions are asynchronous and use `express-async-handler`
 * to handle exceptions within async routes. Errors are properly handled and returned to the client
 * with appropriate status codes.
 *
 * @module lessonController
 * @requires express-async-handler
 * @requires ../models/lessonModel
 * @throws {Error} Throws an error if any operation fails (e.g., lesson not found, validation errors).
 * @returns {Promise<void>} A promise that resolves when the operation is successfully completed.
 */

const asyncHandler = require("express-async-handler");
const lessonModel = require("../models/lessonModel");

/**
 * @desc    Get a specific lesson by ID
 * @route   GET /api/lessons/:id
 * @access  Private
 * @function getLesson
 * @async
 * @param {Request} req - The request object containing the lesson ID in the URL.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the lesson is retrieved and sent in the response.
 * @throws {Error} Throws a 404 error if the lesson with the given ID is not found.
 */
const getLesson = asyncHandler(async (req, res) => {
  const lessonId = req.params.id;
  const lesson = await lessonModel.findById(lessonId);

  if (!lesson) {
    res.status(404).json({ message: "Lesson not found" });
  } else {
    res.status(200).json(lesson);
  }
});

/**
 * @desc    Update an existing lesson
 * @route   PUT /api/lessons/:id
 * @access  Private
 * @function updateLesson
 * @async
 * @param {Request} req - The request object containing the lesson ID in the URL and updated data in the body.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the lesson is updated and sent in the response.
 * @throws {Error} Throws a 404 error if the lesson with the given ID is not found.
 */
const updateLesson = asyncHandler(async (req, res) => {
  const lessonId = req.params.id;
  const { title, desc, content } = req.body;

  const lesson = await lessonModel.findById(lessonId);

  if (!lesson) {
    res.status(404).json({ message: "Lesson not found" });
  } else {
    lesson.title = title;
    lesson.content = content;
    lesson.desc = desc;
    await lesson.save();
    res.status(200).json(lesson);
  }
});

module.exports = {
  getLesson,
  updateLesson,
};
