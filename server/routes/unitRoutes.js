const express = require('express')
const router = express.Router()
const { getUnit, getUnits, appendNode, insertNode } = require('../controllers/unitController')

router.route('/').get(getUnits)
router.route('/:id').get(getUnit)
router.post('/:id/append', appendNode);
router.post('/:id/insert', insertNode);

module.exports = router