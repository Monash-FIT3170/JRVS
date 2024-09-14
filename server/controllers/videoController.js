/**
 * @file videoController.js
 * @description This file contains the controller functions for managing videos, including retrieving,
 * creating, and updating video entries in the database. It utilizes the video model for database operations
 * and includes input validation and error handling.
 * @requires express-async-handler - Middleware for handling exceptions inside async Express routes.
 * @requires ../models/videoModel - Mongoose model for videos.
 *
 * @module videoController
 * @throws {Error} Throws errors for video not found, validation failures, or issues with video operations.
 * @returns {Promise<void>} A promise that resolves when the operation is successfully completed.
 */

const asyncHandler = require("express-async-handler");
const videoModel = require("../models/videoModel");

/**
 * Retrieves a video by its ID.
 *
 * @async
 * @param {Object} req - The request object containing the video ID in the parameters.
 * @param {Object} res - The response object used to return the video data or an error message.
 * @returns {Promise<void>} A promise that resolves when the video data is fetched.
 */
const getVideo = asyncHandler(async (req, res) => {
  const videoId = req.params.id;
  const video = await videoModel.findById(videoId);

  if (!video) {
    res.status(404).json({ message: "Video not found" });
  } else {
    res.status(200).json(video);
  }
});

/**
 * Creates a new video entry in the database.
 *
 * @async
 * @param {Object} req - The request object containing video details (title, url, heading) in the body.
 * @param {Object} res - The response object used to return the created video data or an error message.
 * @returns {Promise<void>} A promise that resolves when the new video is created.
 */
const createVideo = asyncHandler(async (req, res) => {
  const { title, url, heading } = req.body;

  // Validate input
  if (!title || !url || !heading) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    // Create a new video document
    const newVideo = new videoModel({ title, url, heading });
    // Save it to the database
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create video", error: error.message });
  }
});

/**
 * Updates an existing video entry in the database.
 *
 * @async
 * @param {Object} req - The request object containing the video ID in the parameters and updated video details in the body.
 * @param {Object} res - The response object used to return the updated video data or an error message.
 * @returns {Promise<void>} A promise that resolves when the video data is updated.
 */
const updateVideo = asyncHandler(async (req, res) => {
  const videoId = req.params.id;
  const { title, url, heading } = req.body;

  const video = await videoModel.findById(videoId);

  if (!video) {
    res.status(404).json({ message: "Video not found" });
  } else {
    video.title = title;
    video.heading = heading;
    video.url = url;
    await video.save();
    res.status(200).json(video);
  }
});

module.exports = {
  getVideo,
  createVideo,
  updateVideo,
};
