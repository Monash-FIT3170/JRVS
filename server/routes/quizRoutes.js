/**
 * @file quizRoutes.js
 * @description Express routes for managing quizzes, including retrieving and updating quiz details.
 * @module quizRoutes
 * @requires express
 * @requires ../controllers/quizController
 */

const express = require("express");
const router = express.Router();
const {
  getQuiz,
  setQuiz,
  updateQuiz,
} = require("../controllers/quizController");

router.route("/:id").get(getQuiz);
router.route("/:id").put(updateQuiz);

module.exports = router;
