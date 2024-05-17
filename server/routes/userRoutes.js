const express = require('express');
const router = express.Router();
const { createUser, updatePoints, getUser } = require('../controllers/userController');

// Route to update user points
router.post('/', createUser)
router.post('/updatePoints', updatePoints); 
router.get('/:username', getUser)


module.exports = router;