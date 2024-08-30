/**
 * @file quizModel.js
 * @description Mongoose model for the Quizzes collection. This schema defines the structure for quiz documents, including nested question schema, which allows for multiple types of questions and their respective details to be associated with each quiz.
 * @module quizModel
 * @requires mongoose
 */

const mongoose = require("mongoose");

/**
 * @typedef {Object} Question
 * @property {ObjectId} _id - The unique identifier for the question.
 * @property {string} type - The type of question (e.g., multiple choice, true/false).
 * @property {string} questionText - The text of the question.
 * @property {Object[]} options - An array of option objects if options are present.
 * @property {string} options.option - The display text for an option.
 * @property {string} options.value - The value associated with the option.
 * @property {string} options.term - The term associated with the option.
 * @property {string} options.definition - The definition associated with the term.
 * @property {string[]} wrongOptions - An array of wrong options for the question.
 * @property {string[]} correctOptions - An array of correct options for the question.
 * @property {string} image - The path to the image, if the question is an image-based quiz.
 * @property {string} answer - The correct answer for the question.
 * @property {number} points - The number of points awarded for answering the question correctly.
 */
const questionSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    type: String,
    questionText: String, // Ensure this matches the field name in your data
    options: [
      { option: String, value: String, term: String, definition: String },
    ], // If options are present
    wrongOptions: [String],
    correctOptions: [String], // If options are present
    image: String, // if for image quiz
    answer: String,
    points: Number,
  },
  { _id: false },
);

/**
 * @typedef {Object} Quiz
 * @property {string} type - The type of quiz.
 * @property {Question[]} questions - An array of question objects associated with the quiz.
 * @property {Object[]} options - An array of option objects if options are present.
 * @property {string} options.option - The display text for an option.
 * @property {string} options.value - The value associated with the option.
 * @property {string} options.term - The term associated with the option.
 * @property {string} options.definition - The definition associated with the term.
 * @property {string} answer - The correct answer for the quiz.
 * @property {number} points - The number of points awarded for completing the quiz.
 */
const quizSchema = mongoose.Schema({
  type: String,
  questions: [questionSchema],
  options: [
    { option: String, value: String, term: String, definition: String },
  ],
  answer: String,
  points: Number,
});

module.exports = mongoose.model("quizzes", quizSchema);
