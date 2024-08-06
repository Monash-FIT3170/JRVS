const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Unit = require('../models/unitModel');

// Get the number of completed lessons and total lessons in a unit
const getUserUnitProgress = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const unitId = req.params.unitId;

    const user = await User.findById(userId).populate('assignedUnits');
    const unit = await Unit.findById(unitId);

    if (!user || !unit) {
        res.status(404).json({ message: 'User or Unit not found' });
    } else {
        const userProgress = user.assignedUnits.find(u => u._id.toString() === unitId);
        const completedLessons = userProgress ? userProgress.completedLessons.length : 0;
        const totalLessons = unit.lessons.length;

        res.status(200).json({ completedLessons, totalLessons });
    }
});

module.exports = {
    getUserUnitProgress,
};