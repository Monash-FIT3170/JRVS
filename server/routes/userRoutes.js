const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');  // Import the authenticate middleware
const { createUser, updatePoints, getUserByUsername, getUserById, updateAvatar, updateUnlocked, getAllUsers, updateDetails, updatePassword } = require('../controllers/userController');

// Route to update user points
router.post('/', createUser)
router.post('/updatePoints', authenticate, updatePoints);
router.post('/updateAvatar', updateAvatar);
router.post('/updateUnlocked', updateUnlocked);  
router.post('/updateDetails', updateDetails);
router.post('/updatePassword', updatePassword);
router.get('/:username', getUserByUsername);
router.get('/id/:id', getUserById);
router.get('/', getAllUsers);


module.exports = router;