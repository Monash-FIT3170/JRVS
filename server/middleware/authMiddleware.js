const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            res.status(401).json({ error: 'User not found in database' });
        }

        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Please authenticate.' });
    }
};

module.exports = authenticate;
