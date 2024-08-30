/**
 * @file lessonProgressController.js
 * @description Handles lesson progress-related operations for the API.
 *
 * This module provides functions to perform operations on lesson progress in the database.
 * The following operations are supported:
 * - Get lesson progress for a specific user and lesson
 * - Update lesson progress for a specific user and lesson
 * - Create lesson progress for a specific user and lesson
 *
 * Each function uses the Mongoose model `lessonProgressModel` to interact with the MongoDB collection
 * storing lesson progress information. All functions are asynchronous and use `express-async-handler`
 * to handle exceptions within async routes. Errors are properly handled and returned to the client
 * with appropriate status codes.
 *
 * @module lessonProgressController
 * @requires express-async-handler
 * @requires ../models/lessonProgressModel
 * @throws {Error} Throws an error if any operation fails (e.g., lesson progress not found, validation errors).
 * @returns {Promise<void>} A promise that resolves when the operation is successfully completed.
 */

const asyncHandler = require("express-async-handler");
const lessonProgressModel = require("../models/lessonProgressModel");

/**
 * @desc    Get lesson progress for a specific user and lesson
 * @route   GET /api/lessons/:lessonId/progress/:userId
 * @access  Private
 * @function getLessonProgress
 * @async
 * @param {Request} req - The request object containing user ID and lesson ID in the URL.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the lesson progress is retrieved and sent in the response.
 * @throws {Error} Throws a 404 error if the lesson progress for the specified user and lesson is not found.
 */
const getLessonProgress = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const lessonId = req.params.lessonId;
  const lessonProgress = await lessonProgressModel.findOne({
    userId: userId,
    lessonId: lessonId,
  });

  if (!lessonProgress) {
    res.status(404).json({ message: "Lesson progress not found" });
  } else {
    res.status(200).json(lessonProgress);
  }
});

/**
 * @desc    Update lesson progress for a specific user and lesson
 * @route   PUT /api/lessons/:lessonId/progress/:userId
 * @access  Private
 * @function updateLessonProgress
 * @async
 * @param {Request} req - The request object containing user ID and lesson ID in the URL, and updated progress data in the body.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the lesson progress is updated and sent in the response.
 * @throws {Error} Throws a 404 error if the lesson progress for the specified user and lesson is not found.
 */
const updateLessonProgress = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const lessonId = req.params.lessonId;
  const { lastSectionIndex, progressNum, isCompleted } = req.body;

  const lessonProgress = await lessonProgressModel.findOne({
    userId: userId,
    lessonId: lessonId,
  });

  if (!lessonProgress) {
    res.status(404).json({ message: "Lesson progress not found" });
  } else {
    lessonProgress.lastSectionIndex = lastSectionIndex;
    if (progressNum > lessonProgress.progressNum)
      lessonProgress.progressNum = progressNum;
    if (lessonProgress.isCompleted == false)
      lessonProgress.isCompleted = isCompleted;
    await lessonProgress.save();
    res.status(200).json(lessonProgress);
  }
});

/**
 * @desc    Create lesson progress for a specific user and lesson
 * @route   POST /api/lessons/:lessonId/progress/:userId
 * @access  Private
 * @function createLessonProgress
 * @async
 * @param {Request} req - The request object containing user ID and lesson ID in the URL, and progress data in the body.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the lesson progress is created and sent in the response.
 * @throws {Error} Throws a 404 error if lesson progress for the specified user and lesson already exists.
 */
const createLessonProgress = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const lessonId = req.params.lessonId;
  const { lastSectionIndex, progressNum, isCompleted } = req.body;
  let lessonProgress = await lessonProgressModel.findOne({
    userId: userId,
    lessonId: lessonId,
  });
  if (lessonProgress) {
    res.status(404).json({ message: "Lesson progress already exists" });
  } else {
    lessonProgress = new lessonProgressModel({
      userId: userId,
      lessonId: lessonId,
      lastSectionIndex: lastSectionIndex,
      progressNum: progressNum,
      isCompleted: isCompleted,
    });
    await lessonProgress.save();
    res.status(201).json(lessonProgress);
  }
});

module.exports = {
  getLessonProgress,
  updateLessonProgress,
  createLessonProgress,
};
