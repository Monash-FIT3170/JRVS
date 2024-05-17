// controllers/userController.js
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// Create a new user
const createUser = asyncHandler(async (req, res) => {
    const { username } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user with given username and default points
    const user = await User.create({ username });

    res.status(201).json(user);
});

// Update user points
const updatePoints = asyncHandler(async (req, res) => {
    const { username } = req.body;

    // Find user and update their points
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.points += 100;  // Increase points by 100
    await user.save();

    res.status(200).json({
        message: "Points updated successfully",
        username: user.username,
        points: user.points
    });
});

// Fetch specific user data
const getUser = asyncHandler(async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
});

module.exports = {
    createUser,
    updatePoints,
    getUser
};
