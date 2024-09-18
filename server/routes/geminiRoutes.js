const express = require("express");
const router = express.Router();
const { generateText } = require("../controllers/geminiController");

router.route("/generateText").post(generateText);

module.exports = router;
