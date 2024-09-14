/**
 * @file userController.js
 * @description Handles user-related operations for the API.
 *
 * This module provides functions to manage user accounts and their associated data.
 * The following operations are supported:
 * - Create a new user
 * - Update user points
 * - Fetch user data by username or ID
 * - Update user avatar, border, and background
 * - Update user personal details
 * - Update unlocked avatars, borders, and backgrounds
 * - Add badges to user profiles
 * - Fetch all users or specific student data
 * - Retrieve the profile of the currently logged-in user
 * - Allow a student to join a teacher using a sharable code
 * - Update the user password
 *
 * Each function uses the Mongoose models (`userModel`, `xpModel`) to interact with MongoDB
 * collections storing user and experience data. Functions are asynchronous and use
 * `express-async-handler` to handle exceptions within async routes. Encryption and decryption
 * operations are managed using the `crypto` module. Errors are handled and returned to the
 * client with appropriate status codes.
 *
 * @module userController
 * @requires express-async-handler
 * @requires mongoose
 * @requires crypto
 * @requires ../models/userModel
 * @requires ../models/xpModel
 * @requires ../utils/levelUtils
 * @throws {Error} Throws errors for encryption/decryption failures, user not found, invalid inputs,
 *                  or issues with user operations.
 * @returns {Promise<void>} A promise that resolves when the operation is successfully completed.
 */

const mongoose = require("mongoose");

// controllers/userController.js
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const XP = require("../models/xpModel");
const crypto = require("crypto");
const { calculateLevel } = require("../utils/levelUtils");
const userUnitProgressModel = require("../models/userUnitProgressModel");

/**
 * Encrypts a given text using AES-256-CBC encryption.
 *
 * @param {string} text - The text to encrypt.
 * @returns {string} The encrypted text in hexadecimal format.
 * @throws {Error} If encryption fails.
 */
const encrypt = (text) => {
  try {
    const key = Buffer.from(process.env.ENCRYPTION_KEY);
    const iv = Buffer.from(process.env.ENCRYPTION_IV);
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Encryption failed");
  }
};

/**
 * Decrypts a given text using AES-256-CBC decryption.
 *
 * @param {string} text - The encrypted text in hexadecimal format.
 * @returns {string} The decrypted text.
 * @throws {Error} If decryption fails.
 */
const decrypt = (text) => {
  if (!text || text.length < 2) {
    return "0"; // Handle this scenario appropriately
  }
  try {
    const key = Buffer.from(process.env.ENCRYPTION_KEY);
    const iv = Buffer.from(process.env.ENCRYPTION_IV);
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(text, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Decryption failed");
  }
};

/**
 * Creates a new user in the database.
 *
 * @route POST /users
 * @access Public
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createUser = asyncHandler(async (req, res) => {
  const { username } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Encrypt initial points (0)
  const initialPoints = "0";
  const encryptedPoints = encrypt(initialPoints); // Encrypt the initial points

  const user = await User.create({ username, points: encryptedPoints });

  res.status(201).json(user);
});

//Update user points
// const updatePoints = asyncHandler(async (req, res) => {
//     const { username, newCoins } = req.body;
//     const user = await User.findOne({ username });
//     if (!user) {
//         return res.status(404).json({ message: "User not found" });
//     }

//     const encryptedPoints = encrypt(newCoins.toString());
//     user.points = encryptedPoints;
//     await user.save();

//     res.status(200).json({
//         message: "Points updated successfully",
//         username: user.username,
//         points: decrypt(encryptedPoints)
//     });
// });

/**
 * Updates the points of a user.
 *
 * @route PUT /users/points
 * @access Private
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updatePoints = asyncHandler(async (req, res) => {
  const { newPoints } = req.body;
  const user = req.user; // Get the logged-in user from the middleware

  // Decrypt the existing points
  const decryptedPoints = parseInt(decrypt(user.points), 10);

  // Add the new points to the decrypted points
  const updatedPoints = decryptedPoints + newPoints;

  // Convert the updated points total to string and encrypt it
  const strUpdatedPoints = updatedPoints.toString();
  const encryptedPoints = encrypt(strUpdatedPoints);

  // Update the user's points
  user.points = encryptedPoints;
  await user.save();

  if (newPoints > 0) {
    // if the new points is negative then don't add xp entries
    // Create a new XP entry for the user with timestamp
    const xpEntry = new XP({
      userId: user._id,
      amount: newPoints,
    });
    await xpEntry.save();

    // Calculate total XP for the user
    const totalXP = await XP.aggregate([
      { $match: { userId: user._id } },
      { $group: { _id: null, totalXP: { $sum: "$amount" } } },
    ]);

    // Calculate the user's level based on the total XP
    const level = calculateLevel(totalXP[0]?.totalXP || 0);
    user.level = level;
    await user.save();
  }

  res.status(200).json({
    message: "Points updated successfully",
    username: user.username,
    points: updatedPoints, // Optionally return decrypted updated points for immediate frontend update
    level: user.level, // Return the updated level
  });
});

// @desc    Update Unit Progress
// @route   POST /api/users/updateUnitProgress
// @access  Private
const updateUnitProgress = asyncHandler(async (req, res) => {
  userUnitProgressModel.get();
  // try {
  //     const { unitId } = req.params;
  //     const { lessonId } = req.body;
  //     const user = req.user; // Get the logged-in user from the middleware

  //     // Find the unit object in the assignedUnits array
  //     const userAssignedUnits = user['assignedUnits']
  //     // const unitToUpdate = userAssignedUnits.find(unit => unit.unitId == unitId);
  //     const unitIndex = user.assignedUnits.findIndex(unit => unit.unitId == unitId);

  //     console.log(user.assignedUnits[unitIndex].lessonsCompleted)

  //     if (unitIndex !== -1) {

  //         // Check if lessonId is already in lessonsCompleted
  //         if (!user.assignedUnits[unitIndex].lessonsCompleted.includes(lessonId)) {
  //             // Add the lessonId to the lessonsCompleted array

  //             user.assignedUnits[unitIndex].lessonsCompleted.push(lessonId);
  //             console.log(user.assignedUnits[unitIndex].lessonsCompleted)
  //         }

  //     // if (unitToUpdate) {
  //     //     // Increment the lessonsCompleted
  //     //     unitToUpdate.lessonsCompleted += 1;

  //         // Save the updated user object to the database
  //         user.markModified('assignedUnits');
  //         await user.save();

  //         // Send a success response
  //         res.status(200).json({ message: 'Unit progress updated successfully.' });
  //     } else {
  //         // If the unitId does not exist in assignedUnits
  //         res.status(404).json({ message: 'Unit not found in assignedUnits.' });
  //     }
  // } catch (error) {
  //     // Handle errors
  //     res.status(500).json({ message: 'Server error.', error });
  //     console.log(error)
  // }
});

/**
 * Fetches a specific user's data by username.
 *
 * @route GET /users/:username
 * @access Public
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getUserByUsername = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const decryptedPoints = decrypt(user.points);
  res.json({ ...user._doc, points: decryptedPoints });
});

/**
 * Fetches a specific user's data by ID.
 *
 * @route GET /users/id/:id
 * @access Public
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const decryptedPoints = decrypt(user.points);
  res.json({ ...user._doc, points: decryptedPoints });
});

/**
 * Updates a user's avatar, border, and background.
 *
 * @route PUT /users/avatar
 * @access Private
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateAvatar = asyncHandler(async (req, res) => {
  const { username, avatar, border, background } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.avatar = avatar;
  user.border = border;
  user.background = background;
  await user.save();
});

/**
 * Updates a user's personal details.
 *
 * @route PUT /users/details
 * @access Private
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateDetails = asyncHandler(async (req, res) => {
  const {
    firstname,
    lastname,
    username,
    newUsername,
    email,
    school,
    password,
  } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.username = newUsername;
  user.firstname = firstname;
  user.lastname = lastname;
  user.email = email;
  user.school = school;
  await user.save();

  return res.status(200).json({ message: "User details updated successfully" });
});

/**
 * Updates the unlocked avatars, borders, and backgrounds for a user.
 *
 * @route PUT /users/unlocked
 * @access Private
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateUnlocked = asyncHandler(async (req, res) => {
  const { username, unlockedAvatars, unlockedBorders, unlockedBackgrounds } =
    req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const avatarSet = new Set([...unlockedAvatars, ...user.unlockedAvatars]);
  user.unlockedAvatars = [...avatarSet];
  const borderSet = new Set([...unlockedBorders, ...user.unlockedBorders]);
  user.unlockedBorders = [...borderSet];
  const backgroundSet = new Set([
    ...unlockedBackgrounds,
    ...user.unlockedBackgrounds,
  ]);
  user.unlockedBackgrounds = [...backgroundSet];
  await user.save();
});

/**
 * Adds a new badge to a user's profile.
 *
 * @route POST /users/badges
 * @access Private
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const addBadge = asyncHandler(async (req, res) => {
  const { username, newBadgeId } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const newBadge = { id: newBadgeId, timeAchieved: new Date() };
  const badges = new Set([newBadge, ...user.badges]);
  user.badges = [...badges];
  await user.save();
});

/**
 * Fetches all users from the database, returning specific fields.
 *
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object used to return user data.
 * @returns {Promise<void>} A promise that resolves when all users are fetched.
 */
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}, "username _id school"); // Select only username, _id, and school fields
    const userData = users.map((user) => ({
      id: user._id,
      username: user.username,
      school: user.school,
    }));
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Fetches specific student data based on provided student IDs.
 *
 * @async
 * @param {Object} req - The request object, containing student IDs.
 * @param {Object} res - The response object used to return student data.
 * @returns {Promise<void>} A promise that resolves when student data is fetched.
 */
const getStudents = asyncHandler(async (req, res) => {
  const { studentIds } = req.body; // Assuming studentIds are sent in the request body
  console.log(studentIds);

  if (!studentIds || !Array.isArray(studentIds)) {
    return res.status(404).json({ message: "Invalid or missing student IDs" });
  }

  try {
    const students = await User.find({ _id: { $in: studentIds } });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Retrieves the profile of the currently logged-in user.
 *
 * @param {Object} req - The request object, containing user data.
 * @param {Object} res - The response object used to return the user profile.
 */
const getProfile = (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Allows a student to join a teacher using a sharable code.
 *
 * @async
 * @param {Object} req - The request object, containing the sharable code.
 * @param {Object} res - The response object used to return the join status.
 * @returns {Promise<void>} A promise that resolves when the student joins the teacher.
 */
const joinTeacher = asyncHandler(async (req, res) => {
  const { sharableCode } = req.body;
  const studentId = req.user._id;

  // Find teacher by sharableCode
  const teacher = await User.findOne({ sharableCode, usertype: "teacher" });
  if (!teacher) {
    return res.status(404).json({ error: "Invalid teacher code" });
  }

  if (teacher.students.includes(studentId)) {
    return res.status(400).json({ error: "Already part of this teacher" });
  }

  // Update student's teacherId
  const student = await User.findById(studentId);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  student.teacherId = teacher._id;

  // Add student to teacher's students array
  teacher.students.push(student._id);

  await student.save();
  await teacher.save();

  res.status(200).json({ message: "Successfully joined the teacher" });
});

/**
 * Updates the password for a user after verifying the old password.
 *
 * @async
 * @param {Object} req - The request object, containing username, old password, and new password.
 * @param {Object} res - The response object used to return the update status.
 * @returns {Promise<void>} A promise that resolves when the password is updated.
 */
const updatePassword = asyncHandler(async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Verify old password
  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) {
    return res.status(400).send("Invalid password");
  }

  user.password = newPassword;
  await user.save();

  return res.status(200).json({ message: "Password changed successfully" });
});

module.exports = {
  createUser,
  updatePoints,
  getUserByUsername,
  getUserById,
  updateAvatar,
  updateDetails,
  updateUnlocked,
  getAllUsers,
  getProfile,
  joinTeacher,
  updatePassword,
  getStudents,
  addBadge,
  updateUnitProgress,
};
