/**
 * @file xpRoutes.js
 * @description Express routes for managing experience points (XP), including adding XP, retrieving XP within a period, and getting the leaderboard.
 * @module xpRoutes
 * @requires express
 * @requires ../controllers/xpController
 * @requires ../middleware/authMiddleware
 */

const express = require("express");
const router = express.Router();
const {
  addXP,
  getXPWithinPeriod,
  getLeaderboard,
} = require("../controllers/xpController");
const authenticate = require("../middleware/authMiddleware"); // Import the authenticate middleware

router.route("/").post(addXP);
router.route("/get-xp-within-period").get(getXPWithinPeriod);
router.route("/leaderboard").get(authenticate, getLeaderboard); // Uses authentication middleware to get the logged in user

module.exports = router;
