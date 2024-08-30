/**
 * @file userUnitProgressRoutes.js
 * @description Express routes for managing user unit progress, including retrieving, updating, and creating progress records.
 * @module userUnitProgressRoutes
 * @requires express
 * @requires ../controllers/userUnitProgressController
 */

const express = require("express");
const router = express.Router();
const {
  getUserUnitProgress,
  updateUserUnitProgress,
  createUserUnitProgress,
} = require("../controllers/userUnitProgressController");

router.route("/:userId/:unitId").get(getUserUnitProgress);
router.route("/:userId/:unitId").put(updateUserUnitProgress);
router.route("/:userId/:unitId").post(createUserUnitProgress);

module.exports = router;
