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
 * Each function uses Mongoose models (`unitsModel`, `unitModel`, `lessonModel`, `videoModel`, `quizModel`)
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
const { createEmptyLesson, getLesson } = require("./lessonController");
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
 * @returns {Promise<void>} A promise that resolves on unit retrieval
 * @throws {Error} Throws a 404 error if the unit  not found.
 */
const getUnit = asyncHandler(async (req, res) => {
  const unitId = req.params.id;
  const units = await unitModel.find();
  const unit = units.find((unit) => unit._id == unitId);

  if (!unit) {
    res.status(404).json({ message: "Unit not found" });
  } else {
    res.status(200).json(unit);
  }
});

/**
 * @desc    Create a new unit
 * @route   POST /api/units
 * @access  Public
 * @function createUnit
 * @async
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the unit is created successfully.
 */
const createUnit = asyncHandler(async (req, res) => {
  const { title, icon, colour } = req.body;

  const newLesson = await createLesson(); // placeholder lesson

  const newLessonForUnit = {
    _id: newLesson._id,
    id: newLesson._id.toString(),
    icon: "lessonIcon",
    title: "New Lesson",
    tooltip: { content: "Description of the new child node" },
    children: [],
    type: "lesson",
  };

  const unitDetails = await unitModel.create({
    data: [newLessonForUnit],
    numberOfLessons: 1,
  });

  const unit = await unitsModel.create({
    _id: unitDetails._id,
    title,
    icon,
    colour,
    numberOfLessons: 1,
  });

  res.status(200).json(unit);
});

/**
 * @desc    Add a node to a unit
 * @route   POST /api/units/:id/append
 * @access  Private
 * @function appendNode
 * @async
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the node is appended successfully.
 */
const appendNode = asyncHandler(async (req, res) => {
  const { unitId, targetNodeId, newNode, inputSubType } = req.body;

  const unit = await unitModel.findById(unitId);
  if (!unit) {
    return res.status(404).json({ message: "Unit not found" });
  }

  let generatedNode;
  if (newNode.type === "lesson") {
    generatedNode = await createLesson(newNode.title, newNode.tooltip.content);
  } else if (newNode.type === "video") {
    generatedNode = await createVideo(newNode.title, newNode.tooltip.content);
  } else if (newNode.type === "quiz") {
    generatedNode = await createQuiz(newNode.title, inputSubType, newNode.tooltip.content);
  } else {
    return res.status(500).json({ message: "Invalid node type" });
  }

  if (!generatedNode) {
    return res.status(500).json({ message: "Error creating node" });
  }

  newNode.id = generatedNode._id.toString(); // Convert ObjectId to string

  const isUpdated = appendChildNode(unit.data, targetNodeId, newNode);
  if (!isUpdated) {
    return res.status(404).json({ message: "Target node not found" });
  }

  unit.numberOfLessons += 1;
  unit.markModified("data");
  await unit.save();

  const unitsUpdated = await unitsModel.updateOne(
    { _id: unitId },
    { $inc: { numberOfLessons: 1 } }
  );

  if (!unitsUpdated) {
    return res.status(404).json({ message: "Units not found" });
  }

  res.status(200).json({ message: "Node appended successfully", newNode });
});

/**
 * @desc    Insert a node into a unit
 * @route   POST /api/units/:id/insert
 * @access  Private
 * @function insertNode
 * @async
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} Node inserted successfully.
 */
const insertNode = asyncHandler(async (req, res) => {
  const { unitId, targetNodeId, newNode, inputSubType } = req.body;

  const unit = await unitModel.findById(unitId);
  if (!unit) {
    return res.status(404).json({ message: "Unit not found" });
  }

  let generatedNode;
  if (newNode.type === "lesson") {
    generatedNode = await createLesson(newNode.title, newNode.tooltip.content);
  } else if (newNode.type === "video") {
    generatedNode = await createVideo(newNode.title, newNode.tooltip.content);
  } else if (newNode.type === "quiz") {
    generatedNode = await createQuiz(newNode.title, inputSubType, newNode.tooltip.content);
  } else {
    return res.status(500).json({ message: "Invalid node type" });
  }

  if (!generatedNode) {
    return res.status(500).json({ message: "Error creating node" });
  }

  newNode.id = generatedNode._id.toString(); // Convert ObjectId to string

  const isUpdated = insertChildNode(unit.data, targetNodeId, newNode);
  if (!isUpdated) {
    return res.status(404).json({ message: "Target node not found" });
  }

  unit.numberOfLessons += 1;
  unit.markModified("data");
  await unit.save();

  const unitsUpdated = await unitsModel.updateOne(
    { _id: unitId },
    { $inc: { numberOfLessons: 1 } }
  );

  if (!unitsUpdated) {
    return res.status(404).json({ message: "Units not found" });
  }

  res.status(200).json({ message: "Node inserted successfully", newNode });
});

/**
 * @desc    Recursively adds child node to the target's children.
 * @function appendChildNode
 * @param {Object[]} data - The tree data to append the node to.
 * @param {string} targetId - The ID of the target node.
 * @param {Object} newNode - The new node to append.
 * @returns {boolean} Returns true if the node is appended, otherwise false.
 */
function appendChildNode(data, targetId, newNode) {
  for (let item of data) {
    if (item.id === targetId) {
      item.children.push(newNode);
      return true;
    }

    if (item.children && item.children.length > 0) {
      const found = appendChildNode(item.children, targetId, newNode);
      if (found) return true;
    }
  }
  return false;
}

/**
 * @desc    Recursively insert a child node into the target node's children.
 * @function insertChildNode
 * @param {Object[]} data - The tree data to insert the node into.
 * @param {string} targetId - The ID of the target node.
 * @param {Object} newNode - new node to insert.
 * @returns {boolean} True if inserted
 */
function insertChildNode(data, targetId, newNode) {
  for (let item of data) {
    if (item.id === targetId) {
      newNode.children = item.children;
      item.children = [newNode];
      return true;
    }

    if (item.children && item.children.length > 0) {
      const found = insertChildNode(item.children, targetId, newNode);
      if (found) return true;
    }
  }
  return false;
}

/**
 * @desc    Get the list of tail node IDs
 * @function getTailNodeIds
 * @param {Object[]} treeData - The tree data to traverse.
 * @returns {string[]} An array of tail node IDs.
 */
function getTailNodeIds(treeData) {
  const tailNodeIds = [];

  for (const node of treeData) {
    if (!node.children || node.children.length === 0) {
      tailNodeIds.push(node.id);
    } else {
      const childTailNodeIds = getTailNodeIds(node.children);
      tailNodeIds.push(...childTailNodeIds);
    }
  }

  return tailNodeIds;
}

module.exports = {
  getUnits,
  getUnit,
  createUnit,
  appendNode,
  insertNode,
};
