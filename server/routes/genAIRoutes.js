const express = require("express");
const router = express.Router();
const {
  generateText,
  generateImage,
  generateImageToImage,
  generateImageVision,
  geminiGenerateContent,
} = require("../controllers/genAIController");

router.route("/generateText").post(generateText);
router.route("/generateImage").post(generateImage);
router.route("/generateImageToImage").post(generateImageToImage);
router.route("/generateImageVision").post(generateImageVision);
router.route("/geminiGenerateContent").post(geminiGenerateContent);

module.exports = router;
