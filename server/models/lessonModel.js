/**
 * @file lessonModel.js
 * @description Mongoose model for the Lessons collection. This schema defines the structure for lesson documents, including nested content schema, which allows for various types of content to be associated with each lesson.
 * @module lessonModel
 * @requires mongoose
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @typedef {Object} Content
 * @property {string} type - The type of content (e.g., text, image, list).
 * @property {string} heading - The heading for the content section.
 * @property {string} [text] - Optional text content.
 * @property {string} [imageSrc] - Optional source path for a single image.
 * @property {string[]} [imageSrcs] - Optional array of source paths for multiple images.
 * @property {string[]} [points] - Optional array of bullet points or list items.
 */
const contentSchema = new mongoose.Schema({
  type: String,
  heading: String,
  text: { type: String, required: false },
  imageSrc: { type: String, required: false },
  imageSrcs: { type: [String], required: false },
  points: { type: [String], required: false },
});

/**
 * @typedef {Object} Lesson
 * @property {ObjectId} _id - The unique identifier for the lesson (automatically generated).
 * @property {string} title - The title of the lesson.
 * @property {string} desc - The description of the lesson.
 * @property {Content[]} content - An array of content objects associated with the lesson.
 */
const lessonSchema = mongoose.Schema({
  _id: { type: Schema.Types.ObjectId, auto: true }, // Automatically generate ObjectId
  title: String,
  desc: String,
  content: [contentSchema],
});

module.exports = mongoose.model("lessons", lessonSchema);
