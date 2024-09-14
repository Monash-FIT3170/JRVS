/**
 * @file userProgressModel.js
 * @description Mongoose model for the User Progress collection. This schema defines the structure for tracking user progress in units, including fields for user ID, unit ID, and a list of completed lessons.
 * @module userProgressModel
 * @requires mongoose
 */
const mongoose = require("mongoose");

/**
 * @typedef {Object} UserProgress
 * @property {string} userId - The ID of the user associated with this progress record.
 * @property {string} unitId - The ID of the unit being tracked.
 * @property {string[]} completedLessons - An array of lesson IDs that the user has completed in the unit.
 */
const userUnitProgressSchema = mongoose.Schema({
  userId: String,
  unitId: String,
  completedLessons: [String],
});

module.exports = mongoose.model("user_progress", userUnitProgressSchema);
