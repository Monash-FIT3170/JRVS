const express = require("express");
const router = express.Router();
const {
  generateText,
  generateImage,
  generateImageVision,
} = require("../controllers/genAIController");

router.route("/generateText").post(generateText);
router.route("/generateImage").post(generateImage);
router.route("/generateImageVision").post(generateImageVision);

module.exports = router;
