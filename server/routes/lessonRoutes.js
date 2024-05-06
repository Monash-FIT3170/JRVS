const express = require('express')
const router = express.Router()
const { getLesson, setLesson } = require('../controllers/lessonController')

router.route('/:id').get(getLesson)

module.exports = router