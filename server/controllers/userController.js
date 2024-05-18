const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const crypto = require('crypto');


//functions for encryption and decryption
const encrypt = (text) => {
    const key = process.env.ENCRYPTION_KEY;
    const iv = process.env.ENCRYPTION_IV;
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv));
    let encrypted = cipher.update(text.toString()); // Ensure text is a string
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
};

const decrypt = (text) => {
    const key = process.env.ENCRYPTION_KEY;
    const iv = process.env.ENCRYPTION_IV;
    const encryptedText = Buffer.from(text, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv));
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};

// Create a new user
const createUser = asyncHandler(async (req, res) => {
    const { username } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Encrypt initial points (0)
    const encryptedPoints = encrypt('0');

    const user = await User.create({ username, points: encryptedPoints });
    res.status(201).json(user);
});

// Update user points
const updatePoints = asyncHandler(async (req, res) => {
    console.log('Request Body:', req.body);
    const { username } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

  

    // Decrypt current points
    let decryptedPoints = parseInt(decrypt(user.points), 10);
    decryptedPoints += 100;  // Increase points by 100
    user.points = encrypt(decryptedPoints.toString()); // Encrypt 

    await user.save();

    res.status(200).json({
        message: "Points updated successfully",
        username: user.username,
        points: decryptedPoints  // Decrypt
    });
});

// Fetch specific user data
const getUser = asyncHandler(async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }


    const decryptedPoints = parseInt(decrypt(user.points), 10);

    res.json({ ...user._doc, points: decryptedPoints });
});

module.exports = {
    createUser,
    updatePoints,
    getUser
};
