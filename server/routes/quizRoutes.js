const express = require('express')
const router = express.Router()
const { getQuiz, createQuiz } = require('../controllers/quizController')

router.route('/:id').get(getQuiz)
router.route('/').post(createQuiz)


module.exports = router