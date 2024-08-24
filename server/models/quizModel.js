const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    type: String,
    questionText: String, // Ensure this matches the field name in your data
    options: [{ option: String, value: String }], // If options are present
    image: String, // if for image quiz
    answer: String,
    points: Number,
  },
  { _id: false },
);

const quizSchema = mongoose.Schema({
  type: String,
  questions: [questionSchema],
  options: [{ option: String, value: String }],
  answer: String,
  points: Number,
});

module.exports = mongoose.model("quizzes", quizSchema);
