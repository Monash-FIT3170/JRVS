const express = require('express')
const router = express.Router()
const { getUnit, getUnits, appendNode } = require('../controllers/unitController')

router.route('/').get(getUnits)
router.route('/:id').get(getUnit)
router.post('/:id/append', appendNode);

module.exports = router