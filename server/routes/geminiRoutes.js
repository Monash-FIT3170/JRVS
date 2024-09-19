const express = require("express");
const router = express.Router();
const {
  generateText,
  generateImage,
} = require("../controllers/geminiController");

router.route("/generateText").post(generateText);
router.route("/generateImage").post(generateImage);

module.exports = router;
