/**
 * @file userUnitProgressRoutes.js
 * @description Express routes for managing user unit progress, including retrieving, updating, and creating progress records.
 * @module userUnitProgressRoutes
 * @requires express
 * @requires ../controllers/userUnitProgressController
 */

const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();
const {
  getUserUnitProgress,
  updateUserUnitProgress,
  createUserUnitProgress,
  getAllUnitsProgressForUser,
} = require("../controllers/userUnitProgressController");

router.get("/", authenticate, getAllUnitsProgressForUser);
router.get("/:unitId", authenticate, getUserUnitProgress);
router.put("/:unitId", authenticate, updateUserUnitProgress);
router.post("/:unitId", authenticate, createUserUnitProgress);

module.exports = router;
