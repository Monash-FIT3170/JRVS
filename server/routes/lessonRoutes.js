/**
 * @file lessonRoutes.js
 * @description Express routes for managing lessons, including retrieving and updating lesson details.
 * @module lessonRoutes
 * @requires express
 * @requires ../controllers/lessonController
 */

const express = require("express");
const router = express.Router();
const { getLesson, updateLesson } = require("../controllers/lessonController");

router.route("/:id").get(getLesson);
router.route("/:id").put(updateLesson);

module.exports = router;
