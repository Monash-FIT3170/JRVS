/**
 * @file xpController.js
 * @description This file contains the controller functions for managing experience points (XP) for users.
 * It provides functionality for adding XP, retrieving XP within a specified period, and generating leaderboards.
 * The file uses the XP and User models for database interactions and includes error handling for various operations.
 *
 * @requires ../models/xpModel - Mongoose model for experience points.
 * @requires ../models/userModel - Mongoose model for users.
 * @requires ../utils/levelUtils - Utility functions for calculating user levels.
 *
 * @module xpController
 * @throws {Error} Throws errors for user not found, validation issues, or problems with database operations.
 * @returns {Promise<void>} A promise that resolves when the operation is successfully completed.
 */

const XP = require("../models/xpModel");
const User = require("../models/userModel");
const { calculateLevel } = require("../utils/levelUtils");

/**
 * Adds XP for the requesting user and updates their level.
 *
 * @async
 * @param {Object} req - The request object, containing the XP amount in the body and user information from authentication.
 * @param {Object} res - The response object used to return the created XP entry and updated user level or an error message.
 * @returns {Promise<void>} A promise that resolves when the XP is added and the user's level is updated.
 */
const addXP = async (req, res) => {
  try {
    // Retrieve the requesting user from the request
    const requestingUser = req.user;

    if (!requestingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const { amount } = req.body;
    const userId = requestingUser._id;

    // Create a new XP entry
    const xpEntry = new XP({ userId, amount });
    await xpEntry.save();

    // Calculate total XP for the user
    const totalXP = await XP.aggregate([
      { $match: { userId: userId } },
      { $group: { _id: null, totalXP: { $sum: "$amount" } } },
    ]);

    const level = calculateLevel(totalXP[0]?.totalXP || 0);
    requestingUser.level = level;
    await requestingUser.save();

    res.status(200).json({ xpEntry, level });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Retrieves the total XP earned by the requesting user within a specified period.
 *
 * @async
 * @param {Object} req - The request object, containing startDate and endDate query parameters, and user information from authentication.
 * @param {Object} res - The response object used to return the total XP and XP entries within the period or an error message.
 * @returns {Promise<void>} A promise that resolves when the total XP and XP entries are retrieved.
 */
const getXPWithinPeriod = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const requestingUser = req.user;

    if (!requestingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const userId = requestingUser._id;

    // Retrieve XP entries within the period for the user
    const xpEntries = await XP.find({
      userId,
      timestamp: { $gte: start, $lte: end },
    });

    const totalXP = xpEntries.reduce((total, entry) => total + entry.amount, 0);

    res.status(200).json({ totalXP, xpEntries });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Retrieves the leaderboard of users based on XP earned within a specified period.
 *
 * @async
 * @param {Object} req - The request object, containing startDate, endDate, and userGroup query parameters, and user information from authentication.
 * @param {Object} res - The response object used to return the leaderboard or an error message.
 * @returns {Promise<void>} A promise that resolves when the leaderboard data is retrieved.
 */
const getLeaderboard = async (req, res) => {
  try {
    const { startDate, endDate, userGroup } = req.query;
    const start = new Date(startDate);
    const end = new Date(endDate);

    let users;

    if (userGroup === "school" || userGroup === "class") {
      // Get the user's school from the user making the request
      const requestingUser = req.user;
      if (!requestingUser) {
        return res.status(404).json({ error: "User not found" });
      }
      const school = requestingUser.school;

      // If the user's school is available, filter for that school's users
      if (school) {
        const schoolExists = await User.exists({ school });
        if (!schoolExists) {
          return res.status(404).json({ error: "School not found" });
        }
        users = await User.find({ school });
      } else {
        return res
          .status(404)
          .json({ error: "School not found for the requesting user" });
      }
    } else {
      // Fetch all users if userGroup is 'all'
      users = await User.find();
    }

    const userIds = users.map((user) => user._id);

    // Left join to include all users, even those without XP entries
    const xpEntries = await User.aggregate([
      { $match: { _id: { $in: userIds } } },
      {
        $lookup: {
          from: "xps",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$userId", "$$userId"] },
                    { $gte: ["$timestamp", start] },
                    { $lte: ["$timestamp", end] },
                  ],
                },
              },
            },
            { $group: { _id: "$userId", totalXP: { $sum: "$amount" } } },
          ],
          as: "xpDetails",
        },
      },
      {
        $project: {
          username: 1,
          school: 1,
          totalXP: {
            $ifNull: [{ $arrayElemAt: ["$xpDetails.totalXP", 0] }, 0],
          },
        },
      },
      { $sort: { totalXP: -1 } },
    ]);

    res.status(200).json(xpEntries);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  addXP,
  getXPWithinPeriod,
  getLeaderboard,
};
