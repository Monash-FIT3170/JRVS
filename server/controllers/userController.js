const mongoose = require('mongoose')

// controllers/userController.js
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const XP = require('../models/xpModel');
const crypto = require('crypto');
const {calculateLevel} = require("../utils/levelUtils");

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

    if (newPoints > 0) { // if the new points is negative then don't add xp entries
        // Create a new XP entry for the user with timestamp
        const xpEntry = new XP({
            userId: user._id,
            amount: newPoints
        });
        await xpEntry.save();

        // Calculate total XP for the user
        const totalXP = await XP.aggregate([
            { $match: { userId: user._id } },
            { $group: { _id: null, totalXP: { $sum: '$amount' } } }
        ]);

        // Calculate the user's level based on the total XP
        const level = calculateLevel(totalXP[0]?.totalXP || 0);
        user.level = level;
        await user.save();
    }

    res.status(200).json({
        message: "Points updated successfully",
        username: user.username,
        points: updatedPoints,  // Optionally return decrypted updated points for immediate frontend update
        level: user.level        // Return the updated level
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

const updateDetails = asyncHandler(async (req, res) => {
    const { firstname, lastname, username, newUsername, email, school, password } = req.body;
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

const getProfile = (req, res) => {
    try {
      const user = req.user; 
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  const joinTeacher = asyncHandler(async (req, res) => {
    const { sharableCode } = req.body;
    const studentId = req.user._id;
  
    // Find teacher by sharableCode
    const teacher = await User.findOne({ sharableCode, usertype: 'teacher' });
    if (!teacher) {
      return res.status(404).json({ error: 'Invalid teacher code' });
    }
  
    if (teacher.students.includes(studentId)) {
      return res.status(400).json({ error: 'Already part of this teacher' });
    }
  
    // Update student's teacherId
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    student.teacherId = teacher._id;
  
    // Add student to teacher's students array
    teacher.students.push(student._id);
  
    await student.save();
    await teacher.save();
  
    res.status(200).json({ message: 'Successfully joined the teacher' });
  });
  
const updatePassword = asyncHandler(async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Verify old password
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
        return res.status(400).send('Invalid password');
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
};
