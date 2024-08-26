const express = require('express')
const router = express.Router()
const { getLessonProgress, updateLessonProgress, createLessonProgress } = require('../controllers/lessonProgressController')

router.route('/:userId/:lessonId').get(getLessonProgress)
router.route('/:userId/:lessonId').put(updateLessonProgress)
router.route('/:userId/:lessonId').post(createLessonProgress)

module.exports = router