/**
 * @file goalRoutes.js
 * @description Express routes for managing goals, including retrieving, creating, updating, and deleting goals.
 * @module goalRoutes
 * @requires express
 * @requires ../controllers/goalController
 */

const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

router.route("/").get(getGoals).post(setGoal);

router.route("/:id").delete(deleteGoal).put(updateGoal);

module.exports = router;
