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
    // Get the inputs
    const { unitId, targetNodeId, newNode } = req.body;

    // 1. Get the target unit to be modified
    const unit = await unitModel.findById(unitId);
    if (!unit) {
        return res.status(404).json({ message: "unit_details not found" });
    }

    // 2. Locate the selected node, and append the new node to its children locally
    const isUpdated = addChildNode(unit.data, targetNodeId, newNode);
    if (!isUpdated) {
        res.status(404).json({ message: 'Target node not found' });
    }

    // 3. Update the node count in locally modified unit_details object
    unit.numberOfLessons += 1;

    // 4. Insert the new node into the lesson/video/quiz object in the database
    // TODO

    // 5. Update unit_details in mongodb with new structure
    unit.markModified('data'); // Explicitly mark the 'data' field as modified
    await unit.save();

    // 6. Update units object in mongodb: numberOfLessons ++
    const unitsUpdated = await unitsModel.updateOne(
        { _id: unitId },
        { $inc: { numberOfLessons: 1 } }
    );
    if (!unitsUpdated) {
        return res.status(404).json({ message: "Units object not found" })
    };
    
    // Success
    res.status(200).json({ message: 'Node appended successfully', unit });   
});

// Recursive function to append a node to a target node in the learning path
function addChildNode(data, targetId, newNode) {
    for (let item of data) {
        // Log the IDs being compared to help debug
        // console.log(`Comparing ${item.id} with ${targetId}`);

        if (item.id === targetId) {
            // Append the new node to the children of the matched node
            item.children.push(newNode);
            // console.log(`Node appended to ${item.id}`);
            return true; // Return true to indicate success
        }

        // Recur if children exist
        if (item.children && item.children.length > 0) {
            const found = addChildNode(item.children, targetId, newNode);
            if (found) {
                return true; // Stop further recursion if the node was found
            }
        }
    }

    return false; // Return false if the target node wasn't found
}

module.exports = {
    getUnits,
    getUnit,
    appendNode
}