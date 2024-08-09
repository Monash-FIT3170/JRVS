const asyncHandler = require('express-async-handler')

const unitsModel = require('../models/unitsModel')
const unitModel = require('../models/unitModel')

// @desc    Get Unit
// @route   GET /api/units
// @access  Private
const getUnits = asyncHandler (async (req, res) => {
    const units = await unitsModel.find();
    res.status(200).json(units);
})

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

// @desc    Append a node to a unit
// @route   POST /api/units/:id/append
// @access  Private
const appendNode = asyncHandler(async (req, res) => {
    const { input1, input2 } = req.body;
    const units = await unitModel.find();
    const unit = units.find(unit => unit._id == input1) // Why does findById not work here?
    
    if (!unit) {
        return res.status(404).json({ message: "Unit not found" });
    }

    // TODO: other thangs
    res.status(200).json(unit)
    return unit
});

module.exports = {
    getUnits,
    getUnit,
    appendNode
}