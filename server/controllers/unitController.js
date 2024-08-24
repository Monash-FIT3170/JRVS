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
    var generatedNode;

    if (newNode.type == 'lesson') {
        generatedNode = await createLesson(newNode.title);
    }
    else if (newNode.type == 'video') {
        generatedNode = await createVideo(newNode.title);
    }
    else if (newNode.type == 'quiz') {
        generatedNode = await createQuiz(newNode.title, inputSubType); // Pass in quiz sub-type
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
    const { unitId, targetNodeId, newNode, inputSubType } = req.body;

    // 1. Get the target unit to be modified
    const unit = await unitModel.findById(unitId);
    if (!unit) {
        console.log("unit_details not found");
        return res.status(404).json({ message: "unit_details not found" });
    }

    // 2. Insert a new empty node into the lesson/video/quiz object in the database    
    var generatedNode;

    if (newNode.type == 'lesson') {
        generatedNode = await createLesson(newNode.title);
    }
    else if (newNode.type == 'video') {
        generatedNode = await createVideo(newNode.title);
    }
    else if (newNode.type == 'quiz') {
        generatedNode = await createQuiz(newNode.title, inputSubType); // Pass in quiz sub-type
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
    // Empty node
    generatedNode = await lessonModel.create({
        title: nodeTitle || 'New lesson',
        content: [
            {
                type: "listBox",
                heading: 'In this section, you will:',
                points: [],
            }
        ]
    });
    
    // generatedNode = await lessonModel.create({
    //     title: nodeTitle || 'New Lesson',
    //     content: [
    //         {
    //             heading: 'In this section, you will:',
    //             points: [
    //                 "This is the first point.",
    //                 "Here is the second point.",
    //                 "Add more points as desired."
    //             ],
    //             type: "listBox"
    //         }
    //     ]
    // });

    return generatedNode;
}

// Create a new video in the videos collection
async function createVideo(nodeTitle) {
    generatedNode = await videoModel.create({
        title: nodeTitle || 'New Video',
        url: "",
        heading: ""
    });

    // generatedNode = await videoModel.create({
    //     title: nodeTitle || 'New Video',
    //     url: "https://www.youtube.com/embed/oJC8VIDSx_Q",
    //     heading: "Watch the video below to learn more about <description>"
    // });

    return generatedNode;
}

// Create a new quiz in the quiz collection
async function createQuiz(nodeTitle, quizType) {
    generatedNode = await quizModel.create({
        topic: nodeTitle || "New Quiz",
        questions: [
            { 
                type: quizType, 
                // Remaining data is different depending on quizType. Leave blank for now.
                ...(quizType == "TrueFalse" && {options: [
                    { option: "True", value: "true" },
                    { option: "False", value: "false" },
                  ]})
            }
        ]
    });

    return generatedNode;
}


const deleteNode = asyncHandler(async (req, res) => {
    const { unitId } = req.body;

    try {
        // get the target unit
        const unit = await unitModel.findById(unitId);
        if (!unit) {
            return res.status(404).json({ message: "Unit not found" });
        }

        // remove the node and reappend its children
        let deletedNode = null;
        const isRemoved = removeNodeAndReappendChildren(unit.data, nodeId, null, (node) => {
            deletedNode = node;
        });

        if (!isRemoved) {
            return res.status(404).json({ message: "Node not found" });
        }

        if (!deletedNode) {
            return res.status(400).json({ message: "Cannot delete root node" });
        }

        // update the node count
        unit.numberOfLessons -= 1;

        // save the updated unit
        unit.markModified('data');
        await unit.save();

        // update the units collection
        await unitsModel.updateOne(
            { _id: unitId },
            { $inc: { numberOfLessons: -1 } }
        );

        // delete the corresponding lesson/video/quiz document
        await deleteNodeDocument(deletedNode);

        res.status(200).json({ message: 'Node deleted and children reappended successfully' });
    } catch (error) {
        console.error('Error in deleteNode:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

function removeNodeAndReappendChildren(tree, nodeId, parent, onNodeFound) {
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].id === nodeId) {
            if (!parent) {
                return false; // to prevent deletion of root node
            }
            
            const removedNode = tree.splice(i, 1)[0];
            onNodeFound(removedNode);
            
            // reappend children to the parent
            tree.splice(i, 0, ...removedNode.children);
            
            return true;
        }
        if (tree[i].children && tree[i].children.length > 0) {
            if (removeNodeAndReappendChildren(tree[i].children, nodeId, tree[i], onNodeFound)) {
                return true;
            }
        }
    }
    return false;
}

async function deleteNodeDocument(node) {
    switch (node.type) {
        case 'lesson':
            await lessonModel.findByIdAndDelete(node.id);
            break;
        case 'video':
            await videoModel.findByIdAndDelete(node.id);
            break;
        case 'quiz':
            await quizModel.findByIdAndDelete(node.id);
            break;
        default:
            console.log(`Unknown node type: ${node.type}`);
    }
}

// Function to return object for full tree access. This contains the list of tail nodes id in format for the 'beautiful skill tree' package.
const getUnlockedTreeData = asyncHandler(async (req, res) => {
    const unitId = req.params.id;
    
    try {
        // Get the target unit
        const unit = await unitModel.findById(unitId);
        if (!unit) {
            return res.status(404).json({ message: "Unit not found" });
        }

        // Get the list of tail node ids (this is the minimum list to provide user with access to all previous nodes)
        const tailNodeIds = findTailNodeIds(unit.data);

        // Contruct the data input as expected by the 'beautiful skill tree' package
        const savedData = {};

        tailNodeIds.forEach(id => {
            savedData[id] = {
                nodeState: 'selected',
            };
        });

        res.status(200).json(savedData);
    } catch (error) {
        console.error('Error in getUnlockedTreeData:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


// Recursive function to retrieve the list of child node ids
function findTailNodeIds(data, tailNodeIds = []) {
    for (let item of data) {
        // Check if the current node has no children or an empty children array
        if (!item.children || item.children.length === 0) {
            // Record the ID of the tail node
            tailNodeIds.push(item.id);
        }

        // Recur if children exist
        if (item.children && item.children.length > 0) {
            findTailNodeIds(item.children, tailNodeIds);
        }
    }

    return tailNodeIds; // Return the array of tail node IDs
}

module.exports = {
    getUnits,
    getUnit,
    appendNode,
    insertNode,
    deleteNode,
    getUnlockedTreeData,
}