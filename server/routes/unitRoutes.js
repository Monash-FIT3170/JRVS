const express = require('express')
const router = express.Router()
const { getUnit } = require('../controllers/unitController')

router.route('/:id').get(getUnit)

module.exports = router