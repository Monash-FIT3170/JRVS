const XP = require('../models/xpModel');
const User = require('../models/userModel');

const addXP = async (req, res) => {
    try {
        const { userId, amount } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const xpEntry = new XP({ userId, amount });
        await xpEntry.save();
        res.status(200).json(xpEntry);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getXPWithinPeriod = async (req, res) => {
    try {
        const { userId, startDate, endDate } = req.query;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const start = new Date(startDate);
        const end = new Date(endDate);

        const xpEntries = await XP.find({
            userId,
            timestamp: { $gte: start, $lte: end }
        });

        const totalXP = xpEntries.reduce((total, entry) => total + entry.amount, 0);

        res.status(200).json({ totalXP, xpEntries });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getLeaderboard = async (req, res) => {
    try {
        const { school, startDate, endDate } = req.query;
        const start = new Date(startDate);
        const end = new Date(endDate);

        let users;

        // if the school param exists filter for that schools users
        // otherwise calculate for all users
        if (school) {
            const schoolExists = await User.exists({ school });
            if (!schoolExists) {
                return res.status(404).json({ error: 'School not found' });
            }
            users = await User.find({ school });
        } else {
            users = await User.find();
        }

        const userIds = users.map(user => user._id);

        const xpEntries = await XP.aggregate([
            { $match: { userId: { $in: userIds }, timestamp: { $gte: start, $lte: end } } },
            { $group: { _id: '$userId', totalXP: { $sum: '$amount' } } },
            { $sort: { totalXP: -1 } }
        ]);

        res.status(200).json(xpEntries);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    addXP,
    getXPWithinPeriod,
    getLeaderboard
};