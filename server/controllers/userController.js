const mongoose = require('mongoose')

// controllers/userController.js
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const crypto = require('crypto');

const encrypt = (text) => {
    try {
        const key = Buffer.from(process.env.ENCRYPTION_KEY); 
        const iv = Buffer.from(process.env.ENCRYPTION_IV);   
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Encryption failed');
    }
};

const decrypt = (text) => {
    
    if (!text || text.length < 2) {
        return '0'; // Handle this scenario appropriately
    }
    try {
        const key = Buffer.from(process.env.ENCRYPTION_KEY);
        const iv = Buffer.from(process.env.ENCRYPTION_IV);
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decrypted = decipher.update(text, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Decryption failed');
    }
};

// Create a new user
const createUser = asyncHandler(async (req, res) => {
    const { username } = req.body;

   
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }


    // Encrypt initial points (0)
    const initialPoints = '0';  
    const encryptedPoints = encrypt(initialPoints);  // Encrypt the initial points

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

const updatePoints = asyncHandler(async (req, res) => {
    const { username, newPoints } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const strNewPoints = newPoints.toString(); // convert to string
    const encryptedPoints = encrypt(strNewPoints); // Encrypt the new points total
    user.points = encryptedPoints;
    await user.save();

    res.status(200).json({
        message: "Points updated successfully",
        username: user.username,
        points: newPoints  // Optionally return decrypted new points for immediate frontend update
    });
});

// Fetch specific user data by username
const getUserByUsername = asyncHandler(async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const decryptedPoints = decrypt(user.points);  
    res.json({ ...user._doc, points: decryptedPoints });
});

// Fetch specific user data by ID
const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const decryptedPoints = decrypt(user.points); 
    res.json({ ...user._doc, points: decryptedPoints });
});

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

const updateUnlocked = asyncHandler(async (req, res) => {
    const { username, unlockedAvatars, unlockedBorders, unlockedBackgrounds } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const avatarSet = new Set([...unlockedAvatars, ...user.unlockedAvatars]);
    user.unlockedAvatars = [...avatarSet];
    const borderSet = new Set([...unlockedBorders, ...user.unlockedBorders]);
    user.unlockedBorders = [...borderSet];
    const backgroundSet = new Set([...unlockedBackgrounds, ...user.unlockedBackgrounds]);
    user.unlockedBackgrounds = [...backgroundSet];
    await user.save();
});


module.exports = {
    createUser,
    updatePoints,
    getUserByUsername,
    getUserById,
    updateAvatar,
    updateUnlocked
};
