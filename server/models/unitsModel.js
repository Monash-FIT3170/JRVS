/**
 * @file unitsModel.js
 * @description Mongoose model for the Units collection. This schema defines the structure for unit documents stored in the database, including fields for the number of lessons, color, icon, and title.
 * @module unitsModel
 * @requires mongoose
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @typedef {Object} Unit
 * @property {number} numberOfLessons - The total number of lessons in the unit.
 * @property {string} colour - The color associated with the unit.
 * @property {string} icon - The icon representing the unit.
 * @property {string} title - The title of the unit.
 */
const UnitsSchema = new Schema({
  // _id: { type: Schema.Types.ObjectId, auto: true }, // Automatically generate ObjectId
  numberOfLessons: Number,
  colour: String,
  icon: String,
  title: String,
});

module.exports = mongoose.model("units", UnitsSchema);
