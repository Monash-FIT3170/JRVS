



const asyncHandler = require('express-async-handler')

const Quiz = require('../models/quizModel')


const getQuiz = asyncHandler (async (req, res) => {
    
    const quiz = await Quiz.findById(req.params.id)

    if (!quiz) {
        res.status(404).json({message: 'Quiz not found'})
    } else {
        res.status(200).json(quiz);
    }
})

const createQuiz = asyncHandler (async (req, res) =>{

    
    try{
        const quiz = await Quiz.create(req.body)
        res.status(200).json(quiz)
    } catch (error){
        res.status(404).json({error: error.message})
    }

})

const updateQuiz = asyncHandler( async (req, res) => {
    try {
        //find the quiz and update using the inputted body 
      const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedQuiz) {
        return res.status(404).json({ message: 'Not found' });
      }
      res.status(200).json(updatedQuiz);
    } catch (error) {
      res.status(400).json({ message: 'Error updating quiz', error });
    }
  })

module.exports = {
    getQuiz, createQuiz, updateQuiz
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