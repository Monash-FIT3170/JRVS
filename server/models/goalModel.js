/**
 * @file goalModel.js
 * @description Mongoose model for the Goal collection. This schema defines the structure for goal documents stored in the database, including fields for text and automatic timestamp generation.
 * @module goalModel
 * @requires mongoose
 */

const mongoose = require("mongoose");

/**
 * @typedef {Object} Goal
 * @property {string} text - The text description of the goal.
 * @property {Date} createdAt - Timestamp when the goal was created (automatically generated).
 * @property {Date} updatedAt - Timestamp when the goal was last updated (automatically generated).
 */
const goalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Goal", goalSchema);
