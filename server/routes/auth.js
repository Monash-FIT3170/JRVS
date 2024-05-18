const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  if (!req.body.username) {
    return res.status(400).json({ error: "Please provide a username" });
  }

  if (!req.body.firstname) {
    return res.status(400).json({ error: "Please provide a firstname" });
  }

  if (!req.body.lastname) {
    return res.status(400).json({ error: "Please provide a lastname" });
  }

  if (!req.body.email) {
    return res.status(400).json({ error: "Please provide an email" });
  }

  if (!req.body.school) {
    return res.status(400).json({ error: "Please provide a school" });
  }

  if (!req.body.password) {
    return res.status(400).json({ error: "Please provide a password" });
  }

  const { username, firstname, lastname, email, school, password} = req.body;

  try {
    const user = new User({ username, firstname, lastname, email, school, password, points: 0, avatar: '_default.png', border: '_default.png', background: '_default.png', unlockedAvatars: ['_default.png'], unlockedBorders: ['_default.png'], unlockedBackgrounds: ['_default.png'] });
    await user.save();
    res.status(201).json({message: 'User created'});
  } catch (error) {
    console.log(error)
    res.status(400).json({message: 'Error creating user'});
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Invalid username or password');
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).send('Invalid username or password');
    
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.post('/current', async (req, res) => {
  const {token} = req.body;
  const decoded = jwt.verify(token, 'your_jwt_secret');
  res.json({ decoded });
})

module.exports = router;