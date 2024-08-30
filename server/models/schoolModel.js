/**
 * @file schoolModel.js
 * @description Mongoose model for the School collection. This schema defines the structure for school documents stored in the database, including fields for the school name with uniqueness constraint and automatic timestamp generation.
 * @module schoolModel
 * @requires mongoose
 */

const mongoose = require("mongoose");

/**
 * @typedef {Object} School
 * @property {string} SchoolName - The name of the school (must be unique).
 * @property {Date} createdAt - Timestamp when the school record was created (automatically generated).
 * @property {Date} updatedAt - Timestamp when the school record was last updated (automatically generated).
 */
const schoolSchema = mongoose.Schema(
  {
    SchoolName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("School", schoolSchema);
