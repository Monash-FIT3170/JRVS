/**
 * @file badgeModel.js
 * @description Mongoose model for the Badge collection. This schema defines the structure for badge documents stored in the database, including fields for name, description, and image path.
 * @module badgeModel
 * @requires mongoose
 */

const mongoose = require("mongoose");

/**
 * @typedef {Object} Badge
 * @property {string} name - The name of the badge.
 * @property {string} description - A brief description of the badge.
 * @property {string} imagePath - The path to the image representing the badge.
 */
const badgeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String, // Binary data of the image
    required: true, // Mime type of the image
  },
});

module.exports = mongoose.model("Badge", badgeSchema);
