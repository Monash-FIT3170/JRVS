const mongoose = require('mongoose')

// controllers/userController.js
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const XP = require('../models/xpModel');
const crypto = require('crypto');
const { SystemSecurityUpdate } = require('@mui/icons-material');

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

    // Create a new XP entry for the user with timestamp
    const xpEntry = new XP({
        userId: user._id,
        amount: newPoints
    });
    await xpEntry.save();

    res.status(200).json({
        message: "Points updated successfully",
        username: user.username,
        points: updatedPoints  // Optionally return decrypted updated points for immediate frontend update
    });
});

// @desc    Update Unit Progress
// @route   POST /api/users/updateUnitProgress
// @access  Private
const updateUnitProgress = asyncHandler(async (req, res) => {
    try {
        const { unitId } = req.params;
        const { lessonId } = req.body;
        const user = req.user; // Get the logged-in user from the middleware

        // Find the unit object in the assignedUnits array
        const userAssignedUnits = user['assignedUnits']
        // const unitToUpdate = userAssignedUnits.find(unit => unit.unitId == unitId);
        const unitIndex = user.assignedUnits.findIndex(unit => unit.unitId == unitId);

        console.log(user.assignedUnits[unitIndex].lessonsCompleted)

        if (unitIndex !== -1) {

        
            // Check if lessonId is already in lessonsCompleted
            if (!user.assignedUnits[unitIndex].lessonsCompleted.includes(lessonId)) {
                // Add the lessonId to the lessonsCompleted array
                
                user.assignedUnits[unitIndex].lessonsCompleted.push(lessonId);
                console.log(user.assignedUnits[unitIndex].lessonsCompleted)
            }

        // if (unitToUpdate) {
        //     // Increment the lessonsCompleted
        //     unitToUpdate.lessonsCompleted += 1;
            

            // Save the updated user object to the database
            user.markModified('assignedUnits');
            await user.save();
            

            // Send a success response
            res.status(200).json({ message: 'Unit progress updated successfully.' });
        } else {
            // If the unitId does not exist in assignedUnits
            res.status(404).json({ message: 'Unit not found in assignedUnits.' });
        }
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Server error.', error });
        console.log(error)
    }
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

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({}, 'username _id school'); // Select only username, _id, and school fields
        const userData = users.map(user => ({
            id: user._id,
            username: user.username,
            school: user.school
        }));
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = {
    createUser,
    updatePoints,
    getUserByUsername,
    getUserById,
    updateAvatar,
    updateUnlocked,
    getAllUsers,
    updateUnitProgress
};
