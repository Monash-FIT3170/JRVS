const express = require("express");
const router = express.Router();
const {
  generateText,
  generateImage,
} = require("../controllers/genAIController");

router.route("/generateText").post(generateText);
router.route("/generateImage").post(generateImage);

module.exports = router;
