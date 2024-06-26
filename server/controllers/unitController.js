const asyncHandler = require('express-async-handler')

const unitModel = require('../models/unitModel')

// @desc    Get Unit
// @route   GET /api/units/:id
// @access  Private
const getUnit = asyncHandler (async (req, res) => {
    const unitId = req.params.id
    const units = await unitModel.find();
    const unit = units.find(unit => unit._id == unitId)

    if (!unit) {
        res.status(404).json({message: 'Unit not found'})
        // res.status(404).json({message: "test123"})
    } else {
        res.status(200).json(unit);
    }
})


module.exports = {
    getUnit
}