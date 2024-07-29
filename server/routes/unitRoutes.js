const express = require('express')
const router = express.Router()
const { getUnit, getUnits } = require('../controllers/unitController')

router.route('/').get(getUnits)
router.route('/:id').get(getUnit)

module.exports = router