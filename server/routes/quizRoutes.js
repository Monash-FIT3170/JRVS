const express = require('express')
const router = express.Router()
const { getQuiz, setQuiz } = require('../controllers/quizController')
const { setShortAnswerQuiz } = require('../controllers/quizController')

router.route('/:id').get(getQuiz)
router.post('/', setShortAnswerQuiz)

module.exports = router