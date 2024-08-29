/**
 * Handles quiz-related operations for the API.
 *
 * This module provides functions to perform CRUD operations on quizzes in the database.
 * The following operations are supported:
 * - Get a specific quiz by ID
 * - Update an existing quiz
 *
 * Each function uses the Mongoose model `quizModel` to interact with the MongoDB collection
 * storing quiz information. All functions are asynchronous and use `express-async-handler`
 * to handle exceptions within async routes. Errors are properly handled and returned to the client
 * with appropriate status codes.
 *
 * @module quizController
 * @requires express-async-handler
 * @requires ../models/quizModel
 * @throws {Error} Throws an error if any operation fails (e.g., quiz not found, validation errors).
 * @returns {Promise<void>} A promise that resolves when the operation is successfully completed.
 */

const asyncHandler = require("express-async-handler");
const quizModel = require("../models/quizModel");

/**
 * @desc    Get a specific quiz by ID
 * @route   GET /api/quizzes/:id
 * @access  Private
 * @function getQuiz
 * @async
 * @param {Request} req - The request object containing the quiz ID in the URL.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the quiz is retrieved and sent in the response.
 * @throws {Error} Throws a 404 error if the quiz with the given ID is not found.
 */
const getQuiz = asyncHandler(async (req, res) => {
  const quizId = req.params.id;
  const quiz = await quizModel.findById(quizId);

  if (!quiz) {
    res.status(404).json({ message: "Quiz not found" });
  } else {
    res.status(200).json(quiz);
  }
});

/**
 * @desc    Update an existing quiz
 * @route   PUT /api/quizzes/:id
 * @access  Private
 * @function updateQuiz
 * @async
 * @param {Request} req - The request object containing the quiz ID in the URL and updated data in the body.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the quiz is updated and sent in the response.
 * @throws {Error} Throws a 404 error if the quiz with the given ID is not found, or a 500 error if the update fails.
 */
const updateQuiz = asyncHandler(async (req, res) => {
  const quizId = req.params.id;
  const updatedQuizData = req.body;

  // Validate input (you might want to add more specific validations based on your schema)
  if (!updatedQuizData || typeof updatedQuizData !== "object") {
    return res.status(400).json({ message: "Invalid data provided" });
  }

  try {
    // Find the quiz by ID
    const quiz = await quizModel.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    } else {
      // Update the quiz with the new data
      console.log(quiz);
      quiz.questions = updatedQuizData;
      console.log(quiz);

      // Save the updated quiz
      await quiz.save();

      // Return the updated quiz
      res.status(200).json({ message: "Quiz updated successfully", quiz });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update quiz", error: error.message });
  }
});

module.exports = {
  getQuiz,
  updateQuiz,
};

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
