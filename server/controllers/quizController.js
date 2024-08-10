



const asyncHandler = require('express-async-handler')

const quizModel = require('../models/quizModel')


const getQuiz = asyncHandler (async (req, res) => {
    const quizId = req.params.id
    const quiz = await quizModel.findById(quizId)

    if (!quiz) {
        res.status(404).json({message: 'Quiz not found'})
    } else {
        res.status(200).json(quiz);
    }
})

const setShortAnswerQuiz = asyncHandler(async (req, res) => {
    const quizId = req.params.id
    const { questionText, answer } = req.body

    let quiz = await quizModel.findById(quizId)

    if (!quiz) {
        res.status(404).json({ message: 'Quiz not found' })
        return
    }

    const newQuestion = {
        _id: new mongoose.Types.ObjectId(),
        questionText,
        answer,
        type: "ShortAnswer",
    }

    quiz.questions.push(newQuestion)

    await quiz.save()

    res.status(201).json({ message: 'Question added successfully', quiz })
})

module.exports = {
    getQuiz,
    setShortAnswerQuiz
}

/*

const asyncHandler = require('express-async-handler')

const Quiz = require('../models/quizModel')
const quizModel = require('../models/quizModel')


const getQuestions = asyncHandler (async (req, res) => {
    const questions = await Quiz.find()

    res.status(200).json(questions)
})


const setQuestions = asyncHandler (async (req, res) => {

    const {type, question, options,answer} = req.body


    if (!type || !question || !answer){
        res.status(400)
        throw new Error('Please add all fields')
    }




    const questionFinal = await Quiz.create({
        type, 
        question,
        options,
        answer
    })



    if(questionFinal){
        res.status(201).json({
            type: questionFinal.type,
            question: questionFinal.question,
            options: questionFinal.options,
            answer: questionFinal.answer
        })
    }
    else {
        res.status(400)
        throw new Error("Invalid data")
    }


    
})
module.exports = {
    getQuestions,
    setQuestions
}

*/