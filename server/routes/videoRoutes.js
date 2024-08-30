/**
 * @file videoRoutes.js
 * @description Express routes for managing videos, including retrieving, creating, and updating video records.
 * @module videoRoutes
 * @requires express
 * @requires ../controllers/videoController
 */

const express = require("express");
const router = express.Router();
const {
  getVideo,
  createVideo,
  updateVideo,
} = require("../controllers/videoController");

router.route("/:id").get(getVideo);

router.post("/", createVideo);

router.route("/:id").put(updateVideo);

module.exports = router;
