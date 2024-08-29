const express = require("express");
const router = express.Router();
const { getSchools } = require("../controllers/schoolController");

router.route("/").get(getSchools);

module.exports = router;
