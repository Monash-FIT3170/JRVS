/**
 * @file authRoutes.js
 * @description Express routes for user authentication, including registration, login, and retrieving the current user from a JWT token.
 * @module authRoutes
 * @requires express
 * @requires jsonwebtoken
 * @requires ../models/userModel
 * @requires crypto
 */

const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const crypto = require("crypto");

const router = express.Router();

/**
 * @route POST /register
 * @description Register a new user.
 * @access Public
 * @param {Object} req.body - The user details for registration.
 * @returns {Object} A response object containing a success message or error details.
 */
router.post("/register", async (req, res) => {
  if (!req.body.usertype) {
    return res.status(400).json({ error: "Please select a usertype" });
  }
  if (!req.body.username) {
    return res.status(400).json({ error: "Please provide a username" });
  }

  if (!req.body.firstname) {
    return res.status(400).json({ error: "Please provide a firstname" });
  }

  if (!req.body.lastname) {
    return res.status(400).json({ error: "Please provide a lastname" });
  }

  if (!req.body.email) {
    return res.status(400).json({ error: "Please provide an email" });
  }

  if (!req.body.school) {
    return res.status(400).json({ error: "Please provide a school" });
  }

  if (!req.body.password) {
    return res.status(400).json({ error: "Please provide a password" });
  }

  const { usertype, username, firstname, lastname, email, school, password } =
    req.body;

  try {
    // Prepare the user data
    let userData = {
      usertype,
      username,
      firstname,
      lastname,
      email,
      school,
      password,
      points: 0,
      avatar: "_default.png",
      border: "_default.png",
      background: "_default.png",
      unlockedAvatars: ["_default.png"],
      unlockedBorders: ["_default.png"],
      unlockedBackgrounds: ["_default.png"],
    };

    if (usertype === "teacher") {
      userData.sharableCode = crypto.randomBytes(3).toString("hex");
    }

    // Create and save the user
    const user = new User(userData);
    await user.save();

    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error creating user" });
  }
});

/**
 * @route POST /login
 * @description Authenticate a user and generate a JWT token.
 * @access Public
 * @param {Object} req.body - The username and password for login.
 * @returns {Object} A response object containing the JWT token or error details.
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send("Invalid username or password");
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).send("Invalid username or password");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(500).send("Server error");
  }
});

/**
 * @route POST /current
 * @description Verify and decode the JWT token to retrieve the current user.
 * @access Public
 * @param {Object} req.body - The JWT token to be verified.
 * @returns {Object} A response object containing the decoded token information.
 */
router.post("/current", async (req, res) => {
  const { token } = req.body;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  res.json({ decoded });
});

module.exports = router;
