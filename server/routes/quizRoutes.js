const express = require('express')
const router = express.Router()
const { getQuiz, setQuiz } = require('../controllers/quizController')
const { updateSAQuestion } = require('../controllers/quizController');

router.route('/:id').get(getQuiz)
router.route('/:id').put(updateSAQuestion);



module.exports = router
