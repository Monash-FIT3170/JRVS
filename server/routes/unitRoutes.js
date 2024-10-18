/**
 * @file unitRoutes.js
 * @description Express routes for managing units, including retrieving, appending, inserting, and deleting nodes, and getting unlocked tree data.
 * @module unitRoutes
 * @requires express
 * @requires ../controllers/unitController
 */

const express = require("express");
const router = express.Router();
const {
  getUnit,
  getUnits,
  createUnit,
  appendNode,
  insertNode,
  deleteNode,
  unlockedTreeData,
  getTailNodeIds,
  updateTreeNodeDetails,
} = require("../controllers/unitController");

router.route("/").get(getUnits);
router.route("/:id").get(getUnit);
router.route("/").post(createUnit);
router.post("/:id/append", appendNode);
router.post("/:id/insert", insertNode);
router.post("/:id/delete", deleteNode);
router.route("/:id/tail").get(getTailNodeIds);
router.post("/:id/unlocked", unlockedTreeData);
router.post("/:id/updateNode", updateTreeNodeDetails);

module.exports = router;
