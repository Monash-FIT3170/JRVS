const asyncHandler = require('express-async-handler')
const unitsModel = require('../models/unitsModel')
const unitModel = require('../models/unitModel')
const { createEmptyLesson, getLesson } = require('./lessonController'); // Import the function
const lessonModel = require('../models/lessonModel');
const videoModel = require('../models/videoModel');
const quizModel = require('../models/quizModel');

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
    const { unitId, targetNodeId, newNode, inputSubType } = req.body;

    // 1. Get the target unit to be modified
    const unit = await unitModel.findById(unitId);
    if (!unit) {
        console.log("unit_details not found");
        return res.status(404).json({ message: "unit_details not found" });
    }

    // 2. Insert a new empty node into the lesson/video/quiz object in the database
    // TODO: Consider setup of progress tracking of a new lesson/video/quiz
    // TODO: Handle sub-types of lesson/video/quizzes. Eg multiple choice quiz, drag and drop quiz, etc
    
    var generatedNode;

    if (newNode.type == 'lesson') {
        generatedNode = await createLesson(newNode.title);
    }
    else if (newNode.type == 'video') {
        generatedNode = await createVideo(newNode.title);
    }
    else if (newNode.type == 'quiz') {
        generatedNode = await createQuiz(newNode.title, inputSubType);
    }
    else {
        console.log('New node type invalid');
        return res.status(500).json({message: 'New node type invalid'})
    }

    if (!generatedNode) {
        console.log('Error inserting the node into the lesson/video/quiz collection');
        return res.status(500).json({message: 'Error inserting the node into the lesson/video/quiz collection'})
    }

    // 3. Add the generated node id to newNode
    newNode.id = generatedNode._id.toString(); // Convert from ObjectId to String

    // 4. Locate the selected node within the unit, and append the new node to its children locally
    const isUpdated = appendChildNode(unit.data, targetNodeId, newNode);
    if (!isUpdated) {
        console.log('Target node not found');
        return res.status(404).json({ message: 'Target node not found' });
    }

    // 5. Update the node count in locally modified unit_details object
    unit.numberOfLessons += 1;

    // 6. Update unit_details object in mongodb with new structure
    unit.markModified('data'); // Explicitly mark the 'data' field as modified
    await unit.save();

    // 7. Update units object in mongodb: numberOfLessons ++
    const unitsUpdated = await unitsModel.updateOne(
        { _id: unitId },
        { $inc: { numberOfLessons: 1 } }
    );
    if (!unitsUpdated) {
        console.log('Units object not found');
        return res.status(404).json({ message: "Units object not found" })
    };
    
    // If all previous steps completed, then it was a successful append!
    return res.status(200).json({ message: 'Node appended successfully', newNode });   
});

// @desc    Append a node to a unit
// @route   POST /api/units/:id/insert
// @access  Private
const insertNode = asyncHandler(async (req, res) => {
    // Get the inputs
    const { unitId, targetNodeId, newNode } = req.body;

    // 1. Get the target unit to be modified
    const unit = await unitModel.findById(unitId);
    if (!unit) {
        console.log("unit_details not found");
        return res.status(404).json({ message: "unit_details not found" });
    }

    // 2. Insert a new empty node into the lesson/video/quiz object in the database
    // Insert lesson:
    const newLesson = await lessonModel.create({
        title: newNode.title || 'New Lesson',
        content: [
            {
                heading: 'In this section, you will:',
                points: [
                    "This is the first point.",
                    "Here is the second point.",
                    "Add more points as desired."
                ],
                type: "listBox"
            }
        ]
    });
    if (!newLesson) {
        console.log('Error creating lesson')
        res.status(500).json({message: 'Error creating lesson'})
    }
    // TODO: Add option to insert a video/quiz depending on the node type

    // 3. Add the generated node id to newNode
    newNode.id = newLesson._id.toString(); // Convert from ObjectId to String

    // 4. Locate the selected node within the unit, and append the new node to its children locally
    const isUpdated = insertChildNode(unit.data, targetNodeId, newNode);
    if (!isUpdated) {
        console.log('Target node not found')
        res.status(404).json({ message: 'Target node not found' });
    }

    // 5. Update the node count in locally modified unit_details object
    unit.numberOfLessons += 1;

    // 6. Update unit_details object in mongodb with new structure
    unit.markModified('data'); // Explicitly mark the 'data' field as modified
    await unit.save();

    // 7. Update units object in mongodb: numberOfLessons ++
    const unitsUpdated = await unitsModel.updateOne(
        { _id: unitId },
        { $inc: { numberOfLessons: 1 } }
    );
    if (!unitsUpdated) {
        console.log("Units object not found")
        return res.status(404).json({ message: "Units object not found" })
    };
    
    // If all previous steps completed, then it was a successful append!
    return res.status(200).json({ message: 'Node inserted successfully', newNode });   
});

// Recursive function to insert the new node
function insertChildNode(tree, nodeId, newNode) {
    for (let node of tree) {
        if (node.id === nodeId) {
            // Insert the new node between the selected node and its children
            newNode.children = node.children;
            node.children = [newNode];
            return true; // Return true to indicate the node was inserted
        }

        // Recur if children exist
        if (node.children && node.children.length > 0) {
            const found = insertChildNode(node.children, nodeId, newNode);
            if (found) {
                return true; // Stop further recursion if the node was inserted
            }
        }
    }

    return false; // Return false if the target node wasn't found
}

// Recursive function to append a node to a target node in the learning path
function appendChildNode(data, targetId, newNode) {
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
            const found = appendChildNode(item.children, targetId, newNode);
            if (found) {
                return true; // Stop further recursion if the node was found
            }
        }
    }

    return false; // Return false if the target node wasn't found
}

// Create a new lesson in the lessons collection
async function createLesson(nodeTitle) {
    generatedNode = await lessonModel.create({
        title: nodeTitle || 'New Lesson',
        content: [
            {
                heading: 'In this section, you will:',
                points: [
                    "This is the first point.",
                    "Here is the second point.",
                    "Add more points as desired."
                ],
                type: "listBox"
            }
        ]
    });

    return generatedNode;
}

// Create a new video in the videos collection
async function createVideo(nodeTitle) {
    generatedNode = await videoModel.create({
        title: nodeTitle || 'New Video',
        url: "https://www.youtube.com/embed/oJC8VIDSx_Q",
        heading: "Watch the video below to learn more about <description>"
    });

    return generatedNode;
}

// Create a new quiz in the quiz collection
async function createQuiz(nodeTitle, quizType) {
    // TODO: Handle different quiz types. May need to update quizModel schema
    generatedNode = await quizModel.create({
        questions: [],
        topic: nodeTitle || "New Quiz"
    });

    return generatedNode;
}

module.exports = {
    getUnits,
    getUnit,
    appendNode,
    insertNode
}