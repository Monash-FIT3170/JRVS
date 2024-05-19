const express = require('express')
const router = express.Router()
const { getQuiz, setQuiz } = require('../controllers/quizController')

router.route('/:id').get(getQuiz)

module.exports = router