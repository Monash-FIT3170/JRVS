const express = require('express')
const router = express.Router()
const { getUnit, getUnits, appendNode, insertNode, deleteNode } = require('../controllers/unitController')

router.route('/').get(getUnits)
router.route('/:id').get(getUnit)
router.post('/:id/append', appendNode);
router.post('/:id/insert', insertNode);
router.post('/:id/delete', deleteNode);

module.exports = router