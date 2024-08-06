const express = require('express');
const router = express.Router();
const { getUserUnitProgress } = require('../controllers/userProgressController');

router.route('/:userId/assignedUnits/:unitId').get(getUserUnitProgress);

module.exports = router;