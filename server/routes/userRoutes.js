const express = require('express');
const router = express.Router();
const { createUser, updatePoints, getUserByUsername, getUserById, updateAvatar, updateUnlocked, getAllUsers } = require('../controllers/userController');

// Route to update user points
router.post('/', createUser)
router.post('/updatePoints', updatePoints); 
router.post('/updateAvatar', updateAvatar);
router.post('/updateUnlocked', updateUnlocked);  
router.get('/:username', getUserByUsername)
router.get('/id/:id', getUserById)
router.get('/', getAllUsers);


module.exports = router;