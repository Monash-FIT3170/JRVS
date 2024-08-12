const express = require('express')
const router = express.Router()
const { getQuiz, setQuiz } = require('../controllers/quizController')
const { updateSAQuestion } = require('../controllers/quizController');

router.route('/:id').get(getQuiz)
router.route('/:quizId/questions/:questionId').patch(updateSAQuestion);



module.exports = router
