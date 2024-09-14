/**
 * @file schoolRoutes.js
 * @description Express routes for managing schools, including retrieving a list of schools.
 * @module schoolRoutes
 * @requires express
 * @requires ../controllers/schoolController
 */

const express = require("express");
const router = express.Router();
const { getSchools } = require("../controllers/schoolController");

router.route("/").get(getSchools);

module.exports = router;
