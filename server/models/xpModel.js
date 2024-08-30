/**
 * @file xpModel.js
 * @description Mongoose model for the XP (Experience Points) collection. This schema defines the structure for experience points records, including fields for user ID, amount of XP, and a timestamp.
 * @module xpModel
 * @requires mongoose
 */
const mongoose = require("mongoose");

/**
 * @typedef {Object} XP
 * @property {ObjectId} userId - The ID of the user associated with the experience points.
 * @property {number} amount - The amount of experience points awarded.
 * @property {Date} timestamp - The date and time when the XP record was created (defaults to the current date and time).
 */
const xpSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("XP", xpSchema);
