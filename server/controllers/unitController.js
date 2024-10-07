/**
 * @file unitController.js
 * @description Handles unit-related operations for the API.
 *
 * This module provides functions to manage units and their associated nodes.
 * The following operations are supported:
 * - Get a list of all units
 * - Get a specific unit by ID
 * - Append a new node to a unit
 * - Insert a new node into a unit
 * - Delete a node from a unit and reappend its children
 * - Get the list of tail node IDs for the tree
 *
 * Each function uses the Mongoose models (`unitsModel`, `unitModel`, `lessonModel`, `videoModel`, `quizModel`)
 * to interact with the MongoDB collections storing unit and node information. Functions are asynchronous
 * and use `express-async-handler` to handle exceptions within async routes. Errors are properly handled
 * and returned to the client with appropriate status codes.
 *
 * @module unitController
 * @requires express-async-handler
 * @requires ../models/unitsModel
 * @requires ../models/unitModel
 * @requires ./lessonController
 * @requires ../models/lessonModel
 * @requires ../models/videoModel
 * @requires ../models/quizModel
 * @throws {Error} Throws errors for unit not found, invalid node types, or issues with node operations.
 * @returns {Promise<void>} A promise that resolves when the operation is successfully completed.
 */

const asyncHandler = require("express-async-handler");
const unitsModel = require("../models/unitsModel");
const unitModel = require("../models/unitModel");
const { createEmptyLesson, getLesson } = require("./lessonController"); // Import the function
const lessonModel = require("../models/lessonModel");
const videoModel = require("../models/videoModel");
const quizModel = require("../models/quizModel");

/**
 * @desc    Get a list of all units
 * @route   GET /api/units
 * @access  Private
 * @function getUnits
 * @async
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the list of units is retrieved and sent in the response.
 */
const getUnits = asyncHandler(async (req, res) => {
  const units = await unitsModel.find();
  res.status(200).json(units);
});

/**
 * @desc    Get a specific unit by ID
 * @route   GET /api/units/:id
 * @access  Private
 * @function getUnit
 * @async
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the unit is retrieved and sent in the response.
 * @throws {Error} Throws a 404 error if the unit is not found.
 */
const getUnit = asyncHandler(async (req, res) => {
  const unitId = req.params.id;
  const units = await unitModel.find();
  const unit = units.find((unit) => unit._id == unitId);

  if (!unit) {
    res.status(404).json({ message: "Unit not found" });
    // res.status(404).json({message: "test123"})
  } else {
    res.status(200).json(unit);
  }
});

/**
 * Creates a new unit in the database.
 *
 * @route POST /units
 * @access Public
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createUnit = asyncHandler(async (req, res) => {
  const { title, icon, colour } = req.body;

  // Create a placeholder lesson
  newLesson = await createLesson();

  const newLessonForUnit = {
    _id: newLesson._id,
    id: newLesson._id.toString(),
    icon: "lessonIcon",
    title: "New Lesson",
    tooltip: { content: "Description of the new child node" },
    children: [],
    type: "lesson",
  };

  // create the unit
  unit_details = await unitModel.create({
    data: [newLessonForUnit],
    numberOfLessons: 1,
  });

  unit = await unitsModel.create({
    _id: unit_details._id,
    title: title,
    icon: icon,
    colour: colour,
    numberOfLessons: 1,
  });

  res.status(200).json(unit);
});

/**
 * Deletes a unit in the database.
 *
 * @route DELETE /units
 * @access Public
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteUnit = asyncHandler(async (req, res) => {
  // Helper function to get all node IDs recursively
  function getAllNodeIds(node) {
    let ids = [node.id];
    if (node.children && node.children.length > 0) {
      ids = ids.concat(node.children.flatMap((child) => getAllNodeIds(child)));
    }
    return ids;
  }

  const { id } = req.params;

  try {
    // Find the unit first
    const unit = await unitModel.findById(id);
    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    console.log(`Deleting unit: ${id}`);

    // Get all node IDs from the unit
    const nodeIds = unit.data.flatMap((node) => getAllNodeIds(node));

    // Delete all associated lessons, videos, and quizzes
    try {
      await Promise.all([
        lessonModel.deleteMany({ _id: { $in: nodeIds } }),
        videoModel.deleteMany({ _id: { $in: nodeIds } }),
        quizModel.deleteMany({ _id: { $in: nodeIds } }),
      ]);
      // console.log("Associated lessons, videos, and quizzes deleted");
    } catch (error) {
      console.error("Error deleting associated documents:", error);
      return res
        .status(500)
        .json({
          message: "Error deleting associated documents",
          error: error.message,
        });
    }

    // Delete the unit from unitModel and unitsModel
    try {
      await Promise.all([
        unitModel.findByIdAndDelete(id),
        unitsModel.findOneAndDelete({ _id: id }),
      ]);
      // console.log("Unit deleted from unitModel and unitsModel");
    } catch (error) {
      console.error("Error deleting unit from models:", error);
      return res
        .status(500)
        .json({
          message: "Error deleting unit from models",
          error: error.message,
        });
    }

    // // Remove the unit from all users' assignedUnits
    // try {
    //   await User.updateMany(
    //     { assignedUnits: id },
    //     { $pull: { assignedUnits: id } }
    //   );
    //   console.log("Unit removed from users' assignedUnits");
    // } catch (error) {
    //   console.error("Error updating users' assignedUnits:", error);
    //   return res.status(500).json({ message: "Error updating users' assignedUnits", error: error.message });
    // }

    // // Update UserProgress
    // try {
    //   await UserProgress.updateMany(
    //     { "learningPaths.pathId": id },
    //     { $pull: { learningPaths: { pathId: id } } }
    //   );
    //   console.log("UserProgress updated");
    // } catch (error) {
    //   console.error("Error updating UserProgress:", error);
    //   return res.status(500).json({ message: "Error updating UserProgress", error: error.message });
    // }

    res.status(200).json({ message: "Unit deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUnit:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @desc    Append a node to a unit
 * @route   POST /api/units/:id/append
 * @access  Private
 * @function appendNode
 * @async
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the node is appended successfully.
 * @throws {Error} Throws errors if the unit is not found, the node type is invalid, or there's an issue with appending the node.
 */
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

  if (newNode.type == "lesson") {
    generatedNode = await createLesson(newNode.title, newNode.tooltip.content);
  } else if (newNode.type == "video") {
    generatedNode = await createVideo(newNode.title, newNode.tooltip.content);
  } else if (newNode.type == "quiz") {
    generatedNode = await createQuiz(
      newNode.title,
      inputSubType,
      newNode.tooltip.content,
    ); // Pass in quiz sub-type
  } else {
    console.log("New node type invalid");
    return res.status(500).json({ message: "New node type invalid" });
  }

  if (!generatedNode) {
    console.log(
      "Error inserting the node into the lesson/video/quiz collection",
    );
    return res.status(500).json({
      message: "Error inserting the node into the lesson/video/quiz collection",
    });
  }

  // 3. Add the generated node id to newNode
  newNode.id = generatedNode._id.toString(); // Convert from ObjectId to String

  // 4. Locate the selected node within the unit, and append the new node to its children locally
  const isUpdated = appendChildNode(unit.data, targetNodeId, newNode);
  if (!isUpdated) {
    console.log("Target node not found");
    return res.status(404).json({ message: "Target node not found" });
  }

  // 5. Update the node count in locally modified unit_details object
  unit.numberOfLessons += 1;

  // 6. Update unit_details object in mongodb with new structure
  unit.markModified("data"); // Explicitly mark the 'data' field as modified
  await unit.save();

  // 7. Update units object in mongodb: numberOfLessons ++
  const unitsUpdated = await unitsModel.updateOne(
    { _id: unitId },
    { $inc: { numberOfLessons: 1 } },
  );
  if (!unitsUpdated) {
    console.log("Units object not found");
    return res.status(404).json({ message: "Units object not found" });
  }

  // If all previous steps completed, then it was a successful append!
  return res
    .status(200)
    .json({ message: "Node appended successfully", newNode });
});

/**
 * @desc    Insert a node into a unit
 * @route   POST /api/units/:id/insert
 * @access  Private
 * @function insertNode
 * @async
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the node is inserted successfully.
 * @throws {Error} Throws errors if the unit is not found, the node type is invalid, or there's an issue with inserting the node.
 */
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

  if (newNode.type == "lesson") {
    generatedNode = await createLesson(newNode.title, newNode.tooltip.content);
  } else if (newNode.type == "video") {
    generatedNode = await createVideo(newNode.title, newNode.tooltip.content);
  } else if (newNode.type == "quiz") {
    generatedNode = await createQuiz(
      newNode.title,
      inputSubType,
      newNode.tooltip.content,
    ); // Pass in quiz sub-type
  } else {
    console.log("New node type invalid");
    return res.status(500).json({ message: "New node type invalid" });
  }

  if (!generatedNode) {
    console.log(
      "Error inserting the node into the lesson/video/quiz collection",
    );
    return res.status(500).json({
      message: "Error inserting the node into the lesson/video/quiz collection",
    });
  }

  // 3. Add the generated node id to newNode
  newNode.id = generatedNode._id.toString(); // Convert from ObjectId to String

  // 4. Locate the selected node within the unit, and append the new node to its children locally
  const isUpdated = insertChildNode(unit.data, targetNodeId, newNode);
  if (!isUpdated) {
    console.log("Target node not found");
    res.status(404).json({ message: "Target node not found" });
  }

  // 5. Update the node count in locally modified unit_details object
  unit.numberOfLessons += 1;

  // 6. Update unit_details object in mongodb with new structure
  unit.markModified("data"); // Explicitly mark the 'data' field as modified
  await unit.save();

  // 7. Update units object in mongodb: numberOfLessons ++
  const unitsUpdated = await unitsModel.updateOne(
    { _id: unitId },
    { $inc: { numberOfLessons: 1 } },
  );
  if (!unitsUpdated) {
    console.log("Units object not found");
    return res.status(404).json({ message: "Units object not found" });
  }

  // If all previous steps completed, then it was a successful append!
  return res
    .status(200)
    .json({ message: "Node inserted successfully", newNode });
});

/**
 * @function insertChildNode
 * @desc    Recursively insert a new node into the tree
 * @param {Object[]} tree - The tree data to insert the node into.
 * @param {string} nodeId - The ID of the node to insert the new node under.
 * @param {Object} newNode - The new node to insert.
 * @returns {boolean} Returns true if the node was successfully inserted, otherwise false.
 */
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

/**
 * @function appendChildNode
 * @desc    Recursively append a new node to a target node's children
 * @param {Object[]} data - The tree data to append the node to.
 * @param {string} targetId - The ID of the target node.
 * @param {Object} newNode - The new node to append.
 * @returns {boolean} Returns true if the node was successfully appended, otherwise false.
 */
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

/**
 * @function createLesson
 * @desc    Create a new lesson document
 * @param {string} nodeTitle - The title of the new lesson.
 * @param {string} nodeDesc - The description of the new lesson.
 * @returns {Promise<Object>} A promise that resolves to the created lesson document.
 */
async function createLesson(nodeTitle, nodeDesc) {
  // Empty node
  generatedNode = await lessonModel.create({
    title: nodeTitle || "New lesson",
    desc: nodeDesc || "New lesson description",
    content: [
      {
        type: "listBox",
        heading: "In this section, you will:",
        points: [],
      },
    ],
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

/**
 * @function createVideo
 * @desc    Create a new video document
 * @param {string} nodeTitle - The title of the new video.
 * @param {string} nodeDesc - The description of the new video.
 * @returns {Promise<Object>} A promise that resolves to the created video document.
 */
async function createVideo(nodeTitle, nodeDesc) {
  generatedNode = await videoModel.create({
    title: nodeTitle || "New Video",
    url: "",
    heading: nodeDesc || "New Video Heading",
  });

  // generatedNode = await videoModel.create({
  //     title: nodeTitle || 'New Video',
  //     url: "https://www.youtube.com/embed/oJC8VIDSx_Q",
  //     heading: "Watch the video below to learn more about <description>"
  // });

  return generatedNode;
}

/**
 * @function createQuiz
 * @desc    Create a new quiz document
 * @param {string} nodeTitle - The title of the new quiz.
 * @param {string} quizType - The type of quiz (e.g., TrueFalse).
 * @param {string} nodeDesc - The description/heading of the new quiz.
 * @returns {Promise<Object>} A promise that resolves to the created quiz document.
 */
async function createQuiz(nodeTitle, quizType, nodeDesc) {
  generatedNode = await quizModel.create({
    title: nodeTitle || "New Quiz",
    heading: nodeDesc || "New Quiz Heading",
    questions: [
      {
        type: quizType,
        // Remaining data is different depending on quizType. Leave blank for now.
        ...(quizType == "TrueFalse" && {
          options: [
            { option: "True", value: "true" },
            { option: "False", value: "false" },
          ],
        }),
      },
    ],
  });

  return generatedNode;
}

/**
 * @desc    Delete a node from a unit and reappend its children
 * @route   POST /api/units/:id/delete
 * @access  Private
 * @function deleteNode
 * @async
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the node is deleted and its children are reappended.
 * @throws {Error} Throws errors if the unit is not found, the node is not found, or there is a server error.
 */
const deleteNode = asyncHandler(async (req, res) => {
  const { unitId, nodeId } = req.body;

  try {
    // get the target unit
    const unit = await unitModel.findById(unitId);
    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    // remove the node and reappend its children
    let deletedNode = null;
    const isRemoved = removeNodeAndReappendChildren(
      unit.data,
      nodeId,
      null,
      (node) => {
        deletedNode = node;
      },
    );

    if (!isRemoved) {
      return res.status(404).json({ message: "Node not found" });
    }

    if (!deletedNode) {
      return res.status(400).json({ message: "Cannot delete root node" });
    }

    // update the node count
    unit.numberOfLessons -= 1;

    // save the updated unit
    unit.markModified("data");
    await unit.save();

    // update the units collection
    await unitsModel.updateOne(
      { _id: unitId },
      { $inc: { numberOfLessons: -1 } },
    );

    // delete the corresponding lesson/video/quiz document
    await deleteNodeDocument(deletedNode);

    res
      .status(200)
      .json({ message: "Node deleted and children reappended successfully" });
  } catch (error) {
    console.error("Error in deleteNode:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @function removeNodeAndReappendChildren
 * @desc    Recursively remove a node from the tree and reappend its children to the parent
 * @param {Object[]} tree - The tree data.
 * @param {string} nodeId - The ID of the node to remove.
 * @param {Object|null} parent - The parent node of the node to remove.
 * @param {Function} onNodeFound - Callback function to handle the removed node.
 * @returns {boolean} Returns true if the node was successfully removed, otherwise false.
 */
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
      if (
        removeNodeAndReappendChildren(
          tree[i].children,
          nodeId,
          tree[i],
          onNodeFound,
        )
      ) {
        return true;
      }
    }
  }
  return false;
}

/**
 * @function deleteNodeDocument
 * @desc    Delete the corresponding lesson, video, or quiz document based on the node type
 * @param {Object} node - The node to delete.
 * @returns {Promise<void>} A promise that resolves when the document is deleted.
 */
async function deleteNodeDocument(node) {
  switch (node.type) {
    case "lesson":
      await lessonModel.findByIdAndDelete(node.id);
      break;
    case "video":
      await videoModel.findByIdAndDelete(node.id);
      break;
    case "quiz":
      await quizModel.findByIdAndDelete(node.id);
      break;
    default:
      console.log(`Unknown node type: ${node.type}`);
  }
}

/**
 * @desc    Get the list of tail node IDs for the tree
 * @route   GET /api/units/:id/unlocked
 * @access  Private
 * @function getUnlockedTreeData
 * @async
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the list of tail node IDs is retrieved and sent in the response.
 * @throws {Error} Throws a 404 error if the unit is not found or a server error.
 */
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
    const savedData = [];

    tailNodeIds.forEach((id) => {
      savedData.push(id);
    });

    res.status(200).json(savedData);
  } catch (error) {
    console.error("Error in getUnlockedTreeData:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @function findTailNodeIds
 * @desc    Recursively find all tail node IDs in the tree
 * @param {Object[]} data - The tree data.
 * @param {string[]} [tailNodeIds=[]] - The array of tail node IDs.
 * @returns {string[]} The array of tail node IDs.
 */
function findTailNodeIds(data, tailNodeIds = []) {
  for (let item of data) {
    // Check if the current node has no children or an empty children array
    // if (!item.children || item.children.length === 0) {
    //     // Record the ID of the tail node
    //     tailNodeIds.push(item.id);
    // }
    tailNodeIds.push(item.id);

    // Recur if children exist
    if (item.children && item.children.length > 0) {
      findTailNodeIds(item.children, tailNodeIds);
    }
  }

  return tailNodeIds; // Return the array of tail node IDs
}

/**
 * @desc    Set the details of a node in a learning tree path
 * @route   POST /api/units/:id/updateNodeDetails
 * @access  Private
 * @function updateTreeNodeDetails
 * @async
 * @param {Request} req - The request object. Contains unitId, nodeId, newTitle, newDescription.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the node is appended successfully.
 * @throws {Error} Throws errors if the unit is not found, or there's an issue with editing the node.
 */
const updateTreeNodeDetails = asyncHandler(async (req, res) => {
  try {
    // Get the inputs
    const { unitId, nodeId, newTitle, newDescription } = req.body;

    // 1. Get the target unit to be modified
    const unit = await unitModel.findById(unitId);
    if (!unit) {
      console.log("unit_details not found");
      return res.status(404).json({ message: "unit_details not found" });
    }

    // 2. Locate the selected node within the unit, and update the node with the new data
    const isUpdated = updateNodeRecursive(
      unit.data,
      nodeId,
      newTitle,
      newDescription,
    );
    if (!isUpdated) {
      console.log("Target node not found");
      return res.status(404).json({ message: "Target node not found" });
    }

    // 3. Update unit_details object in mongodb with new structure
    unit.markModified("data"); // Explicitly mark the 'data' field as modified
    await unit.save();

    // If all previous steps completed, then the node was updated successfuly
    return res.status(200).json({
      message: "Node updated successfully",
      node: { id: nodeId, title: newTitle, description: newDescription },
    });
  } catch (error) {
    console.error("Error in updateTreeNodeDetails:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**
 * @function updateNodeRecursive
 * @desc    Recursively find the node specified and update its details
 * @param {*} data - The tree data containing the node.
 * @param {*} targetId - The ID of the node to be updated.
 * @param {*} newTitle - The new title to be set in the node.
 * @param {*} newDescription - The new description to be se in the node.
 * @returns {boolean} Returns true if the node was successfully updated, otherwise false.
 */
function updateNodeRecursive(data, targetId, newTitle, newDescription) {
  // Iterate through each child
  for (let item of data) {
    // Check if the item matches
    if (item.id === targetId) {
      // Update this node with the new details
      item.title = newTitle;
      item.tooltip.content = newDescription;

      return true; // Return true to indicate success
    }

    // Otherwise recur if children exist
    if (item.children && item.children.length > 0) {
      const found = updateNodeRecursive(
        item.children,
        targetId,
        newTitle,
        newDescription,
      );
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
  createUnit,
  appendNode,
  insertNode,
  deleteNode,
  getUnlockedTreeData,
  updateTreeNodeDetails,
  deleteUnit,
};
