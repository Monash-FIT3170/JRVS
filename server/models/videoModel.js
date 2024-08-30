/**
 * @file videoModel.js
 * @description Mongoose model for the Videos collection. This schema defines the structure for video documents, including fields for the video's title, heading, and URL.
 * @module videoModel
 * @requires mongoose
 */
const mongoose = require("mongoose");

/**
 * @typedef {Object} Video
 * @property {string} title - The title of the video.
 * @property {string} heading - The heading or description of the video.
 * @property {string} url - The URL where the video can be accessed.
 */
const videoSchema = mongoose.Schema({
  title: String,
  heading: String,
  url: String,
});

module.exports = mongoose.model("videos", videoSchema);
