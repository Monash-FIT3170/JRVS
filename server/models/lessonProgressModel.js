/**
 * @file lessonProgressModel.js
 * @description Mongoose model for the Lesson Progress collection. This schema defines the structure for tracking user progress in lessons, including fields for user ID, lesson ID, last accessed section, progress percentage, and completion status.
 * @module lessonProgressModel
 * @requires mongoose
 */
const mongoose = require("mongoose");

/**
 * @typedef {Object} LessonProgress
 * @property {string} userId - The ID of the user associated with this lesson progress.
 * @property {string} lessonId - The ID of the lesson being tracked.
 * @property {number} lastSectionIndex - The index of the last section the user accessed in the lesson.
 * @property {number} progressNum - A numeric representation of the user's progress in the lesson.
 * @property {boolean} isCompleted - Indicates whether the lesson has been completed by the user.
 */
const lessonProgressSchema = mongoose.Schema({
  userId: String,
  lessonId: String,
  lastSectionIndex: Number,
  progressNum: Number,
  isCompleted: Boolean,
});

module.exports = mongoose.model("lessonProgress", lessonProgressSchema);
