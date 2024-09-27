/**
 * @file unitModel.js
 * @description Mongoose model for the Unit Details collection. This schema defines the structure for unit documents, including nested lesson schema, which allows for hierarchical lesson content within each unit.
 * @module unitModel
 * @requires mongoose
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @typedef {Object} Lesson
 * @property {string} id - The unique identifier for the lesson.
 * @property {string} icon - The icon associated with the lesson.
 * @property {string} title - The title of the lesson.
 * @property {Object} tooltip - An object containing tooltip information.
 * @property {string} tooltip.content - The content of the tooltip.
 * @property {Lesson[]} children - An array of child lessons, allowing for nested lesson structures.
 */
const LessonSchema = new Schema({
  id: String,
  icon: String,
  title: String,
  tooltip: {
    content: String,
  },
  children: [this],
  type: String,
});

/**
 * @typedef {Object} Unit
 * @property {ObjectId} _id - The unique identifier for the unit (automatically generated).
 * @property {Lesson[]} data - An array of lesson objects associated with the unit.
 * @property {number} numberOfLessons - The total number of lessons in the unit.
 */
const UnitSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true }, // Automatically generate ObjectId
  data: [LessonSchema],
  numberOfLessons: Number,
});

module.exports = mongoose.model("unit_details", UnitSchema);
