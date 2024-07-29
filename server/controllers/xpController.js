const XP = require('../models/xpModel');
const User = require('../models/userModel');

const { calculateLevel } = require('../utils/levelUtils');

const addXP = async (req, res) => {
    try {
        const { userId, amount } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const xpEntry = new XP({ userId, amount });
        await xpEntry.save();

        // Calculate total XP and update user's level
        const totalXP = await XP.aggregate([
            { $match: { userId: user._id } },
            { $group: { _id: null, totalXP: { $sum: '$amount' } } }
        ]);

        const level = calculateLevel(totalXP[0].totalXP);
        user.level = level;
        await user.save();

        res.status(200).json({ xpEntry, level });
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
        const { startDate, endDate, userGroup } = req.query;
        const start = new Date(startDate);
        const end = new Date(endDate);

        let users;

        if (userGroup === 'school') {
            // Get the user's school from the user making the request
            const requestingUser = req.user;
            if (!requestingUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            const school = requestingUser.school;

            // If the user's school is available, filter for that school's users
            if (school) {
                const schoolExists = await User.exists({ school });
                if (!schoolExists) {
                    return res.status(404).json({ error: 'School not found' });
                }
                users = await User.find({ school });
            } else {
                return res.status(404).json({ error: 'School not found for the requesting user' });
            }
        } else {
            // Fetch all users if userGroup is 'all'
            users = await User.find();
        }

        const userIds = users.map(user => user._id);

        // Left join to include all users, even those without XP entries
        const xpEntries = await User.aggregate([
            { $match: { _id: { $in: userIds } } },
            {
                $lookup: {
                    from: 'xps',
                    let: { userId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$userId', '$$userId'] },
                                        { $gte: ['$timestamp', start] },
                                        { $lte: ['$timestamp', end] }
                                    ]
                                }
                            }
                        },
                        { $group: { _id: '$userId', totalXP: { $sum: '$amount' } } }
                    ],
                    as: 'xpDetails'
                }
            },
            {
                $project: {
                    username: 1,
                    school: 1,
                    totalXP: { $ifNull: [{ $arrayElemAt: ['$xpDetails.totalXP', 0] }, 0] }
                }
            },
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