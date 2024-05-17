const express = require('express');
const router = express.Router();
const { createUser, updatePoints, getUserByUsername, getUserById, updateAvatar } = require('../controllers/userController');

// Route to update user points
router.post('/', createUser)
router.post('/updatePoints', updatePoints); 
router.post('/updateAvatar', updateAvatar); 
router.get('/:username', getUserByUsername)
router.get('/id/:id', getUserById)


module.exports = router;