
const asyncHandler = require('express-async-handler')

const userUnitProgressModel = require('../models/userUnitProgressModel')


const getuserUnitProgress = asyncHandler (async (req, res) => {
    const userId = req.params.userId;
    const unitId = req.params.unitId;
    const userUnitProgress = await userUnitProgressModel.findOne({ userId: userId, unitId: unitId });

    if (!userUnitProgress) {
        res.status(404).json({message: "User's unit progress not found"});
    } else {
        res.status(200).json(userUnitProgress);
    }
})

const updateuserUnitProgress = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const unitId = req.params.unitId;
    const { completedLessons } = req.body;

    const userUnitProgress = await userUnitProgressModel.findOne({ userId: userId, unitId: unitId });

    if (!userUnitProgress) {
        res.status(404).json({message: "User's unit progress not found"});
    } else {
        userUnitProgress.completedLessons = completedLessons;
        await userUnitProgress.save();
        res.status(200).json(userUnitProgress);
    }

})


module.exports = {
    getUserUnitProgress,
    updateUserUnitProgress
}