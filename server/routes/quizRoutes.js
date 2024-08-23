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
