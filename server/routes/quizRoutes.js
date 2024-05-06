const express = require('express')
const router = express.Router()
const { getQuestions, setQuestions } = require('../controllers/quizController')

router.route('/').get(getQuestions).post(setQuestions)


module.exports = router