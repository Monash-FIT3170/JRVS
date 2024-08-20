const asyncHandler = require('express-async-handler')

const quizModel = require('../models/quizModel')


const getQuiz = asyncHandler(async (req, res) => {
    const quizId = req.params.id
    const quiz = await quizModel.findById(quizId)

    if (!quiz) {
        res.status(404).json({ message: 'Quiz not found' })
    } else {
        res.status(200).json(quiz);
    }
})

const updateSAQuestion = asyncHandler(async (req, res) => {
    const quizId = req.params.id;
    const updatedQuizData = req.body;

    // Validate input (you might want to add more specific validations based on your schema)
    if (!updatedQuizData || typeof updatedQuizData !== 'object') {
        return res.status(400).json({ message: 'Invalid data provided' });
    }

    try {
        // Find the quiz by ID
        const quiz = await quizModel.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        } else {
            // Update the quiz with the new data
            console.log(quiz);
            quiz.questions = updatedQuizData;
            console.log(quiz);

            // Save the updated quiz
            await quiz.save();

            // Return the updated quiz
            res.status(200).json({ message: 'Quiz updated successfully', quiz });
        }


    } catch (error) {
        res.status(500).json({ message: 'Failed to update quiz', error: error.message });
    }
});


module.exports = {
    getQuiz,
    updateSAQuestion
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