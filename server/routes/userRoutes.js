/**
 * @file userRoutes.js
 * @description Express routes for managing users, including creating users, updating user details, and retrieving user information.
 * @module userRoutes
 * @requires express
 * @requires ../middleware/authMiddleware
 * @requires ../controllers/userController
 */

const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware"); // Import the authenticate middleware
const {
  createUser,
  updatePoints,
  getUserByUsername,
  getUserById,
  updateAvatar,
  updateUnlocked,
  getAllUsers,
  addBadge,
  joinTeacher,
  updateDetails,
  updatePassword,
  getStudents,
} = require("../controllers/userController");

// Route to update user points
router.post("/", createUser);
router.post("/updatePoints", authenticate, updatePoints);
router.post("/updateAvatar", updateAvatar);
router.post("/updateUnlocked", updateUnlocked);
router.post("/addBadge", addBadge);
router.post("/student/join-teacher", authenticate, joinTeacher);
router.post("/updateDetails", updateDetails);
router.post("/updatePassword", updatePassword);
router.post("/getStudents", getStudents);
router.get("/:username", getUserByUsername);
router.get("/id/:id", getUserById);
router.get("/", getAllUsers);

module.exports = router;
